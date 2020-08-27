import request from '@/utils/request'
import qs from 'qs'

// 查询教育经历
export function getEducation (query) {
    return request({
        url: '/api/consumer/education/queryByConsumerId',
        method: 'get',
        params: query
    })
}
// 新增教育经历
export function upEducation (data) {
    return request({
        url: '/api/consumer/education/add',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 修改教育经历

export function chaneEducation (data) {
    return request({
        url: '/api/consumer/education/update',
        method: 'put',
        data: qs.stringify(data)
    })
}

// 删除教育经历

export function delEducation (data) {
    return request({
        url: '/api/consumer/education/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}