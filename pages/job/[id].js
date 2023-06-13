import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import JobDetail from './JobDetail';

function JobDetailPage() {
  const [job, setJob] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`http://localhost:5000/jobs/${id}`);
      const data = await res.json();

      if (!data) {
        // Obsłuż brak danych
        return;
      }

      setJob(data);
    }

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return <JobDetail job={job} />;
}

export default JobDetailPage;


