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
import Tab1 from './TabOne';
import Tab2 from './TabTwo';
import Tab3 from './TabThree';
import Tab4 from './TabFour';
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
export default class caseDetailScreen extends React.Component{
	constructor(props){
		super(props);
		const {navigate} = this.props.navigation;	
		this.nav = navigate;
		this.state={
			data:'<input type="text" value=""/>'
		}
	}
	componentDidMount(){
		this.props.navigation.setParams({dat:this.state.data});
		const thistestorderid = this.props.navigation.getParam("ttwoid");
		//console.warn(thistestorderid);
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
						<Tab1 />
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
					  <Tab heading="测试结果">
						<Text>敬请期待。。。</Text>
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