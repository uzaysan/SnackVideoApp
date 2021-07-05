import React, {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import {useDispatch} from 'react-redux';
import GridRecyclerView from '../../components/GridRecyclerView';
import {PostApi} from '../../api/Post';
import {addPosts} from '../../store/Post/action';
import {addUsers} from '../../store/User/action';

const ExploreScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const loading = useRef(false);
  const [refreshing, setRefreshing] = useState(true);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const arrangeItemsToGrid = list => {
    let tmpList = [];

    for (let i = 0; i < list.length; i = i + 3) {
      if (list.length - (i + 1) < 3) {
        continue;
      }
      tmpList.push({
        objectId: Math.random().toString(),
        data: [list[i], list[i + 1], list[i + 2]],
      });
    }
    return tmpList;
  };

  const getPosts = async () => {
    if (loading.current) return;
    loading.current = true;
    try {
      const result = await PostApi.getExplorePosts();
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
      setPosts(arrangeItemsToGrid(forList));
    } catch (err) {
      console.log('error ' + err);
    }
    loading.current = false;
    setRefreshing(false);
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
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
          }}>
          {strings_eng.explore}
        </Text>
      </View>
      <GridRecyclerView
        style={{flex: 1}}
        posts={posts}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default ExploreScreen;
