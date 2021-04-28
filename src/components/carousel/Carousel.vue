<template>
  <div class="carousel">
    <button class="btn-carousel-prev" v-on:click="prev">&lt;</button>
    <slot></slot>
    <button class="btn-carousel-suiv" v-on:click="next">></button>
    <div class="carousel-pagination">
      <button
        v-for="n in slidesCount"
        v-bind:key="n"
        v-on:click="goto(n-1)"
        :class="{active: n-1 == index}"
      ></button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      slides: [],
      direction: "right"
    };
  },
  computed: {
    slidesCount() {
      return this.slides.length;
    }
  },
  mounted() {
    this.slides = this.$children;
    setInterval(() => {
      this.index++;
      this.direction = "right";
      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    }, 8000);
  },
  methods: {
    next() {
      this.index++;
      this.direction = "right";
      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    },
    prev() {
      this.index--;
      this.direction = "left";
      if (this.index < 0) {
        this.index = this.slidesCount - 1;
      }
    },
    goto(index) {
      this.direction = index > this.index ? "right" : "left";
      this.index = index;
    }
  }
};
</script>
<style scoped>
.carousel {
  position: relative;
  margin-bottom: 50px;
}
.btn-carousel-prev {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 10px;
  font-size: 30px;
  background: rgb(255, 255, 255, 0);
  border: 0;
  color: white;
}
.btn-carousel-suiv {
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 10px;
  font-size: 30px;
  background: rgb(255, 255, 255, 0);
  border: 0;
  color: white;
}
.carousel-pagination {
  position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  text-align: center;
}
.carousel-pagination button {
  display: inline-block;
  height: 10px;
  width: 10px;
  border: 0;
  padding: 0;
  background: #000;
  opacity: 0.8;
  border-radius: 10px;
  margin: 0 2px;
}
.carousel-pagination button.active {
  background: #fff;
}
</style>