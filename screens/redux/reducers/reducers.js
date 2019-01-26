//import config from '../../../config';
const initialState1 = {
	Msg:'没有数据',
	item:{},
};
const initialState2 = {
	menuIcon:[
		require('../../../images/menuicon.png'),
		require('../../../images/menuicon.png'),
		require('../../../images/menuicon.png'),
		require('../../../images/menuicon.png')
		],
	menuText:['待检测','已检测','待结果','已结束'],
	textColor:['#fff','#fff','#fff','#fff'],
};
export function sheetList(state = initialState1,action){
	switch(action.type){
		case 'LIST_ALL':
		state = {
			Msg:'所有工单数据列表',
			item:action.item
		}
		return state
		default:
			return state;
	}
}
export function menuList(state = initialState2,action){
	switch(action.type){
		case "undo":
			return {
				menuIcon:[
					require('../../../images/menuiconclicked.png'),
					require('../../../images/menuicon.png'),
					require('../../../images/menuicon.png'),
					require('../../../images/menuicon.png')
				],
				menuText:['待检测','已检测','待结果','已结束'],
				textColor:['#126087','#fff','#fff','#fff'],
			}
		case "todo":
			return {
				menuIcon:[
					require('../../../images/menuicon.png'),
					require('../../../images/menuiconclicked.png'),
					require('../../../images/menuicon.png'),
					require('../../../images/menuicon.png')
				],
				menuText:['待检测','已检测','待结果','已结束'],
				textColor:['#fff','#126087','#fff','#fff'],
			}
			case "doing":
			return {
				menuIcon:[
					require('../../../images/menuicon.png'),
					require('../../../images/menuicon.png'),
					require('../../../images/menuiconclicked.png'),
					require('../../../images/menuicon.png')
				],
				menuText:['待检测','已检测','待结果','已结束'],
				textColor:['#fff','#fff','#126087','#fff'],
			}
			case "did":
			return {
				menuIcon:[
					require('../../../images/menuicon.png'),
					require('../../../images/menuicon.png'),
					require('../../../images/menuicon.png'),
					require('../../../images/menuiconclicked.png')
				],
				menuText:['待检测','已检测','待结果','已结束'],
				textColor:['#fff','#fff','#fff','#126087'],
			}
		default:
			return {
				menuIcon:[
				require('../../../images/menuicon.png'),
				require('../../../images/menuicon.png'),
				require('../../../images/menuicon.png'),
				require('../../../images/menuicon.png')
				],
			menuText:['待检测','已检测','待结果','已结束'],
			textColor:['#fff','#fff','#fff','#fff'],
			};
	}
}