import createDOMPurify from 'dompurify'

export function useDOMPurify () {

  const dompurify = createDOMPurify(window)

  const purify = (value: string) => {
    return dompurify.sanitize(value)
  }

  return {
    purify
  }
}