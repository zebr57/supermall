import Toast from "./Toast"
const obj = {};
//执行install
obj.install = function (Vue){
	//1.创建组件构造器
	const toastContrustor = Vue.extend(Toast);
	//2. new 的方式 通过组件构造器toastContrustor 来创建一个组件对象
	const toast = new toastContrustor();
	//3.将创建好的组件对象 !挂载! 到某个元素上
	toast.$mount(document.createElement('div'))
	//4.toast.$el 对应的就是div
	document.body.appendChild(toast.$el)
	Vue.prototype.$toast = toast;
}

export default obj