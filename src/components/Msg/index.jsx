import React, { forwardRef } from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Msg = (props) => {
    return (
        <Snackbar {...props}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            elevation={0}
        >
            <Alert
                elevation={0}
                {...props} sx={{ width: '100%', }}>
                {props.children}
            </Alert>
        </Snackbar>
    )
}

export default Msg