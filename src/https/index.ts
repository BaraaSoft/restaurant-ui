//localhost:8080/api/v1/restaurants

import Axios from "axios";

const instance = Axios.create({
    baseURL: 'localhost:8080/api/v1',
    timeout: 10000,
});


export default instance