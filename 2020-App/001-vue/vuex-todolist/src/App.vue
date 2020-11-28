<template>
    <div class="app">
        <h3>ToDo List</h3>
        <Header />
        <List />
        <Footer />
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import List from './components/List.vue'
    import Footer from './components/Footer.vue'

    export default {
        name: 'App',
        components: {
            Header,
            List,
            Footer,
        }
    }
</script>

<style>
    .app{
		width: 600px;
		margin: 100px auto;
	}
	.app h3{
		width: 100%;
		text-align: center;
		line-height: 30px;
	}
</style>
