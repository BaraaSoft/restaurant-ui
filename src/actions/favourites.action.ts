import ActionType from 'actions/actionType';
import axiosRequest from 'webClient';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRestaurantsModel,IPageable} from 'types';
import {AxiosResponse} from 'axios'
import {getPageInfo}from 'utils';
import  _ from 'lodash'





const _fetchFavGroups = _.memoize(
    async (userId:number,dispatch:ThunkDispatch<IRestaurantsModel, void, Action>)=>{
        const response:any = await axiosRequest().get(`/user/${userId}/favourites`);
        dispatch({payload:response.data,type:ActionType.AllFavouriteGroups})
    }
)
// localhost:8080/api/v1/user/1/favourites
export const fetchFavGroups = (userId = 1) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    _fetchFavGroups(userId,dispatch)

}