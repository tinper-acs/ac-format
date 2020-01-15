import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo1 />,"title":" 多格式化,数字化组件","code":"/**\n *\n * @title 多格式化,数字化组件\n * @description   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = (10 000 003,1415926); 4. (#.####.####[,]####### = (1000.0003,1415926);\n *\n */\n\nimport React, { Component } from 'react';\nimport { formatNumber } from '../../src/index';\nimport InputNumber from 'bee-input-number';\n\n\nclass Demo3 extends Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            value: '10000003.1415926',\n            value1: '10000003.1415926',\n            value2: '10000003.1415926',\n            value2: '10000003.1415926'\n        }\n    }\n\n    render() {\n        return (\n            <div className=\"demoPadding\">\n                <span>示例</span>\n                <div>\n                    + ###,###[.]####\n                     <InputNumber iconStyle=\"one\" value={10000003.1415926} format={value => `${formatNumber(\"+ ###,###[.]####\", value)}`} onFocus={(value, e) => { this.setState({ value }) }} /> <br />\n\n                    ####,####,####[.]####### +\n                    <InputNumber iconStyle=\"one\" value={10000003.1415926} format={value => `${formatNumber(\"####,####,####[.]####### +\", value)}`} onFocus={(value1, e) => { this.setState({ value1 }) }} /> <br />\n\n                    (### ### ###[,]#######\n                    <InputNumber iconStyle=\"one\" value={10000003.1415926} format={value => `${formatNumber(\"(### ### ###[,]#######\", value)}`} onFocus={(value2, e) => { this.setState({ value2 }) }} /> <br />\n\n                    (#.####.####[,]#######\n                    <InputNumber iconStyle=\"one\" value={10000003.1415926} format={value => `${formatNumber(\"(#.####.####[,]#######\", value)}`} onFocus={(value3, e) => { this.setState({ value3 }) }} /> <br />\n\n                    <br />\n                </div>\n            </div>\n        )\n    }\n}\n\n\n","desc":"   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = "},{"example":<Demo2 />,"title":" 日期组件 格式化","code":"/**\n *\n * @title 日期组件 格式化\n * @description 格式化\n *\n */\n\nimport React, { Component } from 'react';\nimport formatNumber from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\nimport moment from 'moment';\n\nconst format = \"YYYY-MM-DD dddd\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n    onSelect = (d, dataString)  => {\n        console.log('select')\n        console.log(d, dataString);\n    }\n    onClick = d => {\n        console.log('click')\n    }\n    onChange = (d, dataString) => {\n        console.log('change')\n        console.log(d, dataString)\n    };\n    onDateInputBlur = (e,v) => {\n        console.log(e,v);\n    }\n    render() {\n        var self = this;\n        const now = moment().hour(0).minute(0);\n        return (\n            <div>\n                <DatePicker\n                    format={format}\n                    onSelect={this.onSelect}\n                    onChange={this.onChange}\n                    onClick={this.onClick}\n                    onDateInputBlur={this.onDateInputBlur}\n                />\n                <br/>  <br/>\n\n                <Timepicker\n                   format='HH:mm:ss a'\n                    showSecond={false}\n                    defaultValue={now}\n                    placeholder=\"选择时间\"\n                    onChange={this.onChange.bind(this)}\n                    use12Hours\n                />\n\n            </div>\n        );\n    }\n}\n\n\n","desc":" 格式化"}]


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
