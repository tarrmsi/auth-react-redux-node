import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
      <h1 style={{ paddingTop: "45px", textAlign: "left", margin: "25px" }}>
        Profile Page
      </h1>
      <p>Hello {profile.username}</p>
      <p>Profile Info</p>
      <p>Email: {profile.email}</p>
      <p>ID: {profile._id}</p>
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
