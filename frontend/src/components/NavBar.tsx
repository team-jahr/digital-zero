import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>The Inspection Tracker</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
