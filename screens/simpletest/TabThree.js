import React,{Component} from 'react';
import {View,DatePickerAndroid,Image,CameraRoll,Dimensions,TouchableOpacity} from 'react-native';
import {ListItem as Li,List as Lis,Text as Txt,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { 
Container, Header, Title, Content, Footer, FooterTab, 
Button, Left, Right, Body, Icon, Text,Tabs,Tab,
ScrollableTab,Card, CardItem,Grid,Col,Row,
Item,Input,Form,Picker,List,
Radio,ListItem,CheckBox,Textarea,Accordion
} from 'native-base';
import { styles } from '../styles.js';
import { StackNavigator, TabNavigator } from "react-navigation";
import Orientation from 'react-native-orientation';
import Echarts from 'native-echarts';
import SignatureView from "react-native-signature";
//进口介质压力&出口介质压力
class Pressurechart extends Component{
	render(){
		const option = {
			title: {
				text: '压力记录/介质流量'
			},
			tooltip:{
				trigger: 'axis',
				 axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data:['进口介质压力','出口介质压力','介质流量']
			},
			toolbox:{
				 feature: {
					saveAsImage: {}
				}
			},
			 grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{	
					name:"Min",
					type : 'category',
					boundaryGap : false,
					data : ['0','15','30','45','60','75','90']
				}
			],
			yAxis : [
				{	
					name:"Mpa",
					type : 'value'
				},
				{	
					name:"m³",
					nameLocation:'end',
					position:'right',
					type : 'value'
				}
			],
			series : [
				{
					name:'进口介质压力',
					type: 'line',
					areaStyle: {normal: {}},
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[120, 132, 101, 134, 90, 230, 210]
				},{
					name:'出口介质压力',
					type: 'line',
					areaStyle: {normal: {}},
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[220, 182, 191, 234, 290, 330, 310]
				},
				{
					name:'介质流量',
					yAxisIndex:1,
					type: 'line',
					areaStyle: {normal: {}},
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[25, 23, 24, 22, 26, 28, 20]
				}
			]
		}
		return (
			<Echarts option={option} height={300} />
		)
	}
}
class Temperaturechart extends Component{
	render(){
		const option = {
			title: {
				text: '温度记录'
			},
			tooltip:{
				trigger: 'axis',
				 axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data:['进口介质温度','出口介质温度','入炉冷空气温度','排烟温度']
			},
			toolbox:{
				 feature: {
					saveAsImage: {}
				}
			},
			 grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{	
					name:"Min",
					type : 'category',
					boundaryGap : false,
					data : ['0','15','30','45','60','75','90']
				}
			],
			yAxis : [
				{	
					name:"℃",
					type : 'value'
				}
			],
			series : [
				{
					name:'进口介质温度',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[31.7, 31.7, 31.8, 32.0, 32.1, 32, 31.5]
				},{
					name:'出口介质温度',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[23.5, 22.5, 26.4, 25.1, 23.3, 21.0, 22.2]
				},
				{
					name:'入炉冷空气温度',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[34.8, 34.8, 34.9, 34.6, 34.6, 34.5, 34.6]
				},
				{
					name:'排烟温度',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[143.7, 143.9, 145.1, 144.8, 145.9, 144.8, 145.6]
				}
			]
		}
		return (
			<Echarts option={option} height={300} />
		)
	}
}
class Gaschart extends Component{
	render(){
		const option = {
			title: {
				text: '气体记录'
			},
			tooltip:{
				trigger: 'axis',
				 axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data:['氧气','二氧化硫','二氧化碳','一氧化碳']
			},
			toolbox:{
				 feature: {
					saveAsImage: {}
				}
			},
			 grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{	
					name:"Min",
					type : 'category',
					boundaryGap : false,
					data : ['0','15','30','45','60','75','90']
				}
			],
			yAxis : [
				{	
					name:"%",
					type : 'value'
				}
			],
			series : [
				{
					name:'氧气',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[11.79, 11.36, 12.13, 11.88, 11.62, 11.38, 11.64]
				},{
					name:'二氧化硫',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[]
				},
				{
					name:'二氧化碳',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[]
				},
				{
					name:'一氧化碳',
					type: 'line',
					label:{
						 normal: {
							show: true,
							position: 'top'
						}
					},
					data:[0.0317, 0.0304, 0.0278, 0.0247, 0.0266, 0.0231, 0.0269]
				}
			]
		}
		return (
			<Echarts option={option} height={300} />
		)
	}
}
class Tab3 extends Component{
	constructor(props){
		super(props);
		this._layout = this._layout.bind(this);
		this.state={
			sideNav:false,
			date0:'选择日期',
			date1:'选择日期',
			ckbox1:false,
			ckbox2:false,
			ckbox3:false,
			ckbox4:false,
			ckbox5:false,
			ckbox6:false,
			ckbox7:false
		}
	}
	_layout(e){
		// 判断横竖屏幕
		const {x, y, width, height} = e.layout;
		const {width:w,height:h} = Dimensions.get('window');
		
		if(width>h){
			this.setState({
				sideNav:false //禁用左侧锚点导航
			})
		}else{
			this.setState({
				sideNav:false
			})
		}

	}
	onValueChange(value: string) {
		this.setState({
		  selected: value
		});
	  }
	signName(){
			this.props.nav("SignatureView",{
				title:"签字",
				callback:(data)=>{
					console.warn(data);
				}
			});
	}
	DatePicker(i){
		var I = this;
		switch(i){
			case(0):
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
			case(1):
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
		}
	}
	render(){
		return(
			<View onLayout={({nativeEvent:e})=>{this._layout(e)}}>
				<Grid>
				{this.state.sideNav && (
					<Col size={1} style={{backgroundColor:"#FAF8F8"}}>
						<View style={{paddingVertical:12}}>
							<View style={{textAlign:'center'}}><Text style={styles.side_title}>锅炉能效简单测试</Text></View>
							<View><Text style={styles.side_mintitle}>SIMPLE TESTING GUIDE</Text></View>
						</View>
						<View style={{paddingVertical:12}}>
							<View><Text style={styles.side_title}>取样记录</Text></View>
							<View><Text style={styles.side_mintitle}>SAMPLE</Text></View>
						</View>
					</Col>
				)}
					<Col size={5}>
						<Card>
						<CardItem>
						<Body style={styles.CardBody}>
							<View style={{width:'100%'}}>
								<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉能效简单测试数据记录表</Txt></View>
								<View style={{flex:1,alignSelf:'flex-end',paddingVertical:25}}><Text>编号：#3215151513</Text></View>
							</View>
							<View style={styles.table}>
								<Button bordered info>
									<Text>开始检测</Text>
								  </Button>
							</View>
							<View style={{width:'100%',paddingVertical:25}}>
								<Pressurechart />
								<Temperaturechart />
								<Gaschart />
							</View>
							<View style={{width:'100%',paddingVertical:25}}>
								<List>
									<ListItem itemHeader first>
										<Text>本部份需要手动抄数录入</Text>
									</ListItem>
									<ListItem icon>
										<Body>
											<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
												<Text>进口</Text>
												<Input placeholder="此处输入介质压力" keyboardType="numeric"/>
												<Text style={{color:'#999'}}>|</Text>
												<Input placeholder="此处输入介质温度" keyboardType="numeric"/>
											</View>
										</Body>
									</ListItem>
									<ListItem icon>
										<Body>
											<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
												<Text>出口</Text>
												<Input placeholder="此处输入介质压力" keyboardType="numeric"/>
												<Text style={{color:'#999'}}>|</Text>
												<Input placeholder="此处输入介质温度" keyboardType="numeric"/>
											</View>
										</Body>
									</ListItem>
									<ListItem icon>
										<Body>
											<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
												<Text>出炉冷空气温度</Text>
												<Input placeholder="此输入出炉冷空气温度" keyboardType="numeric"/>
											</View>
										</Body>
									</ListItem>
									<ListItem icon>
										<Body>
											<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
												<Text>介质流量</Text>
												<Input placeholder="此输入介质流量" keyboardType="numeric"/>
											</View>
										</Body>
									</ListItem>
								</List>
								<View style={{paddingVertical:25,flexDirection:'column',alignContent:'center',alignItems:'center'}}>
									<Button bordered info style={{alignSelf:'center'}}><Text>确认录入</Text></Button>
									<View style={{paddingVertical:12}}>
										<Text style={{fontSize:13,color:'#666'}}>录入提示：</Text>
										<Text style={{fontSize:13,color:'#666'}}>1.一旦录入不可撤销,不可修改，请仔细核对。</Text>
										<Text style={{fontSize:13,color:'#666'}}>2.保证数据完整再提交</Text>
									</View>
								</View>
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
								<CardItem header>
									{/*取样记录*/}
									<View style={{width:'100%'}}>
										<View style={{flex:1,alignItems:'center'}}><Txt h3>取样记录</Txt></View>
										<View style={{flex:1,alignSelf:'flex-end',paddingVertical:25}}><Text>编号：#3215151513</Text></View>
										<View style={{flex:1,alignSelf:'flex-start'}}><Text>受检单位：广州衡纬科技有限公司</Text></View>
									</View>
								</CardItem>
								<CardItem>
									<Body>
										<View style={{width:'100%',flex:1}}>
											<List>
												<ListItem itemDivider selected={this.state.ckbox1}>
													<CheckBox checked={this.state.ckbox1} onPress={()=>{!this.state.ckbox1?this.setState({ckbox1:true}):this.setState({ckbox1:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox1?this.setState({ckbox1:true}):this.setState({ckbox1:false})}}>
															<Text>煤</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"GB475-2008"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
												<ListItem itemDivider selected={this.state.ckbox2}>
													<CheckBox checked={this.state.ckbox2} onPress={()=>{!this.state.ckbox2?this.setState({ckbox2:true}):this.setState({ckbox2:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox2?this.setState({ckbox2:true}):this.setState({ckbox2:false})}}>
															<Text>生物质</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"GB475-2008"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
												<ListItem itemDivider selected={this.state.ckbox3}>
													<CheckBox checked={this.state.ckbox3} onPress={()=>{!this.state.ckbox3?this.setState({ckbox3:true}):this.setState({ckbox3:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox3?this.setState({ckbox3:true}):this.setState({ckbox3:false})}}>
															<Text>炉渣</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"DL/T567.3-1995"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
												<ListItem itemDivider selected={this.state.ckbox4}>
													<CheckBox checked={this.state.ckbox4} onPress={()=>{!this.state.ckbox4?this.setState({ckbox4:true}):this.setState({ckbox4:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox4?this.setState({ckbox4:true}):this.setState({ckbox4:false})}}>
															<Text>飞灰</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"DL/T567.3-1995"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
												<ListItem itemDivider selected={this.state.ckbox5}>
													<CheckBox checked={this.state.ckbox5} onPress={()=>{!this.state.ckbox5?this.setState({ckbox5:true}):this.setState({ckbox5:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox5?this.setState({ckbox5:true}):this.setState({ckbox5:false})}}>
															<Text>油</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"GB/T4756-1998"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
												<ListItem itemDivider selected={this.state.ckbox6}>
													<CheckBox checked={this.state.ckbox6} onPress={()=>{!this.state.ckbox6?this.setState({ckbox6:true}):this.setState({ckbox6:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox6?this.setState({ckbox6:true}):this.setState({ckbox6:false})}}>
															<Text>漏煤</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"GB475-2008"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
												<ListItem itemDivider selected={this.state.ckbox7}>
													<CheckBox checked={this.state.ckbox7} onPress={()=>{!this.state.ckbox7?this.setState({ckbox7:true}):this.setState({ckbox7:false})}}/>
													<Body>
														<TouchableOpacity onPress={()=>{!this.state.ckbox7?this.setState({ckbox7:true}):this.setState({ckbox7:false})}}>
															<Text>水煤浆</Text>
														</TouchableOpacity>
													</Body>
													<Right>
														<Button bordered info>
															<Text>打印标签</Text>
														</Button>
													</Right>
												</ListItem>
												<ListItem>
													<Body>
														<Grid>
															<Col>
																<Row size={1} style={{paddingVertical:15}}>
																	<Text>样品编号：</Text>
																	<Text>填入数量后生成</Text>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																	<Text>数量：</Text>
																	<Item><Input keyboardType="numeric" placeholder={"填入数字"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>取样方法：</Text>
																		<Item><Input placeholder={"填入取样方法"} value={"GB/T475-1998"} /></Item>
																	</View>
																</Row>
																<Row>
																	<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
																		<Text>样品状态：</Text>
																		<Item><Input placeholder={"填入样品状态"} value={"密封袋装"} /></Item>
																	</View>
																</Row>
															</Col>
														</Grid>
													</Body>
												</ListItem>
											</List>
											<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
												<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="备注（选填选项）" />
											</View>
											<View style={{width:'100%',paddingVertical:25}}>
												<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
													<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
														<Text style={styles.tabCon}>取样人：</Text>
														<Text>林锦权</Text>
													</View>
													<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
														<Text style={styles.tabCon}>取样日期：</Text>
														<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
													</View>
												</View>
												<View style={{flex:1,flexDirection:'row',alignItems:'center',alignContent:'space-between'}}>
													<View style={{width:'50%',flexDirection:'row',alignItems:'center',alignContent:'flex-start'}}>
														<Text style={styles.tabCon}>受检单位陪同人：</Text>
														<Button onPress={()=>this.signName()}><Text>点击签名</Text></Button>
													</View>
													<View style={{width:'50%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
														<Text style={styles.tabCon}>日期：</Text>
														<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
													</View>
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
export default Tab3;