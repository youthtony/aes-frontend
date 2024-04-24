<template>
  <div id="LoginView">
    <a-form
      class="arco-form"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <h2 style="text-align: center">用户注册</h2>
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
          :defaultVisibility="true"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="userPassword" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
          :defaultVisibility="true"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="reback">返回</a-button>
        <a-button type="outline" html-type="submit">注册</a-button>
      </a-form-item>
      <a-link href="login">前往登录</a-link>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
} as UserRegisterRequest);

const router = useRouter();
const store = useStore();

// 返回按钮
const reback = () => {
  router.back();
};

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  console.log("res: ", res);
  if (res.code === 0) {
    // 登录成功，跳转到主页
    message.success("注册完成");
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error(res.message);
  }
};
</script>

<style scoped>
#LoginView {
  text-align: center;
}

.arco-form {
  border: #9bf1d9;
  border-radius: 10px;
  box-shadow: 0 2px 8px #9bf1d9;
  background-color: #fff;
  max-width: 400px;
  margin: 125px auto;
  padding: 2em 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.arco-btn {
  width: 150px;
  background-color: transparent;
  margin-left: 5px;
}

.arco-btn-secondary,
.arco-btn-secondary[type="button"],
.arco-btn-secondary[type="submit"] {
  color: #76beba;
  border: 1px solid #76beba;
}

.arco-btn-outline,
.arco-btn-outline[type="button"],
.arco-btn-outline[type="submit"] {
  color: #76beba;
  background-color: transparent;
  border: 1px solid #76beba;
}

.arco-form-item-content-flex {
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>
