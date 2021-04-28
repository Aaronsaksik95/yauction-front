<template>
  <div>
    <div v-if="offers.length != 0">
      <div class="offers">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-2">Offre</div>
            <div class="col col-1">Date</div>
            <div class="col col-1">Heure</div>
            <div class="col col-1">Prix offert</div>
            <div class="col col-1">Produit</div>
            <div class="col col-1">Status</div>
          </li>
          <li class="table-row" v-for="i in offers" :key="i._id" >
            <div class="col col-2">
              {{ i._id }}
            </div>
            <div class="col col-1">
              {{ i.created_at.substring(0, 10) }}
            </div>
            <div class="col col-1">
              {{ i.created_at.substring(11, 16) }}
            </div>
            <div class="col col-1">
              <strong>{{ i.offeredPrice }}€</strong>
            </div>
            <div class="col col-1">
              <router-link :to="`/product/${i.product._id}`"
                >Faire une offre</router-link
              >
            </div>
            <div class="col col-1">
              <strong>{{ i.status }}</strong>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <TitlePage title="Il n'y a actuellement aucune offre." />
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
    };
  },
  components: {
    Button,
    TitlePage,
    HeaderOffers,
  },
  mixins: [ApiUsers, ApiProducts, ApiOffers, ApiBrands],
  methods: {},
  created(){
    this.get_product_offers().then((data) => {
      this.offers = data.offers;
    });
  },
};
</script>

<style lang="scss" scoped>
.offers {
  
  margin: 0px 200px 100px 200px;
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
      color: #39cdd8;
      font-weight: bold;
    }
  }
  .table-header {
    background-color: #39cdd8;
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
</style>