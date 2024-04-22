import { Commit, StoreOptions } from "vuex";

// initial state 存储状态信息
const state = () => ({
  loginUser: {
    userName: "未登录",
    role: "NoLogin",
  },
});

// getters
const getters = {};

// actions 执行异步操作，并且执行mutation的更改，即调用了mutation
const actions = {
  getLoginUser({ commit }: { commit: Commit }, payload: string) {
    // todo 改为远程调用服务端获取信息
    commit("updateUser", payload);
  },
};

// mutations 定义了变量进行增删改查的方法
const mutations = {
  //   更新用户
  updateUser(state: any, user: string) {
    state.loginUser = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
