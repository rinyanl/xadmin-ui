// 路由守卫验证

import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
// import { routerMap } from '~@/router/routerMap.jsx'

import Home from '@/views/Home'
import Login from '@/views/Login'

const LoginAuth = (props) => {
    // 获取登录条件
    const { isLogin } = props



    // 拿到当前路径，
    const { pathname } = location
    // const isTargetRoute = routerMap.find(
    //     (item) => item.path === pathname
    // );
    // console.log('loginauth', isTargetRoute, isLogin);
    // return <Route path={isTargetRoute.path} component={isTargetRoute.component}></Route>
    // 如果为登录状态，前往登录页，重定向到首页，其他情况不做拦截
    if (isLogin) {
        return (
            <Switch>
                <Route path={import.meta.env.VITE_ROUTE_HOME} render={() => <Home {...props} />} ></Route>
                <Redirect to={import.meta.env.VITE_ROUTE_HOME} />
            </Switch>
        )
    }
    // 非登录情况，检查路由是否存在，若存在即前往登录页，不存在就 404
    else {
        return (
            <Switch>
                <Route path={import.meta.env.VITE_ROUTE_LOGIN} render={() => <Login  {...props} />}></Route>
                <Redirect to={import.meta.env.VITE_ROUTE_LOGIN} />
            </Switch>
        )
    }
};

export default LoginAuth

