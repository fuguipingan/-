
// let menuList ={
//     "menuList": [
//         {
//             "name": "管理首页"
//         },
//         {
//             "name": "学员管理",
//             "children": [
//                 {
//                     "name": "学员项目管理"
//                 }
//             ]
//         },
//         {
//             "name": "我的中心"
//         }
//     ]
// }
//设置递归函数，把服务端发送的menuList和动态路由筛选一下，
//1.
//2.
//3.

/* *
* @param {Array} allRouter 用户的有限的完整路由配置
* @param {Array} menuList 服务器返回的用户菜单名字
* 
*/

// import allRouters from "../router/allRouters";
const recursionRouters = (allRouter, menuList) => {
    let userRouters = [];
    allRouter.forEach(item => {
        menuList.forEach(v => {
            if (v.name === item.meta.name) {
                if (v.children  && Array.isArray(v.children )) {
                    //再次判断如果还有子路由，进行递归
                    //用item.children 接收这个递归的返回值，就是需要的子路由了
                    //item.chilren 全部的子路由
                    //v.children 需要找相同的子路由
                    item.children = recursionRouters(item.children ,v.children )
                }
                userRouters.push(item)//把相同名称的路由添加进入新数组
            }
        })
    })
    return userRouters;
}
// console.log( allRouters, menuList)
export default recursionRouters;

