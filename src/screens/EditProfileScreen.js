import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';
import {strings_eng} from '../values/Strings';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import EditTextWithIcon from './LoginScreen/EditTextWithIcon';
import ButtonWithProgress from './LoginScreen/ButtonWithProgress';
import {FileApi} from '../api/FileApi';
import RNFS from 'react-native-fs';
import {UserApi} from '../api/User';
import {toastMessage} from '../Helper/Functions';
import {useDispatch} from 'react-redux';
import {addUser} from '../store/User/action';

const EditProfileScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const onBackPress = () => {
    navigation.goBack();
  };

  const userId = useSelector(state => state.auth.currentUser.objectId);
  const user = useSelector(state => state.user[userId]);

  const selectedFile = useRef('');

  const [ppuri, setPpuri] = useState(user.profile_photo.url);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const [loading, setLoading] = useState(false);

  const selectFile = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    selectedFile.current = res;
    setPpuri(res.uri);
  };

  const save = async () => {
    setLoading(true);
    let savedFile;
    if (selectedFile.current.uri && selectedFile.current.uri.length > 10) {
      const filePath =
        Platform.OS === 'android'
          ? selectedFile.current.uri
          : selectedFile.current.uri.replace('file://', '');
      const file = await RNFS.readFile(filePath, 'base64');
      const uploadedFile = await FileApi.uploadFile(
        'profile_photo',
        file,
        'image/jpeg',
      );
      if (uploadedFile.error) {
        toastMessage(strings_eng.error);
        setLoading(false);
        return;
      }
      savedFile = uploadedFile;
    }
    const updatedUser = await UserApi.updateProfile(name, bio, savedFile);
    console.log(JSON.stringify(updatedUser));
    if (updatedUser.error) {
      toastMessage(strings_eng.error);
      setLoading(false);
      return;
    }
    dispatch(addUser(updatedUser));
    setLoading(false);
    onBackPress();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
        overflow: 'hidden',
      }}>
      <View
        style={{
          backgroundColor: isDarkMode
            ? colors_dark.colorPrimary
            : colors_light.colorPrimary,
          height: 50,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableHighlight
          onPress={onBackPress}
          style={{
            backgroundColor: isDarkMode
              ? colors_dark.colorPrimary
              : colors_light.colorPrimary,
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            marginStart: 20,
            top: 0,
            left: 0,
            width: 50,
          }}
          underlayColor={
            isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
          }>
          <AntDesign
            name="arrowleft"
            size={28}
            color={isDarkMode ? colors_dark.textColor : colors_light.textColor}
          />
        </TouchableHighlight>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
          }}>
          {strings_eng.editprofile}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            marginTop: 75,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={{
              uri: ppuri,
            }}
            style={{
              width: 90,
              height: 90,
              borderRadius: 15,
            }}
          />
          <Text
            onPress={selectFile}
            style={{
              color: colors_light.blue,
              fontWeight: 'bold',
              marginTop: 8,
            }}>
            {strings_eng.changephoto}
          </Text>

          <EditTextWithIcon
            value={name}
            setValue={setName}
            borderRadius={15}
            icon={
              <AntDesign
                name="idcard"
                size={24}
                color={
                  isDarkMode ? colors_dark.textColor : colors_light.textColor
                }
              />
            }
            style={{width: '95%', marginTop: 35}}
            placeholder={strings_eng.name}
            fontSize={16}
            textColor={
              isDarkMode ? colors_dark.textColor : colors_light.textColor
            }
            isPassword={false}
          />

          <EditTextWithIcon
            value={bio}
            setValue={setBio}
            borderRadius={15}
            icon={
              <AntDesign
                name="question"
                size={24}
                color={
                  isDarkMode ? colors_dark.textColor : colors_light.textColor
                }
              />
            }
            style={{width: '95%', marginTop: 20}}
            placeholder={strings_eng.name}
            fontSize={16}
            textColor={
              isDarkMode ? colors_dark.textColor : colors_light.textColor
            }
            isPassword={false}
          />

          <ButtonWithProgress
            style={{
              width: '95%',
              height: 45,
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors_dark.blue,
            }}
            underlayColor={'#98cbfa'}
            onPress={save}
            showProgress={loading}
            textStyle={{
              color: 'white',
              fontWeight: 'bold',
            }}
            progressColor={'white'}
            buttonText={strings_eng.save}
          />
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
