import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Profile.css";
import Spinner from "./Spinner";
import { loadUser } from "../../actions/authActions";

const Profile = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      {user === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-wrapper">
            <div className="profile-container">
              <div className="profile">
                <img src={user.avatar} className="round-img" alt="" />
                <div>
                  <p>Name: {user.name}</p>
                  <p>ID: {user._id}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Profile);
