import React, { useContext } from 'react';
import Chip from '@mui/material/Chip';
import { MapContext } from '../pages/JobContext';

function JobItemTags({ techList }) {
  const { techList: allTechList } = useContext(MapContext);

  const getName = (techId) => {
    const techItem = allTechList.find((item) => item.id === techId);
    return techItem ? techItem.name : '';
  };

  return (
    <div>
      {techList.map((techId) => (
        <Chip
          key={techId}
          label={getName(techId)}
          variant="outlined"
          style={{ marginRight: '5px', marginBottom: '5px' }}
        />
      ))}
    </div>
  );
}

export default JobItemTags;
