import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";import Demo4 from "./demolist/Demo4";
var DemoArray = [{"example":<Demo1 />,"title":" 多格式化,数字化组件","code":"/**\n *\n * @title 多格式化,数字化组件\n * @description   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = (10 000 003,1415926); 4. (#.####.####[,]####### = (1000.0003,1415926);\n *\n */\n\nimport React, { Component } from 'react';\nimport { getFormatNumber,getGlobalizationFormatNumber} from '../../src/index';\nimport InputNumber from 'bee-input-number';\n\n\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n\n        // window.globalization = {\n        //     timezone: 'UTC-10:00',\n        //     locale: 'zh_CN',\n        //     dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss'}\n        // }\n\n        let value = '-10000003.1415926',\n        value1 = '10000003.1415926';\n\n        this.state = {\n            value:'-103423003.1415926',\n            value1:'-10000003.1415926',\n            value2:value1,\n            value3:value1,\n            value4:value,\n            value5:value,\n            value7:-0.123456789,\n        }\n    }\n\n    render() {\n        // const {value,value1,value2,value3} = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <span>示例</span>\n                <div>\n                    + ###,###[.]####\n                     <InputNumber iconStyle=\"one\"\n                        min = '-9007199254740990'\n                        max = '9007199254740990'\n                        precision={3}\n                     value={this.state.value} format={value => `${getFormatNumber(value,\"####.####[,]#### +\")}`} \n                     \n                     onFocus={(value, e) => this.setState({ value })}\n                     onBlur={(value, e) =>this.setState({ value })}\n                     /> <br />\n \n                    (#,####,####[,]#### +\n                     <InputNumber iconStyle=\"one\"\n                        min = '-9007199254740990'\n                        max = '9007199254740990'\n                        // precision={3}\n                     value={this.state.value7} format={value => `${getFormatNumber(value,\"####.####[,]#### +\")}`} \n                     onFocus={(value7, e) => this.setState({ value7 })}\n                     onBlur={(value7, e) =>this.setState({ value7 })}\n                     /> <br />\n\n                    ####,####,####[.]####### +\n                    <InputNumber iconStyle=\"one\" value={this.state.value1} \n                    format={value => getFormatNumber(value,\"####,####,####[.]########### +\")}\n                    minusRight={true}\n                    precision={3}\n                    onFocus={(value1, e) => this.setState({ value1 })}\n                    onBlur={(value1, e) =>this.setState({ value1 })}\n                    /> <br />\n\n                    (### ### ###[,]#######\n                    <InputNumber iconStyle=\"one\"  precision={8} value={this.state.value2} format={value => `${getFormatNumber(value,\"(### ### ###[,]#######\")}`} \n                    onFocus={(value2, e) =>this.setState({value2})} onBlur={(value2, e) =>this.setState({ value2 })}\n                    /> <br />\n\n                    (#.####.####[,]#######\n                    <InputNumber iconStyle=\"one\" value={this.state.value3} format={value => `${getFormatNumber(value,\"(#.####.####[,]#######\")}`} \n                      onFocus={(value3, e) =>this.setState({value3})} onBlur={(value3, e) =>this.setState({ value3 })}\n                     /> <br />\n\n                    + ###,###[.]#### 设置 precision :\n                     <InputNumber iconStyle=\"one\" precision={3} value={this.state.value4} format={value => `${getFormatNumber(value,\"+ ###,###[.]####\")}`} \n                     onFocus={(value4, e) => { this.setState({value4}) }} \n                     onBlur={(value4, e) =>this.setState({ value4 })}\n                     /> <br />\n\n                    集成上下文API调用(getGlobalizationFormatNumber(value)) :\n                     <InputNumber iconStyle=\"one\" precision={3} value={this.state.value5} format={value => `${getGlobalizationFormatNumber(value,'+# ### ### ### ### ###[,]########')}`} \n                     onFocus={(value5, e) => { this.setState({value5}) }} \n                     onBlur={(value5, e) =>this.setState({ value5 })}\n                     /> <br />\n\n                    <br />\n                </div>\n            </div>\n        )\n    }\n}\n\n","desc":"   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = "},{"example":<Demo2 />,"title":" DatePicker、Timepick","code":"/**\n *\n * @title DatePicker、Timepicker 时区 格式化\n * @description 根据多时区普通调用转换时间 getDateFormat,getTimeFormat,配合moment对象使用\n *\n */\nimport React, { Component } from 'react';\nimport {getDateFormat,getTimeFormat } from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\n\nconst format = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n\n    constructor(props){\n        super(props);\n        this.state = {\n            value:'2020/02/06,14:30:06'\n        }\n    }\n\n    \n    onChange = (d, dataString) => {\n        let ut8 = getDateFormat(d,\"UTC+8:00\",format);\n        console.log(\"ut8:\",ut8)\n    }; \n     \n\n    render() {\n        // let ut8 = getDateFormat(this.state.value,\"UTC+8:00\",\"UTC+9:00\");\n        let showValue =  getDateFormat(this.state.value,\"UTC+8:00\",\"UTC+9:00\");\n        //getDateFormat(ut8,\"UTC+9:00\");\n\n        let _t = '20:19:59';\n\n        let {value:timeValue,format:timeFormat} = getTimeFormat(_t,'UTC-10:00','UTC+08:00','hh:mm:ss a');\n\n        // let utc8 = getTimeFormat(_t,'UT+8:00').value;\n\n        // console.log(utc8+\" ====time===== \",timeValue);\n        return (\n            <div>\n                {this.state.value}(UTC+9:00) :[编辑态]\n                <DatePicker\n                    format={format} \n                    onChange={this.onChange}\n                    value={showValue} \n                    showTime={true} \n                />\n                <br/><br/>\n\n                {this.state.value}(UTC-10:00) :[浏览态]\n                {/* {getDateFormat(this.state.value,\"UTC+8:00\",\"UTC-10:00\",format)} */}\n\n                <br/>  <br/>\n\n                {_t}(UTC-10:00) :\n                <Timepicker\n                    format={timeFormat}\n                    showSecond={false}\n                    defaultValue={timeValue}\n                    placeholder=\"选择时间\"\n                    onChange={(a,b)=>{\n                        console.log(\" --- \",a);\n                    }}\n                    use12Hours\n                />\n            </div>\n        );\n    }\n}\n\n\n","desc":" 根据多时区普通调用转换时间 getDateFormat,getTimeFormat,配合moment对象使用"},{"example":<Demo3 />,"title":" DatePicker、Timepick","code":"/**\n *\n * @title DatePicker、Timepicker 时区 格式化\n * @description 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat\n *\n */\n\nimport React, { Component } from 'react';\nimport {getGlobalizationDateFormat,getGlobalizationTimeFormat} from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\nimport moment from 'moment';\n\nconst defaultFormat = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo3 extends Component {\n\n    constructor(props){\n        super(props);\n\n        window.globalization = {\n            timezone: 'UTC+07:00',\n            locale: 'zh_CN',\n            dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss TT', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss tt'}\n        }\n        this.state = {\n            value:'2020-02-06 14:30:06'\n        }\n    }\n \n    onChange = (d, dataString) => {\n        let ut8 = getGlobalizationDateFormat(d,'datetime',\"UTC+08:00\",true);\n        console.log(ut8)\n    }; \n\n    render() {\n        let  {value:__value} = getGlobalizationDateFormat(this.state.value,'datetime',\"UTC+08:00\",true);\n        let {value,format} = getGlobalizationDateFormat(__value,'datetime');\n\n        let _t = '20:19:59';  \n        let {value:timeValue,format:timeFormat} = getGlobalizationTimeFormat(_t,\"UTC+08:00\",null);\n        timeFormat = timeFormat?timeFormat:'HH:mm:ss';\n        return (\n            <div>\n                {this.state.value}(UTC+09:00) :[编辑态] {format}\n                <DatePicker\n                    format={format?format:defaultFormat}\n                    onChange={this.onChange}\n                    value={value} \n                    showTime={true} \n                />\n                <br/><br/>\n\n                {this.state.value}(UTC-10:00):[浏览态]\n                {getGlobalizationDateFormat(this.state.value,'datetime',\"UTC+09:00\",true).value}\n\n                <br/>  <br/>\n\n                {_t}(UTC-10:00) :\n                <Timepicker\n                    format={timeFormat}\n                    showSecond={false}\n                    value={timeValue}\n                    placeholder=\"选择时间\"\n                    use12Hours={timeFormat.indexOf(\"H\") !== -1?true:false}\n                />\n            </div>\n        );\n    }\n}\n\n\n","desc":" 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat"},{"example":<Demo4 />,"title":" DatePicker、Timepick","code":"/**\n * @title DatePicker、Timepicker 时区 格式化,纯string 类型的操作\n * @description 调用上下文封装的 getGlobalizationDateFormatString  把东八区 转 东七区\n *\n */\nimport React, { Component, memo } from 'react';\nimport moment from 'moment';\nimport {getGlobalizationDateFormatString,getFromatToFormat} from '../../src/index';\nclass Demo4 extends Component {\n\n    constructor(props){\n        super(props);\n\n        // window.globalization = {\n        //     timezone: 'UTC+07:00',\n        //     locale: 'zh_CN',\n        //     dataformat: {dateTimeFormat: 'dd-MM-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM-dd-yyyy', timeFormat: 'HH:mm:ss'}\n        // }\n        this.state = {\n            value:'2020-02-06 14:30:06'\n        }\n    }\n\n    render() {\n        let toFormat = 'YYYY-MM-DD HH:mm:ss';\n        let utc8 = \"UTC+08:00\";\n\n        let  {value:__value} = getGlobalizationDateFormatString(this.state.value,null,utc8,'datetime');\n        let  {value:__value2,format} = getGlobalizationDateFormatString(__value,utc8,\"UTC+07:00\",'datetime');\n  \n        let value3 = '2-6-2020 14:30:06';// 2020 年、2月、6日 14:30:06\n        let  {value:newValue3,format:format3} = getGlobalizationDateFormatString(value3,null,utc8,'datetime',null,toFormat);\n \n        let value4 = '6-2-2020 14:30:06';// 2020 年、2月、6日 14:30:06\n        let  {value:newValue4,format:format4} = getGlobalizationDateFormatString(value4,null,utc8,'datetime','DD-MM-yyyy HH:mm:ss',toFormat);\n\n        let value5 = '02.06.2020 14:30:06';// 2020 年、2月、6日 14:30:06\n        let  {value:newValue5,format:format5} = getGlobalizationDateFormatString(value5,utc8,\"UTC+07:00\",'datetime',null,toFormat);\n\n        let value6 = '02.06.2020 00:00:00';// 2020 年、2月、6日 14:30:06\n        let  {value:newValue6,format:format6} = getGlobalizationDateFormatString(value6,utc8,\"UTC+07:00\",'datetime',null,toFormat);\n\n        let valuFormat = toFormat;\n        let  {value:newValue7,format:format7} = getGlobalizationDateFormatString('2020-02-07 01:00:00',\"UTC+08:00\",null,'datetime',valuFormat);\n        let  {value:newValue7_1,format:format7_1} = getGlobalizationDateFormatString('02-07-2020 01:00:00',\"UTC+08:00\",null,'datetime','MM-DD-YYYY HH:mm:ss');\n        let  {value:newValue7_2,format:format7_2} = getGlobalizationDateFormatString('07-02-2020 01:00:00',\"UTC+08:00\",null,'datetime','DD-MM-YYYY HH:mm:ss');\n        console.log(newValue7_1,newValue7_2);\n        let value7 = getFromatToFormat('02.06.2020','MM-DD-YYYY','YYYY-MM-DD');\n\n        return (\n            <div>\n                <h4>上下文 普通时区转换 </h4>\n\n                {this.state.value}(UTC+70:00 转 上下文) : {__value} <br/><br/>\n\n                {__value}(UTC+80:00 转 UTC+70:00) : {__value2} <br/><br/>\n\n            \n                ('2019-11-12',\"UTC+08:00\",\"UTC+08:00\") == > {newValue7} {format7}\n\n                <h4>普通时区转换公共方法 </h4>\n                02.06.2020 'MM-DD-YYYY' to 'YYYY-MM-DD' {value7}\n\n                <h4>上下文 高级转换(MM-DD-YYYY)</h4>\n                <span>格式为: {format3} 的 {value3} 上下文时区 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue3}</span>\n\n\n                <h4>上下文 高级转换(DD-MM-YYYY)</h4>\n                <span>格式为: {format4} 的 {value4} 上下文时区 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue4}</span>\n\n\n                <h4>上下文 高级转换(DD-MM-YYYY)反转</h4>\n                <span>格式为: {format5} 的 {value5} {utc8} 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue5}</span>\n\n\n                <h4>上下文 高级转换(MM-DD-YYYY) 零界值 </h4>\n                <span>格式为: {format6} 的 {value6} {utc8} 转成 {window.globalization && window.globalization.timezone} 区, 格式为: {toFormat} </span>\n                <span>值为: {newValue6}</span>\n\n            </div>\n        );\n    }\n}\n\n\n","desc":" 调用上下文封装的 getGlobalizationDateFormatString  把东八区 转 东七区"}]


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
