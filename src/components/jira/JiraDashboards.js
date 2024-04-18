import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';

const JiraDashboards = () => {
  const { response: dashboardsResponse, fetchData: getDashboards } =
    useAxiosPrivate();

  useEffect(() => {
    initializeDashbards();
  }, []);

  const initializeDashbards = async () => {
    await getDashboards({
      oldUrl: `dashboard`,
      method: 'GET'
    });
  };
  return (
    <Card className="m-3">
      <Card.Header>
        <Card.Title>Jira Dashboards</Card.Title>
      </Card.Header>
      <Card.Body>
        {dashboardsResponse ? (
          <>
            <div>
              {dashboardsResponse.dashboards.map((dashboard, index) => (
                <>
                  <div key={index}>ID: {dashboard.id}</div>
                  <div key={index}>
                    Favorite: {dashboard.isFavorite ? 'YES' : 'NO'}
                  </div>
                  <div key={index}>Name: {dashboard.name}</div>
                  <div key={index}>Popularity: {dashboard.popularity}</div>
                  <div key={index}>URL: {dashboard.self}</div>
                  <div key={index}>
                    Writable: {dashboard.isWritable ? 'YES' : 'NO'}
                  </div>
                  <div key={index}>
                    System Dashboard: {dashboard.systemDashboard ? 'YES' : 'NO'}
                  </div>
                </>
              ))}
            </div>
          </>
        ) : null}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default JiraDashboards;
