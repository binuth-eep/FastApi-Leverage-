export interface Product { id: number; name: string; price_minor: number; stock: number; }
export interface CartLine { product_id: number; quantity: number; }
export interface SavedItem extends CartLine { unit_price_minor: number; }
export interface SavedTransaction { id: number; status: string; total_minor: number; created_at: string; items: SavedItem[]; }

export function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return Number.isSafeInteger(v['id']) && typeof v['name'] === 'string'
    && Number.isSafeInteger(v['price_minor']) && Number(v['price_minor']) >= 0
    && Number.isSafeInteger(v['stock']) && Number(v['stock']) >= 0;
}

export function isTransaction(value: unknown): value is SavedTransaction {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return Number.isSafeInteger(v['id']) && typeof v['status'] === 'string'
    && Number.isSafeInteger(v['total_minor']) && typeof v['created_at'] === 'string'
    && Array.isArray(v['items']) && v['items'].every(item => item && typeof item === 'object'
      && Number.isSafeInteger(item.product_id) && Number.isSafeInteger(item.quantity)
      && Number.isSafeInteger(item.unit_price_minor));
}
