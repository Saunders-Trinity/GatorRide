import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/loginPage/loginPage";
import HomeScreen from "./pages/homescreen/homescreen";
import SignUpPage from "./pages/signupPage/signupPage";

function App() {
console.log("Navbar import:", Navbar);
console.log("LoginPage import:", LoginPage);
console.log("HomeScreen import:", HomeScreen);
console.log("SignUpPage import:", SignUpPage);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
