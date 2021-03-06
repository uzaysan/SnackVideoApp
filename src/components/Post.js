import {useNavigation} from '@react-navigation/native';
import {getRelativeTime, toastMessage} from '../Helper/Functions';
import React, {useState, useEffect} from 'react';
import {
  useColorScheme,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {colors_dark, colors_light} from '../values/Colors';

import {store} from '../store/store';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {likeToggle} from '../store/Post/action';

import MentionHashtagTextView from './MentionHashtagTextView';
import VideoPlayer from './VideoPlayer';
import {PostApi} from '../api/Post';

const Post = ({item, onItemDeleted, isComments = false}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const iconColor = isDarkMode ? 'white' : 'black';
  const navigation = useNavigation();

  const post = useSelector(state => state.post[item.objectId]);
  const user = useSelector(state => state.user[post.user]);

  const [collapsed, setCollapsed] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  //const [liked, setLiked] = useState(post.liked);
  const collapseExpandText = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  const onProfileClick = () => {
    navigation.push('Profile', {userId: user?.objectId});
  };

  const onCommentsClick = () => {
    if (isComments) return;
    navigation.push('CommentsScreen', {post: item});
  };

  const likeClick = () => {
    PostApi.likeToggle(post.objectId);
    //setLiked(pre => !pre);
    dispatch(likeToggle(post.objectId));
  };

  const reportPost = () => {
    PostApi.reportPost(post.objectId);
    toastMessage('Post reported.');
    setIsMenuVisible(false);
  };

  const deletePost = async () => {
    setIsMenuVisible(false);
    try {
      await PostApi.deletePost(post.objectId);
      toastMessage('Post deleted.');
      onItemDeleted(post.objectId);
    } catch (err) {
      toastMessage('An error occured while deleting post.');
      console.log(err);
    }
  };

  const mentionHashtagClick = text => {
    if (text.startsWith('#')) navigation.push('HashtagScreen', {hashtag: text});
    else navigation.push('GuestProfile', {username: text});
  };

  const openMenu = () => {
    setIsMenuVisible(true);
  };

  useEffect(() => {
    setCollapsed(true);
    //setLiked(post.liked);
  }, [post]);

  return (
    <View style={styles.main}>
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
            {post.user === store.getState().auth.currentUser?.objectId && (
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
                onPress={deletePost}>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    style={{marginLeft: 15}}
                    name="trash"
                    size={28}
                    color={
                      isDarkMode ? colors_dark.text : colors_light.textColor
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
                    Delete
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            {post.user !== store.getState().auth.currentUser?.objectId && (
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
                onPress={reportPost}>
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
                    Report
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </Pressable>
      </Modal>
      <View
        style={{
          width: '100%',
          marginRight: 5,
          marginLeft: 5,
          backgroundColor: isDarkMode
            ? colors_dark.colorPrimary
            : colors_light.colorPrimary,
          overflow: 'hidden',
        }}>
        <View onPress={onProfileClick} style={styles.photoAndNameArea}>
          <FastImage
            onPress={onProfileClick}
            style={styles.profilePhoto}
            resizeMode={'cover'}
            fadeDuration={0}
            source={{
              uri: user.profile_photo.url,
            }}
          />
          <View style={styles.nameUsernameLayout}>
            <Text
              onPress={onProfileClick}
              style={{
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
                fontWeight: 'bold',
              }}>
              {user.name}
            </Text>
            <Text onPress={onProfileClick} style={styles.usernameText}>
              @{user?.username}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={
              isDarkMode ? colors_dark.rippleColor : colors_light.rippleColor
            }
            onPress={openMenu}
            style={styles.postMenuTouchable}>
            <Entypo name="dots-three-horizontal" size={17} color={iconColor} />
          </TouchableHighlight>
        </View>
        {post.description.length > 0 && (
          <MentionHashtagTextView
            onPress={collapseExpandText}
            style={{
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              fontSize: 14.4,
              color: isDarkMode
                ? colors_dark.textColor
                : colors_light.textColor,
            }}
            numberOfLines={collapsed ? 1 : 100}
            ellipsizeMode={'tail'}
            mentionHashtagPress={mentionHashtagClick}
            mentionHashtagColor={'#0384BE'}>
            {post.description}
          </MentionHashtagTextView>
        )}
      </View>
      <VideoPlayer
        style={{
          ...styles.video,
          aspectRatio:
            post.media.width / post.media.height < 0.75
              ? 0.75
              : post.media.width / post.media.height > 1.25
              ? 1.25
              : post.media.width / post.media.height,
        }}
        id={post.id}
        uri={post.media.media.url}
        thumbnail={post.media.thumbnail.url}
        id={post.objectId}
        views={post.views}
      />
      <View
        style={{
          width: '100%',
          height: 42,
          marginRight: 5,
          marginLeft: 5,
          backgroundColor: isDarkMode
            ? colors_dark.colorPrimary
            : colors_light.colorPrimary,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          style={{flex: 4}}
          underlayColor={
            isDarkMode ? colors_dark.rippleColor : colors_light.rippleColor
          }
          onPress={likeClick}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              style={{marginLeft: 15}}
              name="heart"
              size={28}
              color={post.liked ? 'red' : colors_dark.neutralColor}
            />

            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: 'bold',
                color: colors_dark.neutralColor,
              }}>
              {post.likes}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{flex: 4}}
          underlayColor={
            isDarkMode ? colors_dark.rippleColor : colors_light.rippleColor
          }
          onPress={onCommentsClick}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              style={{marginLeft: 10}}
              name="chatbubble"
              size={25}
              color={colors_dark.neutralColor}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: 'bold',
                color: colors_dark.neutralColor,
              }}>
              {post.comments}
            </Text>
          </View>
        </TouchableHighlight>

        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={{color: colors_dark.neutralColor, marginLeft: 5}}>
            {getRelativeTime(new Date(post.createdAt))}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  photoAndNameArea: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 50,
  },
  profilePhoto: {
    width: 40,
    backgroundColor: colors_light.neutralColor,
    aspectRatio: 1,
    marginLeft: 5,
    borderRadius: 20,
  },
  nameUsernameLayout: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    overflow: 'hidden',
  },
  postMenuTouchable: {
    width: 40,
    marginRight: 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  usernameText: {
    marginLeft: 5,
    color: colors_light.neutralColor,
  },

  video: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default Post;
