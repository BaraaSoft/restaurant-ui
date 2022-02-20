import Axios from "axios";
import baseUrl from '../config.json';

const instance = Axios.create({
    baseURL: baseUrl.active,
});

const axiosRequest = (params?:any,data?:any)=>{
    return Axios.create({
    baseURL: baseUrl.active,
    data:data,
    params});
}

export default axiosRequest