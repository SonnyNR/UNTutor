import TopicList from "../student/Topic";
import fondo_un from "./img/fondo_un.jpg";
import AuthService from "../../services/auth.service";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./MainView.css";

class MainView extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(event) {
    AuthService.logout();
  }

  render() {
    if (this.props.role)
      return <HomeUser role={this.props.role} log={this.logout} />;
    else return <HomeNoUser />;
  }
}
const HomeNoUser = function () {
  return (
    /*if (this.props.role)
        return <NavBarUser role={this.props.role} log={this.logout} />;
      else return <NavBarNoUser />;*/
    <section class="main-container">
      <div class="location" id="home">
        <h1 id="home" className="home-text">
          Únete a nuestra comunidad que conecta estudiantes y tutores. Educación en línea sin barreras.
          <Link to="/register"><button className="try-btn">Pruebalo ahora</button></Link>
        </h1>
        <img src={fondo_un} className="un-img" />
        <div class="box"></div>
      </div>
      <TopicList />
    </section>
  );
};

const HomeUser = function ({ role, log }) {
  return (
    /*if (this.props.role)
            return <NavBarUser role={this.props.role} log={this.logout} />;
          else return <NavBarNoUser />;*/
    <section class="main-container">
      <div class="location" id="home">
        <h1 id="home" className="home-text">{role}
        </h1>
        <a id="home-img">
        </a>
        <div class="box"></div>
      </div>
      <TopicList />
    </section>
  );
};

export default MainView;
