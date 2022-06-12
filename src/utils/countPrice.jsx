
export const countPrice = (cardTime, discount) => {
    switch (cardTime) {
        case "week":
            let week = 3.5 - (discount || 0)
            if (week > 0.01) {
                return week
            }
            return 0.01
        case "month":
            let month = 12 - (discount || 0)
            if (month > 0.01) {
                return month
            }
            return 0.01

        case "season":
            let season = 36 - (discount || 0)
            if (season > 0.01) {
                return season
            }
            return 0.01
        case "year":
            let year = 142 - (discount || 0)
            if (year > 0.01) {
                return year
            }
            return 0.01
        default:
            return 9999
    }
}

export const countTime = (cardTime) => {
    switch (cardTime) {
        case 'week':
            return 7;

        case 'month':

            return 30;
        case 'season':

            return 90;
        case 'year':

            return 365;
        default:
            return 0
    }
}



export const countInfo = (cardTime) => {
    switch (cardTime) {
        case 'week':
            return ['共计 25G 流量', '支持 3 台设备同时使用', '峰值可达 60MB 速率', '套餐时长 7 天', '流媒体尽力而为', '到期自动清零', '支持 Trojan 加密协议']
        case 'month':
            return ['每月 120G 流量', '支持 3 台设备同时使用', '峰值可达 60MB 速率', '套餐时长 30 天', '流媒体尽力而为', '每月订单日重置流量', '支持 Trojan 加密协议']
        case 'season':
            return ['一次性到账 360G 流量', '支持 3 台设备同时使用', '峰值可达 60MB 速率', '套餐时长 90 天', '流媒体尽力而为', '每月订单日重置流量', '支持 Trojan 加密协议']

        // case 'year':
        // return ['一次性到账 3840G 流量', '支持 3 台设备同时使用', '峰值可达 50MB 速率', '套餐时长 365 天', '流媒体部分解锁', '每月订单日重置流量', '支持 Trojan 加密协议']

    }
}
