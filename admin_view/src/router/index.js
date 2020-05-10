import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Control from "@/views/control";
import Layout from "@/views/Layout";
import Info from "@/views/Info";
import Detail from "@/views/Info/detailed";
import Article from "@/views/Article";
import News from "@/views/News";
import { getToken, rmToken } from "../utils/userStorage";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: Login,
  },
  {
    path: "/control",
    name: "Control",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: 'el-icon-s-data'
    },
    component: Layout,
    children:[
      {
        path: '/index',
        name: 'index',
        meta: {
          keepAlive: true,
          name: "首页"
        },
        component: Control 
      },
    ]
  },
  {
    path: "/news",
    name: "news",
    redirect: "news",
    meta: {
      name: "新闻列表",
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
    path: "/article",
    name: "Article",
    redirect: "articleIndex",
    meta: {
      name: "文章列表",
    },
    component: Layout,
    children:[
      {
        path: '/articleIndex',
        name: 'ArticleIndex',
        meta: {
          name: '文章列表'
        },
        component: Article
      },
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: "会员管理",
    },
    component: Layout,
    children:[
      {
        path: '/news',
        name: 'news',
        meta: {
          name: "会员列表",
        },
        component: News
      },{
        path: '/news',
        name: 'news',
        meta: {
          name: "教师列表",
        },
        component: News
      },
      {
        path: '/student',
        name: 'Student',
        meta: {
          name: "学生列表",
        },
        component: Detail
      }
    ]
  },
  {
    path: "/detail/:id",
    name: "Detail",
    redirect: "detailIndex/:id",
    meta: {
      name: "文章列表",
    },
    component: Layout,
    children:[
      {
        path: '/detailIndex/:id',
        name: 'detailIndex',
        meta: {
          name: '发布文章'
        },
        component: Detail
      },
    ]
  },
 
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
