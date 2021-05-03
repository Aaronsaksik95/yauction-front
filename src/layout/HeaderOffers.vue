<template>
  <header class="header__main">
    <div class="header__nav">
      <ul>
        <li @click="refresh">
          <router-link to="/myOffers/waiting" class="waiting"
            >En cours</router-link
          >
        </li>
        <li @click="refresh">
          <router-link to="/myOffers/validated" class="validate"
            >Validées</router-link
          >
        </li>
        <li @click="refresh">
          <router-link to="/myOffers/refused" class="refuse"
            >Refusées</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    refresh() {
      document.location.reload();
    },
  },
};
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
      .waiting {
        color: #d874ff;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        border: 1px solid #d874ff;
        padding: 5px;
        border-radius: 5px;
      }
      .validate {
        color: #39cdd8;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        border: 1px solid #39cdd8;
        padding: 5px;
        border-radius: 5px;
      }
      .refuse {
        color: #ff7979;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
        border: 1px solid #ff7979;
        padding: 5px;
        border-radius: 5px;
      }
    }
  }
}
</style>