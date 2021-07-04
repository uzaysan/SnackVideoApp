export const TYPE_LOGIN = 'TYPE_LOGIN';
export const TYPE_LOGOUT = 'TYPE_LOGOUT';

export const loginAction = user => {
  return {
    type: TYPE_LOGIN,
    payload: user,
  };
};

export const logoutAction = () => {
  return {
    type: TYPE_LOGOUT,
  };
};
