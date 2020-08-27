import request from '@/utils/request'
import qs from 'qs'

// 查询客户信息
export function getUserData (query) {
    return request({
        url: '/api/consumer/baseInfo/selectByParams',
        method: 'get',
        params: query
    })
}
// 查询地域信息
export function getCity (query) {
    return request({
        url: '/api/admin/sysCity/queryTree',
        method: 'get',
        params: query
    })
}
// 网格查询
export function getSysOrgTree (query) {
    return request({
        url: '/api/admin/sysorg/querySysOrgTree',
        method: 'get',
        params: query
    })
}
// 新增客户信息
export function upUser (data) {
    return request({
        url: '/api/consumer/baseInfo/add',
        method: 'put',
        data: qs.stringify(data)
    })
}

// 修改客户信息

export function chaneUser (data) {
    return request({
        url: '/api/consumer/baseInfo/update',
        method: 'put',
        data: qs.stringify(data)
    })
}

// 删除客户信息

export function delUser (data) {
    return request({
        url: '/api/consumer/baseInfo/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}