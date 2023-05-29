import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';


function StarRating({ rating }) {
  const starIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      className="w-6 h-6 text-yellow-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 16.582l-5.427 3.289a1 1 0 01-1.445-1.054l1.04-5.715L.18 7.183a1 1 0 01.568-1.705L6.04 5.3l2.306-5.267a1 1 0 011.788 0l2.306 5.267 5.292.778a1 1 0 01.568 1.705l-3.928 3.288 1.04 5.715a1 1 0 01-1.446 1.054L10 16.582z"
      />
    </svg>
  );

  return (
    <div className="flex items-center">
      {[...Array(rating)].map((_, index) => (
        <span key={index}>{starIcon}</span>
      ))}
    </div>
  );
}

function JobDetail({ job }) {
  const router = useRouter();
  const { id } = router.query;

  const handleApply = () => {
    router.push(`/job/apply?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-8 flex flex-col items-start">
        <Box
          sx={{
            width: 1000,
            height: 250,
            backgroundImage: `url('/tlo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="flex items-center p-8 gap-4 bg-blue-500 mt-8"
        >
          <img className="w-24 h-24 rounded-full bg-blue-900 p-3" src={job.logo} alt={`${job.company} Logo`} />
          <div className="text-white">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <h2 className="text-lg">{job.company}</h2>
            <h3 className="text-lg mb-2">{job.city}</h3>
            <h4 className="text-lg font-bold text-green-500">{job.salary}</h4>
          </div>
        </Box>

        <div className="mt-8">
          <div className="bg-white p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-black">Tech stack:</h2>
            <ul className="flex flex-wrap">
              {job.techStack.map((tech, index) => (
                <li key={index} className="text-lg text-black flex items-center mr-6">
                  {tech} <StarRating rating={job.techRatings[index]} />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg mb-4">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black mr-4">Opis stanowiska:</h2>
              <p className="text-lg leading-relaxed">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-black">Obowiązki:</h2>
              <ul className="list-disc ml-6">
                {job.duties.map((duty, index) => (
                  <li key={index} className="text-lg text-black">{duty}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-black">Wymagania:</h2>
              <ul className="list-disc ml-6">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="text-lg text-black">{requirement}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black">Korzyści:</h2>
              <ul className="list-disc ml-6">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-lg text-black">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Button
  variant="contained"
  color="error"
  onClick={handleApply}
  className="mt-4"
  style={{ backgroundColor: 'red', width: '1060px' }}
>
  Apply
</Button>

      </div>
    </div>
  );
}

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

