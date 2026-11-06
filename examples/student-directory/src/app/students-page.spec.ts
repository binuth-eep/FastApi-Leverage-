import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Subject, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StudentsPage } from './students-page';
import { StudentApi } from './student-api';
import { Student } from './student';

describe('Student Directory user journeys', () => {
  let fixture: ComponentFixture<StudentsPage>;
  let page: StudentsPage;
  const initial: Student = { id: 1, name: 'Amali', email: 'amali@example.com' };
  const api = {
    list: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn()
  };
  const render = () => fixture.detectChanges();
  const text = () => fixture.nativeElement.textContent as string;
  beforeEach(async () => {
    vi.resetAllMocks();
    api.list.mockReturnValue(of([{ ...initial }]));
    await TestBed.configureTestingModule({ imports: [StudentsPage], providers: [{ provide: StudentApi, useValue: api }] }).compileComponents();
    fixture = TestBed.createComponent(StudentsPage);
    page = fixture.componentInstance;
    render();
  });
  it('renders records and filters by email without changing the source collection', () => {
    expect(text()).toContain('Amali');
    const search = fixture.nativeElement.querySelector('#search') as HTMLInputElement;
    search.value = 'missing'; search.dispatchEvent(new Event('input')); render();
    expect(text()).toContain('No matching students');
    expect(page.students()).toHaveLength(1);
    search.value = 'AMALI@'; search.dispatchEvent(new Event('input')); render();
    expect(fixture.nativeElement.querySelectorAll('.student')).toHaveLength(1);
  });
  it('blocks whitespace names and malformed emails before calling the API', () => {
    page.form.setValue({ name: '   ', email: 'bad' });
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); render();
    expect(api.create).not.toHaveBeenCalled();
    expect(text()).toContain('Enter a name');
    expect(text()).toContain('Enter a valid email');
  });
  it('normalizes a create payload, waits for success and renders the canonical record', () => {
    const result = new Subject<Student>(); api.create.mockReturnValue(result);
    page.form.setValue({ name: '  Nimal  ', email: ' NIMAL@EXAMPLE.COM ' });
    page.save(); page.save();
    expect(api.create).toHaveBeenCalledExactlyOnceWith({ name: 'Nimal', email: 'nimal@example.com' });
    expect(page.saving()).toBe(true);
    expect(page.students()).toHaveLength(1);
    result.next({ id: 12, name: 'Nimal Silva', email: 'nimal@example.com' }); result.complete(); render();
    expect(page.saving()).toBe(false);
    expect(text()).toContain('Nimal Silva');
    expect(page.form.getRawValue().name).toBe('');
  });
  it('edits the selected ID and replaces its row without creating a second row', () => {
    api.update.mockReturnValue(of({ ...initial, name: 'Amali Perera' }));
    fixture.nativeElement.querySelector('[aria-label="Edit Amali"]').click();
    expect(page.form.getRawValue().name).toBe('Amali');
    page.form.controls.name.setValue('Amali Perera'); page.save(); render();
    expect(api.update).toHaveBeenCalledWith(1, { name: 'Amali Perera', email: initial.email });
    expect(page.students()).toHaveLength(1);
    expect(text()).toContain('Amali Perera');
  });
  it('keeps the list unchanged when editing is cancelled', () => {
    page.edit(initial); page.form.controls.name.setValue('Changed'); page.cancel(); render();
    expect(page.editingId()).toBeNull();
    expect(page.students()[0].name).toBe('Amali');
    expect(api.update).not.toHaveBeenCalled();
  });
  it('requires an explicit delete confirmation and shows the empty state after success', () => {
    api.remove.mockReturnValue(of(undefined));
    fixture.nativeElement.querySelector('[aria-label="Delete Amali"]').click(); render();
    expect(api.remove).not.toHaveBeenCalled();
    expect(text()).toContain('Keep student');
    const buttons = [...fixture.nativeElement.querySelectorAll('.delete-confirm button')] as HTMLButtonElement[];
    buttons.find(button => button.textContent?.includes('Confirm delete'))!.click(); render();
    expect(api.remove).toHaveBeenCalledWith(1);
    expect(text()).toContain('No students yet');
  });
  it('preserves input and clears pending state after an API error', () => {
    api.create.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 409 })));
    page.form.setValue({ name: 'Amali', email: initial.email }); page.save(); render();
    expect(text()).toContain('already in use');
    expect(page.form.getRawValue().name).toBe('Amali');
    expect(page.saving()).toBe(false);
    expect(page.students()).toHaveLength(1);
  });
  it('shows a recoverable loading error and retries the list', () => {
    api.list.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 0 })));
    page.load(); render();
    expect(text()).toContain('Cannot reach the server');
    expect(page.loading()).toBe(false);
    page.load(); render();
    expect(page.error()).toBe('');
    expect(text()).toContain('Amali');
  });
});
