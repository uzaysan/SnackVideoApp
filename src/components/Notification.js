import React from 'react';
import {View, Text, useColorScheme, TouchableHighlight} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors_dark, colors_light} from '../values/Colors';
import {strings_eng} from '../values/Strings';
import {useSelector} from 'react-redux';

const Notification = ({item}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const notif = useSelector(state => state.notification[item.objectId]);
  const post = useSelector(state => state.post[notif.post]);
  const comment = useSelector(state => state.comment[notif.comment]);
  const user = useSelector(state => state.user[notif.from]);

  const onProfileClick = () => {};
  const onNotifClick = () => {};
  return (
    <TouchableHighlight
      onPress={onNotifClick}
      style={{
        backgroundColor: isDarkMode
          ? colors_dark.colorPrimary
          : colors_light.colorPrimary,
        marginTop: 3,
        marginBottom: 3,
        width: '100%',
      }}
      underlayColor={
        isDarkMode ? colors_dark.rippleColor : colors_light.rippleColor
      }>
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          onPress={onProfileClick}
          style={{
            margin: 5,
            width: 45,
            height: 45,
            borderRadius: 25,
            overflow: 'hidden',
          }}>
          <FastImage
            style={{flex: 1}}
            resizeMode={'cover'}
            fadeDuration={0}
            source={{
              uri: user?.profile_photo?.url,
            }}
          />
        </TouchableHighlight>

        <View
          style={{
            flex: 1,
            paddingLeft: 5,
          }}>
          <View
            style={{
              width: '100%',
              paddingTop: 3,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
                fontWeight: 'bold',
              }}>
              {`${user?.name} ${getTitleFromType(notif?.type)}`}
            </Text>
          </View>
          {notif?.type !== 'subscribe' && (
            <Text
              style={{
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
                marginTop: 3,
                marginBottom: 5,
                fontSize: 15,
              }}>
              {getSubText(notif?.type, post?.description, comment?.comment)}
            </Text>
          )}
        </View>
        <FastImage
          style={{margin: 5, width: 45, height: 45}}
          resizeMode={'cover'}
          fadeDuration={0}
          source={{
            uri: post?.media?.thumbnail2?.url,
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

const getTitleFromType = type => {
  if (type === 'like') return strings_eng.likedyourvideo;
  if (type === 'comment') return strings_eng.commentedtoyourvideo;
  if (type === 'subscribe') return strings_eng.subscribedtoyou;
};

const getSubText = (type, postDesc, commentDesc) => {
  if (type === 'like') return postDesc;
  if (type === 'comment') return commentDesc;
};

export default Notification;
