import React, {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import {useSelector, useDispatch} from 'react-redux';
import PostRecyclerView from '../../components/PostRecyclerView';
import {PostApi} from '../../api/Post';
import {refreshHomeObjects, addHomeObjects} from '../../store/Post/action';

const HomeScreen = props => {
  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.home);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const getPosts = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    const result = await PostApi.getHomeObjects(date.current.iso);
    date.current = result.date;
    loading.current = false;
    hasMore.current = result.hasMore;
    if (isRefresh) dispatch(refreshHomeObjects(result.posts));
    else dispatch(addHomeObjects(result.posts));
    setRefreshing(false);
  };

  useEffect(() => {
    getPosts(true);
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
      />
    </View>
  );
};
export default HomeScreen;
