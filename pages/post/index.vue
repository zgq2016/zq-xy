<template>
  <div class="index">
    <div class="main w clearfix">
      <Left class="fl left" :data="navs" />
      <Right class="fr right" />
    </div>
  </div>
</template>

<script>
import Left from "@/components/post/index/left";
import Right from "@/components/post/index/right";
export default {
  data() {
    return {
      navs: []
    };
  },
  components: {
    Left,
    Right
  },
  async mounted() {
    let res = await this.$axios({
      url: "/posts/cities"
    });
    let { data } = res.data;
    this.navs = data;
  }
};
</script>

<style lang="less">
.index {
  .main {
    margin-top: 10px;
    .left {
      width: 270px;
    }
    .right {
      width: 700px;
    }
  }
}
</style>