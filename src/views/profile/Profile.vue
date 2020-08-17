<template>
	<div class="profile">
		<nav-bar>
			<template v-slot:center>用户信息</template>
		</nav-bar>
		<user-info></user-info>
		<account-info></account-info>
		<normal-list-view :listData="oderList"></normal-list-view>
		<normal-list-view :listData="serviceList"></normal-list-view>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar.vue"
	
	import UserInfo from "./childComps/UserInfo.vue"
	import AccountInfo from "./childComps/AccountInfo.vue"
	import NormalListView from "./childComps/NormalListView.vue"
	
	export default {
		name: "Profile",
		components: {
			NavBar,
			UserInfo,
			AccountInfo,
			NormalListView
		},
		data(){
			return {
				oderList: [
					{ icon : 'message.svg', info : '我的消息'},
					{icon: 'pointer.svg', info: '积分商城'},
					{icon: 'vip.svg', info: '会员卡'},
				],
				serviceList: [
					{icon: 'cart.svg', info: '我的购物车'},
					{icon: 'shopping.svg', info: '下载购物APP'},
				]
			}
		}
	}
</script>

<style scoped>
	.profile {
		background-color: #EEEEEE;
	}
</style>
