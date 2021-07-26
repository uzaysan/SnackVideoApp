import {TYPE_ADD_COMMENT} from './action';

const INITIAL_STATE = {};

export const commentReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TYPE_ADD_COMMENT) {
    const newState = {...state};
    for (const comment of action.payload) {
      newState[comment.objectId] = {...newState[comment.objectId], ...comment};
    }
    return {...newState};
  } else {
    return state;
  }
};
