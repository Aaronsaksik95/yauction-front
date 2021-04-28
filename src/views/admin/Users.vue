<template>
  <div>
    <HeaderAdmin />
    <div class="search__form">
      <input type="text" v-model="searchValue" placeholder="Recherche un email..."/>
    </div>

<ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Id</div>
        <div class="col col-1">Prénom</div>
        <div class="col col-1">Nom</div>
        <div class="col col-2">Email</div>
        <div class="col col-2">Phone</div>
        <div class="col col-1">Adresse</div>
        <div class="col col-1">Ville</div>
        <div class="col col-1">IsAdmin</div>
        <div class="col col-1">Supprimer</div>
        <div class="col col-1">Modifier</div>
        <div class="col col-1">Les offres</div>
      </li>
      <li class="table-row" v-for="item in filteredUser" :key="item._id">
        <div class="col col-1 id">{{ item._id }}</div>
        <div class="col col-1">{{ item.firstName }}</div>
        <div class="col col-1">{{ item.lastName }}</div>
        <div class="col col-2">{{ item.email }}</div>
        <div class="col col-2">{{ item.phone }}</div>
        <div class="col col-1">{{ item.address }}</div>
        <div class="col col-1">{{ item.city }}</div>
        <div class="col col-1">{{ item.isAdmin }}</div>

        <div class="col col-1">
          <Button
              class="btn btn-delete"
              btnText="Supprimer"
              :btnFunction="() => deleteUser(item._id)"
            />
        </div>
        <div class="col col-1">
          <router-link
              class="btn btn-warning"
              :to="`/admin/updateUser/${item._id}`"
              >Modifier</router-link
            >
        </div>
        <div class="col col-1">
          <router-link
            class="btn btn-warning"
            :to="`/admin/userOffers/${item._id}`"
            >Les Offres</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ProductsGrid from "../../components/product/ProductGrid";
import ApiUsers from "../../mixins/ApiUsers";
import Button from "../../components/tools/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Button,
    HeaderAdmin,
  },
  data: function () {
    return {
      myTitle: "Produits",
      users: [],
      searchValue: "",
      display_update: true,
    };
  },
  computed: {
    filteredUser: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.users.filter((item) => item.email.match(filter));
    },
  },
  mixins: [ApiUsers],
  created() {
    this.get_users()
      .then((data) => {
        this.users = data.users;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteUser(id) {
      this.delete_user(id).catch((err) => console.log(err));
      document.location.reload();
    },
    displayUpdateButton() {
      this.display_update = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.search__form {
  input {
    width: 200px;
    margin: auto;
  }
}
.responsive-table {
  width: 90%;
  margin: 20px auto;
  li {
    border-radius: 10px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .img-produits {
      width: 100%;
    }
    a{
      color: rgb(255, 157, 0);
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
  .id{
    font-size: 10px;
  }
  .col-1 {
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 30%;
  }
}
</style>