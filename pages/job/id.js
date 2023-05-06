
import { useRouter } from 'next/router';

function JobDetail() {
  const router = useRouter();
  const { id } = router.query;



  return (
    <div>
      {}
    </div>
  );
}

export default JobDetail;
