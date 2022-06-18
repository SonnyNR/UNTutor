import React, { Component} from 'react';
import NavBar from './components/NavBar';
import AuthService from '../services/auth.service';
import { Navigate, Link } from "react-router-dom";
import "./Register.css";

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
        <div className="main-container">
          <div class="container-2" id="container-2">
            <div class="form2-container">
              <form className='form-signup' onSubmit={this.handleSubmitForm}ñ>
                <h1 className="reg-title">Únete a Untutor</h1>
                <br/>
                <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email} placeholder="Correo electrónico"/>
                <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Contraseña"/>
                <input type="text" name="name" onChange={this.handleInputChange} value={this.state.name} placeholder="Nombre Completo"/>
                <input type="text" name="phone" onChange={this.handleInputChange} value={this.state.phone} placeholder="Documento de identidad"/>
                
                <a>Deseo registrarme como:</a>
                <select className='selectRole' name="role" onChange={this.handleInputChange}>
                                <option disabled selected value>-- seleccione una opción --</option>
                                <option value="student">Estudiante</option>
                                <option value="tutor">Tutor</option>
                                <option value="administrator">Administrador</option>
                            </select>
                <a>¿Ya estas registrado? <Link to='/login'><a className='inicio-secundario'>inicia sesión</a></Link> </a>
                <button className="sesion-cont-btn" value="Registrar">Regístrate</button>
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
        </main>
      );
    }
  }

  export default Register;
