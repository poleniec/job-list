import React from 'react';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import JobItemTags from './JobItemTags';

function JobItem({ job }) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Link href={`/job/${job.id}`} passHref>
        <Box component="li" sx={{ p: 2, backgroundColor: 'white', borderRadius: 8, boxShadow: 1 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <img src={job.logo} alt={`${job.company} Logo`} style={{ width: 50, height: 50 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{job.title}</Typography>
              <Typography>{job.city}</Typography>
              <Typography>{job.company}</Typography>
              <Typography>{job.salary}</Typography>
            </Grid>
            <Grid item>
              <JobItemTags techList={job.tech} />
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  );
}

export default JobItem;
