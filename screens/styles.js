import {StyleSheet,Dimensions} from 'react-native';
import { connect } from "react-redux";
export const styles = StyleSheet.create({
	container:{
		position:'relative',
		flex:1,
		alignContent:'center',
		alignItems:'center',
		flexDirection:'column',
	},
	btns:{
		width:120
	},
	cont:{
		flex:1
	},
	customInfoWindow:{
		width:300,
		height:400,
		backgroundColor: '#259BD8',
		padding: 10,
		borderRadius: 10,
		elevation: 4,
		borderWidth: 2,
		borderColor: '#689F38',
	},
	LeftPanel:{
		...StyleSheet.absoluteFillObject,
		width:'30%',
		height:'40%',
		top:'20%',
		backgroundColor:'#fff',
	},
	nav:{
		width:'100%',
		flexDirection:'row',
		alignContent:'flex-start',
		backgroundColor:'#F9F9F9',
	},
	navItem:{
		width:'20%',
		flexDirection:'column',
		alignItems:'center',
		padding:10,
	},
	infoWindow:{
		...StyleSheet.absoluteFillObject,
		flex:1,
		alignSelf:'flex-end',
		backgroundColor:'#fff',
		width:'29%',
		height:'80%',
		left:'70%',
		top:'20%',
	},
	avatar:{
		...StyleSheet.absoluteFillObject,
		position:'absolute',
		left:Dimensions.get('window').width - 100,
		top:30,
	},
	searchBar:{
		...StyleSheet.absoluteFillObject,
		width:'100%',
		height:50,
		flex:1,
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row',
	},
	searchBarThem:{
		width:'50%',
		backgroundColor:"transparent",
		borderColor:"transparent",
		borderBottomWidth:0
	},
	searchInput:{
		width:'100%'
	},
	menu:{
		position:'absolute',
		left:12,
		bottom:35,
		backgroundColor:'transparent'
	},
	menuClicked:{
		display:'flex',
		flex:1,
		flexDirection:'row',
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		backgroundColor:'rgba(0,0,0,0.5)'
	},
	mck:{
		height:'20%',
		flex:0.25,
		position:'absolute',
		bottom:135,
		left:20,
	},
	mckd:{
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		alignContent:'center',
		marginTop:20,
		width:200,
	},
	mckd_sub:{
		backgroundColor:'#fff',
	},
	gondan:{
		color:'#39AFEB',
		paddingVertical:5,
		borderRadius:53,
		textAlign:'center',
	},
	leftMenu:{
		overflow:'hidden',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
		backgroundColor:'rgba(51, 138, 182,0.92)',
	},
	subLeftMenu:{
		width:'100%',
		height:'100%',
		position:'absolute',
		top:0,
		left:0,
	},
	leftMenuBox:{
		display:'flex',
		flex:0.9,
		flexDirection:'column',
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center',
	},
	avtar:{
		display:'flex',
		flex:0.1,
		flexDirection:'column',
		alignContent:'center',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgba(66, 146, 187,0.8)',
	},
	listDataPanel:{
		/*
		position:'absolute',
		top:0,
		overflow:'hidden',
		*/
		width:'30%',
		left:'8%',
		display:'flex',
		flex:1,
		flexDirection:'column',
		backgroundColor:'#EEF0EF',
		alignItems:'center',
		alignContent:'center',
		height:Dimensions.get('window').height,
	},
	verlist:{
		flex:1,
		flexDirection:'row',
	},
	tabTitle:{
		alignSelf:'center',
		fontWeight:'bold',
		paddingVertical:15
	},
	tabCon:{
		alignSelf:'center',
		paddingVertical:15
	},
	side_title:{
		fontSize:15,
		color:'#39AFEB',
		alignSelf:'center',
	},
	side_mintitle:{
		fontSize:12,
		color:'#39AFEB',
		alignSelf:'center',
	},
	CardBody:{
		flex:1,alignContent:'center',alignItems:'center'
	},
	table:{
		flex:1,flexDirection:'row',alignItems:'center',alignContent:'center'
	},
	disabledTxt:{
		color:'#999999'
	},
	
wrapper: {
  
},
  slide1: {
	 display:'flex',
    flex: 1,
	flexDirection:'column',
	flexWrap:'nowrap',
	alignContent:'center',
	alignItems:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  textx: {
   display:'flex',
   width:'40%',
   alignSelf:'center',
   justifyContent:'center',
  },
  slideSub:{
	  width:'100%',
	  flexDirection:'row',
	  alignItems:'center',
	  alignContent:'center',
	  justifyContent:'center',
	  paddingVertical:8,
  },
  gdbtn:{
	width:'50%',
	borderWidth:1,
	borderColor:'#259BD8',
  },
  gdbtnText:{
	  flex:1,
	  alignSelf:'center',
	  textAlign:'center',
  }
})