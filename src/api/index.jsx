
import { $http } from './config.jsx'


// 获取用户列表
export const apiUserlist = (data) => $http({ url: '/api/userlist', method: 'get', data })

// 获取入站列表
export const apiInboundlist = (data) => $http({ url: '/api/inboundlist', method: 'get', data })

// 获取配置文件
export const apiXaryconf = (data) => $http({ url: '/api/xaryconf', method: 'get', data })

//  保存配置文件
export const apiSavexaryconf = (data) => $http({ url: '/api/savexaryconf', method: 'get', data })

// 获取运行状态
export const apiRunningStatus = (data) => $http({ url: '/api/runningstatus', method: 'get', data })

// 重启 xary
export const apiRestartxary = (data) => $http({ url: '/api/restartxary', method: 'get', data })

// 重启 nginx
export const apiRestartnginx = (data) => $http({ url: '/api/restartnginx', method: 'get', data })

// 重启 mongo
export const apiRestartmongo = (data) => $http({ url: '/api/restartmongo', method: 'get', data })

// 获取流量信息
export const apiQuerytraffic = (data) => $http({ url: '/api/querytraffic', method: 'get', data })

// 创建 clash 规则
export const apiCreateClashRule = (data) => $http({ url: '/api/createclashrule', method: 'post', data })

// 获取 clash 规则列表
export const apiClashRulelist = (data) => $http({ url: '/api/clashrulelist', method: 'get', data })

// 删除 clash 规则列表
export const apiDelClashRule = (data) => $http({ url: '/api/delclashrule', method: 'get', data })


// 编辑 clash 规则
export const apiEditClashRule = (data) => $http({ url: '/api/editclashrule', method: 'post', data })


// 登录到后台管理系统
export const adminLogin = (data) => $http({ url: '/api/login', method: 'get', data })




// 编辑用户
export const apiEditUser = (data) => $http({ url: '/admin/edituser', method: 'post', data })

// 删除用户
export const apiRemoveUser = (data) => $http({ url: '/admin/removeuser', method: 'get', data })

// 获取管理员用户列表
export const adminAdUserlist = (data) => $http({ url: '/admin/adminuserlist', method: 'get', data })

// 获取订单列表
export const adminOrderlist = (data) => $http({ url: '/admin/orderlist', method: 'get', data })

// 获取邀请列表
export const adminInviteslist = (data) => $http({ url: '/admin/inviteslist', method: 'get', data })

// 编辑邀请
export const EditInvites = (data) => $http({ url: '/admin/editinvit', method: 'post', data })

// 获取会员列表
export const adminVipslist = (data) => $http({ url: '/admin/vipslist', method: 'get', data })

// 获取会员列表
export const adminCodesList = (data) => $http({ url: '/admin/codeslist', method: 'get', data })

// 编辑会员
export const EditEditvip = (data) => $http({ url: '/admin/editvip', method: 'post', data })


// 编辑订单
export const adminEditOrder = (data) => $http({ url: '/admin/editorder', method: 'post', data })


// 创建优惠码
export const apiCreateNewCode = (data) => $http({ url: '/admin/createnewcode', method: 'post', data })

// 删除优惠码
export const apiRemoveCode = (data) => $http({ url: '/admin/removecode', method: 'get', data })

// 获取收益列表
export const apiProfitDetail = (data) => $http({ url: '/admin/profitdetail', method: 'get', data })

// 创建服务器
export const apiCreateServer = (data) => $http({ url: '/admin/createserver', method: 'post', data })

// 创建管理员
export const adminCreateAdminUser = (data) => $http({ url: '/admin/createadminuser', method: 'post', data })

// 删除管理员
export const adminRemoveAdmin = (data) => $http({ url: '/admin/removeadmin', method: 'get', data })

// 编辑管理员
export const adminEditAdmin = (data) => $http({ url: '/admin/editadmin', method: 'post', data })

// 编辑服务器
export const apiEditServer = (data) => $http({ url: '/admin/editserver', method: 'post', data })

// 获取服务器列表
export const apiServerlist = (data) => $http({ url: '/admin/serverslist', method: 'get', data })

// 获取服务器列表
export const apiRemoveServer = (data) => $http({ url: '/admin/removeserver', method: 'get', data })

// 获取 VPS 运行状态
export const apiServerStatus = (data) => $http({ url: '/admin/serverstatus', method: 'get', data })




// 重置所有用户的订阅
export const apiResetAllSub = (data) => $http({ url: '/admin/resetallsub', method: 'get', data })
