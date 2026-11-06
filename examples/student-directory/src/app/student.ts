export interface Student { id: number; name: string; email: string; }
export type StudentInput = Omit<Student, 'id'>;
