import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';

const Jira = () => {
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
      {userResponse ? (
        <>
          <Image src={userResponse.avatarUrls['48x48']} />
          <div>{userResponse.displayName}</div>
          <div>{userResponse.emailAddress}</div>
        </>
      ) : null}
    </>
  );
};

export default Jira;
