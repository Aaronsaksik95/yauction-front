<template>
  <div class="success">
    <h1>Félicitation votre commande a bien été éffectué.</h1>
    <router-link to="/orders">Mes commandes →</router-link>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiOffers from "../../mixins/ApiOffers";
export default {
  components: {
    TitlePage,
  },
  mixins: [ApiOffers],
  created() {
  },
  computed: {
    
  },
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