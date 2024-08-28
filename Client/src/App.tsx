import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./pages/Login";
import LoggedPage from "./pages/Logged_In";
import { login, logout } from "./api/authUtils";

const AppRoutes = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [_, setEmail] = useState("");
  const navigate = useNavigate(); // Correct usage inside a functional component

  const handleLogin = async (userEmail: string) => {
    await login(setIsLoggedin);
    setEmail(userEmail);
    navigate("/homepage");
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/homepage" element={<LoggedPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="h-screen flex-1">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;
