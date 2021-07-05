import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Constants} from '../Helper/Constants';
import {colors_dark, colors_light} from '../values/Colors';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const margin = Constants.exploreItemMargin;

const GridItemThreeImage = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const onClick = data => {};
  const data = props.data.data;

  const post0 = useSelector(state => state.post[data[0].objectId]);
  const post1 = useSelector(state => state.post[data[1].objectId]);
  const post2 = useSelector(state => state.post[data[2].objectId]);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
      }}>
      <TouchableHighlight
        style={{
          width: width / 3 - (margin * 4) / 3,
          height: width / 3 - (margin * 4) / 3,
          overflow: 'hidden',
          marginTop: margin,
          marginBottom: margin,
          marginRight: (margin * 4) / 3,
        }}
        onPress={() => {
          onClick(post0);
        }}>
        <FastImage
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            width: width / 3 - (margin * 4) / 3,
            height: width / 3 - (margin * 4) / 3,
          }}
          fadeDuration={0}
          source={{
            uri: post0.media.thumbnail.url,
          }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          width: width / 3 - (2 * (margin * 4)) / 6,
          height: width / 3 - (2 * (margin * 4)) / 6,
          overflow: 'hidden',
          marginTop: margin,
          marginBottom: margin,
          marginRight: (margin * 4) / 6,
          marginLeft: (margin * 4) / 6,
        }}
        onPress={() => {
          onClick(post1);
        }}>
        <FastImage
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            width: width / 3 - (2 * (margin * 4)) / 6,
            height: width / 3 - (2 * (margin * 4)) / 6,
          }}
          fadeDuration={0}
          source={{
            uri: post1.media.thumbnail.url,
          }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          width: width / 3 - (margin * 4) / 3,
          height: width / 3 - (margin * 4) / 3,
          overflow: 'hidden',
          marginTop: margin,
          marginBottom: margin,
          marginLeft: (margin * 4) / 3,
        }}
        onPress={() => {
          onClick(post2);
        }}>
        <FastImage
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            width: width / 3 - (margin * 4) / 3,
            height: width / 3 - (margin * 4) / 3,
          }}
          fadeDuration={0}
          source={{
            uri: post2.media.thumbnail.url,
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default GridItemThreeImage;
