<template>
  <div class="travel w clearfix">
    <Publish class="Publish" />
  </div>
</template>

<script>
import Publish from "@/components/post/travel/publish";
export default {
  components: {
    Publish,
  }
};
</script>
<style lang="less">
.travel {
  .Publish {
    margin-top: 10px;
    width: 700px;
  }
}
</style>