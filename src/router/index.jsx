

import Info from '@/views/Home/Info';
import User from '@/views/Home/User';
import Config from '@/views/Home/Config';
import Sub from '@/views/Home/Sub';
import Inbound from '@/views/Home/Inbound';

export const routeMap = [
    {
        id: 0,
        title: "流量统计",
        auth: true,
        path: "/info",
        component: Info,
        children: []
    },
    {
        id: 1,
        title: "用户管理",
        auth: true,
        path: "/user",
        component: User,
        children: []
    },
    {
        id: 2,
        title: "入站管理",
        auth: true,
        path: "/inbound",
        component: Inbound,
        children: []
    },
    {
        id: 3,
        title: "订阅管理",
        auth: true,
        path: "/sub",
        component: Sub,
        children: []
    },
    {
        id: 4,
        title: "配置文件",
        auth: true,
        path: "/config",
        component: Config,
        children: []
    },

    // {
    //     id: 2,
    //     title: "会员管理",
    //     auth: true,
    //     path: "/vip",
    //     component: Vip,
    //     children: []
    // },
    // {
    //     id: 3,
    //     title: "订单管理",
    //     auth: true,
    //     path: "/order",
    //     component: Order,
    //     children: []
    // },

    // {
    //     id: 4,
    //     title: "优惠码管理",
    //     auth: true,
    //     path: "/code",
    //     component: Code,
    //     children: []
    // },

    // {
    //     id: 5,
    //     title: "管理员管理",
    //     auth: true,
    //     path: "/admin",
    //     component: Admin,
    //     children: []
    // },
    // {
    //     id: 6,
    //     title: "服务器管理",
    //     auth: true,
    //     path: "/server",
    //     component: Server,
    //     children: []
    // },
    // {
    //     id: 7,
    //     title: "订阅相关配置",
    //     auth: true,
    //     path: "/sub",
    //     component: Sub,
    //     children: []
    // },
    // {
    //     id: 8,
    //     title: "权限管理",
    //     auth: true,
    //     path: "/auth",
    //     component: Auth,
    //     children: []
    // }
    // {
    //     id: 4,
    //     title: "下载历史",
    //     auth: true,
    //     path: "/usehistor",
    //     component: Usehistor,
    //     children: []
    // },
    // {
    //     id: 4,
    //     title: "我的邀请",
    //     auth: true,
    //     path: "/invite",
    //     component: Invite,
    //     children: []
    // },
    // {
    //     id: 4,
    //     title: "下载历史",
    //     auth: true,
    //     path: "/usehistor",
    //     component: Usehistor,
    //     children: []
    // },
    // {
    //     id: 5,
    //     title: "帮助中心",
    //     auth: true,
    //     path: "/workorder",
    //     component: Workorder,
    //     children: []
    // },

]
