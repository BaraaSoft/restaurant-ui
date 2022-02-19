import React,{useState,useEffect} from 'react';
import { Layout, Breadcrumb,Tabs,List,Input,Button,Divider} from 'antd';
import {Header,ListView} from 'components';
import { IFavouriteItemModel, IFavouriteModel, IReducer } from 'types';
import { connect } from 'react-redux';
import {fetchFavGroups,fetchFavGroupItems} from 'actions';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';



const FavInupt = styled(Input)`
    padding: 20px;
    margin-right:12px;
    padding-left: 28px;
    width:'calc(100% - 200px)';
    border-radius: 14px;
    background-color:#fafafa;
`;


const InputGroup = styled(Input.Group)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
`;

const { TabPane } = Tabs;

export interface FavViewProps{
    fetchFavGroups?:(userId?:number)=>void
    favouriteGroups?:IFavouriteModel[]
    favouriteItems?:IFavouriteItemModel[]
    fetchFavGroupItems?:(favGrpId:number,userId?:number)=>void
}

const FavView = (props:FavViewProps):JSX.Element=>{
    const [tabPosition,setTabPosition] = useState<number>(1);
    const [favName,setFavName] = useState<string>();
    const {fetchFavGroups,favouriteGroups,favouriteItems,fetchFavGroupItems} =  props;

    useEffect(()=>{
        fetchFavGroups?.call(null)
    },[])

     useEffect(()=>{
       
    },[])

    const onTabChanged = (favGrpId:any)=>{
        fetchFavGroupItems?.call(null,favGrpId)
    }

    const onAddNewFavouriteGroup = ()=>{
        if(favName){
            console.log(favName)
        }
    }

    return(
        <div style={{height:540,overflowY:'scroll'}} >
            <InputGroup>
                <FavInupt onChange={(e)=>setFavName(e.target.value)} 
                    bordered={false} size="large"
                    placeholder="add new favourite group"/>
                <Button onClick={onAddNewFavouriteGroup} 
                    size="middle" type="primary" shape="circle" 
                    icon={<PlusOutlined />}/>
            </InputGroup>
            <Divider/>
            <Tabs tabPosition="left" onChange={onTabChanged} >
                {favouriteGroups?.map((favGrp,index)=>{
                    const filteredList = favouriteItems?.filter(item=>item.favGrpId==favGrp.id) 
                    return(
                        <TabPane tab={favGrp.name} key={favGrp.id}>
                             <List
                                loading={filteredList?.length == 0}
                                dataSource={filteredList}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <div>{item.restaurant.name}</div>
                                    </List.Item>)}
                                />
                        </TabPane>
                    )
                })}
            </Tabs>
        </div>
    )
}


const mapStateToProps = ({favouriteGroups,favouriteItems}:IReducer) => {
    
    return { favouriteGroups,favouriteItems }
}


export default connect(mapStateToProps,{fetchFavGroups,fetchFavGroupItems})(FavView)