
// Login.js


const Login = ({ onLogin }) => {
  const handleLogin = (role) => {
    onLogin(role);
  };

  return (
    <div>
      <button onClick={() => handleLogin('student')}>Login as Student</button>
      <button onClick={() => handleLogin('professor')}>Login as Professor</button>
    </div>
  );
};

export default Login;
