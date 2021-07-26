export const TYPE_ADD_NOTIFICATION = 'TYPE_ADD_NOTIFICATION';

export const addNotifications = notifs => {
  return {
    type: TYPE_ADD_NOTIFICATION,
    payload: notifs,
  };
};
