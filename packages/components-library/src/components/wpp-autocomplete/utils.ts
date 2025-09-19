export const getTempNodeWidthBasedOnLabel = (textStyles: string, label: string): number => {
  const tmp = document.createElement('span')
  const textNode = document.createTextNode('')

  tmp.appendChild(textNode)
  document.body.appendChild(tmp)

  tmp.style.cssText = textStyles
  tmp.style.opacity = '0'
  tmp.style.position = 'absolute'
  tmp.style.width = 'auto'
  tmp.style.overflow = 'scroll'
  tmp.style.whiteSpace = 'no-wrap'

  tmp.innerText = label

  const nodeWidth = tmp.getBoundingClientRect().width

  document.body.removeChild(tmp)

  return nodeWidth
}
