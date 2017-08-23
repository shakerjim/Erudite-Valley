/**
 * Created by SHAKER on 2017/8/22.
 */
define(["jquery", "datepicker", "datepicker_cn"],function ($) {
  function getparamObj() {
    var param = location.search;
    var paramArr = param.slice(1).split("&");
    var paramObj = {};
    for(var i=0;i<paramArr.length;i++){
      var key=paramArr[i].split("=")[0];
      var value=paramArr[i].split("=")[1];
      paramObj[key]=value
    }
    return paramObj;
  }
  
  function getparam(key) {
    return getparamObj()[key]
  }
  
  function setDate(ele) {
    $(ele).datepicker({
      format: 'yyyy-mm-dd',
      startDate: '-10d',
      endDate: "0d",
      autoclose: true,
      language: 'zh-CN',
      todayBtn: "linked",
      todayHighlight: true,
    });
  }
  return{
    getparamObj:getparamObj,
    getparam:getparam,
    setDate:setDate
  }
})
