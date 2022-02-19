import { combineReducers } from 'redux'
import {restaurants} from './restaurants.reducer';
import {pages} from './page.reducer'
import {favouriteGroups,favouriteItems} from './favourites.reducer'


export default combineReducers({
    restaurants,
    pages,
    favouriteGroups,
    favouriteItems
})