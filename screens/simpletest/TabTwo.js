import React,{Component} from 'react';
import {View,DatePickerAndroid,Image,CameraRoll,Dimensions,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {ListItem as Li,List,Text as Txt,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { 
Container, Header, Title, Content, Footer, FooterTab, 
Button, Left, Right, Body, Icon, Text,Tabs,Tab,
ScrollableTab,Card, CardItem,Grid,Col,Row,
Item,Input,Form,Picker,Badge,
Radio,ListItem,CheckBox,Textarea,Accordion
} from 'native-base';
import { styles } from '../styles.js';
import { StackNavigator, TabNavigator } from "react-navigation";
import Orientation from 'react-native-orientation'
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
const testObject = [
	{testItem:"入炉冷空气温度",testDevice:"温度测量仪/热电偶",testPartion:"鼓风机进风口",record:"马工",ps:"-"},
	{testItem:"排烟温度",testDevice:"温度测量仪/热电偶",testPartion:"出口烟道一米范围内","record":"马工",ps:"-"},
	{testItem:"烟气成分分析",testDevice:"烟气分析仪",testPartion:"出口烟道一米范围内","record":"马工",ps:"-"},
	{testItem:"给水温度",testDevice:"温度测量仪/热电偶",testPartion:"锅炉进水管道","record":"马工",ps:"-"},
	{testItem:"蒸汽压力",testDevice:"压力表",testPartion:"锅炉顶部压力表","record":"马工",ps:"-"},
	{testItem:"给水压力",testDevice:"压力表",testPartion:"锅炉顶部压力表","record":"马工",ps:"-"}
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
			sideNav:false
		}
	}
	_renderHeader(item, expanded){
		return (
			<View style={{width:'100%',flexDirection: "row",paddingVertical:10,justifyContent: "space-between",alignItems: "center" , backgroundColor: "#A9DAD6"}}>
				<Text style={{paddingLeft:"2%"}}>{"设备:"+item.device+"/型号"+item.type}</Text>
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
				<Text>{"设备编号："+item.devId}</Text>
				<Text>{"测试项目："+item.tesfun}</Text>
				<Text>{"仪器："+item.device}</Text>
				<Text>{"精度："+item.precision}</Text>
				<Text>{"量程："+item.range}</Text>
			</View>
		)
	}
	_rh(item, expanded){
		return (
			<View style={{width:'100%',flexDirection: "row",paddingVertical:10,justifyContent: "space-between",alignItems: "center" , backgroundColor: "#A9DAD6",borderBottomWidth:1,borderColor:"#dedede"}}>
				<Text style={{paddingLeft:"2%"}}>{"测试项目:"+item.testItem}</Text>
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
				<View style={{paddingHorizontal:25,paddingVertical:12}}><Text>{"仪器/仪表："+item.testDevice}</Text></View>
				<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:25}}>
					<Text>测试部位：</Text>
					<Input placeholder={item.testPartion} style={{borderBottomWidth:1,borderBottomColor:"#dedede"}}/>
				</View>
				<View style={{paddingHorizontal:25,paddingVertical:12}}><Text>{"记录人："+item.record}</Text></View>
				<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:25}}>
					<Text>备注：</Text>
					<Input placeholder={item.ps} style={{borderBottomWidth:1,borderBottomColor:"#dedede"}}/>
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
	showModal(){
		this.props.nav('modal');
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
			<View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:12}}>
				<Badge primary><Text>{index}</Text></Badge>
				<Text>{item.name}</Text>
			</View>
		))
		return fellows;
	}
	componentDidMount(){
		Orientation.unlockAllOrientations();
	}
	componentDidUpdate(prevProps, prevState, snapshot){

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
								<View style={{flex:1,alignSelf:'flex-end'}}><Text>编号：#3215151513</Text></View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>锅炉使用单位：</Text>
									<Text style={styles.tabCon}>广州衡纬科技有限公司</Text>
								</View>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>实验任务：</Text>
									<Text style={styles.tabCon}>锅炉热效应简单测试</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>锅炉型号：</Text>
									<Text style={styles.tabCon}>KD-123</Text>
								</View>
								<View style={{flex:0.5,alignItems:'center',flexDirection:'row'}}>
									<Text style={styles.tabTitle}>产品编号：</Text>
									<Text style={styles.tabCon}>054-225</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'row'}}>
								<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
									<Text style={styles.tabTitle}>实验目的：</Text>
									<Text style={styles.tabCon}>对该锅炉进行主要参数的简单测试快速判定锅炉实际运行的能效状况</Text>
								</View>
							</View>
							<View style={{width:'100%',flex:1,flexDirection:'column',alignItems:'center',alignContent:'center',paddingVertical:25}}>
								<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
									<Text>请仔细查阅</Text>
									 <TouchableOpacity onPress={()=>{this.showModal()}}><Text style={{color:"#3F51B5",textDecorationLine:'underline'}}>（实验要求）</Text></TouchableOpacity>
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
									<View style={{width:'100%'}}>
										<Accordion
										dataArray={testObject}
										headerStyle={{ backgroundColor: "#3F51B5" }}
										contentStyle={{ backgroundColor: "#8191E9" }}
										animation={true}
										expanded={true}
										renderHeader={this._rh}
										renderContent={this._rc}
										/>
									</View>
									  
									
									<View style={{flex:1,flexDirection:'row',alignItems:'center',paddingVertical:25}}>
										<View style={{width:'100%',flex:1,flexDirection:'column',alignItems:'center',alignContent:'center'}}>
											<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text>请仔细查阅</Text>
												 <TouchableOpacity onPress={()=>{this.showModal()}}>
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
												<Input placeholder='ath取值（%）' keyboardType="numeric"/>
											</Item>
										</View>
										<View style={{flex:1}}>
											<Item inlineLabel style={{width:'100%'}}>
												<Input placeholder='a1m取值（%）' keyboardType="numeric"/>
											</Item>
										</View>
										<View style={{flex:1}}>
											<Item inlineLabel style={{width:'100%'}}>
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
											<Text style={styles.tabCon}>负责人签名：</Text>
											<Text>签名处</Text>
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
										<View style={{flex:1,alignSelf:'flex-end'}}><Text>编号：#3215151513</Text></View>
									</View>
									<View style={styles.table}><Text>基本信息</Text></View>
									<View style={styles.table}>
										<View style={styles.table}>
											<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>使用单位：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>广州衡纬科技有限公司</Text>
											</View>
											<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>使用单位组织机构代码：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>OSS-8871551</Text>
											</View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>委托单位：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="委托单位"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>使用证号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="使用证号"/></Item></View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>测试地点：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="测试地点"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>内部编号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="内部编号"/></Item></View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>锅炉房名称：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="锅炉房名称"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>邮政编号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="邮政编号"/></Item></View>
										</View>
									</View>
									<View style={styles.table}>
											<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>联系人：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>测试专业户</Text>
											</View>
											<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
												<Text style={styles.tabTitle}>联系人电话：</Text>
												<Text style={[styles.tabCon,styles.disabledTxt]}>15920419808</Text>
											</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>传真号码：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="传真号码"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>制造单位：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>广州衡纬科技有限公司</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>制造许可证编号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="制造许可证编号"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>锅炉型号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>KD-123</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>设计文件鉴定机构：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>越秀区教育局</Text>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>产品编号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>SDY-1351215</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>总图号：</Text>
											<View style={{flex:1,flexDirection:'row'}}><Item style={{width:'80%'}}><Input placeholder="总图号"/></Item></View>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>设计文件鉴定编号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>807</Text>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>制造日期：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>2018-08-08</Text>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>投用日期：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>2019-01-05</Text>
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
											 <Picker
												  mode="dropdown"
												  iosHeader="使用燃烧方式"
												  iosIcon={<Icon name="arrow-down" />}
												  style={{width:10}}
												  selectedValue={this.state.selected5}
												  onValueChange={(e)=>{this.pickChange(e,5)}}
												>
												  <Picker.Item label="层状燃烧" value="key0" />
												  <Picker.Item label="自然燃烧" value="key1" />
												  <Picker.Item label="液化燃烧" value="key2" />
												  <Picker.Item label="化学燃烧" value="key3" />
												  <Picker.Item label="气体燃烧" value="key4" />
												</Picker>
										</View>
										<View style={{flex:0.5,flexDirection:'row',alignItems:'center',alignContent:'center'}}>
											<Text style={styles.tabTitle}>燃料样品编号：</Text>
											<Text style={[styles.tabCon,styles.disabledTxt]}>88495445800</Text>
										</View>
									</View>
								</Body>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									<View style={styles.table}><Text>测试现场情况</Text></View>
									<View style={styles.table}>
										<View style={{flex:0.1}}><Text>测试类型：</Text></View>
										<View style={{flex:0.28}}>
											<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
												<Radio color={"#999999"} selected={false} /><Right style={{flex:1,marginLeft:12}}><Text style={styles.disabledTxt}>定型产品热效率测试</Text></Right>
											</ListItem>
										</View>
										<View style={{flex:0.31}}>
											<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
												<Radio color={"#999999"} selected={false} /><Right style={{flex:1,marginLeft:12}}><Text style={styles.disabledTxt}>运行工况热效率详细测试</Text></Right>
											</ListItem>
										</View>
										<View style={{flex:0.31}}>
											<ListItem selected={true} style={{flex:1,flexDirection:'row'}}>
												<Radio selected={true} /><Right style={{flex:1,marginLeft:12}}><Text>运行工况热效率简单测试</Text></Right>
											</ListItem>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>锅炉种类：</Text></View>
										<View style={{flex:0.28}}>
											<ListItem>
												<CheckBox checked={false} />
												<Body>
												  <Text>蒸汽锅炉</Text>
												</Body>
											</ListItem>
										</View>
										<View style={{flex:0.31}}>
											<ListItem>
												<CheckBox checked={false} />
												<Body>
												  <Text>热水锅炉</Text>
												</Body>
											</ListItem>
										</View>
										<View style={{flex:0.31}}>
											<ListItem>
												<CheckBox checked={false} />
												<Body>
												  <Text>有机载热体锅炉</Text>
												</Body>
											</ListItem>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>锅炉系统信息：</Text></View>
										<View style={{flex:0.9}}>
											<View style={{width:'100%',flexDirection:'row',alignContent:'center',flexWrap:'wrap',alignItems:'center'}}>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>省煤气</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>软化水装置</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>除氧装置</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>空气预热器</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>脱硫装置</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>烟气节能器</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>脱氮装置</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<CheckBox checked={false} />
														<Body>
														  <Text>蒸汽发生器</Text>
														</Body>
													</ListItem>
												</View>
												<View style={{width:'33%'}}>
													<ListItem>
														<Body>
															<Text>除尘方式</Text>
														</Body>
														<Picker
														  mode="dropdown"
														  iosHeader="使用燃烧方式"
														  iosIcon={<Icon name="arrow-down" />}
														  style={{width:10}}
														  selectedValue={this.state.selected6}
														  onValueChange={(e)=>{this.pickChange(e,6)}}
														>
														  <Picker.Item label="无除尘方式" value="key0" />
														  <Picker.Item label="旋风除尘" value="key1" />
														  <Picker.Item label="净化器" value="key2" />
														</Picker>
													</ListItem>
												</View>
											</View>
										</View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>锅炉系统信息：</Text></View>
										<View style={{flex:0.9}}>
											<View style={{width:'100%',flexDirection:'row',alignContent:'center',flexWrap:'wrap',alignItems:'center'}}>
												<ListItem>
												<View style={{width:'50%'}}><Text style={styles.tabCon}>测试工况</Text></View>
												<View style={{width:'30%'}}><Text style={styles.tabCon}>工况I</Text></View>
												<View style={{width:'20%'}}><Text style={styles.tabCon}>工况II</Text></View>
												</ListItem>
												<ListItem>
												<View style={{width:'50%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
													
														<CheckBox checked={false} />
														<Body>
															<Text style={styles.tabCon}>锅炉铺机状况</Text>
														</Body>
													
													</View>
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
														<CheckBox checked={false} />
														<Body>
															<Text>锅炉运行状况</Text>
														</Body>
													
													</View>
													
												</View>
												<View style={{width:'30%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<View style={{width:'100%'}}>
													<Picker
														  mode="dropdown"
														  iosHeader="工况I"
														  iosIcon={<Icon name="arrow-down" />}
														  style={{width:'100%'}}
														  selectedValue={this.state.selected7}
														  onValueChange={(e)=>{this.pickChange(e,7)}}
														>
														  <Picker.Item label="运行正常" value="key0" />
														  <Picker.Item label="运行异常" value="key1" />
														  <Picker.Item label="未知异常" value="key2" />
														</Picker>
													</View>
												</View>
												<View style={{width:'20%'}}><Text></Text></View>
												</ListItem>
												<ListItem>
												<View style={{width:'50%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
													
														<CheckBox checked={false} />
														<Body>
															<Text style={styles.tabCon}>锅炉系统状况</Text>
														</Body>
													
													</View>
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
														<CheckBox checked={false} />
														<Body>
															<Text>系统运行状况</Text>
														</Body>
													
													</View>
													
												</View>
												<View style={{width:'30%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<View style={{width:'100%'}}>
													<Picker
														  mode="dropdown"
														  iosHeader="工况I"
														  iosIcon={<Icon name="arrow-down" />}
														  style={{width:'100%'}}
														  selectedValue={this.state.selected8}
														  onValueChange={(e)=>{this.pickChange(e,8)}}
														>
														  <Picker.Item label="运行正常" value="key0" />
														  <Picker.Item label="运行异常" value="key1" />
														  <Picker.Item label="未知异常" value="key2" />
														</Picker>
													</View>
												</View>
												<View style={{width:'20%'}}><Text></Text></View>
												</ListItem>
												<ListItem>
												<View style={{width:'50%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
													
														<CheckBox checked={false} />
														<Body>
															<Text style={styles.tabCon}>锅炉燃料使用状况</Text>
														</Body>
													
													</View>
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
														<CheckBox checked={false} />
														<Body>
															<Text>测试燃料符合性</Text>
														</Body>
													
													</View>
													
												</View>
												<View style={{width:'30%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<View style={{width:'100%'}}>
													<Picker
														  mode="dropdown"
														  iosHeader="工况I"
														  iosIcon={<Icon name="arrow-down" />}
														  style={{width:'100%'}}
														  selectedValue={this.state.selected9}
														  onValueChange={(e)=>{this.pickChange(e,9)}}
														>
														  <Picker.Item label="运行正常" value="key0" />
														  <Picker.Item label="运行异常" value="key1" />
														  <Picker.Item label="未知异常" value="key2" />
														</Picker>
													</View>
												</View>
												<View style={{width:'20%'}}><Text></Text></View>
												</ListItem>
												<ListItem>
												<View style={{width:'50%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
													
														<CheckBox checked={false} />
														<Body>
															<Text style={styles.tabCon}>锅炉介质状况</Text>
														</Body>
													
													</View>
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
														<CheckBox checked={false} />
														<Body>
															<Text>锅炉工质符合性</Text>
														</Body>
													
													</View>
													
												</View>
												<View style={{width:'30%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<View style={{width:'100%'}}>
														<Item><Input placeholder="工况I" /></Item>
													</View>
												</View>
												<View style={{width:'20%'}}><Text></Text></View>
												</ListItem>
												<ListItem>
												<View style={{width:'50%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
													
														<CheckBox checked={false} />
														<Body>
															<Text style={styles.tabCon}>燃料、煤、渣系统</Text>
														</Body>
													
													</View>
													<View style={{width:'50%',display:'flex',alignItems:'center',flexDirection:'row',alignContent:'center'}}>
														<CheckBox checked={false} />
														<Body>
															<Text>燃料系统</Text>
														</Body>
													
													</View>
													
												</View>
												<View style={{width:'30%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<View style={{width:'100%'}}>
													<Picker
														  mode="dropdown"
														  iosHeader="工况I"
														  iosIcon={<Icon name="arrow-down" />}
														  style={{width:'100%'}}
														  selectedValue={this.state.selected10}
														  onValueChange={(e)=>{this.pickChange(e,10)}}
														>
														  <Picker.Item label="运行正常" value="key0" />
														  <Picker.Item label="运行异常" value="key1" />
														  <Picker.Item label="未知异常" value="key2" />
														</Picker>
													</View>
												</View>
												<View style={{width:'20%'}}><Text></Text></View>
												</ListItem>
												<ListItem>
												<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="其他情况说明" />
												</View>
												</ListItem>
											</View>
										</View>
									</View>
									{/*******************************************/}
									<View style={styles.table}>
										<View style={{flex:0.1}}><Text>记录</Text></View>
										<View style={{display:'flex',flex:0.4,flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
											<Picker
												mode="dropdown"
												iosHeader="工况I"
												iosIcon={<Icon name="arrow-down" />}
												style={{width:100}}
												selectedValue={this.state.selected10}
												onValueChange={(e)=>{this.pickChange(e,10)}}
											>
											  <Picker.Item label="张工" value="key0" />
											  <Picker.Item label="李工" value="key1" />
											  <Picker.Item label="王工" value="key2" />
											</Picker>
											<Text>签名处</Text>
										</View>
										<View style={{flex:0.1}}><Text>日期</Text></View>
										<View style={{flex:0.4}}>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(4)}}><Text>{this.state.date4}</Text></Button>
										</View>
										<View style={{flex:0.1}}><Text>校对</Text></View>
										<View style={{flex:0.4}}>
											<Picker
												mode="dropdown"
												iosHeader="工况I"
												iosIcon={<Icon name="arrow-down" />}
												style={{width:100}}
												selectedValue={this.state.selected11}
												onValueChange={(e)=>{this.pickChange(e,11)}}
											>
											  <Picker.Item label="张工" value="key0" />
											  <Picker.Item label="李工" value="key1" />
											  <Picker.Item label="王工" value="key2" />
											</Picker>
										</View>
										<View style={{flex:0.1}}><Text>校对日期</Text></View>
										<View style={{flex:0.4}}>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(5)}}><Text>{this.state.date5}</Text></Button>
										</View>
									</View>
								</Body>
							</CardItem>
						</Card>
						<Card>
							<CardItem>
								<Body style={styles.CardBody}>
									{/***************设计参数二***************/}
									<View style={{width:'100%'}}>
										<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉设计数据综合表</Txt></View>
										<View style={{flex:1,alignSelf:'flex-end'}}><Text>编号：#3215151513</Text></View>
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
									<View style={styles.table}>
										<View style={{flex:0.3}}><Text>记录</Text></View>
										<View style={{flex:0.7}}><Item><Input placeholder="记录人"/></Item></View>
										<View style={{flex:0.3}}><Text>记录日期</Text></View>
										<View style={{flex:0.7}}>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(6)}}><Text>{this.state.date6}</Text></Button>
										</View>
										<View style={{flex:0.3}}><Text>校对</Text></View>
										<View style={{flex:0.7}}><Item><Input placeholder="校对人"/></Item></View>
										<View style={{flex:0.3}}><Text>校对日期</Text></View>
										<View style={{flex:0.7}}>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(7)}}><Text>{this.state.date7}</Text></Button>
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
										<View style={{flex:1,alignSelf:'flex-end'}}><Text>编号：#3215151513</Text></View>
									</View>
									{/*
									<View style={styles.table}>
										<View style={{flex:0.03}}><Text style={styles.tabCon}>序号</Text></View>
										<View style={{flex:0.08}}><Text style={styles.tabCon}>设备编号</Text></View>
										<View style={{flex:0.09}}><Text style={styles.tabCon}>测试项目</Text></View>
										<View style={{flex:0.08}}><Text style={styles.tabCon}>型号</Text></View>
										<View style={{flex:0.15}}><Text style={styles.tabCon}>仪器</Text></View>
										<View style={{flex:0.3}}><Text style={styles.tabCon}>精度</Text></View>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>量程</Text></View>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>有效期</Text></View>
									</View>
									<View style={styles.table}>
										<View style={{flex:0.03}}><Text style={styles.tabCon}>1</Text></View>
										<View style={{flex:0.08}}><Text style={styles.tabCon}>XHX-0119</Text></View>
										<View style={{flex:0.09}}><Text style={styles.tabCon}>入炉冷空气温度</Text></View>
										<View style={{flex:0.08}}><Text style={styles.tabCon}>TH603A</Text></View>
										<View style={{flex:0.15}}><Text style={styles.tabCon}>温湿度表</Text></View>
										<View style={{flex:0.3}}><Text style={styles.tabCon}>温度测量精度：小于±1℃(-10～32℃),湿度测量精度：小于±5%(50～99%)</Text></View>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>温度:-30～60℃,湿度：0～100%RH</Text></View>
										<View style={{flex:0.1}}><Text style={styles.tabCon}>2019.1</Text></View>
									</View>
									*/}
									<Accordion
										dataArray={dataArray}
										headerStyle={{ backgroundColor: "#3F51B5" }}
										contentStyle={{ backgroundColor: "#8191E9" }}
										animation={true}
										expanded={true}
										renderHeader={this._renderHeader}
										renderContent={this._renderContent}
									/>
									<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
										<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="备注（选填选项）" />
									</View>
									<View style={styles.table}>
										<View style={{flex:0.3}}><Text>记录</Text></View>
										<View style={{flex:0.7}}><Item><Input placeholder="记录人"/></Item></View>
										<View style={{flex:0.3}}><Text>记录日期</Text></View>
										<View style={{flex:0.7}}>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(6)}}><Text>{this.state.date6}</Text></Button>
										</View>
										<View style={{flex:0.3}}><Text>校对</Text></View>
										<View style={{flex:0.7}}><Item><Input placeholder="校对人"/></Item></View>
										<View style={{flex:0.3}}><Text>校对日期</Text></View>
										<View style={{flex:0.7}}>
											<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(7)}}><Text>{this.state.date7}</Text></Button>
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