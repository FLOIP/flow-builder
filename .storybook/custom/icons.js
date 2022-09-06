
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons'
import * as freeRegularIcons from '@fortawesome/free-regular-svg-icons'
// import CustomIcons from '../../resources/js/lib/custom-icons'
// const prefixExist = item => item.prefix

export const icons = [
  // ...CustomIcons,
  ...Object.values(freeSolidIcons),
  ...Object.values(freeRegularIcons)
]

export default icons