// App.tsx
import React, {useState} from 'react';
import LoginScreen from './LoginScreen'; // Make sure the path is correct
import HomeScreen from './HomeScreen'; // Make sure the path is correct

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <HomeScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
