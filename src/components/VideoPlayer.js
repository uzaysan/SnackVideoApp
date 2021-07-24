import React, {useRef, useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, useColorScheme} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Video} from 'expo-av';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import VisibilityCheck from './VisibilityCheck';
import {PostApi} from '../api/Post';
import {colors_dark, colors_light} from '../values/Colors';

const VideoPlayer = ({id, views, style, uri, mute, thumbnail}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const video = useRef(undefined);

  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [visible, setVisible] = useState(false);

  const onUnmount = () => {
    video.current.unloadAsync();
  };

  useEffect(() => {
    return onUnmount;
  }, []);

  const pauseVideo = () => {
    if (video.current) {
      video.current.pauseAsync();
    }
  };

  const playVideo = () => {
    if (video.current) {
      video.current.playAsync();
      PostApi.incrementView(id);
    }
  };

  const onPlaybackUpdate = playback => {
    //console.log(JSON.stringify(playback));
    if (playback.isPlaying !== undefined) {
      setPlaying(playback.isPlaying);
    }
    if (playback.isBuffering !== undefined) {
      setBuffering(playback.isBuffering);
    }
  };

  const handlePlaying = isVisible => {
    setVisible(isVisible);
    isVisible ? playVideo() : pauseVideo();
  };

  const view = (
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
        color={isDarkMode ? colors_dark.textColor : colors_light.textColor}
      />
      <Text
        style={{
          color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
          fontSize: 11,
          paddingLeft: 3,
          paddingRight: 2,
        }}>
        {views}
      </Text>
    </View>
  );

  const icon = playing ? (
    <FontAwesome
      style={{
        position: 'absolute',
        top: 5,
        left: 7,
      }}
      name="pause"
      size={20}
      color="white"
    />
  ) : buffering && visible ? (
    <ActivityIndicator
      style={{
        position: 'absolute',
        top: 5,
        left: 7,
      }}
      size={20}
      color={'white'}
    />
  ) : (
    <Entypo
      style={{
        position: 'absolute',
        top: 2,
        left: 2,
      }}
      name="controller-play"
      size={30}
      color="white"
    />
  );
  return (
    <View style={style}>
      <VisibilityCheck
        style={{flex: 1}}
        onUnmount={onUnmount}
        onChange={handlePlaying}>
        <Video
          ref={video}
          source={{
            uri: uri,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={mute ? mute : false}
          resizeMode="cover"
          isLooping={true}
          style={{flex: 1}}
          onPlaybackStatusUpdate={status => {
            onPlaybackUpdate(status);
          }}
        />

        {!playing && (
          <FastImage
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'black',
            }}
            resizeMode={'cover'}
            fadeDuration={0}
            source={{
              uri: thumbnail,
            }}
          />
        )}
        {icon}
        {view}
      </VisibilityCheck>
    </View>
  );
};

export default VideoPlayer;
