import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { Message,MessageBox,Pagination,Dialog,Select,Switch,DatePicker,Option,Input,FormItem,Form,Tag,Breadcrumb,BreadcrumbItem,Table,TableColumn,Row,Col,Card,DropdownMenu,DropdownItem,Dropdown,Button,Container,Main,Header,Aside,Menu,MenuItem,MenuItemGroup,Submenu } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/index.less'
import store from '@/store'
import http from 'axios';
import '@/api/mock.js';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm;
Vue.prototype.$http=http;

router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token=store.state.user.token
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token&&to.name==='login'){
    next({name:'home'})
  }else{
    next()
  }
})


new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit("addMenu",router)
  }
}).$mount('#app')
