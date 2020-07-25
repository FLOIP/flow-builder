import {startCase} from 'lodash'

//dummy trans filter for use in stories - users of the library can provide their own trans files and filter
const stubbedFilters = {
  trans: (value: string) => startCase(value.split('.').slice(-1)[0]),
}

export default stubbedFilters
