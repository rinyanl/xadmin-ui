import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import './index.less'
import cookie from 'react-cookies'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Msg from '@/components/Msg'
import { adminLogin } from '@/api'
import { useHistory } from 'react-router-dom';
import Toast from '@/components/Toast';
import eventBus from '@/utils/eventBus'
import NothingIcon from '@/assets/icons/NothingIcon'

const Login = (props) => {
    const { setIsLogin } = props
    const router = useHistory()
    const [type, setType] = useState(false)

    // 提示消息 
    const [message, setMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("success");
    const [openMsg, setOpenMsg] = React.useState(false);
    const handleCloseMsg = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMsg(false);
    };

    // console.log(React.$theme.primary.dark);

    const [userName, setuserName] = useState("")
    const [userPassword, setuserPassword] = useState("")





    const confirmLogin = async () => {

        if (userName.trim().length <= 0 || userPassword.trim().length <= 0) {
            Toast.error("输入框不可以为空")
            return
        }
        if (userPassword.trim().length < 6) {
            Toast.error("密码不能少于6位数")
            return
        }



        let params = {
            userName: userName.trim(),
            userPassword: userPassword.trim(),
        }

        const { data: res } = await adminLogin(params)
        if (res.status !== 200) {
            Toast.error(res.msg)
            return
        } else {

            console.log(res);
            const cookieData = new Date()
            cookieData.setTime(cookieData.getTime() + 1 * 2 * 60 * 60 * 1000); // 默认2小时后稻妻
            cookie.save("userId", res.data._id, { path: '/', expires: cookieData, })
            cookie.save("userToken", res.token, { path: '/', expires: cookieData, })


            Toast.success("登录成功")
            setIsLogin(true)
            router.push({ pathname: "/user" })
            eventBus.emit('setIndex', 0)

        }



    }

    useEffect(() => {
        var crisp = document.querySelector('.crisp-client')

        if (crisp) {
            crisp.style.display = 'none'
        }
    }, [])




    // 检测 search 字段
    const qsParse = () => {
        // let str1 = props.location.search.split('=')
        // console.log(location);
        let transtr = location.search
        transtr = transtr.replace('?', "") // 问号给删了
        let authstr = /.*?&.*/ //确认是否存在 & 符号

        let obj = {}
        if (authstr.test(transtr)) {
            let str1 = transtr.split('&')
            str1.map(m => {
                let temp = m.split('=')

                if (!obj[temp[0]]) {
                    obj[temp[0]] = temp[1]

                }
            })
        } else {
            let str1 = transtr.split('=')
            obj[str1[0]] = str1[1]
        }

        return obj
    }


    const goRegister = () => {
        let params = qsParse()
        console.log();
        if (params.bywhom) {
            return `/register?bywhom=${params.bywhom}`
        }
        return '/register'
    }


    return (

        <Grid container sx={{ height: "100%", background: React.$theme.background[100] }} >
            <Grid item xs={4.5} sx={{ height: "100%", display: { xs: 'none', md: 'block', lg: 'block' } }}>
            </Grid >
            <Grid item xs={12} md={3} lg={3} sx={{ height: "100%", p: 3, pb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="login" >
                    {/* <Button onClick={() => Toast.success("登陆成功")}>触发</Button> */}
                    <Box className="container" sx={{ background: React.$theme.background[50], }}>
                        <form>
                            <Box sx={{ mt: 1, mb: 2.5, display: 'flex', alignItems: 'center', }}
                            >
                                <NothingIcon
                                    style={{ height: 27 }}
                                    name={React.$theme.mode === 'dark' ? "logol" : 'logo'} />
                            </Box>

                            <Box sx={{ mt: 3, mb: 3 }}>
                                <OutlinedInput
                                    sx={{ width: "100%", mb: 3, fontSize: '15px ', height: 42 }}
                                    size='small'
                                    placeholder='用户'
                                    id="login_email"
                                    value={userName}
                                    onChange={(e) => setuserName(e.target.value)}
                                    onKeyUp={e => {
                                        if (e.key === "Enter") {
                                            confirmLogin()
                                        }
                                    }}
                                />
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px', height: 42 }}
                                    size='small'
                                    type={type ? 'text' : 'password'}
                                    id="login_pass"
                                    placeholder='密码'
                                    value={userPassword}
                                    onChange={(e) => setuserPassword(e.target.value)}
                                    onKeyUp={e => {
                                        if (e.key === "Enter") {
                                            confirmLogin()
                                        }
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => (setType(!type))}
                                            >
                                                {type ? <VisibilityOff sx={{ height: 20 }} /> : <Visibility sx={{ height: 20 }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Button disableElevation variant="contained" size='large' sx={{ width: '100%', mt: 0.8, mb: 1.5 }}
                                onClick={confirmLogin}
                            >登录</Button>
                        </form>

                    </Box>
                    <Msg open={openMsg} onClose={handleCloseMsg} severity={severity}>
                        {message}
                    </Msg>
                </Box >
            </Grid >
            <Grid item xs={4.5} sx={{ height: "100%", display: { xs: 'none', md: 'block', lg: 'block' } }}>
            </Grid >

        </Grid >
    )
}

export default Login