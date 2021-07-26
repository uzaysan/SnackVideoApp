import React, {useState} from 'react';
import {View, useColorScheme} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';
import {strings_eng} from '../values/Strings';
import ButtonWithProgress from './LoginScreen/ButtonWithProgress';
import EditTextWithIcon from './LoginScreen/EditTextWithIcon';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {useDispatch} from 'react-redux';
import {UserApi} from '../api/User';
import {toastMessage} from '../Helper/Functions';
import {loginAction} from '../store/Auth/actions';
import {addUser} from '../store/User/action';
import {CommonActions} from '@react-navigation/native';

const RegisterScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const register = async () => {
    setLoading(true);
    try {
      const user = await UserApi.registerNewUser(
        username,
        email,
        name,
        password,
      );
      dispatch(
        loginAction({sessionToken: user.sessionToken, objectId: user.objectId}),
      );
      dispatch(addUser(user));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        }),
      );
    } catch (err) {
      setLoading(false);
      toastMessage(JSON.stringify(user.error));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: 5,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: '95%',
        }}>
        <EditTextWithIcon
          value={name}
          setValue={setName}
          borderRadius={15}
          icon={
            isDarkMode ? (
              <Ionicon name="person" size={25} color="white" />
            ) : (
              <Ionicon name="person" size={25} color="black" />
            )
          }
          style={{width: '95%', marginTop: 10}}
          placeholder={strings_eng.name}
          fontSize={16}
          textColor={
            isDarkMode ? colors_dark.textColor : colors_light.textColor
          }
          isPassword={false}
        />
        <EditTextWithIcon
          value={email}
          setValue={setEmail}
          borderRadius={15}
          icon={
            isDarkMode ? (
              <AntDesign name="mail" size={25} color="white" />
            ) : (
              <AntDesign name="mail" size={25} color="black" />
            )
          }
          style={{width: '95%', marginTop: 10}}
          placeholder={strings_eng.email}
          fontSize={16}
          textColor={
            isDarkMode ? colors_dark.textColor : colors_light.textColor
          }
          isPassword={false}
        />
        <EditTextWithIcon
          value={username}
          setValue={setUsername}
          borderRadius={15}
          icon={
            isDarkMode ? (
              <Entypo name="email" size={25} color="white" />
            ) : (
              <Entypo name="email" size={25} color="black" />
            )
          }
          style={{width: '95%', marginTop: 10}}
          placeholder={strings_eng.username}
          fontSize={16}
          textColor={
            isDarkMode ? colors_dark.textColor : colors_light.textColor
          }
          isPassword={false}
        />

        <EditTextWithIcon
          value={password}
          setValue={setPassword}
          borderRadius={15}
          icon={
            isDarkMode ? (
              <Ionicon name="key" size={25} color="white" />
            ) : (
              <Ionicon name="key" size={25} color="black" />
            )
          }
          style={{width: '95%', marginTop: 10}}
          placeholder={strings_eng.password}
          fontSize={16}
          textColor={
            isDarkMode ? colors_dark.textColor : colors_light.textColor
          }
          isPassword={true}
        />

        <ButtonWithProgress
          style={{
            width: '95%',
            height: 50,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors_dark.blue,
          }}
          underlayColor={'#98cbfa'}
          onPress={register}
          showProgress={loading}
          textStyle={{
            color: 'white',
            fontWeight: 'bold',
          }}
          progressColor={'white'}
          buttonText={strings_eng.register}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
