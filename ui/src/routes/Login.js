import React, { Component} from 'react';
import { Navigate } from "react-router-dom";
import NavBar from './components/NavBar';


class L extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(result) {
      localStorage.setItem("role", result.role);
      localStorage.setItem("user", JSON.stringify(result.user));
  }

  verifyLogin(login) {

    if (login) {
        this.setState({logged: login});
        window.client.getAccount(this.setUser);
    }

  }

  handleSubmit(event, {username, password}) {
    window.client.login(username, password, this.verifyLogin);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Login logged={this.state.logged}
               handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

const Login = function({logged, handleSubmit}) {

  return (
    <div>
      {logged && <Navigate replace to="/" />}
      <LoginForm handleSubmit={handleSubmit}/>
    </div>
  );
}

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <main>
          <h2>Login</h2>
          <form onSubmit={e => this.props.handleSubmit(e, this.state)}>
              <table>
                  <tr>
                      <td><label hmtlFor="username">Correo: </label></td>
                      <td><input type="text" name="username" onChange={this.handleInputChange} value={this.state.username}/></td>
                  </tr>

                  <tr>
                      <td><label hmtlFor="password">Contraseña: </label></td>
                      <td><input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/></td>
                  </tr>

                  <tr><br/></tr>
                  <tr>
                      <td> <input type="submit" value="Login"/> </td>
                  </tr>
                  </table>
              </form>
      </main>
    );

  }

}

export default L;
