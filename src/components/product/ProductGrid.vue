<template>
  <div>
    <div v-if="detail">
      <div class="product-grid">
        <div v-for="item in productArray" :key="item._id">
          <ProductItem :productObject="item" :detail="detail" />
        </div>
      </div>
    </div>

    <div class="product-flex" v-else>
      <div v-for="item in productArray" :key="item._id">
        <ProductItem :productObject="item" :detail="detail" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";
export default {
  components: {
    ProductItem,
  },
  props: {
    productArray: {
      required: true,
      type: Array,
    },
    detail: Boolean,
  },
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.product-flex {
  display: flex;
  overflow: scroll;
}
</style>