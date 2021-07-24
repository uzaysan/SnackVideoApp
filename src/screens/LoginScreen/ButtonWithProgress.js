import React from 'react';
import {TouchableHighlight, ActivityIndicator, View, Text} from 'react-native';
import {strings_eng} from '../../values/Strings';

const ButtonWithProgress = ({
  style,
  underlayColor,
  onPress,
  showProgress,
  textStyle,
  progressColor,
  buttonText,
}) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={style}
      onPress={onPress}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {!showProgress && <Text style={textStyle}>{buttonText}</Text>}
        {showProgress && <ActivityIndicator size={30} color={progressColor} />}
      </View>
    </TouchableHighlight>
  );
};

export default ButtonWithProgress;
