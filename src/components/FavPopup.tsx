import React,{useState,useEffect} from 'react';
import { PageHeader,Input,Select,Popover,Button} from 'antd';
import { connect } from 'react-redux';
import {
    IFavouriteModel,
    IReducer,
    IRestaurantsModel
} from 'types';
import { StarOutlined } from '@ant-design/icons';
import {fetchFavGroups} from 'actions';

const {Search} = Input;
const { Option } = Select;


export interface FavPopupProps{
    restaurant:IRestaurantsModel;
    onClose:(e:IRestaurantsModel)=>void;
    onVisibleChange:(e:any)=>void;
    visible:boolean;
    fetchFavGroups:(userId?:number)=>void;
    favouriteGroups?:IFavouriteModel[]
}

const FavPopup = (props:FavPopupProps):JSX.Element =>{

    const {restaurant,onClose,onVisibleChange,visible} = props
    const {fetchFavGroups,favouriteGroups} = props

    const [selectedGroup,setSelectedGroup] = useState<IFavouriteModel[]>()

    useEffect(()=>{
        fetchFavGroups(1)
    },[])

    const handleChange = (selItems:any) => setSelectedGroup(selItems)

    
    const filteredOptions = favouriteGroups?.filter(o => !selectedGroup?.map(x=>x.id).includes(o.id));
    const renderContent = ()=>{
        return(
            <div style={{minWidth:'340px',minHeight:'80px'}} >
                <Select
                    size="middle"
                    mode="multiple"
                    placeholder="Inserted are removed"
                    value={selectedGroup}
                    onChange={handleChange}
                    style={{ width: '100%' }}>
                    {filteredOptions?.map(item => (
                        <Select.Option key={item.id} value={item.name}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
                <div style={{display:'flex',justifyContent:'end',marginTop:'24px'}}>
                     <Button onClick={onClose.bind(null,restaurant)} size="middle" type="primary" shape="default">ADD</Button>
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



export default connect(mapStateToProps, {fetchFavGroups})(FavPopup)