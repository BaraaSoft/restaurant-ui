export interface IRestaurantsModel{
    id:number;
    name:string;
    schedules?:ISchedules[]
    pageNum?:number
}

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface ISchedules{
    id:number;
    openTime:string;
    closeTime:string;
    day:WeekDay;
    restaurant:IRestaurantsModel
}

export interface IFavouriteItemModel {
    id:number;
    restaurant:IRestaurantsModel;
    favGrpId?:number
}

export interface IFavouriteModel{
    id:number;
    name:string;
    items:IFavouriteItemModel[]
}

export interface IAction<T>{
    payload:T
    type:any
}

export interface IReducer{
    restaurants:IRestaurantsModel[]
    pages:IPage
    favouriteGroups:IFavouriteModel[]
    favouriteItems:IFavouriteItemModel[]
}

export interface IPage{
    homePage:IPageable;
    favouritePage:IPageable;
}

export interface IPageable{
    number:number;
    numberOfElements:number;
    totalElements:number;
    totalPages:number;
    size:number;
}