import React from "react";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./auth-context/authProvider";
import Success from "./components/pages/Success";
import Dashboard from "./components/pages/Dashboard";
import Cashout from "./components/pages/Cashout";
import Analytics from "./components/pages/Analytics";

function App() {
  return (
    <AuthProvider>
      <Router>        
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/" component={Login} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/Cashout" component={Cashout} />
        <Route exact path="/Analytics" component={Analytics} />
      </Router>
    </AuthProvider>
  );
}

export default App;
