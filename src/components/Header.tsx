import React from 'react';
import { PageHeader } from 'antd';


const Header = (props:any):JSX.Element=>{
    return (
          <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Title"
                subTitle="This is a subtitle"/>
    );
}

export default Header;