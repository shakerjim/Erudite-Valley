/**
 * Created by HUCC on 2017/8/20.
 */
require.config({
  baseUrl:"/public/",
  paths:{
    jquery:"assets/jquery/jquery",
    jquery_cookie:"assets/jquery-cookie/jquery.cookie",
    template:"assets/artTemplate/template-web",
    bootstrap:"assets/bootstrap/js/bootstrap",
    tool:"js/common/tool",
    datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker",
    datepicker_cn:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    nprogress:"assets/nprogress/nprogress",
    uploadify:"assets/uploadify/jquery.uploadify"
  },

  shim:{
    bootstrap:{
      deps:["jquery"]
    },
    datepicker_cn:{
      deps:["jquery"]
    },
    uploadify:{
      deps:["jquery"]
    }
  }

});