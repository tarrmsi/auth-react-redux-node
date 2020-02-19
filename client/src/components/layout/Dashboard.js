import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "./Spinner";
import "./Dashboard.css";

const Dashboard = ({ auth: { user, loading } }) => {
  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="dashboard-wrapper" style={{ margin: "45px" }}>
        <h1 className="dashboard">Dashboard</h1>
        <h2>Welcome {user && user.name}</h2>
        {user !== null ? (
          <Fragment>
            <Link className="btn-dash" to="/profile">
              View Profile
            </Link>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Dashboard);
