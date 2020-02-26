import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo2 from "./demolist/Demo2";
var DemoArray = [{"example":<Demo2 />,"title":" 日期组件 时区 格式化","code":"/**\n *\n * @title 日期组件 时区 格式化\n * @description 时区 格式化\n *\n */\n\nimport React, { Component } from 'react';\nimport {  getTimezoneUTCDate} from '../../src/index';\nimport DatePicker from \"bee-datepicker\";\nimport Timepicker from \"bee-timepicker\";\nimport moment from 'moment';\n\nconst format = \"YYYY-MM-DD HH:mm:ss\";\nconst dateInputPlaceholder = \"选择日期\";\n\nclass Demo2 extends Component {\n\n    constructor(props) {\n        super(props);\n        this.state = {\n            value:'2020/02/06,14:30:06'\n        }\n    }\n\n    onSelect = (d, dataString)  => {\n        console.log('select')\n        console.log(d, dataString);\n    }\n    onClick = d => {\n        console.log('click')\n    }\n    onChange = (d, dataString) => {\n        this.setState({\n            value:getTimezoneUTCDate(d,\"UTC+8:00\").format(format)\n        })\n        // let ccc = getTimezoneUTCDate(dataString,\"UTC-10:00\").format(format)\n        console.log(\" 8**** \",getTimezoneUTCDate(ccc,\"UTC+8:00\").format(format));\n\n        console.log('change')\n        console.log(d, dataString)\n    };\n    onDateInputBlur = (e,v) => {\n        console.log(e,v);\n    }\n\n\n    /**根据当前时间获取选中时区对应UTC时间示例 \n     * (UTC+08:00),北京，重庆，香港特别行政区，乌鲁木齐\n     * 北京时间：东八区，比UTC时间早8个小时\n     * 2019/11/05，20:08:36\n     * 将所有数据转化为毫秒完成计算\n     */\n    getTimeFromUTC = (val,format) => {\n        // const { currentTime } = this.state;\n        let currentTime = new Date('2020/02/06,14:25:15');\n        if (!val ) {\n            return;\n        }\n        /** 当前时间和UTC时间相差的分钟数 转为为毫秒 \n         * 当前时间+getTimezoneOffset = UTC时间 */\n        const _curOffset = currentTime.getTimezoneOffset();\n        /** 选中时间的UTC值(包含+- 小时差) 与当前时间差值\n         * 例子：UTC+4是东四区，4+(-8) = -4 即东四区与UTC的偏移时间\n         * 添加分钟偏移，有04:30,04:45等\n         */\n        const endIndex = val.indexOf(')');\n        const _UTCString = val.substring(4, endIndex) || '0:0';\n        const _UTCTime = _UTCString.split(':');\n\n        const diff = (_UTCTime[0] - 0) * 60 + (_UTCTime[1] - 0) + _curOffset;\n        /** 更新计算选中时间的毫秒数并格式化 */\n        const _ret = new Date((currentTime.getTime() + diff * 60000)).Format('YYYY/MM/DD,hh:mm:ss');\n        return _ret;\n    }\n\n    render() {\n        const {value} = this.state;\n        const now = moment().hour(0).minute(0);\n        console.log(now);\n        let d = '2020/02/07,14:30:06';\n        \n        let showValue = getTimezoneUTCDate(value,\"UTC+8:00\").format(format);\n\n        // const a = (aa) => {\n        //     return aa;\n        // }\n\n        // let c = a(()=>{\n\n        // })\n\n\n        return (\n            <div>\n                {d}(UTC-10:00) :[编辑态]\n                <DatePicker\n                    format={format}\n                    onSelect={this.onSelect}\n                    onChange={this.onChange}\n                    value={getTimezoneUTCDate(showValue,\"UTC-10:00\")}\n                    onClick={this.onClick}\n                    onDateInputBlur={this.onDateInputBlur}\n                />\n                <br/><br/>\n\n                {d}(UTC-10:00) :[浏览态]\n                {getTimezoneUTCDate(d,\"UTC-10:00\",format)}\n\n                <br/>  <br/>\n\n                <Timepicker\n                   format='HH:mm:ss a'\n                    showSecond={false}\n                    defaultValue={now}\n                    placeholder=\"选择时间\"\n                    onChange={this.onChange.bind(this)}\n                    use12Hours\n                />\n\n            </div>\n        );\n    }\n}\n\n\n","desc":" 时区 格式化"}]


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
