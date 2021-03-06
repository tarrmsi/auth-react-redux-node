import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "../../actions/authActions";
import { setAlert } from "../../actions/alert";
import "./Register.css";

const Register = ({ register, setAlert, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onHandleSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  const onHandleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="form-wrapper">
          <form onSubmit={onHandleSubmit}>
            <h1>Create Account</h1>
            <div className="username">
              <label>Username</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onHandleChange}
              />
            </div>
            <div className="email">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onHandleChange}
              />
            </div>
            <div className="password">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onHandleChange}
              />
            </div>
            <div className="password">
              <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={onHandleChange}
              />
            </div>
            <div className="createAccount">
              <button>Sign Up</button>
              <small>
                Already Have an Account? <Link to="/login">Sign In</Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { register, setAlert })(Register);
