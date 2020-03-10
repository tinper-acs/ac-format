/**
 *
 * @title DatePicker、Timepicker 时区 格式化
 * @description 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat
 *
 */

import React, { Component } from 'react';
import {getGlobalizationDateFormat,getGlobalizationTimeFormat} from '../../src/index';
import DatePicker from "bee-datepicker";
import Timepicker from "bee-timepicker";
import moment from 'moment';

const defaultFormat = "YYYY-MM-DD HH:mm:ss TT";
const dateInputPlaceholder = "选择日期";

class Demo3 extends Component {

    constructor(props){
        super(props);

        window.globalization = {
            timezone: 'UTC+07:00',
            locale: 'zh_CN',
            dataformat: {dateTimeFormat: 'MM-dd-yyyy hh:mm:ss TT', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss tt'}
        }
        this.state = {
            value:'02-06-2020 14:30:06'
        }
    }
 
    onChange = (d, dataString) => {
        let ut8 = getGlobalizationDateFormat(d,"UTC+08:00",'datetime','YYYY-MM-DD HH:mm:ss',true).value;
        console.log(ut8)
    }; 

    render() {
        let ut8 = getGlobalizationDateFormat(this.state.value,"UTC+08:00",'datetime',"YYYY-MM-DD HH:mm:ss",true).value;
        let  {value,format} = getGlobalizationDateFormat(ut8,null,'datetime');
        let _t = '20:19:59';  
        let {value:timeValue,format:timeFormat} = getGlobalizationTimeFormat(_t,"UTC+08:00",null);
        timeFormat = timeFormat?timeFormat:'HH:mm:ss';
        // console.log(" =format== ",value.locale('en'));
        return (
            <div>
                {this.state.value}(UTC+07:00) :[编辑态]
                <DatePicker
                    format={format.replace("TT","").replace("tt","")}
                    onChange={this.onChange}
                    value={value}
                    // locale="en-US"
                    showTime={true}
                />
                
                <br/><br/>

                {this.state.value}(UTC+7:00):[浏览态]
                {getGlobalizationDateFormat(ut8,null,'datetime',null,true).value}

                <br/>  <br/>

                {_t}(UTC+7:00) :
                <Timepicker
                    format={timeFormat} 
                    showSecond={false}
                    value={timeValue}
                    placeholder="选择时间"
                    use12Hours={timeFormat.indexOf("H") !== -1?true:false}
                />
            </div>
        );
    }
}

export default Demo3;
