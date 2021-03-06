

function isNull(val){
    return val === undefined || val === null || val == '';
}

function isNumber(val){
    var flag = true;
    flag = !isNaN(+val);
    if(flag){
        flag = val != Infinity || val != -Infinity;
    }
    return flag;
}
function isAllLegalString(val){
    var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g;
    return reg.test(val);
}

function hasLetter(val){
    var reg = /[a-zA-z]/g;
    return reg.test(val);
}

function hasNumber(val){
    var reg = /[0-9]/g;
    return reg.test(val);
}

function pwdSafety(val){
    var flag = 0;
    if(hasNumber(val)){
        flag++;
    }
    if(hasLetter(val)){
        flag++;
    }
    if(!isAllLegalString(val)){
        flag++;
    }
    return flag;
}

function isMoney(val){
    var reg = /^\d+(\.\d{1,2})?$/g;
    var result = reg.exec(val);
    return result;
}

function isMobileNo(val){
    var reg = /^1[0-9]{10}$/g;
    var result = reg.exec(val);
    return result;
}

const validationUtil = {
    isNull:isNull,
    isNumber:isNumber,
    isAllLegalString:isAllLegalString,
    hasLetter:hasLetter,
    hasNumber:hasNumber,
    pwdSafety:pwdSafety,
    isMoney:isMoney,
    isMobileNo:isMobileNo
}

export default validationUtil;