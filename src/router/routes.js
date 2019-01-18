export default [
  { path: '/login',
    component: () => import('pages/sessionLogin'),
    meta: { public: true}
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/session') },
      { path: '/security', component: () => import('pages/security') },
      { path: '/contacts', component: () => import('pages/contacts') },
      { path: '/profiles', component: () => import('pages/profiles') },

    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
