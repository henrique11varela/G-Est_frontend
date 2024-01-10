
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'applications', component: () => import('pages/ApplicationsPage.vue') },
      { path: 'classes', component: () => import('pages/ClassesPage.vue') }, {
        path: 'companies',
        children: [
          {
            path: '',
            component: () => import('pages/Companies/CompaniesList.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Companies/CompaniesAdd.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/Companies/CompaniesEdit.vue'),
          },
        ]
      },
      { path: 'internships', component: () => import('pages/InternshipsPage.vue') },
      { path: 'students', component: () => import('pages/StudentsPage.vue') },

      {
        path: 'users',
        children: [
          {

            path: '',
            component: () => import('pages/Users/UserList.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Users/CompaniesAdd.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/Users/UserEdit.vue'),
          },
        ]
      }
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
