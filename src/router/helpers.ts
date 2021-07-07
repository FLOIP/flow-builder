import VueRouter, {Route} from 'vue-router'

export const scrollBehavior = (to: Route) => {
  if (to.params.field) {
    const anchor = `block/${to.params.blockId}${to.params.field}`
    const domElement = document.getElementById(anchor)
    if (domElement) {
      domElement.scrollIntoView({behavior: 'smooth', block: 'center'})
    } else {
      console.debug('Deep linking: cannot scroll to ', anchor, ' as the DOM element is not found')
    }
  }
}

export const scrollBlockIntoView = (blockId: string) => {
  const blockElement = document.querySelector(`#block\\/${blockId} .plain-draggable`)
  if (blockElement) {
    blockElement.scrollIntoView({behavior: 'smooth', block: 'center'})
  } else {
    console.debug('Deep linking: cannot scroll block ', blockElement, 'as block is not found in the DOM')
  }
}

