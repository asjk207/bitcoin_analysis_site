
import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Navigation from './Components/Navigation'
import Home from './routes/Home'
import Twitter_Page from './routes/Twitter_Page'
// import Header from './Components/Header';

//다양한 기능의 페이지 이동을 위해 HashRouter를 이용하여, 다른 페이지로의 링크 연동
function App () {
      return (
        <HashRouter>
            <Navigation />
            <Route path="/" exact={true} component={Home} />
            <Route path="/twitt" component={Twitter_Page} />
        </HashRouter>
      );
}

export default App;
