import axios, { CancelToken } from "./config";

//登入接口
export const login = (username, password) =>
  axios({
    url: "/users/login",
    method: "post",
    data: {
      username,
      password
    }
  });

//获取登录日志
/*
 **
 *@parm {Object} _this 一个组件实例
 *
 */
export const getLoginLog = _this =>
  axios.get("/getloginlog", {
    cancelToken: new CancelToken(function(c) {
      // console.log(c)
      _this.cancel = c; //相当于给组件实例 添加一个cancel属性
    })
  });

//获取权限菜单
export const getMenuList = () => axios.get("/permission/getMenuList");

//获取验证码
export const getCaptcha = () => axios.get("/users/getCaptcha");
//刷新验证码
export const refreshCaptcha = () => axios.get("/users/refreshCaptcha");

//效验验证码
export const verifyCaptcha = captcha =>
  axios.get(`/users/verifyCaptcha?captcha=${captcha}`);

//获取学员信息
export const getStuList = (params = {}) =>
  axios({
    url: "/students/getstulist",
    post: "get",
    params
  });
//增加学员信息
export const addStuDetail = stuDtail =>
  axios({
    url: "/students/addstu",
    method: "post",
    data: stuDtail
  });
//删除学员
export const delStu = id => axios.get(`/students/delstu?sId=${id}`);

//编辑学员信息
export const updateStu = (updated = {}) =>
  axios({
    url: "/students/updatestu",
    method: "post",
    data: updated
  });
//搜索学员信息
export const searchStu = key => axios.get(`/students/searchstu?key=${key}`);

//获取班级
export const getClasses = key => axios.get(`/students/getclasses`);
