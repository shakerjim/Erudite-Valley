/**
 * Created by SHAKER on 2017/8/25.
 */
define(["jquery","template"],function ($,template) {
  $(function () {
  
    $.ajax({
      url:"/api/course",
      type:"get",
      success:function (info) {
        console.log(info);
        var html=template("course_list_tmp",info)
        $(".course-list").html(html)
      }
    })
  })
})