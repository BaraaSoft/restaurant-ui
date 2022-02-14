import React,{useState,useEffect} from 'react';
import { PageHeader,Input,Select,TimePicker} from 'antd';
import { connect } from 'react-redux';
import {
    IReducer,
    IRestaurantsModel,IPageable
} from 'types';
import {fetchRestaurantsByName,fetchRestaurants} from 'actions'

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

export interface HeaderProps{
    fetchRestaurantsByName:(pageNum:number,queryStr:string)=>void;
    fetchRestaurants:(pageNum:number)=>void;
}

const Header = (props:HeaderProps):JSX.Element=>{
    const [searchTerm,setSearch] =useState<string|null>(null);
    const [timeRange,setTimeRange]=useState<string[] | null>();
    const [day,setDay] = useState<string>('Mon')
    const {fetchRestaurantsByName,fetchRestaurants } = props
    const onSearch = (searchQuery:any)=>{
        setSearch(searchQuery)
        if(searchQuery){
           fetchRestaurantsByName(1,searchQuery)
        }else{
            if(!timeRange){
                fetchRestaurants(1)
            }else{

            }
        }
    }
    const onTimeSelect = (date:any, timeStrArr: string[])=>{
        if(!date) setTimeRange(null)
        else{
            setTimeRange(timeStrArr)
        }
    }

    const onDaySelect = (e:string)=>{
        setDay(e)
    }
    return (
          <PageHeader
                className="site-page-header"
                title="Restaurants"
                subTitle="Check for the available restaurants at given time"
                 extra={[
                      <Input.Group compact>
                          
                        <Select onSelect={onDaySelect} defaultValue="Mon">
                            {renderOptions(options)}
                         </Select>
                          <TimePicker.RangePicker
                            onChange={onTimeSelect}
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


const mapStateToProps = ({restaurants,pages}:IReducer) => {
    const {homePage} = pages
    return { restaurants,homePage }
}

export default connect(mapStateToProps, {fetchRestaurantsByName,fetchRestaurants})(Header)


