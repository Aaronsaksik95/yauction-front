<template>
  <header class="header__main">
    <div class="header__nav">
      <ul>
        <li><router-link to="/admin/products/voiture">Produits</router-link></li>
        <li><router-link to="/admin/Users">Users</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {};
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