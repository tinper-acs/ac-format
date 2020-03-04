# ac-format

    针对多格式、多时区，进行转换输出sdk，目前只提供一个api。 bee-input-number>2.2.11 

## 如何使用

```js

  安装
  ynpm install ac-format --save

  引入
  import formatNumber from "ac-format"; 

  使用 
  ...
 
 formatNumber.formatNumber()

```

### cnd 标签使用

```js  
  <script src="//design.yonyoucloud.com/static/tinper-bee/latest/ac-format/dist/index.js"></script>
```

### 转换规则如下 


分量 | 数字的显示方式 | 示例
-- | -- | --
0 | 表示一个数字，被格式化数值不够的位数会补0 | 7、8 等 |
\# | 表示一个数字，被格式化数值不够的位数会忽略 | 07、08 等 |
[.] | 小数点分隔符的占位符，由方括号标记，方括号里的字符用来标记小数点 | , . 等 |
% | 前缀或后缀，将数值乘以100并显示为百分数 | #[.]##%，%#[.]## |
\u2030 | 前缀或后缀，将数值乘以1000并显示为千分数 | #[.]##\u2030 |
\u00A4 | 前缀或后缀，货币记号，由货币号替换。 |  
E | 科学计数法，根据前面的表达式计算有效位数，将结果按科学计数法表示一般使用E0，而不能使用E# | #[.]##E0
‘ | 单引号，转义字符，如果在结果中需要拼接特殊字符，需要将其包含在单引号中 | '#'#
( | 前缀，使用这个符号代表负数需要用括号来表示，与+不能同时出现 | -3.14表示成(3.14)
\+ | 正负号的符号位，与(不能同时出现 | + ###，###[.]#### |


###  示例

```js

 
以 -10000003.1415926为例

+ ###,###[.]####  =  - 10000,003.1416

###,###,###[.]####### +  =  10,000,003.1415926 -

(### ### ###[,]####### = (10 000 003,1415926)    

(#.####.####[,]####### = (1000.0003,1415926)  

```

## API 


|API|说明|类型|默认值/参数|
|:--|:---:|:--:|---:|
formatNumber             |多格式转换   |function(格式,值)| 备注 | 
getDateFormat             |多时区，转moment对象   |function(格式,值)|- |
getTimeFormat             |多时区，转string 显示对象   |function(格式,值)| -|
getGlobalizationDateFormat|通过上下文设置 datePicker/dateTimePicker   |function(value,dateType,utc,resultType)|dateType 转换类型,是date、还是dateTime【"YYYY-MM-DD"/"YYYY-MM-DD HH:mm:ss",默认 "YYYY-MM-DD"】、resultType  返回数据类型 | 
getGlobalizationTimeFormat|通过上下文设置 timePacker  |function(value,utc,resultType)|- |
getGlobalizationFormatNumber|通过上下文获取多格式  |function(value)|- |

多格式

```js


formatNumber("+ ###,###[.]####", 123456789.123) 

```


多时区

dateTpicker

```js


import {  getDateFormat } from ac-format;

render(){
  let d = '2020/02/06,14:30:06';
  value={getDateFormat(d,"UTC-10:00")}
  //返回Moment对象
  value={getDateFormat(d,"UTC-10:00")}
  //返回时间字符串
  ...
}
    

```



timeTpicker

```js


import {  getDateFormat } from ac-format;

render(){
  let _t = '14:30:06';
  //夏威夷时区
  value = getTimeFormat(_t,'UTC-10:00','hh:mm:ss a');
  //东八区
  value = getTimeFormat(_t,'UT+8:00');
  ...
}
    

```

上下文封装调用
> 在使用前，要保证加载了jDiwork 上下文环境，如果没有的话，需要加载一下js

jDiwork 加载方式一(推荐)

```js
<script src="//cdn.yonyoucloud.com/pro/diwork/download/jDiwork.js"></script>
```

jDiwork 加载方式二


```js
import { initJDiwork } from ac-format;
```



```js


import {  getGlobalizationDateFormat,getGlobalizationTimeFormat } from ac-format;
 
let d = '2020/02/06,14:30:06'; 

//转东八区时间
value = getGlobalizationDateFormat(d,datetime,"UT+8:00",true)

//获取上下文时间
value = getGlobalizationDateFormat(d,datetime)

let _t = '14:30:06';
//获取上下文时间
value = getGlobalizationTimeFormat(_t);

value = getGlobalizationFormatNumber('1000003.45656');
```




## 注意事项

  bee-input-number>2.2.11 
  必须安装 moment 对象。

## 更新日志



