import request from '@/utils/request'
import qs from 'qs'

// 查询社会关系
export function getSociety (query) {
    return request({
        url: '/api/consumer/relation/queryByConsumerId',
        method: 'get',
        params: query
    })
}
// 新增社会关系
export function upSociety (data) {
    return request({
        url: '/api/consumer/relation/add',
        method: 'post',
        data: qs.stringify(data)
    })
}
// 修改社会关系
export function chaneSociety (data) {
    return request({
        url: '/api/consumer/relation/update',
        method: 'put',
        data: qs.stringify(data)
    })
}
// 删除社会关系
export function delSociety (data) {
    return request({
        url: '/api/consumer/relation/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}