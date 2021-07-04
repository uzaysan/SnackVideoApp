import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../keys';

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

export const UserApi = {
  login: login,
};
