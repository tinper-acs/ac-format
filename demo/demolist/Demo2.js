/**
 *
 * @title 日期组件 时区 格式化
 * @description 时区 格式化
 *
 */

import React, { Component } from 'react';
import {  getDateFormat,getTimeFormat } from '../../src/index';
import DatePicker from "bee-datepicker";
import Timepicker from "bee-timepicker";
import moment from 'moment';

const format = "YYYY-MM-DD HH:mm:ss";
const dateInputPlaceholder = "选择日期";

class Demo2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            value:'2020/02/06,14:30:06'
        }
    }

    onSelect = (d, dataString)  => { 
        // console.log('ut8:',ut8)
    }
    onClick = d => {
        console.log('click')
    }
    onChange = (d, dataString) => {
        let ut8 = getDateFormat(d,"UTC+8:00",format);
        console.log(ut8)
    };
    onDateInputBlur = (e,v) => {
        console.log(e,v);
    } 

    // https://www.cnblogs.com/jiqing9006/p/6652505.html

    // var utc_datetime = "2017-03-31T08:02:06Z";

    // function utc2beijing(utc_datetime) {
    //     // 转为正常的时间格式 年-月-日 时:分:秒
    //     var T_pos = utc_datetime.indexOf('T');
    //     var Z_pos = utc_datetime.indexOf('Z');
    //     var year_month_day = utc_datetime.substr(0,T_pos);
    //     var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    //     var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    //     // 处理成为时间戳
    //     timestamp = new Date(Date.parse(new_datetime));
    //     timestamp = timestamp.getTime();
    //     timestamp = timestamp/1000;

    //     // 增加8个小时，北京时间比utc时间多八个时区
    //     var timestamp = timestamp+8*60*60;

    //     // 时间戳转为时间
    //     var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    //     return beijing_datetime; // 2017-03-31 16:02:06
    // } 

    // console.log(utc2beijing(utc_datetime));


    render() {
        let ut8 = getDateFormat(this.state.value,"UTC+8:00");
        let showValue = getDateFormat(ut8,"UTC+9:00");

        let _t = '20:19:59';

        
        let time = getTimeFormat(_t,'UTC-10:00','hh:mm:ss a');

        let utc8 = getTimeFormat(_t,'UT+8:00');

        console.log(utc8+" ====time===== ",time);
        return (
            <div>
                {this.state.value}(UTC-10:00) :[编辑态]
                <DatePicker
                    format={format}
                    onSelect={this.onSelect}
                    onChange={this.onChange}
                    value={showValue}
                    onClick={this.onClick}
                    showTime={true}
                    onDateInputBlur={this.onDateInputBlur}
                />
                <br/><br/>

                {this.state.value}(UTC-10:00) :[浏览态]
                {getDateFormat(this.state.value,"UTC-10:00",format)}

                <br/>  <br/>


                {_t}(UTC-10:00) :
                <Timepicker
                    format={'hh:mm:ss TT'}
                    showSecond={false}
                    defaultValue={time}
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
