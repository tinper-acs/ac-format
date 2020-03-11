/**
 * @title DatePicker、Timepicker 时区 格式化,纯string 类型的操作
 * @description 调用上下文封装的 getGlobalizationDateFormatString  把东八区 转 东七区
 *
 */
import React, { Component, memo } from 'react';
import moment from 'moment';
import {getGlobalizationDateFormatString,getFromatToFormat} from '../../src/index';
class Demo4 extends Component {

    constructor(props){
        super(props);

        window.globalization = {
            timezone: 'UTC+07:00',
            locale: 'zh_CN',
            dataformat: {dateTimeFormat: 'dd-MM-yyyy HH:mm:ss TT', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM-dd-yyyy', timeFormat: 'HH:mm:ss TT'}
        }
        this.state = {
            value:'2020-02-06 14:30:06'
        }
    }

    render() {
        let toFormat = 'YYYY-MM-DD HH:mm:ss TT';
        let utc8 = "UTC+08:00";

        let  {value:__value} = getGlobalizationDateFormatString(this.state.value,"UTC+07:00",utc8,'datetime',toFormat,toFormat);
        let  {value:__value2,format} = getGlobalizationDateFormatString(__value,utc8,null,'datetime',toFormat,toFormat);
  
        let value3 = '2-6-2020 14:30:06';// 2020 年、2月、6日 14:30:06
        let  {value:newValue3,format:format3} = getGlobalizationDateFormatString(value3,null,utc8,'datetime',null,toFormat);
 
        let value4 = '6-2-2020 14:30:06';// 2020 年、2月、6日 14:30:06
        let  {value:newValue4,format:format4} = getGlobalizationDateFormatString(value4,null,utc8,'datetime','DD-MM-yyyy HH:mm:ss',toFormat);

        let value5 = '02.06.2020 14:30:06';// 2020 年、2月、6日 14:30:06
        let  {value:newValue5,format:format5} = getGlobalizationDateFormatString(value5,utc8,"UTC+07:00",'datetime',null,toFormat);

        let value6 = '02.06.2020 00:00:00';// 2020 年、2月、6日 14:30:06
        let  {value:newValue6,format:format6} = getGlobalizationDateFormatString(value6,utc8,"UTC+07:00",'datetime',null,toFormat);

        let valuFormat = toFormat;
        let  {value:newValue7,format:format7} = getGlobalizationDateFormatString('2020-02-07 01:00:00',"UTC+08:00",null,'datetime',valuFormat);
        let  {value:newValue7_1,format:format7_1} = getGlobalizationDateFormatString('02-07-2020 01:00:00',"UTC+08:00",null,'datetime','MM-DD-YYYY HH:mm:ss');
        let  {value:newValue7_2,format:format7_2} = getGlobalizationDateFormatString('07-02-2020 01:00:00',"UTC+08:00",null,'datetime','DD-MM-YYYY HH:mm:ss');
        console.log(newValue7_1,newValue7_2);
        let value7 = getFromatToFormat('02.06.2020','MM-DD-YYYY','YYYY-MM-DD');

        return (
            <div>
                <h4>上下文 普通时区转换 </h4>

                {this.state.value}(UTC+70:00 转 上下文) : {__value} <br/><br/>

                {__value}(UTC+80:00 转 UTC+70:00) : {__value2} <br/><br/>
 
                ('2019-11-12',"UTC+08:00","UTC+08:00") == > {newValue7} {format7}

                <h4>普通时区转换公共方法 </h4>
                02.06.2020 'MM-DD-YYYY' to 'YYYY-MM-DD' {value7}

                <h4>上下文 高级转换(MM-DD-YYYY)</h4>
                <span>格式为: {format3} 的 {value3} 上下文时区 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>
                <span>值为: {newValue3}</span>


                <h4>上下文 高级转换(DD-MM-YYYY)</h4>
                <span>格式为: {format4} 的 {value4} 上下文时区 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>
                <span>值为: {newValue4}</span>


                <h4>上下文 高级转换(DD-MM-YYYY)反转</h4>
                <span>格式为: {format5} 的 {value5} {utc8} 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>
                <span>值为: {newValue5}</span>


                <h4>上下文 高级转换(MM-DD-YYYY) 零界值 </h4>
                <span>格式为: {format6} 的 {value6} {utc8} 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>
                <span>值为: {newValue6}</span>

            </div>
        );
    }
}

export default Demo4;
