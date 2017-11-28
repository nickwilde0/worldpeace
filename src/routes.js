import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import OrgRoleMgt from './views/jigouguanli/OrgRoleMgt.vue'
import OrgInfoMgt from './views/jigouguanli/OrgInfoMgt.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import PublicHome from './views/PublicHome.vue'

/* 
   动态路由
*/
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,  // organizational management 
        name: '纸票承兑登记',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/home', component: Home, name: '主页', hidden: true},  
            { path: '/orginfomgt', component: OrgInfoMgt, name: '纸票承兑登记Marker' },
            { path: '/orgrolemgt', component: OrgRoleMgt,name: '纸票承兑登记Checker' },
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/publichome',
        component: PublicHome,
        name: '公共页面',
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;