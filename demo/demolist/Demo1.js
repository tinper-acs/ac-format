/**
 *
 * @title 多格式化,数字化组件
 * @description   以 -10000003.1415926为例  1.  + ###,###[.]####  =  - 10000,003.1416; 2.###,###,###[.]####### +  =  10,000,003.1415926 - ; 3. (### ### ###[,]####### = (10 000 003,1415926); 4. (#.####.####[,]####### = (1000.0003,1415926);
 *
 */

import React, { Component } from 'react';
import { formatNumber } from '../../src/index';
import InputNumber from 'bee-input-number';


class Demo3 extends Component {
    constructor(props) {
        super(props);
        let value = '-10000003.1415926',
        value1 = '10000003.1415926';

        this.state = {
            value,
            value1:value,
            value2:value1,
            value3:value1,
            value4:value,
        }
    }

    render() {
        // const {value,value1,value2,value3} = this.state;
        return (
            <div className="demoPadding">
                <span>示例</span>
                <div>
                    + ###,###[.]####
                     <InputNumber iconStyle="one" value={this.state.value} format={value => `${formatNumber("+ ###,###[.]####", value)}`} onFocus={(value, e) => { this.setState({ value }) }} /> <br />

                    ####,####,####[.]####### +
                    <InputNumber iconStyle="one" value={this.state.value1} 
                    format={value => formatNumber("####,####,####[.]########### +", value)}
                    minusRight={true}
                    precision={3}
                    onFocus={(value1, e) => this.setState({ value1 })}
                    onBlur={(value1, e) =>this.setState({ value1 })}
                    /> <br />

                    (### ### ###[,]#######
                    <InputNumber iconStyle="one" value={this.state.value2} format={value => `${formatNumber("(### ### ###[,]#######", value)}`} onFocus={(value2, e) => { this.setState({ value2 }) }} /> <br />

                    (#.####.####[,]#######
                    <InputNumber iconStyle="one" value={this.state.value3} format={value => `${formatNumber("(#.####.####[,]#######", value)}`} onFocus={(value3, e) => { this.setState({ value3 }) }} /> <br />

                    + ###,###[.]#### 设置 precision :
                     <InputNumber iconStyle="one" precision={3} value={this.state.value4} format={value => `${formatNumber("+ ###,###[.]####", value)}`} onFocus={(value, e) => { this.setState({ value }) }} /> <br />

                    <br />
                </div>
            </div>
        )
    }
}

export default Demo3;
