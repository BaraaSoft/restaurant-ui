import React from 'react';
import { Layout, Breadcrumb} from 'antd';
import {Header,ListView} from 'components'

const {Content, Footer } = Layout;


const HomeLayout = (props:any):JSX.Element=>{

    return (
        <Layout>
            <Header/>
            <Content className="site-layout" style={{ padding: '0 40px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, height: 740,display:'flex',flexDirection:'column', }}>
                    <ListView/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center',margin:0 }}>Restaurants Eval ©2022 Created by Baraa</Footer>
        </Layout>
    )

}

export default HomeLayout;