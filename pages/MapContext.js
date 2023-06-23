import React, { createContext, useState, useCallback } from "react";

export const MapContext = createContext();

export const JobProvider = ({ children }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const updateFilteredJobs = useCallback((searchTerm) => {
    fetch(`http://localhost:5000/jobs?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredJobs(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContext.Provider value={{ filteredJobs, updateFilteredJobs }}>
      {children}
    </MapContext.Provider>
  );
};

