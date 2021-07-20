import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../keys';
import Parse from 'parse/react-native.js';
import {store} from '../store/store';

const login = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password);
    return user.toJSON();
  } catch (err) {
    return {error: 'Login failed'};
  }
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
