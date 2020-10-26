<template>
    <span>
        
       <el-breadcrumb-item :to="{path}" v-if="router.ch">{{name}}</el-breadcrumb-item>W
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </span>
</template>
<script>
import {mapState} from "vuex";

export default {
    name: "brandcrumb",
    props:["router"],
    data () {
        return {
            path:"",
            name:""
        }
    },
    methods: {
        digui(zong,fen){
           //1.找到对应的路由
           //2.没有chilren的直接
           //3.有children的直接递归找chilren
           //
            let arr = [];//需要返回的路由
            zong.forEach(item=>{
                if(item.name === this.router.name){
                    arr.push(item);
                }else{

                }
            });
            return arr;
        }
    },
    computed: {
        ...mapState(["sideMenu"])
    },
    mounted () {
            // this.digui(this.sideMenu,this.router)
        // console.log(this.router)//当前路由路径
        // // console.log(this.router.name)//当前路由路径
        // console.log(this.sideMenu)//全部路由
        // let target = this.sideMenu.find(item => {
        //     if(item.name === this.router.name){
        //         return item
        //     }else{

        //     }
        // })//当前说需的页面
        // console.log(target)
        
        // console.log(target.meta.name)//当前路径的名称
        // console.log(target.path)//当前路径
        // this.name = target.meta.name;
        // this.path = target.path;
    }
}
</script>