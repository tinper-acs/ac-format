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

const defaultFormat = "YYYY-MM-DD HH:mm:ss";
const dateInputPlaceholder = "选择日期";

class Demo3 extends Component {

    constructor(props){
        super(props);

        // window.globalization = {
        //     timezone: 'UTC+9:00',
        //     locale: 'zh_CN',
        //     dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss'}
        // }
        this.state = {
            value:'2020/02/06,14:30:06'
        }
    }
 
    onChange = (d, dataString) => {
        let ut8 = getGlobalizationDateFormat(this.state.value,'datetime',"UTC+8:00",true);
        console.log(ut8)
    }; 

    render() {
        let  __value = getGlobalizationDateFormat(this.state.value,'datetime',"UTC+8:00",true);
        let {value,format} = getGlobalizationDateFormat(__value,'datetime');

        let _t = '20:19:59'; 
        let ut8 = getGlobalizationTimeFormat(_t,"UTC+8:00",true).value;
        let {value:timeValue,format:timeFormat} = getGlobalizationTimeFormat(ut8);
        timeFormat = timeFormat?timeFormat:'HH:mm:ss';
        return (
            <div>
                {this.state.value}(UTC+90:00) :[编辑态]
                <DatePicker
                    format={format?format:defaultFormat}
                    onChange={this.onChange}
                    value={value} 
                    showTime={true} 
                />
                <br/><br/>

                {this.state.value}(UTC-10:00) 333:[浏览态]
                {getGlobalizationDateFormat(this.state.value,'datetime',"UTC+9:00",true).value}

                <br/>  <br/>

                {_t}(UTC-10:00) :
                <Timepicker
                    format={timeFormat}
                    showSecond={false}
                    value={timeValue}
                    placeholder="选择时间"
                    onChange={(a,b)=>{
                        console.log(" --- ",a);
                    }}
                    use12Hours
                />
            </div>
        );
    }
}

export default Demo3;
