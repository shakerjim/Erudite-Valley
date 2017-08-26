/**
 * Created by SHAKER on 2017/8/25.
 */
define(["jquery", "template", "tool", "bootstrap","jquery_form"], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getparam("cs_id");
    $.ajax({
      url: "/api/course/lesson",
      type: "get",
      data: {cs_id: cs_id},
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("step3_tmp", info.result)
          $(".course-add").html(html)
        }
        
      }
    })
    
    
    //添加
    $("body").on("click", "#btn_add", function () {
      
      var html = template("model_tmp", {
        title: "添加课时",
        btnText: "添 加",
        ct_cs_id: cs_id
      })
      $("#lesson").data("type", "add")
      $("#lesson").html(html);
      $("#lesson").modal("show");
    })
    
    //编辑
    $("body").on("click", "#btn_edit", function () {
      var ct_id = $(this).parent().data("ct_id");
      $.ajax({
        url: "/api/course/chapter/edit",
        type: 'get',
        data: {ct_id: ct_id},
        success: function (info) {
          var data = info.result;
          data.title = "修改课时";
          data.btnText = "修 改";
          console.log(data);
          var html = template("model_tmp", data)
          $("#lesson").data("type", "edit")
          $("#lesson").html(html);
          $("#lesson").modal("show");
          // console.log(type);
        }
      })
      
    })
    
    //保存
    $('body').on("click", ".btn_save", function () {
      var type = $("#lesson").data("type");
      var url = '';
      if (type == "add") {
        url = "/api/course/chapter/add"
      } else {
        url = "/api/course/chapter/modify"
      }
      //判断复选框
      var ct_is_free;
      if($("#ct_is_free").prop("checked")){
        ct_is_free="1"
      }else{
        ct_is_free="0"
      }
  
  
      $("form").ajaxSubmit({
        url: url,
        type: "post",
        data:{
          ct_is_free:ct_is_free
        },
        success: function (info) {
          if (info.code == 200) {
            location.reload()
          }
        }
      })
      
    })
  })
  
})