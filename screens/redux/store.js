import { createStore,combineReducers } from 'redux';
import { sheetList,menuList } from './reducers/reducers.js'
const rootReducer = combineReducers({ sheetList,menuList });
export default createStore(rootReducer);