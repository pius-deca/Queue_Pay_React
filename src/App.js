import React from "react";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./auth-context/authProvider";
import Header from "./components/Layout/Header";
import Dashboard from "./components/pages/Dashboard";
import Cashout from "./components/pages/Cashout";
import Analytics from "./components/pages/Analytics";
import Landing from "./components/Layout/Landing";
import jwt_decode from 'jwt-decode';


const auth = JSON.parse(localStorage.getItem("auth"))
if (auth) {  
  const decodedToken = jwt_decode(auth.token)

  const currentTime = Date.now() / 1000
  
  if (decodedToken.exp < currentTime) {     
    localStorage.clear();  
    window.location.href="/"
  } 
}

function App() {
  return (
    <Router>     
      <AuthProvider>
        <Header /> 
        {
          // Public routes
        }  
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />

        {
          // Private routes
        }
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/cashout" component={Cashout} />
        <Route exact path="/analytics" component={Analytics} />
      </AuthProvider>
    </Router>
  );
}

export default App;
