<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  console.log(to.meta, from);
  if (to.meta?.access === "admin") {
    //   管理员可见，判断用户是否有权限
    if (store.state.user.loginUser.role === "admin") {
      next();
    } else {
      //    没有权限，跳转到403页面
      next("/403");
    }
  }
  next();
});
</script>
