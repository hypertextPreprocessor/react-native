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
	Linking,
	SectionList,
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
/*
var data1 = [{key:'广州汽修厂'},{key:'广汽集团有限公司'},{key:'广东潮州市湘桥区官塘工业园区'}]
var data2 = [{key:'惠州'},{key:'广州黄花岗第三分院'}]
var data3 = [{key:'佛山沙堤机场'},{key:'佛山南海湾森林生态园'}]
var data4 = [{key:'中山市公安局巡逻警察支队'},{key:'中山市本腾汽车有限公司'}]
var data5 = [{key:'惠州市焦点二手车市场'},{key:'汕尾市城区香洲路777号'}]
*/
class Swipers extends React.Component{
	constructor(props){
		super(props);
		this.orderDetailPanel = this.orderDetailPanel.bind(this);
		this.state={
			panelData:[]
		}
	}
	navToDetail(ttwoid){
		this.props.nav('preparar',{
			ttwoid:ttwoid
		});
	}
	orderDetailPanel(){	//工单详情面板;
		//if(this.state.panelData.length){};
			const orderPanel = this.state.panelData.map((item,index)=>(
				<View style={styles.slide1}>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>测试类型</Text>
						<Text style={styles.textx}>热效率简单测试</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>设备型号</Text>
						<Text style={styles.textx}>{item.device_model}</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>预约时间</Text>
						<Text style={styles.textx}>{item.plan_test_date}</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>联系人</Text>
						<Text style={styles.textx}>{item.use_company_contact}</Text>
					</View>
					<View style={styles.slideSub}>
						<Text style={styles.textx}>联系电话</Text>
						<TouchableOpacity onPress={()=>{
							Linking.openURL(`tel:${item.use_company_mobile_phone}`)
						}} style={styles.textx}>
						<Text style={{textDecorationLine:"underline"}}>{item.use_company_mobile_phone}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.slideSub}>
						<Button bordered style={styles.gdbtn}>
							<Text style={{...styles.gdbtnText,color:'#259BD8'}}>到这里去</Text>
						</Button>
						 <Button primary style={{...styles.gdbtn,backgroundColor:'#259BD8'}} onPress={()=>{this.navToDetail(`${item.test_task_work_order_id}`)}}>
							<Text style={{...styles.gdbtnText,color:'#fff'}}>领取此单</Text>
						</Button>
					</View>
				</View>
			));
			return orderPanel;
		
		
	}
	componentDidMount(){
		//console.warn(this.props.comid);
		//console.warn(store.getState());
		//store.subscribe(() => console.warn(store.getState()));
		var panelData=[];
		AsyncStorage.getItem('uid').then((uid)=>{
			sdyDb.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM orderList INNER JOIN deviceList ON orderList.boiler_id = deviceList.boiler_id WHERE order_leader = '${uid}' AND use_company_id='${this.props.comid}'`).then(([txt,result])=>{
					for(var i=0;i<result.rows.length;i++){
						panelData.push(result.rows.item(i));
					}
					this.setState({
						panelData:panelData
					})
				})
			})
		});
	}
	render(){
		return(
			<Swiper style={styles.wrapper} showsButtons={false}>
				{this.orderDetailPanel()}
			</Swiper>
		)
	}
}
class Mapmakers extends React.Component{
	constructor(props){
		super(props);
		//this.points=[{title:'D',data:[{latitude:23.119541,longitude:113.308875}]}]
		this.points=[{latitude:23.119541,longitude:113.308875}]
		this.markers = this.markers.bind(this);
		this.state={
			upd:"",
			comid:[],
			act:[],
			actColor:[],
		}
	}
	markers(){
		if(this.state.comid.length){
			const listItems = this.points.map((item,idx)=>(
				<MapView.Marker coordinate={item} key={idx} active={Boolean(this.state.act[idx])} color={this.state.actColor[idx]} >
					<View style={styles.customInfoWindow}>
						<Swipers comid={this.state.comid[idx]} nav={this.props.nav}/>
					</View>
				</MapView.Marker>
			))
			return listItems;
		}
	}
	componentDidMount(){
		var latlong=[];
		var comID=[];
		var act = [];
		var actColor = [];
		SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
			DB.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM comInfo`).then(([txt,result])=>{
					for(var i=0;i<result.rows.length;i++){
						latlong.push({latitude:Number(result.rows.item(i).use_company_latitude),longitude:Number(result.rows.item(i).use_company_longitude)})
						comID.push(result.rows.item(i).use_company_id);
						act.push(false);
						actColor.push("blue");
					}
					this.points = latlong;
					return [latlong,comID];
				},(err)=>{console.log(err)}).then(([latlong,comID])=>{
					//this.markers(latlong);
					this.setState({
						upd:"potted",
						comid:comID,
						act:act,
						actColor:actColor
					})
				});
			}).catch((err)=>{console.warn(err)});
			
		});
	}
	componentDidUpdate(){
		//console.warn(this.state.upd);
	}
	render(){
		store.subscribe(() =>{
			//console.warn(store.getState().sheetList.item);
			//点击子菜单标记对应的地图标点
			if(store.getState().sheetList.item !== undefined){
				var {item} = store.getState().sheetList;
				if(item.use_company_latitude !== undefined){
					var activeIndex = this.state.comid.indexOf(item.use_company_id);
					var tem = [];
					var temColor=[];
					for(var i=0;i<this.state.act.length;i++){
						if(i == activeIndex){
							tem.push(true);
							temColor.push("blue");
						}else{
							tem.push(false);
							temColor.push("green");
						}
					}
					this.setState({
						act:tem,
						actColor:temColor
					})
				}
			}
		});
		return (
			<View>
				{this.markers()}
			</View>
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
		this.data1 = [{key:"待检测无数据"}];
		this.data2 = [{key:"已检测无数据"}];
		this.data3 = [{key:"待结果无数据"}];
		this.data4 = [{key:"已结束无数据"}];
		this.data5 = [{key:"待审核无数据"}];
		this.state={
			CenLatitude:23.119541,
			CenLongitude:113.308875,
			width:'8%',
			iconshift:new Animated.Value(0),
			menuClick:false,
			menuIcon:true,
			popOut:new Animated.Value(0),
			popIn:new Animated.Value(0),
			showMarkers:false
		}
	}
	static navigationOptions = {
		header:null
	}
	_trabajo(){			//工单菜单;
		this.setState((state,props)=>({
			menuClick:false,
			menuIcon:true
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
	closeDatabase(){
		if(sdyDb){
			console.log("closeing database...");
			sdyDb.close().then((status)=>{
				console.log("数据库关闭");
			}).catch((error)=>{console.log("无法关闭原因"+error)});
		}
	}
	handleData(data){
		var I = this;
		sdyDb.transaction((tx)=>{
			tx.executeSql(`DELETE FROM comInfo WHERE usrid = '${I.uid}'`).then(([txt,result])=>{
				//console.warn(result);
			}).catch((error)=>{console.warn(error)});
		});
		var uid = I.uid;
		for(var i=0;i<data.length;i++){
			(function(i){
				var cid = data[i].use_company_id;
				var clat = data[i].use_company_latitude;
				var clong = data[i].use_company_longitude;
				var ctel = data[i].use_company_mobile_phone;
				var cname = data[i].use_company_name;
				var cct = data[i].use_company_contact;
				var caddr = data[i].company_address;
				sdyDb.transaction((tx)=>{
					tx.executeSql(`INSERT INTO comInfo (
						use_company_id,use_company_latitude,use_company_longitude,use_company_mobile_phone,
						use_company_name,use_company_contact,company_address,usrid
					) VALUES (
						'${cid}',
						'${clat}',
						'${clong}',
						'${ctel}',
						'${cname}',
						'${cct}',
						'${caddr}',
						'${uid}'
					)`).then(([txt,result])=>{
					//console.warn(result);
				}).catch((error)=>{console.log(error)});
				}).catch((error)=>{console.log(error.message)});
			})(i);
		}
		this.setState({
			showMarkers:true
		})
	}
	handleOrderData(data){
		//SELECT * FROM pragma_table_info('orderList')
		//DELETE FROM orderList WHERE order_leader = '${I.uid}'
		/*
						var arr = [];
				for(var i=0;i<result.rows.length;i++){
					arr.push(result.rows.item(i).name);
				}
				console.warn(arr);
		*/
		var I = this;
		var uid = I.uid;
		sdyDb.transaction((tx)=>{
			tx.executeSql(`DELETE FROM orderList WHERE order_leader = '${I.uid}'`).then(([txt,result])=>{
				
			}).catch((error)=>{console.warn(error)});
			for(var i=0;i<data.length;i++){
				(function(i){
					sdyDb.transaction((tx)=>{
						tx.executeSql(
							`INSERT INTO deviceList (boiler_id,device_code,device_model) VALUES (
							'${data[i].boiler_id}',
							'${data[i].device_code}',
							'${data[i].device_model}'
						)`).then(([txt,result])=>{
							//console.warn(result);
						},(err)=>{
							//执行失败，默认不做任何操作;
						});
					},(err)=>{
						//插入失败，默认不做任何操作;
					})
				})(i)
			}
		})
		var data1 = []; 	//待检测
		var data2 = [];	//已检测
		var data3 = [];	//待结果
		var data4 = [];	//已结束
		var data5 = [];	//预留
		for(var i=0;i<data.length;i++){
			//状态（1为申请，2为已领取，3为已检测，4为已化验，5为审批成功，6为审批退回）
			data[i].key = i;
			if(data[i].status=="2"){
				data1.push(data[i]);
			}else if(data[i].status=="3"){
				data2.push(data[i]);
			}else if(data[i].status=="4"){
				data3.push(data[i]);
			}else if(data[i].status=="5"){
				data4.push(data[i]);
			}
			(function(i){
				sdyDb.transaction((tx)=>{
					tx.executeSql(`INSERT INTO orderList(
						test_task_work_order_id,
						use_company_contact,
						use_company_mobile_phone,
						use_order_type,
						test_task_id,
						boiler_id,
						team_users,
						status,
						plan_test_date,
						order_leader,
						allocation_user,
						allocation_time,
						alllcation_remark,
						use_company_id
						) VALUES (
							'${data[i].test_task_work_order_id}',
							'${data[i].use_company_contact}',
							'${data[i].use_company_mobile_phone}',
							'${data[i].type}',
							'${data[i].test_task_id}',
							'${data[i].boiler_id}',
							'${data[i].team_users}',
							'${data[i].status}',
							'${data[i].plan_test_date}',
							'${data[i].order_leader}',
							'${data[i].allocation_user}',
							'${data[i].allocation_time}',
							'${data[i].alllcation_remark}',
							'${data[i].use_company_id}'
						)`).then(([txt,result])=>{
						//console.warn(result);
					}).catch((error)=>{console.warn(error)});
				});
			})(i)
		}
		if(!data1.length){
			data1 = [{key:"待检测无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data2.length){
			data2 = [{key:"已检测无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data3.length){
			data3 = [{key:"待结果无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data4.length){
			data4 = [{key:"已结束无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data5.length){
			data5 = [{key:"待审核无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		this.data1 = data1;
		this.data2 = data2;
		this.data3 = data3;
		this.data4 = data4;
		this.data5 = data5;
	}
	//离线数据支持;
	offlinesupport(){
		this.setState({
			showMarkers:true
		});
	}
	offlinesupports(){
		var data = [];
		AsyncStorage.getItem('uid').then((uid)=>{
			sdyDb.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM orderList INNER JOIN deviceList ON orderList.boiler_id = deviceList.boiler_id WHERE order_leader = '${uid}'`).then(([txt,result])=>{
					for(var i=0;i<result.rows.length;i++){
						data.push(result.rows.item(i));
					}
					return data;
				}).then((data)=>{
					var data1 = []; 	//待检测
					var data2 = [];	//已检测
					var data3 = [];	//待结果
					var data4 = [];	//已结束
					var data5 = [];	//预留
					for(var i=0;i<data.length;i++){
						data[i].key = i;
						if(data[i].status=="2"){
							data1.push(data[i]);
						}else if(data[i].status=="3"){
							data2.push(data[i]);
						}else if(data[i].status=="4"){
							data3.push(data[i]);
						}else if(data[i].status=="5"){
							data4.push(data[i]);
						}
					}
		if(!data1.length){
			data1 = [{key:"待检测无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data2.length){
			data2 = [{key:"已检测无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data3.length){
			data3 = [{key:"待结果无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data4.length){
			data4 = [{key:"已结束无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
		if(!data5.length){
			data5 = [{key:"待审核无数据",device_model:"没有记录",use_company_contact:"",use_company_mobile_phone:""}]
		}
					this.data1 = data1;
					this.data2 = data2;
					this.data3 = data3;
					this.data4 = data4;
					this.data5 = data5;
				})
				
			})
		})
		
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
		AsyncStorage.getItem('uid').then((uid)=>{
			I.uid = uid;
		}).then(()=>{
			SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
				sdyDb = DB;
				//创建一个企业信息表
				sdyDb.transaction((tx)=>{
					tx.executeSql(
					`CREATE TABLE IF NOT EXISTS comInfo(
						use_company_id TEXT PRIMARY KEY,
						use_company_latitude TEXT,
						use_company_longitude TEXT,
						use_company_mobile_phone TEXT,
						use_company_name TEXT,
						use_company_contact TEXT,
						company_address TEXT,
						usrid TEXT DEFAULT NULL,
						FOREIGN KEY(usrid) REFERENCES sysusr(uid)
					)`).then(([txt,result])=>{
						//成功创建一个企业信息表
					},function(err){console.warn("啊哦，失败咯"+err)}).catch((error)=>{Alert.alert("执行SQL失败"+error)});
				},function(err){}).catch((error)=>{console.log('数据创建失败'+error)});
				//创建工单列表;
				sdyDb.transaction((tx)=>{
					tx.executeSql(
					`CREATE TABLE IF NOT EXISTS orderList(
						test_task_work_order_id TEXT PRIMARY KEY,
						use_company_contact TEXT,
						use_company_mobile_phone TEXT,
						use_order_type TEXT,
						test_task_id TEXT,
						boiler_id TEXT,
						team_users TEXT,
						status	TEXT,	
						plan_test_date	TEXT,
						order_leader	TEXT,
						allocation_user TEXT,
						allocation_time TEXT,
						alllcation_remark TEXT,
						use_company_id TEXT DEFAULT NULL,
						FOREIGN KEY (use_company_id) REFERENCES comInfo(use_company_id),
						FOREIGN KEY (boiler_id) REFERENCES deviceList(boiler_id)
					)`).then(([txt,result])=>{
						//console.warn(result);
					})
				});
				//创建设备列表;
				sdyDb.transaction((tx)=>{
					tx.executeSql(
					`CREATE TABLE IF NOT EXISTS deviceList(
						boiler_id TEXT PRIMARY KEY,
						device_code TEXT,
						device_model TEXT
					)`).then(([txt,result])=>{
						//console.warn(result);
					})
				});
			})
		}).then(()=>{
			//32.APP企业列表
			fetch(apiHost+"/app/testTask/listTestTaskCompany.do",{
				method:"POST",
				headers:{"Content-Type":"application/x-www-form-urlencoded"},
				body:"userid="+I.uid
			}).then((res)=>{
				if(res.ok){
					res.json().then(jsn=>{
						if(jsn.result=="1"){
							I.handleData(jsn.data);
						}else{
							Alert.alert(jsn.message);
							I.offlinesupport();
						}
					});
				}else{
					Alert.alert(res.statusText);
					I.offlinesupport();
				}
			},(err)=>{
				Alert.alert('网络错误');
				I.offlinesupport();
			});
		}).then(()=>{
			//31.APP测试任务工单
			fetch(apiHost+"/app/testTask/listTestTaskOrder.do",{
				method:"POST",
				headers:{"Content-Type":"application/x-www-form-urlencoded"},
				body:"userid="+I.uid
			}).then((ress)=>{
				if(ress.ok){
					ress.json().then(jn=>{
						if(jn.result=="1"){
							I.handleOrderData(jn.data);
						}else{
							Alert.alert(jn.message);
							this.offlinesupports();
						}
					})
				}else{
					Alert.alert(ress.statusText);
					this.offlinesupports();
				}
			},(err)=>{
				//网络错误;
				this.offlinesupports();
			})
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
	componentWillUnmount(){
		this.closeDatabase();
	}
	render(){
		store.subscribe(() =>{
			//console.warn(store.getState().sheetList.item);
			if(store.getState().sheetList.item !== undefined){
				var {item} = store.getState().sheetList;
				if(item.use_company_latitude !== undefined){
					this.setState({
						CenLatitude:Number(item.use_company_latitude),
						CenLongitude:Number(item.use_company_longitude)
					})
				}
			}
			
			
		
		});
		const Undo = ({match}) => <Datalist match={match} dataList={this.data1} nav={this.nav}/>
		const Todo = ({match}) => <Datalist match={match} dataList={this.data2} nav={this.nav}/>
		const Doing = ({match}) => <Datalist match={match} dataList={this.data3} nav={this.nav}/>
		const Did = ({match}) => <Datalist match={match} dataList={this.data4} nav={this.nav}/>
		const Done = ({match}) => <Datalist match={match} dataList={this.data5} nav={this.nav}/>
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
				   {this.state.showMarkers?(<Mapmakers points={this.points} nav={this.nav}/>):(<Text></Text>)}
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
											<Text style={styles.gondan}>热效率测试</Text>
										</TouchableOpacity>
									</View>
							</View>
							<View style={styles.mckd}>
									<View style={{width:48,height:48,backgroundColor:'#fff',borderRadius:50,padding:8}}><Image style={{width:'100%',height:'100%'}} source={require('../images/gongdanicon.png')} /></View>
									<View style={{backgroundColor:'#fff',width:'50%',borderRadius:8,marginLeft:15}}>
										<TouchableOpacity onPress={()=>{this.linshi()}}>
											<Text style={styles.gondan}>详细测试</Text>
										</TouchableOpacity>
									</View>
							</View>
							<View style={styles.mckd}>
								<View style={{width:48,height:48,backgroundColor:'#fff',borderRadius:50,padding:8}}><Image style={{width:'100%',height:'100%'}} source={require('../images/gongdanicon.png')} /></View>
								<View style={{backgroundColor:'#fff',width:'50%',borderRadius:8,marginLeft:15,overflow:'hidden'}}>
									<TouchableOpacity onPress={this._trabajo}>
										<Text style={styles.gondan}>简单测试</Text>
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