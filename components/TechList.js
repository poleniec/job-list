import React, { useState } from 'react';
import { Grid, Paper, IconButton } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';

const TechList = ({ techList, onSelect, onClear }) => {
  const [selectedTechId, setSelectedTechId] = useState(null);

  const handleTechClick = (techId) => {
    if (selectedTechId === techId) {
      setSelectedTechId(null);
      onClear();
    } else {
      setSelectedTechId(techId);
      onSelect(techId);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {techList.map((tech) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={tech.id}>
            <Paper
              onClick={() => handleTechClick(tech.id)}
              style={{
                cursor: 'pointer',
                padding: '10px',
                position: 'relative',
                backgroundColor: selectedTechId === tech.id ? '#e0e0e0' : 'inherit',
              }}
            >
              {tech.name}
              {selectedTechId === tech.id && (
                <IconButton
                  style={{ position: 'absolute', top: '0', right: '0' }}
                  onClick={() => handleTechClick(tech.id)}
                >
                  <CancelIcon />
                </IconButton>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TechList;
