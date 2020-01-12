<template>
  <div class="hotel w">
    <Filters />
    <!--  -->
    <Item />
  </div>
</template>

<script>
import Filters from "@/components/hotel/index/filters";
import Item from "@/components/hotel/index/item";
export default {
  components: {
    Filters,
    Item
  }
};
</script>

<style lang="less">
// .hotel {
// }
</style>