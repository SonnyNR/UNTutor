import React, { Component } from 'react';
import axios from 'axios';
import './client.js';
import NavBar from './routes/components/NavBar';
import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SigninPopup from './routes/components/SigninPopup';
import LoginPopup from './routes/components/LoginPopup';

class App extends React.Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      role: localStorage.getItem('role'),
    };

    this.setRole = this.setRole.bind(this);
  }

  
  setRole(role){
    console.log(role);
    localStorage.setItem('role', role);
    this.setState({role});
  }

  render() {
    return(
      <div>
        <NavBar role={this.state.role} />
      </div>
    );
  }

  componentDidMount() {
    window.client.getRole(this.setRole);
  }
  
}

export default App;
