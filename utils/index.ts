export const customBase64Uploader = async (file: any): Promise<{base64: string, link: string}> => {
  return new Promise(async (resolve): Promise<any> => {
    let base64 = ''
    if (!file) resolve({base64, link: ''})

    const reader = new FileReader()
    const blob = await fetch(file.objectURL).then((r) => r.blob())
    
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      base64 = reader.result as string
      resolve({base64, link: URL.createObjectURL(blob)})
    }
  })
}

export const removeAccents = (str: string = '') => {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[\u0300-\u036f]/gi, '')
}

export const transformCode = (str: string = '') => {
  return str
    .split(" ")
    .map(el => el.toLowerCase())
    .join("-")
}