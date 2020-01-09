# ac-format

    针对多格式，进行转换输出sdk，目前只提供一个api。

## 如何使用

```js

  安装
  ynpm install ac-format --save

  引入
  import formatNumber from "ac-format"; 

  使用 
  ...
 
 formatNumber.format()

```

* 另外还可以通过cnd标签引入

```js  
  <script src="//design.yonyoucloud.com/static/tinper-bee/latest/ac-format/dist/index.js"></script>
```

* 转换规则如下 

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
format             |多格式转换   |function(格式,值)| 


```js


format("#,##0.00", 123456789.123)
format("#,##0.00", "123456.789")
format("#,##0.00", 123456.789)
format("#,##0.00", 123456.7)
format("#,##0.00", 123456)
format("#,##0.00", 0)
format("#", -0.1)
format("0", -0.1)
format("0.#", -0.13)
format("#,##0.00", -123)
format("#,##0.00", -123456.789)
    


format("+#,##0.######", +5000.123456789)
format("+#,##0.######", 5000.123456789)
format("#,##0.######", +5000.123456789)
format("+#,##0.######", -5000.123456789)

format("+#,##0.######", +5000.123456789, {enforceMaskSign: true})
format("+#,##0.######", 5000.123456789, {enforceMaskSign: true})
format("#,##0.######", +5000.123456789, {enforceMaskSign: true})
format("+#,##0.######", -5000.123456789, {enforceMaskSign: true})
format("$ +#,###.00", -1234567.890, {enforceMaskSign: true})
format("$ +#,###.00", 1234567.890, {enforceMaskSign: true})
    

```


## 注意事项

## 更新日志



