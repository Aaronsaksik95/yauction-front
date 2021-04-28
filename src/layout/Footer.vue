<template>
  <footer>
    <hr />
    <div class="desc">
      <small>
        Ce site Web est un projet d'école, dans le but de nous exercer et de
        nous évaluer, que ça soit coté back-end ou front-end. Donc le paiement
        est fictif, comme les commandes. Les images ainsi que les produits ont
        été prise sur le site
        <a href="https://www.nike.com/"><strong>NIKE</strong></a
        >.</small
      >
    </div>
    <p>Copyright © 2021</p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  margin-top: 50px;
  position: relative;
  min-height: 100%;
  .desc {
    width: 60%;
    margin: auto;
    text-align: justify;
  }
  p {
    background-color: #a9f9ff;
  }
}
</style>