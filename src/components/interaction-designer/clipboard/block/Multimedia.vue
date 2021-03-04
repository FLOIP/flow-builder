<template>
  <div v-if="mediaDescriptor" class="multimedia">
    <transition name="fade">
<!--      <MaterialCircularProgressRow v-if="isLoadStateLoading(asyncLoadState)" size="48px"/>-->
      <img
          v-else-if="imageSrc"
          :src="imageSrc"
          alt="image"/>
      <video
          v-else-if="videoSrc"
          :src="videoSrc"
          preload="none"
          controls/>
      <audio v-else-if="audioSrc"
          :src="audioSrc"
          controls>
      </audio>
    </transition>
  </div>
</template>
<script>

import Axios from 'axios'
import { combineLatest, EMPTY, from } from 'rxjs'

import { Observable } from 'rxjs/Observable'
import lodash from 'lodash'
import { asyncLoadState, asyncLoadStateMixins } from '../../../models/AsyncLoadState'
// import MaterialCircularProgressRow from '../../../components/material/MaterialCircularProgressRow';

/**
   * @typedef {Object} MediaDescriptor
   * @property {string} mimeType - The MimeType of the media resource
   * @property {string} url - The URL to media resource
   * */

export default {
  name: 'Multimedia',
  // components: { MaterialCircularProgressRow },
  mixins: [
    asyncLoadStateMixins,
  ],
  props: {
    // TODO: (https://viamoinc.atlassian.net/browse/VMO-259) Once Clipoard.js is an async component, define the object type with that
    /** @type MediaDescriptor */
    mediaDescriptor: {},
  },
  data() {
    return {
      asyncLoadState: asyncLoadState.NONE,
      imageSrc: null,
      videoSrc: null,
      audioSrc: null,
      subscription: null,
    }
  },
  mounted() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }
    this.asyncLoadState = asyncLoadState.LOADING

    // TODO: (https://viamoinc.atlassian.net/browse/VMO-326) Make this component work with HTML5 Media Events instead of Observables
    this.subscription = combineLatest(
      this.fetchImageSrc(),
      this.fetchVideoSrc(),
      this.fetchAudioSrc(),
    )
      .take(1)
      .subscribe({
        next: (responseData) => {
        },
        error: (err) => {
          this.asyncLoadState = asyncLoadState.ERROR
          console.error(err)
        },
        complete: () => this.asyncLoadState = asyncLoadState.LOADED,
      })
  },
  methods: {

    /**
       * @returns {Observable}
       */
    fetchImageSrc() {
      return this.getUrlForContentType('image', (url) => {
        this.imageSrc = url
      })
    },

    /**
       * @returns {Observable}
       */
    fetchVideoSrc() {
      return this.getUrlForContentType('video', (url) => {
        this.videoSrc = url
      })
    },

    /**
       * @returns {Observable}
       */
    fetchAudioSrc() {
      return this.getUrlForContentType('audio', (url) => {
        this.audioSrc = url
      })
    },

    /**
       *
       * @param mimeTypePrefix
       * @param modifyValue  ((x: T) => void)
       * @returns {Observable}
       */
    getUrlForContentType(mimeTypePrefix, modifyValue) {
      if (lodash.get(this.mediaDescriptor, 'mimeType', '').startsWith(mimeTypePrefix)) {
        return from(this.getMedia())
          .map((response) => window.URL.createObjectURL(new Blob([response.data])))
          .do({
            next: modifyValue,
          })
      }
      return EMPTY
    },

    /**
       * @returns Promise
       */
    getMedia() {
      return Axios.get(this.mediaDescriptor.url, {
        responseType: 'blob',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .multimedia {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  audio {
    display: block;
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
  }

  img, video {
    display: block;
    width: 100%;
    height: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
