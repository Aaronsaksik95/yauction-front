<template>
  <header class="header__main">
    <div class="header__nav">
      <ul>
        <li><router-link class="product" to="/admin/products/voiture">Produits</router-link></li>
        <li><router-link class="user" to="/admin/Users">Users</router-link></li>
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
      .product {
        color: #39cdd8;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        border: 1px solid #39cdd8;
        padding: 5px;
        border-radius: 5px;
      }
      .user {
        color: #d874ff;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        border: 1px solid #d874ff;
        padding: 5px;
        border-radius: 5px;
      }
    }
  }
}
</style>