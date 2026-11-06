import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, defer, delay, mergeMap, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Student, StudentInput } from './student';

@Injectable({ providedIn: 'root' })
export class StudentApi {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiBase + '/students';
  private records: Student[] = [
    { id: 1, name: 'Amali Perera', email: 'amali@example.com' },
    { id: 2, name: 'Nimal Silva', email: 'nimal@example.com' }
  ];
  private nextId = 3;

  private mock<T>(operation: () => T): Observable<T> {
    // Delay the operation itself; mutate only when the subscribed request finishes.
    return of(null).pipe(delay(250), mergeMap(() => defer(() => of(operation()))));
  }
  private clean(input: StudentInput, exceptId?: number): StudentInput {
    const value = { name: input.name.trim(), email: input.email.trim().toLowerCase() };
    if (value.name.length < 2 || value.name.length > 80 || value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      throw new HttpErrorResponse({ status: 422, error: { detail: 'Enter a name (2–80 characters) and a valid email.' } });
    }
    if (this.records.some(s => s.email === value.email && s.id !== exceptId)) {
      throw new HttpErrorResponse({ status: 409, error: { detail: 'This email is already in use.' } });
    }
    return value;
  }
  list(): Observable<Student[]> {
    return environment.useMock ? this.mock(() => this.records.map(s => ({ ...s }))) : this.http.get<Student[]>(this.url);
  }
  create(input: StudentInput): Observable<Student> {
    if (!environment.useMock) return this.http.post<Student>(this.url, input);
    return this.mock(() => {
      const value = this.clean(input);
      const student = { id: this.nextId++, ...value };
      this.records = [...this.records, student];
      return { ...student };
    });
  }
  update(id: number, input: StudentInput): Observable<Student> {
    if (!environment.useMock) return this.http.patch<Student>(this.url + '/' + id, input);
    return this.mock(() => {
      if (!this.records.some(s => s.id === id)) throw new HttpErrorResponse({ status: 404 });
      const student = { id, ...this.clean(input, id) };
      this.records = this.records.map(s => s.id === id ? student : s);
      return { ...student };
    });
  }
  remove(id: number): Observable<void> {
    if (!environment.useMock) return this.http.delete<void>(this.url + '/' + id);
    return this.mock(() => {
      if (!this.records.some(s => s.id === id)) throw new HttpErrorResponse({ status: 404 });
      this.records = this.records.filter(s => s.id !== id);
    });
  }
}
