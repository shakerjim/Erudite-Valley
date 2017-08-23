/**
 * Created by SHAKER on 2017/8/23.
 */
define(["jquery", "template", "uploadify"], function ($) {
  console.log("1111");
  $(function () {
    $("#upfile").uploadify({
      height: 120,
      swf: '/public/assets/uploadify/uploadify.swf',
      uploader: '/api/uploader/avatar',
      width: 120,
      buttonText:"",
      fileObjName:"tc_avatar",
      // fileTypeExts:'*.gif; *.jpg; *.png',
      onUploadSuccess : function(file, data, response) {
        console.log(file, data, response);
       data=JSON.parse(data);
       $(".preview img").attr("src",data.result.path)
      }
    });
  });
})