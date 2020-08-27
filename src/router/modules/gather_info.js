import Layout from '@/layout'
import { title } from '@/settings'

const gatherInfoRouter = {
  path: '/gatherInfo',
  component: Layout,
  redirect: 'noRedirect',
  name: 'gatherInfo',
  meta: { title: 'gatherInfo', icon: 'el-icon-s-management' },
  children: [
    {
      path: "customer",
      component: () => import("@/views/gather-info/customer"),
      name: 'Customer',
      meta: { title: 'client_info', icon: 'el-icon-user' }
    },
    {
      path: "UserDetails/index/:id",
      component: () => import("@/views/gather-info/UserDetails/index"),
      name: 'client_detail_info',
      props:true
    },
  ]
}
export default gatherInfoRouter