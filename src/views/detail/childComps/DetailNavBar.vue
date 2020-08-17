<template>
	<div>
		<nav-bar id="detailNavbar">
			<template v-slot:left>
				<div @click="backClick()">
					<img src="~assets/img/common/back.svg" alt="">
				</div>
			</template>
			<template v-slot:center>
				<div class="title">
					<div v-for="(item,index) in titles" class="title-item" :class="{active: index === currentIndex}" @click="titleTtemclick(index)">
						{{item}}</div>
				</div>
			</template>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar.vue"

	export default {
		name: "DetailNavBar",
		props: {
		  currentIndex: {
				type: Number,
		    default: 0
		  }
		},
		components: {
			NavBar
		},
		data() {
			return {
				titles: ["商品", "参数", "评论", "推荐"],
			}
		},
		methods: {
			titleTtemclick(index) {
				// console.log(index)
				// this.currentIndex = index;
				this.$emit('titleTtemclick',index)
			},
			backClick(){
				this.$router.back();
			}
		}
	}
</script>

<style scoped>
	#detailNavbar {
		background-color: #FFFFFF;
	}

	#detailNavbar img {
		vertical-align: middle;
	}

	.title {
		display: flex;
		text-align: center;
		color: #666666;
	}

	.title-item {
		flex: 1;
	}

	.active {
		color: #FF8198;
	}
</style>
