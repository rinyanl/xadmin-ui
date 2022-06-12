import React, { useContext, useEffect, useState, } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Menu from '@/components/Menu'
import Header from '@/components/Header'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'


import { routeMap } from '@/router'
const { pathname } = location;




const Home = (props) => {
    // const router = useHistory()
    // console.log(router);
    const [herderTitle, setHerderTitle] = useState({})
    const headerVal = { herderTitle, ...props }

    return (
        <>
            <Box sx={{ display: "flex", width: '100%', height: '100%', }}>
                <Menu setHerderTitle={setHerderTitle}></Menu>
                <Container disableGutters sx={{ flex: 1, padding: 0, overflowY: "auto", maxWidth: '100% !important', background: { xs: React.$theme.background[50], md: React.$theme.background[100], lg: React.$theme.background[100], } }}>
                    <Header  {...headerVal}></Header>

                    <Box sx={{ height: 'calc(100% - 70px)' }}>
                        <Switch>
                            {routeMap.map(m => {
                                return m.children.length > 0 ? (
                                    m.children.map(children => {
                                        return (
                                            <Route
                                                exact
                                                key={children.id}
                                                path={children.path}
                                                component={children.component}
                                            />
                                        );
                                    }
                                    )
                                ) : (
                                    <Route
                                        key={m.id}
                                        path={m.path}
                                        component={m.component}
                                    />
                                );
                            })}

                            {pathname === import.meta.env.VITE_ROUTE_LOGIN ? (
                                <Redirect to='/info' />
                            ) : (
                                ''
                            )}


                            <Redirect to='/info' />

                            {/* <Route path={NOT_FIND_URL} component={Empty} />
                                <Redirect to={NOT_FIND_URL} /> */}
                        </Switch>
                    </Box>

                </Container>
            </Box>
        </>
    )
}





export default Home