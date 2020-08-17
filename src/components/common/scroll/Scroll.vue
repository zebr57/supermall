<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	
	export default {
		name: "Scroll",
		props:{
			probeType:{
				type: Number,
				default: 0
			},
			pullUpLoad:{
				type: Boolean,
				default: true
			}
		},
		data(){
			return {
				scroll:null
			}
		},
		mounted() {
			//1.创建scroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad,
			});
			//2.记录position值
			this.scroll.on('scroll',(position) =>{
				this.$emit('scroll',position)
			});
			//3.监听事件--加载更多
			this.scroll.on('pullingUp',() => {
				this.$emit('pullingUp')
			})

			
		},
		methods:{
			scrollTo(x,y,time=500){
				this.scroll.scrollTo(x,y,time);
			},
			refresh() {
				this.scroll.refresh();
				// console.log('.....')
			}
		}
		
		
	}
</script>

<style scoped>
	.wrapper {
	  overflow: hidden;
	}
</style>
