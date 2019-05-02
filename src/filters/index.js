// 全局过滤器
//时间格式化
const dateFormat = value => {
    return new Date(value).format('yyyy-MM-dd hh:mm:ss')
}
export {
    dateFormat
}