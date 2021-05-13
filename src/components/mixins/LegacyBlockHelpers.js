import BBEventProxy from './BBEventProxy'

export default {
  mixins: [BBEventProxy],

  data() {
    return {
      legacyBlockEvents: {
        'input input.sidebar-input': 'handleSidebarBlockInput',
        'keyup input.sidebar-input': 'handleSidebarBlockInput',
        'click input.sidebar-input': 'handleSidebarBlockInput',
        'change input.sidebar-input': 'handleSidebarBlockInput',
        'dp.change .datepicker-ymd': 'handleSidebarBlockInput',
        'keyup textarea.sidebar-input': 'handleSidebarBlockInput',
        'change select.sidebar-input': 'handleSidebarBlockInput',
      }
    }
  },

  mounted() {
    console.debug(`Mounting LegacyBlockHelpers for ${this.$el.dataset.blockType}`)

    // perform setup for old + non-reactive dom
    this.setEditableState()
    this.setInitialEnabledLanguageViews()
    this.setSidebarToSelectedBlockType()


    // todo: push 99% pure vuejs templates into corresponding vue component files
  },

  methods: {
    // todo: these top-level block management functions don't need to exist anymore.

    setEditableState: function() {
      if (app.ui.isEditable === 0) {
        // todo: this needs to be captured on a page-load (interaction designer?) hook
        var desiredLocation = '/trees/' + app.tree.get('id') + '/interaction-designer/view';
        window.viamo.$route.fullPath !== desiredLocation && window.viamo.$router.history.replace(desiredLocation);
      }
      else {
        var desiredLocation = '/trees/' + app.tree.get('id') + '/interaction-designer/edit';
        window.viamo.$route.fullPath !== desiredLocation && window.viamo.$router.history.replace(desiredLocation);
      }
    },

    setSidebarToSelectedBlockType: function() {
      var selectedBlock = app.tree.getBlock(app.ui.selectedBlock);
      if (!selectedBlock) {
        return;
      }

      var selectedBlockType = selectedBlock.type;
      var selectedBlockFunction = 'setSidebarElementsFrom' + selectedBlockType;

      // Reset input fields
      $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] [data-custom-data-field]').val('');
      $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] [data-content-language]').val('');

      var enabledLanguages = app.tree.getEnabledLanguages();

      // Set any default values

      // Set radios
      _.each(selectedBlock.customData, function (value, key) {
        var radios = $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] input[type=radio][data-custom-data-radio=' + key + ']');
        _.each(radios, function (el) {
          el = $(el);
          var radioValue = el.val();
          if (radioValue == value) {
            el.prop('checked', true);
          }
        });
      });

      // Set checkboxes:
      _.each(selectedBlock.customData, function (value, key) {
        var checkboxes = $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] input[type=checkbox][data-custom-data-field=' + key + ']');
        _.each(checkboxes, function (el) {
          el = $(el);
          el.prop('checked', value);
        });
      });

      $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] [data-custom-data-field-default]').each(function(index, value) {
        $(this).val($(this).attr('data-custom-data-field-default'));
      });

      _.each(selectedBlock.customData, function(value, key) {
        $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] [data-custom-data-field=' + key + ']').val(value);
      });

      // Set audio files to proper content.
      // this.updateAllBlockLanguageAudio();

      // Run any callbacks for block-specific JS below
      if (this[selectedBlockFunction] && typeof (this[selectedBlockFunction]) === 'function') {
        this[selectedBlockFunction]();
      }

      $('[data-toggle="tooltip"]').tooltip({container:'body'});

      this.renderDatepickersFor(selectedBlock);

      app.audioControl.initalizeAudioButtons();
    },

    renderDatepickersFor: function (selectedBlock) {
      // Show a datepicker for inputs with the datepicker-ymd class
      // $('.datepicker-ymd').datetimepicker({
      // 	pickTime: false
      // });

      var $pickers = $('.tree-sidebar-edit-block[data-block-type=' + selectedBlock.type + '] .datepicker-ymd');

      $pickers.datetimepicker({
        format: 'YYYY-MM-DD'});
      $pickers.on('dp.change', function(e) {
        var currentTarget = $(e.currentTarget);
        if (currentTarget.hasClass('input-group')) {
          var input = currentTarget.find('input').get(0);
          $(input).trigger('keyup');
        } else {
          currentTarget.trigger('keyup');
        }
      })
    },

    setInitialEnabledLanguageViews: function() {

      // Hide all language-specific elements
      $('.tree-sidebar-edit-block [data-show-on-language-id]').hide();

      // Show those that should be shown.
      _.each(app.tree.get('details')['enabledLanguages'], function(value, key) {
        $('.tree-sidebar-edit-block [data-show-on-language-id=' + value + ']').show();
      });

      if (app.tree.get('details')['enabledLanguages'].length == 0) {
        $('.tree-no-enabled-languages').show();
      }
      else {
        $('.tree-no-enabled-languages').hide();
      }

    },

    handleUiChanged: function (e, data) {
      app.ui.change(data.msg);
    },

    handleSidebarBlockInput: function(e) {
      // todo: push block-specific handlers into their respective legacy blocks
      // todo: how can we know which blocks are depending on this so as to know when we can deprecate it?
      var $target = $(e.currentTarget),
          targetBlockId = $target.parents('.tree-sidebar-edit-block').attr('data-for-block-id'),
          selectedBlock = app.tree.getBlock(app.ui.selectedBlock);

      if (!selectedBlock) {
        console.warn('AHA!! Caught a sidebar input event w/o any blocks having been selected first.', {
          selectedBlockId: app.ui.selectedBlock,
          targetBlockId,
          event: e})

        return false;
      }

      if (targetBlockId !== selectedBlock.jsKey) {
        // when e.sidepanel.id !== selectedBlock.id, get out
        console.warn('AHA!! Gotcha! Tryin\' to change things behind my block!', targetBlockId, selectedBlock.jsKey);
        return;
      }

      var targetArrayKey = $(e.currentTarget).data('custom-data-field');
      var inputValue = $target.val();

      if (targetArrayKey) {
        if($target.attr("type") == "checkbox") {
          selectedBlock['customData'][targetArrayKey] = $target.is(':checked');
        }
        else {
          selectedBlock['customData'][targetArrayKey] = _.trim(inputValue);
        }
      }

      if (selectedBlock.type === 'AirtimeTransferBlock') {
        this.setSidebarAirtimeTransferBlockTitle();
      }

      // Deal with various title types
      if (selectedBlock.type == 'DecisionBranchBlock') {
        this.setSidebarDecisionBranchTitle();
      }
      else if (selectedBlock.type == 'ConnectToAnOperatorBlock') {
        this.setSidebarConnectToAnOperatorTitle();
      }
      else if (selectedBlock.type == 'ConnectToOperatorBlock') {
        this.setSidebarConnectToOperatorTitle();
      }

      if (selectedBlock.type == 'MultipleChoiceQuestionBlock'
          || selectedBlock.type == 'LocationBlock'
          || selectedBlock.type == 'NumericQuestionBlock'
          || selectedBlock.type == 'OpenQuestionBlock'
          || selectedBlock.type == 'CollaborativeFilteringQuestionBlock'
          || selectedBlock.type == 'CollaborativeFilteringRatingBlock'
          || selectedBlock.type == 'MessageBlock'
          || selectedBlock.type == 'RandomOrderMultipleChoiceQuestionBlock'
          || selectedBlock.type == 'WeatherAlertsBlock') {
        this.$store.dispatch('setContentFromQuestionText', {jsKey: app.ui.selectedBlock})
      }

      app.ui.change('Block custom data input changed');
    },
  },
}
