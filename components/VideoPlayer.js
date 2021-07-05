import React, {useRef, useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Video} from 'expo-av';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import VisibilityCheck from './VisibilityCheck';

const VideoPlayer = props => {
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
    <View style={props.style}>
      <VisibilityCheck
        style={{flex: 1}}
        onUnmount={onUnmount}
        onChange={handlePlaying}>
        <Video
          ref={video}
          source={{
            uri: props.uri,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={props.mute ? props.mute : false}
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
              uri: props.thumbnail,
            }}
          />
        )}
        {icon}
      </VisibilityCheck>
    </View>
  );
};

export default VideoPlayer;
