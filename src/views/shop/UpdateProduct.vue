<template>
  <div>
    <HeaderProducts />
    <div>
      <form action="" class="form-product">
        <div v-if="stepForm == 0">
          <label>Vehicule</label>
          <select v-model="product.type">
            <option value="voiture">Voiture</option>
            <option value="moto">Moto</option>
            <option value="scooter">Scooter</option>
          </select>
          <label>Etat</label>
          <select v-model="product.state">
            <option value="occasion">Occasion</option>
            <option value="neuf">Neuf</option>
          </select>
          <label>Marque</label>
          <select v-model="product.brand" @change="findModels($event)">
            <option
              v-for="brand in allBrands"
              :key="brand._id"
              :value="brand._id"
            >
              {{ brand.title }}
            </option>
          </select>
          <label>Modèle</label>
          <select v-model="product.model">
            <option
              v-for="model in allModels"
              :key="model._id"
              :value="model._id"
            >
              {{ model.title }}
            </option>
          </select>
          <label>Energie</label>
          <select v-model="product.energy">
            <option value="essence">Essence</option>
            <option value="diesel">Diesel</option>
            <option value="electrique">Electrique</option>
            <option value="hybride">Hybride</option>
          </select>
        </div>
        <div v-if="stepForm == 1">
          <label>Region</label>
          <select v-model="product.region">
            <option
              v-for="region in allRegions"
              :key="region.nom"
              :value="region.nom"
            >
              {{ region.nom }}
            </option>
          </select>
          <label>Image</label>
          <input
            placeholder="Image"
            class=""
            type="text"
            v-model="product.image"
          />
          <label>Année</label>
          <input
            placeholder="Année"
            class=""
            type="number"
            v-model="product.year"
          />
          <label>Color</label>
          <input
            placeholder="Color"
            class=""
            type="text"
            v-model="product.color"
          />
          <label>Kilométrage</label>
          <input
            placeholder="Kilométrage"
            class=""
            type="number"
            v-model="product.mileage"
          />
        </div>
        <div v-if="stepForm == 2">
          <label>Sièges</label>
          <input
            placeholder="Nb de siège"
            class=""
            type="number"
            v-model="product.seat"
          />
          <label>Prix de départ</label>
          <input
            placeholder="Prix de départ"
            class=""
            type="number"
            v-model="product.startingPrice"
          />
          <label>Description</label>
          <input
            placeholder="Description"
            class=""
            type="text"
            v-model="product.description"
          />
          <Button
            class="btn btn-large btn-black"
            btnText="modifier le produit"
            :btnFunction="() => update_product(this.$route.params.id)"
          />
        </div>
      </form>
      <div class="arrow">
        <Button
          v-if="stepForm > 0"
          class="btn btn-black"
          btnText="←"
          :btnFunction="deleteStep"
        />
        <Button
          v-if="stepForm < 2"
          class="btn btn-black"
          btnText="→"
          :btnFunction="addStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import ApiBrands from "../../mixins/ApiBrands";
import ApiModels from "../../mixins/ApiModels";
import ApiProducts from "../../mixins/ApiProducts";
import ProductItem from "../../components/product/ProductItem";
import VueJwtDecode from "vue-jwt-decode";
import HeaderProducts from "../../layout/HeaderProducts";

export default {
  components: {
    Button,
    ProductItem,
    HeaderProducts,
  },
  data: function () {
    return {
      product: [],
      allBrands: [],
      allModels: [],
      allRegions: [],
      stepForm: 0,
      token: "",
      decode: {},
    };
  },
  mixins: [ApiProducts, ApiBrands, ApiModels],
  created() {
    this.token = localStorage.getItem("token");
    this.decode = VueJwtDecode.decode(this.token);
    this.get_product(this.$route.params.id).then((data) => {
      this.product = data.product;
      if (this.product.user != this.decode.id) {
        this.$router.push("/vehicle/voiture");
      }
    });
    this.get_brands().then((data) => {
      this.allBrands = data.brands;
    });
    this.get_regions().then((data) => {
      this.allRegions = data;
    });
  },
  computed: {},
  methods: {
    findModels(event) {
      this.get_models_brand(event.target.value).then((data) => {
        this.allModels = data.models;
      });
    },
    addStep() {
      this.stepForm++;
    },
    deleteStep() {
      this.stepForm--;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-product {
  input {
    display: block;
    margin: 0px auto 10px auto;
    width: 200px;
  }
  select {
    width: 210px;
    display: block;
    margin: 0px auto 10px auto;
  }
}
.arrow {
  display: flex;
  justify-content: center;
  button {
    margin: 30px 100px;
  }
}
</style>