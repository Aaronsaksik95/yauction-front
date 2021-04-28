<template>
  <div class="card">
    <div class="product">
      <router-link :to="`/product/${productObject._id}`">
        <img
          class="img-produits"
          :src="productObject.image"
          alt="image produit"
        />
      </router-link>
      <div class="info-tools" v-if="detail">
        <router-link :to="`/product/${productObject._id}`">
          <div class="infos">
            <h5 class="brand-produit">{{ productObject.brand.title }}</h5>
            <h6 class="model-produit">{{ productObject.model.title }}</h6>
            <p class="year-produit">
              {{ productObject.year }}
            </p>
            <p class="price-produit">{{ productObject.startingPrice }} €</p>
          </div>
        </router-link>
        <div class="tools">
          <div @click="addWhish">
            <img class="img-icon" src="../../assets/whish.png" />
          </div>
          <router-link v-if="productObject.user == decode.id" class="container-update" :to="`/mySales/updateProduct/${productObject._id}`">
            Modifier
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import Whish from "../../mixins/Whish";
import VueJwtDecode from "vue-jwt-decode";
export default {
  components: {
    Button,
  },
  data: function () {
    return {
      contentDesc: false,
      token: "",
      decode: {}
    };
  },
  props: {
    productObject: {
      required: true,
      type: Object,
    },
    detail: Boolean,
  },
  created(){
    this.token = localStorage.getItem("token")
    this.decode = VueJwtDecode.decode(this.token)
  },
  mixins: [Whish],
  methods: {
    addWhish() {
      this.add_whish(this.productObject);
    },
    descPlus() {
      if (this.contentDesc == true) {
        this.contentDesc = false;
      } else {
        this.contentDesc = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 0px;
  margin-bottom: 30px;
}
.product {
  a {
    color: black;
  }
  font-size: 20px;
  .img-produits {
    width: 80%;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
  .info-tools {
    display: flex;
    justify-content: space-around;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 5px;
    width: 78%;
    margin: auto;
    .infos {
      position: relative;
      text-align: left;
      .brand-produit {
        color: #39cdd8;
        margin: 5px 0px 7px 0px;
        width: 250px;
        overflow: hidden;
      }
      .model-produit {
        font-weight: bold;
        margin: 0px;
      }
      .year-produit {
        color: rgb(102, 102, 102);
        margin: 0px;
        font-size: 15px;
      }
      .desc-plus {
        position: absolute;
        top: 55px;
        border-radius: 10px;
        padding: 5px;
        font-size: 13px;
        background-color: rgb(233, 233, 233);
        z-index: 2;
        text-align: justify;
      }
      .price-produit {
        font-weight: bold;
        margin: 0px;
      }
    }
    .tools {
      :hover {
        background-color: #9fe4e9;
      }
      div {
        margin: 10px ;
        width: 30px;
        height: 30px;
        border-radius: 50px;
        background-color: rgb(219, 219, 219);
        .img-icon {
          margin-top: 10%;
          width: 80%;
          border-radius: 5px;
        }
      }
      .container-update {
        width: 20px;
        height: 20px;
        border-radius: 7px;
        padding: 5px;
        font-size: 13px;
        background-color: #39cdd8;
      }
    }
  }
}
</style>