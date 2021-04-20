Vue.use(Router)

export default [
  {
    path: '/',
    component: () => import('./entry.vue')
  }
]
