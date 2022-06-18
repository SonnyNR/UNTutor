import TopicList from "../student/Topic";
import fondo_un from "./img/fondo_un.jpg";
import AuthService from "../../services/auth.service";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./MainView.css";
import TopicCarrousel from "./TopicCarrousel";

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
    <section class="main-container">
      <div class="location" id="home">
        <div class="box">
          <div className="main-txt">
            <h1 id="home" className="home-text">
              Únete a nuestra comunidad que conecta estudiantes y tutores.
              Educación en línea sin barreras.
              <Link to="/register">
                <button className="try-btn">Pruebalo ahora</button>
              </Link>
            </h1>
          </div>
          <img src={fondo_un} className="un-img" />
        </div>
      </div>
    </section>
  );
};

const HomeUser = function ({ role, log }) {
  if (role == "student")
    return (
      <section class="main-container">
        <div class="location" id="home">
          <div class="box">
            <h1 id="home" className="home-text">
              Bienvenido estudiante, ¿necesitas ayuda en tu tarea?
            </h1>

            <TopicList />
            <h2>
              <TopicCarrousel />
            </h2>
          </div>
        </div>
      </section>
    );
  else if (role == "tutor")
    return (
      <section class="main-container">
        <div class="location" id="home">
          <div class="box">
            <div className="main-txt-div">
              <h1 id="home" className="home-text">
                Bienvenido tutor, ¿qué deseas enseñar hoy?
              </h1>
            </div>
            <TopicList />
            <h2>
              <TopicCarrousel />
            </h2>
          </div>
        </div>
      </section>
    );
  else if (role == "administrator")
    return (
      <section class="main-container">
        <div class="location" id="home">
          <h1 id="home" className="home-text">
            Bienvenido Administrador
          </h1>
          <div class="box">
            <button>Configuraciones</button>
          </div>
        </div>
      </section>
    );
};

export default MainView;
