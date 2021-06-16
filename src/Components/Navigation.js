import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  // 라우터를 이용하여 해당 페이지로 이동시킨다.
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