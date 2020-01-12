<template>
  <div class="draft">
    <!-- 草稿 -->
    <div class="main">
      <div v-for="(item, index) in $store.state.post.data" :key="index" class="box">
        <div class="draftBox">草稿箱（{{index+1}}）</div>
        <!-- 链接 -->
        <div class="cache" @click="handlecache(item)">
          <span>{{item.title}}</span>
          <span class="el-icon-edit"></span>
        </div>
        <div class="time">{{time|timeformat}}</div>
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
      time: new Date()
    };
  },
  methods: {
    handlecache(item) {
      this.$emit("fashe", item);
    }
  }
};
</script>

<style lang="less">
.draft {
  .main {
    padding: 10px;
    width: 300px;
    border: 1px solid #000;
    font-size: 13px;
    .box {
      margin-top: 10px;
    }
    span {
      margin-top: 10px;
    }
  }
}
</style>