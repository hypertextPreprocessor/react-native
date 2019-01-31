import React,{Component} from 'react';
import {View,DatePickerAndroid,Image,CameraRoll,Dimensions} from 'react-native';
import {ListItem as Li,List,Text as Txt,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { 
Container, Header, Title, Content, Footer, FooterTab, 
Button, Left, Right, Body, Icon, Text,Tabs,Tab,
ScrollableTab,Card, CardItem,Grid,Col,Row,
Item,Input,Form,Picker,
Radio,ListItem,CheckBox,Textarea,Accordion
} from 'native-base';
import { styles } from '../styles.js';
import { StackNavigator, TabNavigator } from "react-navigation";
import Orientation from 'react-native-orientation'
class Tab5 extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Card>
				<CardItem header>
					<View style={{width:'100%'}}>
						<View style={{flex:1,alignItems:'center'}}><Txt h3>信息确认阶段</Txt></View>
						<View style={{flex:1,alignSelf:'flex-end'}}><Text style={styles.tabCon}>编号：#3215151513</Text></View>
					</View>
				</CardItem>
				<CardItem>
					<Body>
					
					</Body>
				</CardItem>
			</Card>
		)
	}
}
export default Tab5;