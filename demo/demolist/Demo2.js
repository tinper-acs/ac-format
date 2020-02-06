/**
 *
 * @title 日期组件 时区 格式化
 * @description 时区 格式化
 *
 */

import React, { Component } from 'react';
import {  getMomentFromUTC, getStringFromUTC } from '../../src/index';
import DatePicker from "bee-datepicker";
import Timepicker from "bee-timepicker";
import moment from 'moment';

const format = "YYYY-MM-DD HH:mm:ss";
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


    /**根据当前时间获取选中时区对应UTC时间示例 
     * (UTC+08:00),北京，重庆，香港特别行政区，乌鲁木齐
     * 北京时间：东八区，比UTC时间早8个小时
     * 2019/11/05，20:08:36
     * 将所有数据转化为毫秒完成计算
     */
    getTimeFromUTC = (val,format) => {
        // const { currentTime } = this.state;
        let currentTime = new Date('2020/02/06,14:25:15');
        if (!val ) {
            return;
        }
        /** 当前时间和UTC时间相差的分钟数 转为为毫秒 
         * 当前时间+getTimezoneOffset = UTC时间 */
        const _curOffset = currentTime.getTimezoneOffset();
        /** 选中时间的UTC值(包含+- 小时差) 与当前时间差值
         * 例子：UTC+4是东四区，4+(-8) = -4 即东四区与UTC的偏移时间
         * 添加分钟偏移，有04:30,04:45等
         */
        const endIndex = val.indexOf(')');
        const _UTCString = val.substring(4, endIndex) || '0:0';
        const _UTCTime = _UTCString.split(':');

        const diff = (_UTCTime[0] - 0) * 60 + (_UTCTime[1] - 0) + _curOffset;
        /** 更新计算选中时间的毫秒数并格式化 */
        const _ret = new Date((currentTime.getTime() + diff * 60000)).Format('YYYY/MM/DD,hh:mm:ss');
        return _ret;
    }

    render() {
        var self = this;
        const now = moment().hour(0).minute(0);
        let d = '2020/02/06,14:30:06';
        return (
            <div>
                {d}(UTC-10:00) :[编辑态]
                <DatePicker
                    format={format}
                    onSelect={this.onSelect}
                    onChange={this.onChange}
                    value={getMomentFromUTC(new Date(d),"UTC-10:00")}
                    onClick={this.onClick}
                    onDateInputBlur={this.onDateInputBlur}
                />
                <br/><br/>

                {d}(UTC-10:00) :[浏览态]
                {getStringFromUTC(new Date(d),"UTC-10:00",format)}

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
