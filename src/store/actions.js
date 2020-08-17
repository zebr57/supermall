import {ADD_OLD_CART,ADD_NEW_CART} from './mutations-types.js'
export default {
	//都在mutations那边了
	addToCart(context , payload){
		return new Promise((resolve, reject) => {			
			  let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)
			  // console.log(oldProduct)
			  if(!oldProduct){
					context.commit(ADD_NEW_CART, payload);
					resolve('已成功加到购物车');
			  }else{
					context.commit(ADD_OLD_CART, oldProduct);
					resolve('已成功加到购物车');
			  }
			
		})
	}
}