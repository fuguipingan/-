import Vue from "vue";
import Vuex from "vuex";

import { getMenuList } from "@/api"; //获取用户路由接口
import allRoutes from "../router/allRouters"; //全部路由
import dynamicRouters from "../router/dynamicRouter"; //动态路由，需要把对应的路由添加进去
import router from "../router/index.js"; //展示的路由，跳转地址
import recursionRouters from "../utils/recursionRoutes"; //递归函数，递归出正确的路由

// console.log(dynamicRouters)
// console.log(router)

Vue.use(Vuex);

//设置当页面重新加载时，获取localstrong中的userInfo
let userInfo = localStorage.getItem("qf-userInfo") || "{}";
userInfo = JSON.parse(userInfo);

let userButtons = localStorage.getItem("permissionButton") || "{}";
userButtons = JSON.parse(userButtons);

export default new Vuex.Store({
  state: {
    userInfo,
    sideMenu: [],
    crumbs: [],
    userButtons //按钮权限
  },
  mutations: {
    SET_USERINFO(state, payload) {
      //把服务端的用户信息放入userInfo，本地存储
      //  console.log( payload)
      state.userInfo = payload;
    },
    SET_SINEMENU(state, payload) {
      //设置侧边栏菜单数据

      // console.log(payload)
      // console.log(allRoutes)
      let userRouters = recursionRouters(allRoutes, payload);
      state.sideMenu = userRouters; //把递归出来的路由放入vuex中
      let target = dynamicRouters.find(item => item.path === "/");
      target.children = [...userRouters]; //将home页面的children中添加进入动态路由
      router.addRoutes([...dynamicRouters]); //将动态路由添加进入主路由
      // console.log(state.sideMenu);
    },
    SET_CRUMBS(state, payload) {
      //处理面包屑同步到crumbs中
      state.crumbs = payload;
    },
    SET_USERBUTTON(state, payloay) {
      state.userButtons = payloay;
      console.log(state.userButtons);
    }
  },
  actions: {
    async FETCH_MENULIST({ commit, state }, payload) {
      //请求后台路由数据(侧边栏数据)
      let res = await getMenuList();
      //  console.log(res)
      if (res && res.data) {
        //防止出现空指针
        commit("SET_SINEMENU", res.data.menuList);
        // let menuList = res.data.menuList;
        // recursionRouters()
      }

      // .then(res=>{
      //
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
    }
  },
  modules: {},
  getters: {}
});
