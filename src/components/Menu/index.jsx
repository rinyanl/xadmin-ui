import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import ListSubheader from '@mui/material/ListSubheader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import NothingIcon from '@/assets/icons/NothingIcon'
import { routeMap } from '@/router'
import './index.less'

function LinkTab(props) {
    return (
        <NavLink to={props.path}>
            < Tab
                component="div"
                {...props}
            />
        </NavLink>

    );
}

import eventBus from '@/utils/eventBus'


const Menu = (props) => {
    const { pathname } = location;
    const router = useHistory()
    const { setHerderTitle } = props;



    const getSelectId = () => {

        let id, title, isSecond, title2;
        routeMap.map(m => {
            if (m.path === pathname || m.path === "/" + pathname.split('/')[1]) {
                id = m.id
                title = m.title
            }
        })

        return { id, title }
    }



    const [selectedIndex, setSelectedIndex] = useState(getSelectId().id || 0);

    const selecthandleChange = (event, newValue) => {
        setSelectedIndex(newValue);
    };

    useEffect(() => {
        eventBus.on('setIndex', (val) => {
            setSelectedIndex(val)
        });//监听事件总线
        return () => {
            eventBus.removeListener('setIndex', () => { });//移出事件总线
        }
    }, []);
    useEffect(() => {
        setHerderTitle(getSelectId())
    }, [selectedIndex])



    const countTop = () => {
        if (selectedIndex == 0) {
            return `${46 + 1}px !important`
        }
        if (selectedIndex == 3) {
            return `${46 * 5 + 4}px !important`
        }
    }

    const tabsIcon = [
        <NothingIcon style={{ marginRight: '8px' }} name="m01" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m02" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m03" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m04" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m09" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m05" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m07" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m08" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m06" />,

    ]

    const tabslIcon = [
        <NothingIcon style={{ marginRight: '8px' }} name="m01-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m02-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m03-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m04-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m09-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m05-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m07-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m08-l" />,
        <NothingIcon style={{ marginRight: '8px' }} name="m06-l" />,

    ]

    return (
        <Box sx={{ background: React.$theme.background[50], minWidth: 260, height: '100%', display: { xs: 'none', md: 'block', lg: 'block' } }}>
            <Box sx={{ mb: 1.8, color: 'red', display: 'flex', alignItems: 'center', }}>
                <AppBar position="static" sx={{ background: React.$theme.background[50], flex: 1 }} elevation={0}   >
                    <Box sx={{ height: 70, display: 'flex', alignItems: 'center', pl: 3 }}
                    >
                        <NothingIcon
                            style={{ cursor: 'pointer', }}
                            onClick={(e) => {
                                router.push({ pathname: ' /info' });
                                e.stopPropagation();
                                eventBus.emit('setIndex', 0)
                            }}
                            name={React.$theme.mode === 'dark' ? "logol" : 'logo'} />
                    </Box>

                    {/* <Divider sx={{ borderColor: '#e7ebf0' }} /> */}
                </AppBar>
                <Box sx={{ width: '1px', height: '22px', background: React.$theme.background[200] }}></Box>
            </Box>
            <Box className='munulist' sx={{ height: '100%', background: React.$theme.background[50] }}>

                <Tabs value={selectedIndex} orientation="vertical" onChange={selecthandleChange} aria-label="nav tabs example"

                >
                    {routeMap.map((m, i) => {
                        return (
                            <LinkTab
                                sx={{ padding: '0 20px', width: '100%', color: React.$theme.text[900], lineHeight: '8px', fontWeight: 400, minHeight: '46px', justifyContent: 'flex-start' }}
                                icon={React.$theme.mode === 'dark' ? tabslIcon[i] : tabsIcon[i]}
                                iconPosition="start"
                                key={m.id}
                                label={m.title}
                                path={m.path}
                                current={i}
                            />
                        )
                    })}
                </Tabs>





            </Box>
        </Box >

    )
}

export default Menu