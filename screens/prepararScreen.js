import React from 'react';
import {
	Platform,
	View,WebView,Alert,
	ScrollView,
	Image,
	Dimensions
} from 'react-native';
import { NativeRouter,Route,Link } from 'react-router-native';
import SQLite from 'react-native-sqlite-storage';
import { config } from '../config.js';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Tabs,Tab,ScrollableTab } from 'native-base';
import {
	Text as Txt,
	Button as Btn
} from 'react-native-elements';
import Orientation from 'react-native-orientation'
import Tab1 from './simpletest/TabOne';
import Tab2 from './simpletest/TabTwo';
import Tab3 from './simpletest/TabThree';
import Tab4 from './simpletest/TabFour';
import Tab5 from './simpletest/TabFive';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let sdyDb;
const MyTitle = ()=> {
	return (
			<View>
				<Txt h3>1.基本信息</Txt>
			</View>
	)
};
/*
const myContext = React.createContext("nan");
caseDetailScreen.contextType = myContext;
*/

class caseDetailScreen extends React.Component{
	constructor(props){
		super(props);
		const {navigate} = this.props.navigation;	
		this.nav = navigate;
		this.state={
			data:'<input type="text" value=""/>',
			onready1:false
		}
	}
	closeDatabase(){
		if(sdyDb){
			console.log("closeing database...");
			sdyDb.close().then((status)=>{
				console.log("数据库关闭");
			}).catch((error)=>{console.log("无法关闭原因"+error)});
		}
	}
	offlineDataLoad(){
		var {apiHost} = config;
		this.props.navigation.setParams({dat:this.state.data});
		const thistestorderid = this.props.navigation.getParam("ttwoid");
		this.setState({
			onready1:thistestorderid
		})
		/*
		sdyDb.transaction((tx)=>{
			tx.executeSql(`DELETE FROM ordersDetail WHERE test_task_work_order_id = '${thistestorderid}'`).then(([txt,result])=>{})
		})
		*/
		
	}
	onlineDataLoad(){
		var {apiHost} = config;
		this.props.navigation.setParams({dat:this.state.data});
		const thistestorderid = this.props.navigation.getParam("ttwoid");
		//41.根据任务工单ID获取测试大纲信息;
		fetch(apiHost+"/app/testOutline/getTestOutline.do",{
			method:"POST",
			headers:{"Content-Type":"application/x-www-form-urlencoded"},
			body:"test_task_work_order_id="+thistestorderid
		}).then((res)=>{
			if(res.ok){
				res.json().then(jsn=>{
					if(jsn.result=="1"){
						//SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{})
						sdyDb.transaction((tx)=>{
							tx.executeSql(`DELETE FROM ordersDetail WHERE test_task_work_order_id = '${thistestorderid}'`).then(([txt,result])=>{})
						})
						sdyDb.transaction((tx)=>{
							tx.executeSql(`INSERT INTO ordersDetail (
										test_task_work_order_num,
										use_company_name,
										use_company_id,
										test_task_work_order_id,
										test_task,
										test_purpose,
										test_outline_id,
										testProjectList,
										device_model,
										device_code,
										boiler_id
									) VALUES (
										'${jsn.data.test_task_work_order_num}',
										'${jsn.data.use_company_name}',
										'${jsn.data.use_company_id}',
										'${jsn.data.test_task_work_order_id}',
										'${jsn.data.test_task}',
										'${jsn.data.test_purpose}',
										'${jsn.data.test_outline_id}',
										'${JSON.stringify(jsn.data.testProjectList)}',
										'${jsn.data.device_model}',
										'${jsn.data.device_code}',
										'${jsn.data.boiler_id}'
									)`).then(([txt,result])=>{
								//console.warn(result);
							})
						})
						
					}else{
						Alert.alert(jsn.message);
					}
				},(err)=>{}).then(()=>{
					this.setState({
						onready1:thistestorderid
					})
				})
			}else{
				Alert.alert(res.statusText);
			}
		},(err)=>{Alert.alert('内部错误')}).catch((err)=>{Alert.alert('网络错误')});
	}
	componentDidMount(){
		this.props.navigation.setParams({dat:this.state.data});
		const thistestorderid = this.props.navigation.getParam("ttwoid");
		var {apiHost} = config;
		//创建工单详情表;
		SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
			sdyDb = DB;
			sdyDb.transaction((tx)=>{
				tx.executeSql(`
					CREATE TABLE IF NOT EXISTS ordersDetail(
						test_task_work_order_num TEXT PRIMARY KEY,
						use_company_name TEXT,
						use_company_id TEXT,
						test_task_work_order_id TEXT,
						test_task TEXT,
						test_purpose TEXT,
						test_outline_id TEXT,
						testProjectList TEXT,
						device_model TEXT,
						device_code TEXT,
						boiler_id TEXT
					)`).then(([txt,result])=>{
					//console.warn(result);
				},(err)=>{console.warn(err)});
			},function(error){}).catch(function(error){});
		},(err)=>{console.warn(err)}).then(()=>{
			sdyDb.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM ordersDetail WHERE test_task_work_order_id = '${thistestorderid}' `).then(([txt,result])=>{
					if(result.rows.length!==0){
						//离线数据
						this.offlineDataLoad();
					}else{
						//线上数据
						this.onlineDataLoad();
					}
				}).then(()=>{
				//console.warn(num);
				})
			})
		})
	}
	componentWillUnmount(){
		this.closeDatabase();
	}
	tabChange(){
		Orientation.unlockAllOrientations();
	}
	static navigationOptions = ({navigation})=>{
		return {
			header:null,
			backgroundColor:{backgroundColor:"#39AFEB"},
			headerTitle:<MyTitle/>,
			headerRight:(
				<Btn title="下一步" onPress={()=>{navigation.navigate("caseDetail")}} />
			)
	
		}
	}
	render (){
		return (
			<NativeRouter>
				<Container>
					<Header hasTabs>
						<Left>
							<Button hasText transparent onPress={()=>{this.props.navigation.goBack()}}>
								<Icon name='arrow-back' />
							</Button>
						</Left>
						<Body>
							<Title>基本信息</Title>
						</Body>
						<Right>
							<Button transparent>
						  <Text>下一步</Text>
						</Button>
						</Right>
					</Header>
					<Content disableKBDismissScroll={true}>
					<Tabs locked={false} renderTabBar={()=> <ScrollableTab />} onChangeTab={()=>{this.tabChange()}}>
					  <Tab heading="基本信息">
						<Tab1 ready={this.state.onready1}/>
					  </Tab>
					  <Tab heading="检测前准备">
						<Tab2 nav={this.nav}/>
					  </Tab>
					  <Tab heading="现场检测">
						<Tab3 />
					  </Tab>
					  <Tab heading="录入结果">
						<Tab4 />
					  </Tab>
					  <Tab heading="信息确认">
						<Tab5 />
					  </Tab>
					</Tabs>
					
						
					</Content>
					<Footer>
						<Button><Text>广州衡纬科技有限公司</Text></Button>
					</Footer>
				</Container>
			</NativeRouter>
		)
	}
}
export default caseDetailScreen;