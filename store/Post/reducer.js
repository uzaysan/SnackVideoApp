import {arrangeItemsToGrid} from '../../Helper/Functions';
import {
  TYPE_ADD_HOME_OBJECTS,
  TYPE_LIKE_TOGGLE,
  TYPE_REFRESH_HOME_OBJECTS,
  TYPE_SET_GRID_EXPLORE_POSTS,
} from './action';

const INITIAL_STATE = {
  home: [],
  likes: [],
  exploreGrid: [],
  postTree: {},
};

export const postReducer = (state = INITIAL_STATE, action) => {
  if (action.type === TYPE_ADD_HOME_OBJECTS) {
    const newPostTree = {...state.postTree};
    const newHome = [...state.home];
    for (const post of action.payload) {
      newPostTree[post.objectId] = post;
      newHome.push({type: 'Post', objectId: post.objectId});
    }
    return {
      ...state,
      home: newHome,
      postTree: newPostTree,
    };
  } else if (action.type === TYPE_REFRESH_HOME_OBJECTS) {
    const newPostTree = {...state.postTree};
    const newHome = [];
    for (const post of action.payload) {
      newPostTree[post.objectId] = post;
      newHome.push({type: 'Post', objectId: post.objectId});
    }
    return {
      ...state,
      home: newHome,
      postTree: newPostTree,
    };
  } else if (action.type === TYPE_LIKE_TOGGLE) {
    const postTree = {...state.postTree};
    postTree[action.payload].liked = !postTree[action.payload].liked;
    return {...state, postTree: postTree};
  } else if (action.type === TYPE_SET_GRID_EXPLORE_POSTS) {
    const arrangedPosts = arrangeItemsToGrid(action.payload);
    const newPostTree = {...state.postTree, ...arrangedPosts.newPostTree};
    return {
      ...state,
      newPostTree: newPostTree,
      exploreGrid: arrangedPosts.gridPosts,
    };
  } else {
    return state;
  }
};
