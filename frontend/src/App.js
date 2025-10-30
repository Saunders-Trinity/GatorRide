import React, {useState} from "react";
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
console.log("Navbar import:", Navbar);
console.log("LoginPage import:", LoginPage);
console.log("HomeScreen import:", HomeScreen);
console.log("SignUpPage import:", SignUpPage);
console.log("ReportManager import:", ReportManager);
console.log("SearchPage import:", SearchPage);
console.log("PostRide import:", PostRide);
console.log("RideDetails import:", RideDetails);

  //User-States: Admin, User, Guest
  const [user,setUser] = useState({role: "Guest"});
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    navigate("/");
  }
 
  const handleLogout = () => {
    setUser({role: "Guest"});
    navigate("/login");
  };

  return (
      <div>
        <Navbar user={user} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<HomeScreen user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
          <Route path="/signup" element={<SignUpPage onSignup={handleSignup}/>} />
          <Route path="/profile" element={<GeneralProfile localUser={user}/>} />
          <Route path='/report' element={<ReportManager/>}/>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/post" element={<PostRide />} />
          <Route path="/details" element={<RideDetails />} />
        </Routes>
      </div>
  );
}

export default App;