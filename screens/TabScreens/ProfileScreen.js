import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  useColorScheme,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {store} from '../../store/store';
import ProfileComponent from '../../components/ProfileComponent';
import {addUsers, addUser} from '../../store/User/action';
import {addPosts} from '../../store/Post/action';
import GridItemProfile from '../../components/GridItemProfile';
import {PostApi} from '../../api/Post';
import {Constants} from '../../Helper/Constants';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const currentUserId = store.getState().auth.currentUser.objectId;

const ProfileScreen = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const profileId =
    route?.params?.userId || store.getState().auth.currentUser.objectId;

  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(true);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const dispatch = useDispatch();

  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);

  const user = useSelector(state => state.user[profileId]);

  const getPosts = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    const result = await PostApi.getPostsByUser(
      user.objectId,
      isRefresh ? '' : date.current.iso,
    );
    date.current = result.date;
    hasMore.current = result.hasMore;
    const userList = [];
    const postList = [];
    const forList = [];
    dispatch(addUser(result.user));
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
          flexDirection: 'row',
        }}>
        {profileId !== currentUserId && (
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
              color={
                isDarkMode ? colors_dark.textColor : colors_light.textColor
              }
            />
          </TouchableHighlight>
        )}

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
          }}>
          {'@' + user.username}
        </Text>
      </View>
      <FlatList
        style={{flex: 1}}
        data={posts}
        initialNumToRender={7}
        numColumns={3}
        keyExtractor={item => item.objectId}
        maxToRenderPerBatch={7}
        ListHeaderComponent={
          <ProfileComponent currentUserId={currentUserId} profile={user} />
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        windowSize={10}
        renderItem={({item, index}) => {
          let style;
          if ((index + 1) % 3 === 2) {
            style = {
              marginLeft: (2 * Constants.exploreItemMargin) / 3,
              marginRight: (2 * Constants.exploreItemMargin) / 3,
            };
          } else if ((index + 1) % 3 === 1) {
            style = {
              marginRight: (4 * Constants.exploreItemMargin) / 3,
            };
          } else {
            style = {
              marginLeft: (4 * Constants.exploreItemMargin) / 3,
            };
          }
          return <GridItemProfile item={item} style={style} />;
        }}
      />
    </View>
  );
};

export default ProfileScreen;
