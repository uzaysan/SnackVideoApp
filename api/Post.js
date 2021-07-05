import {BASE_URL, PARSE_APP_ID, PARSE_REST_KEY} from '../keys';
import {store} from '../store/store';

const getHomeObjects = date => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {posts: [], date: {iso: ''}, hasMore: true};
  return fetch(`${BASE_URL}functions/getHomeObjects?date=${date}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Session-Token': sessionToken,
    },
  })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {
      throw err;
    });
};

const likeToggle = postId => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {posts: [], date: {iso: ''}, hasMore: true};
  return fetch(`${BASE_URL}functions/likeToggle?postId=${postId}`, {
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

const getPostsByUser = (userId, date) => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {posts: [], date: {iso: ''}, hasMore: true};
  return fetch(
    `${BASE_URL}functions/getPostsByUser?userId=${userId}&date=${date}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': PARSE_APP_ID,
        'X-Parse-REST-API-Key': PARSE_REST_KEY,
        'X-Parse-Session-Token': sessionToken,
      },
    },
  )
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {
      throw err;
    });
};

const getExplorePosts = () => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {posts: [], date: {iso: ''}, hasMore: true};
  return fetch(`${BASE_URL}functions/getExplorePosts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'X-Parse-Session-Token': sessionToken,
    },
  })
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {
      throw err;
    });
};

const commentToPost = (postId, comment) => {
  const sessionToken = store.getState().auth.currentUser.sessionToken;
  if (!sessionToken) return {posts: [], date: {iso: ''}, hasMore: true};
  return fetch(
    `${BASE_URL}functions/commentToPost?postId=${postId}&comment=${comment}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': PARSE_APP_ID,
        'X-Parse-REST-API-Key': PARSE_REST_KEY,
        'X-Parse-Session-Token': sessionToken,
      },
    },
  )
    .then(response => response.json())
    .then(response => response.result)
    .catch(err => {
      throw err;
    });
};

export const PostApi = {
  getHomeObjects: getHomeObjects,
  likeToggle: likeToggle,
  getPostsByUser: getPostsByUser,
  getExplorePosts: getExplorePosts,
  commentToPost: commentToPost,
};
