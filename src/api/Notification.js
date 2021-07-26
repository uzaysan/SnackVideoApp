import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../../keys';
import {store} from '../store/store';

const getNotifications = async date => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) throw 'session token is needed';
  let result = await fetch(
    `${BASE_URL}functions/getNotifications?date=${date}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': PARSE_APP_ID,
        'X-Parse-REST-API-Key': PARSE_REST_KEY,
        'X-Parse-Session-Token': sessionToken,
      },
    },
  );
  result = await result.json();
  console.log(JSON.stringify(result));
  return result.result;
};

export const NotificationApi = {
  getNotifications: getNotifications,
};
