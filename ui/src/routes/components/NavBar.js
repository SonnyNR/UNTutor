import { Link } from "react-router-dom";
import {Component} from "react";
import AuthService from "../../services/auth.service"

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
            return (<NavBarUser role={this.props.role} log={this.logout}/>);
        else
            return (<NavBarNoUser />);

    }
}

const NavBarNoUser = function() {
  return (
    <div>
      <Link to='/login'>Login</Link>
      <br/>
      <Link to='/register'>Registro</Link>
      <br/>
      <Link to='/'>Inicio</Link>
    </div>
  );
}

const NavBarUser = function({role, log}) {
  return (
    <nav>
      <Link to={'/' + role}>Mi Area</Link>
      <br/>
      <Link to='/'>Inicio</Link>
      <br/>
      <br/>
      <form method='post' onSubmit={e => log(e)} action='/api/logout'>
        <input type='submit' value='Cerrar sesión'/>
      </form>
    </nav>
  );
}

export default NavBar;
