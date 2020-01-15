import formatnumber from './formatNumber';

const formatNumber = (format,value)=>{
    format = format.replace("[","").replace("]","");//规范分隔符
    format = format.replace("(","+");//规范负数
    
    let after = "",before = "";
    if(format.substring(format.length-1,format.length) === "+"){
        after = "-";
    }else  if(format.substring(0,1) === "+"){
        before = "-"
    }
    if(after === "-" && before === "-"){
        after = "";
        console.log("format is error !");
    }
    format = format.replace(" +","").replace("+","").replace("+ ","").replace("+","").replace("(","");
    value = formatnumber(format,value);
    return before+value+after;
}

export {
    formatNumber
};
