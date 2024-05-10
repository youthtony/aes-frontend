<template>
  <div id="basicLayout">
    <!-- 三层结构-->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="-header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="-content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="-footer">
        <a-space>
          <a-link href="https://github.com/youthtony/" icon>YT</a-link>
        </a-space>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
  background-position: center;
  background-size: 100% auto;
  background-image: url("@/assets/star.jpg");
}

.-header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 8px 15px 2px 15px;
  background-color: var(--color-bg-2);
}

.-content {
  padding: 1px 5px 1px 5px;
  margin: 1px 15px 2px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.-footer {
  padding: 8px;
  margin: 4px 8px 2px 8px;
  position: sticky;
  text-align: left;
  color: white;
  border-radius: 5px;
  background-image: url("@/assets/rubikSCube.jpg");
  background-position: center;
  background-size: 100% auto;
}
</style>
