import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo1 />,"title":" 数字控件 格式化","code":"/**\n *\n * @title 数字控件 格式化\n * @description 格式化\n *\n */\n\nimport React, { Component } from 'react';\nimport formatNumber from '../../src/index';\n\nclass Demo1 extends Component {\n    render () {\n        return (\n            <div className=\"demoPadding\">\n                <span>示例</span>\n                <div>\n                    #,##0.###0\t: {formatNumber( \"#,##0.###0\", 1234567.890 )} <br/>\n                    ##.000,00\t: {formatNumber( \"##.000,00\", 1234567.890 )} <br/>\n\n                    #,##0.#### : {formatNumber( \"#,##0.####\", 1234567.890 )} <br/>\n                    \n\n                    +#,###,###,###,###,###[.]######## : {formatNumber( \"#,###,###,###,###,###.########\", 1234567.890 )}\n                </div>\n            </div>\n        )\n    }\n}\n\n\n","desc":" 格式化"},{"example":<Demo2 />,"title":" 日期组件 格式化","code":"/**\n *\n * @title 日期组件 格式化\n * @description 格式化\n *\n */\n\nimport React, { Component } from 'react';\nimport formatNumber from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\n\nconst format = \"YYYY-MM-DD dddd\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n    onSelect = (d, dataString)  => {\n        console.log('select')\n        console.log(d, dataString);\n    }\n    onClick = d => {\n        console.log('click')\n    }\n    onChange = (d, dataString) => {\n        console.log('change')\n        console.log(d, dataString)\n    };\n    onDateInputBlur = (e,v) => {\n        console.log(e,v);\n    }\n    render() {\n        var self = this;\n        return (\n            <div>\n                <Row>\n                    <Col md={6}>\n                        <DatePicker\n                            format={format}\n                            onSelect={this.onSelect}\n                            onChange={this.onChange}\n                            onClick={this.onClick}\n                            onDateInputBlur={this.onDateInputBlur}\n                        />\n                    </Col>\n                </Row>\n            </div>\n        );\n    }\n}\n\n\n","desc":" 格式化"}]


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
