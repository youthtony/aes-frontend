import { RouteRecordRaw } from "vue-router";
import homeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import component from "*.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

/**
 *  路由配置 记录路由数据
 */
export const routes: Array<RouteRecordRaw> = [
  // 用户相关
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
  // 题目相关
  {
    path: "/",
    name: "主页",
    component: QuestionsView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/question_submit",
    name: "浏览题目提交",
    component: QuestionSubmitView,
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question/",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  // {
  //   path: "/",
  //   name: "无",
  //   component: homeView,
  //   meta: {
  //     access: ACCESS_ENUM.NOT_LOGIN,
  //   },
  // },
  {
    path: "/403",
    name: "无权限",
    component: ErrorView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
      hideInMenu: true,
    },
  },
  // {
  //   path: "/about",
  //   name: "关于",
  //   meta: {
  //     access: ACCESS_ENUM.NOT_LOGIN,
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
