export const delay = (delayInMs: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(null), delayInMs)
  })

export const capitalize = (initString: string): string => initString.charAt(0).toUpperCase() + initString.slice(1)

export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, timeout)
  }
}
