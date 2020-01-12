<template>
  <div class="index">
    <!-- banners -->
    <el-carousel indicator-position="outside" height="700px">
      <el-carousel-item v-for="(v,i) in banners" :key="i">
        <img :src="`${$axios.defaults.baseURL + v.url}`" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: currentTab === index }"
            @click="handleChangeTab(index)"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="tabs[currentTab].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      currentTab: 0,
      // tab栏的数据
      tabs: [
        { name: "攻略", placeholder: "搜索城市" },
        { name: "酒店", placeholder: "请输入搜索酒店的城市" },
        { name: "机票", placeholder: "", pageUrl: "/air" }
      ]
    };
  },
  methods: {
    // tab栏切换
    handleChangeTab(index) {
      // 如果是点击的机票，跳转到机票页面
      if (index === 2) {
        this.$router.push("/air");
      }
      // 修改当前高亮
      this.currentTab = index;
    }
  },
  async mounted() {
    let res = await this.$axios({
      url: "/scenics/banners"
    });
    // console.log(res);
    const { data } = res.data;
    this.banners = data;
    console.log(this.banners);
  }
};
</script>

<style lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__indicators--outside {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.banner-content {
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;
  .search-bar {
    width: 552px;
    margin: 0 auto;
  }
  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #eee;
      }
    }
    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;
      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }
  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;
    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }
    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.w {
  width: 1000px;
  margin: 0 auto;
}
.fl {
  // display: flex;
  float: left;
}
.fr {
  float: right;
}
a {
  display: block;
  text-decoration: none;
  color: #000;
}
img {
  display: block;
  width: 100%;
  height: 100%;
}
/*清除浮动*/
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}
</style>