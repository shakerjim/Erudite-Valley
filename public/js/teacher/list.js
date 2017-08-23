/**
 * Created by SHAKER on 2017/8/21.
 */
define(["jquery", "template", "bootstrap"], function ($, template) {
  $(function () {
    //1.渲染教师列表
    $.ajax({
      type: "get",
      url: "/api/teacher",
      success: function (info) {
        if (info.code == 200) {
          var html = template("teacher_tmp", info);
          $("#teachermodel").html(html)
        }
      }
    })
    
    //2.注册委托事件,查看教师信息
    //点击查看,跳出模态框
    //js控制模态框  $('#MyModal').modal()
    $("#teachermodel").on("click", "#btnview", function () {
      //自定义属性,传入tc_id
      var tc_id = $(this).parent().data("id");
      $.ajax({
        type: "get",
        url: "/api/teacher/view",
        data: {tc_id: tc_id},
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            var html = template("model_tmp", info.result)
            $("#teacherModal").html(html)
          }
        }
      })
      //模态框显示
      $('#teacherModal').modal("show")
    })
    
    //3.注册委托事件,注销/启用
    $("#teachermodel").on("click", ".btncancel", function () {
      var tc_id = $(this).parent().data("id");
      var tc_status = $(this).parent().data("status")
      console.log(tc_status);
      var $that=$(this);
      $.ajax({
        type: "post",
        url: "/api/teacher/handle",
        data: {
          tc_id: tc_id,
          tc_status: tc_status
        },
        success:function (info) {
          console.log(info);
          if(info.code==200){
            if(info.result.tc_status==1){
              $that.text("启 用").removeClass("btn-warning").addClass("btn-success");
            }else{
              $that.text("注 销").addClass("btn-warning").removeClass("btn-success");
            }
            $that.parent().data("status",info.result.tc_status)
          }
         
        }
      })
    })
    
    
    
  })
  
})