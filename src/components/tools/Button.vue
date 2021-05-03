<template>
  <button @click="btnFunction" :class="btnClass">{{ btnText }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    btnFunction: Function,
    btnClass: String,
    btnText: String,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  border-radius: 10px;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  transition: 0.3s all;
  border: 0px;
  height: 40px;
  background: #fbf1ff;
}
.btn {
  &-blue {
    background: blue;
    color: white;
  }
  &-black {
    background: rgb(34, 34, 34);
    color: white;
  }
  &-validate {
    background: #39cdd8;
    color: white;
  }
  &-one {
    background: #fbf1ff;
    color: black;
  }
  &-two {
    background: #e8aeff;
    color: black;
  }
  &-three {
    background: #e093ff;
    color: black;
  }
  &-four {
    background: #d874ff;
    color: black;
  }
  &-delete {
    background: rgb(253, 144, 144);
    color: black;
  }
}
.btn {
  &-large {
    width: 200px;
    height: 50px;
  }
  &-medium {
    width: 160px;
    height: 40px;
    margin: 0px;
  }
}
.m {
  &-home {
    margin: 27px;
  }
}
</style>