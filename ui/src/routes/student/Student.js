import React, { Component } from "react";
import NavBar from "../components/NavBar";
import PersonalData from "./PersonalData";
import AuthService from "../../services/auth.service";
import "./student.css";

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
    };
  }

  render() {
    return (
      <main>
        <NavBar role="tutor" />
        <div className="area-tutor">
          <h2 className="area-txt">Area Estudiante</h2>
          <hr className="line"></hr>
          <h3>Información personal</h3>
          <PersonalData
            name={this.state.name}
            email={this.state.email}
            phone={this.state.phone}
          />
          <hr className="line"></hr>
          <h3>Sesiones programadas</h3>
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

export default Student;
