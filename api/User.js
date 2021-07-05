import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../keys';
import {store} from '../store/store';
const login = (username, password) => {
  return fetch(`${BASE_URL}login?username=${username}&password=${password}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
    },
  })
    .then(response => response.json())
    .then(response => response)
    .catch(err => {
      throw err;
    });
};

const subscribeToggle = userId => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return;
  return fetch(`${BASE_URL}functions/subscribeToggle?userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Session-Token': sessionToken,
    },
  })
    .then(response => response)
    .catch(err => {
      throw err;
    });
};

export const UserApi = {
  login: login,
  subscribeToggle: subscribeToggle,
};
