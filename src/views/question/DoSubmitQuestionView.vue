<template>
  <!--做题页面-->
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <!--左侧题目展示-->
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <!--卡片额外信息，展示标签-->
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="blue"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <!--todo AI帮助-->
          <a-tab-pane key="chat" title="AI帮助" style="height: 100%">
            <a-card title="提示">
              <a-comment
                align="right"
                author="XiaoYi"
                style="with: 100%; height: 300px; marginbottom: '12px'"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                datetime="..."
              >
                <template #content>
                  <MdViewer :value="chat.answer || ''" />
                </template>
              </a-comment>
              <a-comment align="right">
                <template #actions>
                  <a-button key="0" type="secondary" @click="clickCancel()">
                    清除
                  </a-button>
                  <a-button key="1" type="primary" @click="clickSubmit()">
                    提问
                  </a-button>
                </template>
                <template #content>
                  <a-input
                    style="width: 100%"
                    :placeholder="'请输入内容'"
                    :model-value="chat.userQuestion"
                    @input="changeUserQuestion"
                  />
                </template>
              </a-comment>
            </a-card>
          </a-tab-pane>
          <!--          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>-->
        </a-tabs>
      </a-col>
      <!--右侧进行答题-->
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>python</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
        <a-button
          status="success"
          style="min-width: 200px; margin-left: 20px"
          @click="router.back"
        >
          返回
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  ChatService,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import { useRouter } from "vue-router";

const router = useRouter();

// 定义一个名为 Props 的接口，用于存储 Vue 组件的属性
interface Props {
  id: string;
}

// 使用 withDefaults 和 defineProps 函数来定义组件的属性
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

//初始化chat 包含提问 回答两个属性
const chat = ref({
  answer: "向我提问吧^-^",
  userQuestion: "",
});

// 输入信息
const changeUserQuestion = (value: string) => {
  chat.value.userQuestion = value;
};

const clickCancel = () => {
  chat.value.userQuestion = "";
};

//提交问题到后台
const clickSubmit = async () => {
  //   提交信息
  chat.value.answer = "正在思考中...";
  const res = await ChatService.requestUsingPost(chat.value.userQuestion);
  if (res.code === 0) {
    chat.value.answer = ""; // 清空答案
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < res.data.length) {
        chat.value.answer += res.data[index]; // 逐个字添加到答案中
        index++;
      } else {
        clearInterval(intervalId); // 当所有字符都显示完毕后清除定时器
      }
    }, 50); // 控制字体显示速度，可以根据需求调整
    chat.value.userQuestion = "";
  } else {
    message.error("回答失败，" + res.message);
  }
};

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 8px auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
