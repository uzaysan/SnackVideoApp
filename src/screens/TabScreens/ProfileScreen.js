import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  useColorScheme,
  Text,
  FlatList,
  TouchableHighlight,
  Modal,
  Pressable,
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
import Entypo from 'react-native-vector-icons/dist/Entypo';
import ProgressBar from '../../components/ProgressBar';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {toastMessage} from '../../Helper/Functions';
import {logoutAction} from '../../store/Auth/actions';
import {CommonActions} from '@react-navigation/native';

const ProfileScreen = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const profileId =
    route?.params?.userId || store.getState().auth.currentUser.objectId;
  const currentUserId = useSelector(state => state.auth.currentUser.objectId);
  const dispatch = useDispatch();

  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);
  const user = useSelector(state => state.user[profileId]);

  const [posts, setPosts] = useState([Constants.loadItem]);
  const [refreshing, setRefreshing] = useState(false);

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const onBackPress = () => {
    if (profileId === store.getState().auth.currentUser.objectId) return;
    navigation.goBack();
  };

  const onItemDeleted = postId => {
    setPosts(posts => posts.filter(item => item.objectId !== postId));
  };

  const onMenuPress = () => {
    setIsMenuVisible(true);
  };

  const onLogout = () => {
    //Logout
    dispatch(logoutAction());
    setIsMenuVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  const onReport = () => {
    //Report user
    toastMessage('Reported');
    setIsMenuVisible(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPosts(true);
  };

  const onItemClick = () => {
    navigation.push('ProfilePostsScreen', {
      posts: posts,
      getPosts: getPosts,
      refreshing: refreshing,
      onRefresh: onRefresh,
      hasMore: hasMore,
      username: user?.username,
      onItemDeleted: onItemDeleted,
    });
  };

  const getPosts = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    if (!hasMore.current & !isRefresh) return;
    const result = await PostApi.getPostsByUser(
      user?.objectId,
      isRefresh ? '' : date.current.iso,
    );
    date.current = result.date;
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
      if (posts.length > 0 && posts[posts.length - 1].type === 'Load') {
        posts.splice(posts.length - 1, 1);
      }
      posts = posts.concat(forList);
      if (result.hasMore) posts.push(Constants.loadItem);
      return posts;
    });
    setRefreshing(false);
    loading.current = false;
    hasMore.current = result.hasMore;
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
      <Modal
        style={{
          flex: 1,
        }}
        transparent={true}
        visible={isMenuVisible}
        animationType="none"
        onRequestClose={() => {
          setIsMenuVisible(false);
        }}>
        <Pressable
          onPress={() => {
            setIsMenuVisible(false);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#00000066',
          }}>
          <View
            onPress={null}
            style={{
              width: '90%',
              backgroundColor: isDarkMode
                ? colors_dark.colorPrimary
                : colors_light.colorPrimary,
            }}>
            {user?.objectId !== currentUserId && (
              <TouchableHighlight
                style={{
                  height: 50,
                  margin: 5,
                  width: '95%',
                }}
                underlayColor={
                  isDarkMode
                    ? colors_dark.rippleColor
                    : colors_light.rippleColor
                }
                onPress={onReport}>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    style={{marginLeft: 15}}
                    name="alert-circle"
                    size={28}
                    color={
                      isDarkMode
                        ? colors_dark.textColor
                        : colors_light.textColor
                    }
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: isDarkMode
                        ? colors_dark.textColor
                        : colors_light.textColor,
                    }}>
                    Report user
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            {user?.objectId === currentUserId && (
              <TouchableHighlight
                style={{
                  height: 50,
                  margin: 5,
                  width: '95%',
                }}
                underlayColor={
                  isDarkMode
                    ? colors_dark.rippleColor
                    : colors_light.rippleColor
                }
                onPress={onLogout}>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    style={{marginLeft: 15}}
                    name="md-exit"
                    size={28}
                    color={'#ff2b2b'}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#ff2b2b',
                    }}>
                    Logout
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </Pressable>
      </Modal>

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
        {user?.objectId !== currentUserId && (
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

        <TouchableHighlight
          onPress={onMenuPress}
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            marginStart: 20,
            top: 0,
            right: 0,
            width: 50,
          }}
          underlayColor={
            isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
          }>
          <Entypo
            name="menu"
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
          {'@' + user?.username}
        </Text>
      </View>

      <FlatList
        style={{flex: 1}}
        data={posts}
        initialNumToRender={7}
        numColumns={3}
        keyExtractor={item => item.objectId}
        maxToRenderPerBatch={7}
        onEndReached={getPosts}
        ListHeaderComponent={
          <ProfileComponent currentUserId={currentUserId} profile={user} />
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        windowSize={10}
        renderItem={({item, index}) => {
          if (item.type === 'Load') return <ProgressBar />;
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
          return (
            <GridItemProfile item={item} style={style} onClick={onItemClick} />
          );
        }}
      />
    </View>
  );
};

export default ProfileScreen;
