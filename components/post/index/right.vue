<template>
  <div class="right">
    <!-- 输入框 -->
    <!-- <el-input
      placeholder="请输入想去的地方,比如:'广州"
      suffix-icon="el-icon-search"
      v-model="inputSearch"
      @change="handleInputSearch"
    ></el-input>-->
    <div class="search">
      <input
        type="text"
        placeholder="请输入想去的地方,比如:'广州"
        v-model="inputSearch"
        @input="handleInputSearch"
      />
      <span class="el-icon-search" @click="handleClear"></span>
    </div>
    <!-- 推荐 -->
    <div class="recommend">
      <span>推荐：</span>
      <span
        v-for="(item, index) in ['广州','上海','北京']"
        :key="index"
        @click="handlerecommend(item,index)"
      >{{item}} &nbsp;</span>
      <!-- <span>上海</span>
      <span>北京</span>-->
    </div>
    <!-- 推荐攻略 写游记 topTil -->
    <div class="topTil clearfix">
      <div class="strategy fl">推荐攻略</div>
      <router-link to="/post/travel">
        <el-button icon="el-icon-edit" type="primary fr">写游记</el-button>
      </router-link>
    </div>
    <!-- 文章 -->
    <div v-for="(item, index) in postList" :key="index">
      <!-- 三张图 || 四张图 -->
      <div class="article1" v-if="item.images.length >= 3">
        <router-link :to="`post/details?id=${item.id}`">
          <div class="title" v-html="item.title"></div>
          <div class="tesc" v-html="item.summary"></div>
          <div class="cdImage">
            <img v-for="(item1, index1) in item.images" :key="index1" :src="item1" alt />
          </div>
        </router-link>
        <div class="info">
          <div class="fl info_left">
            <span class="el-icon-location-outline"></span>
            <span>{{item.cityName}}</span>
            &nbsp;
            <span>by</span>
            <img class="leftImg" :src="item.images[0]" alt />
            <span class="nickname">{{item.account.nickname}}</span>
            &nbsp;
            <span class="el-icon-view"></span>
            <span>{{item.watch}}</span>
          </div>
          <div class="fr info_right">{{item.like}}赞</div>
        </div>
      </div>
      <!-- 一张图 || 二张图 -->
      <div class="article2" v-if="item.images.length < 3">
        <router-link :to="`post/details?id=${item.id}`">
          <div class="article2_left_img fl">
            <img :src="item.images[0]" alt />
          </div>
          <div class="article2_right fr">
            <div class="title" v-html="item.title"></div>
            <div class="tesc" v-html="item.summary"></div>
            <div class="info">
              <div class="fl info_left">
                <span class="el-icon-location-outline"></span>
                <span>{{item.cityName}}</span>
                &nbsp;
                <span>by</span>
                <img
                  class="leftImg"
                  :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`"
                  alt
                />
                <span class="nickname">{{item.account.nickname}}</span>
                &nbsp;
                <span class="el-icon-view"></span>
                <span>{{item.watch}}</span>
              </div>
              <div class="fr info_right">73赞</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputSearch: "", //输入框绑定
      data: [], //数据数组
      pageIndex: 1, // 当前页数
      pageSize: 5, // 当前页面的条数
      total: 0 // 总条数
    };
  },
  methods: {
    // 点击确定搜索
    handleClear() {
      this.$route.query.city = "";
      this.ParamInit();
    },
    // 点击
    handlerecommend(item, index) {
      this.inputSearch = item;
      this.ParamInit();
    },
    // 回车搜索
    handleInputSearch() {
      this.ParamInit();
    },
    // 每页页显示几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    // 当前页显示几条
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
    // 封装发请求 带参数的请求
    ParamInit() {
      this.$axios({
        url: "/posts",
        params: {
          // _start: this.pageIndex,
          // _limit: this.pageSize,
          city: this.inputSearch
        }
      }).then(res => {
        if (this.inputSearch === "") {
          this.init();
          return;
        }
        let { data, total } = res.data;
        this.data = data;
        this.total = total;
      });
    },
    // 封装发请求 不带参数的请求
    init() {
      this.$axios({
        url: "/posts"
        // params: {
        //   _start: this.pageIndex,
        //   _limit: this.pageSize
        // }
      }).then(res => {
        let { data, total } = res.data;
        this.data = data;
        this.total = total;
      });
    }
  },
  computed: {
    postList() {
      if (this.data.length > 0) {
        let postsData = this.data.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageSize * this.pageIndex
        );
        return postsData;
      } else {
        return [];
      }
    }
  },
  watch: {
    // 监听路由的变化,，同一个页面之间的跳转不会重新加载组件
    // 1.可以通过监听$route的方法来实现
    $route() {
      const { city } = this.$route.query;
      this.inputSearch = city;
      this.ParamInit();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.right {
  width: 100%;
  overflow: hidden;
  .search {
    position: relative;
    input {
      width: 100%;
      height: 40px;
      border: 2px solid #ffb800;
      padding: 0 10px;
      outline: none;
    }
    span {
      color: #ffb800;
      font-size: 20px;
      position: absolute;
      right: 10px;
      top: 10px;
      font-weight: 700;
    }
  }
  .topTil {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    .strategy {
      color: #ffb800;
      border-bottom: 1px solid #ffb800;
      font-size: 20px;
      margin: 5px;
    }
    .primary {
    }
  }

  .article1 {
    margin: 10px 0 20px 0;
    .title {
      font-size: 20px;
      margin-top: 10px;
      &:hover {
        color: #ffb800;
        cursor: pointer;
      }
    }
    .tesc {
      font-size: 13px;
      margin-top: 10px;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .cdImage {
      margin-top: 10px;
      height: 180px;
      display: flex;
      justify-content: space-between;
      img {
        width: 32%;
        margin-right: 10px;
        height: 180px;
      }
    }
    .info {
      margin-top: 10px;
      height: 30px;
      .info_left {
        font-size: 12px;
        color: #aaa;
        width: 70%;
        .leftImg {
          width: 15px;
          height: 15px;
          display: inline-block;
        }
        .nickname {
          color: #ffb800;
        }
      }
      .info_right {
        color: #ffb800;
      }
    }
  }
  .article2 {
    overflow: hidden;
    margin-top: 20px;
    .article2_left_img {
      width: 32%;
      height: 180px;
    }
    .article2_right {
      margin: 5px;
      width: 65%;
      .title {
        font-size: 20px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        &:hover {
          color: #ffb800;
          cursor: pointer;
        }
      }
      .tesc {
        font-size: 13px;
        margin-top: 20px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .info {
        margin-top: 30px;
        height: 30px;
        .info_left {
          font-size: 12px;
          color: #aaa;
          width: 70%;
          .leftImg {
            width: 15px;
            height: 15px;
            display: inline-block;
          }
          .nickname {
            color: #ffb800;
          }
        }
        .info_right {
          color: #ffb800;
        }
      }
    }
  }
  .recommend {
    font-size: 12px;
    :hover {
      color: #ffb800;
      cursor: pointer;
    }
  }
  // .el-input__inner {
  //   border: 1px solid #ffb800;
  // }
  // .el-input__icon {
  //   color: #ffb800;
  // }
}
</style>