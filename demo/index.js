import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo4 from "./demolist/Demo4";
var DemoArray = [{"example":<Demo4 />,"title":" DatePicker、Timepick","code":"/**\n * @title DatePicker、Timepicker 时区 格式化,纯string 类型的操作\n * @description 调用上下文封装的 getGlobalizationDateFormatString  把东八区 转 东七区\n *\n */\nimport React, { Component, memo } from 'react';\nimport moment from 'moment';\nimport {getGlobalizationDateFormatString,getFromatToFormat} from '../../src/index';\nclass Demo4 extends Component {\n\n    constructor(props){\n        super(props);\n\n        window.globalization = {\n            timezone: 'UTC-09:00',\n            locale: 'zh_CN',\n            dataformat: {dateTimeFormat: 'dd-MM-yyyy HH:mm:ss TT', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM-dd-yyyy', timeFormat: 'HH:mm:ss TT'}\n        }\n        this.state = {\n            value:'2020-02-06 14:10:06'\n        }\n    }\n\n    render() {\n        let toFormat = 'YYYY-MM-DD HH:mm:ss TT';\n        let utc8 = \"UTC+08:00\";\n        //TODO 没有上下文的时区的时候，指定转换不对(设置一个上下文时区)。\n        console.log(\"*********9999999999***\",getGlobalizationDateFormatString('2020-02-06 14:30:06', 'UTC+08:00', null, 'datetime', 'YYYY-MM-DD hh:mm:ss', 'YYYY-MM-DD hh:mm:ss TT'))\n\n        // let begindate = new Date(Date.parse('2020-04-04 14:10:06'.replace(/-/g, \"/\")));\n        // // // let targetTimezone = 7\n        // // // let _dif = new Date().getTimezoneOffset()\n        // // // let east9time = begindate.getTime() + _dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000);\n        // // // console.log(\"---east9time--\",east9time);\n\n\n        // var timezone = 7.25; //目标时区时间，东八区\n        // var offset_GMT = begindate.getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟\n        // var nowDate = begindate.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数\n        // var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);\n\n\n        // console.log(\" : \"+moment(targetDate).format(\"YYYY-MM-DD HH:mm:ss\"));\n\n\n        // let  {value:__value} = getGlobalizationDateFormatString(this.state.value,\"UTC+07:00\",utc8,'datetime',toFormat,toFormat);\n        // let  {value:__value2,format} = getGlobalizationDateFormatString(__value,utc8,null,'datetime',toFormat,toFormat);\n  \n        // let value3 = '2-6-2020 14:30:06';// 2020 年、2月、6日 14:30:06\n        // let  {value:newValue3,format:format3} = getGlobalizationDateFormatString(value3,null,utc8,'datetime',null,toFormat);\n \n        // let value4 = '6-2-2020 14:30:06';// 2020 年、2月、6日 14:30:06\n        // let  {value:newValue4,format:format4} = getGlobalizationDateFormatString(value4,null,utc8,'datetime','DD-MM-yyyy HH:mm:ss',toFormat);\n\n        // let value5 = '02.06.2020 14:30:06';// 2020 年、2月、6日 14:30:06\n        // let  {value:newValue5,format:format5} = getGlobalizationDateFormatString(value5,utc8,\"UTC+07:00\",'datetime',null,toFormat);\n\n        // let value6 = '02.06.2020 00:00:00';// 2020 年、2月、6日 14:30:06\n        // let  {value:newValue6,format:format6} = getGlobalizationDateFormatString(value6,utc8,\"UTC+07:00\",'datetime',null,toFormat);\n\n        // let valuFormat = toFormat;\n        // let  {value:newValue7,format:format7} = getGlobalizationDateFormatString('2020-02-07 01:00:00',\"UTC+08:00\",null,'datetime',valuFormat);\n        // let  {value:newValue7_1,format:format7_1} = getGlobalizationDateFormatString('02-07-2020 01:00:00',\"UTC+08:00\",null,'datetime','MM-DD-YYYY HH:mm:ss');\n        // let  {value:newValue7_2,format:format7_2} = getGlobalizationDateFormatString('07-02-2020 01:00:00',\"UTC+08:00\",null,'datetime','DD-MM-YYYY HH:mm:ss');\n        // console.log(newValue7_1,newValue7_2);\n        // let value7 = getFromatToFormat('02.06.2020','MM-DD-YYYY','YYYY-MM-DD');\n\n        return (\n            <div>\n                <h4>上下文 普通时区转换 </h4>\n{/* \n                {this.state.value}(UTC+70:00 转 上下文) : {__value} <br/><br/>\n\n                {__value}(UTC+80:00 转 UTC+70:00) : {__value2} <br/><br/>\n \n                ('2019-11-12',\"UTC+08:00\",\"UTC+08:00\") == > {newValue7} {format7}\n\n                <h4>普通时区转换公共方法 </h4>\n                02.06.2020 'MM-DD-YYYY' to 'YYYY-MM-DD' {value7}\n\n                <h4>上下文 高级转换(MM-DD-YYYY)</h4>\n                <span>格式为: {format3} 的 {value3} 上下文时区 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue3}</span>\n\n\n                <h4>上下文 高级转换(DD-MM-YYYY)</h4>\n                <span>格式为: {format4} 的 {value4} 上下文时区 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue4}</span>\n\n\n                <h4>上下文 高级转换(DD-MM-YYYY)反转</h4>\n                <span>格式为: {format5} 的 {value5} {utc8} 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue5}</span>\n\n\n                <h4>上下文 高级转换(MM-DD-YYYY) 零界值 </h4>\n                <span>格式为: {format6} 的 {value6} {utc8} 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue6}</span>\n */}\n            </div>\n        );\n    }\n}\n\n\n","desc":" 调用上下文封装的 getGlobalizationDateFormatString  把东八区 转 东七区"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code.replace('../../src/index',COMPONENT).replace('../../src',COMPONENT) }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
