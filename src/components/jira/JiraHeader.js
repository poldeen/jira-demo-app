import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

const JiraHeader = () => {
  const { response: userResponse, fetchData: getUser } = useAxiosPrivate();

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    await getUser({
      oldUrl: `myself`,
      method: 'GET'
    });
  };
  return (
    <>
      <Card className="m-3">
        <Card.Header className="d-flex gap-2 flex-wrap flex-between-center">
          {userResponse ? (
            <Container>
              <Row>
                <Col xs lg="1" className="p2">
                  <Link
                    to={`https://beerworks.atlassian.net/jira/people/${userResponse.accountId}`}
                    target="_blank"
                  >
                    <Image
                      height="64px"
                      width="64px"
                      src={userResponse.avatarUrls['48x48']}
                    />
                  </Link>
                </Col>
                <Col xs lg="9" className="p2">
                  <Row>
                    <Col>
                      <Link
                        style={{ textDecoration: 'none', color: 'MenuText' }}
                        to={`https://beerworks.atlassian.net/jira/people/${userResponse.accountId}`}
                        target="_blank"
                      >
                        <Card.Title>{userResponse.displayName}</Card.Title>
                        Jira Account
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col md="auto" className="p2">
                  <Button
                    variant="primary"
                    size="md"
                    icon="envelope"
                    className="me-2"
                    href={`mailto:${userResponse.emailAddress}`}
                    target="_blank"
                  >
                    <span className="d-none d-sm-inline-block">Message</span>
                  </Button>
                </Col>
              </Row>
            </Container>
          ) : (
            <Spinner />
          )}
        </Card.Header>
      </Card>
    </>
  );
};

export default JiraHeader;
