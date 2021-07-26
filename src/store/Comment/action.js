export const TYPE_ADD_COMMENT = 'TYPE_ADD_COMMENT';

export const addComments = comments => {
  return {
    type: TYPE_ADD_COMMENT,
    payload: comments,
  };
};
