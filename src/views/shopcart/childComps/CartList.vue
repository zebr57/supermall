<template>
	<div class="cartList">
		<scroll class="content" ref="scroll" :probe-type="3">
			<cart-list-item v-for="(item, index) in cartList"
											:key = "index"
											:item-info="item"
											@removeCart="removeItem(index)">											
			</cart-list-item>
		</scroll>
		
	</div>
</template>

<script>
	import Scroll from "components/common/scroll/Scroll.vue"
	import CartListItem from './CartListItem.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: "CartList",
		components: {
			CartListItem,
			Scroll
		},
		computed: {
			...mapGetters([
				'cartList'
			]),
		},
		activated() {
			this.$refs.scroll.refresh();
		},
		methods: {
			removeItem(index){
				for (var i = 0; i < this.cartList.length; i++) {
					if(i == index) this.cartList.splice(i,1)
				}
			}
		}
	}
</script>

<style scoped>
	.cartList {
		height: calc(100vh - 49px - 44px- 40px);
	}
	.content {
		height: 100%;
		overflow: hidden;
	}
</style>
