/**
 * Created by SHAKER on 2017/8/25.
 */
define(["jquery", "tool", "template", "uploadify", 'Jcrop'], function ($, tool, template, uploadify) {
  $(function () {
    var cs_id = tool.getparam("cs_id");
    var x, y, w, h;
    $.ajax({
      url: "/api/course/picture",
      type: "get",
      data: {cs_id: cs_id},
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("step2_tmp", info.result);
          $(".course-add").html(html)
          
          //上传图片
          $("#upfile").uploadify({
            height: 30,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/cover',
            width: 70,
            buttonClass: "btn btn-success btn-sm btn_upfile",
            buttonText: "选择图片",
            fileObjName: "cs_cover_original",
            itemTemplate: "<span></span>",
            formData: {
              cs_id: cs_id
            },
            onUploadSuccess: function (file, info) {
              // console.log(JSON.parse(info));
              var data = JSON.parse(info);
              data = data.result;
              // console.log(data);
              $(".brief img").attr("src", data.path)
              $(".preview img").attr("src", data.path)
              $("#btn_save").removeAttr("disabled");
            }
          });
          
        }
      }
    });
    
    $("body").on("click", "#btn_save", function () {
      if ($(this).text() == "裁切图片") {
        $(this).text("保存图片");
        $('.preview img').Jcrop({
          setSelect: [0, 0, 10000, 10000],
          aspectRatio: 2,   //宽高比
          boxWidth: 400
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
          //一进来，先获取到裁剪框的值，初始化x,y,w,h
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w;
          h = init.h;
          
          $('.preview').on("cropmove", function (a, b, c) {
            x = parseInt(c.x);
            y = parseInt(c.y);
            w = parseInt(c.w);
            h = parseInt(c.h);
          });
        });
      } else {
        console.log("呵呵");
        //发送ajax请求，裁切图片
        $.ajax({
          type: "post",
          url: "/api/course/update/picture",
          data: {
            cs_id: cs_id,
            x: x,
            y: y,
            w: w,
            h: h
          },
          success: function (info) {
            console.log(info);
            if (info.code == 200) {
              location.href = "/course/step3?cs_id=" + cs_id;
            }
          }
        });
      }
    })
  })
})