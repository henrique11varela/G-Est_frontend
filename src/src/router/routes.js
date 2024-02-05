
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
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Applications/ApplicationsEdit.vue'),
          },
          {
            path: 'show/:id',
            component: () => import('pages/Applications/ApplicationsShow.vue'),
          },
        ]
      },


      {
        path: 'classes',
        children: [
          {
            path: '',
            component: () => import('pages/Classes/ClassesPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Classes/ClassesAdd.vue'),
          },
          {
            path: 'edit/:id',
            children: [
              {
                path: '',
                component: () => import('pages/Classes/ClassesEdit.vue'),
              },
              {
                path: 'students',
                component: () => import('pages/Classes/ClassesStudentsEdit.vue'),
              },
            ]
          },
          {
            path: 'show/:id',
            component: () => import('pages/Classes/ClassesShow.vue'),
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
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Companies/CompaniesEdit.vue'),
          },
          {
            path: 'show/:id',
            children: [
              {
                path: '',
                component: () => import('pages/Companies/CompaniesShow.vue'),
              },
              {
                path: 'contactperson',
                children: [
                  {
                    path: 'add',
                    component: () => import('pages/CompaniesPerson/CompaniesPersonAdd.vue'),
                  },
                  {
                    path: 'edit/:personId',
                    component: () => import('pages/CompaniesPerson/CompaniesPersonEdit.vue'),
                  },
                ]
              },
              {
                path: 'contactaddress',
                children: [
                  {
                    path: 'add',
                    component: () => import('pages/CompaniesAddresses/CompaniesAddressesAdd.vue'),
                  },
                  {
                    path: 'edit/:addressId',
                    component: () => import('pages/CompaniesAddresses/CompaniesAddressesEdit.vue'),
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        path: 'students',
        children: [
          {
            path: '',
            component: () => import('pages/Students/StudentsPage.vue'),
          },
          {
            path: 'add',
            component: () => import('pages/Students/StudentsAdd.vue'),
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Students/StudentsEdit.vue'),
          },
          {
            path: 'show/:id',
            component: () => import('pages/Students/StudentsShow.vue'),
          },
        ]
      },
      {
        path: 'internships',
        children: [
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
          },
          {
            path: ':id',
            component: () => import('pages/Users/UserEdit.vue'),
          },
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
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Courses/CoursesEdit.vue'),
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
