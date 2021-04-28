<template>
  <div>
    <TitlePage title="Inscription" />
    <div class="signup">
      <input placeholder="Prenom" type="text" v-model="firstName" />
      <input placeholder="Nom" type="text" v-model="lastName" />
      <input placeholder="Email" type="email" v-model="email" />
      <input
        placeholder="Mot de passe"
        class=""
        type="password"
        v-model="password"
      />
      <input placeholder="Téléphone" type="tel" v-model="phone" />
      <input placeholder="Adresse" type="text" v-model="address" />
      <input placeholder="Ville" type="text" v-model="city" />
      <input
        placeholder="Code postal"
        class=""
        type="text"
        v-model="postalCode"
      />
      <input placeholder="Pays" type="text" v-model="country" />
      <Button
        class="btn btn-large btn-black"
        btnText="Inscription"
        :btnFunction="signup"
      />
      <small class="login-link">
        Vous êtes déjà membre ?
        <router-link to="/login"><strong>Connectez-vous.</strong></router-link>
      </small>
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import TitlePage from "../../components/tools/TitlePage";
import ApiAuth from "../../mixins/ApiAuth";
export default {
  components: {
    Button,
    TitlePage,
  },
  data: function () {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    };
  },
  mixins: [ApiAuth],
  methods: {
    signup() {
      this.signupUser()
        .then((data) => {
          if (data.auth) {
            localStorage.setItem("token", data.token);
            if (localStorage.getItem("token")) {
              this.$router.push("./");
              document.location.reload();
            }
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  width: 25%;
  padding: 15px;
  margin: auto;
  .login-link {
    display: block;
  }
  input {
    width: 200px;
    margin: 10px auto 10px auto;
  }
}
</style>