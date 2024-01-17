
const routes = [
  // Login
  {
    path: '/login',
    component: () => import('layouts/CleanLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'applications', component: () => import('pages/ApplicationsPage.vue') },
      {
        path: 'classes',
        children: [
          {
            path: '',
            component: () => import('pages/classes/ClassesPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/classes/ClassesAdd.vue'),
          },
          {
            path: 'edit/:id',
            component: () => import('pages/classes/ClassesEdit.vue'),
          },
        ]
      },
      {
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
            path: 'edit/:id',
            component: () => import('pages/Companies/CompaniesEdit.vue'),
          },
          {
            path: 'show/:id',
            component: () => import('pages/Companies/CompaniesShow.vue'),
          },
        ]
      },
      { path: 'students', component: () => import('pages/StudentsPage.vue') },
      {
        path: 'internships',
        children: [
          {

            path: '',
            component: () => import('pages/InternshipsPage.vue'),
          },
          {
            path: 'add/:id',
            component: () => import('pages/Internships/InternshipsAddPage.vue'),
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Internships/InternshipsAddPage.vue'),
          },
          {
            path: 'show/:id',
            component: () => import('pages/Internships/InternshipsAddPage.vue'),
          },
        ]
      },
      {
        path: 'users',
        children: [
          {

            path: '',
            component: () => import('pages/Users/UserList.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Users/UserAdd.vue'),
          },
          {
            path: ':id',
            component: () => import('pages/Users/UserEdit.vue'),
          },
        ]
      },
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
