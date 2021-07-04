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
