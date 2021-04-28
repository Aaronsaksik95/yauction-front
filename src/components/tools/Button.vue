<template>
    <button @click="btnFunction" :class="btnClass"> {{btnText}} </button>
</template>

<script>
    export default {
        name:"Button",
        props: {
            btnFunction: Function,
            btnClass: String,
            btnText: String
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        display:inline-block;
        border-radius: 10px;
        font-size: 18px;
        padding: 10px;
        margin: 10px;
        transition: 0.3s all;
        border: 0px;
        height: 40px;
    }
    .btn {
        &-blue {
            background: blue;
            color:white;
        }
        &-black {
            background: rgb(34, 34, 34);
            color:white;
        }
        &-validate {
            background: #39cdd8;
            color:white;
        }
        &-update {
            background: rgb(255, 196, 100);
            color: black;
        }
        &-delete {
            background: rgb(253, 144, 144);
            color: black;
        }
    }
    .btn{
        &-large {
            width: 200px;
            height: 50px;
        }
    }
</style>