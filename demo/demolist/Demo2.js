/**
 *
 * @title DatePicker、Timepicker 时区 格式化
 * @description 根据多时区普通调用转换时间 getDateFormat,getTimeFormat
 *
 */
import React, { Component } from 'react';
import {getDateFormat,getTimeFormat } from '../../src/index';
import DatePicker from "bee-datepicker";
import Timepicker from "bee-timepicker";

const format = "YYYY-MM-DD HH:mm:ss";
const dateInputPlaceholder = "选择日期";

class Demo2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            value:'2020/02/06,14:30:06'
        }
    }

    
    onChange = (d, dataString) => {
        let ut8 = getDateFormat(d,"UTC+8:00",format);
        console.log(ut8)
    }; 
     

    render() {
        let ut8 = getDateFormat(this.state.value,"UTC+8:00");
        let showValue = getDateFormat(ut8,"UTC+9:00");

        let _t = '20:19:59';

        let {value:timeValue,format:timeFormat} = getTimeFormat(_t,'UTC-10:00','hh:mm:ss a');

        let utc8 = getTimeFormat(_t,'UT+8:00').value;

        console.log(utc8+" ====time===== ",timeValue);
        return (
            <div>
                {this.state.value}(UTC-10:00) :[编辑态]
                <DatePicker
                    format={format} 
                    onChange={this.onChange}
                    value={showValue} 
                    showTime={true} 
                />
                <br/><br/>

                {this.state.value}(UTC-10:00) :[浏览态]
                {getDateFormat(this.state.value,"UTC-10:00",format)}

                <br/>  <br/>

                {_t}(UTC-10:00) :
                <Timepicker
                    format={timeFormat}
                    showSecond={false}
                    defaultValue={timeValue}
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

export default Demo2;
