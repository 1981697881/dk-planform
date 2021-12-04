export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),

  'machine': () => import('@/views/commodity/machine'),
  'users': () => import('@/views/system/users'),
}
