
/*global Backbone */
window.app = window.app || {};


(function($) {

	app.ui = app.ui || {};
	app.ui.changes = 0;

	app.ui.saveTimer = app.ui.saveTimer || 60;
	app.ui.saveCurrentlyInProgress = 0;

	app.ui.removeClassPrefix = function(blockClassName) {

		return blockClassName.substr(11);

	};

	app.ui.change = function(textNotification) {
    console.log('app.ui.change', textNotification);

    var selectedBlock = builder.$store.getters.selectedBlock

    if (!selectedBlock) {return}

    // Temporary legacy fix for when some customData properties are not reactive by default
    // because they don't yet exist in `15-trees-block-defaults.js`
    selectedBlock.customData = _.extend({}, selectedBlock.customData)
  };

	app.ui.noChange = function() {
    console.log('app.ui.nochange');
  };

	app.ui.changeLock = function() {
		app.ui.changes = -1;
	};

	app.ui.findSubscriberPropertyField = function(search) {
		return _.find(app.ui.subscriberPropertyFields, search) || null
	};

	app.dataControl = {};
	app.dataControl.send = function () {
    if (!builder.$store.getters.isFeatureTreeSaveEnabled) {
      console.info('Feature `treeSave` is disabled')
      return
    }

    var outputData = JSON.stringify(app.tree);

		var treeId = app.tree.get('id');
		if (app.ui.saveCurrentlyInProgress == 1) {
			console.log('Save currently in progress');
			return;
		}

		var treeUpdatedConflict = builder.$store.state.trees.ui.treeUpdateConflict;
		app.ui.saveCurrentlyInProgress = 1;

		app.audioChoice.setTopUpdatesBar(Lang.trans('trees.saving-tree'));
		app.dataControl._setValidationResultsForUI([]);

    var requestData = {
    	data: outputData,
		};
    if (treeUpdatedConflict !== null) {
			console.log('Update not currently possible');
			return false;
		}

		var promise = $.post('/ajax/trees/save/' + treeId, requestData)
			.done(function (response) {
        app.audioChoice.setTopUpdatesBar(Lang.trans('trees.tree-saved'), 1);
        //the person has been logged out
        if (typeof (response) != "object") {
          //spawn the modal
          $("#myModal").modal({show: true, backdrop: 'static'});
        }

        app.ui.saveCurrentlyInProgress = 0;
				app.dataControl._setValidationResultsForUI(response.validation_results);

        app.ui.previousTreeJson = outputData; // used to detect changes in vuejs
        app.ui.noChange();

        app.tree.updateFloipAlert();
      })
			.fail(function (response) {
				if (response.status === 409) {
					// Dispatch an action to prevent further tree update until page is refreshed
					var payload = {
						treeUpdateConflict: {
							tree_id: treeId,
							message: response.responseJSON.message,
						}
					};
					builder.$store.dispatch('setTreeUpdateConflictStatus', payload);
				} else {
					console.error(response)
					app.audioChoice.setTopUpdatesBar(Lang.trans('trees.error-while-saving-tree'), 1);
				}
			})
			.always(function () {
				app.ui.saveCurrentlyInProgress = 0;
			});

		// Create Adapter from jQuery-promise-api to ES6-promise-api
		// so that it can be chained into vuex actions
		return _.defaults(promise, {
			then: promise.done,
			catch: promise.fail,
			finally: promise.always,
		})
	};

	app.dataControl._setValidationResultsForUI = function(validationResults) {
    app.ui.validationResults = validationResults || [];
  };

  app.exportOptionsModal = {}
  app.exportOptionsModal.initialize = function () {
    var exportOptionsTemplate = _.template(JST["legacy/templates/export-options-template.html"])

    $('body').append(exportOptionsTemplate())

    $('.tree-export-options-input').change(function (e) {
      app.exportOptionsModal.handleInput(e)
    })

    // Select the URL box text if clicked
    $('.tree-export-options-download-api-url').focus(function () {
      this.select()
    })

    // Add datepickers for the time boxes
    $('.tree-export-options-input-datepicker').datetimepicker({
      pickTime: false
    })
    $('.tree-export-options-input-datepicker').on('dp.change', function (e) {
      $(e.currentTarget).trigger('change')
    })

    // Kickoff the process to build the link URL!
    $('.tree-export-options-input').first().trigger('change')
  }

  app.exportOptionsModal.open = function () {
    if ($('#export-options-modal').length == 0) {
      app.exportOptionsModal.initialize()
    }

    // Show the modal.
    $('#export-options-modal').modal()
  }

  app.exportOptionsModal.handleInput = function (e) {
    var value = $(e.currentTarget).val()
    var key = $(e.currentTarget).attr('data-export-options-key')

    if (key == 'dateFilter') {
      if (value == '1') {
        $('.export-options-date-filter-container').show()
      } else {
        $('.export-options-date-filter-container').hide()

        // Reset the values so they don't get serialized if hidden
        $('.tree-export-options-input[data-export-options-key=callsAfter]').val('')
        $('.tree-export-options-input[data-export-options-key=callsBefore]').val('')
      }
    }

    $('.tree-export-options-download-link').attr('href', app.exportOptionsModal.buildUrl())
    $('.tree-export-options-download-api-url').val(app.exportOptionsModal.buildUrl(1))
  }

  app.exportOptionsModal.buildUrl = function (isApiUrl) {
    var url = "/trees/" + app.ui.treeId + "/exportcsv?";

    if (isApiUrl) {
      url = window.location.protocol + "//" + window.location.host + "/api/v1/trees/" + app.ui.treeId + "/csvexport/direct?";
    }

    url += $('.tree-export-options-input').serialize()

    if (isApiUrl) {
      url += "&api_key=" + app.ui.apiKey;
    }

    return url
  }

  // Initial version of the shareable link modal,
  // for a specific single tree:
  app.shareableLinkModal = {}
  app.shareableLinkModal.initialize = function () {
    var shareableLinkTemplate = _.template(JST["legacy/templates/shareable-link-template.html"])

    $('body').append(shareableLinkTemplate())

    // Select the URL box text if clicked
    $('.tree-shareable-link-url').focus(function () {
      this.select()
    })

    // Assign button clicks
    $('.tree-shareable-link-generate-button').on('click', function (e) {
      app.shareableLinkModal.sendRequest('create')
    })
    $('.tree-shareable-link-delete-button').on('click', function (e) {
      app.shareableLinkModal.switchView('delete')
    })
    $('.tree-shareable-link-delete-confirm-button').on('click', function (e) {
      app.shareableLinkModal.sendRequest('delete')
    })
    $('.tree-shareable-link-delete-cancel-button').on('click', function (e) {
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
    $('.shareable-link-delete').hide()
    $('.shareable-link-edit').hide()
    $('.shareable-link-new').hide()
    $(".shareable-link-" + view).show()
  }

  app.shareableLinkModal.open = function (e) {
    if ($('#shareable-link-modal').length == 0) {
      app.shareableLinkModal.initialize()
    }

    // Show the modal.
    $('#shareable-link-modal').modal()
  }

  app.shareableLinkModal.buildUrl = function () {
    var url = ''
    if (app.ui.publicId) {
      url = window.location.protocol + "//" + window.location.host + "/share/a/trees/" + app.ui.publicId;
    }
    return url
  }

  app.shareableLinkModal.setUrl = function () {
    var url = app.shareableLinkModal.buildUrl()
    $('.tree-shareable-link-url').val(url)
    $('.tree-shareable-link-url-link').attr('href', url)
  }

  app.shareableLinkModal.sendRequest = function (requestType) {
    $.post("/ajax/trees/updateshareablelink/" + app.ui.treeId, {type: requestType})
        .done(function (response) {
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
        .fail(function (response) {
          var errorMessage = response.responseJSON || 'Error while updating shareable link...'
          app.audioChoice.setTopUpdatesBar(errorMessage, 1)
        })
  }

  // Updated version of the shareable link modal,
  // for tree sets rather than specific trees!

  app.shareableLinkSetsModal = {}
  app.shareableLinkSetsModal.initialize = function () {
    var shareableLinkTemplate = _.template(JST["legacy/templates/shareable-link-sets-template.html"])

    $('body').append(shareableLinkTemplate({
      defaultLocales: builder.$store.state.defaultLocales,
      orgEnabledLanguages: builder.$store.state.orgEnabledLanguages,
    }))

    // Assign button clicks
    $('.tree-shareable-link-sets-generate-button').on('click', function (e) {
      app.shareableLinkSetsModal.sendRequest('create')
    })

    $('input[name=shouldUseCustomBlockOrdering]').on('click', function () {
      if ($(this).is(':checked')) {
        $('.block-ordinal').prop('disabled', false)
      } else {
        $('.block-ordinal').prop('disabled', true)
      }
    })

    $("select[name='lockDateRange']").on('change', function () {
      if (this.value === '1') {
        $(".hide-on-lockDateRange").hide()
      } else {
        $(".hide-on-lockDateRange").show()
      }
    })

    // Initialize the second half with the list of existing links:
    app.shareableLinkSetsModal.initializeLinksList()
  }

  app.shareableLinkSetsModal.initializeLinksList = function () {
    var shareableLinkListTemplate = _.template(JST["legacy/templates/shareable-link-sets-list-template.html"])
    $('.shareable-link-sets-list-container').html(shareableLinkListTemplate)

    $('.tree-shareable-link-sets-delete-button').on('click', function (e) {
      app.shareableLinkSetsModal.switchToDeleteView(e)
    })
    $('.tree-shareable-link-sets-delete-confirm-button').on('click', function (e) {
      var shareableLinkHash = $(e.currentTarget).attr('data-link-hash')
      app.shareableLinkSetsModal.sendRequest('delete', shareableLinkHash)
    })
    $('.tree-shareable-link-sets-delete-cancel-button').on('click', function (e) {
      app.shareableLinkSetsModal.switchAwayFromDeleteView(e)
    })
  }

  app.shareableLinkSetsModal.switchToDeleteView = function (e) {
    var shareableLinkId = $(e.currentTarget).attr('data-link-id')
    var listElement = $(".shareable-link-item-div[data-link-id=" + shareableLinkId + "]")

    if ($(listElement).hasClass('list-group-item-danger')) {
      app.shareableLinkSetsModal.switchAwayFromDeleteView(e)
    } else {
      $(listElement).addClass('list-group-item-danger')
      $(listElement).children('.shareable-link-item-div-delete').show()
    }

  }

  app.shareableLinkSetsModal.switchAwayFromDeleteView = function (e) {
    var shareableLinkId = $(e.currentTarget).attr('data-link-id')
    var listElement = $(".shareable-link-item-div[data-link-id=" + shareableLinkId + "]")

    $(listElement).removeClass('list-group-item-danger')
    $(listElement).children('.shareable-link-item-div-delete').hide()
  }

  app.shareableLinkSetsModal.open = function (e) {
    if ($('#shareable-link-sets-modal').length == 0) {
      app.shareableLinkSetsModal.initialize()
    }

    // Re-set the labels
    app.shareableLinkSetsModal.setLabelValues()

    // Show the modal.
    $('#shareable-link-sets-modal').modal()
  }

  app.shareableLinkSetsModal.setLabelValues = function () {
    // TODO - use another mini-template for these guys rather than updating text values with jQuery.
    var startDateLabel = app.startDate.format('MMMM D, YYYY')
    var endDateLabel = app.endDate.format('MMMM D, YYYY')
    var channelLabel = app.labels.channel
    var blocksLabel = app.labels.blocks

    if (app.params.versionFiltersEnabled) {
      $('.shareable-link-sets-versions-label').show()
    } else {
      $('.shareable-link-sets-versions-label').hide()
    }

    if (app.params.noValidDateRange) {
      $('.shareable-link-sets-date-range-labels').hide()
      $('.shareable-link-sets-date-range-all-time-label').show()
    } else {
      $('span.sl-label-start-date').text(startDateLabel)
      $('span.sl-label-end-date').text(endDateLabel)
    }

    $('span.sl-label-channel').text(channelLabel)
    $('span.sl-label-blocks').text(blocksLabel)

    $('span.sl-label-versions').text(app.labels.versionsSelected + " of " + app.labels.versionsTotal)
  }

  app.shareableLinkSetsModal.buildUrl = function (public_hash) {
    var url = ''
    if (public_hash) {
      url = window.location.protocol + "//" + window.location.host + "/share/a/trees/" + public_hash;
    }
    return url
  }

  app.shareableLinkSetsModal.sendRequest = function (requestType, shareableLinkHash) {
    if (requestType == 'delete') {
      var sendRequest = {
        requestType: requestType,
        shareableLinkHash: shareableLinkHash
      }
    } else {
      var sendRequest = {
        requestType: requestType,
        channelFilter: app.params.channelFilter,
        includedBlocks: app.params.includedBlocks,
        excludedBlocks: app.params.excludedBlocks,
        blockKeys: app.blockKeys,
        hiddenDirectorySelectionFields: app.params.hiddenDirectorySelectionFields,
        lockDateRange: _.parseInt($('.shareable-link-sets-input[name=lockDateRange]').val()),
        resultsLocale: $('.shareable-link-sets-input[name=resultsLocale]').val(),
        showKeyMetrics: $('.shareable-link-sets-input[name=showKeyMetrics]').is(':checked') ? '1' : '0',
        showBlockType: $('.shareable-link-sets-input[name=showBlockType]').is(':checked') ? '1' : '0',
				shouldShowResultsFromIncompleteEngagements: $('.shareable-link-sets-input[name=shouldShowResultsFromIncompleteEngagements]').is(':checked') ? '1' : '0',
				shouldOnlyShowLatestResultPerSession: $('.shareable-link-sets-input[name=shouldOnlyShowLatestResultPerSession]').is(':checked') ? '1' : '0',
				shouldUseSimpleDatePicker: $('.shareable-link-sets-input[name=shouldUseSimpleDatePicker]').is(':checked') ? '1' : '0',
				shouldUseCustomBlockOrdering: $('.shareable-link-sets-input[name=shouldUseCustomBlockOrdering]').is(':checked') ? '1' : '0',
        enabledTabs: $('input[name=enabledTabs]:checked')
            .map(function (i, el) {
              return $(el).val()
            })
            .get(),
        tagFilter: $('input[name=tagFilter]:checked')
            .map(function (i, el) {
              return $(el).val()
            })
            .get(),
        directorySelectionFieldFilter: $('input[name=directorySelectionFieldFilter]:checked')
            .map(function (i, el) {
              return $(el).val()
            })
            .get(),
        blockChoiceFilter: $('input[name=blockChoiceFilter]:checked')
            .map(function (i, el) {
              return $(el).val()
            })
            .get(),
        filterDisplayThreshold: $('input[name=filterDisplayThreshold]').val(),
      }

      if ($('.shareable-link-sets-input[name=shouldUseCustomBlockOrdering]').is(':checked')) {
        sendRequest['customBlockOrder'] = _.reduce($('.block-ordinal').toArray(),
            function (memo, el) {
              memo[$(el).data('js-key')] = $(el).val()
              return memo
            },
            {})
      }

      if (app.params.noValidDateRange == false) {
        sendRequest.startDate = app.startDate.format('YYYY-MM-DD')
        sendRequest.endDate = app.endDate.format('YYYY-MM-DD')
      }

      if (app.params.versionFiltersEnabled) {
        sendRequest.versions = app.params.versions
      }
    }

    $.post("/ajax/treeversionsets/updateshareablelink/" + app.tree_version_set_id, {data: sendRequest})
        .done(function (response) {
          if (requestType == 'delete') {
            if (response == 1) {
              // Remove the entry with that hash from the local JS list
              app.shareableLinks = _.without(app.shareableLinks,
                  _.findWhere(app.shareableLinks, {public_hash: shareableLinkHash}))
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
        .fail(function (response) {
          var errorMessage = response.responseJSON || 'Error while updating shareable link...'
          app.audioChoice.setTopUpdatesBar(errorMessage, 1)
        })
  }

  // csvExports modal helper functions
  app.csvExportsModal = {}
  app.csvExportsModal.initialize = function () {
    var csvExportTemplate = _.template(JST["legacy/templates/combined-csv-export-template.html"])

    $('body').append(csvExportTemplate())

    // Assign button clicks
    $('.tree-csv-exports-generate-button').on('click', function (e) {
      app.csvExportsModal.sendCreateRequest()
    })

    // var to check when default
    var setToDefault = true
    // set recipes – a string of values of customisable fields
    // headings-cells-mcq-messages
    var recipeHumanReadable = '0000'
    var recipeMachineReadable = '1112'
    var recipeUserCustomised = null

    // get selected options for export from users
    function getUserOptionsRecipe() {
      var fhd = ($(".csv-exports-option-format-headings").val()) ? $(".csv-exports-option-format-headings").val() : '0'
      var fcc = ($(".csv-exports-option-format-cells").val()) ? $(".csv-exports-option-format-cells").val() : '0'
      var vcq = ($(".csv-exports-option-values-mcq").val()) ? $(".csv-exports-option-values-mcq").val() : '0'
      var vms = ($(".csv-exports-option-values-messages").val()) ? $(".csv-exports-option-values-messages").val() : '0'

      return fhd + fcc + vcq + vms
    }

    // remove active class from all
    $("[class*=csv-exports-btn-format-]").click(function () {
      $("[class*=csv-exports-btn-format-]").removeClass('btn-primary active').addClass('btn-secondary')
    })

    // when human-readable is selected
    $(".csv-exports-btn-format-human").click(function () {
      setToDefault = false
      $(this).addClass('btn-primary active').removeClass('btn-secondary')
      $(".csv-exports-option-format-headings option").eq('0').prop('selected', 'selected')
      $(".csv-exports-option-format-cells option").eq('0').prop('selected', 'selected')
      $(".csv-exports-option-values-mcq option").eq('0').prop('selected', 'selected')
      $(".csv-exports-option-values-messages option").eq('0').prop('selected', 'selected')
    })

    // when machine-readable is selected
    $(".csv-exports-btn-format-machine").click(function () {
      setToDefault = false
      $(this).addClass('btn-primary active').removeClass('btn-secondary')
      $(".csv-exports-option-format-headings option").eq('1').prop('selected', 'selected')
      $(".csv-exports-option-format-cells option").eq('1').prop('selected', 'selected')
      $(".csv-exports-option-values-mcq option").eq('1').prop('selected', 'selected')
      $(".csv-exports-option-values-messages option").eq('2').prop('selected', 'selected')
    })

    // when custom is selected
    $(".csv-exports-btn-format-custom").click(function () {
      setToDefault = false
      $(this).addClass('btn-primary active').removeClass('btn-secondary')
    })

    // when we are to use default – use human-readable
    if (setToDefault) {
      $(".csv-exports-btn-format-human").trigger('click')
    }

    // on change check what options have been selected
    $("[class*=csv-exports-option-]").change(function () {
      setToDefault = false
      recipeUserCustomised = getUserOptionsRecipe()

      // if customRecipe is neither machine-readable NOR human-readable then it is custom
      if (recipeUserCustomised) {
        if (recipeUserCustomised == recipeHumanReadable) {
          $(".csv-exports-btn-format-human").trigger('click')
        } else if (recipeUserCustomised == recipeMachineReadable) {
          $(".csv-exports-btn-format-machine").trigger('click')
        } else {
          setToDefault = false
          $("[class*=csv-exports-btn-format-]").removeClass('btn-primary active').addClass('btn-secondary')
          $(".csv-exports-btn-format-custom").addClass('btn-primary active').removeClass('btn-secondary')
        }
      }
    })

    // Initialize the second half with the list of existing links:
    app.csvExportsModal.initializeLinksList()
  }

  app.csvExportsModal.initializeLinksList = function () {
    if (typeof app.csvExportsModal.shareableLinkListTemplate == 'undefined') {
      app.csvExportsModal.shareableLinkListTemplate = _.template(JST["legacy/templates/combined-csv-export-list-template.html"])
    }
    $('.csv-exports-list-container').html(app.csvExportsModal.shareableLinkListTemplate())
    app.csvExportsModal.queueInProgress()
  }

  app.csvExportsModal.open = function (e) {
    if ($('#combined-csv-export-modal').length == 0) {
      app.csvExportsModal.initialize()
    }

    app.csvExportsModal.setLabelValues()
    $('#combined-csv-export-modal').modal()
  }

  app.csvExportsModal.setLabelValues = function () {
    // TODO - use another mini-template for these guys, rather than updating text values with jQuery.
    var startDateLabel = app.startDate.format('MMMM D, YYYY')
    var endDateLabel = app.endDate.format('MMMM D, YYYY')
    var channelLabel = app.labels.channel
    var blocksLabel = app.labels.blocks

    if (app.params.versionFiltersEnabled) {
      $('.export-version-sets-versions-label').show()
    } else {
      $('.export-version-sets-versions-label').hide()
    }

    if (app.params.noValidDateRange) {
      $('.csv-exports-date-range-labels').hide()
      $('.csv-exports-date-range-all-time-label').show()
    } else {
      $('span.sl-label-start-date').text(startDateLabel)
      $('span.sl-label-end-date').text(endDateLabel)
    }

    $('span.sl-label-channel').text(channelLabel)
    $('span.sl-label-blocks').text(blocksLabel)

    $('span.sl-label-versions').text(app.labels.versionsSelected + " of " + app.labels.versionsTotal)
  }

  app.csvExportsModal.sendStatusRequest = function () {
    $.ajax({
      url: "/ajax/treeversionsets/csvexportstatus/" + app.tree_version_set_id,
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        app.csvExports = response
        app.csvExportsModal.initializeLinksList()
      }
    })
  }

  app.csvExportsModal.sendCreateRequest = function () {
    var sendRequest = {
      channelFilter: app.params.channelFilter,
      includedBlocks: app.params.includedBlocks,
      excludedBlocks: app.params.excludedBlocks,
      blockKeys: app.blockKeys,
      order: $('.csv-exports-input[name=order]').val(),
      formatHeadings: $('.csv-exports-input[name=formatHeadings]').val(),
      cellContents: $('.csv-exports-input[name=cellContents]').val(),
      messageBlockPercent: $('.csv-exports-input[name=messageBlockPercent]').val(),
      formatMCQResponses: $('.csv-exports-input[name=formatMCQResponses]').val(),
      treeVersionIds: app.params.versions,
      mergeOption: $('.csv-exports-input[name=mergeOption]').val(),
      useLocalTimezone: $('.csv-exports-input[name=useLocalTimezone]').val(),
      useExcelFormat: $('.csv-exports-input[name=useExcelFormat]').val()
    }

    if (app.params.noValidDateRange == false) {
      sendRequest.startDate = app.startDate.format('YYYY-MM-DD')
      sendRequest.endDate = app.endDate.format('YYYY-MM-DD')
    }

    var treeVersionSetId = app.tree_version_set_id

    var then = moment(); // time of export click
    var thenAfter5s = then.clone().add(5, 'seconds') // Re-enable time will be after 5s
    $('.tree-csv-exports-generate-button').prop( "disabled", true)
    $.post("/ajax/treeversionsets/csvexportstart/" + treeVersionSetId, {data: sendRequest})
        .done(function (response) {
          app.csvExports = response
          app.csvExportsModal.initializeLinksList()
          return true
        })
        .fail(function (response) {
          console.error(response)
          app.audioChoice.setTopUpdatesBar('Error while sending CSV request...', 1)
        })
        .always(function (response) {
          // Re-enable the export button
          // Estimate the right delay in case the request has been processed in less than 5s
          var delay = moment.duration(thenAfter5s.diff(moment()))
          var delayInMilliseconds = delay > 0 ? delay.asMilliseconds() : 0
          _.delay(function() {
            $('.tree-csv-exports-generate-button').prop( "disabled", false)
          }, delayInMilliseconds);
        })
  }

  app.csvExportsModal.queueInProgress = function () {
    var firstExportInProgress = _.find(app.csvExports, {upload_status: 0})

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
    var nextBlockKeyToLoad = $('.tree-results-block-container[data-is-loaded=0]').first().attr('id')

    $('.tree-results-loading-indicators').show()

    if (nextBlockKeyToLoad) {
      app.blockResultsLoader.loadBlock(nextBlockKeyToLoad, 1)
    } else {
      $('.tree-results-loading-indicators').hide()
    }
  }

  app.blockResultsLoader.assignButtons = function (parentElement) {
    $(parentElement).find('.result-view-control-tab').on('click', function (e) {
      var targetType = $(e.currentTarget).attr('data-tab-option')
      $(parentElement).find('.tree-results-item-tabs').hide()
      $(parentElement).find(".tree-results-item-" + targetType).show()
    })
    $(parentElement).find('.result-view-control-tab').first().trigger('click')
  }

  app.blockResultsLoader.loadBlock = function (blockKey, continueLoading) {
    var url
    if (app.shareableLink) {
      url = window.location.pathname

      // Check if there's already a query string
      if (window.location.search) {
        url += window.location.search + '&blockKey=' + blockKey
      } else {
        url += '?blockKey=' + blockKey
      }
    } else {
      url = '/ajax/trees/set/' + app.tree_version_set_id + '/results/' + blockKey + window.location.search
    }

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        if (data.htmlOutput) {
          // Place the HTML output into the container DIV
          // TODO - this should actually use client-side templates, once the item results template is converted back.
          _.each(data.htmlOutput, function (value, key) {
            $('#' + key).attr('data-is-loaded', 1).html(value)

            // Assign buttons for tab switching:
            app.blockResultsLoader.assignButtons($('#' + key))
          })

          // Generate Chart.js-based charts:
          app.chartJsHelper.createCharts()

          if (continueLoading) {
            // Check if there are more blocks to load!
            app.blockResultsLoader.load()
          }
        }
      }
    })
  }

  app.blockResultsLoaderV2 = {}
  app.blockResultsLoaderV2.loadKeyMetrics = function () {
    var url

    if (app.shareableLink) {
      // Check if there's already a query string
      url = window.location.search
          ? window.location.pathname + window.location.search + "&keymetrics=1"
          : window.location.pathname + '?keymetrics=1'
    } else {
      url = '/ajax/trees/set/' + app.tree_version_set_id + '/results/keymetrics' + window.location.search
    }

    $.post(url, {filterSet: _.get(viamo, '$store.state.publicApp.filterSet', [])})
        .done(function (keymetrics) {
          if (keymetrics) {

            app.blockResultsLoaderV2.loadDonutChart('connected',
                keymetrics.finishedDeliveryLogCount,
                keymetrics.deliveryLogCount)
            $("#print-connected-values").html(keymetrics.finishedDeliveryLogCount + " Connected of " + keymetrics.deliveryLogCount + " Calls")

            app.blockResultsLoaderV2.loadDonutChart('completed',
                keymetrics.completedDeliveryLogCount,
                keymetrics.deliveryLogCount)
            $("#print-completed-values").html(keymetrics.completedDeliveryLogCount + " Completed of " + keymetrics.deliveryLogCount + " Calls")

            app.blockResultsLoaderV2.loadDonutChart('unique',
                keymetrics.uniqueSubscriberCount,
                keymetrics.deliveryLogCount)
            $("#print-unique-value").html(keymetrics.uniqueSubscriberCount + " Unique Subscribers")

            app.blockResultsLoaderV2.loadDonutChart('firsttime',
                keymetrics.firstTimeSubscriberCount,
                keymetrics.uniqueSubscriberCount)
            $("#print-firsttime-value").html(keymetrics.firstTimeSubscriberCount + " First Time Subscribers")

            app.blockResultsLoaderV2.loadDonutChart('answered', keymetrics.completedQuestionCount, 0)
            $("#print-answered-value").html(keymetrics.completedQuestionCount + " Question Responses")

            if ($('#tree-results-keymetrics-durations').length > 0) {
              app.blockResultsLoaderV2.loadAvgCallDurations(keymetrics)
            }
          }
        })
        .fail(function (response) {
          console.error(response)
          $(".doughnut-charts-row").html('<h4 class="text-danger text-center">' + JSON.parse(response.responseText) + '</h4>')
        })
  }

  app.blockResultsLoaderV2.loadDonutChart = function (keymetricName, chartNumerator, chartTotal) {
    var chartDenominator = (chartTotal === 0) ? 0 : chartTotal - chartNumerator

    var chartDataSets = {
      labels: [
        "",
        ""
      ],
      datasets: [
        {
          data: [
            chartNumerator,
            chartDenominator
          ],
          backgroundColor: [
            "#333",
            "#999"
          ],
          hoverBackgroundColor: [
            "#333",
            "#999"
          ],
          borderColor: [
            "#333",
            "#999"
          ],
        }
      ]
    }

    $('#tree-results-loading-indicator-doughnut-' + keymetricName).hide()

    app.chartJsHelper.updateTreeDoughnutChart('v-chart-tree-doughnut-' + keymetricName, chartDataSets)

    // Set Chart's dynamic label as visible and set its span html with the value
    if (chartTotal >= 0) {
      $('#tree-doughnut-total-' + keymetricName).html(formatLargeNumber(chartTotal)).parent().removeClass('hidden')
    }
  }

  app.blockResultsLoaderV2.loadAvgCallDurations = function (durations) {
    if (durations) {
      // TODO what iv durationAvg or completedDurationAvg = 0 or don't exist?
      $('#tree-results-duration-all').html((durations.durationAvg / 60).toPrecision(2) + " minutes")
      $('#tree-results-duration-completed').html((durations.completedDurationAvg / 60).toPrecision(2) + ' minutes')
      $('#tree-results-keymetrics-duration').show()
    }

    $('#tree-results-loading-indicator-durations').hide()
    $('.tree-results-duration-item').css('visibility', 'visible')
  }

  app.blockResultsLoaderV2.loadBlocksInteractionsChart = function () {
    var barchartLabelsTruncated = [],
        barchartLabels = [],
        totalInteractionsBarchartData = [],
        completedInteractionsBarchartData = [],
        orderedCompletedInteractionsBarchartData = [],
        totalInteractionsOrderedBarchartData = [],
        colorIndexes = [],
        orderedColorIndexes = []
    var orderedBarchartLabelsTruncated = [],
        orderedBarchartLabels = [],
        totalInteractionsOrderedBarchartData = []

    _.each(app.resultsData, function (blockResult, key) {
      var truncatedBlockTitle, resultIndex, colorIndex, totalInteractions, completedInteractions, colorValue
      var blockTitle = _.get(blockResult, 'details.title') || _.get(blockResult, 'classDetails.name') || ''

      truncatedBlockTitle = blockTitle.length < 9 ? blockTitle : blockTitle.substring(0, 9) + "..."
      colorIndex = blockResult["colorIndex"]
      colorValue = app.chartJsHelper.getChartChoiceColorsArray(colorIndex)[0]
      totalInteractions = blockResult["totalInteractions"]

      // outputKeys is either an empty array, or has one or more objects.
      completedInteractions = blockResult["outputKeys"].reduce(function (acc, val) {
        return acc + val.outputKeyTotals
      }, 0)

      // Listing-ordered arrays
      barchartLabels.push(blockTitle)
      barchartLabelsTruncated.push(truncatedBlockTitle)
      colorIndexes.push(colorValue)
      totalInteractionsBarchartData.push(totalInteractions)
      completedInteractionsBarchartData.push(completedInteractions)

      // Popularity-ordered arrays. Callback fn applies descending order.
      resultIndex = _.sortedIndex(orderedCompletedInteractionsBarchartData, completedInteractions, function (i) {
        return -i
      })
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
        }
      ]
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
        }
      ]
    })

    app.blockResultsLoaderV2.assignButtons($('#tree-summary-container'))
  }

  app.blockResultsLoaderV2.assignButtons = function (parentElement) {
    $(parentElement).find('.tree-interactions-barcharts-toggle-button').on('click', function (e) {
      var $buttonClicked = $(e.currentTarget)
      var barchartTarget = $buttonClicked.attr('data-section-option')

      if ($buttonClicked.hasClass('active')) {
        return
      }

      $buttonClicked.siblings().removeClass('active')
      $buttonClicked.addClass('active')

      // Hide and show the relevant Bar Chart
      $("canvas[id^='v-chart-tree-blocks-']").hide()
      $("#v-chart-tree-blocks-" + barchartTarget).show()

      $('#order-by-active-label-print').html('Order By: ' + $buttonClicked.attr('aria-label'))

      // Render any charts that haven't been rendered yet. Checks if data-generated==0 attribute.
      app.chartJsHelper.createCharts()
      $('#v-chart-tree-blocks-listing').removeClass('hidden')
    })

    $(parentElement).find('input[name="barchart-dataset-toggle"]').on('click', function (e) {
      var barchartDatasetTarget = $(e.currentTarget).attr('value')

      // Note that the barchart-dataset-toggle Buttons are not specific to one Chart
      var listingChart = app.chartJsHelper.chartObjects['v-chart-tree-blocks-listing']
      var popularityChart = app.chartJsHelper.chartObjects['v-chart-tree-blocks-popularity']

      var listingDatasets = listingChart.config.data.datasets
      var popularityDatasets = popularityChart.config.data.datasets
      var isEnteredSelected = barchartDatasetTarget == 'entered',
          isCompletedSelected = barchartDatasetTarget == 'completed'

      if (isCompletedSelected) {
        $('#tree-summary-barchart-title').html('Completed Interactions per Block')
      } else {
        $('#tree-summary-barchart-title').html('Entered Interactions per Block')
      }

      listingDatasets[0].hidden = isEnteredSelected
      listingDatasets[1].hidden = isCompletedSelected
      popularityDatasets[0].hidden = isEnteredSelected
      popularityDatasets[1].hidden = isCompletedSelected

      listingChart.update()
      popularityChart.update()
    })
    $(parentElement).find('.result-view-section-button').on('click', function (e) {
      var tabTarget = $(e.currentTarget).attr('data-section-option')
      var tabLabel = $(e.currentTarget).text()

      $(e.currentTarget).closest(".result-view-section-control-container").find(".sub-report-type-title").html(tabLabel == "╳"
          ? "Timeline: Total Interactions"
          : "Timeline: " + tabLabel)

      if ($(e.currentTarget).hasClass('active')) {
        console.log("Already on the " + tabLabel + " section")
        return
      }
      $(e.currentTarget).siblings().removeClass('active')
      $(e.currentTarget).addClass('active')

      // Hide and show the relevant section
      $(parentElement).find('.tree-results-item-tab-section').hide()
      $(parentElement).find('.tree-results-item-tab-section[data-section-id=' + tabTarget + ']').show()

      // Render any charts that haven't been rendered yet
      app.chartJsHelper.createCharts()
    })

    $(parentElement).find('.result-normalize-cb').on('click', function (e) {

      var chartTarget = $(e.currentTarget).attr('data-chart-type')
      var doNormalize = 0
      var targetElement

      if ($(e.currentTarget).is(':checked')) {
        doNormalize = 1
      }

      // Hide and show the relevant section
      targetElement = $(parentElement).find('canvas[data-chart-type=' + chartTarget + ']')

      // Set normalize to the new value, and set is-generated to 0, to queue up a re-rendering of the chart:
      $(targetElement).attr('data-normalize', doNormalize).attr('data-generated', 0)

      // Render any charts that haven't been rendered yet
      app.chartJsHelper.createCharts()
    })
  }

	app.combinedVersions = {};
	app.combinedVersions.assignButtons = function() {

		$('.tree-results-versions-select-button').on('click', function(e) {

			// Make sure the element lines up underneath the "Versions" button
			// This is a bit awkward, since we're right aligned and not in
			// a position:absolute setting, so we'll actually add in the
			// width of the (variable) daterangepicker to a fixed value:
			var rightPosition = _.parseInt($('#reportrange').width() + $('.tree-results-gear-menu').width() - $('.tree-results-versions-select-button').width() / 2) - 4;
			$('.tree-results-versions-selector').css({right: rightPosition});

			$('.tree-results-versions-selector').toggle();

			// Prevent clicks on the body element that would re-hide it.
			e.stopPropagation();
		});

		$('.tree-results-versions-selector').on('click', function(e) {
			// Prevent clicks on the body element that would re-hide it.
			// This also protects clicks on the other elements within the dropdown.
			e.stopPropagation();
		});

		$('.tree-results-versions-select-all-link').on('click', function(e) {
			// $('.tree-results-versions-selector').toggle();
			$('.tree-results-versions-selector input[type=checkbox]').prop('checked', true).trigger('change');
		});
		$('.tree-results-versions-select-none-link').on('click', function(e) {
			// $('.tree-results-versions-selector').toggle();
			$('.tree-results-versions-selector input[type=checkbox]').prop('checked', false).trigger('change');
		});

		$('.tree-results-versions-selector input[type=checkbox]').on('change', function(e) {
			$('.tree-results-versions-apply-button').prop('disabled', false);
		});

		$('.tree-results-versions-apply-button').on('click', function(e) {

			// Delete any existing version entries in the filter form, before adding the selected ones:
			$('#filter-form input[name^=versions]').remove();

			// With thanks to
			// http://stackoverflow.com/questions/2530635/jquery-add-additional-parameters-on-submit-not-ajax#comment22923873_2531379
			$('.tree-results-versions-selector input[type=checkbox]:checked').each(function() {
				// return $(this).val()
				var input = $('<input>', {
					type: 'hidden',
					name: 'versions[]',
					value: $(this).val()
				});
				$('#filter-form').append($(input));
			});

			$('#filter-form').submit();

		});

		// If the selector is open, hide it by clicking on the open space,
		// just like for dropdown menus.
		$('body').on('click', function(e) {
			$('.tree-results-versions-selector').hide();
		});

    $('.tree-results-versions-selector').hide();
	};

 	app.combinedVersions = _.assign({}, app.combinedVersions, window.combinedVersions);

})(window.jQuery);
