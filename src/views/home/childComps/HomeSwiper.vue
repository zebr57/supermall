<template>
	<swiper>
		<swiper-item v-for="item in banner">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imageImg">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from "components/common/swiper"
	
	export default {
		name : "HomeSwiper",
		components: {
			Swiper,
			SwiperItem
		},
		props:{
			banner : {
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				isLoad:false
			}
		},
		methods: {
			imageImg(){
				if(!this.isLoad) {
					this.$emit('swiperImgLoad');
					this.isLoad = true
				}
			}
		}
	}
</script>

<style>
</style>
