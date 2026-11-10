import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product, SavedTransaction, isProduct, isTransaction } from './models';
import { PROJECT } from './project';

@Injectable({ providedIn: 'root' })
export class Api {
  private readonly http = inject(HttpClient);
  private readonly endpoint = PROJECT.kind === 'erp' ? '/api/requests' : '/api/orders';

  private headers(username: string, password: string): HttpHeaders {
    // Local example accounts use ASCII usernames/passwords. Keep credentials in memory only.
    return new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'X-Build-Lab': '1' });
  }

  async products(): Promise<Product[]> {
    const data = await firstValueFrom(this.http.get<unknown>('/api/products'));
    if (!Array.isArray(data) || !data.every(isProduct)) throw new Error('Invalid product response');
    return data;
  }

  async submit(payload: object, username: string, password: string): Promise<SavedTransaction> {
    const data = await firstValueFrom(this.http.post<unknown>(this.endpoint, payload, { headers: this.headers(username, password) }));
    if (!isTransaction(data)) throw new Error('Invalid transaction response');
    return data;
  }

  async history(username: string, password: string): Promise<SavedTransaction[]> {
    const data = await firstValueFrom(this.http.get<unknown>(this.endpoint, { headers: this.headers(username, password) }));
    if (!Array.isArray(data) || !data.every(isTransaction)) throw new Error('Invalid history response');
    return data;
  }

  async approve(id: number, username: string, password: string): Promise<SavedTransaction> {
    const data = await firstValueFrom(this.http.post<unknown>(`/api/requests/${id}/approve`, {}, { headers: this.headers(username, password) }));
    if (!isTransaction(data)) throw new Error('Invalid approval response');
    return data;
  }
}
