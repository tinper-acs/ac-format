import formatnumber from './formatNumber';
import moment from 'moment';

const defaultFormat = '+ ###,###[.]####';
const numberFormat = '0000000000000';
const strFormat = '#############';
const defaultUtc = 8;
const dafaultDateFormat = 'YYYY-MM-DD';
let dafaultTimeDateFormat = dafaultDateFormat+" HH:mm:ss";

moment.updateLocale('zh-cn', {
    meridiem : function (hour, minute, isLowercase) {
        if (hour < 13) {
            return isLowercase?"am":"AM";
        } else {
            return isLowercase?"pm":"PM";
        }
    }
});

/**
 * 千分位的数量
 * @param {*} format
 */
const getPrecisionLen = (format) => {
    if (format.indexOf("[") === -1) return format;
    let i = 0, lenStr = String(format.split("[")[0]),
        _format = lenStr.split('').reverse().join('');
    for (let index = 0; index < _format.length; index++) {
        const element = _format[index];
        if (i !== 0 && _format[index] !== "#") {
            return i;
        }
        if (_format[index] === "#") {
            i = i == 0 ? 1 : (i + 1);
        }
    }
    return i;
}

/**
 * 处理0.x,或负数
 * @param {} format
 */
const getDecimalFormat = (format, decimal, _precFormatStr) => {
    let lenStr = String(format.split("[")[0]),
        _format = lenStr.split('').reverse().join('');
    //获取千分位字符 ####/###
    // let precStr = strFormat.substring(0,decimal);
    //获取千分位符号字符,
    let precDec = _format.substring(decimal, decimal + 1);
    //获取[.] 中的 .
    let _prIndex = format.indexOf("]");
    let _prStr = format.substring((_prIndex - 1), (_prIndex));
    // "0,####.000"
    return "0" + precDec + _prStr + _precFormatStr;
}
/**
 * 根据数值，format格式
*/
const getPrecFormat = (format, value, b) => {
    let sp = format.indexOf("]");
    if (sp === -1) {
        console.log(format + " format is error , setting  defaultFormat: " + defaultFormat);
        format = defaultFormat;
    }
    let r = format.split("]")[1].indexOf("+") !== -1 && b ? " +" : "";
    let precV = value.indexOf(".") !== -1 ? value.split(".")[1] : "";//返回小数位的数据

    let _precFormatStr = numberFormat.substring(0, precV.length);//获取小数位的格式字符

    if (String(value).replace("-", "").substring(0, 1) === "0") {//处理0.x的数据
        let splitStr = format[sp -1];
        return "0" + splitStr + _precFormatStr;
        //return getDecimalFormat(format,getPrecisionLen(format),_precFormatStr);
    }
    return format.substring(0, sp + 1) + _precFormatStr + r;
    // return format.substring(0,sp+1)+numberFormat.substring(0,precV.length)+r;
}

/**
 * 判断value、format 负数左右。
 * 负数在右边，返回是个字符串
*/
const getNegative = (format, value) => {
    const isNumber = (v) => {
        return !isNaN(Number(v)) ? true : false;
    }
    if (!value || value === "") return value;
    let _value = String(value);
    if (_value.indexOf("-") === -1) return value;
    if (format.indexOf("+") === -1) return value;
    if (value === 0 || _value === "0") return value;
    if (format.indexOf("+") === 0) {
        return isNumber(value) ? value : _value;
    } else {
        return (_value.replace("-", "")) + "-";
    }
}

// getFullNum = (num,)=>{
//     //处理非数字
//     if(isNaN(num)){return num};

//     //处理不需要转换的数字
//     var str = ''+num;
//     if(!/e/i.test(str)){return num;};
//     let _precision = this.props.precision?this.props.precision:18;
//     return (Number(num)).toFixed(_precision).replace(/\.?0+$/, "");
// }


