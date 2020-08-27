import request from '@/utils/request'
import qs from 'qs'

/** 流程API开始 */

export function queryProcessDefinition(query) {
  return request({
    url: '/api/activiti/process/queryProcessDefinition',
    method: 'get',
    params: query
  })
}

export function getProcessResource(deploymentId) {
  return request({
    url: '/api/activiti/process/getProcessImage',
    method: 'post',
    params: { deploymentId }
  })
}

export function getHighLightedProcessDiagram(processInstanceId) {
  return request({
    url: '/api/activiti/process/getHighLightedProcessDiagram',
    method: 'post',
    params: { processInstanceId }
  })
}

export function startProcessInstance(data) {
  return request({
    url: '/api/activiti/process/startProcessInstance',
    method: 'post',
    data
  })
}

/** 流程API结束 */
/** 任务API开始 */

export function queryTaskComment(query) {
  return request({
    url: '/api/activiti/task/queryTaskComment',
    method: 'get',
    params: query
  })
}

export function queryUsername() {
  return request({
    url: '/api/activiti/task/queryUsername',
    method: 'get'
  })
}

/** 任务API结束 */
/** 流程任务历史API开始 */

export function queryHistoricProcessInstance(query) {
  return request({
    url: '/api/activiti/history/queryHistoricProcessInstance',
    method: 'get',
    params: query
  })
}

/** 流程任务历史API结束 */
/** 我的办公API开始 */

export function queryPersonalTask(query) {
  return request({
    url: '/api/activiti/task/queryPersonalTask',
    method: 'get',
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    params: query
  })
}

export function claimTask(taskId) {
  return request({
    url: '/api/activiti/task/claimTask',
    method: 'post',
    params: { taskId }
  })
}

export function completeTask(data) {
  return request({
    url: '/api/activiti/task/completeTask',
    method: 'post',
    params: data
  })
}

export function resolveTask(data) {
  return request({
    url: '/api/activiti/task/resolveTask',
    method: 'post',
    params: data
  })
}

export function delegateTask(data) {
  return request({
    url: '/api/activiti/task/delegateTask',
    method: 'post',
    params: data
  })
}

export function regressTask(data) {
  return request({
    url: '/api/activiti/task/regressTask',
    method: 'post',
    params: data
  })
}

export function rejectTask(data) {
  return request({
    url: '/api/activiti/task/rejectTask',
    method: 'post',
    params: data
  })
}

export function terminateTask(data) {
  return request({
    url: '/api/activiti/task/terminateTask',
    method: 'post',
    params: data
  })
}

/** 我的办公API结束 */
