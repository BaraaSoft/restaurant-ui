import React from 'react';
import { PageHeader,Input,Select,TimePicker} from 'antd';

const {Search} = Input;
const { Option } = Select;


const options = [
    {value: 'Mon', label: 'Mon'},
    {value: 'Tue', label: 'Tue'},
    {value: 'Wed', label: 'Wed'},
    {value: 'Thu', label: 'Thu'},
    {value: 'Fri', label: 'Fri'},
    {value: 'Sat', label: 'Sat'},
    {value: 'Sun', label: 'Sun'},
]

const renderOptions = (options:any[])=>{
    return options.map(opt=>{
        return (<Option value={opt.value}>{opt.value}</Option>)
    })
}

const Header = (props:any):JSX.Element=>{
    const onSearch = (e:any)=>{

    }
    return (
          <PageHeader
                className="site-page-header"
                title="Restaurants"
                subTitle="Check for the available restaurants at given time"
                 extra={[
                      <Input.Group compact>
                          
                        <Select defaultValue="Mon">
                            {renderOptions(options)}
                         </Select>
                          <TimePicker.RangePicker
                            placeholder={["from","to"]}
                          />
                          <Search
                            style={{width:500}}
                            size="middle"
                            placeholder="search by restaurant name..."
                            allowClear
                            enterButton="Search"
                            onSearch={onSearch}/>
                           
                      </Input.Group>
    
                 ]}/>
    );
}

export default Header;