import React from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

const Comment = ({item}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const comment = useSelector(state => state.comment[item.objectId]);
  const user = useSelector(state => state.user[comment.user]);
  const navigation = useNavigation();

  const onProfileClick = () => {
    navigation.push('Profile', {userId: user?.objectId});
  };

  return (
    <View
      style={{
        backgroundColor: isDarkMode
          ? colors_dark.colorPrimary
          : colors_light.colorPrimary,
        marginTop: 3,
        marginBottom: 3,
        width: '100%',
        flexDirection: 'row',
      }}>
      <FastImage
        style={{margin: 5, width: 45, height: 45, borderRadius: 25}}
        resizeMode={'cover'}
        fadeDuration={0}
        source={{
          uri: user.profile_photo.url,
        }}
      />
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
            onPress={onProfileClick}
            style={{
              color: isDarkMode
                ? colors_dark.textColor
                : colors_light.textColor,
              fontWeight: 'bold',
            }}>
            {user.name}
          </Text>
          <Text
            onPress={onProfileClick}
            style={{
              marginLeft: 5,
              color: colors_light.neutralColor,
            }}>
            @{user?.username}
          </Text>
        </View>
        <Text
          style={{
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
            marginTop: 3,
            marginBottom: 5,
            fontSize: 15,
          }}>
          {comment.comment}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
