export const createWidgetContainer = (): HTMLDivElement => {
  const element = document.createElement('div')
  element.setAttribute('style', 'box-shadow:none;background-color:transparent;')
  return element
}
