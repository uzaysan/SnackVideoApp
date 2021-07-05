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
    const newUserTree = {...state};

    newUserTree[action.payload].subscribed =
      !newUserTree[action.payload].subscribed;
    if (newUserTree[action.payload].subscribed)
      newUserTree[action.payload].subscribers++;
    else newUserTree[action.payload].subscribers--;
    return {...newUserTree};
  } else {
    return state;
  }
};
