import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Job } from "../types/job";
import jobData from "./jobData.json";
import { Link } from "react-router-dom";
// import { fetchJobs } from '../api/jobApi';
const ITEMS_PER_PAGE = 4;


export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadJobs = async () => {
  //     try {
  //       const jobList = await fetchJobs();
  //       setJobs(jobList);
  //     } catch (err) {
  //       setError("Failed to fetch jobs");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadJobs();
  // }, []);

  useEffect(() => {
    try {
      // Set the jobs data from the imported JSON file
      setJobs(jobData);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // const sortedJobs = jobs.sort((a, b) => {
  //   const statusOrder: { [key: string]: number } = {
  //     Running: 1,
  //     Failed: 2,
  //     Completed: 3,
  //   };
  //   return (statusOrder[a.Status] || 4) - (statusOrder[b.Status] || 4);
  // });

  const displayedJobs = jobs.slice(0, ITEMS_PER_PAGE);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="jobs table">
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell align="right">Task Name</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">CPUs</TableCell>
              <TableCell align="right">Memory (GB)</TableCell>
              <TableCell align="right">Execution Time</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedJobs.map((job) => (
              <TableRow
                key={job.JobID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {job.JobID}
                </TableCell>
                <TableCell align="right">{job.TaskName}</TableCell>
                <TableCell align="right">{job.UserID}</TableCell>
                <TableCell align="right">{job.Status}</TableCell>
                <TableCell align="right">
                  {new Date(job.StartTime).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {job.EndTime
                    ? new Date(job.EndTime).toLocaleString()
                    : "Running"}
                </TableCell>
                <TableCell align="right">{job.ResourcesUsed.CPUs}</TableCell>
                <TableCell align="right">
                  {job.ResourcesUsed.MemoryGB}
                </TableCell>
                <TableCell align="right">{job.ExecutionTime}</TableCell>
                <TableCell align="right">{job.Description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* "+x jobs" link if there are more than 4 jobs */}
      {jobs.length > ITEMS_PER_PAGE && (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Link to="/all-jobs">
            <button>+{jobs.length - ITEMS_PER_PAGE} jobs</button>
          </Link>
        </div>
      )}
    </div>
  );
}
