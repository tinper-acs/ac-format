import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";
var DemoArray = [{"example":<Demo2 />,"title":" DatePicker、Timepick","code":"/**\n *\n * @title DatePicker、Timepicker 时区 格式化\n * @description 根据多时区普通调用转换时间 getDateFormat,getTimeFormat\n *\n */\nimport React, { Component } from 'react';\nimport {getDateFormat,getTimeFormat } from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\n\nconst format = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n\n    constructor(props){\n        super(props);\n        this.state = {\n            value:'2020/02/06,14:30:06'\n        }\n    }\n\n    \n    onChange = (d, dataString) => {\n        let ut8 = getDateFormat(d,\"UTC+8:00\",format);\n        console.log(ut8)\n    }; \n     \n\n    render() {\n        let ut8 = getDateFormat(this.state.value,\"UTC+8:00\");\n        let showValue = getDateFormat(ut8,\"UTC+9:00\");\n\n        let _t = '20:19:59';\n\n        // let {value:timeValue,format:timeFormat} = getTimeFormat(_t,'UTC-10:00','hh:mm:ss a');\n\n        // let utc8 = getTimeFormat(_t,'UT+8:00').value;\n\n        // console.log(utc8+\" ====time===== \",timeValue);\n        return (\n            <div>\n                {this.state.value}(UTC-10:00) :[编辑态]\n                <DatePicker\n                    format={format} \n                    onChange={this.onChange}\n                    value={showValue} \n                    showTime={true} \n                />\n                <br/><br/>\n\n                {this.state.value}(UTC-10:00) :[浏览态]\n                {getDateFormat(this.state.value,\"UTC-10:00\",format)}\n\n                <br/>  <br/>\n\n                {/* {_t}(UTC-10:00) :\n                <Timepicker\n                    format={timeFormat}\n                    showSecond={false}\n                    defaultValue={timeValue}\n                    placeholder=\"选择时间\"\n                    onChange={(a,b)=>{\n                        console.log(\" --- \",a);\n                    }}\n                    use12Hours\n                /> */}\n            </div>\n        );\n    }\n}\n\n\n","desc":" 根据多时区普通调用转换时间 getDateFormat,getTimeFormat"},{"example":<Demo3 />,"title":" DatePicker、Timepick","code":"/**\n *\n * @title DatePicker、Timepicker 时区 格式化\n * @description 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat\n *\n */\n\nimport React, { Component } from 'react';\nimport {getGlobalizationDateFormat,getGlobalizationTimeFormat} from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\nimport moment from 'moment';\n\nconst defaultFormat = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n\n    constructor(props){\n        super(props);\n\n        window.globalization = {\n            timezone: 'UTC-10:00',\n            locale: 'zh_CN',\n            dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss'}\n        }\n        this.state = {\n            value:'2020/02/06,14:30:06'\n        }\n    }\n \n    onChange = (d, dataString) => {\n        let ut8 = getGlobalizationDateFormat(this.state.value,false,\"UT+8:00\",true);\n        console.log(ut8)\n    }; \n\n    render() { \n        let  __value = getGlobalizationDateFormat(this.state.value,false,\"UT+8:00\",true);\n        let {value,format} = getGlobalizationDateFormat(__value);\n\n        let _t = '20:19:59'; \n        let ut8 = getGlobalizationTimeFormat(_t,\"UT+8:00\",true).value;\n        let {value:timeValue,format:timeFormat} = getGlobalizationTimeFormat(ut8);\n        timeFormat = timeFormat?timeFormat:'HH:mm:ss';\n        return (\n            <div>\n                {this.state.value}(UTC-10:00) :[编辑态]\n                <DatePicker\n                    format={format?format:defaultFormat}\n                    onChange={this.onChange}\n                    value={value} \n                    showTime={true} \n                />\n                <br/><br/>\n\n                {this.state.value}(UTC-10:00) :[浏览态]\n                {getGlobalizationDateFormat(this.state.value,\"UTC-10:00\",timeFormat,true).value}\n\n                <br/>  <br/>\n\n                {_t}(UTC-10:00) :\n                <Timepicker\n                    format={timeFormat}\n                    showSecond={false}\n                    value={timeValue}\n                    placeholder=\"选择时间\"\n                    onChange={(a,b)=>{\n                        console.log(\" --- \",a);\n                    }}\n                    use12Hours\n                />\n            </div>\n        );\n    }\n}\n\n\n","desc":" 调用上下文封装的 getGlobalizationDateFormat ,getGlobalizationTimeFormat"}]


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
