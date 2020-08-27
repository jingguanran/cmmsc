import request from '@/utils/request'
import qs from 'qs'

// 批量导入Excel

export function toLead (data) {
    return request({
        url: '/api/admin/sysuser/importSysUser',
        method: 'POST',
        headers: {
            'Content-type': 'multipart/form-data'
        },
        data: data
    })
}

// 导出Excel模板

export function getTemp (data) {
    return request({
        url: '/api/admin/sysuser/createExcel',
        method: 'POST',
        responseType: 'blob',
        data: qs.stringify(data)
    })
}