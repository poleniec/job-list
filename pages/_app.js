import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect } from 'react';
import jobsData from '../db.json';

mapboxgl.accessToken =
  'pk.eyJ1IjoicG9sZW5pZWMiLCJhIjoiY2xpdDIydjhnMHFsdTNlb3Roa3ZzdzB0eiJ9.ffyRmJngLhj1hRsfg5bQUw';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.pathname !== '/job/apply') {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9,
      });

      jobsData.jobs.forEach((job) => {
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
      });

      return () => map.remove();
    }
  }, [router.pathname]); 
  return (
    <div>
      {router.pathname !== '/job/apply' && (
        <div
          id="map"
          style={{
            position: 'fixed',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            width: '850px',
            height: '110vh',
          }}
        ></div>
      )}

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;



