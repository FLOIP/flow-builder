import Vue from 'vue'
import lodash from 'lodash'
import Component from 'vue-class-component'
import {State} from 'vuex-class'

export function can(userPermissions: { [key: string]: any }, permissionOrPermissions: string[] | string, requireAll = false) {
  if (lodash.isArray(permissionOrPermissions)) {
    if (requireAll) {
      return lodash.every(permissionOrPermissions, (requestedPermission) => userPermissions[requestedPermission])
    }
    return lodash.find(permissionOrPermissions, (requestedPermission) => userPermissions[requestedPermission])
  }
  return userPermissions[permissionOrPermissions]
}

@Component
export default class Permissions extends Vue {
  @State permissions!: { [key: string]: any }

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
  can(permission: string, requireAll = false) {
    return can(this.permissions, permission, requireAll)
  }
}
