package com.buildlab.erp;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public final class Contracts {
  private Contracts() {}
  public record Product(long id, String name, @JsonProperty("price_minor") long priceMinor, long stock) {}
  public record ProductInput(@NotBlank @Size(max=120) String name,
      @JsonProperty("price_minor") @Min(0) @Max(100000000) long priceMinor,
      @Min(0) @Max(1000000) long stock) {}
  public record ProductPatch(@NotBlank @Size(max=120) String name,
      @JsonProperty("price_minor") @Min(0) @Max(100000000) long priceMinor) {}
  public record Line(@JsonProperty("product_id") @Min(1) long productId, @Min(1) @Max(1000) int quantity) {}
  public record CreateRequest(@NotEmpty @Size(max=50) List<@Valid Line> items) {}
  public record SavedItem(@JsonProperty("product_id") long productId, int quantity,
      @JsonProperty("unit_price_minor") long unitPriceMinor) {}
  public record SavedRequest(long id, String status, @JsonProperty("total_minor") long totalMinor,
      @JsonProperty("created_at") String createdAt, List<SavedItem> items) {}
}
