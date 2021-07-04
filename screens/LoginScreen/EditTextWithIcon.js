import React from 'react';
import {View, TextInput, useColorScheme} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';

const EditTextWithIcon = ({
  value,
  setValue,
  icon,
  style,
  placeholder,
  fontSize,
  textColor,
  isPassword,
  borderRadius,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        ...style,
        flexDirection: 'row',
        height: 50,
        backgroundColor: isDarkMode
          ? colors_dark.colorPrimary
          : colors_light.colorPrimary,
        borderRadius: borderRadius,
        shadowColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
      </View>
      <TextInput
        value={value}
        onChangeText={setValue}
        multiline={false}
        style={{
          flex: 1,
          color: textColor,
        }}
        secureTextEntry={isPassword}
        fontSize={fontSize}
        placeholder={placeholder}
      />
    </View>
  );
};

export default EditTextWithIcon;
