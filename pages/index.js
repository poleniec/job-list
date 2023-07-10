import React, { useEffect, useContext, useState } from 'react';
import styles from '../styles/Home.module.css';
import { MapContext } from './JobContext';
import JobList from '../components/JobList';
import TechList from '../components/TechList';

function Home() {
  const { filteredJobs, updateFilteredJobs, techList, fetchTechList } = useContext(MapContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechId, setSelectedTechId] = useState(null);

  useEffect(() => {
    updateFilteredJobs(searchTerm, selectedTechId);
  }, [searchTerm, selectedTechId, updateFilteredJobs]);

  useEffect(() => {
    fetchTechList();
  }, [fetchTechList]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleTechSelect(techId) {
    setSelectedTechId(techId);
  }

  function clearTechFilter() {
    setSelectedTechId(null);
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

      <TechList
        techList={techList}
        selectedTechId={selectedTechId}
        onSelect={handleTechSelect}
        onClear={clearTechFilter}
      />

      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default Home;
