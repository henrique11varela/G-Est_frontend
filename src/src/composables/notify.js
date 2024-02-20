import { Notify } from 'quasar'

export default { store, update, destroy, imported, serverError }

function serverError() {
  notify('Erro no processamento do pedido', 'negative')
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
  notify('Apagado', 'negative')
}

function notify(message, color = 'positive') {
  Notify.create({
    color,
    textColor: 'white',
    icon: 'cloud_done',
    message
  })
}





