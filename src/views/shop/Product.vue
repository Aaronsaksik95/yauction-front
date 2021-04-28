<template>
  <div>
    <div class="detail">
      <img class="img-product" :src="product.image" alt="image produit" />
      <div class="info-product">
        <p class="brand">{{ product.brand.title }}</p>
        <p class="model">{{ product.model.title }}</p>
        <div v-if="display">
          <input type="number" v-model="product.startingPrice" />
          <Button
            class="btn btn-large"
            btnText="Valider"
            :btnFunction="() => newOffer(product.startingPrice)"
          />
          <p>{{ message }}</p>
        </div>
        <div v-else>
          <p class="price">{{ product.startingPrice }} €</p>
          <p v-if="product.isSold">Produit vendu</p>
          <Button
            v-else
            class="btn btn-large"
            btnText="Faire une offre"
            :btnFunction="displayInput"
          />
        </div>
        <router-link :to="`/productOffers/${product._id}`"
          >Voir les offres</router-link
        >

        <div class="tools">
          <Button
            class="btn btn-large"
            btnText="Favoris"
            :btnFunction="addWhish"
          />
        </div>
      </div>
      <div>
        <div>
          <p class="title">Etat</p>
          <p>{{ product.state }}</p>
        </div>
        <div>
          <p class="title">Année</p>
          <p>{{ product.year }}</p>
        </div>
        <div>
          <p class="title">Couleur</p>
          <p>{{ product.color }}</p>
        </div>
        <div>
          <p class="title">Energie</p>
          <p>{{ product.energy }}</p>
        </div>
        <div>
          <p class="title">Kilométrage</p>
          <p>{{ product.mileage }}</p>
        </div>
        <div>
          <p class="title">Siège</p>
          <p>{{ product.seat }}</p>
        </div>
        <div>
          <p class="title">Région</p>
          <p>{{ product.region }}</p>
        </div>
      </div>
      <p>{{ countDown }}</p>
    </div>
    <div class="desc">
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import Button from "../../components/tools/Button";
import ApiProducts from "../../mixins/ApiProducts";
import Whish from "../../mixins/Whish";
import ApiOffers from "../../mixins/ApiOffers";

export default {
  name: "Product",
  components: {
    TitlePage,
    Button,
  },
  data: function () {
    return {
      myTitle: "Page shops",
      product: [],
      display: false,
      formerPrice: null,
      message: "",
      countDown: "",
      date: "",
    };
  },
  mixins: [ApiProducts, Whish, ApiOffers],
  async created() {
    await this.get_product(this.$route.params.id)
      .then((data) => {
        this.product = data.product;
        this.date = data.product.auctionEndDate;
      })
      .catch((err) => console.log(err));
    this.getCountdown();
  },
  methods: {
    getCountdown() {
      this.get_countdown();
    },
    addWhish() {
      this.add_whish(this.product);
    },
    displayInput() {
      this.display = true;
      this.formerPrice = this.product.startingPrice;
    },
    newOffer(newPrice) {
      if (newPrice <= this.formerPrice) {
        this.message =
          "Vous ne pouvez pas réencherir avec une somme inférieur.";
      } else {
        this.offer(newPrice);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  margin: 100px;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  .img-product {
    grid-column: 1 / span 8;
    width: 80%;
  }
  .info-product {
    grid-column: 9 / span 1;
    text-align: left;
    .genre {
      margin: 10px 0px 0px 10px;
      font-size: 20px;
      font-weight: bold;
      color: #39cdd8;
    }
    .title {
      margin: 0px 0px 0px 10px;
      font-size: 35px;
    }
    .price {
      margin: 10px;
      color: rgb(40, 162, 43);
      font-weight: bold;
    }
    .label {
      margin: 10px;
    }
    .desc {
      margin: 0px 0px 25px 0px;
      font-size: 17px;
      max-height: 300px;
      text-align: justify;
      width: 200px;
      overflow: auto;
    }
  }
}
</style>