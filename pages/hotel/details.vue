<template>
  <div class="details w">
    <div class="main" v-for="(item, index) in data" :key="index">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{item.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 基本信息 -->
      <div>
        <div>
          <span class="title">{{item.name}}</span>
          <span class="iconfont iconhuangguan"></span>
          <span class="iconfont iconhuangguan"></span>
          <span class="iconfont iconhuangguan"></span>
          <span class="iconfont iconhuangguan"></span>
          <span class="iconfont iconhuangguan"></span>
        </div>
        <div class="ping">{{item.alias}}</div>
        <div class="ping">
          <span class="el-icon-location-outline"></span>
          {{item.address}}
        </div>
      </div>
      <!-- 图片群 -->
      <div class="imgs clearfix">
        <div class="big fl">
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        </div>
        <div class="smalls fl">
          <img class="aaa" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img class="aaa" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img class="aaa" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="item.products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" width="300"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" width="300"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚" width="300"></el-table-column>
      </el-table>
      <!-- 地图 -->
      <div class="map"></div>
      <!-- 基本信息 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    const { id } = this.$route.query;
    this.$axios({
      url: "hotels",
      params: {
        id
      }
    }).then(res => {
      console.log(res);
      let { data } = res.data;
      this.data = data;
    });
  }
};
</script>




<style lang="less">
.details {
  .map {
    width: 100%;
    height: 400px;
    background-color: red;
  }
  .imgs {
    width: 100%;
    height: 400px;
    .big {
      width: 690px;
      height: 100%;
      margin-right: 10px;
    }
    .smalls {
      width: 300px;
      height: 100%;
      .aaa {
        margin-right: 10px;
      }
      img {
        height: 30%;
        width: 145px;
        float: left;
        &:nth-child(n-4) {
          margin-top: 10px;
        }
      }
    }
  }
  .el-breadcrumb {
    font-size: 16px;
    line-height: 1;
    padding: 20px 0;
  }
  .iconhuangguan {
    color: #f90;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .ping {
    font-size: 13px;
    color: #999;
    margin: 5px 0;
  }
}
</style>