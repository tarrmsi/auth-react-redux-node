import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login } from "../../actions/authActions";
import "./Login.css";

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onHandleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  const onHandleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuth) {
    return <Redirect to='/profile' />;
  }

  return (
    <React.Fragment>
      <div className='wrapper'>
        <div className='form-wrapper'>
          <form onSubmit={onHandleSubmit}>
            <h1>Login Here</h1>
            <div className='email'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={onHandleChange}
              />
            </div>
            <div className='password'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={onHandleChange}
              />
            </div>
            <div className='createAccount'>
              <button>Sign In</button>
              <small>
                Don't Have an Account? <Link to='/register'>Sign Up</Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);
