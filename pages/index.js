import React, { useEffect, useContext, useState } from 'react';

import { MapContext } from './JobContext';
import JobList from '../components/JobList';
import TechList from '../components/TechList';
import { TextField, Grid, Autocomplete, Box } from '@mui/material';

function Home({ Component, pageProps }) {
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
    <Grid container direction="column" sx={{ background: 'red', width: '100%', height: '100vh' }}>
      <Grid container sx={{ background: 'orange', height: '10%' }}>
        <Grid container spacing={2} alignItems="center">
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
                <TextField {...params} label="Miasto" fullWidth variant="outlined" />
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
      </Grid>
      <Grid item container sx={{ height: '90%' }}>
        <Grid
          item
          sm={8}
          xs={12}
          sx={{ background: 'pink', overflowY: 'auto', maxHeight: '100%' }}
        >
          <Box sx={{ mb: 2 }}>KONTENER OFERT PRACY</Box>
          {Array(20)
            .fill()
            .map((el, i) => (
              <div style={{ overflowY: 'auto' }} key={i}>
                {/* JobList component */}
                <JobList jobs={filteredJobs} tech={techList} />
              </div>
            ))}
        </Grid>
        <Grid item sm={4} xs={false} sx={{ background: 'green' }}>
          <div
            id="map" // Użyj właściwego ID dla kontenera mapy
            style={{
              display: 'flex',
              background: '#dfdfdf',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Tutaj umieść swój kod do renderowania komponentu mapy */}
            {/* Pamiętaj, że mapę musisz zainicjować w odpowiednim momencie */}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
  
  
  
  
}

export default Home;