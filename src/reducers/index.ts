import { combineReducers } from 'redux'
import {restaurants} from './restaurants.reducer';
import {pages} from './page.reducer'


export default combineReducers({
    restaurants,
    pages
})