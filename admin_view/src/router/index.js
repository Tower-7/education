import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Admin from "../views/layout";
import { getToken } from "../utils/userStorage";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Admin",
    name: "admin",
    component: Admin,
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
          // removeToKen();
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
