import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import db from '../db.json';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setJobs(db.jobs);
  }, []);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search jobs"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      <ul className={styles.jobList}>
        {filteredJobs.map((job) => (
          <Link key={job.id} href={`/job/${job.id}`} passHref>
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
        ))}
      </ul>
    </div>
  );
}

export default Home;