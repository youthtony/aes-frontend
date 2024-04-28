<template>
  <div id="manageQuestionView">
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #judgeConfig="{ record }">
        <JudgeConfig
          :time-limit="record.judgeConfig.timeLimit"
          :memory-limit="record.judgeConfig.memoryLimit"
          :stack-limit="record.judgeConfig.stackLimit"
        />
      </template>
      <template #judgeCase="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(item, index) of record.judgeCase"
            :key="index"
            color="green"
          >
            <JudgeCase :input="item.input" :output="item.output" />
          </a-tag>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Page_Question_,
  Question,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";
import MdEditor from "@/components/MdEditor.vue";
import JudgeConfig from "@/components/JudgeConfig.vue";
import JudgeCase from "@/components/JudgeCase.vue";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

/**
 * 获取分页数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records.map((record: any) => {
      // 将 tags 字段从字符串类型转换为数组类型
      record.tags = JSON.parse(record.tags.replace(/\\"/g, '"'));
      // 将 judgeConfig 字段从字符串类型转换为对象类型
      record.judgeConfig = JSON.parse(record.judgeConfig.replace(/\\"/g, '"'));
      // 将 judgeCase 字段从字符串类型转换为对象类型
      record.judgeCase = JSON.parse(record.judgeCase.replace(/\\"/g, '"'));
      return record;
    });
    console.log("更新页面", dataList.value);
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

/**
 * 依次对应表格的列
 */
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags", // 添加 slotName 属性
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    slotName: "judgeConfig", // 添加 slotName 属性
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    slotName: "judgeCase", // 添加 slotName 属性
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime", // 添加 slotName 属性
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

/**
 *  表格数据，点击分页时，会改变这个变量的值，从而触发页面重新加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 *  删除
 * @param question
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

/**
 * 点击修改数据
 * @param question
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
  margin: 8px 10px;
}

a-table. arco-table .arco-table-cell {
  padding: 2px 5px;
}
</style>
