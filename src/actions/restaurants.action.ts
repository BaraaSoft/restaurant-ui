import ActionType from 'actions/actionType';
import axiosRequest from 'webClient';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRestaurantsModel,IPageable} from 'types';
import {AxiosResponse} from 'axios'
import {getPageInfo}from 'utils';
import  _ from 'lodash'




const _fetchRestaurants = _.memoize(
    async (pageNum:number,dispatch:ThunkDispatch<IRestaurantsModel, void, Action>)=>{
        const response:any = await axiosRequest({page:pageNum,size:9}).get(`/restaurants`);
        const restaurantsList = response?.data?.content?.map((item:IRestaurantsModel)=>({...item,pageNum}));
        const homePageable = getPageInfo(response?.data)
        dispatch({type: ActionType.HomePageMetaData, payload:homePageable})
        dispatch({ type: ActionType.AllRestaurants, payload:restaurantsList })
    }
)



export const fetchRestaurants = (pageNum:number) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    _fetchRestaurants(pageNum,dispatch)
}

export const fetchRestaurantsByName = (pageNum:number,name:string) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    if(pageNum == 1 || !name){
        await dispatch({type:ActionType.ClearList,payload:[]})
    }
    const response:any = await axiosRequest({
        page:pageNum,size:9,startWith:name
    }).get(`/restaurants`);
    const restaurantsList = response?.data?.content?.map((item:IRestaurantsModel)=>({...item,pageNum}));
    const homePageable = getPageInfo(response?.data)
    console.log("restaurantsList",{restaurantsList})
    dispatch({type: ActionType.HomePageMetaData, payload:homePageable})
    dispatch({ type: ActionType.RestaurantsStartsWithName, payload:restaurantsList })
}

//todo
export const fetchRestaurantsByTime = (pageNum:number,day:string,fromTime:string,toTime:string) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    if(pageNum == 1 || !fromTime){
        await dispatch({type:ActionType.ClearList,payload:[]})
    }
    const response:any = await axiosRequest({
        page:pageNum,size:9,from:fromTime,to:toTime,day:day
    }).get(`/restaurants`);
    const restaurantsList = response?.data?.content?.map((item:IRestaurantsModel)=>({...item,pageNum}));
    const homePageable = getPageInfo(response?.data)
    console.log("restaurantsList",{restaurantsList})
    dispatch({type: ActionType.HomePageMetaData, payload:homePageable})
    dispatch({ type: ActionType.RestaurantsStartsWithName, payload:restaurantsList })
}
