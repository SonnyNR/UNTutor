import React, { Component } from 'react';
import './client.js';
import NavBar from './routes/components/NavBar';
import './App.css';
import { Link } from "react-router-dom";
import logo from './routes/components/img/logo.svg';
import MainView from './routes/components/MainView.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      role: null,
    };

    this.setRole = this.setRole.bind(this);
  }

  setRole(role) {
    this.setState({
      role,
    })
  }

  render() {
    return(
      <div className='wrapper'>
      <NavBar role={this.state.role}/>
      <MainView role={this.state.role}/>
      </div>
    );
  }

  componentDidMount() {

    this.setRole(localStorage.role);

  }

}

export default App;
