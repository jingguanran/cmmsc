import Layout from '@/layout'

const employeeRouter = {
  path: '/employee',
  component: Layout,
  redirect: 'noRedirect',
  name: 'employee',
  meta: { title: 'employee', icon: 'lock' },
  children: [
    {
      path: 'activation',
      component: () => import('@/views/employee/index'),
      name: 'activation',
      meta: { title: 'activation' }
    },
    {
      path: 'subordinateUnit',
      component: () => import('@/views/employee/subordinateUnit'),
      name: 'subordinateUnit',
      meta: { title: 'subordinateUnit' }
    },
    {
      path: 'employeeInfo',
      component: () => import('@/views/employee/employeeInfo'),
      name: 'employeeInfo',
      meta: { title: 'employeeInfo' }
    },
  ]
}
export default employeeRouter
