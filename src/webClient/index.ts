// localhost:8080/api/v1
// https://stormy-wildwood-40183.herokuapp.com/api/v1

import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    // timeout: 10000,
});

const axiosRequest = (params?:any)=>{
    return Axios.create({
    baseURL: 'http://localhost:8080/api/v1',params});
}

export default axiosRequest