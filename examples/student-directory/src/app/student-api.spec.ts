import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StudentApi } from './student-api';
import { environment } from '../environments/environment';

describe('StudentApi transport boundary', () => {
  let api: StudentApi;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(StudentApi); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => { http.verify(); environment.useMock = true; vi.useRealTimers(); });
  it('uses the documented HTTP URLs, methods and payloads in API mode', () => {
    environment.useMock = false;
    api.list().subscribe(); http.expectOne('/api/students').flush([]);
    const input = { name: 'Amali', email: 'amali@example.com' };
    api.create(input).subscribe();
    const create = http.expectOne('/api/students'); expect(create.request.method).toBe('POST'); expect(create.request.body).toEqual(input); create.flush({ id: 4, ...input });
    api.update(4, input).subscribe(); const update = http.expectOne('/api/students/4'); expect(update.request.method).toBe('PATCH'); update.flush({ id: 4, ...input });
    api.remove(4).subscribe(); const remove = http.expectOne('/api/students/4'); expect(remove.request.method).toBe('DELETE'); remove.flush(null, { status: 204, statusText: 'No Content' });
  });
  it('rejects duplicate emails in mock mode without adding a record', async () => {
    vi.useFakeTimers();
    const created = firstValueFrom(api.create({ name: 'Another', email: ' AMALI@EXAMPLE.COM ' }));
    const rejected = expect(created).rejects.toMatchObject({ status: 409 });
    await vi.advanceTimersByTimeAsync(250); await rejected;
    const list = firstValueFrom(api.list()); await vi.advanceTimersByTimeAsync(250);
    expect(await list).toHaveLength(2);
  });
  it('does not mutate mock records if a delayed request is cancelled', async () => {
    vi.useFakeTimers();
    const subscription = api.remove(1).subscribe(); subscription.unsubscribe();
    await vi.advanceTimersByTimeAsync(250);
    const list = firstValueFrom(api.list()); await vi.advanceTimersByTimeAsync(250);
    expect(await list).toHaveLength(2);
  });
});
