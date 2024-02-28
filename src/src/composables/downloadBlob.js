import notify from "./notify"

export default function downloadBlob(blob, fileName) {
  try {
    if (!fileName) fileName = 'turma'
    const fileURL = URL.createObjectURL(blob)
    let link = document.createElement('a');
    link.href = fileURL
    link.download = fileName + '.xlsx'
    link.click()
    URL.revokeObjectURL(fileURL)
  } catch (error) {
    notify.serverError()
  }
}
