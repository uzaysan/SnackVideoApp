import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import VideoPlayer from './VideoPlayer';
import {Constants} from '../Helper/Constants';
import {colors_dark, colors_light} from '../values/Colors';

import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const margin = Constants.exploreItemMargin;

const GridItemVideoLeft = props => {
  const onClick = data => {};
  const data = props.data.data;
  const isDarkMode = useColorScheme() === 'dark';

  const post0 = useSelector(state => state.post[data[0].objectId]);
  const post1 = useSelector(state => state.post[data[1].objectId]);
  const post2 = useSelector(state => state.post[data[2].objectId]);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
      }}>
      <TouchableHighlight
        style={styles.big_one}
        onPress={() => {
          onClick(post0);
        }}>
        <VideoPlayer
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            width: '100%',
            aspectRatio: 1,
          }}
          mute={true}
          uri={post0.media.media.url}
          thumbnail={post0.media.thumbnail.url}
          id={post0.objectId}
        />
      </TouchableHighlight>

      <View style={styles.first_row}>
        <TouchableHighlight
          style={{
            width: width / 3 - (margin * 4) / 3,
            aspectRatio: 1,
            overflow: 'hidden',
            marginTop: margin,
            marginBottom: margin,
            marginLeft: (margin * 4) / 3,
          }}
          onPress={() => {
            onClick(post1);
          }}>
          <FastImage
            style={{
              backgroundColor: isDarkMode
                ? colors_dark.colorPrimary
                : colors_light.colorPrimary,
              width: '100%',
              aspectRatio: 1,
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
            aspectRatio: 1,
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
              width: '100%',
              aspectRatio: 1,
            }}
            fadeDuration={0}
            source={{
              uri: post2.media.thumbnail.url,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first_row: {
    width: width / 3,
  },
  big_one: {
    width: width - width / 3 - (margin * 4) / 6,
    aspectRatio: 1,
    marginTop: margin,
    marginBottom: margin,
    marginRight: (margin * 4) / 6,
    overflow: 'hidden',
  },
});

export default GridItemVideoLeft;
