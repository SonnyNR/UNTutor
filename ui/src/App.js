import React, { Component } from 'react';
import './client.js';
import NavBar from './routes/components/NavBar';
import logo from './routes/components/img/logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import homeimg from './routes/components/img/homepage.png'

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
    <body>
      <div className='wrapper'>
        <header className='nav-bar'>
          <Link to='/'>
            <div class="untutorlogo">
              <a id="logo"><img src={logo} className="App-logo" alt="logo" /></a>
            </div>
          </Link>
          
          <div ></div><NavBar role={this.state.role}/>
          
        </header>
        <section class="main-container" >
          <div class="location" id="home">
              <h1 id="home" className="home-text">Únete a nuestra comunidad que conecta estudiantes y tutores. Aprende o enseña sin barreras.</h1>
              <a id="home-img"><img src={homeimg} className="home-img"/></a>
              <div class="box">
              </div>
          </div>
      </section>

      </div>
    </body>
    
    );
  }

  componentDidMount() {
      window.client.getRole(this.setRole);
  }

}

export default App;
