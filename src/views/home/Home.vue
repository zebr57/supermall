<template>
	<div id="home">
		<nav-bar class="nav-bar">
			<template v-slot:center>购物街</template>
		</nav-bar>
		<tab-control class="tab-control"
								:titles = "['流行','精选','爆款']" 
								@tabClick="tabClick"
								ref = 'tabControl2'
								v-show="isTabShow">
		</tab-control>
		<scroll class="content" ref="scroll" 
						:probe-type="3" 
						@scroll = "currentScroll" 
						:pull-up-load = "true" 
						@pullingUp = "loadMore"
						
						>
			<home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>
			<recommend-view :recommend="recommend"></recommend-view>
			<feature-view></feature-view>
			<tab-control class="tab-control" 
									:titles = "['流行','精选','爆款']" 
									@tabClick="tabClick"
									ref = 'tabControl1'>
			</tab-control>
			<goods-list :goods = "goods[currentType].list"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	
	import HomeSwiper from "./childComps/HomeSwiper.vue"
	import RecommendView from "./childComps/RecommendView.vue"
	import FeatureView from "./childComps/FeatureView.vue"
	//公共模块
	import NavBar from "components/common/navbar/NavBar.vue"
	import TabControl from "components/content/tabControl/TabControl.vue"
	import GoodsList from "components/content/goods/GoodsList.vue"
	import Scroll from "components/common/scroll/Scroll.vue"
	import BackTop from "components/content/backTop/BackTop.vue"
	import Detail from "../detail/Detail.vue"
	//网络请求模块
	import {getHomeMultidata,getHomeGoodsdata} from "network/home.js"
	//工具模块
	import {debounce} from "common/utils.js"
	import {itemImgListenerMixin} from "common/mixin.js"
	export default {
		name : "Home",
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
						
		},
		mixins:[itemImgListenerMixin],
		data(){
			return {
				banner:[],
				recommend:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
					
				},
				currentType:'pop',
				isShowBackTop:false,
				isTabShow:false,
				saveY:0,
			}
		},
		destroyed(){
			// console.log('home destroyed');
		},
		activated(){
			// console.log('home activated');
			//记录当前滚动的位置  返回首页跳顶bug
			this.$refs.scroll.scrollTo(0,this.saveY,100)
			this.$refs.scroll.refresh();
			// console.log(this.saveY);
		},
		deactivated(){
			// console.log('home deactivated');
			this.saveY = this.$refs.scroll.scroll.y
			console.log(this.saveY);
			this.$bus.$off("itemImgLoad",this.itemImgListener)
		},
		created() {
			//加载首页数据
			this.getHomeMultidata(),
			//加载tabControl数据
			this.getHomeGoodsdata('pop'),
			this.getHomeGoodsdata('new'),
			this.getHomeGoodsdata('sell')
			
		},
		mounted() {

		},
		methods: {
			/*
			*监听事件
			*/
			tabClick(index) {
				switch(index) {
					case 0:
					this.currentType = 'pop';
					break;
					case 1 :
					this.currentType = 'new';
					break;
					case 2 :
					this.currentType = 'sell';
					break;
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backClick() {
				this.$refs.scroll.scrollTo(0,0)
			},
			currentScroll(position) {
				// console.log(position)
				this.isShowBackTop = (-position.y) > 1000;
				if((-position.y) >= this.$refs.tabControl1.$el.offsetTop){
					this.isTabShow = true
				}else {
					this.isTabShow = false
				}
			},
			loadMore() {
				this.getHomeGoodsdata(this.currentType);
				console.log('loadMore...')
			},
			swiperImgLoad() {
				// console.log(this.$refs.tabControl1.$el.offsetTop)
				
			},
			/*
			*网络请求
			*/
			getHomeMultidata(){
				getHomeMultidata().then(res =>{
					this.banner = res.data.banner.list;
					this.recommend = res.data.recommend.list;
				})
			},
			getHomeGoodsdata(type){
				const page = this.goods[type].page + 1;
				getHomeGoodsdata(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
				})
			}
	
		}
	}
	
</script>

<style scoped>
	#home {
		height: 100vh;
		position: relative;
	}
	.nav-bar {
		background-color: var(--color-tint);
		color: #666666;
		
/* 		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	.tab-control {
		position: sticky;
		background-color: #FFFFFF;
		top: 44px;
	}
	.content {
		/* height: calc(100vh-93px); */
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
