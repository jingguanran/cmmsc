import request from '@/utils/request'
import qs from 'qs'

// 查询工作经历
export function getUserData (query) {
    return request({
        url: '/api/consumer/work/queryByConsumerId',
        method: 'get',
        params: query
    })
}
// 新增工作经历
export function upWork (data) {
    return request({
        url: '/api/consumer/work/add',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 修改工作经历

export function chaneWork (data) {
    return request({
        url: '/api/consumer/work/update',
        method: 'put',
        data: qs.stringify(data)
    })
}

// 删除工作经历

export function delWork (data) {
    return request({
        url: '/api/consumer/work/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}