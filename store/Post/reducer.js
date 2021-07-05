import {arrangeItemsToGrid} from '../../Helper/Functions';
import {TYPE_ADD_POSTS, TYPE_LIKE_TOGGLE} from './action';

const INITIAL_STATE = {};

export const postReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TYPE_ADD_POSTS) {
    const newState = {...state};
    for (const post of action.payload) {
      newState[post.objectId] = {...newState[post.objectId], ...post};
    }
    return {...newState};
  } else if (action.type === TYPE_LIKE_TOGGLE) {
    const newState = {...state};
    newState[action.payload].liked = !newState[action.payload].liked;
    if (newState[action.payload].liked) newState[action.payload].likes++;
    else newState[action.payload].likes--;
    return {...newState};
  } else {
    return state;
  }
};
