// App.js

import React, { useState } from 'react';
import Login from './Login';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (newRole) => {
    setLoggedIn(true);
    setRole(newRole);
    console.log(`Logged in as ${newRole}`);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You are logged in as {role}.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};


export default App;
