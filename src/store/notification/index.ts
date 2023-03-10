import Vue from 'vue'
import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {ToastOptions} from 'vue-toastification/dist/types/src/types'
import {POSITION} from 'vue-toastification/src/ts/constants'
import {TYPE} from 'vue-toastification/dist/types/src/ts/constants'

/**
 * For more details about available options, see https://vue-toastification.maronato.dev/
 */
const GENERAL_OPTIONS: ToastOptions = {
  position: POSITION.TOP_RIGHT,
  draggable: true,
  draggablePercent: 0.6,
  closeOnClick: false,
  timeout: false,
}

/**
 * Note, we can use a custom component for `content`, not only texts
 */
export type IToastContent = string | object

export interface IToast {
  content: IToastContent,
  options: ToastOptions,
}

export interface INotificationState {}

export const stateFactory = (): INotificationState => ({})

export const notificationActions: ActionTree<INotificationState, IRootState> = {
  toast(_context, {content, options}: IToast) {
    Vue.$toast(content, {
      ...GENERAL_OPTIONS,
      ...options,
    } as ToastOptions)
  },
  toastError({dispatch}, {content, options}: IToast) {
    const defaultOptions: ToastOptions = {} as ToastOptions
    Vue.$toast.error(content, {
      ...GENERAL_OPTIONS,
      ...defaultOptions,
      ...options,
    } as (ToastOptions & {
      type?: TYPE.ERROR | undefined
    }) | undefined)
  },
  toastSuccess({dispatch}, {content, options}: IToast) {
    const defaultOptions = {}
    Vue.$toast.success(content, {
      ...GENERAL_OPTIONS,
      ...defaultOptions,
      ...options,
    } as (ToastOptions & {
      type?: TYPE.SUCCESS | undefined
    }) | undefined)
  },
  toastInfo({dispatch}, {content, options}: IToast) {
    const defaultOptions = {}
    Vue.$toast.info(content, {
      ...GENERAL_OPTIONS,
      ...defaultOptions,
      ...options,
    } as (ToastOptions & {
      type?: TYPE.INFO | undefined
    }) | undefined)
  },
  toastWarning({dispatch}, {content, options}: IToast) {
    const defaultOptions = {}
    Vue.$toast.warning(content, {
      ...GENERAL_OPTIONS,
      ...defaultOptions,
      ...options,
    } as (ToastOptions & {
      type?: TYPE.WARNING | undefined
    }) | undefined)
  },
}

export const notificationStore: Module<INotificationState, IRootState> = {
  state: stateFactory,
  actions: notificationActions,
}

export default notificationStore
