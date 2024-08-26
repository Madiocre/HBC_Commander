// src/api/userApi.ts
import { User } from '../types/user';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: User[] = await response.json();
  return data;
}
