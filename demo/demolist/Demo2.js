/**
 *
 * @title DatePicker、Timepicker 时区 格式化 设置多语
 * @description 根据多时区普通调用转换时间 getDateFormat,getTimeFormat,配合moment对象使用
 *
 */
import React, { Component } from 'react';
import {getDateFormat,getTimeFormat } from '../../src/index';
import DatePicker from "bee-datepicker";
import Timepicker from "bee-timepicker";
import enUS from "bee-datepicker/build/locale/en_US";
import moment from 'moment';
const format = "YYYY-MM-DD HH:mm:ss TT";
const dateInputPlaceholder = "选择日期";
moment.locale('en');
class Demo2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            value:'2020-02-06 14:30:06'
        }
    }

    
    onChange = (d, dataString) => {
        let ut8 = getDateFormat(d,"UTC+08:00",format);
        console.log("ut8:",ut8)
    }; 
     

    render() {
        let ut8 = getDateFormat(this.state.value,"UTC+08:00");
        let showValue =  getDateFormat(ut8,"UTC+09:00");

        let _t = '20:19:59';
        let {value:timeValue,format:timeFormat} = getTimeFormat(_t,'UTC+08:00','UTC-10:00','HH:mm:ss TT');

        return (
            <div>
                {this.state.value}(UTC+09:00) :[编辑态]{format} 
                <DatePicker
                    format={format.replace("TT","A").replace("tt","a")} 
                    onChange={this.onChange}
                    value={showValue}
                    showTime={true}
                    locale={enUS}
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
                    use12Hours={timeFormat.indexOf("H") !== -1?true:false}
                />
            </div>
        );
    }
}

export default Demo2;
