const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const jobsFilePath = path.join(__dirname, 'jobs.db.json');
const logsFilePath = path.join(__dirname, 'logs.db.json');

// Helper function to read JSON file
const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          console.error(`Error parsing JSON from file ${filePath}:`, parseError);
          reject(parseError);
        }
      }
    });
  });
};

// Helper function to write JSON file
const writeJsonFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Endpoint to handle job cancellation
app.delete('/api/jobs/:id', async (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  try {
    let jobs = await readJsonFile(jobsFilePath);
    jobs = jobs.filter(job => job.JobID !== jobId);
    await writeJsonFile(jobsFilePath, jobs);

    // Add log entry
    let logs = await readJsonFile(logsFilePath);
    logs.push({
      LogID: logs.length + 1,
      Timestamp: new Date().toISOString(),
      JobID: jobId,
      Status: 'Canceled',
      Message: `Job ${jobId} was canceled.`,
    });
    await writeJsonFile(logsFilePath, logs);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel job' });
  }
});

// Endpoint to handle job completion
app.patch('/api/jobs/:id', async (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const { Status } = req.body;
  try {
    let jobs = await readJsonFile(jobsFilePath);
    jobs = jobs.map(job => job.JobID === jobId ? { ...job, Status } : job);
    await writeJsonFile(jobsFilePath, jobs);

    // Optionally, add log entry for completion
    let logs = await readJsonFile(logsFilePath);
    logs.push({
      LogID: logs.length + 1,
      Timestamp: new Date().toISOString(),
      JobID: jobId,
      Status: 'Completed',
      Message: `Job ${jobId} was completed.`,
    });
    await writeJsonFile(logsFilePath, logs);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job status' });
  }
});

// Endpoint to handle log entry
app.post('/api/logs', async (req, res) => {
  const logEntry = req.body;
  try {
    let logs = await readJsonFile(logsFilePath);
    logs.push(logEntry);
    await writeJsonFile(logsFilePath, logs);

    res.status(201).send(logEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add log entry' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
