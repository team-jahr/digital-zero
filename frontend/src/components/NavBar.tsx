import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <Link to='/'>Inspection tracker</Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <div className='nav-user'>Johan Hedberg</div>
    </nav>
  );
};

export default NavBar;
