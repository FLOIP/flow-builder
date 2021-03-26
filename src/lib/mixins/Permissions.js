import {mapState} from 'vuex'
import {isArray, every, find} from 'lodash'

export function can(userPermissions, permissionOrPermissions, requireAll = false) {
  if (isArray(permissionOrPermissions)) {
    if (requireAll) {
      return every(permissionOrPermissions, (requestedPermission) => userPermissions[requestedPermission])
    }
    return find(permissionOrPermissions, (requestedPermission) => userPermissions[requestedPermission])
  }
  return userPermissions[permissionOrPermissions]
}

export default {
  computed: {
    ...mapState(['permissions']),
  },

  methods: {
    /**
     * @note This method can not be relied on for any real security measures, but solely provides the
     * ability to hide and curb navigation to prohibited parts of the app. Authorization still needs to be handled
     * on all endpoints and actions where necessitated. <3
     *
     * Implementation ported from:
     *  https://github.com/Zizaco/entrust/blob/master/src/Entrust/Traits/EntrustUserTrait.php#L144
     *
     * @param permission
     * @param requireAll
     * @returns {boolean}  */
    can(permission, requireAll = false) {
      return can(this.permissions, permission, requireAll)
    },
  },
}
