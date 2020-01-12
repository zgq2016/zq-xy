<template>
  <div class="left">
    <!-- 鼠标移出整个navs -->
    <div class="navs" @mouseleave="handleleave">
      <!-- 循环生成数据 -->
      <!-- 热门 -->
      <div class="nav" v-for="(item, index) in data" :key="index" @mouseenter="handleenter(index)">
        {{item.type}}
        <span class="el-icon-arrow-right fr"></span>
      </div>
      <!-- 单个索引 每一个生成一次 -->
      <!-- 动态列表数据 索引 城市 标题 -->
      <div class="menu" v-if="data[tabs]">
        <nuxt-link
          v-for="(item, index) in data[tabs].children"
          :key="index"
          :to="`/post?city=${item.city}`"
        >
          &nbsp;
          <em>{{index+1}}</em>
          &nbsp;&nbsp;
          <span>{{item.city}}</span>
          &nbsp;&nbsp;
          {{item.desc}}
        </nuxt-link>
      </div>
    </div>
    <!-- 推荐 recommend -->
    <div class="recommend">
      <h3>推荐城市</h3>
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tabs: ""
    };
  },
  methods: {
    handleenter(index) {
      this.tabs = index;
      // console.log(this.tabs);
    },
    handleleave(index) {
      this.tabs = "";
    }
  }
};
</script>

<style lang="less">
.left {
  .navs {
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
    position: relative;
    .nav {
      line-height: 200px/4-2;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      &:hover {
        color: #ffb800;
      }
      .el-icon-arrow-right {
        line-height: 200px/4-2;
        font-size: 20px;
      }
    }
    .menu {
      z-index: 9999999999999999999999;
      width: 400px;
      height: 240px;
      position: absolute;
      left: 270px;
      top: 0;
      background-color: #eee;
      a {
        height: 240px/5;
        line-height: 240px/5;
      }
      span {
        color: #ffb800;
      }
      em {
        color: #ffb800;
        font-size: 22px;
      }
    }
  }
  .recommend {
    width: 100%;
    h3 {
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>