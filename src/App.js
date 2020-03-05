import React from "react";
import Header from "./components/Layout/Header";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./auth-context/authProvider";
import Success from "./components/pages/Success";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Login} />
        <Route exact path="/success" component={Success} />
      </Router>
    </AuthProvider>
  );
}

export default App;
