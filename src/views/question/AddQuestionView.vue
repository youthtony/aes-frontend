<template>
  <div id="addQuestionView">
    <div>
      <a-form :model="form" label-align="right" :on-submit="doSubmit">
        <h2 style="color: white">
          {{ updatePage ? "修改题目" : "创建题目" }}
        </h2>
        <a-form-item field="title" label="标题: ">
          <a-input
            v-model="form.title"
            placeholder="请输入标题..."
            :style="{ width: '20%' }"
          />
        </a-form-item>
        <a-form-item field="tags" label="标签: ">
          <a-input-tag
            v-model="form.tags"
            :style="{ width: '40%' }"
            placeholder="请输入标签..."
            allow-clear
          />
        </a-form-item>
        <a-form-item field="content" label="题目内容: ">
          <md-editor
            mode="split"
            :value="form.content"
            :handle-change="onContentChange"
          />
        </a-form-item>
        <a-form-item field="answer" label="标准答案: ">
          <md-editor
            mode="split"
            :value="form.answer"
            :handle-change="onAnswerChange"
          />
        </a-form-item>

        <a-form-item
          label="判题配置"
          :content-flex="false"
          :merge-props="false"
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item field="judgeConfig.timeLimit" label="时间限制: ">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                :min="0"
                placeholder="请输入时间限制..."
              />
              ms
            </a-form-item>
            <a-form-item field="judgeConfig.memoryLimit" label="内存限制: ">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                :min="0"
                placeholder="请输入内存限制..."
              />
              KB
            </a-form-item>
          </a-space>
        </a-form-item>
        <a-form-item
          label="测试用例"
          :content-flex="false"
          :merge-props="false"
        >
          <a-space direction="vertical">
            <a-form-item
              v-for="(judgeCaseItem, index) of form.judgeCase"
              :key="index"
              no-style
            >
              <a-space direction="vertical" style="min-width: 520px">
                <a-form-item
                  :field="`form.judgeCase[${index}].input`"
                  :label="`输入用例-${index + 1}`"
                  :key="index"
                >
                  <a-input
                    v-model="judgeCaseItem.input"
                    placeholder="请填入输入用例..."
                  />
                </a-form-item>
                <a-form-item
                  :field="`form.judgeCase[${index}].input`"
                  :label="`输出用例-${index + 1}`"
                  :key="index"
                >
                  <a-input
                    v-model="judgeCaseItem.output"
                    placeholder="请填入输出用例..."
                  />
                </a-form-item>
              </a-space>
              <a-button
                style="margin-left: 48px; min-width: 116px"
                type="outline"
                status="danger"
                @click="handleDelete(index)"
                >删除
              </a-button>
            </a-form-item>
            <div>
              <a-button
                type="outline"
                status="success"
                @click="handleAdd"
                style="
                  float: right;
                  margin-bottom: 32px;
                  margin-top: 32px;
                  margin-left: 570px;
                "
                >新增测试用例
              </a-button>
            </div>
          </a-space>
        </a-form-item>
        <a-form-item>
          <a-button
            @click="doSubmit"
            style="margin: 0 200px; min-width: 200px"
            type="primary"
            >提交
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
      router.back();
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      // 如果创建成功，清空form
      message.success("创建成功");
      form.value = {
        title: "",
        tags: [],
        answer: "",
        content: "",
        judgeConfig: {
          memoryLimit: 1000,
          stackLimit: 1000,
          timeLimit: 1000,
        },
        judgeCase: [
          {
            input: "",
            output: "",
          },
        ],
      };
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};

/**
 * 新增判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除判题用例
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
/**
 *  加载题目内容数据
 * @param value
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};
/**
 *   加载题目答案数据
 * @param value
 */
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
#addQuestionView {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#form-container form {
  /* Your form styles */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Other styles */
}

.-form {
  justify-content: center;
  justify-items: center;
  justify-self: center;
}
</style>
