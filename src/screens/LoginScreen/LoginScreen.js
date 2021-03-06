import React, {useState} from 'react';
import {useColorScheme, View, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import {strings_eng} from '../../values/Strings';
import EditTextWithIcon from './EditTextWithIcon';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import ButtonWithProgress from './ButtonWithProgress';
import {UserApi} from '../../api/User';
import {useDispatch} from 'react-redux';
import {loginAction} from '../../store/Auth/actions';
import {addUser} from '../../store/User/action';
import {store} from '../../store/store';
import {CommonActions} from '@react-navigation/native';
import {toastMessage} from '../../Helper/Functions';

const LoginScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (store.getState().auth.currentUser.sessionToken) {
    // Navigate to main menu
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      }),
    );
    //return empty view
    return null;
  }
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    setLoading(true);
    const user = await UserApi.login(username, password);
    console.log(JSON.stringify(user));
    if (user.error || !user.sessionToken) {
      setLoading(false);
      toastMessage(JSON.stringify(user.error));
      return;
    }

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
  };

  const register = () => {
    navigation.push('RegisterScreen');
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
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
          onPress={login}
          showProgress={loading}
          textStyle={{
            color: 'white',
            fontWeight: 'bold',
          }}
          progressColor={'white'}
          buttonText={strings_eng.login}
        />
        <Text
          style={{
            color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
            margin: 25,
          }}>
          {strings_eng.donthaveanaccount}
        </Text>
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

export default LoginScreen;
