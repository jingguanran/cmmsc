import request from '@/utils/request'

/** 用户API开始 */

export function querySysUser(query) {
  return request({
    url: '/api/admin/sysuser/querySysUser',
    method: 'get',
    params: query
  })
}

export function addSysUser(data) {
  return request({
    url: '/api/admin/sysuser/addSysUser',
    method: 'post',
    data
  })
}

export function updateSysUser(data) {
  return request({
    url: '/api/admin/sysuser/updateSysUser',
    method: 'put',
    data
  })
}

export function deleteSysUser(data) {
  return request({
    url: '/api/admin/sysuser/deleteSysUser',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function queryRoleName() {
  return request({
    url: '/api/admin/sysrole/queryRoleName',
    method: 'get'
  })
}

export function querySysOrgTree() {
  return request({
    url: '/api/admin/sysorg/querySysOrgTree',
    method: 'get'
  })
}

/** 用户API结束 */
/** 菜单API开始 */

export function querySysMenu(query) {
  return request({
    url: '/api/admin/sysmenu/querySysMenu',
    method: 'get',
    params: query
  })
}

export function addSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/addSysMenu',
    method: 'post',
    data
  })
}

export function updateSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/updateSysMenu',
    method: 'put',
    data
  })
}

export function deleteSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/deleteSysMenu',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function querySysMenuTree() {
  return request({
    url: '/api/admin/sysmenu/querySysMenuTree',
    method: 'get'
  })
}

export function queryMenuButtonCheckbox() {
  return request({
    url: '/api/admin/sysmenu/queryMenuButtonCheckbox',
    method: 'get'
  })
}

export function queryCheckedMenuButton(data) {
  return request({
    url: '/api/admin/sysmenu/queryCheckedMenuButton',
    method: 'get',
    params: {
      menuCode: data
    }
  })
}

/** 菜单API结束 */
