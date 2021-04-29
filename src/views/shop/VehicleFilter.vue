<template>
  <div class="">
    <div v-if="products.length != 0">
      <TitlePage :title="vehicle" />
      <div class="title">
        <div class="subtitle" v-if="state != ''">
          <p>Etat:</p>
          <p>{{ state }}</p>
        </div>
        <div class="subtitle" v-if="brand != ''">
          <p>Marque:</p>
          <p>{{ brandTitle }}</p>
        </div>
        <div class="subtitle" v-if="model != ''">
          <p>Modèle:</p>
          <p>{{ modelTitle }}</p>
        </div>
        <div class="subtitle" v-if="yearMin != 0 && yearMax != 0">
          <p>Année:</p>
          <p>{{ yearMin }}-</p>
          <p>{{ yearMax }}</p>
        </div>
        <div class="subtitle" v-if="mileageMin != 0 && mileageMax != 0">
          <p>KM:</p>
          <p>{{ mileageMin }}-</p>
          <p>{{ mileageMax }}</p>
        </div>
        <div class="subtitle" v-if="color != ''">
          <p>Couleur:</p>
          <p>{{ color }}</p>
        </div>
        <div class="subtitle" v-if="energy != ''">
          <p>Energie:</p>
          <p>{{ energy }}</p>
        </div>
        <div class="subtitle" v-if="region != ''">
          <p>Région:</p>
          <p>{{ region }}</p>
        </div>
        <div
          class="subtitle"
          v-if="startingPriceMin != 0 && startingPriceMax != 0"
        >
          <p>Prix:</p>
          <p>{{ startingPriceMin }}-</p>
          <p>{{ startingPriceMax }} €</p>
        </div>
      </div>
      <div class="filter-product">
        <FilterCategories class="filter" />
        <ProductsGrid
          :productArray="products"
          :detail="true"
          class="grid-prod"
        />
      </div>
    </div>
    <div v-else>
      <TitlePage :title="`Aucun resultat pour ${vehicle}.`" />
      <p class="reset-filter" @click="resetFilter">
        Réinitialiser les filtres.
      </p>
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import ProductsGrid from "../../components/product/ProductGrid";
import FilterCategories from "../../components/product/FilterCategories";
import ApiBrands from "../../mixins/ApiBrands";
import ApiModels from "../../mixins/ApiModels";
export default {
  data: function () {
    return {
      products: [],
      vehicle: this.$route.query.vehicle,
      state: this.$route.query.state,
      brand: this.$route.query.brand,
      model: this.$route.query.model,
      yearMin: this.$route.query.yearMin,
      yearMax: this.$route.query.yearMax,
      mileageMin: this.$route.query.mileageMin,
      mileageMax: this.$route.query.mileageMax,
      color: this.$route.query.color,
      energy: this.$route.query.energy,
      region: this.$route.query.region,
      startingPriceMin: this.$route.query.startingPriceMin,
      startingPriceMax: this.$route.query.startingPriceMax,
      brandTitle: "",
      modelTitle: "",
    };
  },
  components: {
    TitlePage,
    ProductsGrid,
    FilterCategories,
  },
  mixins: [ApiProducts, ApiBrands, ApiModels],
  created() {
    this.get_products_filter()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
    this.get_brand(this.brand).then((data) => {
      this.brandTitle = data.brand.title;
    });
    this.get_model_id(this.model).then((data) => {
      this.modelTitle = data.model.title;
    });
  },
  methods: {
    resetFilter() {
      this.$router.push(`/vehicle?vehicle=${this.vehicle}`);
    },
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
.title {
  display: flex;
  font-size: 15px;
  justify-content: center;
  width: 90%;
  margin: auto;
  overflow: scroll;
  height: 50px;
  .subtitle {
    display: flex;
    margin-right: 30px;
    :first-child {
      background-color: rgb(202, 202, 202);
      border-radius: 10px;
      padding: 5px;
      margin: 10px;
    }
  }
}
.reset-filter {
  cursor: pointer;
  width: 160px;
  margin: auto;
}
.reset-filter:hover {
  border-bottom: 2px solid black;
}
</style>