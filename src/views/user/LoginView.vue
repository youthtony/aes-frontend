<template>
  <div id="LoginView">
    <a-form
      class="arco-form"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <h2 style="text-align: center">用户登录</h2>
      <a-form-item
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号长度不能低于四位' },
        ]"
        field="userAccount"
        label="账号"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 6, message: '密码长度不能低于六位' },
        ]"
        field="userPassword"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
          :defaultVisibility="true"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="reback" type="outline">返回</a-button>
        <a-button type="outline" html-type="submit">登录</a-button>
      </a-form-item>
      <a-link href="register" icon>前往注册</a-link>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

const reback = () => {
  router.back();
};

const handleSubmit = async () => {
  // 校验长度
  if (form.userAccount?.length === 0 || form.userPassword?.length === 0) {
    message.error("账号或密码不能为空");
    return;
  }
  const res = await UserControllerService.userLoginUsingPost(form);
  console.log("res: ", res);
  if (res.code === 0) {
    // 登录成功，跳转到主页
    message.success("登录成功");
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
  border-radius: 5px;
  box-shadow: 0 2px 8px #9bf1d9;
  background-color: #fff;
  max-width: 400px;
  margin: 125px auto;
  padding: 2em 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  background-color: transparent;
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
