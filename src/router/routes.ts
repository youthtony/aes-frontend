import { RouteRecordRaw } from "vue-router";
import homeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import component from "*.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";

/**
 *  路由配置 记录路由数据
 */
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: LoginView,
      },
      {
        path: "/user/register",
        name: "注册",
        component: RegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "浏览题目",
    component: homeView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/403",
    name: "错误",
    component: ErrorView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于",
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