const getFormatNumber = (value,format) => {
    if (!value || value === "") return value;
    // if (Number(value) === 0) return value;

    let b = String(value).indexOf('-') != -1 ? true : false;//标记负数
    // let decimal = String(value).indexOf(".")?String(value).split(".")[1]:null;
    let _format = getPrecFormat(format, String(value), b);
    value = b ? String(Number(String(value).replace('-', "")) * (-1)) : String(value);
    format = format.replace("(", "+");//规范负数

    _format = _format.replace("[", "").replace("]", "");//规范分隔符
    _format = _format.replace(" +", "").replace("+", "").replace("+ ", "").replace("+", "").replace("(", "").replace(" ", "");

    value = formatnumber(_format, value);
    // value = Number(decimal) ===0?value+"."+decimal:value;//处理100.00的数据
    let nage = getNegative(format, value);
    return nage;
}

const getOffsetMinute = (val) => {
    if (val.indexOf("UTC") == -1) return;
    let sym = val.indexOf("+") != -1 ? "+" : "-";
    let utc = val.split(sym)[1];
    let utcMinute = Number(utc.split(":")[0]) * 60 + Number(utc.split(":")[1]);
    return Number(sym + utcMinute);
}

const getDateFormat = (value, utc = 'UTC+08:00', format) => {
    if (!value) return null;
    if (format) {
        format = format.replace("yyyy","YYYY").replace("dd","DD");
        format = format && format.indexOf("TT") != -1?format.replace("HH","hh"):format;
        format = format && format.replace("TT","A").replace("tt","a").trim();
        // format = format && format.replace("hh","HH");//所有的时间，都按照24小时制来处理。
        let t = moment(value).utcOffset(getOffsetMinute(utc)).format(format);
        return t;
    } else {
        return moment(value).utcOffset(getOffsetMinute(utc));
    }
}

/**
 * 处理时分秒的数据。
 * @param {*} value
 * @param {*} utc
 * @param {*} format  必须是24小时制，进行处理。
 * @param {*} resultType
 */
const getTimeFormat = (value,valueUtc = 'UTC+08:00', utc = 'UTC+08:00', format ="HH:mm:ss",resultType) => {
  if(value.indexOf(":") === -1)return value;
  if (utc.indexOf("UTC") === -1) return value;
  //24小时制进行处理
  let _format = format && format.replace("hh","HH").replace("TT","").replace("tt","").trim();
  let _value = getDateUTCString("2020-02-03 "+value,valueUtc,utc);
  _value = moment(_value);//.locale('en');
  _value = resultType?_value.format(_format):_value;
  return {value:_value,format:format && format.replace("TT","A").replace("tt","a")};
}

const dataformat = {dateTimeFormat: 'MM-dd-yyyy HH:mm:ss', numberFormat: '+# ### ### ### ### ###[,]########', dateFormat: 'MM.DD.YYYY', timeFormat: 'HH:mm:ss'};

const globalizationDateFormat = (result) => {
    getjDiworkGlobalization(globalization=>{
        result(globalization);
    })
    // let globalization = getjDiworkGlobalization();
    // if(globalization && globalization.timezone && globalization.dataformat){
    //     return result(globalization);
    // }
    // globalization = window.cb && cb.rest && cb.rest.AppContext && cb.rest.AppContext.globalization && cb.rest.AppContext.globalization||null;
    // const cnGlobalization = window.globalization && window.globalization||null;
    // globalization = globalization?globalization:cnGlobalization;
    // if(!globalization || !globalization.dataformat || !globalization.timezone){
    //     console.log("在当前环境中,未找到 globalization 上下文!");
    //     return result(null);
    // }
    // return result(globalization);
}

/**
 * 根据时区转换 "YYYY-MM-DD"/"YYYY-MM-DD HH:mm:ss",默认 "YYYY-MM-DD"
 * @param {*} value
 * @param {*} dateType 转换类型,是date、还是dateTime
 * @param {*} resultType  返回数据类型
 */
