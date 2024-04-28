<template>
  <div id="app" style="min-width: 500px">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
/**
 * todo 全局初始化行数，有全局单次调用的代码，都可以写在这
 */
const doInit = () => {
  return;
};

// 钩子函数
onMounted(() => {
  doInit();
});
</script>
