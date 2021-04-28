<template>
  <div>
    <HeaderAdmin />
    <div class="info-user">
      <label for="">Prenom</label>
      <input v-model="user.firstName" type="text" />
    </div>
    <div class="info-user">
      <label for="">Nom</label>
      <input v-model="user.lastName" type="text" />
    </div>
    <div class="info-user">
      <label for="">Email</label>
      <p>{{ user.email }}</p>
    </div>
    <div class="info-user">
      <label for="">Phone</label>
      <p>{{ user.phone }}</p>
    </div>
    <div class="info-user">
      <label for="">Adresse</label>
      <input v-model="user.address" type="text" />
    </div>
    <div class="info-user">
      <label for="">Ville</label>
      <input v-model="user.city" type="text" />
    </div>
    <div class="info-user">
      <label for="">Code postal</label>
      <input v-model="user.postalCode" type="text" />
    </div>
    <div class="info-user">
      <label for="">Pays</label>
      <input v-model="user.country" type="text" />
    </div>
    <div class="info-user">
      <label for="">Is Admin</label>
      <input class="is-admin" v-model="user.isAdmin" type="checkbox" />
    </div>
    <Button
      class="btn btn-orange"
      btnText="Modifier"
      :btnFunction="() => updateUser(user._id)"
    />
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import ApiUsers from "../../mixins/ApiUsers";
import HeaderAdmin from "../../layout/HeaderAdmin";


export default {
  data: function () {
    return {
      user: []
    };
  },
  components: {
    Button,
    HeaderAdmin
  },
  mixins: [ApiUsers],
  methods: {
    updateUser(id) {
      this.update_user_admin(id)
        .then(() => {
          this.$router.push("../users");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    this.get_user_admin(this.$route.params.id)
      .then((data) => {
        this.user = data.user;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.info-user {
  p {
    margin: 0px;
  }
  .is-admin{
    width: 20px;
  }
  label {
    font-weight: bold;
  }  
}
input {
    margin: auto;
    width: 200px;
  }
</style>