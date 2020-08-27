import request from '@/utils/request'
import qs from 'qs'

// 查询子女信息
export function getChildren (query) {
    return request({
        url: '/api/consumer/children/queryByConsumerId',
        method: 'get',
        params: query
    })
}
// 新增子女信息
export function upChildren (data) {
    return request({
        url: '/api/consumer/children/add',
        method: 'post',
        data: qs.stringify(data)
    })
}
// 修改子女信息
export function chaneChildren (data) {
    return request({
        url: '/api/consumer/children/update',
        method: 'put',
        data: qs.stringify(data)
    })
}
// 删除子女信息
export function delChildren (data) {
    return request({
        url: '/api/consumer/children/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}