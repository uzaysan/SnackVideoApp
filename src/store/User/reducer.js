import {TYPE_ADD_USER, TYPE_SUBSCRIBE_TOGGLE} from './action';

const INITIAL_STATE = {};

export const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TYPE_ADD_USER) {
    const newUserTree = {...state};
    for (const user of action.payload) {
      newUserTree[user.objectId] = {...newUserTree[user.objectId], ...user};
    }
    return {...newUserTree};
  } else if (action.type === TYPE_SUBSCRIBE_TOGGLE) {
    const user = {
      ...state[action.payload],
      subscribed: state[action.payload].subscribed ? false : true,
      subscribers: state[action.payload].subscribed
        ? state[action.payload].subscribers - 1
        : state[action.payload].subscribers + 1,
    };
    return {...state, [action.payload]: user};
  } else {
    return state;
  }
};
