<template>
  <div class="details">
    <div class="main w clearfix">
      <!-- review 内容 -->
      <Review class="fl review" />
      <!-- correlation 相关攻略 -->
      <Correlation class="fr correlation" />
      <!-- comment 评论 -->
      <Comment class="fl comment" />
    </div>
  </div>
</template>

<script>
import Review from "@/components/post/details/review";
import Correlation from "@/components/post/details/correlation";
import Comment from "@/components/post/details/comment";
export default {
  
  components: {
    Review,
    Correlation,
    Comment
  }
};
</script>

<style lang="less">
.details {
  .main {
    margin-top: 10px;
    .review {
      width: 700px;
    }
    .correlation {
      width: 230px;
    }
    .comment {
      width: 700px;
    }
  }
}
</style>