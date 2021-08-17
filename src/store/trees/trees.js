import axios from 'axios'
import lodash, {get, set} from 'lodash'

import Vue from 'vue'

import {routeFrom} from '@/lib/mixins/Routes'
import flights from '@/store/common/flight-monitor'

import flow from 'lodash/fp/flow'
import pickBy from 'lodash/fp/pickBy'
import _every from 'lodash/fp/every'
import {bootstrapLegacyGlobalDependencies} from './bootstrap-legacy-global-dependencies'

const every = _every.convert({cap: false})

class ValidationError extends Error {
  constructor(validationResults) {
    super()
    this.validationResults = validationResults
  }
}

export default {
  modules: {flights},

  state() {
    return {
      tree: null,
      ui: {
        isConfigured: false,
        audioFiles: null,
        callCenterQueues: null,
        previousTreeJson: null,
        /** @note - `validationResults` has two states:
         *            (1) `null` - indicating we have yet to save the tree since loading the page
         *            (2) non-null or `[]` - indicating the tree has been saved and has gone through server-side validation */
        // todo: this is an empty list on page load, and shouldn't be?
        validationResults: null,
        originalTreeJsonValidationResults: null,
        selectedBlock: null,
        designerWorkspaceHeight: 1400,
        currentZoom: 1,
        batchMatchAudio: {
          results: null,
          status: 0,
          message: null,
          isFailure: false,
          isPending: false,
          isComplete: false,
        },
        treeUpdateConflict: null,
        enabledFeatures: [
          /** @see \Voto5\Http\Controllers\V3TreesController::get_editTree */
        ],
        isSaveCurrentlyInProgress: false,
        isEditable: true,
        subscriberPropertyFields: [],
        blockTags: [],
      },
    }
  },

  getters: {
    isConfigured: ({ui}) => ui.isConfigured,
    isFeatureCallCenterQueuesEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'callCenterQueues'),
    isFeatureCallToRecordEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'callToRecord'),
    isFeatureMultimediaUploadEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'multimediaUpload'),
    isFeatureTreesBatchLinkAudioEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'treesBatchLinkAudio'),
    isFeatureAddSubscriberPropertyFieldEnabled: ({ui}) => lodash.find(
      ui.enabledFeatures,
      (feature) => feature === 'addSubscriberPropertyField',
    ),
    isFeatureFloipPushEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'floipPush'),
    isFeatureTreeSaveEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'treeSave'),
    isFeatureAddLanguageOnImportEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'addLanguageOnImport'),
    isFeatureTreeSendEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'treeSend'),
    isFeatureTreeDuplicateEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'treeDuplicate'),
    isFeatureTreeViewVersionsEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'treeViewVersions'),
    isFeatureTreeDuplicateOfEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'treeDuplicateOf'),
    isResourceEditorEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'resourceEditor'),
    isFeatureUpdateInteractionTotalsEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'updateInteractionTotals'),
    isFeatureAudioUploadEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'audioUpload'),
    isFeatureSimulatorEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'simulator'),
    isFeatureViewResultsEnabled: ({ui}) => lodash.find(ui.enabledFeatures, (feature) => feature === 'viewResults'),

    selectedBlock: ({tree, ui}) => lodash.find(get(tree, 'blocks', []), {jsKey: ui.selectedBlock}),

    subscriberPropertyFields: ({ui}) => lodash.get(ui, 'subscriberPropertyFields', []),

    groups: ({ui}) => lodash.get(ui, 'groups', []),

    interactiveBlockClasses: ({ui}) => lodash.pickBy(ui.blockClasses, (value) => value.is_interactive),

    blockClasses: ({ui}) => lodash.keys(ui.blockClasses),

    interactiveBlocksInTree: ({tree}, {interactiveBlockClasses}) => lodash.filter(
      tree.blocks,
      (b) => lodash.includes(Object.keys(interactiveBlockClasses), b.type),
    ),

    isEditable: ({ui}) => !!ui.isEditable,

    // todo: trip a debounced version of this (for larger trees)
    // todo: which is faster lodash deep isEqual or JSON.stringify() ?
    hasChanges: ({tree, ui}) => ui.previousTreeJson !== JSON.stringify(tree),

    hasIssues({tree, ui}) {
      const {
        validationResults,
        originalValidationResults: validationResultsFromPageLoad,
        validationResults: hasSavedSinceLoad,
      } = ui

      return (hasSavedSinceLoad && !_.isEmpty(validationResults))
        || (!hasSavedSinceLoad && !_.isEmpty(validationResultsFromPageLoad))
        || !tree.blocks.length
    },

    isTreeSaving(state) {
      return state.ui.isSaveCurrentlyInProgress
    },

    hasClipboard: ({tree}) => tree.details.hasClipboard,

    isSelectedBlockSupportedForSummary({ui}, getters) {
      if (!getters.selectedBlock) {
        return false
      }
      return lodash.get(ui.blockClasses[getters.selectedBlock.type], 'isSummarizable', false)
    },

    canSelectedBlockSetSubscriberProperty({ui}, getters) {
      if (!getters.selectedBlock) {
        return false
      }
      return lodash.get(ui.blockClasses[getters.selectedBlock.type], 'canSetSubscriberProperty', false)
    },

    languageSelectors: ({ui}) => ui.languageSelectors,

    isBlockAvailableByBlockClass(state) {
      return lodash.mapValues(state.ui.blockClasses, (blockClass) => {
        const contentTypesToEnabledStatus = lodash.get(blockClass, 'isEnabledForContentType', [])

        return flow(
          pickBy((isEnabled, contentType) => state.tree.details[`has${lodash.startCase(contentType)}`]),
          every((isEnabled, contentType) => contentTypesToEnabledStatus[contentType]),
        )(contentTypesToEnabledStatus)
      })
    },

    // todo: is this an accurate inverse of trees::hasIssues from ResourceViewer ?
    isTreeValid(state) {
      return state.tree.blocks.length
        && !state.ui.originalTreeJsonValidationResults
        && lodash.isEmpty(state.ui.validationResults)
    },

    jsonValidationResults(state) {
      return state.ui.originalTreeJsonValidationResults
    },

    // Duplicating \Voto\Core\Trees\Tree::getTitle
    treeTitle: ({tree}) => tree.title || 'Untitled Tree',

    languages: ({ui}) => ui.languages || [],

    validationResults: ({ui}) => ui.validationResults,

    treeCreatedAt: ({tree}) => tree.createdAt.date,
    treeEditedAt: ({tree}) => tree.editedAt.date,
    treeUpdatedAt: ({tree}) => tree.updatedAt.date,
  },

  mutations: {
    addOrgLanguage({ui}, language) {
      const newLanguage = {...language}
      ui.languages.push(newLanguage)
    },

    setTreeSaving(state, isSaving) {
      state.ui.isSaveCurrentlyInProgress = isSaving
    },

    // TODO: find a better place to put the configure, putting it inside trees store doesn't make sense
    configure({ui}, {appConfig, builderConfig}) {
      const {
        app,
        __AUDIO__: audio,
        __TREES_UI__: uiOverrides,
        __APP__: appContext,
      } = bootstrapLegacyGlobalDependencies(appConfig, builderConfig)
      ui.isConfigured = true

      // update this.state to expose permissions, etc
      lodash.merge(this.state, appContext)
      lodash.merge(this.state.audio, audio)

      // todo: audio recording feature is likely to be unavailable for standalone app - How do we want to isolate these?
      set(app, 'audioChoice.audioLibrary', audio.library)
      set(app, 'audioChoice.recorderList', audio.recording.recorders)

      lodash.merge(ui, lodash.merge(uiOverrides, {
        previousTreeJson: JSON.stringify(uiOverrides.originalTreeJson),
        validationResults: uiOverrides.originalValidationResults,
      }))
    },
    setWorkingTree(state, {tree: treeData}) {
      const tree = new app.Tree(treeData)
      /** @property app.tree
       *  @deprecated We'll only need this until we've eradicated references in legacy. */
      app.tree = tree
      state.tree = tree.attributes
    },

    setDesignerWorkspaceHeight({tree, ui}, {height}) {
      ui.designerWorkspaceHeight = height
    },

    setSelectedBlock({tree, ui}, {jsKey}) {
      ui.selectedBlock = jsKey || ''
    },

    deselectBlocks({ui}) {
      ui.selectedBlock = ''
    },

    updateTreeDetailsWith({tree, ui}, {key, value}) {
      tree.details[key] = value
    },

    updateBlockCustomDataFor({tree, ui}, {jsKey, key, value}) {
      const block = lodash.find(tree.blocks, {jsKey})
      Vue.set(block.customData, key, value)
    },

    updateBlockCustomDataWithNestedKeyFor({tree, ui}, {jsKey, nestedKey, value}) {
      const block = lodash.find(tree.blocks, {jsKey})
      const customData = lodash.cloneDeep(block.customData)
      lodash.set(customData, nestedKey, value)
      block.customData = customData
    },

    updateBlockUiDataFor({tree, ui}, {jsKey, key, value}) {
      const block = lodash.find(tree.blocks, {jsKey})
      Vue.set(block.uiData, key, value)
    },

    updateMaxNumericDigits({tree, ui}, {value}) {
      const selectedBlock = lodash.find(tree.blocks, {jsKey: ui.selectedBlock})
      Vue.set(selectedBlock, 'customData.maxNumericDigits', value)
    },

    updateBlockContentFor({tree, ui}, {
      type, langId, jsKey, value,
    }) {
      const block = lodash.find(tree.blocks, {jsKey})
      // social has nested text content
      if (type === 'social') {
        if (!block.socialContent[langId]) {
          Vue.set(block.socialContent, langId, {})
        }
        Vue.set(block.socialContent[langId], 'text', value)
      } else {
        block[`${type}Content`] = {
          ...block[`${type}Content`],
          ...{[langId]: value},
        }
      }
    },

    updateBlockFileContentFor({tree, ui}, {
      langId, jsKey, fileUrl, fileId, fileType, mimeType, contentType,
    }) {
      const block = lodash.find(tree.blocks, {jsKey})

      const content = lodash.get(block, `${contentType}Content`)
      if (content[langId] === undefined) {
        Vue.set(content, langId, {})
      }
      Vue.set(content[langId], 'fileUrl', fileUrl)
      Vue.set(content[langId], 'fileId', fileId)
      Vue.set(content[langId], 'fileType', fileType)
      Vue.set(content[langId], 'mimeType', mimeType)
    },

    updateBlockFileContentForAllLanguages({tree, ui}, {
      jsKey, fileUrl, fileId, fileType, mimeType, contentType,
    }) {
      const block = lodash.find(tree.blocks, {jsKey})

      const content = lodash.get(block, `${contentType}Content`)

      Vue.set(content, 'allLanguagesFileUrl', fileUrl)
      Vue.set(content, 'allLanguagesFileId', fileId)
      Vue.set(content, 'allLanguagesFileType', fileType)
      Vue.set(content, 'allLanguagesMimeType', mimeType)
    },

    initBlockAutoGenStateFor({tree, ui}, {type, jsKey}) {
      const block = lodash.find(tree.blocks, {jsKey})
      Vue.set(block, `${type}AutogenLangs`, [])
    },

    updateBlockAutoGenStateFor({tree, ui}, {
      type, langId, jsKey, value: enable,
    }) {
      const block = lodash.find(tree.blocks, {jsKey})
      const i = block[`${type}AutogenLangs`].indexOf(+langId)
      const absent = i === -1

      if (enable) {
        absent && block[`${type}AutogenLangs`].push(+langId)
      } else {
        !absent && block[`${type}AutogenLangs`].splice(i, 1)
      }
    },

    updateAudioFileFor({tree, ui}, {langId, jsKey, value}) {
      const block = lodash.find(tree.blocks, {jsKey})

      // schedules a redraw

      block.audioFiles = {
        ...block.audioFiles,
        ...{[langId]: value},
      }

      // using delete because we depend on audioFile key presence in legacy
      !value && delete block.audioFiles[langId]
    },

    updateReviewedStateFor({tree, ui}, {langId, jsKey, value}) {
      const {customData: data} = lodash.find(tree.blocks, {jsKey})
      data.reviewed[langId] = value
    },

    setBatchMatchAudioResultsTo({tree, ui}, {value, status, message}) {
      // ui.batchMatchAudioStatus = value
      lodash.extend(ui.batchMatchAudio, {
        results: value,
        status,
        message,
        // isEmpty === {"block_1504124559063_84":{"7":null,"8":null,"9":null}
        isEmpty: lodash.chain(value)
          .values()
          .map((matchesByLang) => lodash.values(matchesByLang))
          .flatten()
          .filter()
          .isEmpty()
          .value(),
        isFailure: status === 0,
        isPending: status === -1,
        isComplete: status === 1,
      })
    },

    updateIsEditable({ui}, {value}) {
      ui.isEditable = value
    },

    addEnabledFeature({ui}, {value}) {
      if (ui.enabledFeatures.indexOf(value) < 0) {
        ui.enabledFeatures.push(value)
      }
    },

    removeEnabledFeature({ui}, {value}) {
      if (ui.enabledFeatures.indexOf(value) > -1) {
        ui.enabledFeatures = ui.enabledFeatures.filter((item) => item !== value)
      }
    },

    setContentTypeEnabled({tree}, {contentType, isEnabled}) {
      tree[`has${lodash.upperFirst(contentType)}`] = +isEnabled
    },

    addSubscriberPropertyField({ui}, {property}) {
      ui.subscriberPropertyFields.push(property)
    },

    addContactGroup({ui}, {group}) {
      ui.groups.push(group)
    },

    setTreeUpdateConflictStatus(state, {treeUpdateConflict}) {
      state.ui.treeUpdateConflict = treeUpdateConflict
    },

    setInteractionTotals(state, {interactionTotals}) {
      Vue.set(state.ui, 'interactionTotals', interactionTotals)
    },
  },

  actions: {
    async validateAndAddOrgLanguage({dispatch, commit}, {persistRoute, language}) {
      const validationErrors = await dispatch('validation/validate_new_language', {language}, {root: true})
      if (!validationErrors.isValid) {
        return false
      }

      if (!persistRoute) {
        console.info('Language persistence route not configured correctly in builder.config.json. Falling back to vuex store')
        commit('addOrgLanguage', language)
        return language
      }
      try {
        const {data} = await axios.post(persistRoute, language)
        commit('addOrgLanguage', data)
        return language
      } catch (error) {
        console.info(`Server error persisting flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
        commit('flow/import/setFlowError', 'flow-builder.error-persisting-language', {root: true})
        return false
      }
    },
    initializeTreeModel({dispatch, state: {ui: {isTreeImport}}}) {
      require('./10-trees-model')
      // todo: this is also included via `../public/dist/js/legacy/trees` on tree-builder
      //       but we don't include that beast in storybook b/c of global dependency hierarchy
      //       global lodash is the only dependency, and they magically attach themselves onto
      //       root self regardless of whether or not it's being managed by module loader.
      //       Odd behaviour, but works out in this case.
      require('./12-trees-helpers')

      isTreeImport
        ? dispatch('initializeTreeModelFromImport')
        : dispatch('initializeTreeModelFromOriginalTreeJson')
    },

    // @note - these are the only actions that are outside the realm of an existing tree.
    initializeTreeModelFromOriginalTreeJson({commit, dispatch, state: {ui}}) {
      commit('setWorkingTree', {tree: ui.originalTreeJson})
      // => this kinda sucks, because now we're dispatching vuex notifications for all these upgrades
      dispatch('upgradeTreeModel')
    },

    initializeTreeModelFromImport({commit, dispatch, state: {ui}}) {
      const schema = app.Tree.createJsonSchemaFor(
        _.pluck(ui.languages, 'id'),
        _.keys(ui.blockClasses),
      )
      const tree = app.Tree._mergeAndSanitizeImportedInto(ui.originalTreeJson, ui.importTreeJson)

      try {
        app.Tree.validateTreeData(tree, schema)
        console.debug('Tree validation succeeded!')

        commit('setWorkingTree', {tree})
        // todo: this kinda sucks, because now we're dispatching vuex notifications for all these upgrades
        dispatch('upgradeTreeModel')
        dispatch('attemptImportPersistence')
      } catch (validation) {
        console.error('Tree validation failed!', validation)
        ui.originalTreeJsonValidationResults = validation
        // default initialization solely because a tree is prerequisite to continuation
        dispatch('initializeTreeModelFromOriginalTreeJson')
      }
    },

    async attemptImportPersistence({
                                     dispatch, state: {
        ui, ui: {
          isTreeImport,
          originalTreeJsonValidationResults,
        },
      },
                                   }) {
      const hasImportValidationErrors = !!originalTreeJsonValidationResults
      if (!isTreeImport || hasImportValidationErrors) {
        return
      }

      // persist imported tree with valid json
      const validationResults = await dispatch('attemptSaveTree')
      console.debug('Tree import save validation results', validationResults)
      // hook into validation rendering that happens once view is initialized
      ui.originalValidationResults = validationResults
    },

    // Hoist data to adhere to latest expectations
    upgradeTreeModel() {
      app.tree.upgrade()
    },

    discoverTallestBlockForDesignerWorkspaceHeight({commit, dispatch, state}, {buffer = 350, aboveTallest}) {
      const
        initialHeight = aboveTallest ? app.tree.getTallestBlockPosition() : 0
      const minHeight = 1000
      const height = Math.max(buffer + initialHeight, minHeight)

      commit('setDesignerWorkspaceHeight', {height})
    },

    uiChanged(context, {msg}) {
      console.log('app.ui.change [via vuex.trees.uiChanged]', msg)
    },

    async attemptSaveTree({dispatch, getters: {hasChanges, isFeatureTreeSaveEnabled}, state: {ui}}) {
      if (!ui.isEditable || !hasChanges) {
        console.info('trees', 'Decided against unnecessary tree save!')
        // non-promise response implies no in-flight request -- aka no-op.
        return
      }

      if (!isFeatureTreeSaveEnabled) {
        console.info('Feature `treeSave` is disabled')
        return
      }

      /*
       * todo: we can't double-chain our jQuery adapter, unless we put more time into it -- then-ing off jQuery adapted
       *    results in another raw jQuery promise :P
       * todo: debounce this?
       */
      const {app} = global

      try {
        await dispatch('validateTree')
        dispatch('saveTree')
      } catch (error) {
        if (error instanceof ValidationError) {
          app.dataControl._setValidationResultsForUI(error.validationResults)
        } else {
          throw error
        }
      }
    },

    async saveTree() {
      // todo: we still need a timer for this on data change -- can this be done on a watcher rather than polling?
      const {app} = global
      await app.dataControl.send()
    },

    /**
     * Calls the supplied/injected validation function from __TREE_FEATURES__.validation.validate(), and returns the
     * array of validation results. This function is a pure function, and does not make changes to external data.
     *
     * @param dispatch
     * @param tree
     * @throws ValidationError If the validation fails, ValidationError will be thrown, which contains the
     *            ValidationResults
     * @returns {Promise<array>} a Promise that will return an array of the validation results.
     */
    async validateTree({dispatch, state: {tree}}) {
      const validate = lodash.get(global.__TREE_FEATURES__, 'validation.validate')
      if (validate) {
        await validate(tree)
      } else {
        await dispatch('validateFloipFlow')
      }
    },

    /**
     * Default Floip validation. If you want Floip Core validation to be run, your
     * __TREE_FEATURES__.validation.validate() function should call this one and add it's results to the value
     * returned from __TREE_FEATURES__.validation.validate(). This function is a pure function, and does not make
     * changes to external data.
     *
     * @throws ValidationError If the validation fails, ValidationError will be thrown, which contains the
     *            ValidationResults
     * @returns {Promise<array>} a Promise that will return an array of the validation results.
     */
    async validateFloipFlow() {
      /* TODO: (https://viamoinc.atlassian.net/browse/VMO-685) Create default FLOIP CORE Flow validation here and
       *   uncomment the below line after adding an implementation */
      // throw new ValidationError([])
    },

    setDefaultBlockRepeatValues({commit, dispatch, state: {tree}}, {jsKey, values: defaults}) {
      const block = lodash.find(tree.blocks, {jsKey})

      for (const key in defaults) {
        !(key in block.customData) && commit('updateBlockCustomDataFor', {jsKey, key, value: defaults[key]})
      }
    },

    updateTextContent({commit}, {
      type, jsKey, langId, value, disableAutoGen,
    }) {
      commit('updateBlockContentFor', {
        type, jsKey, langId, value,
      })
      commit('updateBlockAutoGenStateFor', {
        type, jsKey, langId, value: !disableAutoGen,
      })
      commit('updateReviewedStateFor', {jsKey, langId, value: false})
    },

    setContentFromQuestionText({commit, dispatch, state: {tree}}, {jsKey}) {
      const block = lodash.find(tree.blocks, {jsKey})

      let generatedText = block.customData.title
      let isFirst
      let maxDigits

      // todo: Let's not hand-roll pluralization — https://laravel.com/docs/5.4/localization#pluralization
      const grammar = {
        EN: {
          starter: 'Reply ',
          connector: ' for ',
          separator: ', ',
          conclusion: '.',
          numericStart: 'Reply with up to ',
          numericEndPlural: ' digits.',
          numericEndSingular: ' digit.',
          validationCode: 'Please reply with your unique code',
        },
      }

      if (tree.details.hasSms || tree.details.hasUssd || tree.details.hasSocial || tree.details.hasClipboard) {
        // todo: push these customizations into custom handlers on particular block types
        if (block.type == 'MultipleChoiceQuestionBlock' || block.type == 'CollaborativeFilteringRatingBlock') {
          generatedText += ` ${grammar.EN.starter}`
          isFirst = 1

          // choices values

          block.customData.choices.forEach((choice, index) => {
            if (isFirst != 1) {
              generatedText += grammar.EN.separator
            }
            generatedText += _.parseInt(index + 1) + grammar.EN.connector + choice
            isFirst = 0
          })

          generatedText += grammar.EN.conclusion
        } else if (block.type == 'LocationBlock') {
          generatedText += ` ${grammar.EN.starter}`
          isFirst = 1

          // this is likely choice's name prop

          block.customData.choices.forEach((choice, index) => {
            // choiceResponse = $('#' + $(e).attr('id') + '_primaryoption').val()
            if (isFirst != 1) {
              generatedText += grammar.EN.separator
            }

            generatedText += _.parseInt(index + 1) + grammar.EN.connector + choice.name
            isFirst = 0
          })

          generatedText += grammar.EN.conclusion
        } else if (block.type == 'NumericQuestionBlock') {
          maxDigits = lodash.get(block, 'customData.maxNumericDigits')
          if (!maxDigits) {
            maxDigits = 3
          }

          if (maxDigits == '1') {
            generatedText += ` ${grammar.EN.numericStart}${maxDigits}${grammar.EN.numericEndSingular}`
          } else {
            generatedText += ` ${grammar.EN.numericStart}${maxDigits}${grammar.EN.numericEndPlural}`
          }
        } else if (block.type == 'IdValidationBlock') {
          generatedText = grammar.EN.validationCode
        }

        lodash.forEach(['sms', 'ussd', 'social', 'clipboard'], (contentType) => {
          if (tree.details[`has${lodash.upperFirst(contentType)}`] && block[`${contentType}AutogenLangs`].length) {
            _.each(block[`${contentType}AutogenLangs`], (languageId) => {
              dispatch('updateTextContent', {
                type: contentType,
                jsKey: block.jsKey,
                langId: languageId,
                value: generatedText,
              })

              dispatch('uiChanged', `Updated ${contentType} Content with auto-gen text: ${generatedText}`)
            })
          }
        })
      }
    },

    setBlockNumConnections({commit, dispatch, state}, {value: newNumConnections, jsKey}) {
      console.debug('vuex.trees', 'setBlockNumConnections', newNumConnections, jsKey)

      // Remove any connection elements connected to the block
      // Remove the block from the UI
      // Change the data number of connections
      // Re-add the block to the UI
      // Re-display the connections going to it

      newNumConnections = _.parseInt(newNumConnections)

      // Make sure the new number of connections is a number
      if (!_.isFinite(newNumConnections)) {
        newNumConnections = 1
      }
      // Enforce appropriate limits on the number of connections:
      if (newNumConnections < 1) {
        newNumConnections = 1
      }

      const selectedBlockKey = jsKey || app.ui.selectedBlock
      const selectedBlock = app.tree.getBlock(selectedBlockKey)

      const {numConnections} = selectedBlock.uiData

      if (newNumConnections == numConnections) {
        // If there's no change, skip the intensive process of rebuilding all those connections
        console.log('No change in the number of connections.')
        return true
      }

      // Otherwise: change the connections!

      app.ui.lockConnections = 1

      // Remove the connections from each of the nodes at the bottom of the block
      _.each(_.range(1, numConnections + 1), (index) => {
        console.debug('Removing connections at', index, 'for', selectedBlockKey)
        // app.jsPlumb.detachAllConnections(selectedBlockKey + '_node_' + index);
      })

      // Remove any connections connected to the "target" / top of the block
      // Fortunately these call the jsPlumb binding for removing a connection
      // which in turn is set to remove the entry from the app.tree.get('connections') array. Yay!
      // app.jsPlumb.detachAllConnections(selectedBlockKey + '_target');

      // Update the actual block data to use the new number:
      selectedBlock.uiData.numConnections = newNumConnections

      // Remove any connections that are higher in outputKey (node) number than the new maximum numConnections:
      app.tree.filterBlockConnectionsAboveMax(selectedBlockKey)

      // Re-add disappeared connections?

      app.ui.lockConnections = 0

      // once in vuejs, can we'll be able to just do a [dis]connect via connections diff
      dispatch.bind(null, 'discoverTallestBlockForDesignerWorkspaceHeight', {aboveTallest: true})
      // app.jsPlumb.resetBindings(app.tree.get('connections'), true, selectedBlockKey, handleDragStop)

      app.ui.change('Changed number of block connections.')
    },

    setMcqOutputNames({commit, dispatch, state: {tree}}, {jsKey}) {
      console.debug('vuex.trees', 'setMcqOutputNames', jsKey)

      const block = lodash.find(tree.blocks, {jsKey})
      if (!block) {
        console.log('AppView::generateMcqOutputNamesFor()', 'Unable to find specified block.')
        return
      }

      const isOutputBranchingEnabled = !!block.customData.branching
      let outputNames

      if (isOutputBranchingEnabled) {
        if (block.type === 'SummaryBlock') {
          outputNames = [langJs.trans('trees.confirm'), langJs.trans('trees.reject')]
        } else {
          outputNames = lodash.clone(lodash.get(block, 'customData.choices', lodash.range(1, block.customData.numChoices + 1)))
        }
      } else {
        outputNames = [1]
      }

      commit('updateBlockCustomDataFor', {jsKey, key: 'numChoices', value: outputNames.length})

      const isNoResponseExitEnabled = block.customData.addExitForNoResponse
      isNoResponseExitEnabled && outputNames.push('trees.output-exit')

      commit('updateBlockUiDataFor', {jsKey, key: 'outputNames', value: outputNames})
      dispatch('setBlockNumConnections', {jsKey, value: outputNames.length})
    },

    setMcqSidebarFieldLabels({commit, dispatch, state: {tree}}, {jsKey}) {
      const block = lodash.find(tree.blocks, {jsKey})

      if (!block || !isMCQBlock(block)) {
        console.log('AppView::generateMcqOutputNamesFor()', 'Wrong block type')
        return
      }

      const isVoiceEnabled = tree.details.hasVoice
      const isTextChannelEnabled = tree.details.hasSms || tree.details.hasUssd || tree.details.hasSocial || tree.details.hasClipboard
      const hasChoiceKeypresses = !lodash.isEmpty(block.customData.choiceKeypresses)
      let fieldLabels

      if (isVoiceEnabled && !isTextChannelEnabled && hasChoiceKeypresses) {
        fieldLabels = getChoiceKeyPressesFor(block)
      } else if (isVoiceEnabled && isTextChannelEnabled && hasChoiceKeypresses) {
        fieldLabels = lodash.times(block.customData.numChoices, lodash.constant('•'))
      } else {
        fieldLabels = lodash.range(1, block.customData.numChoices + 1)
      }

      commit('updateBlockUiDataFor', {jsKey, key: 'fieldLabels', value: fieldLabels})
    },

    batchMatchAudioTriggered({commit, dispatch, state}, {treeId, pattern, replaceExisting}) {
      commit('setBatchMatchAudioResultsTo', {status: -1})

      return axios.post(routeFrom('trees.treesBatchLinkAudio', {treeId}, state.ui.routes), {pattern})
        .then(({data: {matches: value}}) => {
          commit('setBatchMatchAudioResultsTo', {status: 1, value})
          dispatch('commitAllBatchMatchAudioFiles', {replaceExisting})
        })
        .catch(({response: {data: {status_description: message}}}) => commit('setBatchMatchAudioResultsTo', {
          status: 0,
          message,
        }))
    },

    commitAllBatchMatchAudioFiles(
      {
        commit, dispatch, state: {
        ui: {
          batchMatchAudio: {
            isEmpty,
            results,
          },
        },
      },
      },
      {replaceExisting},
    ) {
      if (isEmpty) {
        return
      }

      lodash.forEach(results, (byLang, jsKey) => {
        lodash.forEach(byLang, (matches, langId) => {
          dispatch('commitBatchMatchAudioFile', {
            jsKey, langId, matches, replaceExisting,
          })
        })
      })

      dispatch('attemptSaveTree')
    },

    /** ------------------ | has-selection | no-selection | unchanged |
     | null   + no-replace | 0             | 1            | 0         |
     | single + no-replace | 0             | 1            | 0         |
     | multi  + no-replace | 0             | 0            | 0         |
     | null   + replace    | 1             | 1            | 0         |
     | single + replace    | 1             | 1            | 0         |
     | multi  + replace    | 0             | 0            | 0         |
     ---------------------------------------------------------------- */
    commitBatchMatchAudioFile(
      {commit, dispatch, state: {tree: {blocks}}},
      {
        jsKey, langId, matches, replaceExisting,
      },
    ) {
      const {audioFiles: {[langId]: audioFile}} = lodash.find(blocks, {jsKey})
      const hasSelection = !!audioFile
      const isMulti = lodash.get(matches, 'length', 0) > 1
      const match = lodash.get(matches, 0, null)
      const unchanged = lodash.get(audioFile, 'id') === lodash.get(match, 'id')

      if (unchanged || isMulti || (hasSelection && !replaceExisting)) {
        return
      }

      commit('updateAudioFileFor', {jsKey, langId, value: match})
      commit('updateReviewedStateFor', {jsKey, langId, value: false})
    },

    addSubscriberPropertyField({commit, dispatch, state}, {displayLabel, dataType, choices}) {
      return axios.post(routeFrom('trees.addSubscriberPropertyField', null, state.ui.routes), {displayLabel, dataType, choices})
        .then((response) => {
          lodash.filter(choices, (c) => !!c.value)
          commit('addSubscriberPropertyField', {property: response.data.data})
          return response
        })
    },

    setTreeUpdateConflictStatus({commit}, payload) {
      commit('setTreeUpdateConflictStatus', payload)
    },

    async fetchInteractionTotals({
                                   state, commit, dispatch, getters,
                                 }, {startDate, endDate}) {
      if (!getters.isFeatureUpdateInteractionTotalsEnabled) {
        console.info('Feature `updateInteractionTotals` is disabled')
        return
      }
      const key = 'interaction-totals'
      const url = routeFrom('trees.ajaxTotalInteractions', {treeId: state.tree.id}, state.ui.routes)
      const params = {startDate, endDate}

      const response = await dispatch('flights/createCancellableXhr', {key, url, params})
      if (response) {
        commit('setInteractionTotals', {interactionTotals: response.data})
      }
    },
  },
}

const getChoiceKeyPressesFor = (block) => {
  const keypresses = block.customData.choiceKeypresses
  return lodash.range(1, block.customData.numChoices + 1)
    .map((i) => keypresses[i] || i)
}

const isMCQBlock = (block) => block.type === 'MultipleChoiceQuestionBlock'
  || block.type === 'CollaborativeFilteringRatingBlock'
  || block.type === 'RandomOrderMultipleChoiceQuestionBlock'
