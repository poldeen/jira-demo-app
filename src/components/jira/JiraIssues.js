import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Badge, Card, Image, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const JiraIssues = () => {
  const location = useLocation();
  const url = location.state;

  const { response: issuesResponse, fetchData: getIssues } = useAxiosPrivate();

  useEffect(() => {
    initializeIssues();
  }, []);

  const initializeIssues = async () => {
    const modifiedUrl = url.replace(
      'https://api.atlassian.com/ex/jira/ff1a2b8f-684a-4d2e-976d-e81d25ef2e74/rest/api/3/',
      ''
    );
    await getIssues({
      oldUrl: modifiedUrl,
      method: 'GET'
    });

    console.log(issuesResponse);
  };

  return (
    <>
      <Card className="m-3">
        <Card.Header>
          <Card.Title>Jira Issues</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            This page will display Jira issues based on the filter you selected.
          </Card.Text>
          {issuesResponse ? (
            <Table striped border hover>
              <thead>
                <tr>
                  <td>Key</td>
                  <td>Issue Type</td>
                  <td>Status</td>
                  <td>Summary</td>
                  <td>Assignee</td>
                </tr>
              </thead>
              <tbody>
                {issuesResponse.issues.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.key}</td>
                    <td>
                      {/* <Link to="/jira/issues" state={value.searchUrl}> */}
                      <Image src={issue.fields.issuetype.iconUrl} />
                      {/* </Link> */}
                    </td>
                    <td>
                      <Badge bg="secondary"> {issue.fields.status.name}</Badge>
                    </td>
                    <td>{issue.fields.summary}</td>
                    <td>{issue.fields.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
};

export default JiraIssues;
