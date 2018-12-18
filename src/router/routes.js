export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/session') },
      { path: '/security', component: () => import('pages/security') },
      { path: '/login',
        component: () => import('pages/sessionLogin'),
        meta: { public: true}
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
