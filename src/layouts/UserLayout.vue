<template>
  <div id="userLayout">
    <!-- 三层结构-->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="-header">
        <div key="0" disabled>
          <h1 style="color: #73a7be">AES</h1>
        </div>
      </a-layout-header>
      <a-layout-content class="-content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="-footer">YT</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#userLayout {
  background-image: url("@/assets/BLUE.jpg");
  background-size: 100% auto;
  height: 100%;
}

.-header {
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: 8px 15px 2px 15px;
  background-color: var(--color-bg-2);
  text-align: center;
  border-radius: 5px;
}

.-content {
  padding: 1px 5px 1px 5px;
  margin: 1px 15px 2px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.-footer {
  //padding: 16px; //margin: 4px; position: sticky; text-align: center; margin: 1px 15px 2px 15px; color: white; bottom: 0; left: 0;
  right: 0;
  background-color: #76beba21;
}
</style>
