import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='navbar-container'>
        <div className='navbar-wrapper'>
            <nav className='navbar'>
                <Link to={'/'} className='navbar-logo'>
                    <h3 className='site-title'>User <span>List</span></h3>
                </Link>
                <ul className='navbar-links'>
                    <li><NavLink to={'/'} activeClassName={'active'} >Home</NavLink></li>
                    <li><NavLink to={'/users'} activeClassName={'active'} >Find a user</NavLink></li>
                    <li><NavLink to={'/about'} activeClassName={'active'} >About Us</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header