import {Route} from 'vue-router'

export const scrollBehavior = (to: Route): void => {
  if (to.params.field) {
    const anchor = to.params.field
    const domElement = document.getElementById(anchor)
    if (domElement) {
      domElement.scrollIntoView({behavior: 'smooth', block: 'center'})
    } else {
      console.debug('Deep linking: cannot scroll to ', anchor, ' as the DOM element is not found')
    }
  }
}

export const scrollBlockIntoView = (blockId: string): void => {
  const blockElement = document.querySelector(`#block\\/${blockId} .plain-draggable`)
  if (blockElement) {
    console.debug('Deep linking: scrolling to the block', blockId, 'on the DOM', blockElement)
    blockElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
  } else {
    console.debug('Deep linking: cannot scroll block', blockId, 'on the DOM', blockElement)
  }
}
