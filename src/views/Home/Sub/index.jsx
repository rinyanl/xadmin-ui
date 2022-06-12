import React, { useState, useEffect, useRef } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import TableHead from '@mui/material/TableHead';

import OutlinedInput from '@mui/material/OutlinedInput';


import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import MyDialog from '@/components/MyDialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Toast from '@/components/Toast';

import cookie from 'react-cookies'
import { apiEditClashRule, apiDelClashRule, apiRemoveCode, apiClashRulelist, apiCreateClashRule, apiResetAllSub } from '@/api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { TramRounded } from '@mui/icons-material';

const Sub = (props) => {
    const router = useHistory()

    // 获取订单列表
    const [tabData, setTabData] = useState({
        data: [],
        total: 0
    })

    const getClashRulelist = async () => {
        let params = {}
        const { data: res } = await apiClashRulelist(params)
        if (res.status === 200) {
            setTabData(res)
            console.log(tabData);
        }
    }

    useEffect(() => {
        getClashRulelist()
    }, [])



    const pageChange = (event, newPage) => {
        setPage(newPage);
        getClashRulelist(newPage)
    };







    // 添加规则
    const [createMydialog, setCreateMydialog] = useState(false);

    const [name, setName] = useState('');
    const [server, setServer] = useState('');
    const [port, setPort] = useState('');

    const createMydialogClose = (event) => {
        setCreateMydialog(false)
        setName('')
        setServer('')
        setPort('')
    };

    // 新增clash规则
    const createClash = async () => {
        if (name.trim().length <= 0 || server.trim().length <= 0 || port.trim().length <= 0) {
            Toast.error("请先输入内容")
            return
        }


        let params = {
            name: name.trim(),
            server: server.trim(),
            port: parseInt(port)
        }
        const { data: res } = await apiCreateClashRule(params)
        if (res.status === 200) {
            getClashRulelist(0)
            createMydialogClose()



            Toast.success("新增规则成功")
            return
        }

        Toast.error(res.msg)

    }



    // 编辑规则
    const [clashid, setClashid] = useState('');

    const [editMydialog, seteditMydialog] = useState(false);
    const editMydialogClose = (event) => {
        seteditMydialog(false)
        setName('')
        setServer('')
        setPort('')
    };

    // 预填充
    const setEditCont = (n, s, p, id) => {
        setName(n)
        setServer(s)
        setPort(p)
        setClashid(id)
        seteditMydialog(true)
    };

    // 确定编辑
    const confirmEdit = async () => {
        if (name.trim().length <= 0 || server.trim().length <= 0 || port.length <= 0) {
            Toast.error("请先输入内容")
            return
        }

        let params = {
            _id: clashid,
            name: name.trim(),
            server: server.trim(),
            port: parseInt(port)
        }

        const { data: res } = await apiEditClashRule(params)
        if (res.status === 200) {
            getClashRulelist(0)
            editMydialogClose()

            Toast.success("修改规则成功")
            return
        }

        Toast.error(res.msg)

    }




    const [openMydialog, setOpenMydialog] = useState(false);

    const MyDialogClose = (event) => {
        setOpenMydialog(false)
    };

    // 删除规则
    const removeCode = async () => {
        let params = {
            _id: clashid,
        }
        const { data: res } = await apiDelClashRule(params)
        if (res.status === 200) {
            getClashRulelist()
            MyDialogClose()
            setClashid('')
            Toast.success("删除成功")
            return
        }
        Toast.error(res.msg)

    };

    const [tabval, setTabval] = React.useState('clash');

    const tabvalChange = (event, newValue) => {
        setTabval(newValue);
    };



    // 重置所有用户订阅

    const [resetMydialog, setResetMydialog] = useState(false);
    const resetMyDialogClose = (event) => {
        setResetMydialog(false)
    };
    const resetAllSub = async () => {
        let params = {}
        const { data: res } = await apiResetAllSub(params)
        if (res.status === 200) {
            resetMyDialogClose()
            Toast.success("重置成功")
            return
        }
        Toast.error(res.msg)
    }

    return (
        <Container disableGutters sx={{ maxWidth: '100% !important', m: 0, p: { xs: 0, md: 3, lg: 3 }, }}>

            <Box>
                <Card className='buycard' sx={{

                    padding: { xs: '35px 24px 0', md: '20px 24px 40px', lg: '20px 24px 40px', },
                    background: React.$theme.background[50]
                }}
                    elevation={0}
                >
                    <Typography variant="h6" sx={{ mb: 1 }} color="text.900">
                        订阅管理
                    </Typography>
                    {/* <Typography sx={{ fontSize: 13, mb: 2 }} variant="p" component="div" color="text.600">
                        下载的订阅、没做和代理服务器的同步方便管理、请先在代理服务器制作好入站及开放好对应端口后编辑、此处域名的解析到服务器管理的对应 ip
                    </Typography> */}
                    <TabContext value={tabval}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Tabs value={tabval} onChange={tabvalChange} aria-label="basic tabs example">
                                <Tab label="所有订阅文件" value="clash" />
                            </Tabs>
                            <Box>
                                {/* <Button
                                    variant="contained"
                                    color="warning"
                                    size="large"
                                    disableElevation
                                    sx={{ mr: 2, color: "#fff" }}
                                    onClick={() => setResetMydialog(TramRounded)}
                                >
                                    重置订阅文件
                                </Button> */}
                                <Button
                                    variant="contained"
                                    disableElevation
                                    size="large"
                                    onClick={() => setCreateMydialog(true)}
                                >
                                    添加规则
                                </Button>
                            </Box>


                        </Box>
                        <TabPanel value="clash" sx={{ p: 0, pt: 3 }}>

                            <Box sx={{
                                overflowX: 'auto',
                            }}>
                                {tabData.total <= 0 ?
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Divider sx={{ borderColor: React.$theme.background[200], mb: 0.5, }} />
                                        <Box sx={{ mt: 3 }}>
                                            暂无数据
                                        </Box>
                                    </Box>


                                    :
                                    <Table sx={{
                                        // overflowX: 'scroll',
                                        '.MuiTableCell-root': {
                                            borderColor: React.$theme.background[200],
                                        },
                                    }}
                                    >
                                        <TableHead >
                                            <TableRow >
                                                <TableCell sx={{ minWidth: 120 }}>节点名称</TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>服务器</TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>端口</TableCell>
                                                <TableCell sx={{ minWidth: 120 }}>类型</TableCell>
                                                <TableCell align='right' sx={{ minWidth: { xs: 160 } }}>操作</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                tabData.data.map((m, i) => {
                                                    return (
                                                        <TableRow hover key={m._id}>
                                                            <TableCell >{m.name}</TableCell>
                                                            <TableCell >{m.server}</TableCell>
                                                            <TableCell >{m.port}</TableCell>
                                                            <TableCell >trojan</TableCell>
                                                            <TableCell align='right' >

                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{ mr: 2 }}
                                                                    disableElevation

                                                                    onClick={() => setEditCont(m.name, m.server, m.port, m._id)}
                                                                >

                                                                    编辑
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    disableElevation
                                                                    onClick={() => {
                                                                        setClashid(m._id)
                                                                        setOpenMydialog(true)
                                                                    }}

                                                                >
                                                                    删除
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })

                                            }


                                        </TableBody>
                                    </Table>
                                }

                            </Box>
                        </TabPanel>
                    </TabContext>
                </Card>
            </Box>

            {/* 新增规则 */}
            <MyDialog onClose={createMydialogClose} open={createMydialog} maxWidth="sm" sx={{
                '.MuiPaper-root': {
                    margin: { xs: 3 },
                    width: { xs: '100%' }
                }
            }}  >
                <Box
                    sx={{ padding: { xs: '', md: '10px 0', lg: '10px 0' }, background: React.$theme.background[50], fontSize: '20px', }}
                >
                    <DialogTitle id="alert-dialog-title"
                        sx={{ pb: 0 }}
                    >
                        添加clash规则
                    </DialogTitle>
                    <Box sx={{}}>

                        <DialogContent sx={{ pt: { xs: 1, md: 3, lg: 3 }, pb: 0 }}>
                            <Box>
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px ', mb: 2, height: 42, verticalAlign: 'middle' }}
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </Box>
                            <Box>
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px ', mb: 2, height: 42, verticalAlign: 'middle' }}
                                    placeholder='Server'
                                    value={server}
                                    onChange={(e) => setServer(e.target.value)}

                                />
                            </Box>
                            <Box>
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px ', mb: 2, height: 42, verticalAlign: 'middle' }}
                                    placeholder='Port'
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}

                                />
                            </Box>


                        </DialogContent>
                        <DialogActions >
                            <Button onClick={createMydialogClose} >取消</Button>
                            <Button onClick={createClash} autoFocus>
                                确定
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </MyDialog >


            {/* 编辑规则 */}
            <MyDialog onClose={editMydialogClose} open={editMydialog} maxWidth="sm" sx={{
                '.MuiPaper-root': {
                    margin: { xs: 3 },
                    width: { xs: '100%' }
                }
            }}  >
                <Box
                    sx={{ padding: { xs: '', md: '10px 0', lg: '10px 0' }, background: React.$theme.background[50], fontSize: '20px', }}
                >
                    <DialogTitle id="alert-dialog-title"
                        sx={{ pb: 0 }}
                    >
                        编辑clash规则
                    </DialogTitle>
                    <Box sx={{}}>

                        <DialogContent sx={{ pt: { xs: 1, md: 3, lg: 3 }, pb: 0 }}>
                            <Box>
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px ', mb: 2, height: 42, verticalAlign: 'middle' }}
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </Box>
                            <Box>
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px ', mb: 2, height: 42, verticalAlign: 'middle' }}
                                    placeholder='Server'
                                    value={server}
                                    onChange={(e) => setServer(e.target.value)}

                                />
                            </Box>
                            <Box>
                                <OutlinedInput
                                    sx={{ width: "100%", fontSize: '15px ', mb: 2, height: 42, verticalAlign: 'middle' }}
                                    placeholder='Port'
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}

                                />
                            </Box>


                        </DialogContent>
                        <DialogActions >
                            <Button onClick={editMydialogClose} >取消</Button>
                            <Button onClick={confirmEdit} autoFocus>
                                确定
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </MyDialog >


            {/* 是否确定 */}
            <MyDialog onClose={MyDialogClose} open={openMydialog} maxWidth="sm" sx={{
                '.MuiPaper-root': {
                    margin: { xs: 3 },
                    width: { xs: '100%' }
                }
            }}  >
                <Box
                    sx={{ padding: { xs: '', md: '10px 0', lg: '10px 0' }, background: React.$theme.background[50], fontSize: '20px', }}
                >
                    <DialogTitle id="alert-dialog-title" sx={{
                        pb: 0
                    }}>确定删除？</DialogTitle>
                    <Box sx={{}}>

                        <DialogContent sx={{ pt: { xs: 1, md: 1.3, lg: 1.3 }, pb: 0 }}>
                            <DialogContentText id="alert-dialog-description">
                                删除后、新用户或重置订阅生成的订阅文件、将没有该节点
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions >

                            {/* <Button
                            onClick={MyDialogClose}
                            sx={{ mr: 1 }}
                            disableElevation
                            variant="outlined"  >取消
                        </Button>
                        <Button
                            onClick={resetSub}
                            disableElevation variant="contained"
                        >
                            确定
                        </Button> */}
                            <Button onClick={MyDialogClose} >取消</Button>
                            <Button onClick={removeCode} autoFocus>
                                确定
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </MyDialog >


            {/* 是否确定重置 */}
            <MyDialog onClose={resetMyDialogClose} open={resetMydialog} maxWidth="sm" sx={{
                '.MuiPaper-root': {
                    margin: { xs: 3 },
                    width: { xs: '100%' }
                }
            }}  >
                <Box
                    sx={{ padding: { xs: '', md: '10px 0', lg: '10px 0' }, background: React.$theme.background[50], fontSize: '20px', }}
                >
                    <DialogTitle id="alert-dialog-title" sx={{
                        pb: 0
                    }}>确定重置？</DialogTitle>
                    <Box sx={{}}>

                        <DialogContent sx={{ pt: { xs: 1, md: 1.3, lg: 1.3 }, pb: 0 }}>
                            <DialogContentText id="alert-dialog-description">
                                该操作一般在代理服务器有重大更新后、强制所有用户更新订阅的时候执行
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions >

                            <Button onClick={resetMyDialogClose} >取消</Button>
                            <Button onClick={resetAllSub} autoFocus>
                                确定
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </MyDialog >
        </Container >
    )
}


export default Sub