<template>
  <div id="Register">
    <a-form
      class="arco-form"
      :model="form"
      :style="{ width: '500px' }"
      @submit="handleSubmit"
    >
      <h2 style="text-align: center">用户注册</h2>
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
      <!--检查密码是否一致-->
      <a-form-item
        :rules="[
          { required: true, message: '请再次输入密码' },
          { minLength: 6, message: '密码长度不能低于六位' },
        ]"
        field="userPassword"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
          :defaultVisibility="true"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="reback" type="outline">返回</a-button>
        <a-button type="outline" html-type="submit">注册</a-button>
      </a-form-item>
      <a-link href="login" icon>前往登录</a-link>
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

// 检查密码是否一致
const checkPassword = async (value: string) => {
  if (value !== form.userPassword) {
    return message.error("两次输入的密码不一致");
  }
  return;
};

const handleSubmit = async () => {
  await checkPassword(form.checkPassword as any);
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
#Register {
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

:deep(.arco-form-item-label) {
  min-width: 75px;
  text-align: right;
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
