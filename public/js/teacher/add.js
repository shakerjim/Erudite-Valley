/**
 * Created by SHAKER on 2017/8/22.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  $(function () {
    var tc_id = tool.getparam("tc_id");
    //如果有tc_id就是编辑页面
    if (tc_id) {
      $.ajax({
        url: "/api/teacher/edit",
        type: "get",
        data: {tc_id: tc_id},
        success: function (info) {
          //修改界面
          if (info.code == 200) {
            info.result.title = "讲师编辑";
            info.result.btntext = "编 辑";
            info.result.type = "edit";
            var html = template("teacher_handle_tmp", info.result);
            $(".teacher").html(html)
            //时间插件
            tool.setDate("#tc_join_date")
            
          }
        }
      })
    } else {
      var html = template("teacher_handle_tmp", {
        title: "讲师添加",
        btntext: "添 加",
        type: "add"
      });
      $(".teacher").html(html)
      
      tool.setDate("#tc_join_date")
      
    }
    
    
    //点击保存按钮,修改界面,发送ajax
    $("body").on("click", ".btnhandle", function () {
      var url = "";
      if (tc_id) {
        //发送编辑的ajax
        url = "/api/teacher/update";
      } else {
        //发送添加的ajax
        url = "/api/teacher/add";
      }
      // console.log($("form").serialize());
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href = "/teacher/list";
          }
        }
      });
      
      
    });
    
    
  })
  
  
})