import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import tokenAPI from "../services/fetches/token.js";
import { Loading, QSpinnerGears } from 'quasar'

import { useLoginStore } from "src/stores/login.js";
import { storeToRefs } from 'pinia'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from) => {
    const store = useLoginStore();

    Loading.show({
      backgroundColor: 'black',
    })

    const userInfo  = await tokenAPI.checkRole();

    Loading.hide()

    if (!userInfo.role && to.fullPath != '/login') {
      return 'login'
    }
    if (userInfo.role) {
      store.setPermission(userInfo.role)
      store.setUserInfo(userInfo)
      if (to.fullPath == '/login') {
        return ''
      }
      if (to.meta.adminOnly && !store.isAdmin) {
        return ''
      }
    }
  })

  return Router
})
