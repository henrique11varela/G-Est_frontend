import { Dialog } from 'quasar'
import notify from './notify'

export default deleteModel

/**
   * @param callback destroy function from whatever api file
   * @param id route id to use as argument for destroy function
   * @param router vue router object to push to specified value in routeTo parameter
   * @param appendedMessage optional: append item string that is being deleted to message.
   * Currently it prints "Tem a certeza que pretende apagar${appendedMessage}?"
   * @param routeTo optional: route you wish to go after successful delete. If argument is falsy it calls router.back()
   */
function deleteModel (callback, id, router, appendedMessage = '', routeTo = '') {
  try {
    Dialog.create({
      title: 'Apagar',
      message: `Tem a certeza que pretende apagar${appendedMessage ? ' ' + appendedMessage : ''}?`,
      cancel: true
    })
    .onOk(async () => {
      const response = await callback(id)
      // if (response.message === 'deleted')
      notify.destroy()
      if (routeTo) router.push(routeTo)
      else router.back()
    })
  } catch (error) {
    console.error("Error:", error)
  }
}
