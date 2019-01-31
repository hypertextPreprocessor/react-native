import React,{Component} from 'react';
import {View,Dimensions,Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { config } from '../../config.js';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Tabs,Tab,ScrollableTab,Card, CardItem,Grid,Col,Row,Item,Input,Form,Picker } from 'native-base';
import { styles } from '../styles.js';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let sdyDb;
class Tab1 extends Component{
	constructor(props){
		super(props);
		this.state = {
		  selected: "01",
		  tabData:{
			  testNum:'加载中...',
			  testType:'01',
			  orgUtilize:'加载中...',
			  boilerType:'输入锅炉型号',
			  customer:'加载中...',
			  testCharger:'加载中...',
			  fellows:['加载中...'],
			  applyDate:'加载中...',
			  appointmentPhone:'加载中...',
			  testAddr:'加载中...',
			  customerPhone:'加载中...'
		  }
		};
	}

onValueChange(value: string) {
	if(value!=="01"){
		Alert.alert('此功能尚未开放');
	}
    this.setState({
      selected: '01'
    });
}
loadData(){
	var arr = [];
	SQLite.openDatabase({name:'sdy.db'}).then((DB)=>{	
	sdyDb = DB;	
	sdyDb.transaction((tx)=>{
		tx.executeSql(`SELECT * FROM ordersDetail WHERE test_task_work_order_id = '${this.props.ready}'`).then(([txt,result])=>{
			for(var i=0;i<result.rows.length;i++){
				arr.push(result.rows.item(i));
			}
			var obj = {
				testNum:arr[0].test_task_work_order_num,
				testType:'01',
				orgUtilize:arr[0].use_company_name,
				boilerType:arr[0].device_model,
				customer:'加载中...',
				testCharger:'加载中...',
				fellows:['加载中...'],
				applyDate:'加载中...',
				appointmentPhone:'加载中...',
				testAddr:'加载中...',
				customerPhone:'加载中...'
			}
			this.setState({
				tabData:obj
			})
		})
	})	
	});
}
componentDidUpdate(prevProps, prevState, snapshot){
	if(this.props.ready !== prevProps.ready){
		this.loadData();
	}
}
componentDidMount(){
	var {width,height} = Dimensions.get('window');
	/*
	//获取测试大纲基本信息;
	SQLite.openDatabase({name:"sdy.db"}).then((DB)=>{
		sdyDb = DB;
		sdyDb.transaction((tx)=>{
		tx.executeSql(`SELECT * FROM ordersDetail`).then(([txt,result])=>{
				console.warn(result.rows.length);
			})
		})
	})
	*/
}
	render(){
		return (
		<View>
		<Card>
            <CardItem>
              <Body>
				<View style={styles.verlist}>
					<Grid>
						<Col>
							<Row><Text style={styles.tabTitle}>质量体系文件编号：</Text><Text style={styles.tabCon}>{this.state.tabData.testNum}</Text></Row>
							<Row><Text style={styles.tabTitle}>锅炉使用单位：</Text><Text style={styles.tabCon}>{this.state.tabData.orgUtilize}</Text></Row>
						</Col>
						<Col>
							<Row>
								<Text style={styles.tabTitle}>测试类型：</Text>
								<Picker
									mode="dropdown"
									iosHeader="Select your SIM"
									iosIcon={<Icon name="arrow-down" />}
									style={{width:10}}
									selectedValue={this.state.selected}
									onValueChange={this.onValueChange.bind(this)}
								>
									<Picker.Item label="锅炉热效率简单测试" value="01" />
									<Picker.Item label="运行工况热效率详细测试" value="02" />
									<Picker.Item label="定型产品热效率测试" value="03" />				
								</Picker>
							</Row>
							<Row>
								<Text style={styles.tabTitle}>锅炉型号：</Text>
								<Item inlineLabel style={{width:'50%'}}>
									<Input placeholder='请输入锅炉型号' value={this.state.tabData.boilerType}/>
								</Item>
							</Row>
						</Col>
					</Grid>
				</View>
              </Body>
            </CardItem>
         </Card>
		 <Card>
            <CardItem>
              <Body>
				<View style={styles.verlist}>
					<Grid>
						<Col>
							<Row><Text style={styles.tabTitle}>客户联系人：</Text><Text style={styles.tabCon}>{this.state.tabData.customer}</Text></Row>
							<Row><Text style={styles.tabTitle}>检测负责人：</Text><Text style={styles.tabCon}>{this.state.tabData.testCharger}</Text></Row>
						</Col>
						<Col>
							<Row>
								<Text style={styles.tabTitle}>检测小组员工：</Text>
								<Text style={styles.tabCon}>{this.state.tabData.fellows}</Text>
							</Row>
							<Row></Row>
						</Col>
					</Grid>
				</View>
              </Body>
            </CardItem>
         </Card>
		 <Card>
            <CardItem>
              <Body>
				<View style={styles.verlist}>
					<Grid>
						<Col>
							<Row><Text style={styles.tabTitle}>申请时间：</Text><Text style={styles.tabCon}>{this.state.tabData.applyDate}</Text></Row>
							<Row><Text style={styles.tabTitle}>检测地址：</Text><Text style={styles.tabCon}>{this.state.tabData.testAddr}</Text></Row>
						</Col>
						<Col>
							<Row><Text style={styles.tabTitle}>预约上门电话：</Text><Text style={styles.tabCon}>{this.state.tabData.appointmentPhone}</Text></Row>
							<Row><Text style={styles.tabTitle}>客户联系电话：</Text><Text style={styles.tabCon}>{this.state.tabData.customerPhone}</Text></Row>
						</Col>
					</Grid>
				</View>
              </Body>
            </CardItem>
         </Card>
		 </View>
		)
	}
}
export default Tab1;