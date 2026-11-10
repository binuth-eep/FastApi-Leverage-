import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Api } from './api';
import { CartLine, Product, SavedTransaction } from './models';
import { PROJECT } from './project';

@Component({selector: 'app-root', standalone: true, imports: [FormsModule], templateUrl: './app.html'})
export class App {
  readonly project = PROJECT;
  private readonly api = inject(Api);
  readonly products = signal<Product[]>([]);
  readonly cart = signal<CartLine[]>([]);
  readonly history = signal<SavedTransaction[]>([]);
  readonly receipt = signal<SavedTransaction | null>(null);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly historyLoading = signal(false);
  readonly message = signal('');
  readonly total = computed(() => this.cart().reduce((sum, row) => sum + (this.products().find(p => p.id === row.product_id)?.price_minor ?? 0) * row.quantity, 0));
  username = '';
  password = '';
  customer = '';
  address = '';
  search = '';

  constructor() { void this.refresh(); }
  money(value: number): string { return 'Rs. ' + (value / 100).toFixed(2); }
  product(id: number): Product | undefined { return this.products().find(p => p.id === id); }
  visible(): Product[] { return this.products().filter(p => p.name.toLowerCase().includes(this.search.trim().toLowerCase())); }

  async refresh(): Promise<void> {
    this.loading.set(true);
    try { this.products.set(await this.api.products()); }
    catch (error) { this.message.set(this.describe(error)); }
    finally { this.loading.set(false); }
  }

  add(product: Product): void {
    const count = this.cart().find(row => row.product_id === product.id)?.quantity ?? 0;
    if (this.project.kind !== 'erp' && count >= product.stock) { this.message.set('Not enough available stock.'); return; }
    if (count >= 1000) { this.message.set('Maximum 1000 units per item.'); return; }
    this.cart.update(rows => count ? rows.map(row => row.product_id === product.id ? {...row, quantity: row.quantity + 1} : row) : [...rows, {product_id: product.id, quantity: 1}]);
    this.message.set('');
  }

  remove(id: number): void {
    this.cart.update(rows => rows.flatMap(row => row.product_id !== id ? [row] : row.quantity > 1 ? [{...row, quantity: row.quantity - 1}] : []));
  }

  async submit(): Promise<void> {
    if (this.saving() || this.cart().length === 0) return;
    if (!this.username || !this.password) { this.message.set('Enter the account credentials configured in .env.'); return; }
    if (this.project.kind === 'shop' && (!this.customer.trim() || !this.address.trim())) { this.message.set('Enter customer name and delivery address.'); return; }
    this.saving.set(true);this.message.set('');
    const payload = this.project.kind === 'erp' ? {items: this.cart()} : {items: this.cart(), customer: this.customer.trim(), address: this.address.trim()};
    try {
      const saved = await this.api.submit(payload, this.username, this.password);
      this.receipt.set(saved);this.cart.set([]);this.customer='';this.address='';
      this.message.set(`Saved #${saved.id} · ${saved.status}.`);
      await this.refresh();
    } catch (error) { this.message.set(this.describe(error)); }
    finally { this.saving.set(false); }
  }

  async loadHistory(): Promise<void> {
    if (this.historyLoading()) return;
    this.historyLoading.set(true);
    try { this.history.set(await this.api.history(this.username, this.password)); this.message.set('History refreshed.'); }
    catch (error) { this.message.set(this.describe(error)); }
    finally { this.historyLoading.set(false); }
  }

  async approve(id: number): Promise<void> {
    if (this.saving()) return;
    this.saving.set(true);
    try { const saved=await this.api.approve(id,this.username,this.password);this.receipt.set(saved);await this.refresh();await this.loadHistory();this.message.set(`Approved #${id}. Inventory updated once.`); }
    catch (error) { this.message.set(this.describe(error)); }
    finally { this.saving.set(false); }
  }

  private describe(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) return '401 · Check your username and password.';
      if (error.status === 403) return '403 · Manager permission required.';
      if (error.status === 409) return '409 · Stock or request state changed. Refresh and review before retrying.';
      if (error.status === 0) return 'Cannot reach the API. Check the server and proxy.';
      return `${error.status} · ${typeof error.error?.detail === 'string' ? error.error.detail : 'Review your input and try again.'}`;
    }
    return error instanceof Error ? error.message : 'Unexpected error. Please retry.';
  }
}
