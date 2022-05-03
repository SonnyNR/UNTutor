import React, { Component} from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';

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

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {

      const user = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      }

      window.client.addUser(user, this.state.role);

      event.preventDefault();
    }

    render() {
      return (
        <main>
        <NavBar />
            <h2>Registro</h2>
            <form onSubmit={this.handleSubmit}>
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

  export default Form;
