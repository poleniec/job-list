
import { useRouter } from 'next/router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from 'react';
import { JobProvider,MapContext } from './JobContext';
import SearchBar from "../components/SearchBar";

import { Grid } from '@mui/material';
mapboxgl.accessToken =
  'pk.eyJ1IjoicG9sZW5pZWMiLCJhIjoiY2xpdDIydjhnMHFsdTNlb3Roa3ZzdzB0eiJ9.ffyRmJngLhj1hRsfg5bQUw';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (router.pathname !== '/job/apply') {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [21.201987, 52.21403],
        zoom: 5,
      });

      fetch('http://localhost:5000/jobs')
        .then((response) => response.json())
        .then((data) => {
          setJobs(data);
          data.forEach((job) => {
            const marker = new mapboxgl.Marker()
              .setLngLat([job.geocoding.longitude, job.geocoding.latitude])
              .addTo(map);

            const popupContent = `
              <div>
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>${job.city}</p>
              </div>
            `;

            const popup = new mapboxgl.Popup().setHTML(popupContent);

            marker.setPopup(popup);

            marker.getElement().addEventListener('click', () => {
              router.push(`/job/${job.id}`);
            });
          });
        })
        .catch((error) => console.log(error));

      return () => map.remove();
    }
  }, [router.pathname]);

  return ( 
    <MapContext.Provider >
    <JobProvider>
    
      <Grid container direction="column" sx={{ background: 'red', width: '100%', height: '100vh' }}>
<Grid container sx={{ background: "orange", height: "100px"}} >
  <SearchBar/>
  </Grid>
  <Grid item container sx={{ flex: "1", overflow: "hidden"}} >
    <Grid item 
    sm={8}
    xs={12}
    sx={{ background: 'pink', flex: '1' , height: '100%', overflowY: 'auto',}}>
    <div>
        <Component {...pageProps} />
        </div>
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
          </div>
        </Grid>
      </Grid>
      </Grid>
      
    </JobProvider>
    </MapContext.Provider>
  );
}

export default MyApp;