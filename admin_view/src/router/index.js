import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Control from "@/views/control";
import Layout from "@/views/Layout";
import Info from "@/views/Info";
import Detail from "@/views/Info/detailed";
import News from "@/views/News";
import { getToken, rmToken } from "../utils/userStorage";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/control",
    name: "control",
    redirect: "detail",
    meta: {
      name: "控制台",
    },
    component: Layout,
    children:[
      {
        path: '/detail',
        name: 'detail',
        component: Detail 
      },
    ]
  },
  {
    path: "/news",
    name: "news",
    redirect: "news",
    meta: {
      name: "新闻",
    },
    component: Layout,
    children:[
      {
        path: '/news',
        name: 'news',
        component: News
      },
    ]
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout
  },
  {
    path: '/info',
    name: 'info',
    component: Info
  },{
    path: '/detail',
    name: 'detail',
    component: Detail
  }
];

const router = new VueRouter({
  routes
});

const whiteRouter = ['/login']; // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
// 路由守卫
router.beforeEach((to, from, next) => {
    if(getToken()){
        if(to.path === '/login'){
          rmToken();
          // removeUserName();
          // store.commit("app/SET_TOKEN", '');
          // store.commit("app/SET_USERNAME", '');
          next();
      }else{
          next()
      }
    }else{
      if(whiteRouter.indexOf(to.path) !== -1) {  // 存在
          next();  // to
      }else{
          next('/login')  // 路由指向
      }
      
    }
})

export default router;
