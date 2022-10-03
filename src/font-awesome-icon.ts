import Vue from 'vue'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'

import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faInfoCircle,
  faMobileAlt,
  faSpinner,
  faExclamationTriangle,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'

import {
  faCheckCircle,
  faCircle,
  faClone,
  faCommentDots,
  faDotCircle,
  faEdit,
  faEnvelope,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'

/**
 * Enable needed icons
 * Vue way for Fontawesome
 * more details: https://www.npmjs.com/package/@fortawesome/vue-fontawesome#the-icon-property
 *
 */
import CustomIcons from './lib/custom-icons/index'

library.add(
  faCheck,
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faCircle,
  faClone,
  faCommentDots,
  faDotCircle,
  faEdit,
  faEnvelope,
  faMobileAlt,
  faSpinner,
  faTimesCircle,
  faTrashAlt,
  faInfoCircle,
  faExclamationTriangle,
  faAngleDown,
  faAngleUp,
  ...CustomIcons,
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
