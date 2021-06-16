import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <header>
      <div className="inner">
        <div className="nav">
          <ul>
            <li><Link to="/">Chart</Link></li>
            <li><Link to="/twitt">Twitter</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navigation;