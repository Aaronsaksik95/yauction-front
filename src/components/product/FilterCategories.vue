<template>
  <div>
    <div class="filter-title">
      <p>Fitrer</p>
      <img class="icon-filter" src="../../assets/filter.png" alt="" />
    </div>
    <h3
      v-if="Object.values(this.$route.query).length > 1"
      class="reset-filter"
      @click="resetFilter"
    >
      Réinitialiser
    </h3>
    <ul class="list-filter">
      <li>
        <label>Prix</label>
        <div class="year-price-label">
          <small for="">Min</small>
          <small for="">Max</small>
        </div>
        <div class="year-price">
          <input
            placeholder="Min"
            type="number"
            id="price"
            v-model="startingPriceMin"
          /><input placeholder="Max" type="number" v-model="startingPriceMax" />
        </div>
      </li>
      <li>
        <label>Année</label>
        <div class="year-price-label">
          <small for="">Min</small>
          <small for="">Max</small>
        </div>
        <div class="year-price">
          <input placeholder="Min" type="number" v-model="yearMin" />
          <input placeholder="Max" type="number" v-model="yearMax" />
        </div>
      </li>
      <li>
        <label>KM</label>
        <div class="year-price-label">
          <small for="">Min</small>
          <small for="">Max</small>
        </div>
        <div class="year-price">
          <input placeholder="Min" type="number" v-model="mileageMin" />
          <input placeholder="Max" type="number" v-model="mileageMax" />
        </div>
      </li>
      <li>
        <label>Couleur</label>
        <input placeholder="Color" type="text" v-model="color" />
      </li>
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
        <label>Energie</label>
        <select v-model="energy">
          <option value="essence">Essence</option>
          <option value="diesel">Diesel</option>
          <option value="electrique">Electrique</option>
          <option value="hybride">Hybride</option>
        </select>
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
          class="btn btn-three"
          btnText="Appliquer"
          :btnFunction="applyFilter"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ApiBrands from "../../mixins/ApiBrands";
import ApiModels from "../../mixins/ApiModels";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../tools/Button";
export default {
  data() {
    return {
      vehicle: this.$route.query.vehicle,
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
  components: {
    Button,
  },
  mixins: [ApiProducts, ApiBrands, ApiModels],
  created() {
    this.get_brands().then((data) => {
      this.allBrands = data.brands;
    });
    this.get_regions().then((data) => {
      this.allRegions = data;
    });
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
    resetFilter() {
      this.$router.push(`/vehicle?vehicle=${this.vehicle}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-title {
  display: flex;
  justify-content: center;
  p {
    font-size: 25px;
  }
  .icon-filter {
    width: 25px;
    height: 25px;
    position: relative;
    top: 30px;
  }
}
.list-filter {
  max-height: 70%;
  overflow: scroll;
  list-style-type: none;
  padding: 20px;
  margin: auto;
  label {
    display: block;
  }
  .year-price {
    display: flex;
    input {
      width: 50%;
    }
    :first-child {
      margin-right: 4px;
    }
  }
  .year-price-label {
    display: flex;
    justify-content: space-around;
  }
  input {
    display: block;
    margin: 0px auto 10px auto;
    width: 150px;
  }
  select {
    width: 160px;
    display: block;
    margin: 0px auto 10px auto;
  }
}
.reset-filter {
  color: rgb(255, 196, 100);
  cursor: pointer;
}
</style>
