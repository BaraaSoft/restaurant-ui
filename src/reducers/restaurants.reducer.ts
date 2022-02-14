import {ActionType} from 'actions';
import {IRestaurantsModel,IAction} from 'types';
import _ from 'lodash';




export const restaurants = (state = [], action:IAction<IRestaurantsModel[]>) => {

    switch (action.type) {
        case ActionType.AllRestaurants:
            return _.uniqBy([...state,...action.payload], "id");
        case ActionType.RestaurantsStartsWithName:
            return _.uniqBy([...state,...action.payload], "id");
        case ActionType.ClearList:
            return[]
        default:
            return state
    }
}