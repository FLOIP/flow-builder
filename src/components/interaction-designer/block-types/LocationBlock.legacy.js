import LegacyBlockHelpers from '../../mixins/LegacyBlockHelpers'

export default {
  mixins: [LegacyBlockHelpers],

  methods: {
    setSidebarElementsFromLocationBlock: function() {

      var selectedBlock = app.tree.getBlock(app.ui.selectedBlock);
      var subscriberPropertyId = selectedBlock['customData']['subscriberPropertyId'];

      if (typeof subscriberPropertyId === 'undefined') {
        if ($('select.tree-subscriber-property').length) {
          selectedBlock['customData']['subscriberPropertyId'] = $('select.tree-subscriber-property').find('option').first().val();
        }
      }
    },

    saveSidebarElementsToLocationBlock: function() {

      var selectedBlock = app.tree.getBlock(app.ui.selectedBlock);

      // Get Choices:

      var choicesInputs = $('.tree-sidebar-edit-block:visible .tree-location-choice-inputs');
      var choicesOutput = [];

      var currentChoice = '';
      var lastValidIndex = 0;

      choicesInputs.each(function (index) {
        var locationName = $(this).find(".tree-location-choice-input[data-location-name-number]").val();
        var locationLat = $(this).find(".tree-location-choice-input[data-location-lat-number]").val();
        var locationLong = $(this).find(".tree-location-choice-input[data-location-long-number]").val();

        choicesOutput.push({ name: locationName, lat: locationLat, long: locationLong });
        if (locationName != '') {
          lastValidIndex = index;
        }
      });

      choicesOutput = choicesOutput.slice(0, lastValidIndex + 1);

      selectedBlock['customData']['choices'] = choicesOutput;

      selectedBlock['customData']['numChoices'] = lastValidIndex + 1;
    },

    handleSidebarLocationChoices: function(e) {

      this.saveSidebarElementsToLocationBlock();

      this.$store.dispatch('setContentFromQuestionText', {jsKey: app.ui.selectedBlock})

      app.ui.change('Updating Location choices.');
    },



    setChoiceOptionsLocationBlockDetails: function(e) {

      var selectedBlock = app.tree.getBlock(app.ui.selectedBlock);

      var choiceSmsResponses = {};

      // var textAreaValues = $(e.currentTarget).val();

      // var choiceIndex = $(e.currentTarget).attr('data-choice-option-index');

      $('.tree-location-choice-options-sms-responses').each(function(index, value) {

        var textAreaValue = $(this).val();
        var choiceIndex = $(this).attr('data-choice-option-index');

        choiceSmsResponses[choiceIndex] = textAreaValue;

      });


      selectedBlock['customData']['choiceSmsResponses'] = choiceSmsResponses;

      app.ui.change('Updated SmsResponses.');

    },

    setChoiceOptionsLocationKeypresses: function(e) {

      var selectedBlock = app.tree.getBlock(app.ui.selectedBlock);
      var choiceKeypresses = {};

      $('.tree-location-choice-options-keypress').each(function(index, value) {

        var keypress = $(this).val();
        var choiceIndex = $(this).attr('data-choice-option-index');

        choiceKeypresses[choiceIndex] = keypress;

      });

      selectedBlock['customData']['choiceKeypresses'] = choiceKeypresses;

      app.ui.change('Updated choice keypresses.');

    },

    isValidLocation(loc) {
      const {name, lat, long} = loc
      return (name && lat && long) && loc
    },

    getShadowedLocationAt(i) {
      return this.shadowedLocations[i] || (this.shadowedLocations[i] = {name: '', lat: '', long: ''})
    },

    updateLocationWith(key, val, loc, i, commit) {
      loc = loc || this.getShadowedLocationAt(i)
      loc[key] = val

      if (!this.isValidLocation(loc)) {
        return
      }

      commit(i, loc)
      this.shadowedLocations.splice(i, 1, null)
    },

    showSetChoiceOptionsModal() {
      this.isChoiceOptionsModalVisible = true
    },

    hideSetChoiceOptionsModal() {
      this.isChoiceOptionsModalVisible = false
    },
  },
}
