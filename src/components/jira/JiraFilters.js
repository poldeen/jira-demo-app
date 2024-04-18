import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JiraFilters = () => {
  const { response: filtersResponse, fetchData: getFilters } =
    useAxiosPrivate();

  useEffect(() => {
    initializeFilters();
  }, []);

  const initializeFilters = async () => {
    await getFilters({
      oldUrl: `filter/search?expand=description,favourite,favouritedCount,jql,owner,searchUrl,sharePermissions,isWritable,approximateLastUsed,subscriptions,viewUrl`,
      method: 'GET'
    });
  };
  return (
    <Card className="m-3">
      <Card.Header>
        <Card.Title>Jira Filters</Card.Title>
      </Card.Header>
      <Card.Body>
        {filtersResponse ? (
          <Table striped border hover>
            <thead>
              <tr>
                <td>ID</td>
                <td>Filter</td>
                <td>Description</td>
                <td>Owner</td>
              </tr>
            </thead>
            <tbody>
              {filtersResponse.values.map((value, index) => (
                <tr key={index}>
                  <td>{value.id}</td>
                  <td>
                    <Link to="/jira/issues" state={value.searchUrl}>
                      {value.name}
                    </Link>
                  </td>
                  <td>{value.description ? value.description : null}</td>
                  <td>
                    {value.owner.displayName}
                    {value.owner.active ? null : ' (Inactive)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default JiraFilters;
