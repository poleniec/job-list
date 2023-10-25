import React, { useEffect, useContext, useState } from 'react';
import {JobProvider, MapContext } from './JobContext';
import JobList from '../components/JobList';

function Home({}) {
  const {
    filteredJobs,
    updateFilteredJobs,
   
  } = useContext(MapContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [] = useState([]);

  useEffect(() => {
    updateFilteredJobs(searchTerm, selectedTechId, selectedCity?.name);
  }, [searchTerm, selectedTechId, selectedCity, updateFilteredJobs]);
  return (
    <JobList jobs={filteredJobs}  />
   
  );
}

export default Home;
