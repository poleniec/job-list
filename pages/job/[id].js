import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import mapboxgl from 'mapbox-gl';
import JobDetail from '../../components/JobDetail';

function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [tech, setTech] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`http://localhost:5000/jobs/${id}`);
      const data = await res.json();

      if (!data) {
        return;
      }

      setJob(data);
    }

    if (id) {
      fetchJob();
    }
  }, [id]);

  useEffect(() => {
    async function fetchTech() {
      const res = await fetch('http://localhost:5000/tech');
      const data = await res.json();

      if (!data) {
        return;
      }

      setTech(data);
    }

    fetchTech();
  }, []);

  useEffect(() => {
    if (job) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [job.geocoding.longitude, job.geocoding.latitude],
        zoom: 9,
      });

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

      return () => map.remove();
    }
  }, [job]);

  if (!job || tech.length === 0) {
    return <div>Loading...</div>;
  }

  return <JobDetail job={job} tech={tech} />;
}

export default JobDetailPage;

