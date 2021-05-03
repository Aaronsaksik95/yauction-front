<template>
  <div>
    <div class="vehicle">
      <img
        class="icon-car"
        @click="() => chooseType('voiture')"
        src="../assets/car.png"
        alt=""
      />
      <img
        class="icon-moto"
        @click="() => chooseType('moto')"
        src="../assets/moto.png"
        alt=""
      />
      <img
        class="icon-scooter"
        @click="() => chooseType('scooter')"
        src="../assets/scooter.png"
        alt=""
      />
    </div>

    <ul class="list-filter">
      <li>
        <label>Etat</label>
        <select v-model="state">
          <option value="occasion">Occasion</option>
          <option value="neuf">Neuf</option>
        </select>
      </li>
      <li>
        <label>Marque</label>
        <select v-model="brand" @change="findModels($event)">
          <option
            v-for="brand in allBrands"
            :key="brand._id"
            :value="brand._id"
          >
            {{ brand.title }}
          </option>
        </select>
      </li>
      <li>
        <label>Modèle</label>
        <select v-model="model">
          <option
            v-for="model in allModels"
            :key="model._id"
            :value="model._id"
          >
            {{ model.title }}
          </option>
        </select>
      </li>
      <li>
        <label>Prix max</label>
        <div class="year-price">
          <input placeholder="Max" type="number" v-model="startingPriceMax" />
        </div>
      </li>
      <li>
        <label>Année min</label>
        <div class="year-price">
          <input placeholder="Min" type="number" v-model="yearMin" />
        </div>
      </li>
      <li>
        <label>Region</label>
        <select v-model="region">
          <option
            v-for="region in allRegions"
            :key="region.nom"
            :value="region.nom"
          >
            {{ region.nom }}
          </option>
        </select>
      </li>
      <li>
        <Button
          class="btn btn-validate m-home"
          btnText="Rechercher"
          :btnFunction="applyFilter"
        />
      </li>
    </ul>
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
import Button from "../components/tools/Button"
import ApiProducts from "../mixins/ApiProducts";
import ApiBrands from "../mixins/ApiBrands";
import ApiModels from "../mixins/ApiModels";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Carousel,
    CarouselSlide,
    Button
  },
  data: function () {
    return {
      products: [],
      vehicle: "voiture",
      state: "",
      brand: "",
      model: "",
      year: 0,
      color: "",
      energy: "",
      region: "",
      yearMin: 0,
      yearMax: new Date().getFullYear(),
      startingPriceMin: 0,
      startingPriceMax: 0,
      mileageMin: 0,
      mileageMax: 0,
      allBrands: [],
      allRegions: [],
      allModels: [],
    };
  },
  mixins: [ApiProducts, ApiBrands, ApiModels],
  created() {
    this.get_brands().then((data) => {
      this.allBrands = data.brands;
    });
    this.get_regions().then((data) => {
      this.allRegions = data;
    });
    this.get_products()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    findModels(event) {
      this.get_models_brand(event.target.value).then((data) => {
        this.allModels = data.models;
      });
    },
    applyFilter() {
      this.$router.push(
        `/vehicleFilter?vehicle=${this.vehicle}&state=${this.state}&brand=${this.brand}&model=${this.model}&yearMin=${this.yearMin}&yearMax=${this.yearMax}&color=${this.color}&energy=${this.energy}&mileageMin=${this.mileageMin}&mileageMax=${this.mileageMax}&region=${this.region}&startingPriceMin=${this.startingPriceMin}&startingPriceMax=${this.startingPriceMax}`
      );
      document.location.reload();
    },
    chooseType(vehicle) {
      this.vehicle = vehicle;
      console.log(this.vehicle)
    },
  },
};
</script>

<style lang="scss" scoped>
.img-carousel {
  width: 100%;
}
.list-filter {
  display: flex;
  list-style-type: none;
  background: #fbf1ff;
  padding: 20px;
  border-radius: 20px;
  width: 60%;
  p {
    font-size: 25px;
  }
  label {
    display: block;
  }
  input {
    display: block;
    margin: 5px;
    width: 100px;
  }
  select {
    width: 110px;
    display: block;
    margin: 5px;
  }
}
.icon-car {
  margin: 10px;
  width: 40px;
  cursor: pointer;
}
.icon-moto {
  margin: 10px;
  width: 40px;
  cursor: pointer;
}
.icon-scooter {
  margin: 13px 10px;
  width: 40px;
  cursor: pointer;
}
.vehicle{
  text-align: left;
  margin: 10px 100px;
}
</style>