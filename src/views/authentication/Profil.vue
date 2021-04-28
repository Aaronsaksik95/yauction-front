<template>
  <div>
    <TitlePage title="Mon profil" />
    <div class="profil">
      <div class="div-flex">
        <div class="info-user">
          <label for="">Prenom:</label>
          <input v-if="edit" v-model="user.firstName" type="text" />
          <p v-else>{{ user.firstName }}</p>
        </div>
        <div class="info-user">
          <label for="">Nom:</label>
          <input v-if="edit" v-model="user.lastName" type="text" />
          <p v-else>{{ user.lastName }}</p>
        </div>
        <div class="info-user">
          <label for="">Email:</label>
          <p>{{ user.email }}</p>
        </div>
        <div class="info-user">
          <label for="">Phone:</label>
          <p>{{ user.phone }}</p>
        </div>
        <div class="info-user">
          <label for="">Adresse:</label>
          <input v-if="edit" v-model="user.address" type="text" />
          <p v-else>{{ user.address }}</p>
        </div>
        <div class="info-user">
          <label for="">Ville:</label>
          <input v-if="edit" v-model="user.city" type="text" />
          <p v-else>{{ user.city }}</p>
        </div>
        <div class="info-user">
          <label for="">Code postal:</label>
          <input v-if="edit" v-model="user.postalCode" type="text" />
          <p v-else>{{ user.postalCode }}</p>
        </div>
        <div class="info-user">
          <label for="">Pays:</label>
          <input v-if="edit" v-model="user.country" type="text" />
          <p v-else>{{ user.country }}</p>
        </div>
      </div>
      <div v-if="!isAdmin">
        <Button
          v-if="!edit"
          class="btn btn-update btn-large"
          btnText="Modifier"
          :btnFunction="editTrue"
        />
        <Button
          v-else
          class="btn btn-validate btn-large"
          btnText="Valider"
          :btnFunction="editUser"
        />
      </div>
      <Button
        class="btn btn-large btn-delete"
        btnText="Déconnexion"
        :btnFunction="logout"
      />
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import Button from "../../components/tools/Button";
import ApiUsers from "../../mixins/ApiUsers";

export default {
  data: function () {
    return {
      myTitle: "Page profil",
      user: [],
      userId: null,
      edit: false,
      isAdmin: false,
    };
  },
  components: {
    Button,
    TitlePage,
  },
  mixins: [ApiUsers],
  created() {
    this.isAdmin = this.is_admin();
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      document.location.reload()
    },
    editTrue() {
      this.edit = true;
    },
    editUser() {
      this.update_user()
        .then((data) => {
          this.user = data.user;
          document.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.get_user()
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
.profil {
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  width: 40%;
  margin: auto;
  padding: 20px;

  .div-flex {
    width: 70%;
    margin: auto;
    .info-user {
      display: flex;
      justify-content: left;
      margin: auto;
      p {
        margin: 10px;
      }
      label {
        font-weight: bold;
        margin: 10px;
        color: #39cdd8;
        text-transform: uppercase;
      }
      input {
        display: block;
        width: 200px;
      }
    }
  }
}
</style>