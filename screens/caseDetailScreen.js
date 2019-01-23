import React from 'react';
import {
	Platform,
	View,Text,WebView,Alert,
} from 'react-native';
import { NativeRouter,Route,Link } from 'react-router-native';
import {
	Text as Txt,
	Button as Btn
} from 'react-native-elements';

const MyTitle = ()=> {
	return (
		<NativeRouter>
			<View>
				<Link to="/"><Txt h3>1.基本信息</Txt></Link>
			</View>
		</NativeRouter>
	)
};
class T1 extends React.Component{
	render(){
		return (
			<Txt h1>Tang Lin</Txt>
		)
	}
}
export default class caseDetailScreen extends React.Component{
	
	
	constructor(props){
		super(props);
		this.state={
			data:'<input type="text" value=""/>'
		}
	}
	componentDidMount(){
		this.props.navigation.setParams({dat:this.state.data});
	}
	static navigationOptions = ({navigation})=>{
		return {
			
			headerTitle:<MyTitle/>,
			headerRight:(
				<Btn title="下一步" onPress={()=>{navigation.navigate("preparar")}} />
			)
	
		}
	}
	render (){
		return (
			 <WebView source={{uri:'file:///android_asset/html/导热油/锅炉能效测试大纲.html'}} />
			 //<WebView source={{uri: 'https://github.com/facebook/react-native'}} />
			 //<WebView onNavigationStateChange={Alert.alert(this.state.data)} originWhitelist={['*']} source={{ html: this.state.data }} />
		)
	}
}