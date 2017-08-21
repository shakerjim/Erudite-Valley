/**
 * Created by HUCC on 2017/8/20.
 */
require.config({
  baseUrl:"/public/",
  paths:{
    jquery:"assets/jquery/jquery",
    jquery_cookie:"assets/jquery-cookie/jquery.cookie",
    template:"assets/artTemplate/template-web",
    bootstrap:"assets/bootstrap/js/bootstrap"
  },
  shim:{
    bootstrap:{
      deps:["jquery"]
    }
  }

});