import { useState, useMemo, useEffect } from 'react'

import cookie from 'react-cookies'
import Themeconf from '@/router/Themeconf'
import eventBus from '@/utils/eventBus'
function App() {
  const getStatus = () => {
    const userToken = cookie.load('userToken')
    const userId = cookie.load('userId')
    // console.log('赋初始状态', UserToken, UserId);
    if (userId && userToken) {
      return true
    } else {
      return false
    }
  }

  const [isLogin, setIsLogin] = useState(getStatus())


  useEffect(() => {
    eventBus.on('LoginTimeout', (val) => {
      setIsLogin(val)
    });//监听事件总线
  }, []);





  return (
    <div className="App" >
      <Themeconf isLogin={isLogin} setIsLogin={setIsLogin}> </Themeconf>
    </div >
  )
}

export default App
