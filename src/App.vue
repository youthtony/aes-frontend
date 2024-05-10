<template>
  <div id="app" style="min-width: 500px">
    <div class="wft-particles-container" :style="particlesContainerStyle">
      <vue-particles
        id="wft-tsparticles"
        :particlesInit="particlesInit"
        :options="particlesOpt"
      />
    </div>
    <template v-if="route.path.startsWith('/user')">
      <router-view style="z-index: -1" />
    </template>
    <template v-else>
      <BasicLayout style="z-index: -1" />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import {
  onBeforeUnmount,
  onMounted,
  ref,
  defineProps,
  withDefaults,
  computed,
} from "vue";
import { useRoute } from "vue-router";
import { create } from "axios";
import particlesOpt from "./config/particles";
import { loadSlim } from "tsparticles-slim";
import { ChatService } from "../generated";

const props = withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
    backgroundImage?: string;
  }>(),
  {
    width: "100%",
    height: "100%",
    backgroundColor: "#e8e2e3",
    backgroundImage: "",
  }
);

const particlesContainerStyle = computed(() => {
  return {
    width: typeof props.width === "string" ? props.width : props.width + "px",
    height:
      typeof props.height === "string" ? props.height : props.height + "px",
    backgroundColor: props.backgroundColor,
    backgroundImage: `url(${props.backgroundImage})`,
  };
});

const particlesInit = async (engine: any) => {
  await loadSlim(engine);
};

const route = useRoute();
/**
 * 全局初始化行数，有全局单次调用的代码，都可以写在这
 */
const doInit = () => {
  console.log("嗨嗨嗨");
  // const res = ChatService.requestUsingPost("如何在cmd中执行Java程序？");
  // console.log(res);
};

// 钩子函数
onMounted(() => {
  document.title = "算法测评系统";
  doInit();
});
</script>

<style scoped>
.wft-particles-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#wft-tsparticles {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
