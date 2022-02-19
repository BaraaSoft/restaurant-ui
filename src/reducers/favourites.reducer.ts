import {ActionType} from 'actions';
import {IFavouriteModel,IAction, IFavouriteItemModel} from 'types';
import _ from 'lodash';




export const favouriteGroups = (state = [], action:IAction<IFavouriteModel[]>) => {
    switch (action.type) {
        case ActionType.AllFavouriteGroups:
            console.log("favouriteGroups-->Reducer:",action.payload)
            return _.uniqBy([...state,...action.payload], "id");
        default:
            return state
    }
}

export const favouriteItems = (state = [], action:IAction<IFavouriteItemModel[]>) => {
    switch (action.type) {
        case ActionType.AllFavouriteGroupItems:
            console.log("AllFavouriteGroupItems-->Reducer:",action.payload)
            return _.uniqBy([...state,...action.payload], "id");
        default:
            return state
    }
}


