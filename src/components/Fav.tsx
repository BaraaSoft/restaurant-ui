import React,{useState} from 'react';
import { Layout, Breadcrumb,Tabs} from 'antd';
import {Header,ListView} from 'components';

const { TabPane } = Tabs;

const FavView = ():JSX.Element=>{
    const [tabPosition,setTabPosition] = useState<number>(1)
    return(
        <div style={{height:540,overflowY:'scroll'}} >
            <Tabs tabPosition="left">
                {Array(50).fill(0).map((x,index)=>{
                    return(
                        <TabPane tab={`Tab ${index}`} key={index}>
                            {`Tab Number ${index}`}
                        </TabPane>
                    )
                })}
            </Tabs>
        </div>
    )
}


export default FavView