import React, { useEffect, useContext, useState } from 'react';
import styles from '../styles/Home.module.css';
import { MapContext } from './JobContext';
import JobList from '../components/JobList';
import TechList from '../components/TechList';
import { TextField, Grid, Autocomplete } from '@mui/material';

function Home() {
  const { filteredJobs, updateFilteredJobs, techList, fetchTechList } = useContext(MapContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    updateFilteredJobs(searchTerm, selectedTechId);
  }, [searchTerm, selectedTechId, updateFilteredJobs]);

  useEffect(() => {
    fetchTechList();
  }, [fetchTechList]);

  useEffect(() => {
    const cities = Array.from(new Set(filteredJobs.map(job => job.city))); // Pobranie unikalnych nazw miast z listy przefiltrowanych ofert pracy
    setCityOptions(cities);
  }, [filteredJobs]);

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
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <TextField
            label="Szukaj ofert pracy"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
            options={cityOptions}
            value={searchTerm}
            onChange={(event, value) => setSearchTerm(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Miasto"
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TechList
            techList={techList}
            selectedTechId={selectedTechId}
            onSelect={handleTechSelect}
            onClear={clearTechFilter}
          />
        </Grid>
      </Grid>

      <JobList jobs={filteredJobs} tech={techList} />
    </div>
  );
}

export default Home;
