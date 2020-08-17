<template>
	<div class="tab-bar-item" @click="itemClick()">
		<div v-if="!isActive"><slot name='item-icon'></slot></div>
		<div v-else><slot name='item-icon-active'></slot></div>
		<div :style="activeStyle"><slot name='item-text'></slot></div>
	</div>

	<!-- <div class="tab-bar-item">
		<img src="../../assets/img/tabbar/category.svg" alt="">
		我的
		</div> -->
</template>

<script>
	export default {
		name: "TabBarItem",
		props:{
			path:String,
			activeColor:{
				type:String,
				default:'hotpink'
			}
		},
		data() {
			return {
				// isActive:true
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1
			},
			activeStyle(){
				return this.isActive ? {color:this.activeColor} : {}
			}
		
		},
		methods:{
			itemClick(){
				// console.log(this.$route.path)
				if(this.$route.path.indexOf(this.path) !== -1){
					return 0;
				}
				this.$router.replace(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
		
	}
	.tab-bar-item img {
		height: 24px;
		width: 24px;
		margin: 3px auto;
		display: block;
		vertical-align: middle;
	}
	
</style>
