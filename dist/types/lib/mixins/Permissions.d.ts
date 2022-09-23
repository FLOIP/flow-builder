import Vue from 'vue';
export declare function can(userPermissions: {
    [key: string]: any;
}, permissionOrPermissions: string[] | string, requireAll?: boolean): any;
export default class Permissions extends Vue {
    permissions: {
        [key: string]: any;
    };
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
    can(permission: string, requireAll?: boolean): any;
}
