<template>
	<div class="shopcart">
		<!-- 顶部导航 -->
		<nav-bar v-slot:center>购物车({{cartLength}})</nav-bar>
		<!-- 购物车列表 -->
		<cart-list></cart-list>
		<!-- 底部bar -->
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from "./childComps/CartBottomBar.vue"
	import {mapGetters} from 'vuex'
	export default {
		name: "Shopcart",
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			...mapGetters([
				'cartLength',
				'cartList'
				])
		}
	}
</script>
	
<style scoped>
</style>
