import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Switch, Router } from 'react-router-dom'

import 'nprogress/nprogress.css'  //顶部进度条样式
// 初始化 
import '@/styles/index.less'

// import 'default-passive-events'; // google 一堆报错

// console.log = () => { }

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
)
