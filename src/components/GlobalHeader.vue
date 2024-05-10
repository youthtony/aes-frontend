<template>
  <!--头部菜单-->
  <div id="GlobalHeader">
    <a-row align="center" :wrap="false">
      <!--导航信息-->
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
        <a-col flex="100px">
          <div class="userAvatar">
            <a-dropdown trigger="hover">
              <!--头像-->
              <!--todo 有可能的话实现图片裁切功能-->
              <a-avatar shape="circle">
                <template
                  v-if="loginUser && loginUser.userRole as string !== ACCESS_ENUM.NOT_LOGIN"
                >
                  <template v-if="loginUser.userAvatar">
                    <img
                      class="avatarImg"
                      alt="avatar"
                      :src="loginUser.userAvatar"
                    />
                  </template>
                  <template v-else>
                    <a-avatar>
                      <IconUser />
                    </a-avatar>
                  </template>
                </template>
                <template v-else>
                  <a-avatar>未登录</a-avatar>
                </template>
              </a-avatar>
              <!--下拉菜单-->
              <template #content>
                <!--用户已经登录-->
                <template
                  v-if="loginUser && loginUser.userRole as string !== ACCESS_ENUM.NOT_LOGIN"
                >
                  <!--个人信息-->
                  <a-doption>
                    <template #icon>
                      <icon-idcard />
                    </template>
                    <template #default>
                      <a-anchor-link
                        @click="
                          router.push({
                            path: '/about',
                          })
                        "
                        >个人信息
                      </a-anchor-link>
                    </template>
                  </a-doption>
                  <!--退出登录-->
                  <a-doption>
                    <template #icon>
                      <icon-poweroff />
                    </template>
                    <template #default>
                      <a-anchor-link @click="logout">退出登录</a-anchor-link>
                    </template>
                  </a-doption>
                </template>
                <!--用户还未登录时-->
                <template v-else>
                  <!--用户登录-->
                  <a-doption>
                    <template #icon>
                      <icon-user />
                    </template>
                    <template #default>
                      <a-anchor-link
                        @click="
                          router.push({
                            path: '/user/login',
                          })
                        "
                        >用户登录
                      </a-anchor-link>
                    </template>
                  </a-doption>
                  <!--用户注册-->
                  <a-doption>
                    <template #icon>
                      <icon-user-add />
                    </template>
                    <template #default>
                      <a-anchor-link
                        @click="
                          router.push({
                            path: '/user/register',
                          })
                        "
                        >用户注册
                      </a-anchor-link>
                    </template>
                  </a-doption>
                </template>
              </template>
            </a-dropdown>
          </div>
        </a-col>
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
import { LoginUserVO, UserControllerService } from "../../generated";

const router = useRouter();
const store = useStore();
const selectedKeys = ref(["/"]);

const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

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

//  菜单点击事件
const doMenuClick = (key: string) => {
  router.push(key);
};

//  登录点击事件
const clickLogin = () => {
  router.push("/user/login");
};

// 退出登录
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
  console.log(from, failure);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userAvatar {
  cursor: pointer;
}

.avatarImg {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  object-fit: cover;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-right: 16px;
}
</style>
