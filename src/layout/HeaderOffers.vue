<template>
  <header class="header__main">
    <div class="header__nav">
      <ul>
        <li @click="refresh">
          <router-link to="/myOffers/waiting">En cours</router-link>
        </li>
        <li @click="refresh">
          <router-link to="/myOffers/validated">Validées</router-link>
        </li>
        <li @click="refresh">
          <router-link to="/myOffers/refused">Refusées</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    refresh() {
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.header__nav {
  ul {
    font-weight: bold;
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin-bottom: 0px;
    li {
      margin: 20px;
      a {
        color: #009da8;
      }
    }
  }
}
</style>