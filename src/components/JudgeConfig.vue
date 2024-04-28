<template>
  <div id="judgeConfig" @change="handleChange">
    <div class="config">
      <icon-schedule :style="{ fontSize: '10px' }" />
      <span>{{ timeLimit }} </span>
    </div>
    <div class="config">
      <icon-layers :style="{ fontSize: '10px' }" />
      <span>{{ memoryLimit }} </span>
    </div>
    <div class="config">
      <icon-storage :style="{ fontSize: '10px' }" />
      <span>{{ stackLimit }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  timeLimit: number;
  memoryLimit: number;
  stackLimit: number;
  mode?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  timeLimit: () => 1000,
  memoryLimit: () => 1000,
  stackLimit: () => 1000,
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped>
#judgeConfig {
  color: #909c00;
}

span {
  font-size: 12px;
}

config {
  display: flex;
  align-items: center;
}
</style>
