import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { StudentApi } from './student-api';
import { Student } from './student';
import { environment } from '../environments/environment';

const nameValidator: ValidatorFn = control => {
  const name = String(control.value ?? '').trim();
  return name.length >= 2 && name.length <= 80 ? null : { name: true };
};

@Component({
  selector: 'app-students-page', standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './students-page.html'
})
export class StudentsPage {
  private readonly api = inject(StudentApi);
  private readonly destroyRef = inject(DestroyRef);
  readonly students = signal<Student[]>([]);
  readonly query = signal('');
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly notice = signal('');
  readonly editingId = signal<number | null>(null);
  readonly pendingDelete = signal<Student | null>(null);
  readonly useMock = environment.useMock;
  readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.students().filter(s => (s.name + ' ' + s.email).toLowerCase().includes(q));
  });
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [nameValidator] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email, Validators.maxLength(254)] })
  });

  constructor() { this.load(); }
  load(): void {
    if (this.loading() || this.saving()) return;
    this.loading.set(true); this.error.set('');
    this.api.list().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: students => this.students.set(students),
      error: error => this.error.set(this.message(error))
    });
  }
  edit(student: Student): void {
    if (this.saving() || this.loading()) return;
    this.editingId.set(student.id); this.form.reset({ name: student.name, email: student.email });
    this.error.set(''); this.notice.set(''); this.pendingDelete.set(null);
  }
  cancel(): void {
    if (this.saving()) return;
    this.editingId.set(null); this.form.reset();
  }
  save(): void {
    if (this.saving() || this.loading()) return;
    const raw = this.form.getRawValue();
    this.form.setValue({ name: raw.name.trim(), email: raw.email.trim().toLowerCase() });
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const input = this.form.getRawValue(), id = this.editingId();
    this.saving.set(true); this.error.set(''); this.notice.set('');
    const request = id === null ? this.api.create(input) : this.api.update(id, input);
    request.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
      next: student => {
        this.students.update(rows => id === null ? [...rows, student] : rows.map(s => s.id === id ? student : s));
        this.editingId.set(null); this.form.reset(); this.notice.set('Student saved.');
      },
      error: error => this.error.set(this.message(error))
    });
  }
  confirmDelete(): void {
    const student = this.pendingDelete();
    if (!student || this.saving() || this.loading()) return;
    this.saving.set(true); this.error.set(''); this.notice.set('');
    this.api.remove(student.id).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.students.update(rows => rows.filter(s => s.id !== student.id));
        if (this.editingId() === student.id) { this.editingId.set(null); this.form.reset(); }
        this.pendingDelete.set(null); this.notice.set('Student deleted.');
      },
      error: error => this.error.set(this.message(error))
    });
  }
  private message(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const messages: Record<number, string> = {
        0: 'Cannot reach the server. Check your connection, API URL and CORS.',
        401: 'Please sign in with the authentication flow required by your backend.',
        403: 'You do not have permission to do this.',
        404: 'Student not found. Reload the list and try again.',
        409: 'This email is already in use. Choose another email.',
        422: 'Check the name and email, then try again.'
      };
      return messages[error.status] ?? 'The request failed. Please try again.';
    }
    return 'Something went wrong. Please try again.';
  }
}
