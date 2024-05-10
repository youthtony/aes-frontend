import { Commit, StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

// initial state 存储状态信息
const state = () => ({
  loginUser: {
    userName: "点击登录",
  },
});

// getters
const getters = {};

// actions 执行异步操作，并且执行mutation的更改，即调用了mutation
const actions = {
  async getLoginUser({ commit }: { commit: Commit }, payload: string) {
    // 改为远程调用服务端获取信息
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      console.log("获取用户信息", res.data);
      commit("updateUser", res.data);
    } else {
      commit("updateUser", {
        ...state().loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    }
  },
};

// mutations 定义了变量进行增删改查的方法
const mutations = {
  //   更新用户
  updateUser(state: any, payload: string) {
    state.loginUser = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
