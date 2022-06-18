import React, { Component } from "react";
import NavBar from "../components/NavBar";
import PersonalData from "./PersonalData";
import Topic from "./Topic";
import AuthService from "../../services/auth.service";
import "./Tutor.css";

class Tutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
    };

    this.setData = this.setData.bind(this);
  }

  setData({ name, email, phone }) {
    this.setState({
      name,
      email,
      phone,
    });
  }

  render() {
    return (
      <main>
        <NavBar role="tutor" />
        <div className="area-tutor">
          <h2>Area Tutor</h2>
          <h3>Información personal</h3>
          <PersonalData
            name={this.state.name}
            email={this.state.email}
            phone={this.state.phone}
          />
          <Topic />
          <h3>Sesiones programadas</h3>
          <h3>Exámenes programados</h3>
        </div>
      </main>
    );
  }

  componentDidMount() {
    let user = AuthService.getCurrentUser();
    this.setState({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }
}

export default Tutor;
