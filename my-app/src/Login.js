import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [onLoginHandler, setOnLoginHandler] = useState(null);

  useEffect(() => {
    setOnLoginHandler(onLogin);
  }, [onLogin]);

  const handleLogin = (role) => {
    setLoggedIn(true);
    setRole(role);
    onLoginHandler(role);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole('');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You are logged in as {role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleLogin('student')}>Login as Student</button>
          <button onClick={() => handleLogin('professor')}>Login as Professor</button>
        </div>
      )}
    </div>
  );
};

export default Login;
