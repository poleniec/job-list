import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const updateFilteredJobs = (jobs) => {
    setFilteredJobs(jobs);
  };

  return (
    <MapContext.Provider value={{ filteredJobs, updateFilteredJobs }}>
      {children}
    </MapContext.Provider>
  );
};
