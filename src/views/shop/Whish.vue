<template>
  <div>
    <div v-if="whish">
      <TitlePage :title="myTitle" />
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-2">Aperçu</div>
          <div class="col col-1">Marque</div>
          <div class="col col-1">Modèle</div>
          <div class="col col-1">Année</div>
          <div class="col col-1">Prix</div>
          <div class="col col-1">Produit</div>
          <div class="col col-1">Supprimer</div>
        </li>
        <li class="table-row" v-for="item in whish" :key="item.id">
          <div class="col col-2">
            <img class="img-produits" :src="item.image" alt="image produit" />
          </div>
          <div class="col col-1">{{ item.brand }}</div>
          <div class="col col-1">{{ item.model }}</div>
          <div class="col col-1">{{ item.year }}</div>
          <div class="col col-1">{{ item.startingPrice }} €</div>
          <div class="col col-1">
            <router-link :to="`/product/${item._id}`"
              >Faire une offre</router-link
            >
          </div>
          <div class="col col-1">
            <div class="div-icon">
              <img
                @click="() => removeItemWhish(item)"
                class="img-icon"
                src="../../assets/corbeille.png"
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
      <Button
        class="btn btn-whitePink"
        btnText="Supprimer les favoris"
        :btnFunction="removeWhish"
      />
    </div>

    <div v-else>
      <h2>Les articles ajoutés à vos favoris seront enregistrés ici.</h2>
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import ProductsGrid from "../../components/product/ProductGrid";
import Whish from "../../mixins/Whish";

export default {
  name: "Whish",
  components: {
    TitlePage,
    Button,
    ProductsGrid,
  },
  data: function () {
    return {
      myTitle: "Mes favoris",
      whish: [],
      d_button: false,
      products: [],
    };
  },
  mixins: [Whish, ApiProducts],
  created() {
    this.whish = this.get_whish();
    this.get_products()
      .then((data) => {
        for (var i = 0; i < 4; i++) {
          this.products.push(data.products[i]);
        }

      console.log(this.products)
      })
      .catch((err) => console.log(err));
  },
  methods: {
    editQuantity(qty, id) {
      this.edit_quantity(qty, id);
    },
    displayButton() {
      this.d_button = true;
    },
    removeWhish() {
      this.remove_whish();
    },
    removeItemWhish(item) {
      this.remove_item_whish(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.responsive-table {
  width: 50%;
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
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 30%;
  }
}
.grid {
  width: 50%;
  margin: auto;
  margin-top: 50px;
}
</style>