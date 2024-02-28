import { Notify } from 'quasar'

export default { store, update, destroy, imported, serverError, unauthorized, notFound }

function serverError() {
  notifyError('Erro no processamento do pedido')
}

function unauthorized() {
  notifyError('Não tem autorização para realizar a operação')
}

function notFound() {
  notifyError('Recurso não encontrado')
}

function imported() {
  notify('Importado')
}

function store() {
  notify('Criado')
}

function update() {
  notify('Editado')
}

function destroy() {
  notify('Apagado')
}

function notifyError(message) {
  notify(message, 'negative', 'error')
}

function notify(message, color = 'positive', icon = 'cloud_done') {
  Notify.create({
    color,
    textColor: 'white',
    icon,
    message
  })
}





