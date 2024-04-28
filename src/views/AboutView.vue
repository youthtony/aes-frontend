<template>
  <div class="about">
    <!--    <h1>This is an about page</h1>-->
    <!--    <MdEditor :value="value" :handle-change="onChange" />-->
    <!--    <CodeEditor :value="codeValue" :handleChange="changeCode" />-->
    <JudgeConfig
      :time-limit="timeLimit"
      :memory-limit="memoryLimit"
      :stack-limit="stackLimit"
    />
    <a-button @click="doClick">点我</a-button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import JudgeConfig from "@/components/JudgeConfig.vue";

const timeLimit = ref(1);
const memoryLimit = ref(1);
const stackLimit = ref(1);

const doClick = () => {
  timeLimit.value++;
  memoryLimit.value++;
  stackLimit.value++;
};

// const value = ref();
// const codeValue = ref();
//
// const onChange = (v: string) => {
//   value.value = v;
// };
//
// const changeCode = (v: string) => {
//   codeValue.value = v;
// };
</script>
