import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOAD_USER,
  LOGOUT
} from "./types";

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth/user");

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  const res = await axios.get("/api/auth/logout");

  dispatch({
    type: LOGOUT,
    payload: res.data
  });
};
