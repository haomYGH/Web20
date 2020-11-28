<template>
    <div class="list">
        <p>this is me</p>
    </div>
</template>

<script>
export default {
    name:'me',
}
</script>

<style scoped lang="less">
    .list{
        p{
            color: red;
            .rem(font-size,20);
        }
    }
</style>