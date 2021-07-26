import React, {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Text, FlatList} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import Notification from '../../components/Notification';
import {NotificationApi} from '../../api/Notification';
import {addUsers} from '../../store/User/action';
import {addPosts} from '../../store/Post/action';
import {addComments} from '../../store/Comment/action';
import {addNotifications} from '../../store/Notification/action';
import {toastMessage} from '../../Helper/Functions';
import {useDispatch} from 'react-redux';

const NotificationScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [notifs, setNotifs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);

  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    getNotifs(true);
  };

  const getNotifs = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    if (!hasMore.current && !isRefresh) return;
    try {
      const result = await NotificationApi.getNotifications(
        isRefresh ? '' : date.current.iso,
      );
      date.current = result.date;
      hasMore.current = result.hasMore;
      const userList = [];
      const postList = [];
      const commentList = [];
      const forList = [];
      for (const notif of result.notifs) {
        forList.push({type: 'Notif', objectId: notif.objectId});
        const post = notif.post;
        const comment = notif.comment;
        if (post) {
          userList.push({...post.user});
          post.user = post.user.objectId;
          postList.push({...post});
          notif.post = notif.post.objectId;
        }
        if (comment) {
          userList.push({...comment.user});
          comment.user = comment.user.objectId;
          commentList.push({...comment});
          notif.comment = notif.comment.objectId;
        }
        userList.push({...notif.from});
        notif.from = notif.from.objectId;
      }
      dispatch(addUsers(userList));
      dispatch(addPosts(postList));
      dispatch(addComments(commentList));
      dispatch(addNotifications(result.notifs));
      setNotifs(notifs => {
        if (isRefresh) return forList;
        return notifs.concat(forList);
      });
      setRefreshing(false);
      loading.current = false;
    } catch (err) {
      console.log(err);
      setRefreshing(false);
      hasMore.current = true;
      loading.current = false;
      toastMessage(strings_eng.error);
    }
  };

  useEffect(() => {
    getNotifs();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
      }}>
      <View
        style={{
          backgroundColor: isDarkMode
            ? colors_dark.colorPrimary
            : colors_light.colorPrimary,
          height: 50,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
          }}>
          {strings_eng.notification}
        </Text>
      </View>
      <FlatList
        style={{flex: 1}}
        data={notifs}
        initialNumToRender={10}
        keyExtractor={item => item.objectId}
        maxToRenderPerBatch={12}
        onEndReached={getNotifs}
        onRefresh={onRefresh}
        refreshing={refreshing}
        windowSize={20}
        renderItem={({item, index}) => {
          return <Notification item={item} />;
        }}
      />
    </View>
  );
};

export default NotificationScreen;
