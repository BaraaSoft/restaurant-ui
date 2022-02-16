import ActionType from 'actions/actionType';
import axiosRequest from 'webClient';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRestaurantsModel,IPageable} from 'types';
import {AxiosResponse} from 'axios'
import {getPageInfo}from 'utils';
import  _ from 'lodash'




// const _fetchRestaurants = _.memoize(
//     async (pageNum:number,dispatch:ThunkDispatch<IRestaurantsModel, void, Action>)=>{
        
//     }
// )

let lastReqArgs:any = [];
let lastReqAction = ActionType.AllRestaurants;


export const fetchRestaurants = (pageNum:number) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    if(pageNum == 1){
        await dispatch({type:ActionType.ClearList,payload:[]})
    }
    lastReqAction = ActionType.AllRestaurants;
    const response:any = await axiosRequest({page:pageNum,size:9}).get(`/restaurants`);
    const restaurantsList = response?.data?.content?.map((item:IRestaurantsModel)=>({...item,pageNum}));
    const homePageable = getPageInfo(response?.data)
    dispatch({type: ActionType.HomePageMetaData, payload:homePageable})
    dispatch({ type: ActionType.AllRestaurants, payload:restaurantsList })
}

export const fetchRestaurantsByName = (pageNum:number,name:string) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    if(pageNum == 1 || !name){
        await dispatch({type:ActionType.ClearList,payload:[]})
    }
     lastReqArgs = [name];
     lastReqAction = ActionType.RestaurantsStartsWithName;
    const response:any = await axiosRequest({
        page:pageNum,size:9,startWith:name
    }).get(`/restaurants`);
    const restaurantsList = response?.data?.content?.map((item:IRestaurantsModel)=>({...item,pageNum}));
    const homePageable = getPageInfo(response?.data)
    dispatch({type: ActionType.HomePageMetaData, payload:homePageable})
    dispatch({ type: ActionType.RestaurantsStartsWithName, payload:restaurantsList })
}


export const fetchRestaurantsByTime = (pageNum:number,day:string,fromTime:string,toTime:string) => async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any) => {
    if(pageNum == 1 || !fromTime){
        await dispatch({type:ActionType.ClearList,payload:[]})
    }
    lastReqArgs = [day,fromTime,toTime];
    lastReqAction = ActionType.RestaurantsWithTimeRange;
    const response:any = await axiosRequest({
        page:pageNum,size:9,from:fromTime,to:toTime,day:day
    }).get(`/restaurants`);
    const restaurantsList = response?.data?.content?.map((item:IRestaurantsModel)=>({...item,pageNum}));
    const homePageable = getPageInfo(response?.data)
    dispatch({type: ActionType.HomePageMetaData, payload:homePageable})
    dispatch({ type: ActionType.RestaurantsWithTimeRange, payload:restaurantsList })
}


export const fetchNextPage = (pageNum:number)=> async (dispatch:ThunkDispatch<IRestaurantsModel, void, Action>,getState:any)=> {
    let arg:any;
    switch(lastReqAction){
        case ActionType.AllRestaurants:
            dispatch(fetchRestaurants.apply(null,[pageNum]))
            break;
         case ActionType.RestaurantsStartsWithName:
             arg = Object.values([pageNum,...lastReqArgs]) as [number,string]
             dispatch(fetchRestaurantsByName.apply(null,arg))
             break;
        case ActionType.RestaurantsWithTimeRange:
             arg = Object.values([pageNum,...lastReqArgs]) as [number,string,string,string]
             dispatch(fetchRestaurantsByTime.apply(null,arg))
             break;
        default:
        
    }
}