import React from 'react';

import {
  Dimensions,
  View,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Constants} from '../Helper/Constants';
import {colors_dark, colors_light} from '../values/Colors';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const margin = Constants.exploreItemMargin;

const GridItemProfile = ({style, item}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const post = useSelector(state => state.post[item.objectId]);
  const onClick = () => {};
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
      </TouchableHighlight>
    </View>
  );
};

export default GridItemProfile;
