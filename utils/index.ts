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
    .replaceAll(/\p{Diacritic}/gu, '')
    .replaceAll(/[\u0300-\u036f]/gi, '')
    .replaceAll('(', '')
    .replaceAll(',', '')
    .replaceAll(')', '')
}

export const transformCode = (str: string = '') => {
  return str
    .split(" ")
    .map(el => el.toLowerCase())
    .join("-")
}

export const sleep = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, delay)
  })
}

export const debounce = (callback: Function, timeout: number = 1000) => {
  let timer;
  return function (...args) {
    window.clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}

export const serializeParams = (params: any) => {
  let str = ''

  for (const prop in params) {
    if (typeof params[prop] !== 'object') str += `${prop}=${params[prop]}&`
    
    if (typeof params[prop] === 'object' && params[prop].length) {
      params[prop].forEach(el => {
        str += `${prop}=${el}&`
      });
    }
  }

  return str
}

export const formatPtBr = (date: string | Date): string => {
  if (!date) return ''

  const dtTemp = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR').format(dtTemp)
}