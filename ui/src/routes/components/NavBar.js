import { Link } from "react-router-dom";
import { Component } from "react";
import AuthService from "../../services/auth.service";
import logo from "./img/logo.svg";
import "./NavBar.css";
import userSVG from "./img/user-solid.svg";
import downArrow from "./img/sort-down-solid.svg";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(event) {
    AuthService.logout();
  }

  render() {
    if (this.props.role)
      return <NavBarUser role={this.props.role} log={this.logout} />;
    else return <NavBarNoUser />;
  }
}

const NavBarNoUser = function () {
  /*const [isOpen, setIsOpen] = useState(false)
  
      <button onClick={() => setIsOpen(true)}>Open Modal</button>*/
  return (
    <header>
      <Link to="/">
        <div class="untutorlogo">
          <a id="logo">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
        </div>
      </Link>
      <div className="btns">
        <Link to="/login">
          <button className="sesion-btn">Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button className="registro-btn">Registrarse</button>
        </Link>
      </div>
    </header>
  );
};

const NavBarUser = function ({ role, log }) {
  return (
    <header>
      <Link to="/">
        <div class="untutorlogo">
          <a id="logo">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
        </div>
      </Link>
      <nav>
        <div class="dropdown">
          <button className="userSVG">
            <img src={userSVG} className="userSVG-img" />
            <img src={downArrow} className="downArrow-img" />
          </button>
          <div className="dropdown-content">
            <Link to={"/" + role}>
              <a className="miArea">Mi Area</a>
            </Link>
            <br></br>
            <Link to="/">
              <a className="inicio">inicio</a>
            </Link>
            <div className="line"></div>
            <form
              className="cerrar"
              method="post"
              onSubmit={(e) => log(e)}
              action="/api/logout"
            >
              <button className="cerrar-btn" type="submit">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
