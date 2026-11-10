package com.buildlab.erp;

import static com.buildlab.erp.Contracts.*;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.Instant;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PurchaseService {
  private final JdbcTemplate db;
  public PurchaseService(JdbcTemplate db) { this.db = db; }

  public List<Product> products() {
    return db.query("SELECT * FROM products ORDER BY id", (rs, n) -> new Product(rs.getLong("id"), rs.getString("name"), rs.getLong("price_minor"), rs.getLong("stock")));
  }

  private long insert(String sql, Object... values) {
    GeneratedKeyHolder key = new GeneratedKeyHolder();
    db.update(connection -> {
      PreparedStatement statement = connection.prepareStatement(sql, new String[]{"id"});
      for (int i=0; i<values.length; i++) statement.setObject(i+1, values[i]);
      return statement;
    }, key);
    if (key.getKey() == null) throw new IllegalStateException("Database returned no generated key");
    return key.getKey().longValue();
  }

  public SavedRequest get(long id) {
    var rows = db.query("SELECT * FROM purchase_requests WHERE id=?", (rs,n) -> new SavedRequest(rs.getLong("id"), rs.getString("status"), rs.getLong("total_minor"), rs.getString("created_at"),
      db.query("SELECT * FROM request_items WHERE request_id=? ORDER BY product_id", (item,k) -> new SavedItem(item.getLong("product_id"), item.getInt("quantity"), item.getLong("unit_price_minor")), id)), id);
    if (rows.isEmpty()) throw new DomainException(404, "Purchase request not found");
    return rows.get(0);
  }

  public List<SavedRequest> history() {
    return db.queryForList("SELECT id FROM purchase_requests ORDER BY id DESC LIMIT 100", Long.class).stream().map(this::get).toList();
  }

  @Transactional
  public SavedRequest create(CreateRequest payload, String actor) {
    var seen = new HashSet<Long>();
    for (Line item : payload.items()) if (!seen.add(item.productId())) throw new DomainException(400, "Combine duplicate product IDs");
    long id = insert("INSERT INTO purchase_requests(status,total_minor,created_at,actor) VALUES ('PENDING',0,?,?)", Instant.now().toString(), actor);
    long total = 0;
    for (Line item : payload.items().stream().sorted(Comparator.comparingLong(Line::productId)).toList()) {
      var prices = db.queryForList("SELECT price_minor FROM products WHERE id=?", Long.class, item.productId());
      if (prices.isEmpty()) throw new DomainException(404, "Product not found");
      long price = prices.get(0);
      total = Math.addExact(total, Math.multiplyExact(price, item.quantity()));
      db.update("INSERT INTO request_items(request_id,product_id,quantity,unit_price_minor) VALUES (?,?,?,?)", id, item.productId(), item.quantity(), price);
    }
    db.update("UPDATE purchase_requests SET total_minor=? WHERE id=?", total, id);
    db.update("INSERT INTO audit_events(request_id,action,actor,occurred_at) VALUES (?,'CREATED',?,?)", id, actor, Instant.now().toString());
    return get(id);
  }

  @Transactional
  public SavedRequest approve(long id, String actor) {
    get(id); // Report 404 separately from an already-approved conflict.
    int claimed = db.update("UPDATE purchase_requests SET status='APPROVED' WHERE id=? AND status='PENDING'", id);
    if (claimed != 1) throw new DomainException(409, "Request already approved");
    for (SavedItem item : get(id).items()) {
      int changed = db.update("UPDATE products SET stock=stock+? WHERE id=? AND stock <= ?", item.quantity(), item.productId(), 1000000-item.quantity());
      if (changed != 1) throw new DomainException(409, "Inventory capacity exceeded");
    }
    db.update("INSERT INTO audit_events(request_id,action,actor,occurred_at) VALUES (?,'APPROVED',?,?)", id, actor, Instant.now().toString());
    return get(id);
  }

  @Transactional
  public Product createProduct(ProductInput input) {
    long id=insert("INSERT INTO products(name,price_minor,stock) VALUES (?,?,?)", input.name().trim(), input.priceMinor(), input.stock());
    return new Product(id,input.name().trim(),input.priceMinor(),input.stock());
  }

  @Transactional
  public Product editProduct(long id, ProductPatch input) {
    if(db.update("UPDATE products SET name=?,price_minor=? WHERE id=?",input.name().trim(),input.priceMinor(),id)!=1)throw new DomainException(404,"Product not found");
    return products().stream().filter(p->p.id()==id).findFirst().orElseThrow();
  }
}
