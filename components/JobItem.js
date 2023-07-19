import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import JobItemTags from './JobItemTags';

function JobItem({ job, tech }) {
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

  const techList = job.tech.map((techId) => {
    const techItem = tech.find((item) => item.id === techId);
    if (techItem) {
      return { ...techItem, shortName: techMap[techItem.name] };
    }
    return null;
  }).filter(Boolean);

  return (
    <Link href={`/job/${job.id}`} passHref>
      <li className={styles.jobCard}>
        <div className={styles.jobLogoContainer}>
          <img className={styles.jobLogo} src={job.logo} alt={`${job.company} Logo`} />
        </div>
        <div className={styles.jobInfo}>
          <h3 className={styles.jobTitle}>{job.title}</h3>
          <div className={styles.jobDetails}>
            <p className={styles.jobCity}>{job.city}</p>
            <p className={styles.jobCompany}>{job.company}</p>
          </div>
          <p className={styles.jobSalary}>{job.salary}</p>
        </div>
        <JobItemTags tech={techList} />
      </li>
    </Link>
  );
}

export default JobItem;

