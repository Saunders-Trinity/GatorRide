import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
console.log("Navbar import:", Navbar);
console.log("LoginPage import:", LoginPage);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
