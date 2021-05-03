<template>
  <div>
    <HeaderOffers />
    <div v-if="offers.length != 0">
      <div v-for="i in offers" :key="i._id" class="offers">
        <div class="info-offer">
          <p><strong>Offre:</strong> {{ i._id }}</p>
          <p><strong>Date:</strong> {{ i.created_at.substring(0, 10) }}</p>
          <p><strong>Heure:</strong> {{ i.created_at.substring(11, 16) }}</p>
          <p>
            Status: <strong :class="[colortext]">{{ i.status }}</strong>
          </p>
        </div>
        <ul class="responsive-table">
          <li class="table-header" :class="[colorbgd]">
            <div class="col col-2">Aperçu</div>
            <div class="col col-2">Prix offert</div>
            <div class="col col-2">Produit</div>
          </li>
          <li class="table-row">
            <div class="col col-2">
              <img
                class="img-produits"
                :src="i.product.image"
                alt="image produit"
              />
            </div>
            <p>
              <strong>{{ i.offeredPrice }}€</strong>
            </p>
            <div class="col col-2">
              <router-link :class="[colortext]" :to="`/product/${i.product._id}`"
                >Voir le produit</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <TitlePage
        :title="`Vous n'avez pas d'offre ${this.$route.params.status}`"
      />
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import TitlePage from "../../components/tools/TitlePage";
import ApiOffers from "../../mixins/ApiOffers";
import ApiProducts from "../../mixins/ApiProducts";
import ApiUsers from "../../mixins/ApiUsers";
import HeaderOffers from "../../layout/HeaderOffers";
import ApiBrands from "../../mixins/ApiBrands";

export default {
  data: function () {
    return {
      myTitle: "Mes commandes",
      idProductOrder: [],
      products: [],
      idOrders: [],
      offers: [],
      status: this.$route.params.status,
      colorbgd: "",
      colortext: "",
    };
  },
  components: {
    Button,
    TitlePage,
    HeaderOffers,
  },
  mixins: [ApiUsers, ApiProducts, ApiOffers, ApiBrands],
  methods: {},
  created: function (id) {
    this.get_my_offers(id).then((data) => {
      this.offers = data.myOffers;
    });
    if (this.status == "waiting") {
      this.colorbgd = "waiting";
      this.colortext = "waitingText";
    } else if (this.status == "validated") {
      this.colorbgd = "validated";
      this.colortext = "validatedText";
    } else if (this.status == "refused") {
      this.colorbgd = "refused";
      this.colortext = "refusedText";
    }
  },
};
</script>

<style lang="scss" scoped>
.offers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0px 200px 100px 200px;
  .info-offer {
    grid-column: 1 / span 2;
    text-align: left;
    border-bottom: 1px solid rgb(172, 172, 172);
    margin: 30px;
  }
}
.responsive-table {
  grid-column: 3 / span 2;
  margin: auto;
  li {
    border-radius: 30px;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .img-produits {
      width: 100%;
    }
    a {
      font-weight: bold;
    }
  }
  .table-header {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 30%;
  }
}
.waiting {
  background-color: #d874ff;
}
.validated {
  background-color: #39cdd8;
}
.refused {
  background-color: #ff7979;
}
.waitingText {
  color: #d874ff;
}
.validatedText {
  color: #39cdd8;
}
.refusedText {
  color: #ff7979;
}
</style>