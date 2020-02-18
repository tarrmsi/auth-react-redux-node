import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Alert.css";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className="container">
      <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert
});

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Alert);
