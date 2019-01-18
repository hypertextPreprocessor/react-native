import React from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	AsyncStorage,
	StyleSheet,
	View,Button as Btnn,Image,
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
	Transforms,
	LayoutAnimation
} from 'react-native';
import { Provider,connect} from 'react-redux';
import { createStore } from 'redux';
import { NativeRouter,Route,Link,Switch,Redirect,withRouter} from "react-router-native";
import {ListItem,List,Text,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { MapView,Marker,MultiPoint } from 'react-native-amap3d';
import { styles } from './styles.js';
import store from './redux/store.js';
import Datalist from './datas';
import Menulist from './menulist';
import SQLite from 'react-native-sqlite-storage';
import { config } from '../config.js';
import Swiper from 'react-native-swiper';
import { Button } from 'native-base';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let sdyDb;
var data1 = [{key:'广州汽修厂'},{key:'广汽集团有限公司'},{key:'广东潮州市湘桥区官塘工业园区'}]
var data2 = [{key:'惠州'},{key:'广州黄花岗第三分院'}]
var data3 = [{key:'佛山沙堤机场'},{key:'佛山南海湾森林生态园'}]
var data4 = [{key:'中山市公安局巡逻警察支队'},{key:'中山市本腾汽车有限公司'}]
var data5 = [{key:'惠州市焦点二手车市场'},{key:'汕尾市城区香洲路777号'}]
class Swipers extends React.Component{
	render(){
		return(
			<Swiper style={styles.wrapper} showsButtons={false}>
				<View style={styles.slide1}>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>测试类型</Text>
						<Text style={styles.textx}>热效率简单测试</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>设备型号</Text>
						<Text style={styles.textx}>KD-123</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>预约时间</Text>
						<Text style={styles.textx}>2018年9月28日</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>联系人</Text>
						<Text style={styles.textx}>汤蔺</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>联系电话</Text>
						<Text style={styles.textx}>15920419705</Text>
					</View>
					<View style={styles.slideSub}>
						<Button bordered style={styles.gdbtn}>
							<Text style={{...styles.gdbtnText,color:'#259BD8'}}>到这里去</Text>
						</Button>
						 <Button primary style={{...styles.gdbtn,backgroundColor:'#259BD8'}}>
							<Text style={{...styles.gdbtnText,color:'#fff'}}>领取此单</Text>
						</Button>
					</View>
				</View>
				<View style={styles.slide2}>
				  <Text style={styles.text}>Beautiful</Text>
				</View>
				<View style={styles.slide3}>
				  <Text style={styles.text}>And simple</Text>
				</View>
			</Swiper>
		)
	}
}
class Mapmakers extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<MapView.Marker image='flag' coordinate={{latitude:23.11544,longitude: 113.325285,}}>
				<View style={styles.customInfoWindow}>
					<Swipers />
				</View>
			</MapView.Marker>
		)
	}
}
export default class HomeScreen extends React.Component{
	constructor(props){
		super(props);
		const {navigate} = this.props.navigation;
		this.nav = navigate;
		this.handleMenuChange = this.handleMenuChange.bind(this);
		this._onPressMenu = this._onPressMenu.bind(this);
		this._trabajo = this._trabajo.bind(this);
		this._onPressHideMenu = this._onPressHideMenu.bind(this);
		this.points = [];
		this.config = config;
		this.uid;
		this.state={
			CenLatitude:23.119541,
			CenLongitude:113.308875,
			width:'8%',
			iconshift:new Animated.Value(0),
			menuClick:false,
			menuIcon:true,
			popOut:new Animated.Value(0),
			popIn:new Animated.Value(0)
		}
	}
	static navigationOptions = {
		header:null
	}
	_trabajo(){			//工单菜单;
		this.setState((state,props)=>({
			menuClick:false,
			menuIcon:true,
		}));
		Animated.sequence([
			Animated.timing(
				this.state.popIn,
				{
					toValue:82,
					duration:300,
				}
			),
			Animated.timing(
				this.state.popIn,
				{
					toValue:82,
					duration:300,
				}
			)
		]).start();
	}
	_onPressMenu(){
		if(!this.state.menuClick){
			this.setState((state,props)=>({
				menuClick:true
			}))
		}else{
			this.setState((state,props)=>({
				menuClick:false
			}))
		}
	}
	_onPressHideMenu(){
		this.setState((state,props)=>({
			menuClick:false
		}))
	}
	handleMenuChange(){
		var toWidth = this.state.btnWidth;
		this.setState({
			popIn:new Animated.Value(0),
			menuClick:false,
			menuIcon:false,
		})
	}
	setStateAsync(state){
		return new Promise((resolve) => {
			this.setState(state,resolve)
		});
	}
	layout(e){
		const w = e.layout.width;
		this.setState((state,props)=>({
			btnWidth:w
		}))
	}
	async _getUid(){
		const userToken = await AsyncStorage.getItem('uid');
	}
	linshi(){
		Alert.alert('此功能暂未开放,敬请期待');
	}
	componentDidMount(){
		var I = this;
		var {apiHost} = config;
		this.setState((state,props)=>({
			menuIcon:false,
			popOut:0
		}));
		//获取用户uid
		AsyncStorage.getItem('uid').then(function(uid){
			I.uid = uid;
		}).then(()=>{
			SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
				sdyDb = DB;
				//创建一个企业信息表
				sdyDb.transaction(function(tx){
					tx.executeSql(
					`CREATE TABLE IF NOT EXISTS comInfo(
						use_company_id TEXT PRIMARY KEY,
						use_company_latitude TEXT,
						use_company_longitude TEXT,
						use_company_mobile_phone TEXT,
						use_company_name TEXT,
						use_company_contact TEXT,
						company_address TEXT
					)`).then(([txt,result])=>{
						//成功创建一个企业信息表
						//console.warn(result);
					},function(err){console.warn("啊哦，失败咯"+err)}).catch((error)=>{Alert.alert("执行SQL失败"+error)});
				},function(err){}).catch((error)=>{console.log('数据创建失败'+error)});
			})
		}).then(()=>{
			//30.APP测试任务工单
			fetch(apiHost+"/app/testTask/listTestTaskOrder.do",{
				method:"POST",
				headers:{"Content-Type":"application/x-www-form-urlencoded"},
				body:"userid=89c0740abf8b444cb48605ae999a9442"
			}).then((res)=>{
				var a = [];
				var a=[],b=[],c=[],d=[],e=[];
				if(res.ok){
					res.json().then(jsn=>{
						if(jsn.result=="1"){
							for(var i=0;i<jsn.data.length;i++){
								 a.push({latitude:Number(jsn.data[i].use_company_latitude),longitude:Number(jsn.data[i].use_company_longitude)});
								 //a.push({latitude:jsn.data[i].use_company_latitude,longitude:jsn.data[i].use_company_longitude});
								 
							}
						this.points = a;	
						}else{
							Alert.alert(jsn.message);
						}
					});
				}else{
					Alert.alert(res.statusText);
				}
			},(err)=>{Alert.alert('网络错误')})
			
		})
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		//console.warn(this.state.CenLatitude +":"+this.state.CenLongitude);
		/*
		if(!prevState.btnWidth && prevState.btnWidth!==0){
			var t = this.state.btnWidth;
			this.setState({
				popOut:new Animated.Value(t)
			})
		}
		*/
	}
	render(){
		const Undo = ({match}) => <Datalist match={match} dataList={data1} nav={this.nav}/>
		const Todo = ({match}) => <Datalist match={match} dataList={data2} nav={this.nav}/>
		const Doing = ({match}) => <Datalist match={match} dataList={data3} nav={this.nav}/>
		const Did = ({match}) => <Datalist match={match} dataList={data4} nav={this.nav}/>
		const Done = ({match}) => <Datalist match={match} dataList={data5} nav={this.nav}/>
	function Avtars(props){
		let nav = props.nav;
	async function userQuilt(){
			let qlt = await AsyncStorage.removeItem('uid');
			if(!qlt){
				nav('Idvfy');
			}
		}
		return (
			<View style={styles.avtar}>
				<Avatar 
					medium
					rounded
					source={require('../images/avatar.jpg')}
					onPress={()=>{userQuilt()}}
					activeOpacity={0.7}
				/>
			</View>
		)
	}
		return (
			<Provider store={store}>
		<NativeRouter>
		   
			<View style={styles.container}>
				<MapView
					style={StyleSheet.absoluteFill}
					mapType="standard"
					locationEnabled={false}		//是否启用定位
					showsIndoorMap={true}		//是否显示室内地图
					showsIndoorSwitch={true}	//是否显示室内地图楼层切换控件
					showsBuildings = {true}		//是否显示3D建筑
					showsCompass={true}			// 是否显示指南针
					showsScale={true}			//是否显示比例尺
					showsLocationButton={true}	//是否显示定位按钮
					showsTraffic = {false}		//是否显示路况
					zoomLevel = {8}				//当前缩放级别，取值范围 [3, 20]
					locationInterval={10000}
					distanceFilter={10}
					locationType={"follow_no_center"}
					coordinate={{
						latitude:this.state.CenLatitude,
						longitude:this.state.CenLongitude
					}}
					onLocation={({nativeEvent})=>
						this.setState({
							CenLatitude:nativeEvent.latitude,
							CenLongitude:nativeEvent.longitude
						})
					}
				>
					
					<Mapmakers />
				</MapView>
				<View style={styles.searchBar}>
					<SearchBar
						round
						lightTheme
						containerStyle={styles.searchBarThem}
						inputStyle={styles.searchInput}
						onChangeText={()=>{}}
						onClearText={()=>{}}
						placeholder="请输入锅炉使用单位"
					/>
				</View>
				
				{!this.state.menuIcon?(
					<Animated.View style={{...styles.menu,width:65,height:65}}>
						<TouchableOpacity onPress={this._onPressMenu}>
							<Image style={{width:'100%',height:'100%'}} source={require('../images/menu.gif')} />
						</TouchableOpacity>
					</Animated.View>
				):(
				<Animated.View style={{...styles.leftMenu,width:this.state.popIn}} onLayout={({nativeEvent:e})=>this.layout(e)}>
					<Avtars containerStyle={{flex: 4, marginTop: 75}}  overlayContainerStyle={{backgroundColor: 'white'}} nav={this.nav}/>
					<View style={styles.leftMenuBox}>
						<Menulist />
					</View>
				</Animated.View>
				)}
				
				
				{this.state.menuClick?(
					<View style={styles.menuClicked} accessible={true} onResponderMove={(event)=>{console.warn(event)}} >
						<TouchableOpacity style={{width:'100%',height:'100%'}} onPress={this._onPressHideMenu}>
						<View style={styles.mck}>
							<View style={styles.mckd}>
									<View style={{width:48,height:48,backgroundColor:'#fff',borderRadius:50,padding:8}}><Image style={{width:'100%',height:'100%'}} source={require('../images/gongdanicon.png')} /></View>
									<View style={{backgroundColor:'#fff',width:'50%',borderRadius:8,marginLeft:15}}>
										<TouchableOpacity onPress={()=>{this.linshi()}}>
											<Text style={styles.gondan}>增添部分</Text>
										</TouchableOpacity>
									</View>
							</View>
							<View style={styles.mckd}>
								<View style={{width:48,height:48,backgroundColor:'#fff',borderRadius:50,padding:8}}><Image style={{width:'100%',height:'100%'}} source={require('../images/gongdanicon.png')} /></View>
								<View style={{backgroundColor:'#fff',width:'50%',borderRadius:8,marginLeft:15,overflow:'hidden'}}>
									<TouchableOpacity onPress={this._trabajo}>
										<Text style={styles.gondan}>我的工单</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						</TouchableOpacity>
					</View>
				):(
					<View></View>
				)}
				
				<View style={styles.subLeftMenu}>
					<Switch>
						<Route exact path="/undo" component={Undo} />
						<Route path="/todo" component={Todo} />
						<Route path="/doing" component={Doing} />
						<Route path="/did" component={Did} />
						<Route path="/done" component={Done} />

						<Route render={(props)=>{
							return (
								<Animated.View style={{width:this.state.popIn,position:'absolute',bottom:0}}><Btnn title="点击隐藏" large={false} onPress={this.handleMenuChange} /></Animated.View>
							)
						}}
						/>
					</Switch>
				</View>
			</View>
			
		</NativeRouter>
		</Provider>
		)
	}
}