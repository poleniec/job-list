import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

function JobItem({ job }) {
  return (
    <Link href={`/job/${job.id}`} passHref>
      <li className={styles.jobCard}>
        <div className={styles.jobLogoContainer}>
          <img className={styles.jobLogo} src={job.logo} alt={`${job.company} Logo`} />
        </div>
        <div className={styles.jobInfo}>
          <h3 className={styles.jobTitle}>{job.title}</h3>
          <div className={styles.jobDetails}>
            <p className={styles.jobCity}>{job.city}</p>
            <p className={styles.jobCompany}>{job.company}</p>
          </div>
          <p className={styles.jobSalary}>{job.salary}</p>
        </div>
      </li>
    </Link>
  );
}

export default JobItem;