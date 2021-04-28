import VueJwtDecode from "vue-jwt-decode";

export default (to, from, next) => {
  if (!localStorage.getItem("token")) {
    next({
      name: "Login"
    })
  }
  else {
    const decode = VueJwtDecode.decode(localStorage.getItem("token"));
    if (!decode.isAdmin) {
      next({
        name: "Login"
      })
    }
    else {
      next();
    }
  }
}
