/**
 * @title DatePicker、Timepicker 时区 格式化,纯string 类型的操作
 * @description 调用上下文封装的 getGlobalizationDateFormatString  把东八区 转 东七区
 *
 */
import React, { Component } from 'react';
import {getGlobalizationDateFormatString} from '../../src/index';
class Demo4 extends Component {

    constructor(props){
        super(props);

        window.globalization = {
            timezone: 'UTC+07:00',
            locale: 'zh_CN',
            dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM-dd-yyyy HH:mm:ss', timeFormat: 'HH:mm:ss'}
        }
        this.state = {
            value:'2020-02-06 14:30:06'
        }
    }

    render() {
        let  {value:__value} = getGlobalizationDateFormatString(this.state.value,null,"UTC+08:00",'datetime');
        let  {value:__value2,format} = getGlobalizationDateFormatString(__value,"UTC+08:00","UTC+07:00",'datetime');
        return (
            <div>
                <h4>上下文format {format}</h4>

                {this.state.value}(UTC+70:00 转 上下文(utc8)) : {__value} <br/><br/>

                {__value}(UTC+80:00 转 UTC+70:00) : {__value2} <br/>
            </div>
        );
    }
}

export default Demo4;
