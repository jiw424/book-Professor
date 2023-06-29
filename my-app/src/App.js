import React, { useState } from 'react';
import Login from './Login';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (role) => {
    setLoggedIn(true);
    // 执行其他登录逻辑，根据角色进行相应处理...
    console.log(`Logged in as ${role}`);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
