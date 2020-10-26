//congig用来配置axios
import axios from "axios";

import router from "../router"
import ElementUI from "element-ui"

import NProgress from 'nprogress'

//中断请求属性
export let CancelToken = axios.CancelToken;

//路径重写
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true;//允许请求携带认证(token?)

// 添加请求拦截器，可以给每个请求携带上想要传递的内容
axios.interceptors.request.use(function (config) {
    //登录、验证码不需要token
    NProgress.start(); //进度条出现
    if (config.url === "/users/login") {
        return config;
    } else {
        // 将token给到一个前后台约定好的key中，作为请求发送
        let token = localStorage.getItem('qf-2005');
        config.headers['authorization'] = token;
        // console.log(config.url = config.url+token)
        return config;
    }

})

//响应拦截
axios.interceptors.response.use(config=>{
    NProgress.done();  //进度条消失
    // console.log(config)
    let {data}  = config
    // console.log(data)
    // console.log(ElementUI)
    // console.log( data )
    // console.log( data.code )
    if( data.code == "1004" || data.code == "10022" ){//code 1004 登入失效
        // console.log(ElementUI)
       localStorage.removeItem("qf-2005")//登录失效和过期，清楚token
        ElementUI.Message.error("登陆失效，请重新登陆")
        router.push("/login");
        window.location.reload();
        
    }
    return config;
    
})

axios.create({
    timeout: 4000,
})



export default axios;