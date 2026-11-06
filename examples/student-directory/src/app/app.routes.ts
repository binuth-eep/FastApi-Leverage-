import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', loadComponent: () => import('./students-page').then(m => m.StudentsPage) },
  { path: '**', redirectTo: 'students' }
];
