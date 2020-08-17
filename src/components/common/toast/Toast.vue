<template>
	<transition name="fade">
		<div class="toast" v-show="ishow">{{message}}</div>
	</transition>
</template>

<script>
	export default {
		name: "Toast",
		data() {
			return {
				ishow: false,
				message: ""
			}
		},
		methods: {
			show(message = "我是弹窗", duration = 1500){
				this.ishow = true;
				this.message = message;
				
				setTimeout(() => {
					this.ishow = false;
					this.message = "";
				}, duration)
			}
		}
	}
	
</script>

<style scoped>
	.toast {
	  position: fixed;
	  left: 50%;
	  top: 50%;
	  background-color: rgba(0,0,0,.8);
		transition: background-color 0.5s;
	  padding: 10px;
	  border-radius: 5px;
	  transform: translate(-50%,-50%);
	  color:#fff;
	  z-index: 99;
	}
  .fade-enter-active {
    transition: opacity 1.5s;
  }
/* 	.fade-leave-active {
		transition: opacity .1s;
	} */
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
