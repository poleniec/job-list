import React, { createContext, useState, useCallback } from 'react';

export const MapContext = createContext();

export const JobProvider = ({ children }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [techList, setTechList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const updateFilteredJobs = useCallback((searchTerm, techId, cityId) => {
    let url = `http://localhost:5000/jobs?q=${searchTerm}`;
    if (techId) {
      url += `&tech_like=${techId}`;
    }
    if (cityId) {
      url += `&city_like=${cityId}`;
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

  const fetchCityList = useCallback(() => {
    fetch(`http://localhost:5000/cities`)
      .then((response) => response.json())
      .then((data) => {
        setCityList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContext.Provider
      value={{
        filteredJobs,
        updateFilteredJobs,
        techList,
        fetchTechList,
        cityList,
        fetchCityList,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
