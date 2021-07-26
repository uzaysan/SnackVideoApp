import React, {useState, useRef, useEffect} from 'react';
import {View, useColorScheme, TouchableHighlight, Text} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {useDispatch} from 'react-redux';
import PostRecyclerView from '../components/PostRecyclerView';
import {PostApi} from '../api/Post';
import {addPosts} from '../store/Post/action';
import {addUsers} from '../store/User/action';
import {toastMessage} from '../Helper/Functions';
import {strings_eng} from '../values/Strings';

const HashtagScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);

  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const onItemDeleted = postId => {
    setPosts(posts => posts.filter(item => item.objectId !== postId));
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const getPosts = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    if (!hasMore.current && !isRefresh) return;
    try {
      const result = await PostApi.getPostsByWord(
        isRefresh ? '' : date.current.iso,
        route?.params?.hashtag,
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
      console.log(JSON.stringify(err));
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
        overflow: 'hidden',
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
        <TouchableHighlight
          onPress={onBackPress}
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            marginStart: 20,
            top: 0,
            left: 0,
            width: 50,
          }}
          underlayColor={
            isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
          }>
          <AntDesign
            name="arrowleft"
            size={28}
            color={isDarkMode ? colors_dark.textColor : colors_light.textColor}
          />
        </TouchableHighlight>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
          }}>
          {route?.params?.hashtag}
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

export default HashtagScreen;
