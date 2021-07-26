import React, {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import {useDispatch} from 'react-redux';
import PostRecyclerView from '../../components/PostRecyclerView';
import {PostApi} from '../../api/Post';
import {addPosts} from '../../store/Post/action';
import {addUsers} from '../../store/User/action';
import {toastMessage} from '../../Helper/Functions';

const HomeScreen = props => {
  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const onItemDeleted = postId => {
    setPosts(posts => posts.filter(item => item.objectId !== postId));
  };

  const getPosts = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    if (!hasMore.current && !isRefresh) return;
    try {
      const result = await PostApi.getHomeObjects(
        isRefresh ? '' : date.current.iso,
      );
      date.current = result.date;
      hasMore.current = result.hasMore;
      const userList = [];
      const postList = [];
      const forList = [];
      for (const post of result.posts) {
        forList.push({type: 'Post', objectId: post.objectId});
        userList.push({...post.user});
        post.user = post.user.objectId;
        postList.push(post);
      }
      dispatch(addUsers(userList));
      dispatch(addPosts(postList));
      setPosts(posts => {
        if (isRefresh) return forList;
        return posts.concat(forList);
      });
      setRefreshing(false);
      loading.current = false;
    } catch (err) {
      console.log(JSON.stringify(result.error));
      setRefreshing(false);
      hasMore.current = true;
      loading.current = false;
      toastMessage(strings_eng.error);
    }
  };

  useEffect(() => {
    getPosts();
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
          {strings_eng.home}
        </Text>
      </View>
      <PostRecyclerView
        style={{flex: 1}}
        posts={posts}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={getPosts}
        onItemDeleted={onItemDeleted}
        hasMore={hasMore}
      />
    </View>
  );
};
export default HomeScreen;
