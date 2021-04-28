<template>
    <div class="title__page">
        <h1>
            {{ title }}
        </h1>
    </div>
</template>

<script>
    export default {
        name:"TitlePage",
        props: {
            title: {
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title__page {
        margin: 40px 3px;
        h1 {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color:rgb(250, 84, 0);
        }
    }
</style>