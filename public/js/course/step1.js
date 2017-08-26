/**
 * Created by SHAKER on 2017/8/25.
 */
define(["jquery", "tool", "template","ckeditor"], function ($, tool, template,CKEDITOR) {
  $(function () {
    var cs_id = tool.getparam("cs_id");
    $.ajax({
      url: "/api/course/basic",
      type: "get",
      data: {cs_id: cs_id},
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("step1_tmp", info.result)
          $(".course-add").html(html)
          console.log($("form").serialize());
          //富文本编辑
          CKEDITOR.replace( 'cs_brief',{
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},
      
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          } );
        }
      }
    })
    
    //发送ajax,渲染页面
    //1. 先获取到参数cs_id
    //2. 通过cs_id获取到该课程的基本信息
    //3. 提取模版
    //4. 渲染模版
    //5. 点击保存按钮，保存基本信息，成功时跳转到第二步
    $("body").on("change", "#cs_cg_pid", function () {
      var cg_id=$(this).val();
      $.ajax({
        url:'/api/category/child',
        type:"get",
        data:{cg_id:cg_id},
        success:function (info) {
          // console.log(info);
          if(info.code==200){
           var html=template("sec_tmp",info);
           $("#cs_cg_id").html(html)
         }else{
            $("#cs_cg_id").html('<option value="">二级分类</option>')
          }
        }
      })
    })
    
 
    
    $("body").on("click",".btn_save",function () {
  
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
   
      $.ajax({
        url:"/api/course/update/basic",
        type:"post",
        data:$("form").serialize(),
        success:function (info) {
          location.href="/course/step2?cs_id="+info.result.cs_id;
        }
      })
    })
  })
})