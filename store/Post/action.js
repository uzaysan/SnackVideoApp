export const TYPE_ADD_POSTS = 'TYPE_ADD_POSTS';
export const TYPE_LIKE_TOGGLE = 'TYPE_LIKE_TOGGLE';

export const addPosts = posts => {
  return {
    type: TYPE_ADD_POSTS,
    payload: posts,
  };
};

export const likeToggle = objectId => {
  return {
    type: TYPE_LIKE_TOGGLE,
    payload: objectId,
  };
};
