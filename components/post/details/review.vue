<template>
  <div class="left clearfix">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="title" v-html="data.title"></h1>
    <hr />
    <!-- 攻略：2019-05-22 12:59 阅读：1919  strategy-->
    <div class="strategy">
      攻略：
      <span>{{time | timeformat}}</span>
      &nbsp;&nbsp;&nbsp;&nbsp; 阅读：{{data.watch}}
    </div>
    <p class="content" v-html="data.content"></p>
    <div class="main">
      <!-- 操作 operation-->
      <div class="operation">
        <!-- 评论 -->
        <div class="comment" @click="handleshare">
          <i class="el-icon-edit-outline"></i>
          <p>评论(100)</p>
        </div>
        <!-- 收藏 collect -->
        <div class="collect" @click="handlecollect">
          <i class="el-icon-star-off"></i>
          <p>收藏</p>
        </div>
        <!--  分享 share -->
        <div class="share" @click="handleshare">
          <i class="el-icon-share"></i>
          <p>分享</p>
        </div>
        <!-- 点赞 Like -->
        <div class="Like" @click="handleLike">
          <i class="iconfont iconding"></i>
          <p>点赞({{data.like}})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeformat } from "@/assets/zq_filters.js";
export default {
  filters: {
    timeformat
  },
  data() {
    return {
      data: {},
      time: new Date()
    };
  },
  methods: {
    // handleshare
    handleshare() {
      this.$message.warning("暂未开通");
    },
    // 点赞
    handleLike() {
      const { id } = this.$route.query;
      this.$axios({
        url: "/posts/like",
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        params: {
          id
        }
      }).then(res => {
        if ((res.data.message = "点赞成功")) {
          this.$message.success(res.data.message);
          this.data = +this.data.like + 1;
        } else {
          this.$message.error("用户已点赞");
          return;
        }
      });
    },
    // 收藏
    handlecollect() {
      const { id } = this.$route.query;
      this.$axios({
        url: "/posts/star",
        headers: {
          // Bearer是token字符串前面必须要声明的，后面加上空格，再连接上token
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        params: {
          id
        }
      }).then(res => {
        if ((res.data.message = "收藏成功")) {
          this.$message.success(res.data.message);
        }
      });
    }
  },
  mounted() {
    const { id } = this.$route.query;
    this.$axios({
      url: "/posts",
      params: {
        id
      }
    }).then(res => {
      this.data = res.data.data[0];
    });
  }
};
</script>

<style lang="less">
.left {
  .title {
    margin: 10px 0;
  }
  .strategy {
    color: #999;
    margin: 10px 0;
    text-align: right;
  }
  .img {
    margin: 10px 0;
  }
  .main {
    width: 100%;
    .operation {
      width: 400px;
      height: 100px;
      margin: 0 auto;
      display: flex;
      div {
        flex: 1;
        text-align: center;
        margin-top: 20px;
        i {
          font-size: 30px;
          color: #ffb800;
          margin-bottom: 10px;
          display: block;
        }
        p {
          color: #999;
        }
      }
    }
  }
}
</style>