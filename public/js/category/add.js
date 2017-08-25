/**
 * Created by SHAKER on 2017/8/24.
 */
define(["jquery","template","tool"],function ($,template,tool) {
  $(function () {
    var cg_id=tool.getparam("cg_id");
    if(cg_id){
      //编辑页面
      //发送ajax,渲染页面
      $.ajax({
        url:'/api/category/edit',
        type:"get",
        data:{cg_id:cg_id},
        success:function (info) {
          if(info.code==200){
            var data=info.result;
            data.title="编辑分类";
            data.btnText="编 辑";
            var html=template("category_add_tmp",data)
            $(".course-category").html(html);
            $("#cg_pid").val(data.cg_pid)
          }
          console.log(info);
        }
      })
      
    }else{
      //添加页面
      //发送ajax获取顶级分类
      $.ajax({
        url:"/api/category/top",
        type:"get",
        success:function (info) {
          var html=template("category_add_tmp",{
            title:"添加分类",
            btnText:"添 加",
            top:info.result
          })
          $(".course-category").html(html)
        }
      })
    }
    //注册点击事件,发送ajax,提交数据
    $("body").on("click",".btn_save",function () {
      var url="";
      if(cg_id){
        url="/api/category/modify"
      }else{
        url="/api/category/add"
      }
     $.ajax({
       url:url,
       type:"post",
       data:$("form").serialize(),
       success:function (info) {
      location.href="/category/list"
       }
     })
    })
  })
})