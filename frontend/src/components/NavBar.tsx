import { Link, useLocation } from 'react-router-dom';
import checkMarkLogo from '../assets/check-mark.png';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className='nav-list'>
        <div>
          <Link to='/' className='nav-title'>
            <img src={checkMarkLogo} alt='logo' className='logo-navbar' />
            Inspection tracker
          </Link>
        </div>
        <div className={location.pathname === '/about' ? 'active' : ''}>
          <Link to='/about'>About</Link>
        </div>
      </ul>
      <div className='nav-user'>Johan Hedberg</div>
    </nav>
  );
};

export default NavBar;
