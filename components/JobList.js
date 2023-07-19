import React from 'react';
import styles from '../styles/Home.module.css';
import JobItem from './JobItem';

function JobList({ jobs, tech }) {
  return (
    <ul className={styles.jobList}>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} tech={tech} />
      ))}
    </ul>
  );
}

export default JobList;

