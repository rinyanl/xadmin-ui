import React, { forwardRef, useEffect, useRef, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


import ReactDOM from "react-dom";


const div = document.createElement("div");
document.body.appendChild(div);

function notice(args) {
    return ReactDOM.render(<Message {...args} />, div);
}

function Message(props) {
    const { msg, type, isShow } = props
    const time = useRef(null)
    const [open, setOpen] = useState(true)

    // useEffect(() => {
    //     setOpen(true)
    // })

    // 反正有bug 后面在修复
    useEffect(() => {
        if (open) {
            time.current = setTimeout(() => {
                setOpen(false)
            }, 1000)
        }
        return () => {
            clearTimeout(time.current)
            time.current = null;
        }
    }, [open == true])

    useEffect(() => {
        setOpen(true)
    }, [!time.current])


    const setColor = (type) => {
        console.log(React.$theme[type]);
        return React.$theme[type].main
    }



    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                elevation={0}
                sx={{ top: '34px !important', display: { xs: 'none', md: 'block', lg: 'block' }, }}
            >
                <Alert
                    elevation={0}
                    severity={type}
                    sx={{
                        width: '100%', background: React.$theme[type].main,
                    }}>
                    {msg}
                </Alert>
            </Snackbar>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                elevation={0}
                // left: '50%', transform: 'translateX(-50%)', bottom: 30,width: 'calc(100% - 50px)', 
                sx={{ m: 2, display: { xs: 'block', md: 'none', lg: 'none' }, }}
            >
                <Alert
                    elevation={0}
                    severity={type}
                    sx={{
                        width: '100%', background: React.$theme[type].main,
                    }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}

let api = {};

["info", "success", "warning", "error"].forEach((type) => {
    api[type] = (msg) => {
        return notice({ msg, type, isShow: true });
    };
});

export default api;
