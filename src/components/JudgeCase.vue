<template>
  <div id="judgeConfig" @change="handleChange">
    <div style="display: flex; align-items: center">
      <icon-caret-down :style="{ fontSize: '12px', color: 'green' }" />
      <span>{{ input }} </span>
      <!--      加入一个空格-->
      <span style="margin: 0 5px"> </span>
      <icon-caret-up :style="{ fontSize: '12px' }" />
      <span>{{ output }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  input: string;
  output: string;
  mode?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  input: () => "1 2",
  output: () => "3 4",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped>
#judgeConfig {
  color: green;
}
</style>
