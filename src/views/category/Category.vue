<template>
	<div class="category">
		<nav-bar>
			<template v-slot:center>分类列表</template>
		</nav-bar>
		<div class="content">
			
			<tab-menu :categories="categories" 
								@selectItem="selectItem">
			</tab-menu>
			
			<scroll id="tab-content"
							:data="[categoryData]"
							ref="scroll">
				<div>
					<tab-content-category :subcategories="showSubcategory"></tab-content-category>
				</div>
			</scroll>
		</div>
	</div>
	
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import TabMenu from './childComps/TabMenu.vue'
	import TabContentCategory from "./childComps/TabContentCategory.vue"
	
	import { getCategory, getSubcategory, getCategoryDetail } from 'network/category.js'
	export default {
		name: "Category",
		components:{
			NavBar,
			Scroll,
			TabMenu,
			TabContentCategory
		},
		data(){
			return {
				categories: [],
				categoryData: {},
				currentIndex: -1,
			}
		},
		created() {
			this._getCategory()
			
			this.$bus.$on('imgLoad', () => {
			  this.$refs.scroll.refresh()
			})
		},
		mounted() {
			
		},
		computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
		    return this.categoryData[this.currentIndex].subcategories
		  },
		  showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
		  }
		},
		methods: {
			_getCategory(){
				getCategory().then(res => {
					//1.获取分类数据
					this.categories = res.data.category.list;
					// console.log(res)
					// 2.初始化每个类别数据
					for (let i = 0; i < this.categories.length; i++) {
						this.categoryData[i] = {
							subcategories: {},
							categoryDetail: {
								'pop': [],
								'new': [],
								'sell': []
							}
						}
					}
					//3.请求第一个分类的数据
					this._getSubcategories(0)
				})
			},
			_getSubcategories(index){
				this.currentIndex = index;
				
				const mailkey = this.categories[index].maitKey;
				
				getSubcategory(mailkey).then(res => {
					this.categoryData[index].subcategories = res.data;
					this.categoryData = {...this.categoryData};
					this._getCategoryDetail('pop')
					this._getCategoryDetail('new')
					this._getCategoryDetail('sell')
				})
			},
			_getCategoryDetail(type){
				//1.获取请求的miniWallkey
				const miniWallkey = this.categories[this.currentIndex].miniWallkey
				//2.发送请求，传入miniWallkey和type
				getCategoryDetail(miniWallkey, type).then(res => {
					//3.将获取的数据保存
					this.categoryData[this.currentIndex].categoryDetail[type] = res;
					this.categoryData = {...this.categoryData}
				})
			},
			selectItem(index){
				this._getSubcategories(index)
			}
		}
	}
</script>

<style scoped>
	#category {
	  height: 100vh;
	}
	
	.nav-bar {
	  background-color: var(--color-tint);
	  font-weight: 700;
	  color: #fff;
	}
	
	.content {
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 44px;
	  bottom: 49px;
	
	  display: flex;
	}
	
	#tab-content {
	  height: 100%;
	  flex: 1;
	}
</style>
