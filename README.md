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
formatNumber             |多格式转换   |function(格式,值)| 
getMomentFromUTC             |多时区，转moment对象   |function(格式,值)| 
getStringFromUTC             |多时区，转string 显示对象   |function(格式,值)| 


多格式

```js


formatNumber("+ ###,###[.]####", 123456789.123) 

```


多时区

```js


import {  getMomentFromUTC, getStringFromUTC } from ac-format;

render(){
  let d = '2020/02/06,14:30:06';
  value={getMomentFromUTC(new Date(d),"UTC-10:00")}\

  ...
}
    

```


## 注意事项

  bee-input-number>2.2.11 
  必须安装 moment 对象。

## 更新日志



