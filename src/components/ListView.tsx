import React,{useEffect} from 'react';
import { List,Avatar} from 'antd';
import { connect } from 'react-redux';
import {
  fetchRestaurants
} from 'actions';
import {
    IReducer,
    IRestaurantsModel
} from 'types';


export interface ListViewProps{
    fetchRestaurants:(page:number)=>void;
    restaurants:IRestaurantsModel[] | any[];
}

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

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
    const { fetchRestaurants,restaurants } = props
    useEffect(()=>{
        fetchRestaurants(1)

    },[restaurants])
    return (
         <List
            itemLayout="horizontal"
            dataSource={restaurants}
            renderItem={(item)=>
                (<List.Item>
                    <List.Item.Meta
                        avatar={<CustomAvatar title={item.name}/>}
                        title={item.name}
                        description="This is eval restaurant"
                    />
                </List.Item>)
            }
           />
    )
}


const mapStateToProps = ({restaurants}:IReducer) => {
    
    return { restaurants }
}

export default connect(mapStateToProps, {fetchRestaurants})(ListView)

