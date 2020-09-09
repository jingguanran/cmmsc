import request from '@/utils/request'


export function queryStaffInfo(query) {
  return request({
    url: '/api/admin/sysuser/querySysUser',
    method: 'get',
    params: query
  })
}

export function queryGroup(query) {
    return request({
      url: '/api/admin/sysuser/querySysUser',
      method: 'get',
      params: query
    })
}
export function queryRole(query) {
    return request({
      url: '/api/admin/sysuser/querySysUser',
      method: 'get',
      params: query
    })
}