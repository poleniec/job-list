import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { MapContext } from './MapContext';
import JobList from './JobList';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredJobs, updateFilteredJobs } = useContext(MapContext);

  useEffect(() => {
    fetch(`http://localhost:5000/jobs?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        updateFilteredJobs(data);
      })
      .catch((error) => console.log(error));
  }, [searchTerm, updateFilteredJobs]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Szukaj ofert pracy"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      <JobList jobs={jobs} />
    </div>
  );
}

export default Home;
