import React, { Component } from 'react';
import axios from 'axios';
import './client.js';
import NavBar from './routes/components/NavBar';

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
        <h2>Inicio</h2>
      </div>
    );
  }

  componentDidMount() {
    window.client.getRole(this.setRole);
  }

}

export default App;
