import { Link } from "react-router-dom";

const NavBar = ({role}) => {

  if (role)
    return (<NavBarUser role={role} />);
  else
    return (<NavBarNoUser />);
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

const NavBarUser = function({role}) {
  return (
    <nav>
      <Link to={'/' + role}>Mi Area</Link>
      <br/>
      <Link to='/'>Inicio</Link>
      <br/>
      <br/>
      <form method='post' action='/api/logout'>
        <input type='submit' value='Cerrar sesión'/>
      </form>
    </nav>
  );
}

export default NavBar;
