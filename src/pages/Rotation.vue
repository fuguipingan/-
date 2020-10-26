<template>
  <div class="rotation">
    <el-carousel :interval="4000" type="card" height="400px" >
    <el-carousel-item v-for="item in imgs" :key="item" >
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgs:[
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603107329200&di=3d0486d2958a7ec6a891ead3a35cbfe3&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1306%2F17%2Fc1%2F22199754_1371460645988.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603107329199&di=70f66ff0849e1d3bd79ac65e2680ca36&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa044ad345982b2b75133e15130adcbef77099bf3.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603107329199&di=6512b7cf05b5bdf8b6b7276394ae8fdb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201308%2F05%2F20130805105309_5E2zE.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603107329199&di=c9a58419409522da322da0c2e10fa8c7&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201202%2F03%2F041227mirkqs8rqv5xl7pk.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603107329198&di=10d3e999bf2637bcd503e3c1d6aedc61&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F4e4a20a4462309f7fa164931730e0cf3d7cad69c.jpg",
      ],
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>