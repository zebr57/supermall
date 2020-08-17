<template>
	<div id="shop-item">
	 <div class="item-selector">
			<check-button :is-check="itemInfo.check" @click.native="checkedChange"></check-button>
	  </div>
	  <div class="item-img">
	    <img :src="itemInfo.image" alt="商品图片">
	  </div>
	  <div class="item-info">
	    <div class="item-title">{{itemInfo.title}}</div>
	    <div class="item-desc">{{itemInfo.desc}}</div>
	    <div class="info-bottom">
	      <div class="item-price">¥{{itemInfo.price}}</div>
	      <div class="item-count">
					<button class="del" @click="delCount">-</button>
					x{{itemInfo.count}}
					<button class="add" @click="addCount">+</button>
				</div>
				<div>
					<button class="remove" @click="removeCart">删除</button>
				</div>
	    </div>
	  </div>
	</div>
</template>

<script>
	import CheckButton from "components/content/checkButton/CheckButton.vue"
	
	export default {
	  name: "CartListItem",
	  props: {
	    itemInfo: {
				type: Object,
				default(){
					return {}
				}
			}
	  },
		data(){
			return {
				// isCheck: false
			}
		},
		components: {
			CheckButton,
			
		},
	  methods: {
	    checkedChange() {
	      this.itemInfo.check = !this.itemInfo.check;
				console.log(this.itemInfo.check)
	    },
			addCount(){
				this.itemInfo.count++
			},
			delCount(){
				if(this.itemInfo.count > 1){
					this.itemInfo.count--
				}
			},
			removeCart(){
				this.$emit('removeCart')
			}
	  }
	}
</script>

<style scoped>
	#shop-item {
	  width: 100%;
	  display: flex;
	  font-size: 0;
	  padding: 5px;
	  border-bottom: 1px solid #ccc;
	}
	
	.item-selector {
	  width: 20px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.item-title, .item-desc {
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	
	.item-img {
	  padding: 5px;
	  /*border: 1px solid #ccc;*/
	}
	
	.item-img img {
	  width: 80px;
	  height: 100px;
	  display: block;
	  border-radius: 5px;
	}
	
	.item-info {
	  font-size: 17px;
	  color: #333;
	  padding: 5px 10px;
	  position: relative;
	  overflow: hidden;
	}
	
	.item-info .item-desc {
	  font-size: 14px;
	  color: #666;
	  margin-top: 15px;
	}
	
	.info-bottom {
		display: flex;
	  margin-top: 10px;
	  position: absolute;
	  bottom: 10px;
	  left: 10px;
	  right: 10px;
	}
	
	.info-bottom .item-price {
	  color: orangered;
		width: 120px;
	}
	
	.info-bottom .item-count {
		width: 80px;
	}
	
	.del, .add, .remove{
		min-width: 22px;
		height: 22px;
		border: 0px;
	}
	
	.remove {
		padding: 3px;
		font-size: 12px;
		color: #fff;
		background-color: #f13e3a;
	}
	</style>
