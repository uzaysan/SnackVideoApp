import React, {useState, useRef, useEffect} from 'react';
import {View, useColorScheme, TouchableHighlight, Text} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import PostRecyclerView from '../components/PostRecyclerView';

const ProfilePostsScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {posts, getPosts, refreshing, onRefresh, hasMore, onItemDeleted} =
    route?.params;

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
          @{route?.params?.username}
        </Text>
      </View>
      <PostRecyclerView
        style={{flex: 1}}
        posts={posts}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={getPosts}
        onItemDeleted={onItemDeleted}
        hasMore={hasMore}
      />
    </View>
  );
};

export default ProfilePostsScreen;
