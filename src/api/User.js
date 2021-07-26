import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../../keys';
import {store} from '../store/store';

const login = async (username, password) => {
  try {
    const result = await fetch(`${BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': PARSE_APP_ID,
        'X-Parse-REST-API-Key': PARSE_REST_KEY,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    return await result.json();
  } catch (err) {
    return {error: err};
  }
};

const subscribeToggle = async userId => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {error: 'Session token is needed'};
  return await fetch(`${BASE_URL}functions/subscribeToggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Session-Token': sessionToken,
    },
    body: JSON.stringify({userId: userId}),
  });
};

const updateProfile = async (name, bio, profile_photo) => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {error: 'Session token is needed'};
  let result = await fetch(`${BASE_URL}functions/updateProfile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Session-Token': sessionToken,
    },
    body: JSON.stringify({name: name, bio: bio, profile_photo: profile_photo}),
  });
  result = await result.json();
  return result.result;
};

const registerNewUser = async (username, email, name, password) => {
  let result = await fetch(`${BASE_URL}functions/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      name: name,
    }),
  });
  result = await result.json();
  return result.result;
};

export const UserApi = {
  login: login,
  subscribeToggle: subscribeToggle,
  updateProfile: updateProfile,
  registerNewUser: registerNewUser,
};
