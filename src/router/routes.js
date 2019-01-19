export default [
  {
    path: '/public',
    component: () => import('layouts/public'),
    children: [
      { path: 'login',
        alias: '/login',
        component: () => import('pages/sessionLogin'),
        meta: { public: true}
      },
      { path: 'signup',
        alias: '/signup',
        component: () => import('pages/signup'),
        meta: { public: true}
      },
    ]
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
