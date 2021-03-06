import React,{useEffect,useState} from 'react';
import { List,Avatar,Pagination,Popover,Button} from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {
  fetchRestaurants,fetchNextPage
} from 'actions';
import {
    IReducer,
    IRestaurantsModel,IPageable
} from 'types';
import FavPopup from './FavPopup';


export interface ListViewProps{
    fetchRestaurants:(page:number)=>void;
    fetchNextPage:(page:number)=>void;
    restaurants:IRestaurantsModel[] | any[];
    homePage:IPageable
}



function getRandomColor(){
    const colorList = ['#f56a00', '#7265e6', '#8b0000',
        '#f0ead6','#355e3b','#ff00f','#b78727','#40826d',
        '#ffbf00', '#00a2ae','#7EE71F','#9966cc','#E5D984',
        '#2C41B1','#485D23','#594E3A','#974730'];
    let index = Math.floor( Math.random() * colorList.length);
    return colorList[index];
}

const CustomAvatar = ({title}:any)=>{    
    return(
        <Avatar style={{ backgroundColor: getRandomColor(), verticalAlign: 'middle' }} size="large" gap={4}>
            {title.charAt(0)}
        </Avatar>
    )
}

const ListView = (props:ListViewProps):JSX.Element=>{
    const [page, setPage] = useState(props.homePage?.number || 1);
    const [showPopover, setPopOver]= useState<{[key:string]:boolean}>({"1":false});
    
    const { fetchRestaurants,fetchNextPage,restaurants } = props
    useEffect(()=>{
        fetchRestaurants(page);
    },[])

    const onPageChange = (pageNum:number, pageSize:number)=>{
        fetchNextPage(pageNum);
        setPage(pageNum)
    }
    return (
        <>
         <List style={{flex:1}}
            itemLayout="horizontal"
            loading={restaurants.filter(x=>x.pageNum == page).length == 0}
            dataSource={restaurants.filter(x=>x.pageNum == page)}
            renderItem={(item)=>
                (<List.Item key={item.id} >
                    
                    <List.Item.Meta
                        avatar={<CustomAvatar title={item.name}/>}
                        title={item.name}
                        description="This is eval restaurant"/>
                    
                     <div style={{flex:2}}></div>
                     <FavPopup 
                        restaurant={item}  
                        visible={showPopover[item.id] || false}
                        onVisibleChange={(e)=>setPopOver({...showPopover,[item.id]:e})}
                        onDone={(e)=>setPopOver({...showPopover,[item.id]:false})} />
                </List.Item>)
            }
           />
            <Pagination
                style={{ marginTop: '12px',alignSelf:'center' }}
                size="default"
                defaultPageSize={props.homePage?.size || 9}
                defaultCurrent={page}
                total={props.homePage?.totalElements}
                onChange={onPageChange} />

        </>
    )
}


const mapStateToProps = ({restaurants,pages}:IReducer) => {
    const {homePage} = pages
    return { restaurants,homePage }
}

export default connect(mapStateToProps, {fetchRestaurants,fetchNextPage})(ListView)

