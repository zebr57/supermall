import {debounce} from "./utils.js"
import BackTop from "components/content/backTop/BackTop.vue"
export const itemImgListenerMixin = {
	data(){
		return {
			itemImgListener: null
		}
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh,200)
		this.itemImgListener = () => {
			// this.$refs.scroll.refresh();
			refresh()
		}
		this.$bus.$on('itemImgLoad',this.itemImgListener)
		// console.log(' W S H R')
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data(){
		return {
			isShowBackTop: false,
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0,0)
		},
		_listenScrollTheme(position){
			// 决定backTop按钮是否显示
			this.isShowBackTop = position.y <= -1000
		}
	}
}

