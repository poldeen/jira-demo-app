import React from 'react';
import JiraDashboards from './JiraDashboards';
import JiraFilters from './JiraFilters';
import JiraHeader from './JiraHeader';

const Jira = () => {
  return (
    <>
      <JiraHeader />
      <JiraDashboards />
      <JiraFilters />
    </>
  );
};

export default Jira;
