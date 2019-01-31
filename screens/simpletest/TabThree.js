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
import Orientation from 'react-native-orientation';

class Tab3 extends Component{
	constructor(props){
		super(props);
		this._layout = this._layout.bind(this);
		this.state={
			sideNav:false,
			date0:'选择日期',
			date1:'选择日期',
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
								<View style={{flex:1,alignSelf:'flex-end'}}><Text>编号：#3215151513</Text></View>
							</View>
						<View style={styles.table}>
							<Button bordered info>
								<Text>开始检测</Text>
							  </Button>
						</View>
						<View style={{display:'flex',width:'100%',flexDirection:'column',flexWrap:'wrap',alignItems:'center'}}>
							<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center',justifyContent:'center',borderBottomWidth:2,borderColor:"#dedede",paddingVertical:15}}>
								<View style={{width:'33.3%'}}>
									<Text>时间->h:m:s</Text>
									<Text>进压->进口介质压力(Mpa)</Text>
									<Text>进温->进口介质温度(℃)</Text>
								</View>
								<View style={{width:'33.3%'}}>
									<Text>出压->出口介质压力(Mpa)</Text>
									<Text>出温->出口介质温度(℃)</Text>
									<Text>出温->出口介质温度(℃)</Text>
								</View>
								<View style={{width:'33.3%'}}>
									<Text>冷温->入炉冷空气温度(℃)</Text>
									<Text>介量->介质流量(m3)</Text>
									<Text>排温>排烟温度(℃)</Text>
								</View>
							</View>
							<View style={{paddingVertical:15,width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
								<Text style={{flex:1}}>时间</Text><Text style={{flex:1}}>进压</Text>
								<Text style={{flex:1}}>进温</Text><Text style={{flex:1}}>出压</Text>
								<Text style={{flex:1}}>出温</Text><Text style={{flex:1}}>冷温</Text>
								<Text style={{flex:1}}>介量</Text><Text style={{flex:1}}>O2´(%)</Text>
								<Text style={{flex:1}}>CO2´</Text><Text style={{flex:1}}>SO2´</Text>
								<Text style={{flex:1}}>CO´(%)</Text><Text style={{flex:1}}>排温</Text>
							</View>
							<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
								<Text style={{flex:1}}>12:23</Text><Text style={{flex:1}}>345.34</Text>
								<Text style={{flex:1}}>3546</Text><Text style={{flex:1}}>46</Text>
								<Text style={{flex:1}}>28</Text><Text style={{flex:1}}>45</Text>
								<Text style={{flex:1}}>45</Text><Text style={{flex:1}}>67</Text>
								<Text style={{flex:1}}>56</Text><Text style={{flex:1}}>47</Text>
								<Text style={{flex:1}}>37</Text><Text style={{flex:1}}>32</Text>
							</View>
							<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
								<Text style={{flex:1}}>12/23</Text><Text style={{flex:1}}>345.34</Text>
								<Text style={{flex:1}}>7621</Text><Text style={{flex:1}}>46</Text>
								<Text style={{flex:1}}>20</Text><Text style={{flex:1}}>45</Text>
								<Text style={{flex:1}}>45</Text><Text style={{flex:1}}>23</Text>
								<Text style={{flex:1}}>56</Text><Text style={{flex:1}}>56</Text>
								<Text style={{flex:1}}>37</Text><Text style={{flex:1}}>55</Text>
							</View>
							<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
								<Text style={{flex:1}}>12/23</Text><Text style={{flex:1}}>345.34</Text>
								<Text style={{flex:1}}>5645</Text><Text style={{flex:1}}>46</Text>
								<Text style={{flex:1}}>23</Text><Text style={{flex:1}}>45</Text>
								<Text style={{flex:1}}>42</Text><Text style={{flex:1}}>68</Text>
								<Text style={{flex:1}}>43</Text><Text style={{flex:1}}>38</Text>
								<Text style={{flex:1}}>37</Text><Text style={{flex:1}}>55</Text>
							</View>
							<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
								<Text style={{flex:1}}>12/23</Text><Text style={{flex:1}}>345.34</Text>
								<Text style={{flex:1}}>4521</Text><Text style={{flex:1}}>46</Text>
								<Text style={{flex:1}}>23</Text><Text style={{flex:1}}>45</Text>
								<Text style={{flex:1}}>52</Text><Text style={{flex:1}}>52</Text>
								<Text style={{flex:1}}>56</Text><Text style={{flex:1}}>38</Text>
								<Text style={{flex:1}}>58</Text><Text style={{flex:1}}>55</Text>
							</View>
							<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignContent:'center',alignItems:'center'}}>
								<Text style={{flex:1}}>平均值</Text><Text style={{flex:1}}>787.3</Text>
								<Text style={{flex:1}}>4521</Text><Text style={{flex:1}}>45</Text>
								<Text style={{flex:1}}>20</Text><Text style={{flex:1}}>28</Text>
								<Text style={{flex:1}}>45</Text><Text style={{flex:1}}>96</Text>
								<Text style={{flex:1}}>58</Text><Text style={{flex:1}}>35</Text>
								<Text style={{flex:1}}>37</Text><Text style={{flex:1}}>46</Text>
							</View>
							<View style={{flex:1}}>
								<View style={{display:'flex',flex:1,flexDirection:'row',flexWrap:'wrap',alignContent:'flex-start',alignItems:'center'}}>
									<Text>备注：根据TSG G0003-2010无法计量锅炉出力时，实际出力按额定出力的65%计算，折算出力为</Text>
									<Item style={{width:120}}><Input placeholder="计算结果"/></Item>
									<Text>MW。</Text>
								</View>
							</View>
							<View style={styles.table}>
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
						</View>
						</Body>
						</CardItem>
						</Card>
							<Card>
								<CardItem header>
									{/*取样记录*/}
									<View style={{width:'100%'}}>
										<View style={{flex:1,alignItems:'center'}}><Txt h3>取样记录</Txt></View>
										<View style={{flex:1,alignSelf:'flex-end'}}><Text>编号：#3215151513</Text></View>
										<View style={{flex:1,alignSelf:'flex-start'}}><Text>受检单位：广州衡纬科技有限公司</Text></View>
									</View>
								</CardItem>
								<CardItem>
									<Body>
										<View style={{width:'100%'}}>
											<View style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center'}}>
												<Text style={{width:'20%',alignSelf:'center'}}>样品名称</Text>
												<Text style={{width:'20%',alignSelf:'center'}}>取样方法</Text>
												<Text style={{width:'20%',alignSelf:'center'}}>样品状态</Text>
												<Text style={{width:'10%',alignSelf:'center'}}>数量</Text>
												<Text style={{width:'30%',alignSelf:'center'}}>样品编号</Text>
											</View>
											<ListItem style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center'}}>
												<View style={{width:'20%',alignSelf:'center'}}>
													<Picker
													  note
													  mode="dropdown"
													  style={{ width:'100%' }}
													  selectedValue={this.state.selected}
													  onValueChange={this.onValueChange.bind(this)}
													>
													  <Picker.Item label="煤" value="key0" />
													  <Picker.Item label="生物质" value="key1" />
													  <Picker.Item label="炉渣" value="key2" />
													  <Picker.Item label="飞灰" value="key3" />
													  <Picker.Item label="油" value="key4" />
													   <Picker.Item label="漏煤" value="key5" />
													    <Picker.Item label="水煤浆" value="key6" />
													</Picker>
												</View>
												<View style={{width:'20%',alignSelf:'center'}}>
													<View style={{width:'100%'}}>
													<ListItem selected={true} style={{flex:1,flexDirection:'row'}}>
														<Radio selected={true} /><Right style={{flex:1,marginLeft:12}}><Text>GB475-2008</Text></Right>
													</ListItem>	
													</View>
													<View style={{width:'100%'}}>
														<ListItem selected={true} style={{flex:1,flexDirection:'row'}}>
															<Radio selected={false} /><Right style={{flex:1,marginLeft:12}}><Item><Input placeholder="其他"/></Item></Right>
														</ListItem>
													</View>
												</View>
												<View style={{width:'20%',alignSelf:'center'}}>
													<View style={{width:'100%'}}>
													<ListItem selected={true} style={{flex:1,flexDirection:'row'}}>
														<Radio selected={true} /><Right style={{flex:1,marginLeft:12}}><Text>密封袋装</Text></Right>
													</ListItem>	
													</View>
													<View style={{width:'100%'}}>
													<ListItem selected={true} style={{flex:1,flexDirection:'row'}}>
														<Radio selected={false} /><Right style={{flex:1,marginLeft:12}}><Item><Input placeholder="其他"/></Item></Right>
													</ListItem>
													</View>
												</View>
												<View style={{width:'10%',alignSelf:'center'}}>
													<View style={{width:'100%'}}><Item><Input placeholder="1" value="1" /></Item></View>
												</View>
												<View style={{display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center',width:'30%',alignSelf:'center'}}>
													<View style={{width:'100%'}}><Text>DF-2313</Text></View>
													<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
														<Button style={{marginHorizontal:10}} small primary><Text>是燃料</Text></Button>
														<Button style={{marginHorizontal:10}} small primary><Text>打印</Text></Button>
													</View>
												</View>
											</ListItem>
											<ListItem>
												<View style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
													<Textarea rowSpan={5} style={{width:'100%'}} bordered placeholder="备注" />
												</View>
											</ListItem>
										</View>
										<View style={styles.table}>
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
					</Col>
				</Grid>
			</View>
		)
	}
}
export default Tab3;