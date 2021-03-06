import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableHighlight,
  TextInput,
  FlatList,
} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';
import {strings_eng} from '../values/Strings';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {PostApi} from '../api/Post';
import {addUsers} from '../store/User/action';
import {addComments} from '../store/Comment/action';
import Comment from '../components/Comment';
import ProgressBar from '../components/ProgressBar';
import {Constants} from '../Helper/Constants';
import Post from '../components/Post';

const CommentsScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    route?.params?.post,
    Constants.loadItem,
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const currentUser = useSelector(state => state.auth.currentUser?.objectId);
  const postId = route?.params?.post?.objectId;

  const date = useRef({iso: ''});
  const loading = useRef(false);
  const hasMore = useRef(true);

  const onRefresh = () => {
    setRefreshing(true);
    getComments(true);
  };

  const onItemDeleted = () => {
    navigation.goBack();
  };

  const getComments = async (isRefresh = false) => {
    if (loading.current) return;
    loading.current = true;
    const result = await PostApi.getComments(
      postId,
      isRefresh ? '' : date.current.iso,
    );
    date.current = result.date;
    hasMore.current = result.hasMore;
    const userList = [];
    const forList = [];

    for (const comment of result.comments) {
      userList.push({...comment.user});
      comment.user = comment.user.objectId;
      forList.push({type: 'Comment', objectId: comment.objectId});
    }
    dispatch(addComments(result.comments));
    dispatch(addUsers(userList));
    setComments(comments => {
      if (isRefresh) return [route?.params?.post, ...forList];
      if (
        comments.length > 0 &&
        comments[comments.length - 1].type === Constants.loadItem.type
      ) {
        comments.splice(comments.length - 1, 1);
      }
      comments = comments.concat(forList);
      if (result.hasMore) comments.push(Constants.loadItem);
      return comments;
    });
    setRefreshing(false);
    loading.current = false;
  };

  useEffect(() => {
    getComments();
  }, []);

  const onSendButtonClick = () => {
    PostApi.commentToPost(postId, commentText);
    const id = Math.random().toString();
    dispatch(
      addComments([
        {
          user: currentUser,
          comment: commentText,
          createdAt: new Date(),
          objectId: id,
        },
      ]),
    );
    setComments(pre => [...pre, {type: 'Comment', objectId: id}]);
    setCommentText('');
  };
  const onBackPress = () => {
    navigation.goBack();
  };

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
          {strings_eng.comments}
        </Text>
      </View>
      <FlatList
        style={{flex: 1}}
        data={comments}
        contentContainerStyle={{marginTop: 3, paddingBottom: 6}}
        initialNumToRender={20}
        keyExtractor={item => item.objectId}
        maxToRenderPerBatch={10}
        onRefresh={onRefresh}
        refreshing={refreshing}
        windowSize={10}
        renderItem={({item, index}) => {
          if (item.type === 'Load') return <ProgressBar />;
          else if (item.type === 'Post')
            return (
              <Post
                item={item}
                onItemDeleted={onItemDeleted}
                isComments={true}
              />
            );
          return <Comment item={item} />;
        }}
      />
      <View
        style={{
          width: '100%',
          height: 55,
          flexDirection: 'row',
          backgroundColor: isDarkMode
            ? colors_dark.colorPrimary
            : colors_light.colorPrimary,
          alignContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 45,
            flex: 1,
            margin: 5,
            backgroundColor: isDarkMode
              ? colors_dark.backgroundColor
              : colors_light.backgroundColor,
            borderRadius: 25,
          }}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            multiline={true}
            style={{
              flex: 1,
              fontSize: 16,
              marginRight: 7,
              marginLeft: 7,
            }}
            placeholder={strings_eng.comment}
          />
        </View>
        <TouchableHighlight
          style={{
            height: 45,
            width: 45,
            borderRadius: 25,
            marginTop: 5,
            marginRight: 5,
            marginBottom: 5,
          }}
          onPress={onSendButtonClick}
          underlayColor={'#98cbfa'}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors_light.blue,
            }}>
            <Ionicons name="ios-send-sharp" size={24} color="white" />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CommentsScreen;
