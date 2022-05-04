import React, { Component} from 'react';
import NavBar from '../components/NavBar';
import PersonalData from "./PersonalData";

class Tutor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
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

        <h2>Area Tutor</h2>
        <h3>Información personal</h3>
        <PersonalData
          name={this.state.name}
          email={this.state.email}
          phone={this.state.phone}
        />
        <h3>Temáticas aprobadas</h3>
        <h3>Temáticas en proceso</h3>
        <h3>Sesiones programadas</h3>
        <h3>Exámenes programados</h3>
      </main>
    );
  }

  componentDidMount() {
    window.client.getUser('tutor', this.setData);
  }
}

export default Tutor;
