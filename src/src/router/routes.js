
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
      {
        path: '', component: () => import('pages/classes/ClassesPage.vue')
      },
      {
        path: 'applications',
        children: [
          {
            path: '',
            component: () => import('pages/Applications/ApplicationsPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Applications/ApplicationsAdd.vue'),
            meta: {
              adminOnly: true
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Applications/ApplicationsEdit.vue'),
          }
        ]
      },
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
            meta: {
              adminOnly: true
            }
          },
          {
            path: 'edit/:id',
            children: [
              {
                path: '',
                component: () => import('pages/classes/ClassesEdit.vue'),
                meta: {
                  adminOnly: true
                }
              },
              {
                path: 'students',
                component: () => import('pages/classes/ClassesStudentsEdit.vue'),
                meta: {
                  adminOnly: true
                }
              },
            ]
          },
          {
            path: 'show/:id',
            component: () => import('pages/classes/ClassesShow.vue'),
          },
        ]
      },
      {
        path: 'companies',
        children: [
          {
            path: '',
            component: () => import('pages/Companies/CompaniesPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Companies/CompaniesAdd.vue'),
            meta: {
              adminOnly: true
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Companies/CompaniesEdit.vue'),
            meta: {
              adminOnly: true
            }
          },
          {
            path: 'show/:id',
            children: [
              {
                path: '',
                component: () => import('pages/Companies/CompaniesShow.vue'),
              },
              {
                path: 'companiesperson',
                children: [
                  {
                    path: 'add',
                    component: () => import('pages/CompaniesPerson/CompaniesPersonAdd.vue'),
                  },
                  {
                    path: 'edit/:personId',
                    component: () => import('pages/CompaniesPerson/CompaniesPersonEdit.vue'),
                  },
                ],
                meta: {
                  adminOnly: true
                }
              },
              {
                path: 'companiesaddress',
                children: [
                  {
                    path: 'add',
                    component: () => import('pages/CompaniesAddresses/CompaniesAddressesAdd.vue'),
                  },
                  {
                    path: 'edit/:addressId',
                    component: () => import('pages/CompaniesAddresses/CompaniesAddressesEdit.vue'),
                  },
                ],
                meta: {
                  adminOnly: true
                }
              },
            ]
          },
        ]
      },
      {
        path: 'students',
        children: [
          {
            path: 'edit/:id',
            component: () => import('pages/Students/StudentsEdit.vue'),
            meta: {
              adminOnly: true
            }
          },
        ]
      },
      {
        path: 'internships',
        children: [
          {
            path: ':id',
            component: () => import('pages/Internships/InternshipsPage.vue'),
          },
          {
            path: ':class/:student',
            component: () => import('pages/Internships/InternshipsPage.vue'),
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
            meta: {
              adminOnly: true
            }
          },
          {
            path: ':id',
            component: () => import('pages/Users/UserEdit.vue'),
          },
        ]
      },
      {
        path: 'coordinators',
        children: [
          {
            path: '',
            component: () => import('pages/Coordinators/CoordinatorsPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Coordinators/CoordinatorsAdd.vue'),
            meta: {
              adminOnly: true
            }
          },
          {
            path: ':id',
            component: () => import('pages/Coordinators/CoordinatorsEdit.vue'),
            meta: {
              adminOnly: true
            }
          }
        ]
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: () => import('pages/Courses/CoursesPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Courses/CoursesAdd.vue'),
            meta: {
              adminOnly: true
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Courses/CoursesEdit.vue'),
            meta: {
              adminOnly: true
            }
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
