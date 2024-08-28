// src/types/logs.ts
export interface Log {
  LogID: number;
  Timestamp: string;
  JobID: number;
  Status: string; // Changed from specific literals to string
  Message: string;
  Trace: string;
}