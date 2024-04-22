<template>
  <!--头部菜单-->
  <div id="GlobalHeader">
    <a-row style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <div>
          <a-menu
            mode="horizontal"
            :selected-keys="selectedKeys"
            @menu-item-click="doMenuClick"
          >
            <!--AES标志-->
            <a-menu-item
              key="0"
              :style="{ padding: 0, marginRight: '38px' }"
              disabled
            >
              <h1>AES</h1>
            </a-menu-item>
            <!-- 菜单项-->
            <a-menu-item v-for="item in routes" :key="item.path"
              >{{ item.name }}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <!--显示登录用户-->
      <a-col flex="100px">
        <div>
          {{ store.state.user?.loginUser?.userName ?? "未登录" }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();

// 路由跳转时，更新菜单选中状态
router.beforeEach((to, from, next) => {
  selectedKeys.value = [to.path];
  next();
});

const selectedKeys = ref(["/"]);
//  菜单点击事件
const doMenuClick = (key: string) => {
  router.push(key);
};

const store = useStore();
setTimeout(() => {
  //todo 需要改成后端获取登录
  store.dispatch("user/getLoginUser", { userName: "小易", role: "admin" });
}, 3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#GlobalHeader {
  //background-image: url("@/assets/BLUE.jpg");
}
</style>
