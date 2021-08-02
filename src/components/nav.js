import { BrowserRouter as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../logo.svg';
function Nav() {
    return ( <nav className="nav">
      <Link to="/"><img className="nav__logo" src={logo} alt="logo" /></Link>
      <Link className="nav__icon" to="/my-account" aria-label="My Account"><FontAwesomeIcon icon="user" color="white" aria-hidden="true" /></Link>
    </nav>)
  }

  export default Nav;