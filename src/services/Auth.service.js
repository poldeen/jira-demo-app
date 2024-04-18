const login = async () => {
  const clientId = process.env.REACT_APP_JIRA_CLIENT_ID;

  redirectToAuthCodeFlow(clientId);

  async function redirectToAuthCodeFlow(clientId) {
    const params = new URLSearchParams();
    params.append('audience', 'api.atlassian.com');
    params.append('client_id', clientId);
    params.append(
      'scope',
      'read:jira-work ' +
        'write:jira-work ' +
        'read:jira-user ' +
        'manage:jira-project ' +
        'manage:jira-configuration ' +
        'offline_access'
    );
    params.append('state', 'dkdsifalfkja;ojavafiah;ifewfhfoewhfweioflguifhew');
    params.append('redirect_uri', 'http://localhost:3000');
    params.append('response_type', 'code');
    params.append('prompt', 'consent');

    document.location = `https://auth.atlassian.com/authorize?${params.toString()}`;
  }
};

const AuthService = {
  login
};

export default AuthService;
