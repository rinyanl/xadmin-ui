import React, { useState, useEffect, Fragment } from 'react'

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Grid from '@mui/material/Grid';

import { formatJson } from '@/utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { apiSavexaryconf, apiXaryconf, apiRunningStatus, apiRestartxary, apiRestartnginx, apiRestartmongo } from '@/api'

import copy from 'copy-to-clipboard';
import Toast from '@/components/Toast';

const Config = (props) => {

    const [config, setConfig] = useState("")
    const [runningStat, setRunningStat] = useState({
        mongo: null,
        nginx: null,
        xary: null
    })

    const getConfig = async () => {
        let params = {}
        const { data: res } = await apiXaryconf(params)
        if (res.status === 200) {
            setConfig(formatJson(res.data))
        }
    }

    const getRunningStat = async () => {
        let params = {}
        const { data: res } = await apiRunningStatus(params)
        if (res.status === 200) {
            setRunningStat(res.data)
        }
    }

    useEffect(() => {
        getConfig()
        getRunningStat()
    }, [])

    const Restartxary = async () => {
        let params = {}
        const { data: res } = await apiRestartxary(params)
        if (res.status === 200) {
            Toast.success(res.msg)
            return
        }
        Toast.error(res.msg)
    }

    const Restartnginx = async () => {
        let params = {}
        const { data: res } = await apiRestartnginx(params)
        if (res.status === 200) {
            Toast.success(res.msg)
            return
        }
        Toast.error(res.msg)
    }

    const Restartmongo = async () => {
        let params = {}
        const { data: res } = await apiRestartmongo(params)
        if (res.status === 200) {
            Toast.success(res.msg)
            return
        }
        Toast.error(res.msg)
    }

    const SaveXaryConf = async () => {
        let params = {
            config: config.trim()
        }
        const { data: res } = await apiSavexaryconf(params)
        if (res.status === 200) {
            console.log(res);
            getConfig()
            Toast.success("保存配置成功")
        }
    }

    const topInfoStyle = {
        fontSize: { xs: 13, md: 14, lg: 14 }, mt: 1
    }

    const topInfoHStyle = {
        fontSize: { xs: 22, md: 24, lg: 24 }, fontFamily: 'DIN',
    }

    const tips = (
        <Fragment>
            重启失败的原因可能有以下几种 <br />
            1: 服务器该服务没安装 <br />
            2: 该服务的配置出了问题<br />
            3: 收到了其他程序的影响、如端口占用
        </Fragment>
    )

    return (
        <Container disableGutters sx={{ maxWidth: '100% !important', m: 0, p: { xs: 0, md: 3, lg: 3 }, }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4} lg={4}>
                    <Card elevation={0} sx={{ padding: { xs: '5px 0', md: '26px 24px 26px 24px', lg: '26px 24px 26px 24px' }, background: React.$theme.background[50] }}>
                        <Box >
                            <Typography sx={{ ...topInfoHStyle }} variant="h5" component="div" color="text.900">
                                Xary
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ ...topInfoStyle }} color="text.700" >
                                    <span>当前状态：</span>
                                    <span style={{ color: runningStat.xary ? React.$theme.success.main : React.$theme.error.main }}>
                                        {runningStat.xary ? '正常' : '异常'}
                                    </span>
                                </Typography>
                                <Tooltip title={tips}>
                                    <Typography
                                        sx={{ ...topInfoStyle, cursor: 'pointer' }}
                                        color="text.1000"
                                        onClick={() => { Restartxary() }}
                                    >
                                        一键重启
                                    </Typography>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Card elevation={0} sx={{ padding: { xs: '5px 0', md: '26px 24px 26px 24px', lg: '26px 24px 26px 24px' }, background: React.$theme.background[50] }}>
                        <Box >
                            <Typography sx={{ ...topInfoHStyle }} variant="h5" component="div" color="text.900">
                                Mongo
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ ...topInfoStyle }} color="text.700" >
                                    <span>当前状态：</span>
                                    <span style={{ color: runningStat.mongo ? React.$theme.success.main : React.$theme.error.main }}>
                                        {runningStat.mongo ? '正常' : '异常'}
                                    </span>
                                </Typography>
                                <Tooltip title={tips}>
                                    <Typography
                                        sx={{ ...topInfoStyle, cursor: 'pointer' }}
                                        color="text.1000"
                                        onClick={() => { Restartmongo() }}
                                    >
                                        一键重启
                                    </Typography>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Card elevation={0} sx={{ padding: { xs: '5px 0', md: '26px 24px 26px 24px', lg: '26px 24px 26px 24px' }, background: React.$theme.background[50] }}>
                        <Box >
                            <Typography sx={{ ...topInfoHStyle }} variant="h5" component="div" color="text.900">
                                Nginx
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ ...topInfoStyle }} color="text.700" >
                                    <span>当前状态：</span>
                                    <span style={{ color: runningStat.nginx ? React.$theme.success.main : React.$theme.error.main }}>
                                        {runningStat.nginx ? '正常' : '异常'}
                                    </span>
                                </Typography>
                                <Tooltip title={tips}>
                                    <Typography sx={{ ...topInfoStyle, cursor: 'pointer' }} color="text.1000"
                                        onClick={() => { Restartnginx() }}
                                    >
                                        一键重启
                                    </Typography>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Box>
                <Card className='buycard' sx={{
                    padding: { xs: '35px 24px 0', md: '20px 24px 40px', lg: '20px 24px 40px', },
                    background: React.$theme.background[50]
                }}
                    elevation={0}
                >
                    <Typography variant="h6" sx={{ mb: 1 }} color="text.900">
                        配置文件
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 3 }} variant="p" component="div" color="text.600">
                        建议复制到专业的编辑软件进行调整、如 vscode 中、避免出错导致无法运行
                    </Typography>
                    <Box sx={{ mb: 3.5, }}>
                        <Button
                            sx={{ mr: 2 }}
                            size="large"
                            disableElevation
                            variant="contained"
                            onClick={() => {
                                copy(config)
                                Toast.success(`复制成功`)
                            }
                            }
                        >
                            复制
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ color: "#fafafa" }}
                            size="large"
                            disableElevation
                            color='warning'
                            onClick={() =>
                                SaveXaryConf()
                            }
                        >
                            保存更改
                        </Button>
                    </Box>

                    <Box sx={{
                        overflowX: 'auto',
                    }}>
                        <Box sx={{
                            'textarea': {
                                padding: '10px 13px',
                                boxSizing: 'border-box',
                                width: '100%', resize: 'none', background: 'none',
                                borderRadius: '4px',
                                fontSize: 15,
                                borderColor: React.$theme.background[300],
                                outlineColor: React.$theme.text[1000],
                                color: React.$theme.text[900]
                            }

                        }}>
                            <TextareaAutosize
                                aria-label="asdas"
                                placeholder="在此处粘贴你的配置"
                                style={{}}
                                value={config}
                                onChange={(e) => setConfig(e.target.value)}
                            />
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container >
    )
}

export default Config