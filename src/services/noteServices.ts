import { db } from '../db/database';

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export async function getNotes(): Promise<Note[]> {
  return await db.getAllAsync<Note>('SELECT * FROM notes ORDER BY id DESC');
}

export async function addNote(title: string, content: string) {
  await db.runAsync('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
}

export async function updateNote(id: number, title: string, content: string) {
  await db.runAsync('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
}

export async function deleteNote(id: number) {
  await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
}