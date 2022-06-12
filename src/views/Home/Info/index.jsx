import React, { useState, useEffect, useRef } from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Grid from '@mui/material/Grid';

import { apiProfitDetail, apiQuerytraffic } from '@/api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { countTraffic } from '@/utils';


import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);




const Info = (props) => {
    const router = useHistory()

    const [time, setTime] = useState('week');
    const [totalPrice, settotalPrice] = useState(0);


    const [traffic, setTraffic] = useState({})
    const getTraffic = async (time) => {
        let params = {}
        const { data: res } = await apiQuerytraffic(params)
        if (res.status === 200) {
            let uplink = 0
            let downlink = 0

            res.data.map(m => {
                uplink += m.totalUplink
                downlink += m.totalDownlink
            })
            setTraffic({
                uplink, downlink, totalTraffic: uplink + downlink
            })
            console.log(uplink);
        }
    }

    const timeChange = (event, newValue) => {
        setTime(newValue)
        getTraffic(newValue)

    }

    const echartsBox = useRef(null)
    const [myChart, setmyChart] = useState({})

    useEffect(() => {
        getTraffic()
        // if (echartsBox.current) {
        //     setmyChart(echarts.init(echartsBox.current))

        // }
    }, [])


    // 初始化
    // const initEcharts = () => {
    //     // 处理数据
    //     let xdata = []
    //     let sdata = []
    //     if (tabData.length > 0) {
    //         tabData.map(m => {
    //             xdata.push(m.createTime.split(' ')[0])
    //             sdata.push(m.payment)
    //         })
    //         // for (let index = 0; index < 70; index++) {
    //         //     xdata.push("2020-05-06")
    //         //     sdata.push(index)
    //         // }

    //     }
    //     if (!myChart.setOption) return
    //     // 绘制图表
    //     myChart.setOption(
    //         {
    //             title: {},
    //             tooltip: {
    //                 trigger: 'axis',
    //                 formatter: (params, i) => {
    //                     return params[0].name + '<br/>' + params[0].marker + ' ' + params[0].data + ' 元'
    //                 },
    //             },

    //             grid: {
    //                 top: '60px',
    //                 left: '0',
    //                 right: '8px',
    //                 bottom: '20px',
    //                 containLabel: true
    //             },
    //             lineStyle: {
    //                 color: React.$theme.text[1000],
    //             },
    //             xAxis: {
    //                 type: 'category',
    //                 data: xdata,
    //                 axisLabel: {
    //                 }
    //             },
    //             yAxis: {
    //                 type: 'value',
    //                 splitLine: {
    //                     lineStyle: {
    //                         color: React.$theme.background[200],
    //                         width: 1,
    //                     }
    //                 }
    //             },
    //             series: [
    //                 {
    //                     type: 'line',
    //                     data: sdata,
    //                     symbolSize: [8, 8],
    //                     itemStyle: {
    //                         color: React.$theme.text[1000]
    //                     },
    //                 }
    //             ]
    //         }
    //     )



    // }

    // 初始化参数
    useEffect(() => {

        // initEcharts()
    }, [React.$theme.mode])



    const topInfoStyle = {
        fontSize: { xs: 13, md: 14, lg: 14 }, mb: 1
    }
    const topInfoHStyle = {
        fontSize: { xs: 22, md: 28, lg: 28 }, fontFamily: 'DIN'
    }

    const noticeStyle = {
        display: 'flex', alignItems: 'center', mb: 1.5, color: React.$theme.text[900],
    }

    const subTextStyle = {
        fontSize: 15, ml: 2, minWidth: 100
    }
    const subBtnStyle = {
        borderRadius: 1.5, minWidth: 60
    }






    // useEffect(() => {
    //     io.on('connect', (socket) => {
    //         console.log('ok', socket);
    //     });

    //     io.on('notice', (data) => {
    //         console.log(data);
    //     });

    //     io.on('disconnect', (socket) => {
    //         console.log('error');
    //     });
    // }, [])

    return (
        <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100% !important', height: '100%', m: 0, p: { xs: 0, md: 3, lg: 3 }, }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4} lg={4}>
                    <Card elevation={0} sx={{ padding: { xs: '5px 0', md: '30px 24px 26px 24px', lg: '30px 24px 26px 24px' }, background: React.$theme.background[50] }}>

                        <Box sx={{ display: 'flex', }}>

                            <Box >
                                <Typography sx={{ ...topInfoStyle }} color="text.600" >
                                    总计（uplink + downlink）
                                </Typography>
                                <Typography sx={{ ...topInfoHStyle }} variant="h5" component="div" color="text.900">
                                    {countTraffic(traffic.totalTraffic)}
                                </Typography>
                            </Box>
                        </Box>


                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>

                    <Card elevation={0} sx={{ padding: { xs: '5px 0', md: '30px 24px 26px 24px', lg: '30px 24px 26px 24px' }, background: React.$theme.background[50] }}>

                        <Box sx={{ display: 'flex', }}>

                            <Box >
                                <Typography sx={{ ...topInfoStyle }} color="text.600" >
                                    上行（uplink）
                                </Typography>
                                <Typography sx={{ ...topInfoHStyle }} variant="h5" component="div" color="text.900">
                                    {countTraffic(traffic.uplink)}
                                </Typography>
                            </Box>
                        </Box>


                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Card elevation={0} sx={{ padding: { xs: '5px 0', md: '30px 24px 26px 24px', lg: '30px 24px 26px 24px' }, background: React.$theme.background[50] }}>
                        <Box sx={{ display: 'flex', }}>
                            <Box >
                                <Typography sx={{ ...topInfoStyle }} color="text.600" >
                                    下载（downlink）
                                </Typography>
                                <Typography sx={{ ...topInfoHStyle }} variant="h5" component="div" color="text.900">
                                    {countTraffic(traffic.downlink)}
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>


            </Grid>
            <Box sx={{ height: '100%', }}>
                <Card className='buycard' sx={{
                    height: '100%',
                    padding: { xs: '35px 24px 0', md: '20px 24px 40px', lg: '20px 24px 40px', },
                    background: React.$theme.background[50]
                }}
                    elevation={0}
                >
                    <Typography variant="h6" sx={{ mb: 1.5 }} color="text.900">
                        流量统计
                    </Typography>
                    <Typography sx={{ fontSize: 14, mb: 3.5 }} variant="p" component="div" color="text.600">
                        总流量使用明细、每天零点更新当日使用情况
                    </Typography>


                    {/* <Box Box ref={echartsBox} sx={{
                        width: '100%',
                        height: {
                            xs: '390px',
                            md: 'calc(100% - 80px)',
                            lg: 'calc(100% - 80px)',
                        },
                    }
                    }></Box > */}
                </Card>
            </Box>

        </Container >
    )
}

export default Info