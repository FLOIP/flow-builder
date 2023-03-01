/* global Backbone */
import _ from 'lodash'

window.app = window.app || {};

(function (jQ) {
  app.ui = app.ui || {}
  app.ui.changes = 0

  app.ui.saveTimer = app.ui.saveTimer || 60
  app.ui.isSaveCurrentlyInProgress = false

  app.ui.removeClassPrefix = function (blockClassName) {
    return blockClassName.substr(11)
  }

  app.ui.change = function (textNotification) {
    console.log('app.ui.change', textNotification)

    const {selectedBlock} = builder.$store.getters

    if (!selectedBlock) {
      return
    }

    // Temporary legacy fix for when some customData properties are not reactive by default
    // because they don't yet exist in `15-trees-block-defaults.js`
    selectedBlock.customData = _.extend({}, selectedBlock.customData)
  }

  app.ui.noChange = function () {
    console.log('app.ui.nochange')
  }

  app.ui.changeLock = function () {
    app.ui.changes = -1
  }

  app.ui.findSubscriberPropertyField = function (search) {
    return _.find(app.ui.subscriberPropertyFields, search) || null
  }

  app.dataControl = {}
  app.dataControl.send = function () {
    if (!builder.$store.getters.isFeatureTreeSaveEnabled) {
      console.info('Feature `treeSave` is disabled')
      return
    }

    const outputData = JSON.stringify(app.tree)

    const treeId = app.tree.get('id')
    if (app.ui.isSaveCurrentlyInProgress === true) {
      console.log('Save currently in progress')
      return
    }

    const treeUpdatedConflict = builder.$store.state.trees.ui.treeUpdateConflict
    app.ui.isSaveCurrentlyInProgress = true

    app.audioChoice.setTopUpdatesBar(Lang.trans('trees.saving-tree'))
    app.dataControl._setValidationResultsForUI([])

    const requestData = {
      data: outputData,
    }
    if (treeUpdatedConflict !== null) {
      console.log('Update not currently possible')
      return false
    }

    const promise = jQ.post(`/ajax/trees/save/${treeId}`, requestData)
      .done((response) => {
        app.audioChoice.setTopUpdatesBar(Lang.trans('trees.tree-saved'), 1)
        // the person has been logged out
        if (typeof (response) !== 'object') {
          // spawn the modal
          jQ('#myModal')
            .modal({show: true, backdrop: 'static'})
        }

        app.ui.isSaveCurrentlyInProgress = false
        app.dataControl._setValidationResultsForUI(response.validation_results)

        // used to detect changes in vuejs

        app.ui.previousTreeJson = outputData
        app.ui.noChange()

        app.tree.updateFloipAlert()
      })
      .fail((response) => {
        if (response.status === 409) {
          // Dispatch an action to prevent further tree update until page is refreshed
          const payload = {
            treeUpdateConflict: {
              tree_id: treeId,
              message: response.responseJSON.message,
            },
          }
          builder.$store.dispatch('setTreeUpdateConflictStatus', payload)
        } else {
          console.error(response)
          app.audioChoice.setTopUpdatesBar(Lang.trans('trees.error-while-saving-tree'), 1)
        }
      })
      .always(() => {
        app.ui.isSaveCurrentlyInProgress = false
      })

    // Create Adapter from jQuery-promise-api to ES6-promise-api
    // so that it can be chained into vuex actions
    return _.defaults(promise, {
      then: promise.done,
      catch: promise.fail,
      finally: promise.always,
    })
  }

  app.dataControl._setValidationResultsForUI = function (validationResults) {
    app.ui.validationResults = validationResults || []
  }

  app.exportOptionsModal = {}
  app.exportOptionsModal.initialize = function () {
    const exportOptionsTemplate = _.template(JST['legacy/templates/export-options-template.html'])

    jQ('body')
      .append(exportOptionsTemplate())

    jQ('.tree-export-options-input')
      .change((e) => {
        app.exportOptionsModal.handleInput(e)
      })

    // Select the URL box text if clicked
    jQ('.tree-export-options-download-api-url')
      .focus(function () {
        this.select()
      })

    // Add datepickers for the time boxes
    jQ('.tree-export-options-input-datepicker')
      .datetimepicker({
        pickTime: false,
      })
    jQ('.tree-export-options-input-datepicker')
      .on('dp.change', (e) => {
        jQ(e.currentTarget)
          .trigger('change')
      })

    // Kickoff the process to build the link URL!
    jQ('.tree-export-options-input')
      .first()
      .trigger('change')
  }

  app.exportOptionsModal.open = function () {
    if (jQ('#export-options-modal').length == 0) {
      app.exportOptionsModal.initialize()
    }

    // Show the modal.
    jQ('#export-options-modal')
      .modal()
  }

  app.exportOptionsModal.handleInput = function (e) {
    const value = jQ(e.currentTarget)
      .val()
    const key = jQ(e.currentTarget)
      .attr('data-export-options-key')

    if (key == 'dateFilter') {
      if (value == '1') {
        jQ('.export-options-date-filter-container')
          .show()
      } else {
        jQ('.export-options-date-filter-container')
          .hide()

        // Reset the values so they don't get serialized if hidden
        jQ('.tree-export-options-input[data-export-options-key=callsAfter]')
          .val('')
        jQ('.tree-export-options-input[data-export-options-key=callsBefore]')
          .val('')
      }
    }

    jQ('.tree-export-options-download-link')
      .attr('href', app.exportOptionsModal.buildUrl())
    jQ('.tree-export-options-download-api-url')
      .val(app.exportOptionsModal.buildUrl(1))
  }

  app.exportOptionsModal.buildUrl = function (isApiUrl) {
    let url = `/trees/${app.ui.treeId}/exportcsv?`

    if (isApiUrl) {
      url = `${window.location.protocol}//${window.location.host}/api/v1/trees/${app.ui.treeId}/csvexport/direct?`
    }

    url += jQ('.tree-export-options-input')
      .serialize()

    if (isApiUrl) {
      url += `&api_key=${app.ui.apiKey}`
    }

    return url
  }

  // Initial version of the shareable link modal,
  // for a specific single tree:
  app.shareableLinkModal = {}
  app.shareableLinkModal.initialize = function () {
    const shareableLinkTemplate = _.template(JST['legacy/templates/shareable-link-template.html'])

    jQ('body')
      .append(shareableLinkTemplate())

    // Select the URL box text if clicked
    jQ('.tree-shareable-link-url')
      .focus(function () {
        this.select()
      })

    // Assign button clicks
    jQ('.tree-shareable-link-generate-button')
      .on('click', (e) => {
        app.shareableLinkModal.sendRequest('create')
      })
    jQ('.tree-shareable-link-delete-button')
      .on('click', (e) => {
        app.shareableLinkModal.switchView('delete')
      })
    jQ('.tree-shareable-link-delete-confirm-button')
      .on('click', (e) => {
        app.shareableLinkModal.sendRequest('delete')
      })
    jQ('.tree-shareable-link-delete-cancel-button')
      .on('click', (e) => {
        app.shareableLinkModal.switchView('edit')
      })

    if (app.ui.publicId) {
      // If there's already a public ID, then show the "edit" view
      app.shareableLinkModal.setUrl()
      app.shareableLinkModal.switchView('edit')
    } else {
      app.shareableLinkModal.switchView('new')
    }
  }

  app.shareableLinkModal.switchView = function (view) {
    jQ('.shareable-link-delete')
      .hide()
    jQ('.shareable-link-edit')
      .hide()
    jQ('.shareable-link-new')
      .hide()
    jQ(`.shareable-link-${view}`)
      .show()
  }

  app.shareableLinkModal.open = function (e) {
    if (jQ('#shareable-link-modal').length == 0) {
      app.shareableLinkModal.initialize()
    }

    // Show the modal.
    jQ('#shareable-link-modal')
      .modal()
  }

  app.shareableLinkModal.buildUrl = function () {
    let url = ''
    if (app.ui.publicId) {
      url = `${window.location.protocol}//${window.location.host}/share/a/trees/${app.ui.publicId}`
    }
    return url
  }

  app.shareableLinkModal.setUrl = function () {
    const url = app.shareableLinkModal.buildUrl()
    jQ('.tree-shareable-link-url')
      .val(url)
    jQ('.tree-shareable-link-url-link')
      .attr('href', url)
  }

  app.shareableLinkModal.sendRequest = function (requestType) {
    jQ.post(`/ajax/trees/updateshareablelink/${app.ui.treeId}`, {type: requestType})
      .done((response) => {
        if (response) {
          // New one!
          app.ui.publicId = response

          app.shareableLinkModal.setUrl()
          app.shareableLinkModal.switchView('edit')
        } else {
          app.ui.publicId = ''
          app.shareableLinkModal.switchView('new')
        }

        return true
      })
      .fail((response) => {
        const errorMessage = response.responseJSON || 'Error while updating shareable link...'
        app.audioChoice.setTopUpdatesBar(errorMessage, 1)
      })
  }

  // Updated version of the shareable link modal,
  // for tree sets rather than specific trees!

  app.shareableLinkSetsModal = {}
  app.shareableLinkSetsModal.initialize = function () {
    const shareableLinkTemplate = _.template(JST['legacy/templates/shareable-link-sets-template.html'])

    jQ('body')
      .append(shareableLinkTemplate({
        defaultLocales: builder.$store.state.defaultLocales,
        orgEnabledLanguages: builder.$store.state.orgEnabledLanguages,
      }))

    // Assign button clicks
    jQ('.tree-shareable-link-sets-generate-button')
      .on('click', (e) => {
        app.shareableLinkSetsModal.sendRequest('create')
      })

    jQ('input[name=shouldUseCustomBlockOrdering]')
      .on('click', function () {
        if (jQ(this)
          .is(':checked')) {
          jQ('.block-ordinal')
            .prop('disabled', false)
        } else {
          jQ('.block-ordinal')
            .prop('disabled', true)
        }
      })

    jQ('select[name=\'lockDateRange\']')
      .on('change', function () {
        if (this.value === '1') {
          jQ('.hide-on-lockDateRange')
            .hide()
        } else {
          jQ('.hide-on-lockDateRange')
            .show()
        }
      })

    // Initialize the second half with the list of existing links:
    app.shareableLinkSetsModal.initializeLinksList()
  }

  app.shareableLinkSetsModal.initializeLinksList = function () {
    const shareableLinkListTemplate = _.template(JST['legacy/templates/shareable-link-sets-list-template.html'])
    jQ('.shareable-link-sets-list-container')
      .html(shareableLinkListTemplate)

    jQ('.tree-shareable-link-sets-delete-button')
      .on('click', (e) => {
        app.shareableLinkSetsModal.switchToDeleteView(e)
      })
    jQ('.tree-shareable-link-sets-delete-confirm-button')
      .on('click', (e) => {
        const shareableLinkHash = jQ(e.currentTarget)
          .attr('data-link-hash')
        app.shareableLinkSetsModal.sendRequest('delete', shareableLinkHash)
      })
    jQ('.tree-shareable-link-sets-delete-cancel-button')
      .on('click', (e) => {
        app.shareableLinkSetsModal.switchAwayFromDeleteView(e)
      })
  }

  app.shareableLinkSetsModal.switchToDeleteView = function (e) {
    const shareableLinkId = jQ(e.currentTarget)
      .attr('data-link-id')
    const listElement = jQ(`.shareable-link-item-div[data-link-id=${shareableLinkId}]`)

    if (jQ(listElement)
      .hasClass('list-group-item-danger')) {
      app.shareableLinkSetsModal.switchAwayFromDeleteView(e)
    } else {
      jQ(listElement)
        .addClass('list-group-item-danger')
      jQ(listElement)
        .children('.shareable-link-item-div-delete')
        .show()
    }
  }

  app.shareableLinkSetsModal.switchAwayFromDeleteView = function (e) {
    const shareableLinkId = jQ(e.currentTarget)
      .attr('data-link-id')
    const listElement = jQ(`.shareable-link-item-div[data-link-id=${shareableLinkId}]`)

    jQ(listElement)
      .removeClass('list-group-item-danger')
    jQ(listElement)
      .children('.shareable-link-item-div-delete')
      .hide()
  }

  app.shareableLinkSetsModal.open = function (e) {
    if (jQ('#shareable-link-sets-modal').length == 0) {
      app.shareableLinkSetsModal.initialize()
    }

    // Re-set the labels
    app.shareableLinkSetsModal.setLabelValues()

    // Show the modal.
    jQ('#shareable-link-sets-modal')
      .modal()
  }

  app.shareableLinkSetsModal.setLabelValues = function () {
    // TODO - use another mini-template for these guys rather than updating text values with jQuery.
    const startDateLabel = app.startDate.format('MMMM D, YYYY')
    const endDateLabel = app.endDate.format('MMMM D, YYYY')
    const channelLabel = app.labels.channel
    const blocksLabel = app.labels.blocks

    if (app.params.versionFiltersEnabled) {
      jQ('.shareable-link-sets-versions-label')
        .show()
    } else {
      jQ('.shareable-link-sets-versions-label')
        .hide()
    }

    if (app.params.noValidDateRange) {
      jQ('.shareable-link-sets-date-range-labels')
        .hide()
      jQ('.shareable-link-sets-date-range-all-time-label')
        .show()
    } else {
      jQ('span.sl-label-start-date')
        .text(startDateLabel)
      jQ('span.sl-label-end-date')
        .text(endDateLabel)
    }

    jQ('span.sl-label-channel')
      .text(channelLabel)
    jQ('span.sl-label-blocks')
      .text(blocksLabel)

    jQ('span.sl-label-versions')
      .text(`${app.labels.versionsSelected} of ${app.labels.versionsTotal}`)
  }

  app.shareableLinkSetsModal.buildUrl = function (public_hash) {
    let url = ''
    if (public_hash) {
      url = `${window.location.protocol}//${window.location.host}/share/a/trees/${public_hash}`
    }
    return url
  }

  app.shareableLinkSetsModal.sendRequest = function (requestType, shareableLinkHash) {
    if (requestType == 'delete') {
      var sendRequest = {
        requestType,
        shareableLinkHash,
      }
    } else {
      var sendRequest = {
        requestType,
        channelFilter: app.params.channelFilter,
        includedBlocks: app.params.includedBlocks,
        excludedBlocks: app.params.excludedBlocks,
        blockKeys: app.blockKeys,
        hiddenDirectorySelectionFields: app.params.hiddenDirectorySelectionFields,
        lockDateRange: _.parseInt(jQ('.shareable-link-sets-input[name=lockDateRange]')
          .val()),
        resultsLocale: jQ('.shareable-link-sets-input[name=resultsLocale]')
          .val(),
        showKeyMetrics: jQ('.shareable-link-sets-input[name=showKeyMetrics]')
          .is(':checked') ? '1' : '0',
        showBlockType: jQ('.shareable-link-sets-input[name=showBlockType]')
          .is(':checked') ? '1' : '0',
        shouldShowResultsFromIncompleteEngagements: jQ('.shareable-link-sets-input[name=shouldShowResultsFromIncompleteEngagements]')
          .is(':checked') ? '1' : '0',
        shouldOnlyShowLatestResultPerSession: jQ('.shareable-link-sets-input[name=shouldOnlyShowLatestResultPerSession]')
          .is(':checked') ? '1' : '0',
        shouldUseSimpleDatePicker: jQ('.shareable-link-sets-input[name=shouldUseSimpleDatePicker]')
          .is(':checked') ? '1' : '0',
        shouldUseCustomBlockOrdering: jQ('.shareable-link-sets-input[name=shouldUseCustomBlockOrdering]')
          .is(':checked') ? '1' : '0',
        enabledTabs: jQ('input[name=enabledTabs]:checked')
          .map((i, el) => jQ(el)
            .val())
          .get(),
        tagFilter: jQ('input[name=tagFilter]:checked')
          .map((i, el) => jQ(el)
            .val())
          .get(),
        directorySelectionFieldFilter: jQ('input[name=directorySelectionFieldFilter]:checked')
          .map((i, el) => jQ(el)
            .val())
          .get(),
        blockChoiceFilter: jQ('input[name=blockChoiceFilter]:checked')
          .map((i, el) => jQ(el)
            .val())
          .get(),
        filterDisplayThreshold: jQ('input[name=filterDisplayThreshold]')
          .val(),
      }

      if (jQ('.shareable-link-sets-input[name=shouldUseCustomBlockOrdering]')
        .is(':checked')) {
        sendRequest.customBlockOrder = _.reduce(
          jQ('.block-ordinal')
            .toArray(),
          (memo, el) => {
            memo[jQ(el)
              .data('js-key')] = jQ(el)
              .val()
            return memo
          },
          {},
        )
      }

      if (app.params.noValidDateRange == false) {
        sendRequest.startDate = app.startDate.format('YYYY-MM-DD')
        sendRequest.endDate = app.endDate.format('YYYY-MM-DD')
      }

      if (app.params.versionFiltersEnabled) {
        sendRequest.versions = app.params.versions
      }
    }

    jQ.post(`/ajax/treeversionsets/updateshareablelink/${app.tree_version_set_id}`, {data: sendRequest})
      .done((response) => {
        if (requestType == 'delete') {
          if (response == 1) {
            // Remove the entry with that hash from the local JS list
            app.shareableLinks = _.without(
              app.shareableLinks,
              _.findWhere(app.shareableLinks, {public_hash: shareableLinkHash}),
            )
            // Initialize the second half with the list of existing links:
            app.shareableLinkSetsModal.initializeLinksList()
          }
        } else {
          // Add the new response to the start of the shareable links array:
          app.shareableLinks.unshift(response)

          // Initialize the second half with the list of existing links:
          app.shareableLinkSetsModal.initializeLinksList()
        }
        return true
      })
      .fail((response) => {
        const errorMessage = response.responseJSON || 'Error while updating shareable link...'
        app.audioChoice.setTopUpdatesBar(errorMessage, 1)
      })
  }

  // csvExports modal helper functions
  app.csvExportsModal = {}
  app.csvExportsModal.initialize = function () {
    const csvExportTemplate = _.template(JST['legacy/templates/combined-csv-export-template.html'])

    jQ('body')
      .append(csvExportTemplate())

    // Assign button clicks
    jQ('.tree-csv-exports-generate-button')
      .on('click', (e) => {
        app.csvExportsModal.sendCreateRequest()
      })

    // var to check when default
    let setToDefault = true
    // set recipes – a string of values of customisable fields
    // headings-cells-mcq-messages
    const recipeHumanReadable = '0000'
    const recipeMachineReadable = '1112'
    let recipeUserCustomised = null

    // get selected options for export from users
    function getUserOptionsRecipe() {
      const fhd = (jQ('.csv-exports-option-format-headings')
        .val()) ? jQ('.csv-exports-option-format-headings')
        .val() : '0'
      const fcc = (jQ('.csv-exports-option-format-cells')
        .val()) ? jQ('.csv-exports-option-format-cells')
        .val() : '0'
      const vcq = (jQ('.csv-exports-option-values-mcq')
        .val()) ? jQ('.csv-exports-option-values-mcq')
        .val() : '0'
      const vms = (jQ('.csv-exports-option-values-messages')
        .val()) ? jQ('.csv-exports-option-values-messages')
        .val() : '0'

      return fhd + fcc + vcq + vms
    }

    // remove active class from all
    jQ('[class*=csv-exports-btn-format-]')
      .click(() => {
        jQ('[class*=csv-exports-btn-format-]')
          .removeClass('btn-primary active')
          .addClass('btn-secondary')
      })

    // when human-readable is selected
    jQ('.csv-exports-btn-format-human')
      .click(function () {
        setToDefault = false
        jQ(this)
          .addClass('btn-primary active')
          .removeClass('btn-secondary')
        jQ('.csv-exports-option-format-headings option')
          .eq('0')
          .prop('selected', 'selected')
        jQ('.csv-exports-option-format-cells option')
          .eq('0')
          .prop('selected', 'selected')
        jQ('.csv-exports-option-values-mcq option')
          .eq('0')
          .prop('selected', 'selected')
        jQ('.csv-exports-option-values-messages option')
          .eq('0')
          .prop('selected', 'selected')
      })

    // when machine-readable is selected
    jQ('.csv-exports-btn-format-machine')
      .click(function () {
        setToDefault = false
        jQ(this)
          .addClass('btn-primary active')
          .removeClass('btn-secondary')
        jQ('.csv-exports-option-format-headings option')
          .eq('1')
          .prop('selected', 'selected')
        jQ('.csv-exports-option-format-cells option')
          .eq('1')
          .prop('selected', 'selected')
        jQ('.csv-exports-option-values-mcq option')
          .eq('1')
          .prop('selected', 'selected')
        jQ('.csv-exports-option-values-messages option')
          .eq('2')
          .prop('selected', 'selected')
      })

    // when custom is selected
    jQ('.csv-exports-btn-format-custom')
      .click(function () {
        setToDefault = false
        jQ(this)
          .addClass('btn-primary active')
          .removeClass('btn-secondary')
      })

    // when we are to use default – use human-readable
    if (setToDefault) {
      jQ('.csv-exports-btn-format-human')
        .trigger('click')
    }

    // on change check what options have been selected
    jQ('[class*=csv-exports-option-]')
      .change(() => {
        setToDefault = false
        recipeUserCustomised = getUserOptionsRecipe()

        // if customRecipe is neither machine-readable NOR human-readable then it is custom
        if (recipeUserCustomised) {
          if (recipeUserCustomised == recipeHumanReadable) {
            jQ('.csv-exports-btn-format-human')
              .trigger('click')
          } else if (recipeUserCustomised == recipeMachineReadable) {
            jQ('.csv-exports-btn-format-machine')
              .trigger('click')
          } else {
            setToDefault = false
            jQ('[class*=csv-exports-btn-format-]')
              .removeClass('btn-primary active')
              .addClass('btn-secondary')
            jQ('.csv-exports-btn-format-custom')
              .addClass('btn-primary active')
              .removeClass('btn-secondary')
          }
        }
      })

    // Initialize the second half with the list of existing links:
    app.csvExportsModal.initializeLinksList()
  }

  app.csvExportsModal.initializeLinksList = function () {
    if (typeof app.csvExportsModal.shareableLinkListTemplate === 'undefined') {
      app.csvExportsModal.shareableLinkListTemplate = _.template(JST['legacy/templates/combined-csv-export-list-template.html'])
    }
    jQ('.csv-exports-list-container')
      .html(app.csvExportsModal.shareableLinkListTemplate())
    app.csvExportsModal.queueInProgress()
  }

  app.csvExportsModal.open = function (e) {
    if (jQ('#combined-csv-export-modal').length == 0) {
      app.csvExportsModal.initialize()
    }

    app.csvExportsModal.setLabelValues()
    jQ('#combined-csv-export-modal')
      .modal()
  }

  app.csvExportsModal.setLabelValues = function () {
    // TODO - use another mini-template for these guys, rather than updating text values with jQuery.
    const startDateLabel = app.startDate.format('MMMM D, YYYY')
    const endDateLabel = app.endDate.format('MMMM D, YYYY')
    const channelLabel = app.labels.channel
    const blocksLabel = app.labels.blocks

    if (app.params.versionFiltersEnabled) {
      jQ('.export-version-sets-versions-label')
        .show()
    } else {
      jQ('.export-version-sets-versions-label')
        .hide()
    }

    if (app.params.noValidDateRange) {
      jQ('.csv-exports-date-range-labels')
        .hide()
      jQ('.csv-exports-date-range-all-time-label')
        .show()
    } else {
      jQ('span.sl-label-start-date')
        .text(startDateLabel)
      jQ('span.sl-label-end-date')
        .text(endDateLabel)
    }

    jQ('span.sl-label-channel')
      .text(channelLabel)
    jQ('span.sl-label-blocks')
      .text(blocksLabel)

    jQ('span.sl-label-versions')
      .text(`${app.labels.versionsSelected} of ${app.labels.versionsTotal}`)
  }

  app.csvExportsModal.sendStatusRequest = function () {
    jQ.ajax({
      url: `/ajax/treeversionsets/csvexportstatus/${app.tree_version_set_id}`,
      type: 'GET',
      dataType: 'json',
      success(response) {
        app.csvExports = response
        app.csvExportsModal.initializeLinksList()
      },
    })
  }

  app.csvExportsModal.sendCreateRequest = function () {
    const sendRequest = {
      channelFilter: app.params.channelFilter,
      includedBlocks: app.params.includedBlocks,
      excludedBlocks: app.params.excludedBlocks,
      blockKeys: app.blockKeys,
      order: jQ('.csv-exports-input[name=order]')
        .val(),
      formatHeadings: jQ('.csv-exports-input[name=formatHeadings]')
        .val(),
      cellContents: jQ('.csv-exports-input[name=cellContents]')
        .val(),
      messageBlockPercent: jQ('.csv-exports-input[name=messageBlockPercent]')
        .val(),
      formatMCQResponses: jQ('.csv-exports-input[name=formatMCQResponses]')
        .val(),
      treeVersionIds: app.params.versions,
      mergeOption: jQ('.csv-exports-input[name=mergeOption]')
        .val(),
      useLocalTimezone: jQ('.csv-exports-input[name=useLocalTimezone]')
        .val(),
      useExcelFormat: jQ('.csv-exports-input[name=useExcelFormat]')
        .val(),
    }

    if (app.params.noValidDateRange == false) {
      sendRequest.startDate = app.startDate.format('YYYY-MM-DD')
      sendRequest.endDate = app.endDate.format('YYYY-MM-DD')
    }

    const treeVersionSetId = app.tree_version_set_id

    // time of export click

    const then = moment()
    // Re-enable time will be after 5s
    const thenAfter5s = then.clone()
      .add(5, 'seconds')
    jQ('.tree-csv-exports-generate-button')
      .prop('disabled', true)
    jQ.post(`/ajax/treeversionsets/csvexportstart/${treeVersionSetId}`, {data: sendRequest})
      .done((response) => {
        app.csvExports = response
        app.csvExportsModal.initializeLinksList()
        return true
      })
      .fail((response) => {
        console.error(response)
        app.audioChoice.setTopUpdatesBar('Error while sending CSV request...', 1)
      })
      .always((response) => {
        // Re-enable the export button
        // Estimate the right delay in case the request has been processed in less than 5s
        const delay = moment.duration(thenAfter5s.diff(moment()))
        const delayInMilliseconds = delay > 0 ? delay.asMilliseconds() : 0
        _.delay(() => {
          jQ('.tree-csv-exports-generate-button')
            .prop('disabled', false)
        }, delayInMilliseconds)
      })
  }

  app.csvExportsModal.queueInProgress = function () {
    const firstExportInProgress = _.find(app.csvExports, {upload_status: 0})

    // If necessary, create a de-bounced version of the Ajax status check function
    if (_.isFunction(app.csvExportsModal.sendStatusRequestDebounced) == false) {
      app.csvExportsModal.sendStatusRequestDebounced = _.debounce(app.csvExportsModal.sendStatusRequest, 1000)
    }

    if (firstExportInProgress) {
      _.delay(app.csvExportsModal.sendStatusRequestDebounced, 0.5 * 1000)
    }
  }

  app.blockResultsLoader = {}
  app.blockResultsLoader.load = function () {
    const nextBlockKeyToLoad = jQ('.tree-results-block-container[data-is-loaded=0]')
      .first()
      .attr('id')

    jQ('.tree-results-loading-indicators')
      .show()

    if (nextBlockKeyToLoad) {
      app.blockResultsLoader.loadBlock(nextBlockKeyToLoad, 1)
    } else {
      jQ('.tree-results-loading-indicators')
        .hide()
    }
  }

  app.blockResultsLoader.assignButtons = function (parentElement) {
    jQ(parentElement)
      .find('.result-view-control-tab')
      .on('click', (e) => {
        const targetType = jQ(e.currentTarget)
          .attr('data-tab-option')
        jQ(parentElement)
          .find('.tree-results-item-tabs')
          .hide()
        jQ(parentElement)
          .find(`.tree-results-item-${targetType}`)
          .show()
      })
    jQ(parentElement)
      .find('.result-view-control-tab')
      .first()
      .trigger('click')
  }

  app.blockResultsLoader.loadBlock = function (blockKey, continueLoading) {
    let url
    if (app.shareableLink) {
      url = window.location.pathname

      // Check if there's already a query string
      if (window.location.search) {
        url += `${window.location.search}&blockKey=${blockKey}`
      } else {
        url += `?blockKey=${blockKey}`
      }
    } else {
      url = `/ajax/trees/set/${app.tree_version_set_id}/results/${blockKey}${window.location.search}`
    }

    jQ.ajax({
      url,
      type: 'GET',
      dataType: 'json',
      success(data) {
        if (data.htmlOutput) {
          // Place the HTML output into the container DIV
          // TODO - this should actually use client-side templates, once the item results template is converted back.
          _.each(data.htmlOutput, (value, key) => {
            jQ(`#${key}`)
              .attr('data-is-loaded', 1)
              .html(value)

            // Assign buttons for tab switching:
            app.blockResultsLoader.assignButtons(jQ(`#${key}`))
          })

          // Generate Chart.js-based charts:
          app.chartJsHelper.createCharts()

          if (continueLoading) {
            // Check if there are more blocks to load!
            app.blockResultsLoader.load()
          }
        }
      },
    })
  }

  app.blockResultsLoaderV2 = {}
  app.blockResultsLoaderV2.loadKeyMetrics = function () {
    let url

    if (app.shareableLink) {
      // Check if there's already a query string
      url = window.location.search
        ? `${window.location.pathname + window.location.search}&keymetrics=1`
        : `${window.location.pathname}?keymetrics=1`
    } else {
      url = `/ajax/trees/set/${app.tree_version_set_id}/results/keymetrics${window.location.search}`
    }

    jQ.post(url, {filterSet: _.get(viamo, '$store.state.publicApp.filterSet', [])})
      .done((keymetrics) => {
        if (keymetrics) {
          app.blockResultsLoaderV2.loadDonutChart(
            'connected',
            keymetrics.finishedDeliveryLogCount,
            keymetrics.deliveryLogCount,
          )
          jQ('#print-connected-values')
            .html(`${keymetrics.finishedDeliveryLogCount} Connected of ${keymetrics.deliveryLogCount} Calls`)

          app.blockResultsLoaderV2.loadDonutChart(
            'completed',
            keymetrics.completedDeliveryLogCount,
            keymetrics.deliveryLogCount,
          )
          jQ('#print-completed-values')
            .html(`${keymetrics.completedDeliveryLogCount} Completed of ${keymetrics.deliveryLogCount} Calls`)

          app.blockResultsLoaderV2.loadDonutChart(
            'unique',
            keymetrics.uniqueSubscriberCount,
            keymetrics.deliveryLogCount,
          )
          jQ('#print-unique-value')
            .html(`${keymetrics.uniqueSubscriberCount} Unique Subscribers`)

          app.blockResultsLoaderV2.loadDonutChart(
            'firsttime',
            keymetrics.firstTimeSubscriberCount,
            keymetrics.uniqueSubscriberCount,
          )
          jQ('#print-firsttime-value')
            .html(`${keymetrics.firstTimeSubscriberCount} First Time Subscribers`)

          app.blockResultsLoaderV2.loadDonutChart('answered', keymetrics.completedQuestionCount, 0)
          jQ('#print-answered-value')
            .html(`${keymetrics.completedQuestionCount} Question Responses`)

          if (jQ('#tree-results-keymetrics-durations').length > 0) {
            app.blockResultsLoaderV2.loadAvgCallDurations(keymetrics)
          }
        }
      })
      .fail((response) => {
        console.error(response)
        jQ('.doughnut-charts-row')
          .html(`<h4 class="text-danger text-center">${JSON.parse(response.responseText)}</h4>`)
      })
  }

  app.blockResultsLoaderV2.loadDonutChart = function (keymetricName, chartNumerator, chartTotal) {
    const chartDenominator = (chartTotal === 0) ? 0 : chartTotal - chartNumerator

    const chartDataSets = {
      labels: [
        '',
        '',
      ],
      datasets: [
        {
          data: [
            chartNumerator,
            chartDenominator,
          ],
          backgroundColor: [
            '#333',
            '#999',
          ],
          hoverBackgroundColor: [
            '#333',
            '#999',
          ],
          borderColor: [
            '#333',
            '#999',
          ],
        },
      ],
    }

    jQ(`#tree-results-loading-indicator-doughnut-${keymetricName}`)
      .hide()

    app.chartJsHelper.updateTreeDoughnutChart(`v-chart-tree-doughnut-${keymetricName}`, chartDataSets)

    // Set Chart's dynamic label as visible and set its span html with the value
    if (chartTotal >= 0) {
      jQ(`#tree-doughnut-total-${keymetricName}`)
        .html(formatLargeNumber(chartTotal))
        .parent()
        .removeClass('hidden')
    }
  }

  app.blockResultsLoaderV2.loadAvgCallDurations = function (durations) {
    if (durations) {
      // TODO what iv durationAvg or completedDurationAvg = 0 or don't exist?
      jQ('#tree-results-duration-all')
        .html(`${(durations.durationAvg / 60).toPrecision(2)} minutes`)
      jQ('#tree-results-duration-completed')
        .html(`${(durations.completedDurationAvg / 60).toPrecision(2)} minutes`)
      jQ('#tree-results-keymetrics-duration')
        .show()
    }

    jQ('#tree-results-loading-indicator-durations')
      .hide()
    jQ('.tree-results-duration-item')
      .css('visibility', 'visible')
  }

  app.blockResultsLoaderV2.loadBlocksInteractionsChart = function () {
    const barchartLabelsTruncated = []
    const barchartLabels = []
    const totalInteractionsBarchartData = []
    const completedInteractionsBarchartData = []
    const orderedCompletedInteractionsBarchartData = []
    var totalInteractionsOrderedBarchartData = []
    const colorIndexes = []
    const orderedColorIndexes = []
    const orderedBarchartLabelsTruncated = []
    const orderedBarchartLabels = []
    var totalInteractionsOrderedBarchartData = []

    _.each(app.resultsData, (blockResult, key) => {
      let truncatedBlockTitle
      let resultIndex
      let colorIndex
      let totalInteractions
      let completedInteractions
      let
        colorValue
      const blockTitle = _.get(blockResult, 'details.title') || _.get(blockResult, 'classDetails.name') || ''

      truncatedBlockTitle = blockTitle.length < 9 ? blockTitle : `${blockTitle.substring(0, 9)}...`
      colorIndex = blockResult.colorIndex
      colorValue = app.chartJsHelper.getChartChoiceColorsArray(colorIndex)[0]
      totalInteractions = blockResult.totalInteractions

      // outputKeys is either an empty array, or has one or more objects.
      completedInteractions = blockResult.outputKeys.reduce((acc, val) => acc + val.outputKeyTotals, 0)

      // Listing-ordered arrays
      barchartLabels.push(blockTitle)
      barchartLabelsTruncated.push(truncatedBlockTitle)
      colorIndexes.push(colorValue)
      totalInteractionsBarchartData.push(totalInteractions)
      completedInteractionsBarchartData.push(completedInteractions)

      // Popularity-ordered arrays. Callback fn applies descending order.
      resultIndex = _.sortedIndex(orderedCompletedInteractionsBarchartData, completedInteractions, (i) => -i)
      orderedBarchartLabels.splice(resultIndex, 0, blockTitle)
      orderedBarchartLabelsTruncated.splice(resultIndex, 0, truncatedBlockTitle)
      orderedColorIndexes.splice(resultIndex, 0, colorValue)
      orderedCompletedInteractionsBarchartData.splice(resultIndex, 0, completedInteractions)
      totalInteractionsOrderedBarchartData.splice(resultIndex, 0, totalInteractions)
    })

    app.chartJsHelper.updateTreeBlocksInteractionsChart('v-chart-tree-blocks-popularity', {
      labels: orderedBarchartLabelsTruncated,
      fullLabels: orderedBarchartLabels,
      datasets: [
        {
          data: orderedCompletedInteractionsBarchartData,
          backgroundColor: orderedColorIndexes,
          borderColor: orderedColorIndexes,
          borderWidth: 1,
        },
        {
          hidden: true,
          data: totalInteractionsOrderedBarchartData,
          backgroundColor: orderedColorIndexes,
          borderColor: orderedColorIndexes,
          borderWidth: 1,
        },
      ],
    })

    app.chartJsHelper.updateTreeBlocksInteractionsChart('v-chart-tree-blocks-listing', {
      labels: barchartLabelsTruncated,
      fullLabels: barchartLabels,
      datasets: [
        {
          data: completedInteractionsBarchartData,
          backgroundColor: colorIndexes,
          borderColor: colorIndexes,
          borderWidth: 1,
        },
        {
          hidden: true,
          data: totalInteractionsBarchartData,
          backgroundColor: colorIndexes,
          borderColor: colorIndexes,
          borderWidth: 1,
        },
      ],
    })

    app.blockResultsLoaderV2.assignButtons(jQ('#tree-summary-container'))
  }

  app.blockResultsLoaderV2.assignButtons = function (parentElement) {
    jQ(parentElement)
      .find('.tree-interactions-barcharts-toggle-button')
      .on('click', (e) => {
        const $buttonClicked = jQ(e.currentTarget)
        const barchartTarget = $buttonClicked.attr('data-section-option')

        if ($buttonClicked.hasClass('active')) {
          return
        }

        $buttonClicked.siblings()
          .removeClass('active')
        $buttonClicked.addClass('active')

        // Hide and show the relevant Bar Chart
        jQ('canvas[id^=\'v-chart-tree-blocks-\']')
          .hide()
        jQ(`#v-chart-tree-blocks-${barchartTarget}`)
          .show()

        jQ('#order-by-active-label-print')
          .html(`Order By: ${$buttonClicked.attr('aria-label')}`)

        // Render any charts that haven't been rendered yet. Checks if data-generated==0 attribute.
        app.chartJsHelper.createCharts()
        jQ('#v-chart-tree-blocks-listing')
          .removeClass('hidden')
      })

    jQ(parentElement)
      .find('input[name="barchart-dataset-toggle"]')
      .on('click', (e) => {
        const barchartDatasetTarget = jQ(e.currentTarget)
          .attr('value')

        // Note that the barchart-dataset-toggle Buttons are not specific to one Chart
        const listingChart = app.chartJsHelper.chartObjects['v-chart-tree-blocks-listing']
        const popularityChart = app.chartJsHelper.chartObjects['v-chart-tree-blocks-popularity']

        const listingDatasets = listingChart.config.data.datasets
        const popularityDatasets = popularityChart.config.data.datasets
        const isEnteredSelected = barchartDatasetTarget == 'entered'
        const isCompletedSelected = barchartDatasetTarget == 'completed'

        if (isCompletedSelected) {
          jQ('#tree-summary-barchart-title')
            .html('Completed Interactions per Block')
        } else {
          jQ('#tree-summary-barchart-title')
            .html('Entered Interactions per Block')
        }

        listingDatasets[0].hidden = isEnteredSelected
        listingDatasets[1].hidden = isCompletedSelected
        popularityDatasets[0].hidden = isEnteredSelected
        popularityDatasets[1].hidden = isCompletedSelected

        listingChart.update()
        popularityChart.update()
      })
    jQ(parentElement)
      .find('.result-view-section-button')
      .on('click', (e) => {
        const tabTarget = jQ(e.currentTarget)
          .attr('data-section-option')
        const tabLabel = jQ(e.currentTarget)
          .text()

        jQ(e.currentTarget)
          .closest('.result-view-section-control-container')
          .find('.sub-report-type-title')
          .html(tabLabel == '╳'
            ? 'Timeline: Total Interactions'
            : `Timeline: ${tabLabel}`)

        if (jQ(e.currentTarget)
          .hasClass('active')) {
          console.log(`Already on the ${tabLabel} section`)
          return
        }
        jQ(e.currentTarget)
          .siblings()
          .removeClass('active')
        jQ(e.currentTarget)
          .addClass('active')

        // Hide and show the relevant section
        jQ(parentElement)
          .find('.tree-results-item-tab-section')
          .hide()
        jQ(parentElement)
          .find(`.tree-results-item-tab-section[data-section-id=${tabTarget}]`)
          .show()

        // Render any charts that haven't been rendered yet
        app.chartJsHelper.createCharts()
      })

    jQ(parentElement)
      .find('.result-normalize-cb')
      .on('click', (e) => {
        const chartTarget = jQ(e.currentTarget)
          .attr('data-chart-type')
        let doNormalize = 0
        let targetElement

        if (jQ(e.currentTarget)
          .is(':checked')) {
          doNormalize = 1
        }

        // Hide and show the relevant section
        targetElement = jQ(parentElement)
          .find(`canvas[data-chart-type=${chartTarget}]`)

        // Set normalize to the new value, and set is-generated to 0, to queue up a re-rendering of the chart:
        jQ(targetElement)
          .attr('data-normalize', doNormalize)
          .attr('data-generated', 0)

        // Render any charts that haven't been rendered yet
        app.chartJsHelper.createCharts()
      })
  }

  app.combinedVersions = {}
  app.combinedVersions.assignButtons = function () {
    jQ('.tree-results-versions-select-button')
      .on('click', (e) => {
        // Make sure the element lines up underneath the "Versions" button
        // This is a bit awkward, since we're right aligned and not in
        // a position:absolute setting, so we'll actually add in the
        // width of the (variable) daterangepicker to a fixed value:
        const rightPosition = _.parseInt(jQ('#reportrange')
          .width() + jQ('.tree-results-gear-menu')
          .width() - jQ('.tree-results-versions-select-button')
          .width() / 2) - 4
        jQ('.tree-results-versions-selector')
          .css({right: rightPosition})

        jQ('.tree-results-versions-selector')
          .toggle()

        // Prevent clicks on the body element that would re-hide it.
        e.stopPropagation()
      })

    jQ('.tree-results-versions-selector')
      .on('click', (e) => {
        // Prevent clicks on the body element that would re-hide it.
        // This also protects clicks on the other elements within the dropdown.
        e.stopPropagation()
      })

    jQ('.tree-results-versions-select-all-link')
      .on('click', (e) => {
        // jQ('.tree-results-versions-selector').toggle();
        jQ('.tree-results-versions-selector input[type=checkbox]')
          .prop('checked', true)
          .trigger('change')
      })
    jQ('.tree-results-versions-select-none-link')
      .on('click', (e) => {
        // jQ('.tree-results-versions-selector').toggle();
        jQ('.tree-results-versions-selector input[type=checkbox]')
          .prop('checked', false)
          .trigger('change')
      })

    jQ('.tree-results-versions-selector input[type=checkbox]')
      .on('change', (e) => {
        jQ('.tree-results-versions-apply-button')
          .prop('disabled', false)
      })

    jQ('.tree-results-versions-apply-button')
      .on('click', (e) => {
        // Delete any existing version entries in the filter form, before adding the selected ones:
        jQ('#filter-form input[name^=versions]')
          .remove()

        // With thanks to
        // http://stackoverflow.com/questions/2530635/jquery-add-additional-parameters-on-submit-not-ajax#comment22923873_2531379
        jQ('.tree-results-versions-selector input[type=checkbox]:checked')
          .each(function () {
            // return jQ(this).val()
            const input = jQ('<input>', {
              type: 'hidden',
              name: 'versions[]',
              value: jQ(this)
                .val(),
            })
            jQ('#filter-form')
              .append(jQ(input))
          })

        jQ('#filter-form')
          .submit()
      })

    // If the selector is open, hide it by clicking on the open space,
    // just like for dropdown menus.
    jQ('body')
      .on('click', (e) => {
        jQ('.tree-results-versions-selector')
          .hide()
      })

    jQ('.tree-results-versions-selector')
      .hide()
  }

  app.combinedVersions = _.assign({}, app.combinedVersions, window.combinedVersions)
}(window.jQuery))
