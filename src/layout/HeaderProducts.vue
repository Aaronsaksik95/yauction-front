<template>
  <header class="header__main">
    <div class="header__nav">
      <ul>
        <li>
          <router-link class="add" to="/mySales/addProduct"
            >Créer un produit</router-link
          >
        </li>
        <li>
          <router-link class="my" to="/mySales/myProducts"
            >Mes produits</router-link
          >
        </li>
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
      .add {
        color: #39cdd8;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        border: 1px solid #39cdd8;
        padding: 5px;
        border-radius: 5px;
      }
      .my {
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