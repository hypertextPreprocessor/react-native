import React,{Component} from 'react';
import {
	AppRegistry,
	AsyncStorage,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	Image,
	Alert,
	Button,
	TouchableHighlight,
	InputAccessoryView,
	ImageBackground,
	TouchableOpacity
	
} from 'react-native';
import { config } from '../config.js';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let sdyDb;
//import DeviceStorage from './DeviceStorage';
//var svgCaptcha = require('svg-captcha');
export default class AuthScreen extends React.Component{
	constructor(props){
		super(props);
		const {navigate} = this.props.navigation;
		this.nav = navigate;
		this._bootstrapAsync();
		//this._login = this._login.bind(this);
		this.config = config;
		this.state = {
			text:"",
			textpwd:"",
			vcode:"",
			vimgId:"",
			vImage:"http://jnxtest.ntgnrm.com:8080/uploadFiles/uploadImgs/20190115/64848de6126943238dee6955a99a750e.jpg"
		};
	}
	_bootstrapAsync = async()=>{
	  const userToken = await AsyncStorage.getItem('uid');
	  if(userToken){
			this.nav("Main"); //this.nav("Main");
	  }else{
		  this.vcode();
	  }
	}
	_update(){
		//console.warn(this.state.text);
		//this.nav('Main');
		//AsyncStorage.getItem("uid").then((res)=>{console.warn(res)});
	}
	_login(){
		var telReg = !!this.state.text.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
		if(this.state.text==""){
			Alert.alert('电话号码不能为空!');
			return false;
		}else if(telReg==false){
			Alert.alert('电话号码格式不正确!');
			return false;
		}else if(this.state.textpwd==""){
			Alert.alert('密码不能为空!');
			return false;
		}else if(this.state.vcode==""){
			Alert.alert('验证码不能为空!');
			return false;
		}else{
			var {apiHost} = config;
			var data = "username="+this.state.text+"&password="+this.state.textpwd+"&verification_code="+this.state.vcode+"&verification_code_id="+this.state.vimgId;
			fetch(apiHost+"/app/user/login.do",{
				method:'POST',
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				body:data
			}).then((res)=>{
				if(res.ok){
					res.json().then(jsn=>{
						if(jsn.result=="1"){
							let usrAcc = this.state.text;
							let usrPwd = this.state.textpwd;
							var I = this;
								//SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{}).catch((error)=>{Alert.alert("数据库设置失败！"+error)})
								//sdyDB = DB;
								let uid = jsn.data.user_id;
								AsyncStorage.setItem('uid',jsn.data.user_id);
								sdyDB.transaction(function(tx){
									tx.executeSql(`SELECT * FROM sysusr WHERE uid = \"${uid}\"`).then(([txt,result])=>{
										if(result.rows.length){
											return tx;
										}else{
											throw new Error('用户不存在');
										}
									}).then(()=>{
										var date = new Date().getTime();
										sdyDB.transaction(function(tx){
											tx.executeSql(`UPDATE sysusr SET logDate='${date}' WHERE uid = '${uid}'`).then(([txt,result])=>{
												//设备上登陆过的用户;
												I.nav('Main');
											});
										})
									},()=>{
										var date = new Date().getTime();
										sdyDB.transaction(function(tx){
											tx.executeSql(`INSERT INTO sysusr (uid,tel,pwd,logDate) VALUES ('${uid}','${usrAcc}','${usrPwd}','${date}')`).then(([txt,result])=>{
												//新用户在此设备上首次登录;
												//console.warn(result.rows._array);
												I.nav('Main');
											});
										})
									});
								})
								
							
							
						}else{
							Alert.alert(jsn.message);
						}
					})
				}else{
					Alert.alert('貌似网络有问题'+res.statusText);
				}
			},(err)=>{
					Alert.alert('网络错误');
					console.warn(err);
			});
		}
	}
	closeDatabase(){
		if(sdyDB){
			console.log("closeing database...");
			sdyDB.close().then((status)=>{
				console.log("数据库关闭");
			}).catch((error)=>{console.log("无法关闭原因"+error)});
		}
	}
	componentDidMount(){
		SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
			sdyDB = DB;
			sdyDB.transaction(function(tx){
				tx.executeSql(`CREATE TABLE IF NOT EXISTS sysusr(uid PRIMARY KEY,tel TEXT NOT NULL,pwd TEXT NOT NULL,logDate TEXT,saveStateDate TEXT)`).then(([txt,result])=>{
					//创建一个用户表
				})
				
				/*
				tx.executeSql(`SELECT * FROM sysusr`).then(([txt,result])=>{
					console.warn(result.rows.item(0));
				});
				tx.executeSql(`SELECT uid FROM sysusr WHERE tel="18922344556"`).then(([txt,result])=>{
					console.warn(result.rows.item(0));
				});
				*/
			})
		});
		//验证码
		 //AsyncStorage.removeItem("@MySuperStore:uid");
		 //AsyncStorage.clear();
		 //AsyncStorage.getAllKeys().then(function(keys){console.warn(keys)},function(err){console.warn(err)});
		//this.vcode();
		
	}
	componentWillUnmount(){
		this.closeDatabase();
	}
	vcode(){
		const {apiHost} = config;
		/*
		this.setState({
			vImage:apiHost+"/hw_boiler_inspection_GD/code.do?t="+new Date().getTime()
		})
		*/
		fetch(apiHost+"/app/vc/createVerificationCode.do?t="+new Date().getTime(),{
				method:'POST',
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				body:""
			}).then((res)=>{
				if(res.ok){
					res.json().then(jsn=>{
						if(jsn.result=="1"){
							this.setState({
								vImage:apiHost+"/"+jsn.data.code_img,
								vimgId:jsn.data.verification_code_id
							})
						}else{
							Alert.alert(jsn.message);
						}
					})
				}else{
					Alert.alert('貌似网络有问题'+res.statusText);
				}
			},(err)=>{
					Alert.alert('网络错误');
			});
		
	}
	render(){
		//const {navigate} = this.props.navigation;
		return (
			<ImageBackground source={require('../images/Login-background.png')} style={styles.container}>
				<KeyboardAvoidingView style={styles.kav} enabled >
				<View style={styles.formStyle}>
					<View style={{width:'100%'}}><Text style={styles.logTitle}>顺德院锅炉登录</Text></View>
					<View style={styles.cols}>
						<Image style={styles.imgs} source={require('../images/SignIn_AccountNumber3x.png')} />
						<TextInput 
							style={styles.inputs} 
							placeholder="请输入手机号或者账号" 
							value={this.state.text} 
							onChangeText={(text)=>this.setState({text})} 
						/>
					</View>
					<View style={styles.cols}>
						<Image style={styles.imgs} source={require('../images/SignIn_Password3x.png')} />
						<TextInput style={styles.inputs} 
							placeholder="请输入输入密码" 
							secureTextEntry={true} 
							textContentType="password"
							value={this.state.textpwd} 
							onChangeText={(textpwd)=>this.setState({textpwd})} 
							
							/>
					</View>
					<View style={styles.cols}>
						<Image style={styles.imgs} source={require('../images/SignIn_VerificationCode3x.png')} />
						<TextInput style={styles.inputs} 
							placeholder="请输入图形验证码" 
							value={this.state.vcode}
							onChangeText={(vcode)=>this.setState({vcode})}
							/>
						<TouchableOpacity onPress={(e)=>{this.vcode(e)}} style={{width:65,height: 35,position:'absolute',left:'80%',top:'22%'}} >
							<Image source={{
								uri:this.state.vImage
							}} style={{width:85,height: 35}}
							/>
						</TouchableOpacity>
							
					</View>
					<View style={styles.cols}>
						<TouchableHighlight style={styles.logBtn} onPress={()=>{this._login()}} >
							<Text style={{color:'#fff',fontSize:23}}>登录</Text>
						</TouchableHighlight>
					</View>
				</View>
				</KeyboardAvoidingView>
			</ImageBackground>
		)
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1,
		width:'100%',
		height:'100%',
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center'
	},
	kav:{
		flex:1,
		width:'100%',
		height:'100%',
		alignItems:'center',
		alignContent:'center',
		justifyContent:'center'
	},
	formStyle:{
		//width:'100%',
		//flex:1,
		
		width:'50%',
		alignItems:'center',
		alignContent:'center',
		justifyContent:'center',
		flexDirection:'column',
		backgroundColor:'#fff',
		borderRadius:5
	},
	logTitle:{
		fontSize:24,
		color:'#07A2F3',
		paddingTop:'5%',
		paddingBottom:'5%',
		alignSelf:'center'
	},
	inputs:{
		width:'100%',
		borderBottomColor:'#838383',
		borderBottomWidth:1,
		paddingLeft:'11%',
		paddingVertical:'2%',
		fontSize:16
	},
	imgs:{
		//...StyleSheet.absoluteFillObject,
		position:'absolute',
		top:'0%',
		left:0,
		width:'5%',
		resizeMode:'contain'
	},
	vcodeImage:{
		position:'absolute',
		top:'0%',
		right:0,
		width:'5%',
		resizeMode:'contain'
	},
	cols:{
		width:'88%',
		flexDirection:'column',
		alignSelf:'center',
		position:'relative',
		paddingVertical:'4%'
	},
	logBtn:{
		alignItems:'center',
		backgroundColor:'#07A2F3',
		padding:10,
		borderRadius:5
	}
})