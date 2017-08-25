/**
 * Created by SHAKER on 2017/8/23.
 */
define(["jquery"],function ($) {
  //1.注册点击事件
  
  $("#editbtn").click(function () {
    //判断新密码和确认密码是否一致,不一致结束
    var tc_pass=$("#tc_pass").val();
    var tc_new_pass=$("#tc_new_pass").val();
    var confirm_pass=$("#confirm_pass").val();
    if(tc_new_pass!==confirm_pass){
      alert("请确认新密码和确认密码一致");
      return false;
    }
    console.log($("form").serialize());
    $.ajax({
      type:"post",
      url:"/api/teacher/repass",
      data:$("form").serialize(),
      success:function (info) {
       alert("恭喜您,修改密码成功,请重新登录")
        $("#logout").trigger("click")
      }
    })
    
    
    return false;
  })

})