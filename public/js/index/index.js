/**
 * Created by SHAKER on 2017/8/20.
 */
define(["jquery","echarts"],function ($,echarts) {
  $(function () {
    $.ajax({
      url:"/api/dashboard",
      type:"get",
      success:function (info) {
        console.log(info);
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(info);
      }
    })

  })
})