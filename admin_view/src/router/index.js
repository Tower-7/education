import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Admin from "../views/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/Login",
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

export default router;
