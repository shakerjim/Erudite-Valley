/**
 * Created by SHAKER on 2017/8/24.
 */
require(["jquery","template"],function ($,template) {
  $(function () {
    
    $.ajax({
      url:"/api/category",
      type:"get",
      success:function (info) {
        console.log(info);
        var html=template("category_list_tmp",info)
        $("tbody").html(html)
      }
    })
  })
})
