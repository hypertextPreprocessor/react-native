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
		  fellows:"加载中...",
		  charger:"加载中...",
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
	var brr = [];
	SQLite.openDatabase({name:'sdy.db'}).then((DB)=>{	
	sdyDb = DB;	
	sdyDb.transaction((tx)=>{
		tx.executeSql(`SELECT * FROM ordersDetail WHERE test_task_work_order_id = '${this.props.ready}'`).then(([txt,result])=>{
			for(var i=0;i<result.rows.length;i++){
				arr.push(result.rows.item(i));
			}
			var obj = {
				testNum:"GDSEI/RXN-17-2.00",//arr[0].test_task_work_order_num,
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
			return obj;
		}).then((obj)=>{
			sdyDb.transaction((tx)=>{
				tx.executeSql(`SELECT * FROM orderList INNER JOIN comInfo ON orderList.use_company_id = comInfo.use_company_id WHERE test_task_work_order_id = '${this.props.ready}'`).then(([txt,result])=>{
					for(var i=0;i<result.rows.length;i++){
						brr.push(result.rows.item(i));
					}
					var o = obj;
					o.customer = brr[0].use_company_contact;
					o.testCharger = "加载中...";//brr[0].order_leader;
					o.fellows = "加载中...";//brr[0].team_users;
					o.applyDate = brr[0].apply_date;
					o.appointmentPhone = brr[0].plan_test_date;
					o.testAddr = brr[0].company_address;
					o.customerPhone = brr[0].use_company_mobile_phone;
					//console.warn(o);
					this.setState({
						tabData:o
					})
					this.getUsrById(brr[0].order_leader);
					this.getUsrById(brr[0].team_users.split(","));
				})
			})
		})
	})	
	});
}
//根据用户id查询姓名;
getUsrById(ids){
	var usrs = [];
	sdyDb.transaction((tx)=>{
		tx.executeSql(`SELECT * FROM users`).then(([txt,result])=>{
			for(var i=0;i<result.rows.length;i++){
				usrs.push(result.rows.item(i));
			}
			return usrs;
		}).then((u)=>{
			if(typeof ids == "string"){
				u.forEach((v,i,a)=>{
					if(v.user_id == ids){
						this.setState({
							charger:v.name
						})
						return v.name;
					}
				})
			}else if(/Array/g.test(Object.prototype.toString.call(ids))){
				var usrArr = [];
				ids.forEach((v,i,a)=>{
					u.forEach((vv,ii,aa)=>{
						if(v == vv.user_id){
							//console.warn(vv.name);
							usrArr.push(vv.name);
							this.setState({
								fellows:usrArr
							})
							return usrArr;
						}
					})
				})
			}else{
				//参数格式错误！！
			}
		})
	});
}
closeDatabase(){
	if(sdyDb){
		console.log("closeing database...");
		sdyDb.close().then((status)=>{
			console.log("数据库关闭");
		}).catch((error)=>{console.log("无法关闭原因"+error)});
	}
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
componentWillUnmount(){
	this.closeDatabase();
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
							<Row>
								<Text style={styles.tabTitle}>锅炉型号：</Text>
								<Item inlineLabel style={{width:'50%'}}>
									<Input placeholder='请输入锅炉型号' value={this.state.tabData.boilerType}/>
								</Item>
							</Row>
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
							<Row><Text style={styles.tabTitle}>锅炉使用单位：</Text><Text style={styles.tabCon}>{this.state.tabData.orgUtilize}</Text></Row>
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
							<Row><Text style={styles.tabTitle}>客户联系电话：</Text><Text style={styles.tabCon}>{this.state.tabData.customerPhone}</Text></Row>
						</Col>
						<Col>
							<Row><Text style={styles.tabTitle}>检测负责人：</Text><Text style={styles.tabCon}>{this.state.charger}</Text></Row>
							<Row>
								<Text style={styles.tabTitle}>检测小组员工：</Text>
								<Text style={styles.tabCon}>{this.state.fellows.toString()}</Text>
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
							<Row><Text style={styles.tabTitle}>申请日期：</Text><Text style={styles.tabCon}>{this.state.tabData.applyDate}</Text></Row>
							<Row><Text style={styles.tabTitle}>预约上门日期：</Text><Text style={styles.tabCon}>{this.state.tabData.appointmentPhone}</Text></Row>
							<Row><Text style={styles.tabTitle}>检测地址：</Text><Text style={styles.tabCon}>{this.state.tabData.testAddr}</Text></Row>
						</Col>
					</Grid>
				</View>
				<View style={styles.verlist}>
					<Grid>
						<Col>
							
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