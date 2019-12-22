import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT
} from "../actions/types";

const initialState = {
  profile: null,
  isAuth: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        profile: payload,
        isAuth: true,
        loading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        ...payload,
        isAuth: false,
        loading: false
      };
    default:
      return state;
  }
}
