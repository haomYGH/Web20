<template>
    <div class="list">
        <Item 
            v-for="(todo,index) in todos"
            :key="index"
            :todo="todo"
            :index="index"
            :delTodo="delTodo"
        />
    </div>
</template>

<script>
import Item from './item.vue'
export default {
    name:'List',

    props:{
        todos:Array,
        delTodo:Function
    },
    components:{
        Item,
    }
}
</script>

<style lang="stylus" scoped>

</style>