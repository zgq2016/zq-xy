<template>
  <div class="header">
    <div class="main w">
      <!-- logo -->
      <div class="logo fl">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- nav -->
      <div class="nav fl">
        <el-row class="navs fl">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel?city=74">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
      </div>
      <!-- login -->
      <div class="rows fr">
        <div class="news fl">
          <el-dropdown>
            <span class="el-dropdown-link el-icon-bell">
              消息
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="login fr">
          <el-dropdown v-if="$store.state.user.userInfo.token">
            <span class="el-dropdown-link">
              <span>{{$store.state.user.userInfo.user.nickname}}</span>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <nuxt-link to="/user" v-else>登录 / 注册</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      let res = await this.$store.commit("user/setUserInfo", {});
      if (res !== true) {
        this.$message.success("退出成功");
      }
    }
  }
};
</script>
<style lang="less">
.header {
  width: 100%;
  height: 60px;
  background-color: #fff;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  .logo {
    padding: 5px 20px 0 0;
    img {
      width: 156px;
      height: 50px;
    }
  }
  .nav {
    width: 555px;
    height: 60px;
    .navs {
      width: 350px;
      height: 60px;
      a {
        width: 100% / 4;
        height: 60px;
        line-height: 60px;
        float: left;
        display: block;
        text-align: center;
        &:hover {
          color: #409eff;
          border-bottom: 5px #409eff solid;
        }
      }
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .rows {
    .news {
      margin-right: 10px;
    }
    height: 60px;
    line-height: 60px;
    text-align: center;
    .login {
      .rejeck {
        text-align: center;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>