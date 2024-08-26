import { useState } from 'react';
import LoginForm from './pages/Login';
import LoggedPage from './pages/Logged_In';
import { login, logout } from './api/authUtils';

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [_, setEmail] = useState("");

  return (
    <div className="flex">
      <div className="h-screen flex-1">
        {!isLoggedin ? (
          <LoginForm 
            onLogin={(userEmail) => login(setIsLoggedin, setEmail, userEmail)}
          />
        ) : (
          <LoggedPage />
        )}
      </div>
    </div>
  );
};

export default App;