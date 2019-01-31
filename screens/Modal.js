import React,{Component} from 'react';
import { Button as Buttn, Image, View, Text as Txt,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body,Button, Col, Row, Grid } from 'native-base';
class Modal extends Component{
	constructor(props){
		super(props);
	}
	static navigationOptions={
		
	}
	render(){
		return (
			<Grid>
				<Row size={1}>
					<View style={{width:'100%'}}>
						<Card>
							<CardItem header bordered>
								<Text>试验要求：</Text>
							</CardItem>
						</Card>
					</View>
				</Row>
				<Row size={8}>
					<View style={{width:'100%',height:'100%'}}>
						<ScrollView>
						<CardItem bordered>
							<Body>
								<View>
									<Text>本实验按TSG G0003-2010《工业锅炉能效测试与评价规则》要求进行。</Text>
									<Text>1.实验时间为1小时</Text>
									<Text>2.试验前应全面检查锅炉及辅机设备的运行状况是否正常，如有不正常现象应排除。</Text>
									<Text>3.正式试验须在热工况稳定（自冷态点火开始时间4小时后）和燃烧调整到试验工况1小时后开始进行。</Text>
									<Text>4.试验期间锅炉工况应保持稳定。</Text>
									<Text>5.其它要求详见《工业锅炉能效测试作业指导书》。</Text>
								</View>
							</Body>
						</CardItem>
						</ScrollView>
					</View>
				</Row>
				<Row size={1}>
					<Card>
					<CardItem footer bordered>
						<View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
							<Button small bordered onPress={()=>{this.props.navigation.goBack()}}>
								<Text>返回</Text>
							</Button>
							<Text>广东省顺德区特种设备检测院</Text>
						</View>
					</CardItem>
					</Card>
				</Row>
			</Grid>
		)
	}
}
export default Modal;