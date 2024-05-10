<template>
  <div id="mdEditor">
    <Editor
      class="mdEditor"
      :value="props.value"
      :locale="locale"
      :mode="props.mode"
      :plugins="plugins"
      @change="props.handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";
import locale from "../locales/zh_Hans.json";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import math from "@bytemd/plugin-math";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

const plugins = [
  gfm({
    locale: gfmLocale,
  }),
  highlight(),
  math({
    locale: mathLocale,
  }),
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}

.bytemd-fullscreen {
  z-index: 100;
}
</style>
