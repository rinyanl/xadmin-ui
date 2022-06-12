import React, { useState, useMemo, useEffect } from 'react'
import LoginAuth from '@/router/LoginAuth'

// 主题配置
import { themeText, themeBg } from './theme.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Themeconf = (props) => {

    // 主题配置

    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDark, setTheme] = useState(localStorage.theme || 'light')
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDark,
                    text: themeText(isDark),
                    background: themeBg(isDark),
                    // primary: {
                    //     contrastText: '#fff',
                    //     dark: "#1565c0",
                    //     light: "#4098f2",
                    //     main: "#1976d2"
                    // }
                    primary: {
                        main: '#3175ED',
                        // main: '#4f6de6',
                        darker: '#3175ED',
                        light: "#FFFFFF",
                        dark: "#2B67D1",
                    },
                    success: {
                        main: '#52CC55',
                        darker: '#52CC55',
                        light: "#FFFFFF",
                        dark: "#4BCCA4",
                    },
                    error: {
                        main: '#FA4D4B',
                        darker: '#FA4D4B',
                        light: "#FFFFFF",
                        dark: "#DB6365",
                    },
                    info: {
                        main: '#3297FA',
                        darker: '#3297FA',
                        light: "#FFFFFF",
                        dark: "#DB6365",
                    },
                    warning: {
                        main: '#EC9046',
                        darker: '#EC9046',
                        light: "#FFFFFF",
                        dark: "#D98440",
                    }
                },
            }),
        [isDark],
    )

    // console.log(theme);

    React.$theme = theme.palette

    useEffect((props) => {
        localStorage.theme = isDark
    }, [isDark])

    useEffect(() => {

    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <LoginAuth  {...props} isDark={isDark} setTheme={setTheme} />
                {props.children}
            </ThemeProvider>
        </>
    )
}

export default Themeconf