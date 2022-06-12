import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import './index.less'
const MyDialog = (props) => {
    // let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    // const slots = MyDialog.reduce((slots, item) => {
    //     slots[item.props.slot] = item
    //     return slots
    // }, {})

    return (
        <Dialog className='dialog' fullWidth={true} {...props}  >

            {props.children}
        </Dialog >
    )
}

export default MyDialog