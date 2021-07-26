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
    const newPost = {
      ...state[action.payload],
      liked: !state[action.payload].liked,
      likes: state[action.payload].liked
        ? state[action.payload].likes - 1
        : state[action.payload].likes + 1,
    };
    const newState = {...state, [action.payload]: newPost};

    return {...newState};
  } else {
    return state;
  }
};
