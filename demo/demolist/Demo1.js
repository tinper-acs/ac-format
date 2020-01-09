/**
 *
 * @title 多格式化
 * @description 多格式化 数字控件
 *
 */

import React, { Component } from 'react';
import {formatNumber} from '../../src/index';
import InputNumber from 'bee-input-number';

class Demo1 extends Component {
    render () {
        return (
            <div className="demoPadding">
                <span>示例</span>
                <div> 
                    #,##0.###0	: <InputNumber iconStyle="one" value={1234567.890} format={value => `${formatNumber("#,##0.###0", value)}`} /> <br/>
                    #,##0.#### : <InputNumber iconStyle="one" value={1234567.890} format={value => `${formatNumber( "#,##0.####", value)}`}  /> <br/>
                    {/* format={value => `+ ${value}`}  */}
                    +#,###,###,###,###,###[.]######## : <InputNumber iconStyle="one" value={-1234567.890} format={value => `${formatNumber("##,###,###,###,###,###.########", value)}`} /> <br/>
                    
                    <br/>
                </div>
            </div>
        )
    }
}

export default Demo1;
