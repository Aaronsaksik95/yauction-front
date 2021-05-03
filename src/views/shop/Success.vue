<template>
  <div class="success">
    <h1>Félicitation votre offre a bien été prise en compte.</h1>
    <small
      >Si une nouvelle offre est proposé vous serez remboursé dans les plus
      brefs délai.</small
    >
    <router-link to="/myOffers/waiting">Mes offres →</router-link>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiOffers from "../../mixins/ApiOffers";
import ApiProducts from '../../mixins/ApiProducts';
export default {
  components: {
    TitlePage,
  },
  data: function () {
    return {
      product: [],
      productId: localStorage.getItem("product"),
      price: localStorage.getItem("price"),
    };
  },
  mixins: [ApiOffers, ApiProducts],
  created() {
    this.get_product(this.productId)
      .then((data) => {
        this.product = data.product;
        this.offer(this.price);
      })
      .catch((err) => console.log(err));
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.success {
  color: #39cdd8;
}
a {
  color: rgb(116, 116, 116);
  font-weight: bold;
}
</style>