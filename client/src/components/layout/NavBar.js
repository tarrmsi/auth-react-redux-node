import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/authActions";

import "./NavBar.css";

const NavBar = ({ auth: { isAuth, loading }, logout }) => {
  const authLink = (
    <ul>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='#!' onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLink = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h3>
        <Link to='/'>Navigator</Link>
      </h3>
      {!loading && (
        <React.Fragment>{isAuth ? authLink : guestLink}</React.Fragment>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
