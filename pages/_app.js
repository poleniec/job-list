import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from 'react';
import { JobProvider } from './JobContext';
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
    <JobProvider>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
        {router.pathname !== '/job/apply' && (
          <div style={{ flex: '0 0 1000px', marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              id="map"
              style={{
                width: '100%',
                height: '600px',
              }}
            ></div>
          </div>
        )}
      </div>
    </JobProvider>
  );
}

export default MyApp;






