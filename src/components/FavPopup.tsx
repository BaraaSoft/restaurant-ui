import React,{useState,useEffect} from 'react';
import { PageHeader,Input,Select,Popover,Button} from 'antd';
import { connect } from 'react-redux';
import {
    IFavouriteItemModel,
    IFavouriteModel,
    IReducer,
    IRestaurantsModel
} from 'types';
import { StarOutlined } from '@ant-design/icons';
import {fetchFavGroups,addFavouriteItem} from 'actions';

const {Search} = Input;
const { Option } = Select;


export interface FavPopupProps{
    restaurant:IRestaurantsModel;
    onDone:(e:IRestaurantsModel)=>void;
    onVisibleChange:(e:any)=>void;
    visible:boolean;
    fetchFavGroups:(userId?:number)=>void;
    favouriteGroups?:IFavouriteModel[]
    addFavouriteItem?:(restaurant:IRestaurantsModel,favGrpId:number,userId?:number)=>void
}

const FavPopup = (props:FavPopupProps):JSX.Element =>{

    const {restaurant,onDone,onVisibleChange,visible} = props
    const {fetchFavGroups,favouriteGroups,addFavouriteItem} = props

    const [selectedGroup,setSelectedGroup] = useState<IFavouriteModel[]>()
    const [selectedGroupIds,setSelectedGroupIds] = useState<number[]>()

    useEffect(()=>{
        fetchFavGroups(1)
    },[])

    const handleChange = (selItems:any,objArr:[{key:number,value:string}]) => {
        const ids = objArr.map((x)=>x.key);
        setSelectedGroupIds(ids) 
        setSelectedGroup(selItems)
    }
    const filteredOptions = favouriteGroups?.filter(o => !selectedGroup?.map(x=>x.id).includes(o.id));

    const handleAddToFav = ()=>{
        if(selectedGroupIds){
            for(let grpId of selectedGroupIds){
                addFavouriteItem?.call(null,restaurant,grpId)
            }
        }
        
        
        onDone.call(null,restaurant);
    }

    const renderContent = ()=>{
        return(
            <div style={{minWidth:'340px',minHeight:'80px'}} >
                <Select
                    size="middle"
                    mode="multiple"
                    placeholder="Inserted are removed"
                    value={selectedGroup}
                    onChange={handleChange as any}
                    style={{ width: '100%' }}>
                    {filteredOptions?.map(item => (
                        <Select.Option key={item.id} value={item.name}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
                <div style={{display:'flex',justifyContent:'end',marginTop:'24px'}}>
                     <Button onClick={handleAddToFav} size="middle" type="primary" shape="default">ADD</Button>
                </div>
               
            </div>
        )
    }

    return (
        <Popover
            style={{width:"300px"}}
            placement="leftTop"
            content={renderContent()}
            title="Add to favourites"
            trigger="click"
            visible={visible}
            onVisibleChange={onVisibleChange}>
               

            <Button type="ghost" shape="circle" icon={<StarOutlined/>}></Button>
        </Popover>
    )

}


const mapStateToProps = ({favouriteGroups}:IReducer) => {
  
    return { favouriteGroups }
}



export default connect(mapStateToProps, {fetchFavGroups,addFavouriteItem} )(FavPopup)