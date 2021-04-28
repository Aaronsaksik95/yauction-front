<template>
  <div>
    <!-- <small>Imaginez de plus belles images pour le caroussel. </small>
    <small>Et désolé pour le responsive je n'ai pas eu le temps.</small> -->
    <!-- <div>
      <Carousel>
      <CarouselSlide :index="0">
        <img class="img-carousel" src="http://www.airsh3agroupe.com/wp-content/uploads/2020/02/dubai-banner-2.png" alt />
      </CarouselSlide>
      <CarouselSlide :index="1">
        <img class="img-carousel" src="http://www.trecom.fr/zen-asie/DUBAI.jpg" alt />
      </CarouselSlide>
      <CarouselSlide :index="2">
        <img class="img-carousel" src="https://cdn.ttgtmedia.com/visuals/ComputerWeekly/Hero%20Images/New-york-manhattan-skyline-fotolia.jpg" alt />
      </CarouselSlide>
    </Carousel>
    </div>
    <div class="search__content">
      <ProductsGrid :productArray="filteredShop" :detail="true"/>
    </div> -->
  </div>
</template>

<script>
import Carousel from "../components/carousel/Carousel";
import CarouselSlide from "../components/carousel/CarouselSlide";
import TitlePage from "../components/tools/TitlePage";
import ProductsGrid from "../components/product/ProductGrid";
import ApiProducts from "../mixins/ApiProducts";
import ApiBrands from "../mixins/ApiBrands";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Carousel,
    CarouselSlide
  },
  data: function () {
    return {
      products: [],
      searchValue: "",
      categories: [],
    };
  },
  computed: {
    filteredShop: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter((item) => item.title.match(filter));
    },
  },
  mixins: [ApiProducts, ApiBrands],
  created() {
    this.get_products()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));

    // this.get_categories().then((data) => {
    //   this.categories = data.categories;
    // });
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.img-carousel{
  width: 100%;
}
</style>