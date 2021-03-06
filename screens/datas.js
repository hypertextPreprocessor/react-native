import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,Button,Image,
	Animated,PanResponder,
	TouchableNativeFeedback,
	SafeAreaView,
	ScrollView,
	WebView,
	Alert,
	FlatList,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	Transforms
} from 'react-native';
import {ListItem,List,Text,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { NativeRouter,Route,Link,Switch,Redirect,withRouter} from "react-router-native";
import { Provider,connect } from 'react-redux';
import { createStore } from 'redux';
import { styles } from './styles.js';
import SQLite from 'react-native-sqlite-storage';
import store from './redux/store.js';

SQLite.DEBUG(true);
SQLite.enablePromise(true);
let sdyDb;
class Datalist extends React.Component{
	//console.warn(props.match);
	constructor(props){
		super(props);
	}
	nvt(item){
		//console.warn(this.props);
		store.dispatch({type:"LIST_ALL",item:item});
		//store.subscribe(() => console.warn(store.getState()));
	}
	componentDidMount(){
		
	}
	render(){
		return (
			<View style={[styles.listDataPanel]}>
				<FlatList
					data={this.props.dataList}
					renderItem={({item,index})=>
						{
							return (
								<TouchableOpacity onPress={()=>{this.nvt(item)}} style={{flex:1,flexDirection:'row',alignSelf:'center',justifyContent:'center'}}>
									<View style={{width:'98%',backgroundColor:'#FCFDFE',borderWidth:1,borderColor:'#3F92B8',borderRadius:5,marginVertical:8,paddingVertical:8}}>
										<Text style={{width:'100%',color:'#39AFEB',paddingHorizontal:5}}>{item.device_model}</Text>
										<Text style={{width:'100%',color:'#39AFEB',fontSize:12,paddingHorizontal:5}}>{item.use_company_contact + item.use_company_mobile_phone}</Text>
									</View>
								</TouchableOpacity>
							)
						}
					}
					keyExtractor={(item,index)=>item.id}
				/>
			</View>
		)
	}
}
export default connect()(Datalist);
