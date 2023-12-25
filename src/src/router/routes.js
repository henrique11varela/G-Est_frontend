
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'applications', component: () => import('pages/ApplicationsPage.vue') },
      { path: 'classes', component: () => import('pages/ClassesPage.vue') },
      { path: 'companies', component: () => import('pages/CompaniesPage.vue') },
      { path: 'internships', component: () => import('pages/InternshipsPage.vue') },
      { path: 'students', component: () => import('pages/StudentsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
