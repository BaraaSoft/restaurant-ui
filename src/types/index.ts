export interface IRestaurantsModel{
    id:number;
    name:string;
    schedules?:ISchedules[]
}

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface ISchedules{
    id:number;
    openTime:string;
    closeTime:string;
    day:WeekDay;
    restaurant:IRestaurantsModel
}

export interface IAction<T>{
    payload:T
    type:any
}

export interface IReducer{
    restaurants:IRestaurantsModel[]
}