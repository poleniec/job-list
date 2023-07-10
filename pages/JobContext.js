import React, { createContext, useState, useCallback } from "react";

export const MapContext = createContext();

export const JobProvider = ({ children }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [techList, setTechList] = useState([]);

  const updateFilteredJobs = useCallback((searchTerm, techId) => {
    let url = `http://localhost:5000/jobs?q=${searchTerm}`;
    if (techId) {
      url += `&tech_like=${techId}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFilteredJobs(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchTechList = useCallback(() => {
    fetch(`http://localhost:5000/tech`)
      .then((response) => response.json())
      .then((data) => {
        setTechList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContext.Provider value={{ filteredJobs, updateFilteredJobs, techList, fetchTechList }}>
      {children}
    </MapContext.Provider>
  );
};
