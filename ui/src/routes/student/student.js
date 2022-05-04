import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import PersonalData from "./PersonalData";


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
        <PersonalData
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

export default Student;
