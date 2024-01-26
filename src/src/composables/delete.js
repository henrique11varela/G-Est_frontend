import { Dialog } from 'quasar'
import notify from './notify'

export default deleteModel

/**
   * @param callback destroy function from whatever api file
   * @param route vue route object to get route id
   * @param router vue router object to push to specified value in routeTo parameter
   * @param routeTo route you wish to go after successful delete
   * @param appendedMessage optional: append item string that is being deleted to message.
   * Currently it prints "Tem a certeza que pretende apagar${appendedMessage}?"
   */
function deleteModel (callback, route, router, routeTo, appendedMessage = '') {
  try {
    Dialog.create({
      title: 'Apagar',
      message: `Tem a certeza que pretende apagar${appendedMessage ? ' ' + appendedMessage : ''}?`,
      cancel: true
    })
    .onOk(async () => {
      const response = await callback(route.params.id)
      // if (response.message === 'deleted')
      notify.destroy()
      router.push(routeTo)
    })
  } catch (error) {
    console.error("Error:", error)
  }
}
