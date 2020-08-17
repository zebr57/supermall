<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button class="check-button" @click.native="allCheck" :is-check="isSelectAll"></check-button>
			<span>全选</span>
		</div>
		<div class="totalPrice">
			合计:￥{{ totalPrice }}
		</div>
		<div class="goPay" @click="goPay">
			去结算({{ checkLength }})
			</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters([
				'cartList'
			]),
			totalPrice(){
				return this.cartList.filter(item => {
					return item.check
				}).reduce((prvePrice, item) => {
					return prvePrice + item.price * item.count
				}, 0).toFixed(2)
			},
			checkLength(){
				return this.cartList.filter(item => item.check).length
			},
			isSelectAll(){
				if(this.cartList.length === 0){
					return false
				};
				return !(this.cartList.filter(item => !item.check).length)
			}
		},
		methods: {
			allCheck(){
				//用 forEach 将每个item的check属性进行操纵
				if(this.isSelectAll){
					this.cartList.forEach(item => item.check = false);
				} else {
					this.cartList.forEach(item => item.check = true);
				}
				this.showToast('购物车空空如也~')
			},
			goPay(){
				this.showToast('购物车空空如也~')
				
			},
			showToast(tip){
				if(this.cartList.length === 0){
				this.$toast.show(tip)
				}
			}
			
		}
	}
</script>

<style scoped>
	.bottom-bar {
		position: absolute;
		display: flex;
		bottom: 50px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #eee;
	}
	.check-content{
		display: flex;
		align-items: center;
		width: 90px;
		/* width: 90px; */
	}
	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin: 0 5px;
	}
	
	.totalPrice {
		flex: 1;
		width: 120px;
	}
	
	.goPay {
		width: 90px;
		text-align: center;
		color: #FFFFFF;
		background-color: #FF5777;
	}
</style>
