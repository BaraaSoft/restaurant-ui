import ActionType from 'actions/actionType';
import axios from 'https';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRestaurantsModel} from 'types';

export const fetchRestaurants = (pageNum:number) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>): Promise<Action> => {
    
    const { data }:any = await axios.get(`/restaurants`)
    console.log("restaurants:", data)
   return dispatch({ type: ActionType.AllRestaurants, payload:data  })
}

// (dispatch: Dispatch<IState>): Promise<Action>