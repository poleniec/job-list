import { useEffect, useContext, useState } from 'react';
import styles from '../styles/Home.module.css';
import { MapContext } from './MapContext';
import JobList from './components/JobList';


function Home() {
  const { filteredJobs, updateFilteredJobs } = useContext(MapContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    updateFilteredJobs(searchTerm);
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

      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default Home;
