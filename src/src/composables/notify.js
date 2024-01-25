import { Notify } from 'quasar'

export default { store, update, destroy }

export function store() {
  notify('Criado')
}

export function update() {
  notify('Editado')
}

export function destroy() {
  notify('Apagado', 'red-4')
}

function notify(message, color = 'green-4') {
  Notify.create({
    color: color,
    textColor: 'white',
    icon: 'cloud_done',
    message: message
  })
}





