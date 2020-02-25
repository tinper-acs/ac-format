import formatnumber from './formatNumber';
import moment from 'moment';

const defaultFormat = '+ ###,###[.]####';
const numberFormat = '0000000000000';
const strFormat = '#############';
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

const formatNumber = (format, value) => {
    if (!value || value === "") return value;
    if (Number(value) === 0) return value;

    let b = String(value).indexOf('-') != -1 ? true : false;//标记负数

    let _format = getPrecFormat(format, String(value), b);
    console.log(" --_format- ", _format);
    value = b ? String(Number(String(value).replace('-', "")) * (-1)) : String(value);
    format = format.replace("(", "+");//规范负数

    _format = _format.replace("[", "").replace("]", "");//规范分隔符
    _format = _format.replace(" +", "").replace("+", "").replace("+ ", "").replace("+", "").replace("(", "").replace(" ", "");
    value = formatnumber(_format, value);

    let nage = getNegative(format, value);
    console.log(" -nage- ", nage);
    return nage;
}

const getOffsetMinute = (val) => {
    if (val.indexOf("UTC") == -1) return;
    let sym = val.indexOf("+") != -1 ? "+" : "-";
    let utc = val.split(sym)[1];
    let utcMinute = Number(utc.split(":")[0]) * 60 + Number(utc.split(":")[1]);
    return Number(sym + utcMinute);
}

getTimezoneUTCDate = (value, utc = 'UTC+8:00', format) => {
    if (!value) return null;
    if (format) {
        return moment(value).utcOffset(getOffsetMinute(utc)).format(format);
    } else {
        return moment(value).utcOffset(getOffsetMinute(utc));
    }
}

export {
    formatNumber,
    getTimezoneUTCDate,
};
