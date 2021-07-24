import React from 'react';

import {
  Dimensions,
  View,
  Text,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Constants} from '../Helper/Constants';
import {colors_dark, colors_light} from '../values/Colors';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const width = Dimensions.get('window').width;
const margin = Constants.exploreItemMargin;

const GridItemProfile = ({style, item, onClick}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const post = useSelector(state => state.post[item.objectId]);
  return (
    <View
      style={{
        width: width / 3,
        height: width / 3,
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
      }}>
      <TouchableHighlight
        style={{
          flex: 1,
          overflow: 'hidden',
          marginTop: margin,
          marginBottom: margin,
          ...style,
        }}
        onPress={() => {
          onClick(post);
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <FastImage
            style={{
              backgroundColor: isDarkMode
                ? colors_dark.colorPrimary
                : colors_light.colorPrimary,
              flex: 1,
            }}
            fadeDuration={0}
            source={{
              uri: post.media.thumbnail.url,
            }}
          />

          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: isDarkMode
                ? colors_dark.backgroundColor
                : colors_light.backgroundColor,
              paddingRight: 2,
              paddingLeft: 4,
              paddingTop: 2,
              paddingBottom: 2,
              borderRadius: 2,
              flexDirection: 'row',
            }}>
            <AntDesign
              name="eye"
              size={16}
              color={
                isDarkMode ? colors_dark.textColor : colors_light.textColor
              }
            />
            <Text
              style={{
                color: isDarkMode
                  ? colors_dark.textColor
                  : colors_light.textColor,
                fontSize: 11,
                paddingLeft: 3,
                paddingRight: 2,
              }}>
              {post.views}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default GridItemProfile;
