import Layout from '@/layout'

const personaloaRouter = {
  path: '/personaloa',
  component: Layout,
  redirect: 'noRedirect',
  name: 'personaloa',
  meta: { title: 'personaloa', icon: 'component' },
  children: [
    {
      path: 'startprocess',
      component: () => import('@/views/personaloa/startprocess'),
      name: 'StartProcess',
      meta: { title: 'startprocess', icon: 'el-icon-s-promotion' }
    },
    {
      path: 'myprocess',
      component: () => import('@/views/personaloa/myprocess'),
      name: 'MyProcess',
      meta: { title: 'myprocess', icon: 'el-icon-user-solid' }
    },
    {
      path: 'myprocessdetails',
      component: () => import('@/views/personaloa/myprocessdetails'),
      name: 'MyProcessDetails',
      meta: { title: 'myprocessdetails' },
      hidden: true
    },
    {
      path: 'candidatetask',
      component: () => import('@/views/personaloa/candidatetask'),
      name: 'CandidateTask',
      meta: { title: 'candidatetask', icon: 'el-icon-s-claim' }
    },
    {
      path: 'assigneetask',
      component: () => import('@/views/personaloa/assigneetask'),
      name: 'AssigneeTask',
      meta: { title: 'assigneetask', icon: 'el-icon-s-custom' }
    },
    {
      path: 'finishedtask',
      component: () => import('@/views/personaloa/finishedtask'),
      name: 'FinishedTask',
      meta: { title: 'finishedtask', icon: 'el-icon-s-check' }
    },
    {
      path: 'mytaskdetails',
      component: () => import('@/views/personaloa/mytaskdetails'),
      name: 'MyTaskdeTails',
      meta: { title: 'mytaskdetails' },
      hidden: true
    }
  ]
}
export default personaloaRouter