const getGlobalizationDateFormat = (value,utc,dateType,format,resultType = null) => {
    let _value = resultType?value:moment(value);
    let _format = format;
    globalizationDateFormat(_glo=>{
        _format = _glo && _glo.dataformat && _glo.dataformat;
        if(dateType && dateType.toLocaleLowerCase() ==="datetime"){
            _format = format?format:_format && _format['dateTimeFormat']?_format['dateTimeFormat']:null;
        }else{
            _format = format?format:_format &&_format['dateFormat']?_format['dateFormat']:null;
        }
        if(_glo && _glo['timezone']){
            _format = _format && _format.replace("yyyy","YYYY").replace("dd","DD");
            _value = getDateFormat(value,utc?utc:_glo['timezone'],resultType?_format:null);
        }
    });
    _format = _format && _format.replace("TT","A").replace("tt","a").trim();
    return {value:_value,format:_format};
}
const getStrUtcNum = (utc = 'UTC+08:00') =>{
    utc = utc.toLocaleUpperCase();
    if (utc.indexOf("UTC") === -1 || utc.length !== 9){
        console.log(" utc format is error ! "+utc);
        return 8;
    }
    let mintus = Number(utc.substring(3,6));
    mintus = mintus<0?-1:1;
    return Number(utc.substring(3,6)) + (Number(utc.split(":")[1])/60)*mintus;
}

/**
 * 根据已知时区，求转换时区
 * @param {*} value 字符串类型
 * @param {*} valueUtc 已知时区
 * @param {*} utc   转换时区
 * @param {*} resultType
 */
const getDateUTCString = (value,valueUtc = 'UTC+08:00' ,utc = 'UTC+08:00') =>{
    if(!value)return value;
    value = moment(value).format(dafaultTimeDateFormat);//去掉PM/AM 或者值中的其他字符
    let _value = new Date(Date.parse(value.replace(/-/g, "/")));
    let _valueOffset = getStrUtcNum(valueUtc)*-1*60;
    return new Date(_value.getTime() + _valueOffset * 60 * 1000 + getStrUtcNum(utc) * 60 * 60 * 1000);
}
// const getDateUTCString_back = (value,valueUtc = 'UTC+08:00' ,utc = 'UTC+08:00') =>{
//     if(!value)return value;
//     value = moment(value).format(dafaultTimeDateFormat);//去掉PM/AM 或者值中的其他字符
//     const d = new Date(value);
//     let hours = d.getHours() - (getStrUtcNum(valueUtc) - getStrUtcNum(utc));
//     if(hours < 0){
//         d.setDate(d.getDate() - 1);
//         hours = hours+24
//     }
//     d.setHours(hours);
//     return d;
// }

/**
 *
 * @param {*} value
 * @param {*} valueUtc
 * @param {*} utc
 * @param {*} format 当前数据的格式(DD.MM / MM.DD 无法区分)
 */
const getDateFormatString = (value,valueUtc, utc = 'UTC+08:00',format) => {
    if (!value) return null;
    let _value = format?moment(value,format).format(dafaultTimeDateFormat):value;//(DD.MM / MM.DD 无法区分)需要先按照format格式化成标准字符串,在进行换算
    _value = getDateUTCString(_value,valueUtc,utc);
    format =  format && format.replace("hh","HH");
    _value = format?moment(_value).format(format):_value;
    return _value;
}

/**
 * 输入时间字符串,告知时区，转换成某个时区
 * @param {*} value
 * @param {*} valueUtc 输入值的时区信息
 * @param {*} utc
 * @param {*} resultType datetime 是否带有年、月、日 时、分、秒
* @param {*} format 上下文时间格式化字符(可忽略)
* @param {*} toFormat 需要转换出来的格式化时间,默认按照上下文输出即可
 */
