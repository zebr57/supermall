import {ADD_OLD_CART,ADD_NEW_CART} from './mutations-types.js'

export default {
	[ADD_OLD_CART](state, payload){
		payload.count++;
	},
	[ADD_NEW_CART](state, payload){
		payload.count = 1;
		payload.check = true;
		state.cartList.push(payload)
	}
}
