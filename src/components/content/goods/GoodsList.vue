<template>
	<div class="goods">
		<!-- :goods-item="item" 将遍历的每个item值传给GoodsListItem的GoodsItem -->
		<goods-list-item 
			v-for="item in goods"
			:goods-item="item"
			class="item"></goods-list-item>
			
	</div>
</template>

<script>
	import GoodsListItem from "./GoodsListItem.vue"
	
	export default {
		name: "GoodsList",
		components:{
			GoodsListItem,
		},
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.goods {
		display: flex;
		flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>
