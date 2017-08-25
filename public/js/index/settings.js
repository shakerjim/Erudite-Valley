/**
 * Created by SHAKER on 2017/8/23.
 */
define(["jquery", "template", "tool", "ckeditor","uploadify", "jquery_region", "jquery_cookie"], function ($, template, tool,CKEDITOR) {
  
  $(function () {
    //发送ajax 获取个人详细信息
    $.ajax({
      url: '/api/teacher/profile',
      type: "get",
      success: function (info) {
        // console.log(info);
        if (info.code == 200) {
          var html = template("settings_tmp", info.result);
          $(".teacher-profile").html(html);
          
          //日期插件
          tool.setDate("#tc_birthday");
          tool.setDate("#tc_join_date");
  
  
          //富文本编辑
          CKEDITOR.replace( 'tc_introduce',{
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},
      
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          } );
          
          
          //三级省级联动
          $("#demo").region({
            url: "/public/assets/jquery-region/region.json"
          });
          
          
          
          //渲染头像
          $("#upfile").uploadify({
            height: 120,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/avatar',
            width: 120,
            buttonText: "",
            fileObjName: "tc_avatar",
            // fileTypeExts:'*.gif; *.jpg; *.png',
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              var path = data.result.path;
              $(".preview img").attr("src", path);
              console.log(path);
              //侧边栏的头像也跟着换
              $("#profileinfo img").attr("src", path);
              
              //修改cookie
              var userinfo = $.cookie("userinfo");
              userinfo=JSON.parse(userinfo)
              userinfo.tc_avatar = path;
              $.cookie("userinfo",JSON.stringify(userinfo) , {path: "/", expires: 1});
              
            }
            
            
          });
  
          //注册事件
          $("body").on("click", ".btn_save", function () {
            //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
            for ( instance in CKEDITOR.instances ) {
              CKEDITOR.instances[instance].updateElement();
            }
            console.log($("form").serialize());
            //发送ajax请求
            $.ajax({
              type: "post",
              url: "/api/teacher/modify",
              data: $("form").serialize(),
              success: function (info) {
                if(info.code == 200){
                  location.href = "/settings";
                }
              }
            });
    
    
          });
        }
      }
    })
    
    
  });
})