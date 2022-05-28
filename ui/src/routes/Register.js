import React, { Component} from 'react';
import NavBar from './components/NavBar';
import AuthService from '../services/auth.service';

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(user, role) {
        AuthService.register(user, role);
    }

    render() {
        return (
            <Form handleSubmit = {this.handleSubmit}/>
        );
    }
}

class Form extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        name: '',
        phone: '',
        email: '',
        password: '',
        role: '',
      };
      this.handleSubmitForm = this.handleSubmitForm.bind(this);
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

    handleSubmitForm(event) {

      const user = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      }

      event.preventDefault();
      this.props.handleSubmit(user, this.state.role);

    }

    render() {
      return (
        <main>
        <NavBar />
            <h2>Registro</h2>
            <form onSubmit={this.handleSubmitForm}>
                <table>
                    <tr>
                        <td><label htmlFor="name">Nombre: </label></td>
                        <td><input type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="phone">Telefono: </label></td>
                        <td><input type="text" name="phone" onChange={this.handleInputChange} value={this.state.phone}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email">Correo: </label></td>
                        <td><input type="text" name="email" onChange={this.handleInputChange} value={this.state.email}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password">Contraseña: </label></td>
                        <td><input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="role">Rol: </label></td>
                        <td>
                            <select name="role" onChange={this.handleInputChange}>
                                <option value="student">Estudiante</option>
                                <option value="tutor">Tutor</option>
                                <option value="administrator">Administrador</option>
                            </select>
                        </td>
                    </tr>
                    <tr><br/></tr>
                    <tr>
                        <td> <input type="submit" value="Registrar"/> </td>
                    </tr>
                    </table>
                </form>
        </main>
      );
    }
  }

  export default Register;
