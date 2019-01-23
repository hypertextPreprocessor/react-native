import React,{Component} from 'react';
import {View,Dimensions} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Tabs,Tab,ScrollableTab,Card, CardItem,Grid,Col,Row,Item,Input,Form,Picker } from 'native-base';
import { styles } from './styles.js';
export default class Tab1 extends Component{
	constructor(props){
		super(props);
		this.state = {
		  selected: "key1"
		};
	}

onValueChange(value: string) {
    this.setState({
      selected: value
    });
}
componentDidMount(){
	var {width,height} = Dimensions.get('window');
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
							<Row><Text style={styles.tabTitle}>测试编号：</Text><Text style={styles.tabCon}>15613886316413</Text></Row>
							<Row><Text style={styles.tabTitle}>锅炉使用单位：</Text><Text style={styles.tabCon}>广州衡纬科技有限公司</Text></Row>
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
									<Picker.Item label="热效率功能测试" value="key0" />
									<Picker.Item label="简单测试" value="key1" />
									<Picker.Item label="复杂测试" value="key2" />
									<Picker.Item label="效率测试" value="key3" />
									<Picker.Item label="随意测试s" value="key4" />
															
								</Picker>
							</Row>
							<Row>
								<Text style={styles.tabTitle}>锅炉型号：</Text>
								<Item inlineLabel style={{width:'50%'}}>
									<Input placeholder='输入锅炉型号' />
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
							<Row><Text style={styles.tabTitle}>客户联系人：</Text><Text style={styles.tabCon}>郭小姐</Text></Row>
							<Row><Text style={styles.tabTitle}>检查负责人：</Text><Text style={styles.tabCon}>陈工</Text></Row>
						</Col>
						<Col>
							<Row>
								<Text style={styles.tabTitle}>检测小组员工：</Text>
								<Text style={styles.tabCon}>陈工</Text>
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
							<Row><Text style={styles.tabTitle}>申请时间：</Text><Text style={styles.tabCon}>2019-03-01</Text></Row>
							<Row><Text style={styles.tabTitle}>检测地址：：</Text><Text style={styles.tabCon}>广州市越秀区寺右新马路</Text></Row>
						</Col>
						<Col>
							<Row><Text style={styles.tabTitle}>预约上门电话：</Text><Text style={styles.tabCon}>020-8868866</Text></Row>
							<Row><Text style={styles.tabTitle}>客户联系电话：</Text><Text style={styles.tabCon}>15920419705</Text></Row>
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