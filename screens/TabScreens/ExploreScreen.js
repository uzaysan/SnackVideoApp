import React, {useState, useEffect, useRef} from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import {useSelector, useDispatch} from 'react-redux';
import GridRecyclerView from '../../components/GridRecyclerView';
import {PostApi} from '../../api/Post';
import {setGridExplorePosts} from '../../store/Post/action';

const ExploreScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const loading = useRef(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.exploreGrid);
  console.log('GridPosts : ' + posts);
  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const getPosts = async () => {
    if (loading.current) return;
    loading.current = true;
    try {
      const result = await PostApi.getHomeObjects(null);
      console.log(result);
      dispatch(setGridExplorePosts(result.posts));
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
