export const TYPE_LOGIN = 'TYPE_LOGIN';
export const TYPE_LOGOUT = 'TYPE_LOGOUT';

export const loginAction = auth => {
  return {
    type: TYPE_LOGIN,
    payload: auth,
  };
};

export const logoutAction = () => {
  return {
    type: TYPE_LOGOUT,
  };
};
