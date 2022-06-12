import React, { useState } from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AvatarIcon from '@/assets/icons/avatar.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled, alpha } from '@mui/material/styles';

import './index.less'


// import EditIconm from '@/assets/icons/menu.svg'

import Drawer from '@mui/material/Drawer';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import cookie from 'react-cookies'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { routeMap } from '@/router'
import { NavLink } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton';

import NothingIcon from '@/assets/icons/NothingIcon'




const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 4,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const Header = (props) => {
    const { isDark, setTheme, herderTitle } = props
    const { setIsLogin } = props
    const router = useHistory()

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };




    const signOutLogin = () => {
        const cookieData = new Date()
        cookie.save("userId", "", { path: '/', expires: cookieData, })
        cookie.save("UuerToken", "", { path: '/', expires: cookieData, })
        router.push({ pathname: "/login" })
        setIsLogin(false)
    };



    // 切换主题
    const toggleTheme = () => {
        isDark === 'dark' ? setTheme('light') : setTheme('dark')

    }

    // 移动端左侧菜单

    const [openDrawer, setOpenDrawer] = useState(false)


    const drawerClose = () => {
        setOpenDrawer(false)
    };



    const tabsIcon = [
        <NothingIcon style={{ marginRight: '8px' }} name="m01" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m02" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m03" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m04" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m05" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m07" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m08" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m06" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m09" />,

    ]

    const tabslIcon = [
        <NothingIcon style={{ marginRight: '8px' }} name="m01-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m02-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m03-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m04-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m05-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m07-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m08-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m06-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m09-l" />,

    ]


    return (
        <>
            <Box className='header' sx={{ position: 'sticky', top: 0, zIndex: 2, background: React.$theme.background[50] }}>

                <AppBar position="static" color="transparent" elevation={0} sx={{ padding: { xs: '0 7px', md: 0, lg: 0 }, width: '100%', height: "70px", justifyContent: 'center' }}  >
                    <Toolbar>
                        {/* 移动端显示 */}
                        <Box sx={{ flexGrow: 1, height: 70, display: { xs: 'flex', md: 'none', lg: 'none' }, alignItems: 'center', }}
                        >
                            <NothingIcon
                                style={{ cursor: 'pointer', }}
                                onClick={(e) => {
                                    router.push({ pathname: ' /info' });
                                    eventBus.emit('setIndex', 0)
                                    e.stopPropagation()
                                }}
                                name={React.$theme.mode === 'dark' ? "logol" : 'logo'}
                            />
                        </Box>

                        <Box sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}
                            onClick={() => setOpenDrawer(true)}
                        >
                            <IconButton
                                size="small"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ width: '38px', height: '38px', border: `1px solid ${React.$theme.background[200]}`, borderRadius: '4px' }}

                            >
                                <NothingIcon name={React.$theme.mode === 'dark' ? "menu" : "menu-l"} />
                                {/* <img src={React.$theme.mode === 'dark' ? MyMenuIcon : MyMenulIcon} alt="" /> */}
                            </IconButton>
                        </Box>
                        <Drawer
                            anchor="right"
                            open={openDrawer}
                            onClose={drawerClose}
                            sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}
                        >
                            <List onClick={drawerClose} component="nav" aria-label="main mailbox folders" sx={{}} >
                                {routeMap.map((m, i) => {
                                    return (
                                        <NavLink to={m.path} key={i}  >
                                            <ListItemButton
                                                sx={{ color: React.$theme.text[900], }}
                                            >
                                                <ListItemIcon sx={{ minWidth: 38 }}>
                                                    {React.$theme.mode === 'dark' ? tabslIcon[i] : tabsIcon[i]}

                                                </ListItemIcon>
                                                <ListItemText primary={m.title}
                                                    primaryTypographyProps={{ fontSize: 14, mt: 0.2, }}
                                                />
                                            </ListItemButton>
                                        </NavLink>
                                    )
                                })}


                                {/* 默认配置 */}
                                <Divider sx={{ borderColor: React.$theme.background[200], mt: 1.5, mb: 1.5, display: { xs: 'block', md: 'none', lg: 'none' } }} />
                                <ListItemButton
                                    onClick={(e) => { toggleTheme() }}
                                    sx={{ color: React.$theme.text[900] }}

                                >
                                    <ListItemIcon sx={{ minWidth: 38 }}>
                                        <NothingIcon name={React.$theme.mode === 'dark' ? 'dark' : 'light'} />

                                        {/* <img style={{ width: '26px' }} src={React.$theme.mode === 'dark' ? DarkIcon : LightIcon} alt="" />
                                         */}
                                    </ListItemIcon>
                                    <ListItemText primary="切换主题"
                                        primaryTypographyProps={{ fontSize: 14, }}
                                    />
                                </ListItemButton>

                                <ListItemButton
                                    onClick={signOutLogin}
                                    sx={{ color: React.$theme.text[900] }}

                                >
                                    <ListItemIcon sx={{ minWidth: 38 }}>
                                        {/* <img style={{ width: '26px' }} src={React.$theme.mode === 'dark' ? loginoutlIcon : loginoutIcon} alt="" /> */}
                                        <NothingIcon style={{ marginRight: '8px', marginBottom: '3px' }} name={React.$theme.mode === 'dark' ? "loginout-l" : "loginout"} />
                                    </ListItemIcon>
                                    <ListItemText

                                        primary="退出登录"
                                        primaryTypographyProps={{ fontSize: 14, }}
                                    />
                                </ListItemButton>
                            </List>


                        </Drawer>

                        {/* <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '19px' }}>
                            个人中心
                        </Typography> */}
                        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block', lg: 'block' } }}>
                            <Typography color="text.900"> {herderTitle.title}</Typography>
                        </Breadcrumbs>



                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ display: { xs: 'none', md: 'block', lg: 'block' }, width: '38px', height: '38px', border: `1px solid ${React.$theme.background[200]}`, borderRadius: '4px' }}
                            onClick={() => { toggleTheme() }}
                        >
                            <NothingIcon name={React.$theme.mode === 'dark' ? 'dark' : 'light'} />
                        </IconButton>
                        <Box
                            sx={{ display: { xs: 'none', md: 'block', lg: 'block' }, ml: 1, width: '38px', height: '38px', }}
                            onClick={handleClick}>
                            <img className='avatar' src={AvatarIcon} alt="" />
                        </Box>


                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            sx={{ display: { xs: 'none', md: 'block', lg: 'block' }, }}
                        >
                            <MenuItem onClick={signOutLogin} disableRipple

                                sx={{ background: React.$theme.mode === 'dark' ? React.$theme.background[100] : React.$theme.background[50], fontSize: 14 }}
                            >
                                <NothingIcon style={{ marginRight: '8px', marginBottom: '2px' }} name={React.$theme.mode === 'dark' ? "loginout-l" : "loginout"} />
                                {/* <img style={{ marginRight: '8px' }} src={React.$theme.mode === 'dark' ? loginoutlIcon : loginoutIcon} alt="" /> */}
                                退出登录
                            </MenuItem>

                        </StyledMenu>
                    </Toolbar>
                </AppBar>
                <Divider sx={{ borderColor: React.$theme.background[200], display: { xs: 'block', md: 'none', lg: 'none' } }} />
            </Box>
        </>
    )
}

export default Header