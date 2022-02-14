import {ActionType} from 'actions';
import {IRestaurantsModel,IAction, IPageable} from 'types';
import _ from 'lodash';


export const pages = (state = {}, action:IAction<IPageable>) => {
    switch (action.type) {
        case ActionType.HomePageMetaData:
            return {...state,homePage:action.payload}
        default:
            return state
    }
}