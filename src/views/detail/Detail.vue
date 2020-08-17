<template>
	<div id="detail">
		<detail-nav-bar @titleTtemclick="titleTtemclick" :current-index = "currentIndex"></detail-nav-bar>
		<scroll class="content" ref="scroll" :probe-type="3"  @scroll = "currentScroll">
			<detail-swiper :topImages="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detailInfo="detailInfo" 
													@imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
			<goods-list ref="recommend" :goods="recommends"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		<detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
	</div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar.vue"
	import DetailSwiper from "./childComps/detailSwiper.vue"
	import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
	import DetailShopInfo from "./childComps/DetailShopInfo.vue"
	import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
	import DetailParamInfo from "./childComps/DetailParamInfo.vue"
	import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
	import DetailBottomBar from "./childComps/DetailBottomBar.vue"

	import GoodsList from "components/content/goods/GoodsList.vue"
	import Scroll from "components/common/scroll/Scroll.vue"
	
	import {
		getDetailData,
		Goods,
		Shop,
		GoodsParam,
		getRecommend
	} from "../../network/detail.js"

	import {itemImgListenerMixin,backTopMixin} from "common/mixin.js"
	import {debounce} from "common/utils.js"
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			Scroll,
			GoodsList
		},
		mixins:[itemImgListenerMixin,backTopMixin],
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopsY: [],
				getThemTopY: null,
				currentIndex: 0
			}
		},
		created() {
			this.iid = this.$route.params.iid;
			this._getDetailData(this.iid);
			this._getRecommend();
			this.getThemTopY = debounce(() =>{
				// 获取对应的offsetTop
				this.themeTopsY = []
				this.themeTopsY.push(0)
				this.themeTopsY.push(this.$refs.param.$el.offsetTop)
				this.themeTopsY.push(this.$refs.comment.$el.offsetTop)
				this.themeTopsY.push(this.$refs.recommend.$el.offsetTop)
				this.themeTopsY.push(Number.MAX_VALUE)
				// console.log(this.themeTopsY)
			},200)
		},
		mounted() {
		},
		destroyed() {
			this.$bus.$off("itemImgLoad",this.itemImgListener)
		},
		methods: {
			// 获取详情页数据
			_getDetailData(iid) {
				getDetailData(iid).then(res => {
					const data = res.result;
					// console.log(data)
				
					// 接收顶部轮播图片
					this.topImages = data.itemInfo.topImages;
				
					// 接收详细信息
					this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
				
					//接收店铺信息
					this.shop = new Shop(data.shopInfo);
				
					// 接收实拍图片信息
					this.detailInfo = data.detailInfo;
				
					// 接收尺寸信息
					this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
					
					// 7.保存评论数据
					if (data.rate.list) {
					  this.commentInfo = data.rate.list[0];
					}
				});
			},
			_getRecommend(){
				getRecommend().then(res => {
					this.recommends = res.data.list
				})
			},
			
			//点击tabnav滚动到相应位置
			titleTtemclick(index) {
				this.$refs.scroll.scrollTo(0,-this.themeTopsY[index]+44,500)
			},
			imageLoad() {
				this.$refs.scroll.refresh()
				this.getThemTopY()
			},
			currentScroll(position){
				// console.log(-position.y);
				let positionY = -position.y;
				for (let i = 0; i < this.themeTopsY.length-1; i++) {
					if ((positionY >= this.themeTopsY[i]-44) && (positionY <= this.themeTopsY[i+1])) {
						if(this.currentIndex !== i){
							this.currentIndex = i;
						}
					}
				}			
				// 监听滚动到某个主题
			  this._listenScrollTheme(position)
			},
			addToCart(){
				const product = {};
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
 				//加入购物车里
				this.$store.dispatch('addToCart', product).then(res => {
					this.$toast.show(res,1500)
				});
			}
		},
		computed: {
			getItem(){
				return this.$store.state.cartList
			}
		}

	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
		height: 100vh;
	}

	.content {
		height: calc(100vh - 44px);
	}
</style>
