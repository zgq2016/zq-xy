<template>
  <div class="commentreviews">
    <div class="title">
      <el-row>
        <el-col :span="1">
          <img
            class="headPortrait"
            :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`"
            alt
          />
        </el-col>
        <el-col :span="2">
          <span class="nickname">{{item.account.nickname}}</span>
        </el-col>
        <el-col :span="4">
          <span class="time">{{time|timeformat}}</span>
        </el-col>
        <el-col :span="4" class="fr">
          <div class="reply" @click="sendComment(item)">回复</div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <mycomment v-if="item.parent" :item="item.parent" @replayComment="sendComment"></mycomment>
      <div>{{item.content}}</div>
      <div v-for="(item1, index1) in item.pics" :key="index1">
        <div v-if="item1.pics===[]"></div>
        <div v-else-if="item1.pics!==[]" class="contentImg">
          <img :src="`${$axios.defaults.baseURL + item1.url}`" alt />
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
      time: new Date()
    };
  },
  name: "mycomment",
  props: {
    item: {
      type: Object,
      default: {
        account: {}
      }
    }
  },
  methods: {
    sendComment(item) {
      console.log(item);
      console.log("-------------");
      this.$emit("replayComment", item);
    }
  }
};
</script>

<style lang="less">
.commentreviews {
  border: 1px solid #000;
  .title {
    margin: 10px;

    .reply {
      font-size: 14px;
      position: absolute;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }

    .headPortrait {
      width: 20px;
      height: 20px;
    }

    .nickname {
      font-size: 14px;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .time {
      color: #ccc;
      font-size: 13px;
    }
  }

  .content {
    position: relative;
    margin: 10px 20px;

    .imgSrc {
      width: 100px;
      height: 100px;
    }
    .contentImg {
      width: 100px;
      height: 100px;
    }
  }
}
</style>