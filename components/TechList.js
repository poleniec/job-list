import React, { useState } from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';

const TechList = ({ techList, onSelect, onClear }) => {
  const [selectedTechId, setSelectedTechId] = useState(null);
  const limitedTechList = techList.slice(0, 10); 

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
    <div style={{ display: 'flex' }}>
      {limitedTechList.map((tech) => (
        <Paper
          key={tech.id}
          onClick={() => handleTechClick(tech.id)}
          style={{
            cursor: 'pointer',
            padding: '10px',
            position: 'relative',
            backgroundColor: selectedTechId === tech.id ? '#e0e0e0' : 'inherit',
            marginRight: '10px',
          }}
        >
          <Tooltip title={tech.name}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {tech.shortName}
              {selectedTechId === tech.id && (
                <IconButton
                  style={{ position: 'absolute', top: '0', right: '0' }}
                  onClick={() => handleTechClick(tech.id)}
                >
                  <CancelIcon />
                </IconButton>
              )}
            </div>
          </Tooltip>
        </Paper>
      ))}
    </div>
  );
};

export default TechList;
