import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthService from "../services/auth.service";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.commitLogin = this.commitLogin.bind(this);
  }

  commitLogin({ role, user }) {
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ logged: true });
  }

  verifyLogin(login) {
    if (login) AuthService.getUser(this.commitLogin);
  }

  handleSubmit(event, { username, password }) {
    AuthService.login(username, password, this.verifyLogin);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <LoginFunc
          logged={this.state.logged}
          handleSubmit={this.handleSubmit}
        />
        <NavBar />
      </div>
    );
  }
}

const LoginFunc = function ({ logged, handleSubmit }) {
  return (
    <div>
      {logged && <Navigate replace to="/" />}
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <main>
        <div className="main-container">
          <div class="container" id="container">
            
            <div class="form-container sign-in-container">
              <form className="form-login" onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                <h1 className="reg-title">¡Hola otra vez!</h1>
                <br />
                <input
                  type="email"
                  name="username"
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  placeholder="Correo"
                />
                <input
                  type="password"
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  placeholder="Contraseña"
                />
                <a href="#">¿Olvidaste tu contraseña?</a>
                <button className="sesion-cont-btn">Iniciar sesión</button>
                <br />
                <br />
              </form>
            </div>
            <div class="overlay-container">
              <div class="overlay">
                <div class="overlay-panel overlay-right">
                  <h1 className="login-txt">¿Eres nuevo?</h1>
                  <p className="login-txt">
                    ¡Regístrate ahora! embarcate en una aventura llena de
                    aprendizaje
                  </p>
                  <Link to="/register">
                    <button className="sesion-cont-btn-ghost" id="signUp">
                      Regístrate
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
