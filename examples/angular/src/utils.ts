export const delay = (delayInMs: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(null), delayInMs)
  })

export const capitalize = (initString: string): string => initString.charAt(0).toUpperCase() + initString.slice(1)
