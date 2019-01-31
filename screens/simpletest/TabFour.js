import React,{Component} from 'react';
import {View,DatePickerAndroid,Image,CameraRoll,Dimensions} from 'react-native';
import {ListItem as Li,List,Text as Txt,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { 
Container, Header, Title, Content, Footer, FooterTab, 
Button, Left, Right, Body, Icon, Text,Tabs,Tab,
ScrollableTab,Card, CardItem,Grid,Col,Row,
Item,Input,Form,Picker,
Radio,ListItem,CheckBox,Textarea,Accordion
} from 'native-base';
import { styles } from '../styles.js';
import { StackNavigator, TabNavigator } from "react-navigation";
import Orientation from 'react-native-orientation'
class Tab4 extends Component{
	constructor(props){
		super(props);
		this.state={
			sideNav:false,
			date0:'选择日期',
			date1:'选择日期',
		}
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
			<Card>
				<CardItem header>
					<View style={{width:'100%'}}>
						<View style={{flex:1,alignItems:'center'}}><Txt h3>锅炉能效简单测试数据记录表</Txt></View>
						<View style={{flex:1,alignSelf:'flex-end'}}><Text style={styles.tabCon}>编号：#3215151513</Text></View>
					</View>
				</CardItem>
				<CardItem>
					<Body style={styles.CardBody}>
						<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
							<View style={{flex:1,flexDirection:'row',justifyContent:'center'}}><Text style={styles.tabCon}>锅炉型号：</Text><Text style={styles.tabCon}>KD-123</Text></View>
							<View style={{flex:1,flexDirection:'row',justifyContent:'center'}}><Text style={styles.tabCon}>产品编号：</Text><Text style={styles.tabCon}>DZ236658</Text></View>
						</View>
						<Grid>
							<Col size={1} style={{border:2,borderColor:'#f00'}}><View style={{flex:1,flexDirection:'row',alignSelf:'center',justifyContent:'center'}}><Text style={styles.tabCon}>测试情况补充说明</Text></View></Col>
							<Col size={4}>
								<View style={{width:'100%',paddingVertical:20}}>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>燃料由广东省特种设备检测研究院顺德检测院化验。</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,flexDirection:'row',flexWrap:'nowrap',alignItems:'center',alignContent:'center'}}>
											<Text>燃料化验报告由</Text>
											<Item style={{width:'40%'}}><Input placeholder="供应商"/></Item>
											<Text>提供。</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,flexDirection:'row',flexWrap:'nowrap',alignItems:'center',alignContent:'center'}}>
											<Text>该锅炉设计燃料为</Text>
											<Item style={{width:'40%'}}><Input placeholder="填入数值"/></Item>
											<Text>,测试期间使用燃料为</Text>
											<Item  style={{width:'40%'}}><Input placeholder="填入数值"/></Item>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,flexDirection:'row',flexWrap:'nowrap',alignItems:'center',alignContent:'center'}}><Text>与设计燃料一致</Text>
									</Right>
									</ListItem>
									<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
										<Radio selected={false} />
											<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}><Text>与设计燃料不一致。</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flex:1,flexDirection:'row'}}>
										<Radio selected={false} />
											<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}><Text>与设计燃料不一致。</Text>
										</Right>
									</ListItem>
									<ListItem>
										<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
											<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="备注" />
										</View>
									</ListItem>
								</View>
							</Col>
						</Grid>
						<Grid>
							<Col size={1}>
								<View style={{flex:1,flexDirection:'row',alignSelf:'center',justifyContent:'center'}}>
									<Text style={styles.tabCon}>测试结果</Text>
								</View>
							</Col>
							
							<Col size={4} style={{paddingVertical:20}}>
								<View style={{width:'100%',flexDirection:'row',alignItems:'center',alignContent:'center'}}>
									<Item style={{flex:1,flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
										<Text style={{flex:1,alignSelf:'center',justifyContent:'center',paddingVertical:15}}>锅炉出力</Text>
										<Input />
										<Text style={{flex:1,alignSelf:'center',justifyContent:'center',paddingVertical:15}}>锅炉热效率</Text>
										<Input />
									</Item>
								</View>
								<View style={{width:'100%',flexDirection:'row',alignItems:'center',alignContent:'center'}}>
									<Item style={{flex:1,flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
										<Text style={{flex:1,alignSelf:'center',paddingVertical:15}}>排烟温度</Text>
										<Input />
										<Text style={{flex:1,alignSelf:'center',paddingVertical:15}}>排烟处过量空气系数</Text>
										<Input />
									</Item>
								</View>
							</Col>
						</Grid>
						<Grid>
							<Col size={1}>
								<View style={{flex:1,flexDirection:'row',alignSelf:'center',justifyContent:'center'}}>
									<Text style={styles.tabCon}>结论分析</Text>
								</View>
							</Col>
							<Col size={4}>
								<View style={{width:'100%',paddingVertical:20}}>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>锅炉热效率符合《锅炉节能技术监督管理规程》规定的工业锅炉产品热效率指标限定值的要求；</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>锅炉热效率不符合《锅炉节能技术监督管理规程》规定的工业锅炉产品热效率指标限定值的要求；</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>排烟温度和排烟处过量空气系数偏高，建议使用单位采取措施降低排烟温度和排烟处过量空气系数，如：增加烟气余热回收装置，调整配风系统等。</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>排烟温度偏高，建议使用单位采取措施降低排烟温度，如：增加烟气余热回收装置等。</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>排烟处过量空气系数偏高，建议使用单位采取措施降低排烟处过量空气系数，如：调整配风系统等。</Text>
										</Right>
									</ListItem>
									<ListItem selected={false} style={{flexDirection:'row',alignItems:'flex-start',alignContent:'flex-start'}}>
										<Radio selected={false} />
										<Right style={{flex:1,marginLeft:12,alignItems:'flex-start',alignContent:'flex-start'}}>
											<Text>其他：</Text>
										</Right>
									</ListItem>
									<ListItem>
										<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
											<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="其他描述内容" />
										</View>
									</ListItem>
								</View>
							</Col>
						</Grid>
						<View style={{...styles.table,paddingVertical:40}}>
												<View style={{flex:0.3}}><Text>记录</Text></View>
												<View style={{flex:0.7}}><Item><Input placeholder="记录人"/></Item></View>
												<View style={{flex:0.3}}><Text>记录日期</Text></View>
												<View style={{flex:0.7}}>
													<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(0)}}><Text>{this.state.date0}</Text></Button>
												</View>
												<View style={{flex:0.3}}><Text>校对</Text></View>
												<View style={{flex:0.7}}><Item><Input placeholder="校对人"/></Item></View>
												<View style={{flex:0.3}}><Text>校对日期</Text></View>
												<View style={{flex:0.7}}>
													<Button style={{marginHorizontal:12}} light onPress={()=>{this.DatePicker(1)}}><Text>{this.state.date1}</Text></Button>
												</View>
						</View>
					</Body>
				</CardItem>
			</Card>
		)
	}
}
export default Tab4;