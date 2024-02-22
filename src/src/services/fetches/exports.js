import { api } from "src/boot/axios"
import { Loading } from "quasar"

export default {
  studentClass
}

async function studentClass(id, fileName = 'turma') {
  try {
    Loading.show()
    const { data } = await api.get(`api/v1/export/studentcollection/${id}`, {
      responseType: 'blob'
    })
    const fileURL = URL.createObjectURL(data)
    let link = document.createElement('a');
    link.href = fileURL
    link.download = fileName + '.xlsx'
    link.click()
    URL.revokeObjectURL(fileURL)
    Loading.hide()
  } catch (error) {
    console.log(error);
    Loading.hide()
  }
}
