import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {colors_dark, colors_light} from '../values/Colors';
import {store} from '../store/store';
import {strings_eng} from '../values/Strings';
import {useDispatch} from 'react-redux';
import {subscribeToggle} from '../store/User/action';
import {UserApi} from '../api/User';
import {useNavigation} from '@react-navigation/core';

const ProfileComponent = ({profile, currentUserId}) => {
  const [subscribed, setSubscribed] = useState(profile.subscribed);

  useEffect(() => {
    setSubscribed(profile.subscribed);
  }, [profile]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const onButtonClick = () => {
    if (currentUserId === profile.objectId) {
      navigation.push('EditProfile');
    } else {
      setSubscribed(pre => !pre);
      UserApi.subscribeToggle(profile.objectId);
      dispatch(subscribeToggle(profile.objectId));
    }
  };

  return (
    <View
      style={{
        width: '100%',
        marginBottom: 1,
        backgroundColor: isDarkMode
          ? colors_dark.colorPrimary
          : colors_light.colorPrimary,
      }}>
      <View style={styles.topContainer}>
        <FastImage
          source={{
            uri: profile.profile_photo.url,
          }}
          style={styles.profilePhoto}
        />

        <View style={styles.infoContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
              }}>
              {profile.views}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
              }}>
              {strings_eng.views}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
              }}>
              {profile.subscribers}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
              }}>
              {strings_eng.subscribers}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.nameUsernameContainer}>
        <Text
          style={{
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {profile.name}
        </Text>
        <Text
          style={{
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
            fontSize: 13,
            marginTop: 3,
            marginRight: 20,
          }}>
          {profile.bio}
        </Text>
      </View>
      <TouchableHighlight
        underlayColor={'#98cbfa'}
        style={styles.editProfileButton}
        onPress={onButtonClick}>
        <Text style={styles.buttonText}>
          {currentUserId === profile.objectId
            ? strings_eng.editprofile
            : subscribed
            ? strings_eng.unsubscribe
            : strings_eng.subscribe}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  nameUsernameContainer: {
    width: '100%',
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 15,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  editProfileButton: {
    width: Dimensions.get('window').width - 20,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#0384BE',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 50,
    margin: 15,
  },
});

export default ProfileComponent;
