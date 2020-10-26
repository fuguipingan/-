import Home from "../pages/Home"
 const dynamicRouters = [
    {
         path: '/',name : "Home",
         redirect:"/HomePage",
         component: Home,children:[] 
    },
    {path: '*', component: () => import(/*webpackChunkName:'page404' */ "../pages/Pages404")}
];
export default dynamicRouters