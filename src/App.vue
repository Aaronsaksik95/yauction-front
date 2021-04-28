<template>
  <div id="app">
    <Header />

    <main>
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  a {
    text-decoration: none;
  }
  input {
    display: block;
    border-radius: 10px;
    height: 35px;
    border: 1px solid rgb(95, 95, 95);
    text-indent: 3px;
  }
  select{
    height: 40px;
    border-radius: 10px;
    text-indent: 5px;
    border: 0px;
    background-color: rgb(218, 218, 218);
  }
}
</style>
