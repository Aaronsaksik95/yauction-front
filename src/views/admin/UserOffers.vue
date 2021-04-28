<template>
  <div>
    <HeaderAdmin />
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Status</div>
        <div class="col col-1">User id</div>
        <div class="col col-1">User email</div>
        <div class="col col-1">Date offre</div>
        <div class="col col-1">Prix offre</div>
        <div class="col col-1">Id produit</div>
        <div class="col col-1">Image produit</div>
      </li>
      <li class="table-row" v-for="item in offers" :key="item._id">
        <div class="col col-1">{{ item.status }}</div>
        <div class="col col-1 id">{{ item.user._id }}</div>
        <div class="col col-1">{{ item.user.email }}</div>
        <div class="col col-1">{{ item.created_at }}</div>
        <div class="col col-1">{{ item.offeredPrice }} €</div>

        <div class="col col-1 id">
          {{ item.product._id }}
        </div>
        <div class="col col-1">
          <img
            class="img-produits"
            :src="item.product.image"
            alt="image produit"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../../components/tools/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";
import ApiOffers from "../../mixins/ApiOffers";

export default {
  name: "Shops",
  components: {
    TitlePage,
    Button,
    HeaderAdmin,
  },
  data: function () {
    return {
      myTitle: "Produits",
      offers: [],
      searchValue: "",
      isStatus: "",
      status: "",
    };
  },
  mixins: [ApiProducts, ApiOffers],
  created() {
    this.get_user_offers()
      .then((data) => {
        this.offers = data.offers;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteOrder(id) {
      this.delete_order(id).catch((err) => console.log(err));
      document.location.reload();
    },
    updateStatus(id) {
      this.update_status(id);
      document.location.reload();
    },
    updateTrue(id) {
      this.isStatus = id;
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
  width: 90%;
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
  .col-1 {
    flex-basis: 10%;
  }
  select {
    width: 100px;
  }
  .id{
    font-size: 10px;
  }
}
</style>