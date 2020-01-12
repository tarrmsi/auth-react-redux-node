import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Profile.css";
import { loadUser } from "../../actions/authActions";

const Profile = ({ loadUser, auth: { profile, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return loading && profile === null ? (
    <React.Fragment>
      <h1>Welcome to your profile</h1>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h1 className='dashboard'>Dashboard</h1>
          <h1>{profile.username}</h1>
          <p>ID: {profile._id}</p>
          <p>Email: {profile.email}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

Profile.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Profile);
