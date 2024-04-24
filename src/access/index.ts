import ACCESS_ENUM from "@/access/accessEnum";
import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loginUser = store.state.user.loginUser;

  // 如果之前没有登录 自动登录
  if (!loginUser || !loginUser.userRole) {
    // 等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果需要跳转的页面必须登录，则跳到登录页面
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next("user/login?redirect=" + to.fullPath);
      return;
    }
    // 如果登录，但没有权限，则跳到403页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/403");
      return;
    }
  }

  next();
});
