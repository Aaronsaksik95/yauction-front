<template>
  <div v-click-outside="DivResultNone">
    <input
      class="search"
      type="text"
      placeholder="Recherche un modèle..."
      v-model="searchValue"
      @click="DivResult"
    />
    <div v-if="(searchValue != '') & search" class="div-result">
      <ul class="list-result" v-if="filteredShop.length > 0">
        <li
          class="item-result"
          v-for="item in filteredShop"
          :key="item._id"
          @click="itemResult"
        >
          <router-link :to="`/product/${item._id}`">
            <div class="col col-1">
              <img class="img-produits" :src="item.image" alt="image produit" />
            </div>
            <p>
              {{ item.brand.title }} <small>{{ item.model.title }}</small>
            </p>
          </router-link>
        </li>
      </ul>
      <h4 v-else>Aucun résultat...</h4>
    </div>
  </div>
</template>
<script>
import ApiProducts from "../../mixins/ApiProducts";
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      search: false,
      products: [],
      searchValue: "",
    };
  },
  mounted() {},
  computed: {
    filteredShop: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter((item) => item.model.title.match(filter));
    },
  },
  mixins: [ApiProducts],
  created() {},
  methods: {
    DivResult: function () {
      this.search = true;
      this.get_products()
        .then((data) => {
          this.products = data.products;
        })
        .catch((err) => console.log(err));
    },
    itemResult() {
      document.location.reload();
    },
    DivResultNone() {
      this.search = false;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style lang="scss" scoped>
.search {
  height: 40px;
  border-radius: 10px;
  text-indent: 5px;
  width: 100%;
  background-color: rgb(223, 223, 223);
}
.div-result {
  position: relative;
  width: 100%;
  margin: 0px 0px 0px 5px;
  z-index: 2;
  height: auto;
  max-height: 300px;
  border: 1px solid rgb(204, 204, 204);
  background-color: #fff;
  border-radius: 10px;
  .list-result {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0px;
    max-height: 270px;
    overflow: scroll;
    .item-result {
      a {
        color: #009da8;
      }
      p {
        margin: 0px;
        font-size: 13px;
        font-weight: bold;
      }
      small {
        font-size: 9px;
      }
      .img-produits {
        width: 90%;
      }
    }
  }
}
</style>