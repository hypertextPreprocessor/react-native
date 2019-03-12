import React,{Component} from 'react';
import {View,DatePickerAndroid,Image,CameraRoll,Dimensions,ScrollView,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import {ListItem as Li,List as Lst,Text as Txt,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { 
Container, Header, Title, Content, Footer, FooterTab, 
Button, Left, Right, Body, Icon, Text,Tabs,Tab,
ScrollableTab,Card, CardItem,Grid,Col,Row,
Item,Input,Form,Picker,Badge,
Radio,ListItem,List,CheckBox,Textarea,Accordion
} from 'native-base';
import { styles } from '../styles.js';
import { StackNavigator, TabNavigator } from "react-navigation";
import Orientation from 'react-native-orientation';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let sdyDb;
const dataArray = [
  { devId: "XHX-0119",tesfun:"入炉冷空气温度",type:"TH603A",device:"温湿度表",precision: "温度测量精度：小于±1℃(-10～32℃),湿度测量精度：小于±5%(50～99%)",range:"温度:-30～60℃,湿度：0～100%RH",validity:"2019.1"},
  { devId: "XCY-0450",tesfun:"烟气成分分析",type:"OPTIMA7",device:"便携式烟气分析仪",precision: "O2:±0.2%，CO:±5ppm或±5%读数≤4000ppm,,NO:±5ppm或士5%读数≤1000ppm,SO2:±5ppm或±5%读数≤2000ppm，CO2:±2%F.S",range:"2:0~21%，CO:0~10000ppm，NO:0~2500ppm，SO2:0~5000ppm,CO2:0~40%",validity:"2019.1"},
  { devId: "XCY-0322",tesfun:"排烟温度",type:"52Ⅱ/K",device:"温度测量仪",precision: "温度测量精度：小于±1℃(-10～32℃),湿度测量精度：小于±5%(50～99%)",range:"-200℃～1372℃(读数)",validity:"2019.1"},
  { devId: "(现场提供)",tesfun:"进口介质温度",type:"WZPK",device:"热电偶",precision: "高于-100℃:±[0.05%+0.3℃];低于-100℃:±[0.20%+0.3℃]",range:"0～600℃",validity:"2019.1"},
  { devId: "(现场提供)",tesfun:"出口介质温度",type:"WZPK",device:"铠装热电偶",precision: "±1.5℃或0.4%t",range:"温度:-30～60℃,湿度：0～100%RH",validity:"2019.1"},
  { devId: "(现场提供)",tesfun:"进口介质压力",type:"YB-150A",device:"铠装热电偶",precision: "-",range:"温度:-30～60℃,湿度：0～100%RH",validity:"2019.1"},
  { devId: "(现场提供)",tesfun:"出口介质压力",type:"YB-150A",device:"压力表",precision: "-",range:"温度:-30～60℃,湿度：0～100%RH",validity:"2019.1"},
  { devId: "(现场提供)",tesfun:"其他",type:"-",device:"-",precision: "-",range:"-",validity:"-"},
];
const testProjectList = [
	{project_name:"入炉冷空气温度",instrument_name:"温度测量仪/热电偶",test_position:"鼓风机进风口","record_name":"马工",ps:"-"},
	{project_name:"排烟温度",instrument_name:"温度测量仪/热电偶",test_position:"出口烟道一米范围内","record_name":"马工",ps:"-"},
	{project_name:"烟气成分分析",instrument_name:"烟气分析仪",test_position:"出口烟道一米范围内","record_name":"马工",ps:"-"},
	{project_name:"给水温度",instrument_name:"温度测量仪/热电偶",test_position:"锅炉进水管道","record_name":"马工",ps:"-"},
	{project_name:"蒸汽压力",instrument_name:"压力表",test_position:"锅炉顶部压力表","record_name":"马工",ps:"-"},
	{project_name:"给水压力",instrument_name:"压力表",test_position:"锅炉顶部压力表","record_name":"马工",ps:"-"}
];
class Tab2 extends Component{
	constructor(props){
		super(props);
		this._layout = this._layout.bind(this);
		this._renderHeader = this._renderHeader.bind(this);
		this._renderContent = this._renderContent.bind(this);
		this._rh = this._rh.bind(this);
		this._rc = this._rc.bind(this);
		this.state = {
			date0:'选择日期',
			date1:'选择日期',
			date2:'选择日期',
			date3:'选择日期',
			date4:'选择日期',
			date5:'选择日期',
			date6:'选择日期',
			date7:'选择日期',
			ckbox1:false,
			ckbox2:false,
			ckbox3:false,
			ckbox4:false,
			ckbox5:false,
			ckbox6:false,
			ckbox7:false,
			ckbox8:false,
			sideNav:false,
			design_identify_organization:'-',
			making_code:'-',
			printing_num:'-',
			make_date:'-',
			use_date:'-',
			fuel_type:'-',
			fuel_type_code:'-',
			test_task_work_order_num:"加载中...",
			use_company_name:"加载中...",
			test_task:"加载中...",
			device_model:"加载中...",
			device_code:"加载中...",
			test_purpose:"加载中...",
			testProjectList:["加载中..."],
			check_name:"加载中...",
			record_name:"加载中...",
			remark_device:"加载中...",
			listProQue:["加载中..."],
			check_date_device:"加载中...",
			record_date_device:"加载中..."
			
		}
	}
	_renderHeader(item, expanded){
		return (
			<View style={{width:'100%',flexDirection: "row",paddingVertical:10,justifyContent: "space-between",alignItems: "center" , backgroundColor: "#A9DAD6",borderBottomWidth:1,borderColor:"#dedede"}}>
				<Text style={{paddingLeft:"2%"}}>{"仪器:"+item.equipment_name+" / 型号："+item.equipment_number}</Text>
				 {expanded
				  ? <Icon style={{ fontSize: 18,paddingRight:"2%" }} name="remove-circle" />
				  : <Icon style={{ fontSize: 18,paddingRight:"2%" }} name="add-circle" />
				  }
			</View> 
		)
	}
	_renderContent(item) {
		return (
			<View style={{width:'100%',backgroundColor: "#e3f1f1",paddingVertical:10}}>
				<Text>{"设备型号："+item.model_specification}</Text>
				<Text>{"设备编号："+item.equipment_number}</Text>
				<Text>{"测试项目："+item.tesfun}</Text>
			</View>
		)
	}
	_rh(item, expanded){
		return (
			<View style={{width:'100%',flexDirection: "row",paddingVertical:10,justifyContent: "space-between",alignItems: "center" , backgroundColor: "#A9DAD6",borderBottomWidth:1,borderColor:"#dedede"}}>
				<Text style={{paddingLeft:"2%"}}>{"测试项目:"+item.project_name}</Text>
				 {expanded
				  ? <Icon style={{ fontSize: 18,paddingRight:"2%"}} name="remove-circle" />
				  : <Icon style={{ fontSize: 18,paddingRight:"2%" }} name="add-circle" />
				  }
			</View> 
		)
	}
	_rc(item) {
		return (
			<View style={{width:'100%',backgroundColor: "#e3f1f1",paddingVertical:10}}>
				<View style={{paddingHorizontal:25,paddingVertical:12}}><Text>{"仪器/仪表："+item.instrument_name}</Text></View>
				<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:25}}>
					<Text>测试部位：</Text>
					<Input placeholder={item.test_position} style={{borderBottomWidth:1,borderBottomColor:"#dedede"}}/>
				</View>
				<View style={{paddingHorizontal:25,paddingVertical:12}}><Text>{"记录人："+item.record_name}</Text></View>
				<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:25}}>
					<Text>备注：</Text>
					<Input placeholder="无" style={{borderBottomWidth:1,borderBottomColor:"#dedede"}}/>
				</View>
			</View>
		)
	}
	
	DatePicker(i){
		var I = this;
		switch(i){
			case 0:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date0:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
			case 1:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date1:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
				case 2:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date2:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
				case 3:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date3:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
				case 4:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date4:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
				case 5:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date5:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
				case 6:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date6:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
				case 7:
				try {
				  const {action, year, month, day} = DatePickerAndroid.open({
					date: new Date()
				  }).then(({year,month,day})=>{
					  if (action !== DatePickerAndroid.dismissedAction) {
							I.setState({
								date7:year+'-'+Number(month+1)+'-'+day
							})
					  }
				  });
				}catch ({code, message}) {
				  console.warn('Cannot open date picker', message);
				}
				return false;
		}
	}
	pickChange(val,i){
		switch(i){
			case 0:
				this.setState({
					selected0:val
				})
				return false;
			case 1:
				this.setState({
					selected1:val
				})
				return false;
			case 2:
				this.setState({
					selected2:val
				})
				return false;
			case 3:
				this.setState({
					selected3:val
				})
			case 4:
				this.setState({
					selected4:val
				})
				return false;
			case 5:
				this.setState({
					selected5:val
				})
				return false;
			case 6:
				this.setState({
					selected6:val
				})
				return false;
			case 7:
				this.setState({
					selected7:val
				})
				return false;
			case 8:
				this.setState({
					selected8:val
				})
				return false;
			case 9:
				this.setState({
					selected9:val
				})
				return false;
			case 10:
				this.setState({
					selected10:val
				})
				return false;
			case 11:
				this.setState({
					selected11:val
				})
				return false;
		}
	}
	onValueChange(value){
		this.setState({
		  selected: value
		});
	}
	showModal(type){
		this.props.nav('modal',{type:type});
	}
	_layout(e){
		// 判断横竖屏幕
		const {x, y, width, height} = e.layout;
		const {width:w,height:h} = Dimensions.get('window');
		
		if(width>h){
			this.setState({
				sideNav:false	//禁用左侧锚点导航
			})
		}else{
			this.setState({
				sideNav:false
			})
		}
	}
	grouppl(){
		const data=[{key:"gp0",name:"李工"},{key:"gp0",name:"王工"}];
		const fellows = data.map((item,index)=>(
			<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:12}} key={index}>
				<Badge style={{ backgroundColor:'#00B58A',borderWidth:1,borderColor:'#999',color:'#000'}}><Text>{index}</Text></Badge>
				<Text>{item.name}</Text>
			</View>
		))
		return fellows;
	}
	closeDatabase(){
		if(sdyDb){
			console.log("closeing database...");
			sdyDb.close().then((status)=>{
				console.log("数据库关闭");
			}).catch((error)=>{console.log("无法关闭原因"+error)});
		}
	}
	componentDidMount(){
		var arr = [];
		Orientation.unlockAllOrientations();
		SQLite.openDatabase({name:'sdy.db'}).then((DB)=>{	
			sdyDb = DB;
			sdyDb.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM ordersDetail WHERE test_task_work_order_id = '${this.props.ready}'`).then(([txt,result])=>{
					for(var i=0;i<result.rows.length;i++){
						arr.push(result.rows.item(i));
					}
					this.setState({
						use_company_name:arr[0].use_company_name,
						test_task_work_order_num:arr[0].test_task_work_order_num,
						test_task:arr[0].test_task,
						device_model:arr[0].device_model,
						device_code:arr[0].device_code,
						test_purpose:arr[0].test_purpose,
						testProjectList:JSON.parse(arr[0].testProjectList),
						contact:arr[0].contact,
						make_date:arr[0].make_date,
						maker_name:arr[0].maker_name,
						phone:arr[0].phone,
						use_company_id:arr[0].use_company_id,
						use_company_name:arr[0].use_company_name,
						use_company_org_code:arr[0].use_company_org_code,
						use_date:arr[0].use_date,
						check_name:arr[0].check_name,
						record_name:arr[0].record_name,
						remark_device:arr[0].remark_device,
						listProQue:JSON.parse(arr[0].listProQue),
						check_date_device:arr[0].check_date_device,
						record_date_device:arr[0].record_date_device
					})
					
				})
			}).then(()=>{
				var brr = [];
				sdyDb.transaction((tx)=>{
					tx.executeSql(`SELECT * FROM orderList INNER JOIN comInfo ON orderList.use_company_id = comInfo.use_company_id WHERE test_task_work_order_id = '${this.props.ready}'`).then(([txt,result])=>{
						for(var i=0;i<result.rows.length;i++){
							brr.push(result.rows.item(i));
						}
						this.setState({
							company_address:brr[0].company_address
						})
					})
				})
			})
		})
	}
	componentDidUpdate(prevProps, prevState, snapshot){

	}
	componentWillUnmount(){
		this.closeDatabase();
	}
	render(){
		return (
			<View onLayout={({nativeEvent:e})=>{this._layout(e)}}>
				<Grid>
				{this.state.sideNav && (
					<Col size={1} style={{backgroundColor:"#FAF8F8"}}>
						<View style={{position:'absolute',height:200}}>
						<View style={{paddingVertical:12}}>
							<View style={{textAlign:'center'}}><Text style={styles.side_title}>测试大纲</Text></View>
							<View><Text style={styles.side_mintitle}>TESTING OUTLINE</Text></View>
						</View>
						<View style={{paddingVertical:12}}>
							<View><Text style={styles.side_title}>综合信息记录表</Text></View>
							<View><Text style={styles.side_mintitle}>COMPREHENSIVE INFO TABEL</Text></View>
						</View>
						<View style={{paddingVertical:12}}>
							<View><Text style={styles.side_title}>设计数据综合表</Text></View>
							<View><Text style={styles.side_mintitle}>DESIGNS TABLE</Text></View>
						</View>
						<View style={{paddingVertical:12}}>
							<View><Text style={styles.side_title}>现场使用设备表</Text></View>
							<View><Text style={styles.side_mintitle}>TESTING ONLINE TABLE</Text></View>
						</View>
						</View>
					</Col>
				)}
					<Col size={5} style={{backgroundColor:"#FFF"}}>
						<Card>
						<CardItem>
						<Body style={styles.CardBody}>
							<View style={{width:'100%'}}>
								<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉能效测试大纲</Txt></View>
								<View style={{flex:1,alignSelf:'flex-end',paddingVertical:25}}><Text>编号：{this.state.test_task_work_order_num}</Text></View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>锅炉型号：</Text>
									<Text style={styles.tabCon}>{this.state.device_model}</Text>
								</View>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>产品编号：</Text>
									<Text style={styles.tabCon}>{this.state.device_code}</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>实验任务：</Text>
									<Text style={styles.tabCon}>{this.state.test_task}</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>锅炉使用单位：</Text>
									<Text style={styles.tabCon}>{this.state.use_company_name}</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
									<Text style={styles.tabTitle}>实验目的：</Text>
									<Text style={styles.tabCon}>{this.state.test_purpose}</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'column',alignItems:'center',alignContent:'center',paddingVertical:25}}>
								<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
									<Text>请仔细查阅</Text>
									 <TouchableOpacity onPress={()=>{this.showModal('实验要求')}}><Text style={{color:"#3F51B5",textDecorationLine:'underline'}}>（实验要求）</Text></TouchableOpacity>
									 <Text>并严格按照以上要求进行操作</Text>
								</View>
								{/*<View style={{flex:1,alignItems:'center',flexDirection:'row'}}><Radio selected={false} /><Text style={{fontSize:12,paddingLeft:12}}>我已了解，继续操作</Text></View> */}
							</View>
						</Body>
						</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									{/*
									<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
										<View style={{flex:1}}><Text style={styles.tabTitle}>测试项目</Text></View>
										<View style={{flex:1}}><Text style={styles.tabTitle}>仪器、仪表</Text></View>
										<View style={{flex:1}}><Text style={styles.tabTitle}>测试部位</Text></View>
										
										<View style={{flex:1}}><Text style={styles.tabTitle}>记录人员</Text></View>
										<View style={{flex:1}}><Text style={styles.tabTitle}>备注</Text></View>
									</View>
									<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
										<View style={{flex:1}}><Text style={styles.tabCon}>入炉冷空气温度</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>温、湿度表</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>鼓风机进风口</Text></View>
										
										<View style={{flex:1}}><Text style={styles.tabCon}>马松</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>无</Text></View>
									</View>
									<View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
										<View style={{flex:1}}><Text style={styles.tabCon}>排烟温度</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>温度测量仪</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>出口烟道一米范围内</Text></View>
										
										<View style={{flex:1}}><Text style={styles.tabCon}>赵工</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>无</Text></View>
									</View>
									*/}
									{this.state.testProjectList[0]=="加载中..."?(
										<View style={{width:'100%'}}>
											<ActivityIndicator size="large" color="#0000ff" />
										</View>
									):(
										<View style={{width:'100%'}}>
											<Accordion
											dataArray={this.state.testProjectList}
											headerStyle={{ backgroundColor: "#3F51B5" }}
											contentStyle={{ backgroundColor: "#8191E9" }}
											animation={false}
											expanded={true}
											renderHeader={this._rh}
											renderContent={this._rc}
											/>
										</View>
									)}
									
									  
									
									<View style={{flex:1,flexDirection:'row',alignItems:'center',paddingVertical:25}}>
										<View style={{width:'100%',flex:1,flexDirection:'column',alignItems:'center',alignContent:'center'}}>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text>请仔细查阅</Text>
												 <TouchableOpacity onPress={()=>{this.showModal('测试工作程序')}}>
													<Text style={{color:"#3F51B5",textDecorationLine:'underline'}}>（测试工作程序）</Text>
												</TouchableOpacity>
												 <Text>并严格按照以上要求进行操作</Text>
											</View>
											{/*<View style={{flex:1,alignItems:'center',flexDirection:'row'}}><Radio selected={false} /><Text style={{fontSize:12,paddingLeft:12}}>我已了解，继续操作</Text></View> */}
										</View>
									</View>
									<View style={{flex:1,flexDirection:'column',alignItems:'center',paddingVertical:20}}>
										<View style={{flex:1}}>
											<Item inlineLabel style={{width:'100%'}}>
												<Text>ath取值（%）：</Text>
												<Input placeholder='ath取值（%）' keyboardType="numeric"/>
											</Item>
										</View>
										<View style={{flex:1}}>
											<Item inlineLabel style={{width:'100%'}}>
												<Text>a1m取值（%）：</Text>
												<Input placeholder='a1m取值（%）' keyboardType="numeric"/>
											</Item>
										</View>
										<View style={{flex:1}}>
											<Item inlineLabel style={{width:'100%'}}>
												<Text>a1z取值（%）：</Text>
												<Input placeholder='a1z取值（%）' keyboardType="numeric"/>
											</Item>
										</View>
									</View>
									<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
											<Text style={styles.tabCon}>测试人员签名：</Text>
											<View style={{flexDirection:'row',alignItems:'center'}}>
												{this.grouppl()}
											</View>
										</View>
										<View style={{display:'flex',width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
											<Text>日期：</Text>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(0)}}><Text>{this.state.date0}</Text></Button>
										</View>
									</View>
									<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
											<Text style={styles.tabCon}>负责人：</Text>
											<Text>林锦权</Text>
										</View>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
											<Text style={styles.tabCon}>日期：</Text>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
										</View>
									</View>
									<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
											<Text style={styles.tabCon}>编制：</Text>
											<Picker
												mode="dropdown"
												iosHeader="选择编制人员"
												iosIcon={<Icon name="arrow-down" />}
												style={{ width: 10 }}
												selectedValue={this.state.selected2}
												 onValueChange={(e)=>{this.pickChange(e,2)}}
											>
												  <Picker.Item label="张三" value="key0" />
												  <Picker.Item label="李四" value="key1" />
												  <Picker.Item label="王五" value="key2" />
												  <Picker.Item label="刘能" value="key3" />
												  <Picker.Item label="宋小宝" value="key4" />
											</Picker>
										</View>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
											<Text style={styles.tabCon}>日期：</Text>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(2)}}><Text>{this.state.date2}</Text></Button>
										</View>
									</View>
									<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
											<Text style={styles.tabCon}>审核：</Text>
											<Picker
												mode="dropdown"
												iosHeader="选择编制人员"
												iosIcon={<Icon name="arrow-down" />}
												style={{ width: 10 }}
												selectedValue={this.state.selected3}
												 onValueChange={(e)=>{this.pickChange(e,3)}}
											>
												  <Picker.Item label="张三" value="key0" />
												  <Picker.Item label="李四" value="key1" />
												  <Picker.Item label="王五" value="key2" />
												  <Picker.Item label="刘能" value="key3" />
												  <Picker.Item label="宋小宝" value="key4" />
											</Picker>
										</View>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
											<Text style={styles.tabCon}>日期：</Text>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(3)}}><Text>{this.state.date3}</Text></Button>
										</View>
									</View>
								</Body>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									<View style={{width:'100%'}}>
										<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉能效测试综合信息记录表</Txt></View>
										<View style={{flex:1,alignSelf:'flex-end',paddingVertical:25}}><Text>编号：{this.state.test_task_work_order_num}</Text></View>
									</View>
									<View style={{...styles.table,paddingVertical:25}}><Text>基本信息</Text></View>
									<View style={styles.table}>
										<View style={{flexDirection:'column',width:'100%',alignContent:'flex-start'}}>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>使用单位：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.use_company_name}</Text>
											</View>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>使用单位组织机构代码：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.use_company_org_code}</Text>
											</View>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>委托单位：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.use_company_name}</Text>
											</View>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>制造单位：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.maker_name}</Text>
											</View>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>测试地点：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.company_address}</Text>
											</View>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>锅炉房名称：</Text>
												<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'100%'}}><Input placeholder="锅炉房名称"/></Item></View>
											</View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>使用证号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'100%'}}><Input placeholder="使用证号"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>内部编号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="内部编号"/></Item></View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>传真号码：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="传真号码"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>邮政编号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="邮政编号"/></Item></View>
										</View>
									</View>
									<View style={styles.table}>
											<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>联系人：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.contact}</Text>
											</View>
											<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>联系人电话：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.use_company_mobile_phone}</Text>
											</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>制造许可证编号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder={this.state.making_code}/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>锅炉型号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.device_model}</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>设计文件鉴定机构：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.design_identify_organization}</Text>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>产品编号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.device_code}</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>总图号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input editable={false} placeholder={this.state.printing_num}/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>设计文件鉴定编号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>807</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>制造日期：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.make_date}</Text>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>投用日期：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.use_date}</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>使用燃料种类：</Text>
											 <Picker
												  mode="dropdown"
												  iosHeader="选择燃煤种类"
												  iosIcon={<Icon name="arrow-down" />}
												  style={{width:10}}
												  selectedValue={this.state.selected4}
												  onValueChange={(e)=>{this.pickChange(e,4)}}
												>
												  <Picker.Item label="燃煤" value="key0" />
												  <Picker.Item label="石油" value="key1" />
												  <Picker.Item label="天然气" value="key2" />
												  <Picker.Item label="电" value="key3" />
												  <Picker.Item label="液化石油气" value="key4" />
												</Picker>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>使用燃烧设备：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="使用燃烧设备"/></Item></View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>使用燃料种类：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.fuel_type}</Text>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>燃料样品编号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>{this.state.fuel_type_code}</Text>
										</View>
									</View>
								</Body>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									<View style={{...styles.table,paddingVertical:25}}><Text>测试现场情况</Text></View>
									<View style={{width:'100%'}}>
									<List>
										<ListItem itemHeader first>
											<Text>测试类型</Text>
										</ListItem>
										<ListItem>
											<Text>运行工况热效率简单测试</Text>
										</ListItem>
										<ListItem itemHeader>
											<Text>锅炉类型</Text>
										</ListItem>
										<ListItem>
											<Picker
											mode="dropdown"
											placeholder="锅炉种类"
											iosIcon={<Icon name="arrow-down" />}
											 itemStyle={{
												backgroundColor: "#d3d3d3",
												marginLeft: 0,
												paddingLeft: 10,
												width:'50%'
											  }}
											  itemTextStyle={{ color: '#788ad2' }}
											style={{ width:'50%'}}
											selectedValue={this.state.selected}
											onValueChange={this.onValueChange.bind(this)}
											>		
											 <Picker.Item label="蒸汽锅炉" value="key0" />
											 <Picker.Item label="热水锅炉" value="key1" />
											 <Picker.Item label="有机载热体锅炉" value="key2" />
											</Picker>
										</ListItem>
										<ListItem itemHeader>
											<Text>锅炉系统信息</Text>
										</ListItem>
										<ListItem icon selected={this.state.ckbox1}>
											<CheckBox checked={this.state.ckbox1} onPress={()=>{!this.state.ckbox1?this.setState({ckbox1:true}):this.setState({ckbox1:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox1?this.setState({ckbox1:true}):this.setState({ckbox1:false})}}>
													<Text>省煤器</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox2}>
											<CheckBox checked={this.state.ckbox2} onPress={()=>{!this.state.ckbox2?this.setState({ckbox2:true}):this.setState({ckbox2:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox2?this.setState({ckbox2:true}):this.setState({ckbox2:false})}}>
													<Text>软化水装置</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox3}>
											<CheckBox checked={this.state.ckbox3} onPress={()=>{!this.state.ckbox3?this.setState({ckbox3:true}):this.setState({ckbox3:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox3?this.setState({ckbox3:true}):this.setState({ckbox3:false})}}>
													<Text>除氧装置</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox4}>
											<CheckBox checked={this.state.ckbox4} onPress={()=>{!this.state.ckbox4?this.setState({ckbox4:true}):this.setState({ckbox4:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox4?this.setState({ckbox4:true}):this.setState({ckbox4:false})}}>
													<Text>空气预热器</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox5}>
											<CheckBox checked={this.state.ckbox5} onPress={()=>{!this.state.ckbox5?this.setState({ckbox5:true}):this.setState({ckbox5:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox5?this.setState({ckbox5:true}):this.setState({ckbox5:false})}}>
													<Text>脱硫装置</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox6}>
											<CheckBox checked={this.state.ckbox6} onPress={()=>{!this.state.ckbox6?this.setState({ckbox6:true}):this.setState({ckbox6:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox6?this.setState({ckbox6:true}):this.setState({ckbox6:false})}}>
													<Text>烟气节能器</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox7}>
											<CheckBox checked={this.state.ckbox7} onPress={()=>{!this.state.ckbox7?this.setState({ckbox7:true}):this.setState({ckbox7:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox7?this.setState({ckbox7:true}):this.setState({ckbox7:false})}}>
													<Text>脱氮装置</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon selected={this.state.ckbox8}>
											<CheckBox checked={this.state.ckbox8} onPress={()=>{!this.state.ckbox8?this.setState({ckbox8:true}):this.setState({ckbox8:false})}}/>
											<Body>
												<TouchableOpacity onPress={()=>{!this.state.ckbox8?this.setState({ckbox8:true}):this.setState({ckbox8:false})}}>
													<Text>蒸汽发生器</Text>
												</TouchableOpacity>
											</Body>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>除尘方式</Text>
													<Input placeholder="此处键盘输入除尘方式"/>
												</View>
											</Body>
										</ListItem>
										<ListItem itemHeader>
											<Text>测试情况说明</Text>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>锅炉辅机状况</Text>
													<Input placeholder="此处键盘输入工况"/>
												</View>
											</Body>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>锅炉系统状况</Text>
													<Input placeholder="此处键盘输入工况"/>
												</View>
											</Body>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>锅炉使用燃料状况</Text>
													<Input placeholder="此处键盘输入工况"/>
												</View>
											</Body>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>锅炉介质状况</Text>
													<Input placeholder="此处键盘输入工况"/>
												</View>
											</Body>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>燃料、煤、渣系统</Text>
													<Input placeholder="此处键盘输入工况"/>
												</View>
											</Body>
										</ListItem>
										<ListItem icon>
											<Body>
												<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
													<Text>其他需要说明的问题</Text>
													<Input placeholder="此处键盘输入工况"/>
												</View>
											</Body>
										</ListItem>
									</List>
									</View>
									{/*******************************************/}
									<View style={{width:'100%',paddingVertical:25}}>
										<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
												<Text style={styles.tabCon}>记录：</Text>
												<Text>林锦权</Text>
											</View>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={styles.tabCon}>记录日期：</Text>
												<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
											</View>
										</View>
										<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
												<Text style={styles.tabCon}>校对：</Text>
												<Text>林锦权</Text>
											</View>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={styles.tabCon}>校对日期：</Text>
												<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
											</View>
										</View>
									</View>
									{/*******************************************/}
								</Body>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									{/***************设计参数二***************/}
									<View style={{width:'100%'}}>
										<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉设计数据综合表</Txt></View>
										<View style={{flex:1,alignSelf:'flex-end',paddingVertical:25}}><Text>编号：#3215151513</Text></View>
									</View>
									<View style={styles.table}><Text style={styles.tabCon}>设计参数一</Text></View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>序号</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>名称</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>符号</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>单位</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计数据</Text></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>1</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>锅炉设计额定出力</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Q</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>MW</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>2</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>锅炉设计额定压力</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>tck</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>℃</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>3</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>出口介质温度</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>tck</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>℃</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>4</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>进口介质压力</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>pg</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>MPa</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>5</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>进口介质温度</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>tjk</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>℃</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>6</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计介质循环量</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>G</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>kg/h</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>7</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>排烟温度</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>tpy</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>℃</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>8</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>排烟处过量空气系数</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>αpy</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>9</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>锅炉效率</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>pg</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>MPa</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>10</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>燃料消耗量</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>B</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>kg/h</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>11</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>稳定运行的工况范围</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>12</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计燃料</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									
									{/***************锅炉主要特性二***************/}
									<View style={styles.table}><Text style={styles.tabCon}>锅炉主要特性二</Text></View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>序号</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>名称</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>符号</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>单位</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计数据</Text></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>1</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计燃烧设备</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>2</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>炉排面积</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>R</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>m2</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>3</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>炉膛辐射受热面</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>A</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>m2</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>4</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>对流受热面</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>A</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>m2</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>5</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>省煤器受热面</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>A</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>m2</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>6</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>空气预热器受热面</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>A</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>m2</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>7</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>总受热面积</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>∑A</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>m2</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>8</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计燃烧方式</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>-</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									{/***************设计燃料特性***************/}
									<View style={styles.table}><Text style={styles.tabCon}>设计燃料特性三</Text></View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>序号</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>名称</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>符号</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>单位</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>设计数据</Text></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>1</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基碳</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Car</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>2</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基氢</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Har</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>3</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基氧</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Oar</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>4</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基硫</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Sar</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>5</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基氮</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Nar</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>6</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基灰分</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Aar</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>7</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基水分</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Mar</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>8</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>干燥无灰基挥发分</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Vdaf</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>%</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:1}}><Text style={styles.tabCon}>9</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>收到基低位发热量</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>Qnet,v,ar</Text></View>
										<View style={{flex:1}}><Text style={styles.tabCon}>kJ/kg</Text></View>
										<View style={{flex:1}}><Item><Input placeholder="填入数据"/></Item></View>
									</View>
									<View style={{width:'100%',paddingVertical:25}}>
										<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
												<Text style={styles.tabCon}>记录：</Text>
												<Text>林锦权</Text>
											</View>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={styles.tabCon}>记录日期：</Text>
												<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
											</View>
										</View>
										<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
												<Text style={styles.tabCon}>校对：</Text>
												<Text>林锦权</Text>
											</View>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={styles.tabCon}>校对日期：</Text>
												<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
											</View>
										</View>
									</View>
								</Body>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									<View style={{width:'100%'}}>
										<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉能效测试现场使用设备表</Txt></View>
										<View style={{flex:1,alignSelf:'flex-end',paddingVertical:25}}><Text>编号：#3215151513</Text></View>
									</View>
									{this.state.listProQue[0]=="加载中..."?(
										<View style={{width:'100%'}}>
											<ActivityIndicator size="large" color="#0000ff" />
										</View>
									):(
										<View style={{width:'100%'}}>
											<Accordion
												dataArray={this.state.listProQue}
												headerStyle={{ backgroundColor: "#3F51B5" }}
												contentStyle={{ backgroundColor: "#8191E9" }}
												animation={false}
												expanded={true}
												renderHeader={this._renderHeader}
												renderContent={this._renderContent}
											/>
										</View>
									)}
									
									<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
										<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="备注（选填选项）" />
									</View>
									<View style={{width:'100%',paddingVertical:25}}>
										<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
												<Text style={styles.tabCon}>记录：</Text>
												<Text>林锦权</Text>
											</View>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={styles.tabCon}>记录日期：</Text>
												<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
											</View>
										</View>
										<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
												<Text style={styles.tabCon}>校对：</Text>
												<Text>林锦权</Text>
											</View>
											<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
												<Text style={styles.tabCon}>校对日期：</Text>
												<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
											</View>
										</View>
									</View>
								</Body>
							</CardItem>
						</Card>
					</Col>
				</Grid>
			</View>
		)
	}
}
export default Tab2;