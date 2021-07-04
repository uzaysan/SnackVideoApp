import React from 'react';
import {Text} from 'react-native';

const MentionHashtagTextView = props => {
  const prepareText = (text, mentionHashtagPress, mentionHashtagColor) => {
    const result = [];

    let mentList = props.children.match(/[@#][a-z0-9İıŞşĞğÜüÖöÇç_\.]+/gi);
    if (mentList == null) {
      return [text];
    }
    for (const ment of mentList) {
      result.push(text.substring(0, text.indexOf(ment)));
      result.push(
        <Mention
          mentionHashtagColor={mentionHashtagColor}
          mentionHashtagPress={mentionHashtagPress}
          text={ment}
        />,
      );
      text = text.substring(text.indexOf(ment) + ment.length, text.length);
    }
    if (text.length > 0) {
      result.push(text);
    }
    return result;
  };
  return (
    <Text
      style={props.style}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}>
      {prepareText(
        props.children,
        props.mentionHashtagPress,
        props.mentionHashtagColor,
      )}
    </Text>
  );
};

const Mention = props => {
  return (
    <Text
      style={{color: props.mentionHashtagColor}}
      onPress={() => {
        props.mentionHashtagPress(props.text);
      }}>
      {props.text}
    </Text>
  );
};

export default MentionHashtagTextView;
