<template>
  <div>
    <div class="detail">
      <div class="img-desc">
        <img class="img" :src="product.image" alt="image produit" />
        <div class="desc">
        <p>
          {{ product.description }}
        </p>
        </div>
      </div>

      <div class="info-product">
        <p class="brand">{{ product.brand.title }}</p>
        <p class="model">{{ product.model.title }}</p>
        <div class="info">
          <div>
            <p class="title">Etat</p>
            <p class="data">{{ product.state }}</p>
          </div>
          <div>
            <p class="title">Année</p>
            <p class="data">{{ product.year }}</p>
          </div>
          <div>
            <p class="title">Couleur</p>
            <p class="data">{{ product.color }}</p>
          </div>
          <div>
            <p class="title">Energie</p>
            <p class="data">{{ product.energy }}</p>
          </div>
          <div>
            <p class="title">Kilométrage</p>
            <p class="data">{{ product.mileage }} Km</p>
          </div>
          <div>
            <p class="title">Siège</p>
            <p class="data">{{ product.seat }}</p>
          </div>
          <div>
            <p class="title">Région</p>
            <small class="region">{{ product.region }}</small>
          </div>
        </div>
      </div>

      <div class="offer">
        <router-link class="link-offer" :to="`/productOffers/${product._id}`"
          >Voir les offres</router-link
        >
        <div v-if="display">
          <input
            class="price-input"
            type="number"
            v-model="product.startingPrice"
          />
          <Button
            class="btn btn-validate"
            btnText="Valider mon offre"
            :btnFunction="() => newOffer(product.startingPrice)"
          />
          <Button
            class="btn btn-medium"
            btnText="Annuler"
            :btnFunction="displayInputFalse"
          />
          <p class="message">{{ message }}</p>
        </div>
        <div v-else>
          <p class="price">{{ product.startingPrice }} €</p>
          <p v-if="product.isSold">Produit vendu</p>
          <div v-else>
            <Button
              class="btn btn-validate btn-medium"
              btnText="Faire une offre"
              :btnFunction="displayInput"
            />
            <p class="message">
              Une fois l'offre effectuée aucun retour n'est possible.
            </p>
          </div>
        </div>
        <div v-if="!product.isSold" class="countdown">
          <p v-if="countDay != 0" class="d">{{ countDay }} <small>J</small></p>
          <p v-if="countHours != 0" class="h">
            {{ countHours }} <small>H</small>
          </p>
          <p v-if="countMinute != 0" class="m">
            {{ countMinute }} <small>M</small>
          </p>
          <p v-if="countsecond != 0" class="s">
            {{ countsecond }} <small>S</small>
          </p>
        </div>
        <div class="tools">
          <Button
            class="btn btn-large"
            btnText="Favoris"
            :btnFunction="addWhish"
          />
        </div>
      </div>
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
      countDay: "",
      countHours: "",
      countMinute: "",
      countsecond: "",
      date: "",
    };
  },
  mixins: [ApiProducts, Whish, ApiOffers],
  created() {
    this.get_product(this.$route.params.id)
      .then((data) => {
        this.product = data.product;
        this.date = data.product.auctionEndDate;
        localStorage.setItem("product", this.product._id);
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
    displayInputFalse() {
      this.display = false;
      this.product.startingPrice = this.formerPrice;
    },
    newOffer(newPrice) {
      if (newPrice <= this.formerPrice) {
        this.message =
          "Vous ne pouvez pas réencherir avec une somme inférieur ou identique.";
      } else {
        localStorage.setItem("price", newPrice);
        this.stripeOrder();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  margin: 100px 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  .img-desc {
    grid-column: 1 / span 6;
    .img {
      width: 100%;
    }
    .desc {
      width: 100%;
      text-align: justify;
    }
  }
  .info-product {
    grid-column: 8 / span 2;
    text-align: left;
    .model {
      margin: 10px 0px;
      font-size: 20px;
      color: #1d676d;
    }
    .brand {
      margin: 10px 0px;
      font-size: 20px;
      font-weight: bold;
      color: #39cdd8;
      text-transform: uppercase;
    }
    .info {
      :hover {
        background: #fbf1ff;
      }
      div {
        display: flex;
        justify-content: space-between;
        .title {
          font-weight: bold;
          background: #d3d3d3;
          padding: 3px 5px;
          border-radius: 10px;
          margin: 10px 0px;
        }
        .data {
          margin: 17px 0px;
          text-transform: uppercase;
          font-size: 13px;
        }
      }
    }
  }
  .offer {
    grid-column: 11 / span 2;
    padding-top: 50px;
    .link-offer {
      color: #d874ff;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 13px;
      border: 1px solid #d874ff;
      padding: 5px;
      border-radius: 5px;
    }
    .price {
      margin: 40px 10px 10px 10px;
      color: rgb(98, 98, 98);
      font-weight: bold;
      font-size: 20px;
    }
    .price-input {
      margin: 20px auto 0px auto;
      color: rgb(98, 98, 98);
      font-weight: bold;
    }
    .message {
      text-align: justify;
      width: 70%;
      margin: 2px auto;
      font-size: 10px;
      color: red;
    }
    .countdown {
      display: flex;
      justify-content: center;
      p {
        font-size: 25px;
        padding: 3px;
        small {
          font-size: 8px;
        }
      }
      .d {
        color: #000000;
      }
      .h {
        color: #646464;
      }
      .m {
        color: #8f8f8f;
      }
      .s {
        color: #bebebe;
      }
    }
  }
}
.region {
  font-size: 11px;
  margin: 20px 0;
}
</style>