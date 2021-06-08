import React from "react";
import { Link } from "react-router-dom";
// import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">Home    </Link>
      <Link to="/twitt">Twitter</Link>
    </div>
  );
}

export default Navigation;