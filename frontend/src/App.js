// App.js
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/loginPage/loginPage";
import HomeScreen from "./pages/homescreen/homescreen";
import SignUpPage from "./pages/signupPage/signupPage";
import GeneralProfile from "./pages/generalProfile/generalProfile";
import ReportManager from "./pages/reportManager/reportManager";
import SearchPage from "./pages/searchPage/searchPage";
import PostRide from "./pages/postRide/postRide";
import RideDetails from "./pages/rideDetails/rideDetails";

function App() {
  // User-States: Admin, User, Guest
  // App.js
  const [user, setUser] = useState({ role: "Guest" });
  const navigate = useNavigate();
  const handleLogin = (userData) => {
    setUser(userData);               // userData must include user_id

    if (userData?.user_id) {
      localStorage.setItem("user_id", String(userData.user_id));
    }

    navigate("/");
  };

  const handleSignup = (userData) => {
    setUser(userData);

    if (userData?.user_id) {
      localStorage.setItem("user_id", String(userData.user_id));
    }

    navigate("/");
  };

  const handleLogout = () => {
    setUser({ role: "Guest" });
    localStorage.removeItem("user_id");
    navigate("/login");
  };


  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeScreen user={user} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage onSignup={handleSignup} />} />
        <Route path="/profile" element={<GeneralProfile localUser={user} />} />
        <Route path="/report" element={<ReportManager />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post" element={<PostRide user={user} />} />
        <Route path="/rides/:rideId" element={<RideDetails />} />
      </Routes>
    </div>
  );
}

export default App;
