import Toast from 'react-native-simple-toast';

export const toastMessage = str => {
  Toast.show(str, Toast.LONG);
};

export const getRelativeTime = date => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval >= 1) {
    const year = Math.floor(interval);
    return `${year} ${year === 1 ? 'year' : 'years'}`;
  }
  interval = seconds / 2592000;
  if (interval >= 1) {
    const month = Math.floor(interval);
    return `${month} ${month === 1 ? 'month' : 'months'}`;
  }
  interval = seconds / 86400;
  if (interval >= 1) {
    const day = Math.floor(interval);
    return `${day} ${day === 1 ? 'day' : 'days'}`;
  }
  interval = seconds / 3600;
  if (interval >= 1) {
    const hour = Math.floor(interval);
    return `${hour} ${hour === 1 ? 'hour' : 'hours'}`;
  }
  interval = seconds / 60;
  if (interval >= 1) {
    const minute = Math.floor(interval);
    return `${minute} ${minute === 1 ? 'minute' : 'minutes'}`;
  }
  const second = Math.floor(interval);
  return `${second} ${second === 1 ? 'second' : 'seconds'}`;
};

export const arrangeItemsToGrid = list => {
  let tmpList = [];
  let postTree = {};

  for (let i = 0; i < list.length; i = i + 3) {
    if (list.length - (i + 1) < 3) {
      continue;
    }
    postTree[list[i].objectId] = list[i];
    postTree[list[i + 1].objectId] = list[i + 1];
    postTree[list[i + 2].objectId] = list[i + 2];
    tmpList.push({
      objectId: Math.random().toString(),
      data: [
        {type: 'Post', objectId: list[i].objectId},
        {type: 'Post', objectId: list[i + 1].objectId},
        {type: 'Post', objectId: list[i + 2].objectId},
      ],
    });
  }
  return {gridPosts: tmpList, newPostTree: postTree};
};
