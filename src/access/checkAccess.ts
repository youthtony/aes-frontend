import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 权限校验 判断当前登录用户是否具有需要的权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前登录用户的角色
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果不需要权限校验，则直接返回true
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  // 如果需要用户登录才可以访问
  if (needAccess === ACCESS_ENUM.USER) {
    //  判断用户是否已经登录，未登录返回false
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) return false;
  }

  // 如果需要用户是管理员才可以访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //     判断用户是否是管理员，不是返回false
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) return false;
  }

  return true;
};

export default checkAccess;
