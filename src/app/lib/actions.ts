'use server'

export async function createLabel(formData: FormData) {
  console.log('working')
}

export async function getFolderPath(formData: FormData) {
  const data = formData.getAll('file')
  console.log(data)
}