import formatnumber from './formatNumber';
import moment from 'moment';

const formatNumber = (format,value)=>{
    let b = false,after = "",before = ""
    if(String(value).indexOf('-')!=-1){
        b = true;
        value = Number(String(value).replace("-",""));
    }else{
        value = Number(value);
    }
    format = format.replace("[","").replace("]","");//规范分隔符
    format = format.replace("(","+");//规范负数
    if(b){
        if(format.substring(format.length-1,format.length) === "+"){
            after = "-";
        }else  if(format.substring(0,1) === "+"){
            before = "-"
        }
        if(after === "-" && before === "-"){
            after = "";
            console.log("format is error !");
        }
    }
    format = format.replace(" +","").replace("+","").replace("+ ","").replace("+","").replace("(","").replace(" ","");
    value = formatnumber(format,value);
    if(b){
        return before+value+after;
    }else{
        return value;
    }
}

const getOffsetMinute = (val)=>{
    if(val.indexOf("UTC") == -1)return;
    let sym = val.indexOf("+") != -1?"+":"-";
    let utc = val.split(sym)[1];
    let utcMinute = Number(utc.split(":")[0]) * 60 + Number(utc.split(":")[1]);
    return Number(sym + utcMinute);
}

const getMomentFromUTC = (value,utc) => { 
    return moment(value).utcOffset(getOffsetMinute(utc));//.format(format);
}

const getStringFromUTC = (value,utc,format) => { 
    return moment(value).utcOffset(getOffsetMinute(utc)).format(format);
}

export {
    formatNumber,
    getMomentFromUTC,
    getStringFromUTC
};
