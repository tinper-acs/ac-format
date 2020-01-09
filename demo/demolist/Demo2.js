/**
 *
 * @title 日期组件 格式化
 * @description 格式化
 *
 */

import React, { Component } from 'react';
import formatNumber from '../../src/index';
import DatePicker from "bee-datepicker";
import Timepicker from "bee-timepicker";
import moment from 'moment';

const format = "YYYY-MM-DD dddd";
const dateInputPlaceholder = "选择日期";

class Demo2 extends Component {
    onSelect = (d, dataString)  => {
        console.log('select')
        console.log(d, dataString);
    }
    onClick = d => {
        console.log('click')
    }
    onChange = (d, dataString) => {
        console.log('change')
        console.log(d, dataString)
    };
    onDateInputBlur = (e,v) => {
        console.log(e,v);
    }
    render() {
        var self = this;
        const now = moment().hour(0).minute(0);
        return (
            <div>
                <DatePicker
                    format={format}
                    onSelect={this.onSelect}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    onDateInputBlur={this.onDateInputBlur}
                />
                <br/>  <br/>

                <Timepicker
                   format='HH:mm:ss a'
                    showSecond={false}
                    defaultValue={now}
                    placeholder="选择时间"
                    onChange={this.onChange.bind(this)}
                    use12Hours
                />

            </div>
        );
    }
}

export default Demo2;
