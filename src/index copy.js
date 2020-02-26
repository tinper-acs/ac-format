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
    // console.log(" --_format- ", _format);
    value = b ? String(Number(String(value).replace('-', "")) * (-1)) : String(value);
    format = format.replace("(", "+");//规范负数

    _format = _format.replace("[", "").replace("]", "");//规范分隔符
    _format = _format.replace(" +", "").replace("+", "").replace("+ ", "").replace("+", "").replace("(", "").replace(" ", "");
    value = formatnumber(_format, value);

    let nage = getNegative(format, value);
    // console.log(" -nage- ", nage);
    return nage;
}

const getOffsetMinute = (val) => {
    if (val.indexOf("UTC") == -1) return;
    let sym = val.indexOf("+") != -1 ? "+" : "-";
    let utc = val.split(sym)[1];
    let utcMinute = Number(utc.split(":")[0]) * 60 + Number(utc.split(":")[1]);
    return Number(sym + utcMinute);
}

const getTimezoneUTCDate = (value, utc = 'UTC+8:00', format) => {
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
    
    getDateFormat,
    getGlobTimeZoneFormat,
    getTimeZoneFormat
};






// -------------------------------

/**
 * 判断是否要执行全局func,还是原来的func逻辑
 * @param {*} bEnableFormat 
 * @param {*} defaultFun 
 * @param {*} globaFun 
 */
const getGlobaFormatResult = (bEnableFormat,defaultFun,globaFun) => {
    const cbGlobalization = cb.rest.AppContext.globalization;
    if ((bEnableFormat && bEnableFormat && bEnableFormat === 1) || !cbGlobalization || !cbGlobalization.dataformat || !cbGlobalization.timezone) { // 1
      // 只需要转到东八区显示
      return defaultFun && defaultFun();
    } else {
      return globaFun && globaFun();
    }
  }
  
  const getGlobaFormat = (dateFormat) => {
    let format = "YYYY-MM-DD";
    const cbGlobalization = cb.rest.AppContext.globalization;
    if(!cbGlobalization){
      console.log("globalization is not ! ");
      return null;
    }
    format = cbGlobalization.dataformat.dateFormat && cbGlobalization.dataformat[dateFormat];
    format = format?format.replace("yyyy","YYYY").replace("yy","YY").replace("dd","DD").replace("mm","MM"):format;
    return format;
  }
  /**
   * 时间转换的判断，决定是否走系统，还是billitem
   * resultType 决定返回的是否是字符串,true/false
   */
const getDateFormat = (value,bEnableFormat, format,resultType, itemFormatter,dateTimeType) => {
    // const {value,bEnableFormat, cFormatData} = this.props;
    if (!value || value === '') {
      return {value,format};
    }
    const cbGlobalization = cb.rest.AppContext.globalization;
    if(!dateTimeType || dateTimeType !== "datetimepicker"){//为datepicker，只格式化
      value = getGlobaFormatResult(bEnableFormat,itemFormatter,()=>{
        format = getGlobaFormat("dateFormat"); 
        value = typeof(value) === "string"?moment(value):value;
        //tudo datePicker 如果需要处理，修改此处
        return resultType?value.format(format):value;
      })
    }else{
      value = getGlobaFormatResult(bEnableFormat,itemFormatter,()=>{
        format = getGlobaFormat("dateTimeFormat");
        let _format = format?format.replace("TT","").replace("TTTT","").trim():format;
        let cc = getMomentFromUTC(value);
        console.log(" --cc-- ",cc);
        return getMomentFromUTC(cc, cbGlobalization.timezone,resultType?_format:null);
      })
    }
    console.log(format+" value: ",value);
    return {
      value,
      format
    };
  }
  
  cb.getTimeFormat = (value,bEnableFormat, format,resultType, itemFormatter) => {
    // const {value,bEnableFormat, cFormatData} = this.props;
    if (!value || value === '') {
      return {value,format};
    }
    const cbGlobalization = cb.rest.AppContext.globalization;
    value = getGlobaFormatResult(bEnableFormat,itemFormatter,()=>{
      format = getGlobaFormat("timeFormat");
      let cc = getMomentFromUTC(value);
      console.log(" --cc-- ",cc);
      return getMomentFromUTC(cc, cbGlobalization.timezone,resultType?_format:null);
    })
    console.log(format+" value: ",value);
    return {
      value,
      format
    };
  }
  
  /**
   * 
   * @param {*} value 
   * @param {*} utc 
   * @param {*} format 
   */
  const getMomentFromUTC = (value, utc = 'UTC+8:00', format) => {
    if(!value)return null;
    if(format) {
      return moment(value).utcOffset(getOffsetMinute(utc)).format(format);
    }else{
      return moment(value).utcOffset(getOffsetMinute(utc));
    }
  }
  
  /**
   * 根据全局变量判断查看是否要进行时区转换
   * @param {*} value 
   * @param {*} utc 
   * @param {*} format 
   */
const getGlobTimeZoneFormat = (value, utc = 'UTC+8:00', format) => {
    if(!value)return null;
    return getGlobaFormatResult(format,()=>value,()=>{
      return getMomentFromUTC(value,utc,format);
    });
  }
  
  /**
   * 单纯的格式转换,同时也可以根据时区来转换(不用globalization判断)
   * @param {*} value 
   * @param {*} utc 
   * @param {*} format 
   */
const getTimeZoneFormat = (value, utc = 'UTC+8:00', format) => {
    return getMomentFromUTC(value,utc,format);
  }
  
  // ---------------------------------