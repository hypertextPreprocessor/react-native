import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,Button,Image,
	Animated,PanResponder,
	TouchableNativeFeedback,
	SafeAreaView,
	ScrollView,
	WebView,
	Alert,
	FlatList,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	Transforms
} from 'react-native';
import { connect } from "react-redux";
import {ListItem,List,Text,Avatar,Button as Btn,SearchBar} from 'react-native-elements';
import { NativeRouter,Route,Link,Switch,Redirect,withRouter} from "react-router-native";
import {styles} from './styles.js';
class Menulist extends React.Component{
	constructor(props){
		super(props);
		this.cklist = this.cklist.bind(this);
		this.state = {
			clickRecord:[false,false,false,false]
		}
	}
	cklist(k,t){
		switch(t){
			case 0:
				if(!this.state.clickRecord[t]){
					this.props.mapDispatchToProps(k,t);
					this.context.router.history.push('/'+k+'');
					this.setState((state,props)=>({
						clickRecord:[true,false,false,false]
					}))
				}else{
					this.props.backtodefalut();
					this.context.router.history.push('/');
					this.setState((state,props)=>({
						clickRecord:[false,false,false,false]
					}))
				}
				return false;
			case 1:
				if(!this.state.clickRecord[t]){
					this.props.mapDispatchToProps(k,t);
					this.context.router.history.push('/'+k+'');
					this.setState((state,props)=>({
						clickRecord:[false,true,false,false]
					}))
				}else{
					this.props.backtodefalut();
					this.context.router.history.push('/');
					this.setState((state,props)=>({
						clickRecord:[false,false,false,false]
					}))
				}
				return false;
			case 2:
				if(!this.state.clickRecord[t]){
					this.props.mapDispatchToProps(k,t);
					this.context.router.history.push('/'+k+'');
					this.setState((state,props)=>({
						clickRecord:[false,false,true,false]
					}))
				}else{
					this.props.backtodefalut();
					this.context.router.history.push('/');
					this.setState((state,props)=>({
						clickRecord:[false,false,false,false]
					}))
				}
				return false;
			case 3:
				if(!this.state.clickRecord[t]){
					this.props.mapDispatchToProps(k,t);
					this.context.router.history.push('/'+k+'');
					this.setState((state,props)=>({
						clickRecord:[false,false,false,true]
					}))
				}else{
					this.props.backtodefalut();
					this.context.router.history.push('/');
					this.setState((state,props)=>({
						clickRecord:[false,false,false,false]
					}))
				}
				return false;
			default:
				this.props.backtodefalut();
				this.context.router.history.push('/');
				return false;
		}
	}
	componentDidMount(){
		
		const ml = this.props;
		this.setState((state,props)=>({
			ml:ml
		}))
	}
	componentDidUpdate(){
		
	}
	componentWillUnMount = () => {
		
	}

	static contextTypes = {
		router: PropTypes.object.isRequired,
    }
	render(){
		const {menuText,menuIcon,textColor} = this.props.state.menuList;
		const cl = ['undo','todo','doing','did','done'];
		const menulist = menuText.map((item,key)=>(
			<TouchableOpacity onPress={()=>{this.cklist(cl[key],key)}} key={key}>
				<View style={{width:'100%',marginVertical:20}}>
					<Image style={{width:30,height:30,alignSelf:'center'}} source={menuIcon[key]} />
					<Text style={{color:textColor[key]}}>{item}</Text>
				</View>
			</TouchableOpacity>
		));
		return (
			<View>
				{menulist}
			</View>
		)
	}
}
const mapStateToProps = (state,ownProps) =>({state:state})
const mapDispatchToProps =(trigger,index,bol)=>{
	return {type:trigger,index:index}
}
const backtodefalut = ()=>({type:'default'})
export default connect(mapStateToProps,{mapDispatchToProps,backtodefalut})(Menulist);
