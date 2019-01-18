import React from 'react';
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
import { NativeRouter,Route,Link,Switch} from "react-router-native";
import {ListItem,List,Text,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
//import { Initializer,MapView } from 'react-native-baidumap-sdk';
//Initializer.init('Iqp6q7cn8oxqUx9F6unbC1utb7utweUX').catch(e => console.error(e));
import { MapView,Marker,MultiPoint } from 'react-native-amap3d';
import Swiper from 'react-native-swiper';
function Datalist(props){
	//console.warn(props.match);
	return (
	<View style={styles.listDataPanel}> 
		<FlatList
			data={props.dataList}
			renderItem={({item})=>
				{
					return (
						<TouchableOpacity onPress={()=>{Alert.alert('a')}} style={{display:'flex',flexDirection:'row',flexWrap:'wrap',flex:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
						<View style={{width:'95%',backgroundColor:'#FCFDFE',borderWidth:1,borderColor:'#3F92B8',borderRadius:5,marginVertical:8,paddingVertical:8,alignSelf:'center'}}>
							<Text style={{width:'100%',color:'#39AFEB',paddingHorizontal:5}}>{item.key}</Text>
							<Text style={{width:'100%',color:'#39AFEB',fontSize:12,paddingHorizontal:5}}>{item.key}</Text>
						</View>
						</TouchableOpacity>
					)
				}
			}
		/>
	</View>
	)
}
var data1 = [{key:'广州汽修厂'},{key:'广汽集团有限公司'},{key:'广东潮州市湘桥区官塘工业园区'}]
var data2 = [{key:'惠州'},{key:'广州黄花岗第三分院'}]
var data3 = [{key:'佛山沙堤机场'},{key:'佛山南海湾森林生态园'}]
var data4 = [{key:'中山市公安局巡逻警察支队'},{key:'中山市本腾汽车有限公司'}]
var data5 = [{key:'惠州市焦点二手车市场'},{key:'汕尾市城区香洲路777号'}]
const Undo = ({match}) => <Datalist match={match} dataList={data1}/>
const Todo = ({match}) => <Datalist match={match} dataList={data2}/>
const Doing = ({match}) => <Datalist match={match} dataList={data3}/>
const Did = ({match}) => <Datalist match={match} dataList={data4}/>
const Done = ({match}) => <Datalist match={match} dataList={data5}/>
const Notmatch = () => <View><Text>点击隐藏</Text></View>
function Avtars(){
	return (
		<View style={styles.avtar}>
			<Avatar 
				size="medium"
				rounded
				source={require('../images/avatar.jpg')}
				onPress={()=>{Alert.alert('功能尚未开通')}}
				activeOpacity={0.7}
			/>
		</View>
	)
}
function Menu(props,{match}){
	return (
		<NativeRouter>
			<View style={styles.leftMenu}>
				<Avtars />
				<View style={styles.leftMenuBox}>
					<Link to="/undo" component={TouchableOpacity} activeOpacity={0.8}>
						<View style={{width:'100%',marginVertical:30}}>
							<Image style={{width:30,height:30,alignSelf:'center'}} source={require('../images/menuicon.png')} />
							<Text style={{color:'#fff'}}>未确认</Text>
						</View>
					</Link>
					<Link to="/todo" component={TouchableOpacity} activeOpacity={0.8}>
						<View style={{width:'100%',marginVertical:30}}>
							<Image style={{width:30,height:30,alignSelf:'center'}} source={require('../images/menuicon.png')} />
							<Text style={{color:'#fff'}}>待检测</Text>
						</View>
					</Link>
					<Link to="/doing" component={TouchableOpacity} activeOpacity={0.8}>
						<View style={{width:'100%',marginVertical:30}}>
							<Image style={{width:30,height:30,alignSelf:'center'}} source={require('../images/menuicon.png')} />
							<Text style={{color:'#fff'}}>已检测</Text>
						</View>
					</Link>
					<Link to="/did" component={TouchableOpacity} activeOpacity={0.8}>
						<View style={{width:'100%',marginVertical:30}}>
							<Image style={{width:30,height:30,alignSelf:'center'}} source={require('../images/menuicon.png')} />
							<Text style={{color:'#fff'}}>待结果</Text>
						</View>
					</Link>
					<Link to="/done" component={TouchableOpacity} activeOpacity={0.8}>
						<View style={{width:'100%',marginVertical:30}}>
							<Image style={{width:30,height:30,alignSelf:'center'}} source={require('../images/menuicon.png')} />
							<Text style={{color:'#fff'}}>已结束</Text>
						</View>
					</Link>
				</View>
				<Switch>
					<Route exact path="/undo" component={Undo} />
					<Route path="/todo" component={Todo} />
					<Route path="/doing" component={Doing} />
					<Route path="/did" component={Did} />
					<Route path="/done" component={Done} />
					<Route component={Notmatch} />
				</Switch>
			</View>
		</NativeRouter>
	)
}
export default class HomeScreen extends React.Component{
	constructor(props){
		super(props);
		const {navigate} = this.props.navigation;
		
		this.nav = navigate;
		this._panResponder = PanResponder.create({
			//{...this._panResponder.panHandlers}
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant:(evt, gestureState)=>{
				
			},
			 onPanResponderMove: (evt, gestureState) => {
				 
			 },
			 onPanResponderTerminationRequest: (evt, gestureState) => true,
			 onPanResponderRelease: (evt, gestureState) => {
				this.setState({
					rightBlock:'none'
				})
			 },
			  onPanResponderTerminate: (evt, gestureState) => {
				  
			  }
		});
		
		this.mov = this.mov.bind(this);
		this._onPressMenu = this._onPressMenu.bind(this);
		this._onPressHideMenu = this._onPressHideMenu.bind(this);
		this._trabajo = this._trabajo.bind(this);
		this.state = {
			fadeInView:new Animated.Value(0),
			slideOut:new Animated.Value(-300),
			rightBlock:'none',
			CenLatitude:23.125437,
			CenLongitude:113.319832,
			menuClick:false,
			menuIcon:true,
		};
		
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
	_trabajo(){			//工单菜单;
		this.setState((state,props)=>({
			menuClick:false,
			menuIcon:false,
		}));
		
	}
	static navigationOptions = {
			header:null
		}
	mov(){
		Animated.timing(this.state.slideOut,{
			toValue:0,
			duration:1000
		}).start();
	}
	mov2(){
		Animated.timing(this.state.slideOut,{
			toValue:-300,
			duration:1000
		}).start();
	}
	art(){
		Alert.alert('x');
	}
	componentDidMount(){
		//this.nav('caseDetail');
	}
	_points = ()=>[{latitude:23.135437,longitude:113.309832},{latitude:23.138437,longitude:113.219832}]
	_onInfoWindowPress = () => Alert.alert('信息窗口点击事件')
	_onCustomInfoWindowPress = () => Alert.alert('自定义信息窗口点击事件')
	
	//左侧菜单栏;
	componentDidMount(){
		this.setState((state,props)=>({
			menuIcon:false
		}))
	}
	render(){
		const {navigate} = this.props.navigation;
		const {slideOut} = this.state;
		const {slideOut2} = this.state;
		const Test = ()=> {
			const list = [
				{
					name:'热效率简单测试1',
					avatar_url:'../images/Location3x.png',
					subtitle:'广东顺德锅炉厂'
				},
				{
					name:'热效率简单测试2',
					avatar_url:'../images/Location3x.png',
					subtitle:'广东惠州锅炉厂'
				}
			]
			return (
				<View>
				<List>
					<FlatList
						data={list}
						renderItem={({item})=><ListItem 
						avatar={<Avatar
								rounded
								source={item.avatar_url && {uri:item.avatar_url}}
								title = {item.name[0]}
								/>} 
						title={item.name}
						subtitle={item.subtitle}
						/>}
						keyExtractor={item=>item.name}
					/>
				</List>
				</View>
			)
		} ;
		const Testing = ()=> <Text h2>Testing</Text> ;
		const Tested = ()=> <Text h2>Tested</Text> ;
		const Reporting = ()=> <Text h2>Reporting</Text> ;
		const Reported = ()=> <Text h2>Reported</Text> ;
		//const {fadeInView} = this.state;
		return (
				<View style={styles.container}>
					<MapView
						style={StyleSheet.absoluteFill}
						locationEnabled={true}
						locationInterval={10000}
						mapType='standard'
						showScale={true}
						zoomLevel={8}
						distanceFilter={10}
						showLocationButton={true}
						showsCompass={true}
						showsTraffic={false}
						coordinate={{
							latitude:23.125437,
							longitude:113.319832,
						}}
						
						onLocation={(nativeEvent)=>
								this.setState({
									CenLatitude:nativeEvent.latitude,
									CenLongitude:nativeEvent.longitude,
								})}
						 >
						 <Marker
							color='green'
							onInfoWindowPress={this._onCustomInfoWindowPress}
							coordinate={
								{
									latitude:23.124437,
									longitude:113.309832,
								}
							}>
							<TouchableOpacity activeOpacity={0.9} onPress={this._onCustomInfoWindowPress}>
							  <View style={styles.customInfoWindow}>
								<Text>某某锅炉厂</Text>
							  </View>
							</TouchableOpacity>
						  </Marker>
						  
						<MultiPoint
							onItemPress={(event)=>{this.setState({rightBlock:'flex'})}}
							points={this._points()}
						/>
					</MapView>
					<View style={styles.searchBar}>
						<SearchBar
							round
							lightTheme
							containerStyle={styles.searchBarThem}
							inputStyle={styles.searchInput}
							onChangeText={()=>{}}
							onClearText={()=>{}}
							placeholder='请输入锅炉使用单位'
						/>
					</View>
					{this.state.menuClick?(
					<View style={styles.menuClicked} accessible={true} onResponderMove={(event)=>{console.warn(event)}} >
						<TouchableOpacity style={{width:'100%',height:'100%'}} onPress={this._onPressHideMenu}>
						<View style={styles.mck}>
							<View style={styles.mckd}>
									<View style={{width:48,height:48,backgroundColor:'#fff',borderRadius:50,padding:8}}><Image style={{width:'100%',height:'100%'}} source={require('../images/gongdanicon.png')} /></View>
									<View style={{backgroundColor:'#fff',width:'50%',borderRadius:8,marginLeft:15}}>
										<TouchableOpacity onPress={()=>{Alert.alert('此功能尚未开放')}}>
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
					
					{this.state.menuIcon?(
					<View style={styles.menu}>
						<TouchableOpacity onPress={this._onPressMenu}>
							<Image style={{width:'100%',height:'100%'}} source={require('../images/menu.gif')} />
						</TouchableOpacity>
					</View>
					):(<Menu />)}
						
					
					
				</View>
		)
	}
}
const styles = StyleSheet.create({
	container:{
		position:'relative',
		flex:1,
		alignContent:'center',
		alignItems:'center',
		flexDirection:'column',
	},
	btns:{
		width:120
	},
	cont:{
		flex:1
	},
	customInfoWindow:{
		backgroundColor: '#8bc34a',
		padding: 10,
		borderRadius: 10,
		elevation: 4,
		borderWidth: 2,
		borderColor: '#689F38',
	},
	LeftPanel:{
		...StyleSheet.absoluteFillObject,
		zIndex:22,
		width:'30%',
		height:'40%',
		top:'20%',
		backgroundColor:'#fff',
	},
	nav:{
		width:'100%',
		flexDirection:'row',
		alignContent:'flex-start',
		backgroundColor:'#F9F9F9',
	},
	navItem:{
		width:'20%',
		flexDirection:'column',
		alignItems:'center',
		padding:10,
	},
	infoWindow:{
		...StyleSheet.absoluteFillObject,
		flex:1,
		alignSelf:'flex-end',
		backgroundColor:'#fff',
		width:'29%',
		height:'80%',
		left:'70%',
		top:'20%',
	},
	avatar:{
		...StyleSheet.absoluteFillObject,
		position:'absolute',
		left:Dimensions.get('window').width - 100,
		top:30,
	},
	searchBar:{
		...StyleSheet.absoluteFillObject,
		width:'100%',
		height:50,
		flex:1,
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row',
	},
	searchBarThem:{
		width:'50%',
		backgroundColor:"transparent",
		borderColor:"transparent",
		borderBottomWidth:0
	},
	searchInput:{
		width:'100%'
	},
	menu:{
		position:'absolute',
		left:12,
		bottom:35,
		width:65,
		height:65,
		backgroundColor:'transparent'
	},
	menuClicked:{
		display:'flex',
		flex:1,
		flexDirection:'row',
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		zIndex:22,
		backgroundColor:'rgba(0,0,0,0.5)'
	},
	mck:{
		height:'20%',
		flex:0.25,
		position:'absolute',
		bottom:135,
		left:20,
	},
	mckd:{
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		alignContent:'center',
		marginTop:20,
		width:200,
	},
	mckd_sub:{
		backgroundColor:'#fff',
	},
	gondan:{
		color:'#39AFEB',
		paddingVertical:5,
		borderRadius:53,
		textAlign:'center',
	},
	leftMenu:{
		width:'8%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		backgroundColor:'rgba(66, 146, 187,0.7)',
		overflow:'visible',
	},
	leftMenuBox:{
		display:'flex',
		flex:0.9,
		flexDirection:'column',
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center',
	},
	avtar:{
		display:'flex',
		flex:0.1,
		flexDirection:'column',
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgba(66, 146, 187,0.5)',
	},
	listDataPanel:{
		position:'absolute',
		backgroundColor:'#EEF0EF',
		top:0,
		width:'300%',
		left:'100%',
		zIndex:222,
		overflow:'hidden',
	}
})