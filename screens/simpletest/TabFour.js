import React,{Component} from 'react';
import {View,DatePickerAndroid,Image,CameraRoll,Dimensions} from 'react-native';
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
						<View style={{width:'100%',paddingVertical:25}}>
							<List>
								<ListItem itemHeader first>
									<Text>测试情况补充说明</Text>
								</ListItem>
								<ListItem icon selected={false}>
									<Left>
										<CheckBox checked={false} />
									</Left>
									<Body>
										<Text>燃料由广东省特种设备检测研究院顺德检测院化验。</Text>
									</Body>
								</ListItem>
								<ListItem icon selected={false}>
									<Left>
										<CheckBox checked={false} />
									</Left>
									<Body>
										<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',alignContent:'center',alignItems:'center'}}>
											<Text>燃料化验报告由</Text>
											<Input placeholder="供应商"/>
											<Text>提供。</Text>
										</View>
									</Body>
								</ListItem>
								<ListItem icon selected={false}>
									<Left>
										<CheckBox checked={false} />
									</Left>
									<Body>
										<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',alignContent:'center',alignItems:'center'}}>
											<Text>该锅炉设计燃料为</Text>
											<Input placeholder="燃料名称"/>
											<Text>,测试期间使用燃料为</Text>
											<Input placeholder="燃料名称"/>
										</View>
									</Body>
								</ListItem>
								<ListItem icon selected={false}>
									<Left>
										<CheckBox checked={false} />
									</Left>
									<Body>
										<Text>与设计燃料一致。</Text>
									</Body>
								</ListItem>
								<ListItem icon selected={false}>
									<Left>
										<CheckBox checked={false} />
									</Left>
									<Body>
										<Text>与设计燃料不一致。</Text>
									</Body>
								</ListItem>
								<ListItem icon selected={false}>
									<Left>
										<CheckBox checked={false} />
									</Left>
									<Body>
										<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',alignContent:'center',alignItems:'center'}}>
											<Text>其他：</Text>
											<Input placeholder="其他情况说明"/>
										</View>
									</Body>
								</ListItem>
								<ListItem itemHeader>
									<Text>测试结果</Text>
								</ListItem>
								<ListItem>
									<View style={{width:'100%',flexDirection:'row',alignContent:'center',alignItems:'center'}}>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center'}}><Input placeholder="锅炉出力"/><Text>kg/h</Text></View>
										<Text style={{color:'#999'}}>|</Text>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center'}}><Input placeholder="锅炉热效率"/><Text>%</Text></View>
									</View>
								</ListItem>
								<ListItem>
									<View style={{width:'100%',flexDirection:'row',alignContent:'center',alignItems:'center'}}>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center'}}><Input placeholder="排烟温度"/><Text>℃</Text></View>
										<Text style={{color:'#999'}}>|</Text>
										<View style={{width:'50%',flexDirection:'row',alignItems:'center'}}><Input placeholder="排烟处过量空气系数"/><Text>%</Text></View>
									</View>
								</ListItem>
							</List>
						</View>
						<View style={{width:'100%',paddingVertical:25}}>
							<ListItem itemHeader>
								<Text>结论分析</Text>
							</ListItem>
							<ListItem selected={false}>
								<CheckBox checked={false} />
								<Body>
									<Text>锅炉热效率符合《锅炉节能技术监督管理规程》规定的工业锅炉产品热效率指标限定值的要求；</Text>
								</Body>
							</ListItem>
							<ListItem selected={false}>
								<CheckBox checked={false} />
								<Body>
									<Text>锅炉热效率不符合《锅炉节能技术监督管理规程》规定的工业锅炉产品热效率指标限定值的要求；</Text>
								</Body>
							</ListItem>
							<ListItem selected={false}>
								<CheckBox checked={false} />
								<Body>
									<Text>排烟温度和排烟处过量空气系数偏高，建议使用单位采取措施降低排烟温度和排烟处过量空气系数，如：增加烟气余热回收装置，调整配风系统等。</Text>
								</Body>
							</ListItem>
							<ListItem selected={false}>
								<CheckBox checked={false} />
								<Body>
									<Text>排烟温度偏高，建议使用单位采取措施降低排烟温度，如：增加烟气余热回收装置等。</Text>
								</Body>
							</ListItem>
							<ListItem selected={false}>
								<CheckBox checked={false} />
								<Body>
									<Text>排烟处过量空气系数偏高，建议使用单位采取措施降低排烟处过量空气系数，如：调整配风系统等。</Text>
								</Body>
							</ListItem>
							<ListItem icon selected={false}>
								<CheckBox checked={false} />
								<Body>
									<View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',alignContent:'center',alignItems:'center',paddingLeft:18}}>
										<Text>其他：</Text>
										<Input placeholder="其他情况说明"/>
									</View>
								</Body>
							</ListItem>
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
		)
	}
}
export default Tab4;