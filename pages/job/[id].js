import JobDetail from './JobDetail';

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`http://localhost:5000/jobs/${id}`);
  const job = await res.json();

  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      job,
    },
  };
}

export default JobDetail;


