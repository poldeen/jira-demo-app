import axios from 'axios';
import { capitalize } from 'helpers/utils';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useAuth } from 'providers/AuthProvider';
import { useUser } from 'providers/UserProvider';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from 'services/Auth.service';

const Landing = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const token = localStorage.getItem('token');
  const { response: resourcesResponse, fetchData: getResources } =
    useAxiosPrivate();
  const { response: userResponse, fetchData: getUser } = useAxiosPrivate();
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const { auth, setAuth } = useAuth();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (code !== null && !token) {
      fetchTokenNew();
    }
  }, []);

  const fetchTokenNew = async () => {
    try {
      const clientId = process.env.REACT_APP_JIRA_CLIENT_ID;
      const secret = process.env.REACT_APP_JIRA_CLIENT_SECRET;

      const data = {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: secret,
        code: code,
        redirect_uri: 'http://localhost:3000'
      };

      const response = await axios.post(
        'https://auth.atlassian.com/oauth/token',
        data,
        {
          headers: "Content-Type: 'application/json'"
        }
      );

      localStorage.setItem('token', JSON.stringify(response.data));
      setAuth({ loggedIn: true });
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loaded) {
      initializeApp();
    }
  }, [loaded]);

  const initializeApp = async () => {
    console.log('initializing app');
    await getResources({
      oldUrl: `oauth/token/accessible-resources`,
      method: 'GET'
    });
  };

  useEffect(() => {
    if (ready && user === null) {
      initializeUser();
    }
  }, [resourcesResponse]);

  const initializeUser = async () => {
    console.log('initializing user');
    await getUser({
      oldUrl: `myself`,
      method: 'GET'
    });
  };

  useEffect(() => {
    localStorage.setItem('resources', JSON.stringify(resourcesResponse));
    setReady(true);
  }, [resourcesResponse]);

  useEffect(() => {
    if (user === null) {
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [userResponse]);

  const handleSubmit = () => {
    AuthService.login();
  };

  return (
    <>
      <Card className="m-3">
        <Card.Header>
          <Card.Title>Landing Page</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>Text about the intent of the current app</Card.Text>
          {resourcesResponse ? (
            <>
              <CardText>
                You have successfully authenticated to your Jira account.
              </CardText>
              <CardText>
                Account: {capitalize(resourcesResponse[0]?.name)} Jira Account
              </CardText>
            </>
          ) : null}
        </Card.Body>
        <Card.Footer>
          {auth.loggedIn ? (
            <Link to="/jira">
              <Button>Let's Go</Button>
            </Link>
          ) : (
            <Button disabled={loaded} onClick={handleSubmit}>
              Launch Jira
            </Button>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Landing;
