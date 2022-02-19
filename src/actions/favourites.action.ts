import ActionType from 'actions/actionType';
import axiosRequest from 'webClient';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRestaurantsModel,IPageable,IFavouriteModel,IFavouriteItemModel} from 'types';
import {AxiosResponse} from 'axios'
import {getPageInfo}from 'utils';
import  _ from 'lodash';






const _fetchFavGroups = _.memoize(
    async (userId:number,dispatch:ThunkDispatch<IFavouriteModel, void, Action>)=>{
        const response:any = await axiosRequest().get(`/user/${userId}/favourites`);
        await dispatch({payload:response.data,type:ActionType.AllFavouriteGroups})

        /* to load first favourite group items */
        const firstFavGrpItems = response.data[0] 
        console.log({firstFavGrpItems})
        dispatch(fetchFavGroupItems(firstFavGrpItems?.id))
        
    }
)

const _fetchFavGroupItems = _.memoize(
    async (favGrpId:number,userId:number,dispatch:ThunkDispatch<IFavouriteItemModel, void, Action>)=>{
        const response:any = await axiosRequest().get(`/user/${userId}/favourites/${favGrpId}/items`);
        dispatch({payload:response.data.map((x:any)=>({...x,favGrpId:favGrpId})),type:ActionType.AllFavouriteGroupItems})
    }
)


export const fetchFavGroups = (userId:number = 1) => async (dispatch:ThunkDispatch<IFavouriteModel, void, Action>,getState:any) => {
    _fetchFavGroups(userId,dispatch)

}


export const addFavouriteItem = (restaurant:IRestaurantsModel,favGrpId:number,userId:number = 1) => async (dispatch:ThunkDispatch<IFavouriteItemModel, void, Action>,getState:any) => {
  
   delete restaurant.pageNum;
   delete restaurant.schedules;
   const response:any = await axiosRequest().post(`/user/${userId}/favourites/${favGrpId}/items`,{restaurant}).then((e)=>console.log(e))
    .catch((err)=> console.log(">> Error",err))
}

export const fetchFavGroupItems = (favGrpId:number,userId:number = 1) => async (dispatch:ThunkDispatch<IFavouriteItemModel, void, Action>,getState:any) => {
    _fetchFavGroupItems(favGrpId,userId,dispatch)
}