import React, {Component} from 'react';
import {UIManager,Platform, AsyncStorage,StyleSheet, Alert,Text,TextInput,Image,View} from 'react-native';
import {createStackNavigator,createSwitchNavigator,createNavigationContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/Auth';
import caseDetailScreen from './screens/caseDetailScreen';
import prepararScreen from './screens/prepararScreen';
import Datalist from './screens/datas';
import Modal from './screens/Modal';
import SignatureView from "react-native-signature";
import { config } from './config.js';
import SplashScreen from 'react-native-splash-screen';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const myApp = createStackNavigator({
	Home:HomeScreen,
	caseDetail:caseDetailScreen,
	preparar:prepararScreen,
	SignatureView:SignatureView,
	modal:Modal
},{
	initialRouteName:"Home",
	mode:'modal',
	headerMode:'none'
});
//登录注册页面组件注册处
const AuthStack = createStackNavigator({Auth:AuthScreen},{
	navigationOptions:{
		header:null
	}
});	
const Auth = createSwitchNavigator(
	{
		Auth:AuthScreen
	},
	{
		initialRouteName:Auth,
		navigationOptions:{
			header:null
		}
	}
)
const Root = createSwitchNavigator({
  Main: {
    screen: myApp,
  },
  Idvfy: {
    screen: AuthStack,
  },
}, {
    initialRouteName: 'Idvfy'
});
const AppContainer=createNavigationContainer(Root);

//Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);

export default class App extends React.Component{
  constructor(props){
	  super(props);
	  //const {navigate} = this.props.navigation;	
	  //this.nav = navigate;
	  //this._bootstrapAsync();
  }
  _bootstrapAsync = async()=>{
	  const userToken = await AsyncStorage.getItem('uid');
  }
  componentDidMount(){
	   SplashScreen.show();
  }
  render() {
    return <AppContainer ref={nav=>this.natigator=nav} />;
  }
}
