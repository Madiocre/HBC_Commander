// src/types/job.ts
export interface Job {
  JobID: number;
  TaskName: string;
  UserID: number;
  Status: string; // Update status to a union of specific literals
  StartTime: string;
  EndTime: string;
  ResourcesUsed: {
    CPUs: number;
    MemoryGB: number;
  };
  ExecutionTime: string;
  Description: string;
}