import { Job } from '../types/job';

const API_URL = 'http://localhost:3000/jobs';

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}

export async function fetchJobById(id: number): Promise<Job> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }
  return response.json();
}
