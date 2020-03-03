import formatnumber from './formatNumber';
import moment from 'moment';

const defaultFormat = '+ ###,###[.]####';
const numberFormat = '0000000000000';
const strFormat = '#############';
const defaultUtc = 8;
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

const getDateFormat = (value, utc = 'UTC+8:00', format) => {
    if (!value) return null;
    if (format) {
        return moment(value).utcOffset(getOffsetMinute(utc)).format(format);
    } else {
        return moment(value).utcOffset(getOffsetMinute(utc));
    }
}

const getTimeFormat = (value, utc = 'UTC+8:00', format ="hh:mm:ss",resultType) => {
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
    let globalization = getjDiworkGlobalization();
    if(globalization && globalization.timezone && globalization.dataformat){
        return result(globalization);
    }
    globalization = window.cb && cb.rest && cb.rest.AppContext && cb.rest.AppContext.globalization && cb.rest.AppContext.globalization||null;
    const cnGlobalization = window.globalization && window.globalization||null;
    globalization = globalization?globalization:cnGlobalization;
    if(!globalization || !globalization.dataformat || !globalization.timezone){
        console.log("在当前环境中,未找到 globalization 上下文!");
        return result(null);
    }
    return result(globalization);
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
        _format = resultType?null:_glo && _glo.dataformat && _glo.dataformat;
        if(dateType && dateType.toLocaleLowerCase() ==="datetime"){
            _format = _format && _format['dateTimeFormat']?_format['dateTimeFormat']:null;
        }else{
            _format = _format &&_format['dateFormat']?_format['dateFormat']:null;
        }
        if(_format && _glo['timezone']){
            _value = getDateFormat(value,utc?utc:_glo['timezone'],_format);
        }
    });
    return {value:_value,format:_format};
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
        if(_format && _glo['timezone']){
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

const getjDiworkGlobalization = () => {
    let _globalization = null;
    if (window.jDiwork && window.jDiwork.getContext) {
        try {
            jDiwork.getContext(function (arg) {
                _globalization = {
                    "locale": arg.locale,
                    "sysLocale": arg.sysLocale,
                    "multilist": JSON.parse(arg.multilist),
                    "timezone": arg.timezone,
                    "dataformat": arg.dataformat ? JSON.parse(arg.dataformat) : arg.dataformat
                }
            });
        } catch (error) {
            console.log("获取上下文异常!",error);
        }
    }else{
        console.log("jDiwork.getContext 不存在 !");
    }
    return _globalization;
}


export {
    getFormatNumber,
    getDateFormat,
    getTimeFormat,
    getGlobalizationDateFormat,
    getGlobalizationTimeFormat,
    getGlobalizationFormatNumber
};
