// controllers/jobController.js
const { Job } = require('../models/jobModel');

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error('Failed to create job:', error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Failed to retrieve jobs:', error);
    res.status(500).json({ message: 'Failed to retrieve jobs' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ where: { id: req.params.id } });
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Failed to retrieve job:', error);
    res.status(500).json({ message: 'Failed to retrieve job' });
  }
};

const updateJob = async (req, res) => {
  try {
    const [updated] = await Job.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedJob = await Job.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Failed to update job:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deleted = await Job.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Failed to delete job:', error);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
