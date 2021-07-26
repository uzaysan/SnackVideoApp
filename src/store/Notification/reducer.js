import {TYPE_ADD_NOTIFICATION} from './action';

const INITIAL_STATE = {};

export const notificationReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TYPE_ADD_NOTIFICATION) {
    const newState = {...state};
    for (const notif of action.payload) {
      newState[notif.objectId] = {...newState[notif.objectId], ...notif};
    }
    return {...newState};
  } else {
    return state;
  }
};
