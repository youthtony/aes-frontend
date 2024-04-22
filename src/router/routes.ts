import { RouteRecordRaw } from "vue-router";
import homeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import ErrorView from "@/views/ErrorView.vue";

/**
 *  路由配置 记录路由数据
 */
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: homeView,
    meta: {
      access: "public",
    },
  },
  {
    path: "/admin",
    name: "浏览题目",
    component: AdminView,
    meta: {
      access: "admin",
    },
  },
  {
    path: "/403",
    name: "错误",
    component: ErrorView,
    meta: {
      access: "public",
    },
  },
  {
    path: "/about",
    name: "关于",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
