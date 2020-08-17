<template>
	<div class="recommend">
		<div v-for="item in recommend" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: "RecommendView",
		props:{
			recommend : {
				type:Array,
				default(){
					return []
				}
			}
		}
	}

</script>

<style>
	.recommend {
		display: flex;
		text-align: center;
		font-size: 14px;
		color: #666666;
		margin: 5px auto;
	}
	.recommend-item {
		flex: 1;
	}
	.recommend-item img {
		height: 68px;
		width: 68px;
	}
</style>
