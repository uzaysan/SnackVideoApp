export const TYPE_ADD_HOME_OBJECTS = 'TYPE_ADD_HOME_OBJECTS';
export const TYPE_REFRESH_HOME_OBJECTS = 'TYPE_REFRESH_HOME_OBJECTS';
export const TYPE_LIKE_TOGGLE = 'TYPE_LIKE_TOGGLE';
export const TYPE_SET_GRID_EXPLORE_POSTS = 'TYPE_SET_GRID_EXPLORE_POSTS';

export const addHomeObjects = posts => {
  return {
    type: TYPE_ADD_HOME_OBJECTS,
    payload: posts,
  };
};

export const refreshHomeObjects = posts => {
  return {
    type: TYPE_REFRESH_HOME_OBJECTS,
    payload: posts,
  };
};

export const likeUnlikePost = postId => {
  return {
    type: TYPE_LIKE_TOGGLE,
    payload: postId,
  };
};

export const setGridExplorePosts = posts => {
  return {
    type: TYPE_SET_GRID_EXPLORE_POSTS,
    payload: posts,
  };
};
