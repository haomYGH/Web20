<!-- 结构 -->
<template>
    <div id="Me">
        <p>this is Me page</p>
    </div>
</template>
<!-- 逻辑 -->
<script>

    export default {
        name:'Me',
    }
</script>
<!-- 样式 -->
<style scoped lang="less">
    #Me{
		p{
			color:red;
			.rem(padding,10px)
		}
    }
</style>