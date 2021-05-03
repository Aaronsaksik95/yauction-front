<template>
  <header class="header__main">
    <div class="header__nav">
      <ul>
        <li @click="refresh"><router-link to="/admin/products/voiture">Voiture</router-link></li>
        <li @click="refresh">
          <router-link to="/admin/products/moto">Moto</router-link>
        </li>
        <li @click="refresh"><router-link to="/admin/products/scooter">Scooter</router-link></li>
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
        color: black;
        font-weight: 100;
      }
    }
  }
}
</style>