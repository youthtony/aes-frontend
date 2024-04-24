<template>
  <!--头部菜单-->
  <div id="GlobalHeader">
    <a-row align="center">
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
            <a-menu-item v-for="item in visibleRoutes" :key="item.path"
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
import { computed, defineComponent, ref } from "vue";
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();

// 对路由进行过滤 computed(计算属性)进行动态获取数据
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu === true) {
      return false;
    }
    //   根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

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
//
// setTimeout(() => {
//   //todo 需要改成后端获取登录
//   store.dispatch("user/getLoginUser", {
//     userName: "小易",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#GlobalHeader {
  //background-image: url("@/assets/BLUE.jpg");
}
</style>
