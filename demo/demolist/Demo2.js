/**
 *
 * @title 日期组件 时区 格式化
 * @description 时区 格式化
 *
 */

import React, { Component } from 'react';
import {  getDateFormat } from '../../src/index';
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

    render() {
        // const now = moment().hour(0).minute(0);
        // let d = '2020/02/06,14:30:06';
        let ut8 = getDateFormat(this.state.value,"UTC+8:00");
        let showValue = getDateFormat(ut8,"UTC-10:00");
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

                {/* <Timepicker
                   format='HH:mm:ss a'
                    showSecond={false}
                    defaultValue={now}
                    placeholder="选择时间"
                    onChange={this.onChange.bind(this)}
                    use12Hours
                /> */}

            </div>
        );
    }
}

export default Demo2;
