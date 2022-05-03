import React, { Component} from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';

class Student extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
    }

    this.setData = this.setData.bind(this);
  }

  setData({name, email, phone}) {
    this.setState({
      name,
      email,
      phone,
    })
  }

  render() {

    return (
      <main>
        <NavBar role='tutor' />
        <h2>Area Estudiante</h2>
        <h3>Información personal</h3>
        <EditPersonalData
          name={this.state.name}
          email={this.state.email}
          phone={this.state.phone}
        />
        <h3>Sesiones programadas</h3>
      </main>
    );
  }

  componentDidMount() {
    window.client.getUser('student', this.setData);
  }
}

class EditPersonalData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSubUpPer = this.handleSubUpPer.bind(this);

  }

  handleSubUpPer(e, props) {
    console.log('modificado');
    this.setState({edit: !this.state.edit});
    e.preventDefault();
  }

  handleClick(e) {
    this.setState({edit: !this.state.edit});
    e.preventDefault();
  }

  render() {
    const {name, email, phone, handleSubUpPer} = this.props;
    if (!this.state.edit)
      return(
        <PersonalData
          name={name}
          email={email}
          phone={phone}
          handleClickUp={this.handleClick} />
      );
    else
      return (
        <FormPersonalData
          name={name}
          email={email}
          phone={phone}
          handleSubUpPer={this.handleSubUpPer} />
      );

  }

}

const PersonalData = ({name, email, phone, handleClickUp}) => {

  return (
    <div>
      <table>
          <tr>
              <td>Nombre:</td>
              <td>{name}</td>
          </tr>
          <tr>
              <td>Correo:</td>
              <td>{email}</td>
          </tr>
          <tr>
              <td>Celular:</td>
              <td>{phone}</td>
          </tr>
          <tr><br/></tr>
          <tr>
            <button onClick={e => handleClickUp(e)}>
              Modificar
            </button>
          </tr>
      </table>
    </div>
  );

}

class FormPersonalData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      email: props.email,
      phone: props.phone,
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
      <form onSubmit={this.props.handleSubUpPer}>
          <table>
              <tr>
                  <td><label htmlFor="name">Nombre: </label></td>
                  <td><input type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/></td>
              </tr>
              <tr>
                  <td><label htmlFor="email">Correo: </label></td>
                  <td><input type="text" name="email" onChange={this.handleInputChange} value={this.state.email}/></td>
              </tr>
              <tr>
                  <td><label htmlFor="phone">Telefono: </label></td>
                  <td><input type="text" name="phone" onChange={this.handleInputChange} value={this.state.phone}/></td>
              </tr>
              <tr><br/></tr>
              <tr>
                  <td> <input type="submit" value="Confirmar"/> </td>
              </tr>
              </table>
          </form>
    );
  }
}

export default Student;
