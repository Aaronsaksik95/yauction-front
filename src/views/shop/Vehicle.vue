<template>
  <div class="man">
    <div v-if="products.length != 0">
      <TitlePage :title="vehicle" />
      <div class="filter-product">
        <FilterCategories class="filter"/>
        <ProductsGrid
          :productArray="products"
          :detail="true"
          class="grid-prod"
        />
      </div>
    </div>
    <div v-else>
      <TitlePage :title="`Aucun resultat pour ${vehicle}.`" />
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import ProductsGrid from "../../components/product/ProductGrid";
import FilterCategories from "../../components/product/FilterCategories";

export default {
  data: function () {
    return {
      products: [],
      vehicle: this.$route.query.vehicle,
    };
  },
  components: {
    TitlePage,
    ProductsGrid,
    FilterCategories,
  },
  mixins: [ApiProducts],
  created() {
    this.get_products_vehicle(this.vehicle)
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="scss" scoped>
.filter-product {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  .filter {
    grid-column: 1;
  }
  .grid-prod {
    grid-column: 2 / span 10;
  }
}
</style>