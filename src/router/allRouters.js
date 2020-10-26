import Attendance from "../pages/Home/Attendance";
import DataStatistics from "../pages/Home/DataStatistics";
import HomePage from "../pages/Home/HomePage";
import MyCenter from "../pages/Home/MyCenter";
import StudentManager from "../pages/Home/StudentManager";
import studentDormitory from "../pages/Home/StudentManager/studentDormitory";
import studentProfile from "../pages/Home/StudentManager/studentProfile";
import studentProject from "../pages/Home/StudentManager/studentProject";
import Users from "../pages/Home/Users";
const allRoutes = [
    {
      path: 'HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        name: '管理首页',
        icon: 'iconfont icon-shouye',
        fullPath:"/HomePage"
      }
    },
    {
      path: 'StudentManager',
      name: 'StudentManager',
      redirect:"/StudentManager/studentProject",
      component: StudentManager,
      meta: {
        name: '学员管理',
        icon: 'iconfont icon-xueyuan'
      },
      children: [
        {
          path: 'studentProject',
          name: 'studentProject',
          component: studentProject,
          meta: {
            name: '学员项目管理',
            icon: 'iconfont icon-wode1',
          },
        },
        {
          path: 'studentProfile',
          name: 'studentProfile',
          component: studentProfile,
          meta: {
            name: '学员资料',
            icon: 'iconfont icon-kaoqin2'
          }
        },
        {
          path: 'studentDormitory',
          name: 'studentDormitory',
          component: studentDormitory,
          meta: {
            name: '学员宿舍',
            icon: 'iconfont icon-shuju2'
          }
        }
      ]
    },
    {
      path: 'Attendance',
      name: 'Attendance',
      component: Attendance,
      meta: {
        name: '考勤管理',
        icon: 'iconfont icon-kaoqin'
      }
    },
    {
      path: 'Users',
      name: 'Users',
      component: Users,
      meta: {
        name: '用户管理',
        icon: 'iconfont icon-yonghu'
      }
    },
    {
      path: 'DataStatistics',
      name: 'DataStatistics',
      component: DataStatistics,
      meta: {
        name: '数据统计',
        icon: 'iconfont icon-shuju1'
      }
    },
    {
      path: 'MyCenter',
      name: 'MyCenter',
      component: MyCenter,
      meta: {
        name: '我的中心',
        icon: 'iconfont icon-wode'
      }
    }
  ]
  
  export default allRoutes