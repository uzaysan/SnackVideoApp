import {TYPE_LOGIN, TYPE_LOGOUT} from './actions';

const INITIAL_STATE = {
  currentUser: undefined,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE_LOGIN:
      return {...state, currentUser: action.payload};
    case TYPE_LOGOUT:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};
