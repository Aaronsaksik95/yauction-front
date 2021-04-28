<template>
  <div>
    <TitlePage title="Connexion" />
    <div class="login">
      <input placeholder="Email" type="email" v-model="email" />
      <input placeholder="Mot de passe" type="password" v-model="password" />
      <Button
        class="btn btn-large btn-black"
        btnText="Connexion"
        :btnFunction="login"
      />
      <small class="signup-link">
        Vous n'êtes pas encore membre ?
        <router-link to="/signup"><strong>Rejoignez-nous.</strong></router-link>
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
      email: "",
      password: "",
      message: "",
    };
  },
  mixins: [ApiAuth],
  methods: {
    login() {
      this.loginUser()
        .then((data) => {
          if (data.auth) {
            localStorage.setItem("token", data.token);
            if (localStorage.getItem("token")){
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
.login {
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  width: 25%;
  padding: 15px;
  margin: auto;
  .signup-link {
    display: block;
  }
  input {
    width: 200px;
    margin: 10px auto 10px auto;
  }
}
</style>