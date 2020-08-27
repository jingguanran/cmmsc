import Layout from '@/layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: 'noRedirect',
  name: 'admin',
  meta: { title: 'admin', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'sysuser',
      component: () => import('@/views/admin/sysuser'),
      name: 'SysUser',
      meta: { title: 'sysuser', icon: 'el-icon-user' }
    },
    {
      path: 'sysmenu',
      component: () => import('@/views/admin/sysmenu'),
      name: 'SysMenu',
      meta: { title: 'sysmenu', icon: 'el-icon-menu' }
    }
  ]
}
export default adminRouter
