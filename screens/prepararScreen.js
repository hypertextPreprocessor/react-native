import React from 'react';
import {
	Platform,
	View,WebView,Alert,
	ScrollView,
	Image,
	NetInfo,
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
	dataLoad(){
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
		},(err)=>{Alert.alert('内部错误')}).catch((err)=>{Alert.alert('网络错误')}).then(()=>{
			//44.根据工单id查询能效测试综合信息记录表
			fetch(apiHost+"/app/eetcts/getEETestComprehensiveInfoRecord.do",{
				method:"POST",
				headers:{"Content-Type":"application/x-www-form-urlencoded"},
				body:"test_task_work_order_id="+thistestorderid
			}).then((res)=>{
				if(res.ok){
					res.json().then((jsn)=>{
						if(jsn.result=="1"){
							sdyDb.transaction((tx)=>{
								tx.executeSql(`UPDATE ordersDetail SET
									boiler_media_sta_or_work_qua_comp = '${jsn.data.boiler_media_sta_or_work_qua_comp}',
									boiler_type = '${jsn.data.boiler_type}',
									contact = '${jsn.data.contact}',
									ee_test_comprehensive_info_record_id = '${jsn.data.ee_test_comprehensive_info_record_id}',
									is_boiler_aux_eng_or_working_state = '${jsn.data.is_boiler_aux_eng_or_working_state}',
									is_boiler_media_sta_or_work_qua_comp = '${jsn.data.is_boiler_media_sta_or_work_qua_comp}',
									is_boiler_system_or_sys_working_state = '${jsn.data.is_boiler_system_or_sys_working_state}',
									is_boiler_use_fuel_sta_or_test_fuel_comp = '${jsn.data.is_boiler_use_fuel_sta_or_test_fuel_comp}',
									is_fuel_ash_dregs_sys_or_fuel_sys = '${jsn.data.is_fuel_ash_dregs_sys_or_fuel_sys}',
									is_fuel_ash_dregs_system = '${jsn.data.is_fuel_ash_dregs_system}',
									is_fuel_system = '${jsn.data.is_fuel_system}',
									make_date = '${jsn.data.make_date}',
									maker_id = '${jsn.data.maker_id}',
									maker_name = '${jsn.data.maker_name}',
									phone = '${jsn.data.phone}',
									use_certificate_num = '${jsn.data.use_certificate_num}',
									use_company_org_code = '${jsn.data.use_company_org_code}',
									use_date = '${jsn.data.use_date}'
									WHERE test_task_work_order_id = '${thistestorderid}'`).then(([txt,result])=>{
								})
							})
						}else{
							
						}
					})
				}
			})
		}).then(()=>{
			//48.根据工单id查询现场使用设备表
			fetch(apiHost+"/app/testProject/listTestProjectAndEquipment.do",{
				method:"POST",
				headers:{"Content-Type":"application/x-www-form-urlencoded"},
				body:"test_task_work_order_id="+thistestorderid
			}).then(res=>{
				if(res.ok){
					res.json().then((d)=>{
						if(d.result=="1"){
							sdyDb.transaction((tx)=>{
								tx.executeSql(`UPDATE ordersDetail SET
									test_pro_equ_id = '${d.data.test_pro_equ_id}',
									remark_device = '${d.data.remark}',
									record_userid = '${d.data.record_userid}',
									record_name = '${d.data.record_name}',
									check_userid = '${d.data.check_userid}',
									check_name = '${d.data.check_name}',
									listProQue = '${JSON.stringify(d.data.listProQue)}',
									last_update_time = '${d.data.last_update_time}',
									create_time = '${d.data.create_time}',
									check_date_device = '${d.data.check_date}',
									record_date_device = '${d.data.record_date}'
									WHERE test_task_work_order_id = '${thistestorderid}'
								`);
							})
						}else{
							Alert.alert(d.message)
						}
					})
				}
			})
		});
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
		//创建工单详情表; (更改表结构放开下列注释扩容);
		SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
			sdyDb = DB;
			//sdyDb.transaction((tx)=>{
				//tx.executeSql(`DROP TABLE IF EXISTS ordersDetail`).then(([txt,result])=>{
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
								boiler_id TEXT,
								boiler_media_sta_or_work_qua_comp TEXT,	
								boiler_type TEXT,	
								contact	TEXT,
								ee_test_comprehensive_info_record_id TEXT,
								is_boiler_aux_eng_or_working_state TEXT,
								is_boiler_media_sta_or_work_qua_comp TEXT,
								is_boiler_system_or_sys_working_state TEXT,
								is_boiler_use_fuel_sta_or_test_fuel_comp TEXT,
								is_fuel_ash_dregs_sys_or_fuel_sys	TEXT,
								is_fuel_ash_dregs_system	TEXT,
								is_fuel_system TEXT,
								make_date TEXT,
								maker_id TEXT,
								maker_name TEXT,
								phone TEXT,
								use_certificate_num TEXT,
								use_company_org_code TEXT,
								use_date TEXT,
								test_pro_equ_id TEXT,
								remark_device TEXT,
								record_userid TEXT,
								record_name	TEXT,
								check_userid TEXT,
								check_name	TEXT,
								listProQue	TEXT,
								last_update_time	TEXT,
								create_time	TEXT,
								check_date_device	TEXT,
								record_date_device	TEXT
							)`).then(([txt,result])=>{
							//console.warn(result);
						},(err)=>{console.warn(err)});
					},function(error){}).catch(function(error){});
				//})//扩容
			//})//扩容
		},(err)=>{console.warn(err)}).then(()=>{
			this.dataLoad();
			/*
			sdyDb.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM ordersDetail WHERE test_task_work_order_id = '${thistestorderid}' `).then(([txt,result])=>{
					
					if(result.rows.length!==0){
						//有数据
						//this.dataLoad();
						this.offlineDataLoad();
					}else{
						//无数据
						//this.onlineDataLoad();
						this.dataLoad();
					}
					
				}).then(()=>{
				//console.warn(num);
				})
			})
			*/
		})
	}
	componentDidMount(){
		NetInfo.getConnectionInfo().then((info)=>{
			//console.warn(typeof info.type);
			let netType = info.type;
			if(netType=="none" || netType=="unknown"){
				//设备离线;
				this.offlineDataLoad();
			}else{
				this.onlineDataLoad();
			}
			
		});
		//NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);
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
						<Tab2 nav={this.nav} ready={this.state.onready1}/>
					  </Tab>
					  <Tab heading="现场检测">
						<Tab3 nav={this.nav} ready={this.state.onready1}/>
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