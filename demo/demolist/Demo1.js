/**
 *
 * @title 多格式化,数字化组件
 * @description   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = (10 000 003,1415926); 4. (#.####.####[,]####### = (1000.0003,1415926);
 *
 */

import React, { Component } from 'react';
import { getFormatNumber,getGlobalizationFormatNumber} from '../../src/index';
import InputNumber from 'bee-input-number';


class Demo1 extends Component {
    constructor(props) {
        super(props);

        // window.globalization = {
        //     timezone: 'UTC-10:00',
        //     locale: 'zh_CN',
        //     dataformat: {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss'}
        // }

        let value = '-10000003.1415926',
        value1 = '10000003.1415926';

        this.state = {
            value:'-103423003.1415926',
            value1:'-10000003.1415926',
            value2:value1,
            value3:value1,
            value4:value,
            value5:value,
            value7:-0.123456789,
        }
    }

    render() {
        // const {value,value1,value2,value3} = this.state;
        let _v = getFormatNumber('-1000.0000', '#,###,###.###,###,###[.]########+');
        console.log("_v ",_v);
        return (
            <div className="demoPadding">
                <span>示例</span>
                <div>
                    ####.####[,]#### +
                     <InputNumber iconStyle="one"
                        min = '-9007199254740990'
                        max = '9007199254740990'
                        precision={3}
                     value={this.state.value} format={value => `${getFormatNumber(value,"####.####[,]#### +")}`} 
                     
                     onFocus={(value, e) => this.setState({ value })}
                     onBlur={(value, e) =>this.setState({ value })}
                     /> <br /> 
 
                    ####.####[,]#### +
                     <InputNumber iconStyle="one"
                        min = '-9007199254740990'
                        max = '9007199254740990'
                        // precision={3}
                     value={this.state.value7} format={value => `${getFormatNumber(value,"####.####[,]#### +")}`} 
                     onFocus={(value7, e) => this.setState({ value7 })}
                     onBlur={(value7, e) =>this.setState({ value7 })}
                     /> <br />

                    ####,####,####[.]########### +
                    <InputNumber iconStyle="one" value={this.state.value1} 
                    format={value => getFormatNumber(value,"####,####,####[.]########### +")}
                    minusRight={true}
                    precision={3}
                    onFocus={(value1, e) => this.setState({ value1 })}
                    onBlur={(value1, e) =>this.setState({ value1 })}
                    /> <br />

                    (### ### ###[,]#######
                    <InputNumber iconStyle="one"  precision={8} value={this.state.value2} format={value => `${getFormatNumber(value,"(### ### ###[,]#######")}`} 
                    onFocus={(value2, e) =>this.setState({value2})} onBlur={(value2, e) =>this.setState({ value2 })}
                    /> <br />

                    (#.####.####[,]#######
                    <InputNumber iconStyle="one" value={this.state.value3} format={value => `${getFormatNumber(value,"(#.####.####[,]#######")}`} 
                      onFocus={(value3, e) =>this.setState({value3})} onBlur={(value3, e) =>this.setState({ value3 })}
                     /> <br />

                    + ###,###[.]#### 设置 precision :
                     <InputNumber iconStyle="one" precision={3} value={this.state.value4} format={value => `${getFormatNumber(value,"+ ###,###[.]####")}`} 
                     onFocus={(value4, e) => { this.setState({value4}) }} 
                     onBlur={(value4, e) =>this.setState({ value4 })}
                     /> <br />

                    集成上下文API调用(getGlobalizationFormatNumber(value)) :
                     <InputNumber iconStyle="one" precision={3} value={this.state.value5} format={value => `${getGlobalizationFormatNumber(value,'+# ### ### ### ### ###[,]########')}`} 
                     onFocus={(value5, e) => { this.setState({value5}) }} 
                     onBlur={(value5, e) =>this.setState({ value5 })}
                     /> <br />

                    <br />
                </div>
            </div>
        )
    }
}

export default Demo1;