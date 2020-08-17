import Vue from "vue"
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
//1.安装插件
Vue.use(Vuex)
 
const state = {
	cartList: []
}

//2.创建实例对象
const store = new Vuex.Store({
	state,
	mutations,
	actions,
	  //actions里面不仅可以做异步操作，也能做一些复杂的判断
	  // addToCart(context , payload){

	  //   let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)
	  //   console.log(oldProduct)
	  //   if(!oldProduct){
	  //     context.commit('addNewProduct' , payload)
	  //   }else{
	  //     context.commit('addOldProduct' ,oldProduct)
	  //   }
	  // }
	
	getters: {
		cartLength(state){
			return state.cartList.length
		},
		cartList(state) {
			return state.cartList
		}
	}
})

//3.挂载Vue大实例上
export default store