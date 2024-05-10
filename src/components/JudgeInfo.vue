<template>
  <div id="judgeConfig" @change="handleChange">
    <div class="config">
      <icon-message :style="{ fontSize: '10px' }" />
      <span>{{ message }} </span>
    </div>
    <div class="config">
      <icon-history :style="{ fontSize: '10px' }" />
      <span>{{ time }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  message: string;
  time: number;
  memory: number;
  mode?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  message: () => "ok",
  time: () => 1000,
  stackLimit: () => 1000,
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped>
#judgeConfig {
  color: #0181b0;
  width: 130px;
  height: 35px;
}

span {
  font-size: 12px;
}

config {
  display: flex;
  align-items: center;
}
</style>
