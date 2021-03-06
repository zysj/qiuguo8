import Vue from "vue"
// import Vuex from "vuex"
import VueRouter from "vue-router"
window.VueRouter = VueRouter;
import VueResource from "vue-resource"
import routes from "web/common/router/vue-router"
import vueLoadingBar from 'vue2-loading-bar'
import comVue from 'web/modules/commonVue'
import jquery from 'jquery'
window.$ = jquery;
window.jquery = jquery;
window.jQuery = jquery;
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'muse-components/styles/base.less'
import 'web/resources/css/base.css'
import routerUtil from 'web/common/utils/routerUtil.js'
import {Notification} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import 'web/common/filters/numberFilter.js'
import 'web/common/directives/ConstantDirective.js'
import datePicker from 'muse-components/datePicker'

Vue.use(VueRouter);
Vue.use(VueResource); 
// Vue.use(Vuex);
Vue.use(infiniteScroll)
Vue.component(datePicker.name,datePicker);

var loadingTimer;

var router =  new VueRouter({
	mode:'history',
	routes:routes,
});
routerUtil(router);
var vue = new Vue({
	router:router,
	data:{
		errorDone:function(){

		},
		progressDone:function(){
			if(this.progress != 100){
				loadEnd();
			}
		},
		progress:0,
		error:false
	},
	components:{
		LoadingBar:vueLoadingBar
	},
	methods:{
		goBack:function(){
			history.go(-1);
		}
	}
}).$mount("#vue-app");
// console.log(vue);
comVue.$on("on-progress-start",function(data){
	startLoad();
});

comVue.$on("on-progress-end",function(data){
	loadEnd();
});
Vue.http.interceptors.push(function(request, next){
	if(request){
		request.emulateJSON = true;
		vue.$data.progress = 0;
		startLoad();
	}
	next(function(res){
		if(res){
			loadEnd();
		}
		//把返回字符串的内容做成对象放到body的status属性中
		if(!res.body&&res.bodyText!==undefined){
			res.body = {status:res.bodyText}
		}
		if(!res || !res.ok){

		}else{

		}
	});
});

function startLoad() {
	vue.$data.progress = 0;
	loadingTimer=setTimeout(function(){
		vue.$data.progress = Math.random()*3+1;
		loading();
	},100);
}

function loading(){
	if(loadingTimer){
		clearTimeout(loadingTimer);
	}
	var curSize = vue.$data.progress || 0;
	loadingTimer = setTimeout(function(){
		if(curSize < 60){
			curSize += Math.random()*2+1;
		}else if(curSize >= 60 && curSize < 80){
			curSize += Math.random()*1.5+1;
		}else if(curSize >= 80 && curSize < 90){
			curSize += Math.random()+1;
		}else if(curSize >= 90 && curSize < 99){
			curSize += Math.random()+0.25;
		}
		vue.$data.progress = curSize;
		loading();
	},250);
};

function loadEnd(){
	clearTimeout(loadingTimer);
	setTimeout(function(){
		vue.$data.progress = 100;
	},0);
};