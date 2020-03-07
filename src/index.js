import formatnumber from './formatNumber';
import moment from 'moment';

const defaultFormat = '+ ###,###[.]####';
const numberFormat = '0000000000000';
const strFormat = '#############';
const defaultUtc = 8;
const dafaultDateFormat = 'YYYY-MM-DD';
const dafaultTimeDateFormat = dafaultDateFormat+" HH:mm:ss";


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
        return "0." + _precFormatStr;
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

const getFormatNumber = (value,format) => {
    if (!value || value === "") return value;
    if (Number(value) === 0) return value;

    let b = String(value).indexOf('-') != -1 ? true : false;//标记负数

    let _format = getPrecFormat(format, String(value), b);
    value = b ? String(Number(String(value).replace('-', "")) * (-1)) : String(value);
    format = format.replace("(", "+");//规范负数

    _format = _format.replace("[", "").replace("]", "");//规范分隔符
    _format = _format.replace(" +", "").replace("+", "").replace("+ ", "").replace("+", "").replace("(", "").replace(" ", "");
    value = formatnumber(_format, value);

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
        return moment(value).utcOffset(getOffsetMinute(utc)).format(format);
    } else {
        return moment(value).utcOffset(getOffsetMinute(utc));
    }
}

const getTimeFormat = (value, utc = 'UTC+08:00', format ="hh:mm:ss",resultType) => {
  if(value.indexOf(":") === -1)return value;
  if (utc.indexOf("UTC") === -1) return value;
  let sym = utc.indexOf("+") != -1 ? "+" : "-";

  let values = value.split(":");
 
  let currUtc = Number((sym + utc.split(sym)[1].split(":")[0] ));
 
  let hours = Number(values[0]) - (defaultUtc - currUtc);
  hours = hours < 0?hours+24:hours;

  hours =  value.replace(values[0],hours);
  
  hours = format?moment(hours,format):hours;
 
  hours = resultType?hours.format("hh:mm:ss"):hours;

  return {value:hours,format};
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
const getGlobalizationDateFormat = (value,dateType,utc,resultType = null) => {
    let _value = resultType?value:moment(value);
    let _format = null;
    globalizationDateFormat(_glo=>{
        _format = resultType?_glo && _glo.dataformat && _glo.dataformat:null;
        if(dateType && dateType.toLocaleLowerCase() ==="datetime"){
            _format = _format && _format['dateTimeFormat']?_format['dateTimeFormat']:null;
        }else{
            _format = _format &&_format['dateFormat']?_format['dateFormat']:null;
        }
        if(_glo['timezone']){
            _format = _format && _format.replace("yyyy","YYYY").replace("dd","DD");
            _value = getDateFormat(value,utc?utc:_glo['timezone'],_format);
        }
    });
    return {value:_value,format:_format};
}
const getStrUtcNum = (utc = 'UTC+08:00') =>{
    utc = utc.toLocaleUpperCase();
    if (utc.indexOf("UTC") === -1 || utc.length !== 9){
        console.log(" utc format is error ! "+utc);
        return 'UTC+08:00';
    }
    return Number(utc.substring(3,6));
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
    const d = new Date(value);
    let hours = d.getHours() - (getStrUtcNum(valueUtc) - getStrUtcNum(utc));
    if(hours < 0){
        d.setDate(d.getDate() - 1);
        hours = hours+24
    }
    d.setHours(hours);
    return d;
}

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
            _format = gloformat?gloformat:_gloDataformat['dateTimeFormat'];
            toFormat = toFormat?toFormat:_gloDataformat['dateTimeFormat'];
        }else{
            _format = gloformat?gloformat:_gloDataformat['dateFormat'];
            toFormat = toFormat?toFormat:_gloDataformat['dateFormat'];
        }
        if(_glo['timezone']){
            _format = _format && _format.replace("yyyy","YYYY").replace("dd","DD");
            value = getDateFormatString(value,valueUtc?valueUtc:_glo['timezone'],utc?utc:_glo['timezone'],_format);
        }
        if(toFormat){
            toFormat = toFormat && toFormat.replace("yyyy","YYYY").replace("dd","DD");
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
const getGlobalizationTimeFormat = (value,utc,resultType = null) => {
    let _value = resultType?value:moment(value);
    let _format = null;
    globalizationDateFormat(_glo=>{
        _format = _glo && _glo.dataformat?_glo.dataformat.timeFormat:null;
        if(_glo['timezone']){
            _value = getTimeFormat(value,utc?utc:_glo['timezone'],_format,resultType).value;
        }
    });
    return {value:_value,format:_format};
}

const getGlobalizationFormatNumber = (value) => {
    globalizationDateFormat(_glo=>{
        let _format = _glo && _glo.dataformat && _glo.dataformat.numberFormat?_glo.dataformat.numberFormat:null;
        value = _format?getFormatNumber(value,_format):value;
    });
   return value;
}

const initJDiwork = () => {
    const script = document.createElement("script");
    script.src = '//cdn.yonyoucloud.com/pro/diwork/download/jDiwork.js';
    document.querySelector("body").appendChild(script);
}

let time = null;
const getjDiworkGlobalization = (don) => {
    if(window.globalization && window.globalization.dataformat){
        return don(window.globalization);
    }
    if (!window.jDiwork) { 
        console.log("jDiwork.getContext 不存在 !");
        initJDiwork();
    }
    time = setInterval(function(){
        try {
            if(!window.jDiwork.getContext)return;
            window.jDiwork.getContext(function (arg) {
                clearInterval(time);
                window.globalization = {
                    "locale": arg.locale,
                    "sysLocale": arg.sysLocale,
                    "multilist": JSON.parse(arg.multilist),
                    "timezone": arg.timezone,
                    "dataformat": arg.dataformat ? JSON.parse(arg.dataformat) : arg.dataformat
                }
                don(window.globalization);
            });
        } catch (error) {
            console.log("获取上下文异常!",error);
        }
    },1000);
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
    getDateFormat,
    getTimeFormat,
    getGlobalizationDateFormat,
    getGlobalizationTimeFormat,
    getGlobalizationDateFormatString,
    getGlobalizationFormatNumber,
    getFromatToFormat
};
