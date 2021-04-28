<template>
  <div>
    <HeaderProducts />
    <div class="search__form">
      <input
        type="text"
        v-model="searchValue"
        placeholder="Recherche un modèle..."
      />
    </div>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Image/ID</div>
        <div class="col col-1">Marque</div>
        <div class="col col-1">Modèle</div>
        <div class="col col-1">Price</div>
        <div class="col col-1">Etat</div>
        <div class="col col-1">Année</div>
        <div class="col col-1">Energie</div>
        <div class="col col-1">KM</div>
        <div class="col col-1">Date limite</div>
        <div class="col col-1">Supprimer</div>
        <div class="col col-1">Modifier</div>
        <div class="col col-1">Offres</div>
      </li>
      <li class="table-row" v-for="item in filteredProds" :key="item._id">
        <div class="col col-1">
          <img class="img-produits" :src="item.image" alt="image produit" />
          <div class="col col-1 id">{{ item._id }}</div>
        </div>
        
        <div class="col col-1">{{ item.brand.title }}</div>
        <div class="col col-1">{{ item.model.title }}</div>
        <div class="col col-1">{{ item.startingPrice }}</div>
        <div class="col col-1">{{ item.state }}</div>
        <div class="col col-1">{{ item.year }}</div>
        <div class="col col-1">{{ item.energy }}</div>
        <div class="col col-1">{{ item.mileage }}</div>
        <div class="col col-1">{{ item.auctionEndDate.substring(0, 10) }}</div>

        <div class="col col-1">
          <Button
            class="btn btn-delete"
            btnText="Supprimer"
            :btnFunction="() => deleteProduct(item._id)"
          />
        </div>
        <div class="col col-1">
          <router-link
            class="btn btn-warning"
            :to="`./updateProduct/${item._id}`"
            >Modifier</router-link
          >
        </div>
        <div class="col col-1">
          <router-link
            class="btn btn-warning"
            :to="`/productOffers/${item._id}`"
            >Les Offres</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ProductsGrid from "../../components/product/ProductGrid";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../../components/tools/Button";
import HeaderProducts from "../../layout/HeaderProducts";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Button,
    HeaderProducts
  },
  data: function () {
    return {
      myTitle: "Produits",
      products: [],
      searchValue: "",
      vehicle: this.$route.params.vehicle,
    };
  },
  computed: {
    filteredProds: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter((item) => item.model.title.match(filter));
    },
  },
  mixins: [ApiProducts],
  created() {
    this.get_products_user()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteProduct(id) {
      this.delete_product(id).catch((err) => console.log(err));
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.search__form {
  input {
    width: 200px;
    margin: auto;
  }
}
.responsive-table {
  width: 95%;
  margin: 20px auto;
  li {
    border-radius: 10px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .img-produits {
      width: 100%;
    }
    a{
      color: rgb(255, 157, 0);
      font-weight: bold;
    }
    .div-icon {
      width: 35px;
      height: 35px;
      border-radius: 50px;
      background-color: rgb(219, 219, 219);
      margin: auto;
      .img-icon {
        margin-top: 15%;
        width: 70%;
        border-radius: 10px;
      }
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
  .id{
    font-size: 10px;
  }
  .col-1 {
    flex-basis: 10%;
  }
  select{
    width: 100px;
  }
}
</style>