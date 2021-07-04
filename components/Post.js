import {useNavigation} from '@react-navigation/native';
import {getRelativeTime} from '../Helper/Functions';
import React, {useState, useEffect} from 'react';
import {
  useColorScheme,
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {colors_dark, colors_light} from '../values/Colors';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {likeUnlikePost} from '../store/Post/action';

import MentionHashtagTextView from './MentionHashtagTextView';
import VideoPlayer from './VideoPlayer';

const Post = ({item}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const iconColor = isDarkMode ? 'white' : 'black';
  const navigate = useNavigation();
  const post = useSelector(state => state.post.postTree[item.objectId]);
  const [collapsed, setCollapsed] = useState(true);
  const [liked, setLiked] = useState(post.liked);
  const collapseExpandText = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  const likeClick = () => {
    setLiked(pre => !pre);
    dispatch(likeUnlikePost(post.objectId));
  };

  const mentionHashtagClick = text => {
    if (text.startsWith('#')) navigate('Hashtag', {hashtag: text});
    else navigate('GuestProfile', {username: text});
  };

  useEffect(() => {
    setCollapsed(true);
    setLiked(post.liked);
  }, [post]);

  return (
    <View style={styles.main}>
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
        <View style={styles.photoAndNameArea}>
          <Image
            style={styles.profilePhoto}
            resizeMode={'cover'}
            fadeDuration={0}
            source={{
              uri: post.user.profile_photo.url,
            }}
          />
          <View style={styles.nameUsernameLayout}>
            <Text
              style={{
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
                fontWeight: 'bold',
              }}>
              {post.user.name}
            </Text>
            <Text style={styles.usernameText}>@{post.user.username}</Text>
          </View>
          <TouchableHighlight
            underlayColor={colors_dark.neutralColor}
            onPress={() => {
              //showToastMessage("Deneme");
            }}
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
          style={{flex: 3}}
          underlayColor={'#eee'}
          onPress={likeClick}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              style={{marginLeft: 10}}
              name="heart"
              size={28}
              color={liked ? 'red' : colors_dark.neutralColor}
            />

            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: 'bold',
                color: colors_dark.neutralColor,
              }}>
              {liked ? post.likes + 1 : post.likes}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{flex: 3}}
          underlayColor={'#eee'}
          onPress={() => {
            //Open Comments
          }}>
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

        <View style={{flex: 3, alignItems: 'center'}}>
          <Text style={{color: colors_dark.neutralColor}}>
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
