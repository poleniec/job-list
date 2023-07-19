import React from 'react';
import Chip from '@mui/material/Chip';

function JobItemTags({ tech }) {
  const techMap = {
    AWS: 'AW',
    'CI/CD': 'CD',
    Git: 'GT',
    Kubernetes: 'KS',
    Ansible: 'AN',
    Terraform: 'TF',
    'Node.js': 'NJ',
    'Express.js': 'EX',
    MongoDB: 'MG',
    Docker: 'DK',
    Docker: 'DK',
    Redis: 'RD',
    GraphQL: 'GQ',
    Java: 'JA',
    'Spring Boot': 'SB',
    MySQL: 'MY',
    Kafka: 'KF',
    Elasticsearch: 'ES',
    React: 'RC',
    Redux: 'RX',
    TypeScript: 'TS',
    Webpack: 'WK',
    Jest: 'JT',
    Storybook: 'ST',
    Python: 'PY',
    Django: 'DJ',
    PostgreSQL: 'PG',
    'RESTful API': 'RA',
    'C#': 'CS',
    '.NET Core': 'NC',
    'SQL Server': 'SS',
    Azure: 'AZ',
    'Entity Framework': 'EF',
    MVC: 'MV',
  };

  return (
    <div>
      {tech.map((techItem) => (
        <Chip
          key={techItem}
          label={techMap[techItem.name]}
          variant="outlined"
          style={{ marginRight: '5px', marginBottom: '5px' }}
        />
      ))}
    </div>
  );
}

export default JobItemTags;
