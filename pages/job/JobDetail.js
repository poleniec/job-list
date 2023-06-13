import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import StarRating from './StarRating';

function JobDetail({ job }) {
  const router = useRouter();
  const { id } = router.query;

  const handleApply = () => {
    router.push(`/job/apply?id=${id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#E5E7EB' }}>
      <Box
        sx={{
          width: 1100,
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

      <Box className="mt-8">
        <Box sx={{ backgroundColor: '#FFFFFF', p: 4, borderRadius: 'lg', mb: 4 }}>
          <h2 className="text-xl font-bold text-black">Tech stack:</h2>
          <ul className="flex flex-wrap">
            {job.techStack.map((tech, index) => (
              <li key={index} className="text-lg text-black flex items-center mr-6">
                {tech} <StarRating rating={job.techRatings[index]} />
              </li>
            ))}
          </ul>
        </Box>

        <Box sx={{ backgroundColor: '#FFFFFF', p: 4, borderRadius: 'lg', mb: 4 }}>
          <Box className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-black mr-4">Opis stanowiska:</h2>
            <p className="text-lg leading-relaxed">{job.description}</p>
          </Box>

          <Box mb={8}>
            <h2 className="text-xl font-bold text-black">Obowiązki:</h2>
            <ul className="list-disc ml-6">
              {job.duties.map((duty, index) => (
                <li key={index} className="text-lg text-black">{duty}</li>
              ))}
            </ul>
          </Box>

          <Box mb={8}>
            <h2 className="text-xl font-bold text-black">Wymagania:</h2>
            <ul className="list-disc ml-6">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="text-lg text-black">{requirement}</li>
              ))}
            </ul>
          </Box>

          <Box>
            <h2 className="text-xl font-bold text-black">Korzyści:</h2>
            <ul className="list-disc ml-6">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="text-lg text-black">{benefit}</li>
              ))}
            </ul>
          </Box>
        </Box>
      </Box>

      <Button
        
        color="error"
        onClick={handleApply}
        className="mt-4"
        sx={{ backgroundColor: 'purple', width: '1060px' }}
      >
        Apply
      </Button>
    </Box>
  );
}

export default JobDetail;
