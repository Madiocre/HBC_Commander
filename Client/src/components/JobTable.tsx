import { useState, useEffect } from "react";
// const fs = require('fs');
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Job } from "../types/job";
import jobData from "./jobs.db.json";
import logsData from "./logs.db.json";

const ITEMS_PER_PAGE = 4;

export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [page, setPage] = useState<number>(0);

  useEffect(() => {
    try {
      setJobs(jobData);
      setDisplayedJobs(jobData.slice(0, ITEMS_PER_PAGE));
    } catch (err) {
      setError("Failed to load jobs:" + err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancelJob = (jobId: number) => {
    // Filter out the canceled job
    const updatedJobs = displayedJobs.filter((job) => job.JobID !== jobId);
    setDisplayedJobs(updatedJobs);

    // Update the jobs state to reflect the cancellation
    const remainingJobs = jobs.filter((job) => job.JobID !== jobId);
    setJobs(remainingJobs);

    // Log the job cancellation
    const logEntry = {
      LogID: logsData.length + 1, // Simulate new log entry ID
      Timestamp: new Date().toISOString(),
      JobID: jobId,
      Status: "Canceled",
      Message: `Job ${jobId} was canceled.`,
    };

    // Simulate adding log entry
    logsData.push(logEntry);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="jobs table">
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell align="center">Task Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>
              <TableCell align="center">Execution Time</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedJobs.map((job) => (
              <TableRow
                key={job.JobID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {job.JobID}
                </TableCell>
                <TableCell align="center">{job.TaskName}</TableCell>
                <TableCell align="center">{job.Status}</TableCell>
                <TableCell align="center">
                  {new Date(job.StartTime).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {job.EndTime
                    ? new Date(job.EndTime).toLocaleString()
                    : "Running"}
                </TableCell>
                <TableCell align="center">{job.ExecutionTime}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelJob(job.JobID)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
