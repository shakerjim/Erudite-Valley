/**
 * Created by SHAKER on 2017/8/20.
 */
define(["jquery", "template", "jquery_cookie"], function ($, template) {
  if (location.pathname != "/login") {
    
    //3.判断有没有PHPSESSID,有的话说明登录了,渲染头像,没有就跳转到登录界面
    if($.cookie("PHPSESSID")){
      //1.头像渲染
      var userinfo = JSON.parse($.cookie("userinfo"));
      var html = template("profile-tmp", userinfo);
      $("#profileinfo").html(html);
    }else{
      location.href = "/login";
    }
    
    
    //2.退出登录
    $("#logout").click(function () {
      
      $.ajax({
        type:"post",
        url:"/api/logout",
        success:function (info) {
          if(info.code==200){
            $.removeCookie("userinfo",{path:"/"});
            location.href = "/login";
          }
        }
      })
    })
  
    
  //4.侧边栏高亮
    //判断a标签的href属性是否和location.pathname相同,相同就把当前的a高亮,排他
    //my idea :因为页面跳转,可以不排他
    var pathname=location.pathname;
    var $links=$(".navs a");
    $links.each(function () {
      $(this).removeClass("active")
      if($(this).attr("href")==pathname){
        $(this).addClass("active")
      }
    })
    //5.二级菜单显示
    $("#addmanager").click(function () {
      $(this).children("ul").slideToggle()
    })
   //假如二菜单下面有高亮的,就让二级菜单展开
   //  if($("#addmanager").find(".active")){
   //    //$(this)没用?
   //    // $(this)指的是有active类的a标签
   //
   //    $(".active").parent().parent().show()
   //  }
    $("#addmanager").find(".active").parent().parent().show()
    
  }
 
})