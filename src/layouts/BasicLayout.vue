<template>
  <div id="basicLayout">
    <!-- 三层结构-->
    <a-layout style="height: 400px">
      <a-layout-header class="-header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="-content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="-footer">底部</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
}

.-header {
  height: 100px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 18px 15px;
  background-color: var(--color-bg-2);
}

.-content {
  height: 100%;
}

.-footer {
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #9bf1d9;
}
</style>
