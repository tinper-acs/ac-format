import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";
var DemoArray = [{"example":<Demo1 />,"title":" 多格式化,数字化组件","code":"/**\n *\n * @title 多格式化,数字化组件\n * @description   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = (10 000 003,1415926); 4. (#.####.####[,]####### = (1000.0003,1415926);\n *\n */\n\nimport React, { Component } from 'react';\nimport { formatNumber } from '../../src/index';\nimport InputNumber from 'bee-input-number';\n\n\nclass Demo1 extends Component {\n    constructor(props) {\n        super(props);\n        let value = '-10000003.1415926',\n        value1 = '10000003.1415926';\n\n        this.state = {\n            value:'-103423003.1415926',\n            value1:'-10000003.1415926',\n            value2:value1,\n            value3:value1,\n            value4:value,\n            value7:-0.123456789,\n        }\n    }\n\n    render() {\n        // const {value,value1,value2,value3} = this.state;\n        return (\n            <div className=\"demoPadding\">\n                <span>示例</span>\n                <div>\n                    + ###,###[.]####\n                     <InputNumber iconStyle=\"one\"\n                        min = '-9007199254740990'\n                        max = '9007199254740990'\n                        precision={3}\n                     value={this.state.value} format={value => `${formatNumber(value,\"####.####[,]#### +\")}`} \n                     \n                     onFocus={(value, e) => this.setState({ value })}\n                     onBlur={(value, e) =>this.setState({ value })}\n                     /> <br />\n \n                    (#,####,####[,]#### +\n                     <InputNumber iconStyle=\"one\"\n                        min = '-9007199254740990'\n                        max = '9007199254740990'\n                        // precision={3}\n                     value={this.state.value7} format={value => `${formatNumber(value,\"####.####[,]#### +\")}`} \n                     onFocus={(value7, e) => this.setState({ value7 })}\n                     onBlur={(value7, e) =>this.setState({ value7 })}\n                     /> <br />\n\n                    ####,####,####[.]####### +\n                    <InputNumber iconStyle=\"one\" value={this.state.value1} \n                    format={value => formatNumber(value,\"####,####,####[.]########### +\")}\n                    minusRight={true}\n                    precision={3}\n                    onFocus={(value1, e) => this.setState({ value1 })}\n                    onBlur={(value1, e) =>this.setState({ value1 })}\n                    /> <br />\n\n                    (### ### ###[,]#######\n                    <InputNumber iconStyle=\"one\"  precision={8} value={this.state.value2} format={value => `${formatNumber(value,\"(### ### ###[,]#######\")}`} \n                    onFocus={(value2, e) =>this.setState({value2})} onBlur={(value2, e) =>this.setState({ value2 })}\n                    /> <br />\n\n                    (#.####.####[,]#######\n                    <InputNumber iconStyle=\"one\" value={this.state.value3} format={value => `${formatNumber(value,\"(#.####.####[,]#######\")}`} \n                      onFocus={(value3, e) =>this.setState({value3})} onBlur={(value3, e) =>this.setState({ value3 })}\n                     /> <br />\n\n                    + ###,###[.]#### 设置 precision :\n                     <InputNumber iconStyle=\"one\" precision={3} value={this.state.value4} format={value => `${formatNumber(value,\"+ ###,###[.]####\")}`} \n                     onFocus={(value4, e) => { this.setState({value4}) }} \n                     onBlur={(value4, e) =>this.setState({ value4 })}\n                     /> <br />\n\n                    <br />\n                </div>\n            </div>\n        )\n    }\n}\n\n","desc":"   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = "},{"example":<Demo2 />,"title":" DatePicker、Timepick","code":"/**\n *\n * @title DatePicker、Timepicker 时区 格式化\n * @description 根据多时区普通调用转换时间 getDateFormat,getTimeFormat\n *\n */\nimport React, { Component } from 'react';\nimport {getDateFormat,getTimeFormat } from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\n\nconst format = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n\n    constructor(props){\n        super(props);\n        this.state = {\n            value:'2020/02/06,14:30:06'\n        }\n    }\n\n    \n    onChange = (d, dataString) => {\n        let ut8 = getDateFormat(d,\"UTC+8:00\",format);\n        console.log(ut8)\n    }; \n     \n\n    render() {\n        let ut8 = getDateFormat(this.state.value,\"UTC+8:00\");\n        let showValue = getDateFormat(ut8,\"UTC+9:00\");\n\n        let _t = '20:19:59';\n\n        let {value:timeValue,format:timeFormat} = getTimeFormat(_t,'UTC-10:00','hh:mm:ss a');\n\n        let utc8 = getTimeFormat(_t,'UT+8:00').value;\n\n        console.log(utc8+\" ====time===== \",timeValue);\n        return (\n            <div>\n                {this.state.value}(UTC-10:00) :[编辑态]\n                <DatePicker\n                    format={format} \n                    onChange={this.onChange}\n                    value={showValue} \n                    showTime={true} \n                />\n                <br/><br/>\n\n                {this.state.value}(UTC-10:00) :[浏览态]\n                {getDateFormat(this.state.value,\"UTC-10:00\",format)}\n\n                <br/>  <br/>\n\n                {_t}(UTC-10:00) :\n                <Timepicker\n                    format={timeFormat}\n                    showSecond={false}\n                    defaultValue={timeValue}\n                    placeholder=\"选择时间\"\n                    onChange={(a,b)=>{\n                        console.log(\" --- \",a);\n                    }}\n                    use12Hours\n                />\n            </div>\n        );\n    }\n}\n\n\n","desc":" 根据多时区普通调用转换时间 getDateFormat,getTimeFormat"},{"example":<Demo3 />,"title":" DatePicker、Timepick","code":"/**\n *\n * @title DatePicker、Timepicker 时区 格式化\n * @description 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat\n *\n */\n\nimport React, { Component } from 'react';\nimport {getGlobalizationDateFormat,getGlobalizationTimeFormat} from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\nimport moment from 'moment';\n\nconst defaultFormat = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo3 extends Component {\n\n    constructor(props){\n        super(props);\n\n        window.globalization = {\n            timezone: 'UTC-10:00',\n            locale: 'zh_CN',\n            dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss'}\n        }\n        this.state = {\n            value:'2020/02/06,14:30:06'\n        }\n    }\n \n    onChange = (d, dataString) => {\n        let ut8 = getGlobalizationDateFormat(this.state.value,false,\"UTC+8:00\",true);\n        console.log(ut8)\n    }; \n\n    render() { \n        let  __value = getGlobalizationDateFormat(this.state.value,false,\"UTC+8:00\",true);\n        let {value,format} = getGlobalizationDateFormat(__value);\n\n        let _t = '20:19:59'; \n        let ut8 = getGlobalizationTimeFormat(_t,\"UTC+8:00\",true).value;\n        let {value:timeValue,format:timeFormat} = getGlobalizationTimeFormat(ut8);\n        timeFormat = timeFormat?timeFormat:'HH:mm:ss';\n        return (\n            <div>\n                {this.state.value}(UTC-10:00) :[编辑态]\n                <DatePicker\n                    format={format?format:defaultFormat}\n                    onChange={this.onChange}\n                    value={value} \n                    showTime={true} \n                />\n                <br/><br/>\n\n                {this.state.value}(UTC-10:00) :[浏览态]\n                {getGlobalizationDateFormat(this.state.value,\"UTC-10:00\",timeFormat,true).value}\n\n                <br/>  <br/>\n\n                {_t}(UTC-10:00) :\n                <Timepicker\n                    format={timeFormat}\n                    showSecond={false}\n                    value={timeValue}\n                    placeholder=\"选择时间\"\n                    onChange={(a,b)=>{\n                        console.log(\" --- \",a);\n                    }}\n                    use12Hours\n                />\n            </div>\n        );\n    }\n}\n\n\n","desc":" 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat"}]


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
