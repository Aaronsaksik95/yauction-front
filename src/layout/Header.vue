<template>
  <header class="header__main">
    <div class="cap"></div>
    <div class="header__nav">
      <div class="link-home">
        <router-link to="/home">
          <img src="../assets/logo.png" alt="" />
        </router-link>
      </div>
      <div class="nav-page">
        <ul>
          <li @click="refresh">
            <router-link class="deco-hover" to="/vehicle?vehicle=voiture"
              ><strong>Voiture</strong></router-link
            >
          </li>
          <li @click="refresh">
            <router-link class="deco-hover" to="/vehicle?vehicle=moto"
              ><strong>Moto</strong></router-link
            >
          </li>
          <li @click="refresh">
            <router-link class="deco-hover" to="/vehicle?vehicle=scooter"
              ><strong>Scooter</strong></router-link
            >
          </li>
          <li><router-link class="deco-hover" to="/myOffers/waiting">Mes offres</router-link></li>
          <li>
            <router-link class="deco-hover" to="/mySales/addProduct">Mes ventes</router-link>
          </li>
          <li><router-link class="deco-hover" to="/login">S'identifier</router-link></li>
          <li v-if="this.isAdmin">
            <router-link class="deco-hover" to="/admin/products/voiture">Admin</router-link>
          </li>
        </ul>
      </div>
      <Search class="search" />
      <div class="nav-tool">
        <ul>
          <li>
            <router-link to="/profil"
              ><img class="img-icon" src="../assets/profil.png" alt=""
            /></router-link>
          </li>
          <li>
            <router-link to="/whish"
              ><img class="img-icon" src="../assets/whish.png" alt=""
            /></router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Search from "../components/product/Search";
import ApiUsers from "../mixins/ApiUsers";
export default {
  components: {
    Search,
  },
  data: function () {
    return {
      isAdmin: false,
    };
  },
  mixins: [ApiUsers],
  created() {
    this.isAdmin = this.is_admin();
  },
  methods: {
    refresh() {
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.deco-hover:hover {
  border-bottom: 3px solid #e093ff;
}
.cap {
  width: 100%;
  height: 30px;
  background-color: #fbf1ff;
}
.link-home {
  margin: 5px 50px 0px 10px;
  img {
    width: 60px;
  }
}
.header__nav {
  display: flex;
  margin-bottom: 20px;
  a {
    color: black;
  }
  .nav-page {
    ul {
      text-transform: uppercase;
      display: flex;
      list-style-type: none;
      margin-bottom: 0px;
      font-size: 14px;
      padding: 0px;
      li {
        margin: 20px;
      }
    }
  }
  .search {
    margin: 25px 0px 0px 70px;
    width: 300px;
  }
  .nav-tool {
    margin-left: 0px;
    ul {
      font-weight: bold;
      display: flex;
      list-style-type: none;
      margin-left: 30px;
      li {
        margin: 15px 10px 10px 10px;
        .img-icon {
          width: 27px;
        }
      }
    }
  }
}
</style>