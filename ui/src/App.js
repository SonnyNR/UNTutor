import React, { Component } from 'react';
import './client.js';
import NavBar from './routes/components/NavBar';

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
      <div>
        <NavBar role={this.state.role}/>
        <h2>Inicio</h2>
      </div>
    );
  }

  componentDidMount() {

    this.setRole(localStorage.role);

  }

}

export default App;
