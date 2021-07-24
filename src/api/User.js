import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../../keys';
import Parse from 'parse/react-native.js';
import {store} from '../store/store';

const login = async (username, password) => {
  let result = await fetch(
    `${BASE_URL}login?username=${username}&password=${password}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': PARSE_APP_ID,
        'X-Parse-REST-API-Key': PARSE_REST_KEY,
      },
    },
  );
  return await result.json();
};

const subscribeToggle = async userId => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {error: 'Session token is needed'};
  try {
    const result = await Parse.Cloud.run(
      'subscribeToggle',
      {userId: userId},
      {sessionToken: sessionToken},
    );
    return result.toJSON();
  } catch (err) {
    return {error: err};
  }
};

const updateProfile = async (name, bio, profile_photo) => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {error: 'Session token is needed'};
  try {
    const updatedUser = await Parse.Cloud.run(
      'updateProfile',
      {name: name, bio: bio, profile_photo: profile_photo},
      {sessionToken: sessionToken},
    );
    return updatedUser.toJSON();
  } catch (err) {
    return {error: err};
  }
};

export const UserApi = {
  login: login,
  subscribeToggle: subscribeToggle,
  updateProfile: updateProfile,
};
