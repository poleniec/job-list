import React, { useEffect, useContext, useState } from 'react';
import styles from '../styles/Home.module.css';
import { MapContext } from './JobContext';
import JobList from '../components/JobList';
import TechList from '../components/TechList';
import { TextField, Grid, Autocomplete } from '@mui/material';

function Home() {
  const {
    filteredJobs,
    updateFilteredJobs,
    techList,
    fetchTechList,
    cityList,
    fetchCityList,
  } = useContext(MapContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    updateFilteredJobs(searchTerm, selectedTechId, selectedCity?.name);
  }, [searchTerm, selectedTechId, selectedCity, updateFilteredJobs]);

  useEffect(() => {
    fetchTechList();
    fetchCityList();
  }, [fetchTechList, fetchCityList]);

  useEffect(() => {
    const cities = cityList.map((city) => ({ name: city.name }));
    setCityOptions(cities);
  }, [cityList]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleTechSelect(techId) {
    setSelectedTechId(techId);
  }

  function handleCitySelect(city) {
    setSelectedCity(city);
  }

  function clearTechFilter() {
    setSelectedTechId(null);
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Szukaj ofert pracy"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={cityOptions}
            getOptionLabel={(option) => option.name}
            value={selectedCity}
            onChange={(event, value) => handleCitySelect(value)}
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
        <Grid item xs={12} sm={12} md={4}>
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