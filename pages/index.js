import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/jobs')
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((job) => {
          const logoPath = `public/jobs-logos/${job.logo}`;
          return { ...job,};
        });

        setJobs(updatedData);
      });
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
          <li key={job.id} className={styles.jobCard}>
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
        ))}
      </ul>
    </div>
  );
}

export default Home;

