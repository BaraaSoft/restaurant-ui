import {IPageable} from 'types';


const getPageInfo = (pageable:any):IPageable=>{
 const {number,numberOfElements,
        totalElements,totalPages,size
    } =  pageable;

    return {
        number,numberOfElements,
        totalElements,totalPages,size
    }
}


export {getPageInfo}