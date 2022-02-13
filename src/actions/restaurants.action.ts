import ActionType from 'actions/actionType';
import axios from 'https';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRestaurantsModel} from 'types';
import {AxiosResponse} from 'axios'



export const fetchRestaurants = (pageNum:number) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>): Promise<Action> => {
    const response:any = await axios.get(`/restaurants`);
    console.log("restaurants:", response)
   return dispatch({ type: ActionType.AllRestaurants, payload:response?.data  })
}
