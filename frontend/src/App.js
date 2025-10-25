import React, {useState} from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/loginPage/loginPage";
import HomeScreen from "./pages/homescreen/homescreen";
import SignUpPage from "./pages/signupPage/signupPage";
import GeneralProfile from "./pages/generalProfile/generalProfile";
import ReportManager from "./pages/reportManager/reportManager";

function App() {
console.log("Navbar import:", Navbar);
console.log("LoginPage import:", LoginPage);
console.log("HomeScreen import:", HomeScreen);
console.log("SignUpPage import:", SignUpPage);
console.log("ReportManager import:", ReportManager);

  //User-States: Admin, User, Guest
  const [user,setUser] = useState({role: "Guest"});
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    //Insert Auth0 Login logic here
  };
 
  const handleLogout = () => {
    setUser({role: "Guest"});
    navigate("/login");
    //Insert Auth0 Logout logic here
  };

  return (
      <div>
        <Navbar user={user} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<HomeScreen user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<GeneralProfile localUser={user}/>} />
          <Route path='/report' element={<ReportManager/>}/>
        </Routes>
      </div>
  );
}

export default App;