const getGlobalizationDateFormatString = (value,valueUtc,utc,dateType,gloformat ,toFormat) => {
    let _format = gloformat?gloformat:dafaultTimeDateFormat;
    globalizationDateFormat(_glo=>{
        let _gloDataformat = _glo && _glo.dataformat && _glo.dataformat;
        if(dateType && dateType.toLocaleLowerCase() ==="datetime"){
            _format = gloformat?gloformat:_gloDataformat && _gloDataformat['dateTimeFormat'];
            toFormat = toFormat?toFormat:_gloDataformat && _gloDataformat['dateTimeFormat'];
        }else{
            _format = gloformat?gloformat:_gloDataformat && _gloDataformat['dateFormat'];
            toFormat = toFormat?toFormat:_gloDataformat && _gloDataformat['dateFormat'];
        }
        if(_glo && _glo['timezone']){
            _format = _format && _format.replace("yyyy","YYYY").replace("dd","DD");
            _format = _format && _format.replace("TT","A").replace("tt","a").trim();
            value = getDateFormatString(value,valueUtc?valueUtc:_glo['timezone'],utc?utc:_glo['timezone'],_format);
        }
        if(toFormat){
            toFormat = toFormat && toFormat.replace("yyyy","YYYY").replace("dd","DD");
            toFormat = toFormat && toFormat.replace("TT","A").replace("tt","a");
        }
        value = value && toFormat?moment(value,_format).format(toFormat):value;
    });
    console.log(" value-- ",value);
    return {value,format:_format};
}


/**
 * 根据时区转换 'H:mm:ss'
 * @param {*} value
 * @param {*} resultType  返回数据类型
 */
const getGlobalizationTimeFormat = (value,valueUtc,utc,resultType = null) => {
    let _value = value;//resultType?value:moment(value);
    let _format = null;
    globalizationDateFormat(_glo=>{
        _format = _glo && _glo.dataformat?_glo.dataformat.timeFormat:null;
        if(_glo && _glo['timezone']){
            _value = getTimeFormat(value,valueUtc,utc?utc:_glo['timezone'],_format,resultType).value;
        }
    });
    _format = _format && _format.replace("TT","A").replace("tt","a").trim();
    return {value:_value,format:_format};
}

const getGlobalizationFormatNumber = (value) => {
    globalizationDateFormat(_glo=>{
        let _format = _glo && _glo.dataformat && _glo.dataformat.numberFormat?_glo.dataformat.numberFormat:null;
        value = _format?getFormatNumber(value,_format):value;
    });
   return value;
}

// script.src = '//cdn.yonyoucloud.com/pro/diwork/download/jDiwork.js';
let time = null;
const initJDiwork = (don) => {
    try {
        window.jDiwork.getContext(function (arg) {
            if(arg && arg.dataformat && arg.timezone){
                time && clearInterval(time);
                time = null;
                window.globalization = {
                    "locale": arg.locale,
                    "sysLocale": arg.sysLocale,
                    "multilist": JSON.parse(arg.multilist),
                    "timezone": arg.timezone,
                    "dataformat": arg.dataformat ? JSON.parse(arg.dataformat) : arg.dataformat
                }
                don(window.globalization);
            }else{
                time = setInterval(function(){ initJDiwork();},1000);
            }
        });
    }catch (error) {
        console.log("获取上下文异常!",error);
        don(null);
    }
}


const getjDiworkGlobalization = (don) => {
    if(window.globalization && window.globalization.dataformat){
        return don(window.globalization);
    }
    if (!window.jDiwork || !window.jDiwork.getContext) {
        console.log("jDiwork.getContext 不存在 !");
        return don(null);
    }
}
/**
 * 把当前时间字符串 转 制定格式字符串
 * @param {*} value
 * @param {*} valueFormat
 * @param {*} toFormat
 */
const getFromatToFormat = (value,valueFormat,toFormat) => {
   return moment(value,valueFormat).format(toFormat);
}
export {
    initJDiwork,
    getFormatNumber,
    getGlobalizationFormatNumber,
    getFromatToFormat,

    getDateFormat,
    getTimeFormat,
    getGlobalizationDateFormat,

    getGlobalizationTimeFormat,
    getGlobalizationDateFormatString,
};
