import { Link, NavLink } from "react-router-dom";

//import svgs
import { ReactComponent as HomeIcon } from "../res/icons/home.svg";
import { ReactComponent as SearchIcon } from "../res/icons/search.svg";
import { ReactComponent as AboutIcon } from "../res/icons/about.svg";

const Header = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-wrapper">
        <nav className="navbar">
          <Link to={"/"} className="navbar-logo">
            <h3 className="site-title">
              User <span>List</span>
            </h3>
          </Link>
          <ul className="navbar-links">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <HomeIcon />
                <span className="desktop-only">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/users"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <SearchIcon />
                <span className="desktop-only">Find a user</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <AboutIcon />
                <span className="desktop-only">About</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
