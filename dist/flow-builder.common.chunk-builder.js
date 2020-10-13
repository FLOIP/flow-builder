((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[3],{

/***/ "0c39":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0e11":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ConsoleIO_PrintBlock.vue": [
		"d81e",
		1,
		0,
		12
	],
	"./ConsoleIO_ReadBlock.vue": [
		"b6b9",
		1,
		0,
		13
	],
	"./Core_CaseBlock.vue": [
		"cf2c",
		6
	],
	"./Core_LogBlock.vue": [
		"41bd",
		1,
		0,
		14
	],
	"./Core_OutputBlock.vue": [
		"5dcb",
		7
	],
	"./Core_RunFlowBlock.vue": [
		"cab8",
		8
	],
	"./MobilePrimitives_MessageBlock.vue": [
		"c600",
		1,
		0,
		15
	],
	"./MobilePrimitives_NumericResponseBlock.vue": [
		"2d61",
		1,
		0,
		16
	],
	"./MobilePrimitives_OpenResponseBlock.vue": [
		"64bb",
		1,
		0,
		17
	],
	"./MobilePrimitives_SelectManyResponseBlock.vue": [
		"03d5",
		1,
		0,
		10
	],
	"./MobilePrimitives_SelectOneResponseBlock.vue": [
		"5c47",
		1,
		0,
		11
	],
	"./SmartDevices_LocationResponseBlock.vue": [
		"59c3",
		1,
		0,
		18
	],
	"./SmartDevices_PhotoResponseBlock.vue": [
		"2b44",
		9
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "0e11";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "2d35":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("cb29");

__webpack_require__("4de4");

__webpack_require__("7db0");

__webpack_require__("4160");

__webpack_require__("d81d");

__webpack_require__("13d5");

__webpack_require__("fb6a");

__webpack_require__("d3b7");

__webpack_require__("ac1f");

__webpack_require__("25f0");

__webpack_require__("159b");

__webpack_require__("ddb0");

// Backbone Model for Trees
// Much thanks to
// http://todomvc.com/architecture-examples/backbone/
// Also helpful
// http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
// For commentary!
// http://www.reddit.com/r/javascript/comments/1npiet/backbonejs_is_opinionated_or_why_is_using_nested/
// For relational links
// http://backbonerelational.org/
// (not used)
// And for nested Backbone models! (in use!)
// https://github.com/afeld/backbone-nested

/*global Backbone */
window.app = window.app || {};
;

(function () {
  // Tree Model
  // ----------
  app.Tree = function (attrs) {
    this.attributes = attrs;
  };

  app.Tree.prototype = {
    get: function get(attr) {
      return this.attributes[attr];
    },
    toJSON: function toJSON(options) {
      return _.clone(this.attributes);
    },
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
      id: 0,
      floipSyncedAt: '',
      details: {
        title: '',
        description: '',
        enabledLanguages: [],
        syncedLanguage: '',
        startingBlockKey: '',
        exitBlockKey: '',
        hasVoice: 0,
        hasSms: 0,
        hasUssd: 0,
        hasSocial: 0,
        hasClipboard: 0,
        floipPushUrl: '',
        floipPushApiKey: ''
      },
      blocks: [],
      connections: []
    },
    _defaultReviewedState: {},
    upgrade: function upgrade() {
      // todo: port this to use something like `lodash.defaultsDeep()`
      console.debug('Tree upgrade: started');
      console.time('Tree upgrade'); // Temporary fix for blocks that have [] arrays instead of {} objects
      // Likely caused by browser quirks (possibly old versions of IE)
      // Added 2016-08-08 (Sean)

      this.fixArrayBlocks();
      this.defaultEnabledLanguages();
      this.defaultSyncedLanguage(); // auto-inflate reviewed dictionaries based upon enabled languages

      this.inflateDefaultReviewedStateOnAll();
      this.inflateDefaultTagsOnAll();
      this.inflateDefaultLabelOnAll();
      this.upgradeLanguageSelectorBlocks();
      this.inflateDefaultSocialContentOnAll();
      this.inflateDefaultClipboardContentOnAll();
      this.upgradeSubscriberPropertyFieldSelections();
      this.upgradeMsmcqBranchingToFalse();
      this.upgradeSubscriberPropertyBlocks();
      this.upgradeSubscriberBranchBlocks();
      console.timeEnd('Tree upgrade');
    },
    cacheDefaultReviewedState: function cacheDefaultReviewedState() {
      var enabledLanguages = this.getEnabledLanguages();
      this._defaultReviewedState = _.zipObject(enabledLanguages, _.fill(new Array(enabledLanguages.length), false));
    },
    defaultEnabledLanguages: function defaultEnabledLanguages() {
      var details = this.get('details');
      details.enabledLanguages = details.enabledLanguages || [];
    },
    defaultSyncedLanguage: function defaultSyncedLanguage() {
      var details = this.get('details');
      details.syncedLanguage = details.syncedLanguage || '';
    },
    inflateDefaultReviewedStateOnAll: function inflateDefaultReviewedStateOnAll() {
      this.cacheDefaultReviewedState();
      this.get('blocks').forEach(this.inflateDefaultReviewedStateOnto.bind(this));
    },
    inflateDefaultReviewedStateOnto: function inflateDefaultReviewedStateOnto(block) {
      block.customData.reviewed = block.customData.reviewed || block.customData.approved || {};
      delete block.customData.approved; // todo: remove these two references to `approved` once deployed

      _.defaults(block.customData.reviewed, this._defaultReviewedState);
    },
    inflateDefaultTagsOnAll: function inflateDefaultTagsOnAll() {
      this.get('blocks').forEach(function (block) {
        !block.customData.tags && (block.customData.tags = []);
      });
    },
    inflateDefaultLabelOnAll: function inflateDefaultLabelOnAll() {
      this.get('blocks').forEach(function (block) {
        !block.customData.label && (block.customData.label = '');
      });
    },
    upgradeLanguageSelectorBlocks: function upgradeLanguageSelectorBlocks() {
      this.get('blocks').filter(function (block) {
        return block.type === "LanguageSelectorBlock";
      }).forEach(function (languageSelectorBlock) {
        if (!languageSelectorBlock.customData.addExitForNoResponse) {
          languageSelectorBlock.customData.addExitForNoResponse = 0;
        }
      });
    },
    inflateDefaultSocialContentOnAll: function inflateDefaultSocialContentOnAll() {
      this.get('blocks').forEach(function (block) {
        !block.socialContent && (block.socialContent = {});
      });
    },
    inflateDefaultClipboardContentOnAll: function inflateDefaultClipboardContentOnAll() {
      this.get('blocks').forEach(function (block) {
        !block.clipboardContent && (block.clipboardContent = {});
      });
    },
    upgradeSubscriberPropertyFieldSelections: function upgradeSubscriberPropertyFieldSelections() {
      this.get('blocks').forEach(function (block) {
        if (!block.customData.propertyFieldId) {
          var property = app.ui.findSubscriberPropertyField({
            display_label: block.customData.customDataCategory
          });
          block.customData.propertyFieldId = _.get(property, 'id', null);
        }
      });
    },
    upgradeMsmcqBranchingToFalse: function upgradeMsmcqBranchingToFalse() {
      this.get('blocks').filter(function (block) {
        return block.type === "MultipleSelectMultipleChoiceQuestionBlock";
      }).filter(function (block) {
        return block.customData.branching === 1;
      }).forEach(function (block) {
        var customData = block.customData;
        var uiData = block.uiData;
        customData.branching = false;
        customData.numChoices = 1;
        uiData.numChoices = 1;
        uiData.numConnections = 1;
        uiData.outputNames = [1];

        if (customData.addExitForNoResponse) {
          uiData.outputNames.push('trees.output-exit');
        }
      });
    },

    /**
     * For existing blocks that have their action set to startDate, set the action to customData instead,
     * preserving all settings that calculate the date, and attempting to pre-select the "start_date" property for the
     * user.
     *
     * This is because we are removing the startDate action and rather switching to using subscriber properties
     */
    upgradeSubscriberPropertyBlocks: function upgradeSubscriberPropertyBlocks() {
      this.get('blocks').filter(function (block) {
        return block.type === "SubscriberPropertyBlock";
      }).filter(function (block) {
        return block.customData.action === 'startDate';
      }).forEach(function (block) {
        var customData = block.customData;
        customData.action = 'customData';
        customData.propertyDateMethod = customData.startDateMethod;
        customData.propertyDateAbsoluteDate = customData.startDateAbsoluteDate;
        customData.propertyDateRelativeNumber = customData.startDateRelativeNumber;
        customData.propertyDateTimespanType = customData.startDateTimespanType;
        customData.propertyDateNumericBlockKey = customData.startDateNumericBlockKey;
        var propertyField = app.ui.findSubscriberPropertyField({
          name: 'start_date'
        });

        if (propertyField) {
          customData.propertyFieldId = propertyField.id;
        } else {
          customData.propertyFieldId = null;
        }

        customData.upgradedFromStartDate = true;
      });
    },

    /**
     * For existing blocks that have their criteria set to startDate, set the criteria to customData instead,
     * preserving all settings, and attempting to pre-select the "start_date" property for the
     * user.
     *
     * This is because we are removing the startDate action and rather switching to using subscriber properties
     */
    upgradeSubscriberBranchBlocks: function upgradeSubscriberBranchBlocks() {
      this.get('blocks').filter(function (block) {
        return block.type === 'SubscriberBranchBlock';
      }).filter(function (block) {
        return block.customData.action === 'startDate';
      }).forEach(function (block) {
        builder.$set(block.customData, 'action', 'customData');
        builder.$set(block.customData, 'customDataMethod', block.customData.startDateMethod);
        builder.$set(block.customData, 'customDataValue', block.customData.startDateReference);
        var propertyField = app.ui.findSubscriberPropertyField({
          name: 'start_date'
        }); // $set won't work on something that is already a property
        // make sure it does not exist on the object before $set-ing it

        delete block.customData.propertyFieldId;

        if (propertyField) {
          builder.$set(block.customData, 'propertyFieldId', propertyField.id);
        } else {
          builder.$set(block.customData, 'propertyFieldId', null);
        }

        builder.$set(block.customData, 'upgradedFromStartDate', true);
      });
    },
    // This function loops through all of the blocks in a tree, and checks for blocks that have empty subkeys (eg. customData) that are in [] array format rather than {} object format.
    // The array issue causes other crashes later, when trying to retrieve or update data. So far, the issue comes up sporadically which seems to indicate that it's a browser quirk (possibly with older versions of IE).
    // This issue fixes the empty arrays (by replacing them with empty objects) when the function is called, and we've added it to trees-views' initializeAll() function to call it on initial page load.
    // For trees without the issue, it marginally increases the load on the browser when the tree is first loaded, but otherwise causes no other changes.

    /** @moved from 12-trees-helpers.js */
    fixArrayBlocks: function fixArrayBlocks() {
      var neededFixing = 0;
      var fixedCount = 0;

      _.each(this.get('blocks'), function (block, index) {
        var arrayKeys = ['customData', 'uiData', 'audioFiles', 'smsContent', 'ussdContent', 'socialContent', 'clipboardContent'];

        _.each(arrayKeys, function (key) {
          if (_.isArray(block[key])) {
            neededFixing = 1;
            fixedCount++; // Repair the array by changing it to object syntax:

            block[key] = {};
            console.log('Fixing ' + block.type + '[' + index + '] ' + key);
          }
        });
      });

      if (neededFixing == 1) {
        console.log('Fixed ' + fixedCount + ' blocks.');
        app.ui.change('Array issue blocks fixed.');
      } // else {
      // 	console.log('All blocks loaded without array issues.');
      // }

    },
    // Block-related functions
    doesBlockLabelExist: function doesBlockLabelExist(label, comparatorKey) {
      if (!label) {
        return;
      }

      return !!_(this.get('blocks')).chain().find(function (block) {
        return block.jsKey !== comparatorKey && block.customData.label === label;
      }).value();
    },
    addBlock: function addBlock(blockData) {
      // This doesn't seem to persist across deletes
      // Will make new, non-unique IDs.
      // blockData.jsKey = _.uniqueId('block_');
      blockData.jsKey = this.makeUniqueId('block_');
      this.inflateDefaultReviewedStateOnto(blockData);
      this.get('blocks').push(blockData);

      if (this.get('blocks').length == 1) {
        // Only one block, eg. the first one,
        // so set the tree's Starting Block ID to this
        this.setStartingBlock(blockData.jsKey);
      } // Return the new key


      return this.get('blocks').length - 1;
    },
    getBlockByNumericIndex: function getBlockByNumericIndex(blockKey) {
      var blocks = this.get('blocks');

      if (blocks[blockKey]) {
        return blocks[blockKey];
      } else {
        return false;
      }
    },
    // app.tree.editBlock(0, {type:'newType'})
    editBlockByNumericIndex: function editBlockByNumericIndex(blockNumericIndex, blockData, arrayKey) {
      var blocks = this.get('blocks');
      var blockArrayKey; // Update that particular block in the array with new data.

      if (blocks[blockNumericIndex]) {
        // Can provide an array key value (eg. smsContent) to just update that array
        if (typeof arrayKey !== 'undefined') {
          blocks[blockNumericIndex][arrayKey] = blockData;
        } else {
          // Persist existing data (eg. jsKey and other unchanged arrays)
          blockData = _.extend(blocks[blockNumericIndex], blockData);
          blocks[blockNumericIndex] = blockData;
        }

        this.set('blocks', blocks); // Return that block data just for fun

        return blocks[blockNumericIndex];
      } else {
        return false;
      }
    },
    getBlock: function getBlock(blockKey) {
      // Passes back the block *by reference* which allows for direct editing.
      return _.findWhere(this.get('blocks'), {
        jsKey: blockKey
      });
    },
    editBlock: function editBlock(blockKey, blockData, arrayKey) {
      var thisBlock = this.getBlock(blockKey); // thisBlock is returned by reference, so can be edited directly (i think)

      if (thisBlock) {
        // Can provide an array key value (eg. smsContent) to just update that array
        if (typeof arrayKey !== 'undefined') {
          thisBlock[arrayKey] = blockData;
        } else {
          // Persist existing data (eg. jsKey and other unchanged arrays)
          thisBlock = _.extend(thisBlock, blockData); // blocks[blockNumericIndex] = blockData;
        }

        return true;
      } else {
        return false;
      }
    },
    setBlockPosition: function setBlockPosition(blockKey, positionData) {
      var thisBlock = this.getBlock(blockKey);

      if (thisBlock) {
        thisBlock['uiData']['xPosition'] = positionData[0];
        thisBlock['uiData']['yPosition'] = positionData[1];
        return true;
      } else {
        return false;
      }
    },
    getBlockPosition: function getBlockPosition(blockKey) {
      var thisBlock = this.getBlock(blockKey);
      var positionData = [];

      if (thisBlock) {
        positionData[0] = thisBlock['uiData']['xPosition'];
        positionData[1] = thisBlock['uiData']['yPosition'];
        return positionData;
      } else {
        return false;
      }
    },
    getBlockNumConnections: function getBlockNumConnections(blockKey) {
      var thisBlock = this.getBlock(blockKey);
      return thisBlock['uiData']['numConnections'];
    },
    filterBlockConnectionsAboveMax: function filterBlockConnectionsAboveMax(blockKey) {
      var thisBlock = this.getBlock(blockKey);
      var connections = this.get('connections');
      var maxConnections = thisBlock['uiData']['numConnections'];

      _.each(_.where(connections, {
        startBlockKey: blockKey
      }), function (e) {
        var nodeNumber = e.outputKey.slice(-1);

        if (nodeNumber > maxConnections) {
          app.tree.removeConnection(blockKey, e.outputKey);
        }
      });
    },
    setBlockAudioFile: function setBlockAudioFile(blockKey, languageId, audioData) {
      var thisBlock = this.getBlock(blockKey); // audioData = {
      // 	id: 75,
      // 	filename: '536105d15bbd94.30453403',
      // 	description: 'Uploaded file: survey-c.wav',
      // 	duration_seconds: 2.12,
      // 	created_at: '2013-04-12 16:32'
      // };
      // console.log('blockKey', blockKey);
      // console.log('languageId', languageId);
      // console.log('audioData', audioData);

      if (thisBlock) {
        // Special handling for any mystery cases
        // where the audioFiles object becomes an array
        // which could lead to really giant amounts of null values
        if (_.isPlainObject(thisBlock['audioFiles']) === false) {
          console.log('Alert - special handling for audioFiles as array taking place');
          thisBlock['audioFiles'] = {};
        }

        thisBlock['audioFiles'][languageId] = audioData;
        return true;
      } else {
        return false;
      }
    },
    removeBlockAudioFile: function removeBlockAudioFile(blockKey, languageId) {
      var thisBlock = this.getBlock(blockKey); // Works by reference.

      delete thisBlock['audioFiles'][languageId];
    },
    // Existing block keys
    getBlockKeys: function getBlockKeys() {
      return _.keys(app.tree.get('blocks'));
    },
    // Get next index
    // This isn't really useful since we aren't tracking by array key anymore.
    getNextBlockKey: function getNextBlockKey() {
      var lastKey = parseInt(_.last(app.tree.getBlockKeys()), 10);
      return lastKey + 1;
    },
    deleteBlock: function deleteBlock(blockKey) {
      var blocks;
      blocks = this.get('blocks');
      blocks = _.without(blocks, _.findWhere(blocks, {
        jsKey: blockKey
      }));
      this.set('blocks', blocks); // If the indicated block was also the tree's starting block,
      // Set it to blank.

      this.clearStartingBlockIfIs(blockKey);
      this.clearExitBlockIfIs(blockKey);
      return true;
    },
    handleDeleteNumericQuestionBlockAssociations: function handleDeleteNumericQuestionBlockAssociations(selectedBlockKey) {
      this.set({
        blocks: this.get('blocks').map(function (block) {
          var newBlock = block;

          if (block['type'] == 'NumericBranchBlock') {
            newBlock = Object.assign({}, block, {
              customData: this._getAmendmentsForNumericBranchBlock(block['customData'], selectedBlockKey)
            });
          } else if (block['type'] == 'IdValidationBlock') {
            newBlock = Object.assign({}, block, {
              customData: this._getAmendmentsForIdValidationBlock(block['customData'], selectedBlockKey)
            });
          }

          return newBlock;
        }.bind(this))
      });
    },
    //works but must save twice to trigger validation and disable send
    _getAmendmentsForNumericBranchBlock: function _getAmendmentsForNumericBranchBlock(customData, selectedBlockKey) {
      return Object.assign({}, customData, {
        outputs: _.reduce(customData['outputs'], function (newOutputs, output) {
          var newConditions = _.reduce(output['conditions'], function (newConditions, condition) {
            var newCondition = Object.assign({}, condition);

            if (condition['jsKey'] == selectedBlockKey) {
              newCondition['jsKey'] = '';
            }

            newConditions.push(newCondition);
            return newConditions;
          }.bind(this), []); //I think this will never be the case but just to be sure


          if (newConditions) {
            newOutputs.push(Object.assign({}, output, {
              conditions: newConditions
            }));
          }

          return newOutputs;
        }.bind(this), [])
      });
    },
    _getAmendmentsForIdValidationBlock: function _getAmendmentsForIdValidationBlock(customData, selectedBlockKey) {
      if (customData['numericQuestionBlockJsKey'] == selectedBlockKey) {
        customData = Object.assign({}, customData, {
          'numericQuestionBlockJsKey': ''
        });
      }

      return customData;
    },
    makeUniqueId: function makeUniqueId(prefix) {
      return prefix + _.now() + '_' + _.random(10, 99);
    },
    getMcqChoiceName: function getMcqChoiceName(blockKey, choiceId) {
      var block = this.getBlock(blockKey);

      if (block && block.customData && block.customData.choices) {
        return block.customData.choices[choiceId - 1];
      }
    },
    getBlockTitle: function getBlockTitle(blockKey) {
      var block = this.getBlock(blockKey);

      if (block && block.customData && block.customData.title) {
        return block.customData.title;
      }
    },
    generateBlockTitle: function generateBlockTitle(customData, type, limit) {
      var output = '';

      if (_.isNumber(limit) == false) {
        limit = 0;
      }

      if (type === 'RunTreeBlock') {
        if (_.get(customData, 'destinationTreeId')) {
          output = _.get(app.ui.treeTitles, customData.destinationTreeId);
        } else if (_.get(customData, 'destinationTreeSetId')) {
          output = Lang.trans('trees.most-recent-version-of') + ' ' + _.get(app.ui.treeSetTitles, customData.destinationTreeSetId);
        }
      } else if (type === 'GroupBranchBlock') {
        if (_.get(customData, 'groupId')) {
          if (_.parseInt(_.get(customData, 'in')) == 0) {
            output = Lang.trans('trees.if-not-in') + ' "';
          } else {
            output = Lang.trans('trees.if-in') + ' "';
          }

          output += _.get(app.ui.groupNames, customData.groupId) + '"';
        }
      } else if (type === 'GroupSizeBranchBlock') {
        if (_.get(customData, 'groupId')) {
          output = Lang.trans('trees.if') + ' "' + _.get(app.ui.groupNames, customData.groupId) + '" ' + Lang.trans('trees.exceeds') + ' ' + _.get(customData, 'quotaThreshold', 100);
        }
      } else if (type === 'SubscriberBranchBlock') {
        if (_.get(customData, 'action') == 'customData') {
          var property = app.ui.findSubscriberPropertyField({
            id: _.get(customData, 'propertyFieldId')
          });

          var displayLabel = _.get(property, 'display_label', '');

          var comparator = _.get(customData, 'customDataMethod', 'Equal');

          var comparatorString = '';

          if (comparator === 'NotEqual') {
            comparatorString = Lang.trans('trees.not');
          } else if (comparator === 'LessThan') {
            comparatorString = '<';
          } else if (comparator === 'GreaterThan') {
            comparatorString = '>';
          }

          output = Lang.trans('trees.if-subscriber-custom-data') + ' "' + displayLabel + '" ' + Lang.trans('trees.is') + ' ' + comparatorString + ' "' + _.get(customData, 'customDataValue', '') + '"';
        } else if (_.get(customData, 'action') == 'language') {
          if (_.get(customData, 'languageValue') == '') {
            output = Lang.trans('trees.if-subscriber-language-is-unknown');
          } else {
            output = Lang.trans('trees.if-subscriber-language-is') + ' "' + _.get(app.ui.languageNames, customData.languageValue) + '"';
          }
        }
      } else {
        output = _.get(customData, 'title');
      }

      if (output && output.length > 0 && limit > 0) {
        output = S(output).truncate(limit).s;
      }

      return output;
    },
    // Connection-related functions
    addConnection: function addConnection(startBlockKey, outputKey, endBlockKey) {
      var connections; // Need to remove any existing connections with the same startBlockKey and outputKey - since one output key on a block can only go to one other endBlock.

      this.removeConnection(startBlockKey, outputKey); // Need to load this *after* the appropriate entries are removed first.

      connections = this.get('connections'); // If this works, it'll be so weird.

      var connection = {
        startBlockKey: startBlockKey,
        outputKey: outputKey,
        endBlockKey: endBlockKey
      };
      connections.push(connection);
      this.set('connections', connections);
      return true;
    },
    removeConnection: function removeConnection(startBlockKey, outputKey) {
      // outputKey is optional
      var connections = this.get('connections');

      if (startBlockKey && typeof outputKey !== 'undefined') {
        // Massive thanks to
        // http://stackoverflow.com/a/16994286
        connections = _.without(connections, _.findWhere(connections, {
          startBlockKey: startBlockKey,
          outputKey: outputKey
        }));
      } else if (startBlockKey) {
        // Filter literally everything with that starting block key
        connections = _.difference(connections, _.where(connections, {
          startBlockKey: startBlockKey
        }));
      }

      this.set('connections', connections);
      return true;
    },
    addEnabledLanguage: function addEnabledLanguage(languageKey) {
      var enabledLanguages = app.tree.get('details')['enabledLanguages'];
      var newEnabledLanguages = [];
      enabledLanguages.push(languageKey.toString()); // Order according to the original app.ui.languages order

      newEnabledLanguages = _.intersection(_.pluck(app.ui.languages, 'id'), app.tree.get('details')['enabledLanguages']);
      app.tree.get('details').enabledLanguages = newEnabledLanguages;
      this.inflateDefaultReviewedStateOnAll();
    },
    removeEnabledLanguage: function removeEnabledLanguage(languageKey) {
      var enabledLanguages = app.tree.get('details')['enabledLanguages'];
      languageKey = languageKey.toString(); // This loses the pass-by-reference, so need to save it back to the model after.

      enabledLanguages = _.without(enabledLanguages, languageKey);
      app.tree.get('details').enabledLanguages = enabledLanguages;
      this.cacheDefaultReviewedState();
    },
    getEnabledLanguages: function getEnabledLanguages() {
      return app.tree.get('details')['enabledLanguages'];
    },
    setStartingBlock: function setStartingBlock(startingBlockKey) {
      app.tree.get('details').startingBlockKey = startingBlockKey;
    },
    clearStartingBlockIfIs: function clearStartingBlockIfIs(blockKey) {
      if (app.tree.get('details').startingBlockKey == blockKey) {
        app.tree.get('details').startingBlockKey = '';
      }
    },
    clearExitBlockIfIs: function clearExitBlockIfIs(blockKey) {
      if (app.tree.get('details').exitBlockKey == blockKey) {
        app.tree.get('details').exitBlockKey = '';
      }
    },
    enableVoice: function enableVoice() {
      app.tree.get('details').hasVoice = 1;
    },
    disableVoice: function disableVoice() {
      app.tree.get('details').hasVoice = 0;
    },
    enableSms: function enableSms() {
      app.tree.get('details').hasSms = 1;
    },
    disableSms: function disableSms() {
      app.tree.get('details').hasSms = 0;
    },
    enableUssd: function enableUssd() {
      app.tree.get('details').hasUssd = 1;
    },
    disableUssd: function disableUssd() {
      app.tree.get('details').hasUssd = 0;
    },
    enableSocial: function enableSocial() {
      app.tree.get('details').hasSocial = 1;
    },
    disableSocial: function disableSocial() {
      app.tree.get('details').hasSocial = 0;
    },
    enableClipboard: function enableClipboard() {
      app.tree.get('details').hasClipboard = 1;
    },
    disableClipboard: function disableClipboard() {
      app.tree.get('details').hasClipboard = 0;
    },
    validateLanguageAndContentTypes: function validateLanguageAndContentTypes(tree, blocks) {
      var missingLanguageIdsAudioFiles = [],
          missingLanguageIdsSmsContent = [],
          missingLanguageIdsUssdContent = [],
          missingLanguageIdsSocialContent = [],
          missingLanguageIdsClipboardContent = [],
          jsKey = {};

      _.forEach(blocks, function (block) {
        missingLanguageIdsAudioFiles = [];
        missingLanguageIdsSmsContent = [];
        missingLanguageIdsUssdContent = [];
        missingLanguageIdsSocialContent = [];
        missingLanguageIdsClipboardContent = [];

        if (app.ui.blockClasses[block.type].hasContent == 1) {
          if (app.tree.get('details').hasVoice && _.keys(block.audioFiles).length < tree.enabledLanguages.length) {
            missingLanguageIdsAudioFiles = _.difference(tree.enabledLanguages, _.keys(block.audioFiles));
          }

          if (app.tree.get('details').hasSms && _.keys(block.smsContent).length < tree.enabledLanguages.length) {
            if (block.type !== "RandomOrderMultipleChoiceQuestionBlock") missingLanguageIdsSmsContent = _.difference(tree.enabledLanguages, _.keys(block.smsContent));
          }

          if (app.tree.get('details').hasUssd && _.keys(block.ussdContent).length < tree.enabledLanguages.length) {
            if (block.type !== "RandomOrderMultipleChoiceQuestionBlock") missingLanguageIdsUssdContent = _.difference(tree.enabledLanguages, _.keys(block.ussdContent));
          }

          if (app.tree.get('details').hasSocial && _.keys(block.socialContent).length < tree.enabledLanguages.length) {
            if (block.type !== "RandomOrderMultipleChoiceQuestionBlock") missingLanguageIdsSocialContent = _.difference(tree.enabledLanguages, _.keys(block.socialContent));
          }

          if (app.tree.get('details').hasClipboard && _.keys(block.clipboardContent).length < tree.enabledLanguages.length) {
            if (block.type !== "RandomOrderMultipleChoiceQuestionBlock") missingLanguageIdsClipboardContent = _.difference(tree.enabledLanguages, _.keys(block.clipboardContent));
          }

          if (missingLanguageIdsAudioFiles.length || missingLanguageIdsSmsContent.length || missingLanguageIdsUssdContent.length || missingLanguageIdsSocialContent.length || missingLanguageIdsClipboardContent.length) {
            jsKey[block.jsKey] = {
              'sms': missingLanguageIdsSmsContent,
              'voice': missingLanguageIdsAudioFiles,
              'ussd': missingLanguageIdsUssdContent,
              'social': missingLanguageIdsSocialContent,
              'clipboard': missingLanguageIdsClipboardContent
            };
          }
        }
        /*
        //if block is a multiple choice question, check if user has set multiple digit options
        if (block.type === "MultipleChoiceQuestionBlock"){
        	var choiceKeyPresses = block.customData.choiceKeypresses;
        	//check if there are any duplicate in the choices
        		if ((new Set(_.values(choiceKeyPresses))).size !== (_.values(choiceKeyPresses).length)){
        		var uniqN = [];
        		var duplicates = [];
        		$.each(choiceKeyPresses, function(i, el){
        			if (uniqN.lastIndexOf(el) === -1) {
        				uniqN.push(el);
        			}else{
        				duplicates.push(el);
        			}
        		});
        			jsKey[block.jsKey]['duplicateChoicePresses'] = duplicates;
        	}else{
        		jsKey[block.jsKey]['duplicateChoicePresses'] = [];
        	}
        	}
        	if (block.type === "GroupBranchBlock"){
        	//check if this block has a group set
        	if (!block.customData.hasOwnProperty('groupId') || (block.customData.groupId === "")) {
        		jsKey[block.jsKey] = {'noGroup' : "NoGroupSelected"};
        	}
        }
        	if (block.type === "RunTreeBlock"){
        		if (!block.customData.hasOwnProperty('destinationTreeSetId') || (block.customData.destinationTreeSetId === "")) {
        		jsKey[block.jsKey] = {'noRunTree':'NoTreeSelected'};
        	}
        }
        	if (block.type === "GroupSizeBranchBlock") {
        		if (!block.customData.hasOwnProperty('groupId') || (block.customData.groupId === "")){
        		jsKey[block.jsKey] = {
        								'noGroup':"NoGroupSelected"
        							 };
        	}
        	}
        	if (block.type === "LanguageSelectorBlock"){
        	if (!block.customData.hasOwnProperty('languageSelectorId') || (block.customData.languageSelectorId === "")){
        		jsKey[block.jsKey] = {
        							'noLanguageSelector' : 'NoLanguageSelectorSelected'
        						};
        	}
        	}
        	*/

      });

      return jsKey;
    },
    validateContent: function validateContent() {
      var tree = this.get('details'),
          blocks = this.get('blocks');
      return this.validateLanguageAndContentTypes(tree, blocks);
    },
    updateFloipAlert: function updateFloipAlert() {
      if (app.tree.floipSyncedAt) {
        $('.push-flow-package-alert-message').html('<div class="alert alert-success">' + Lang.trans('trees.floip-sync-success') + '</div>');
      } else if ($('.floip-push-url-input').val()) {
        $('.push-flow-package-alert-message').html('<div class="alert alert-warning">' + Lang.trans('trees.floip-sync-warning') + '</div>');
      }
    },
    getEndBlockPosition: function getEndBlockPosition(topOrBottom, returnBlockKey, offset) {
      var tallestYPosition = 0;
      var tallestBlockKey = '';

      if (topOrBottom != 'bottom') {
        // TODO:
        if (app.tree.get('blocks')[0]) {
          tallestYPosition = app.tree.get('blocks')[0]['uiData']['yPosition'];
          tallestBlockKey = app.tree.get('blocks')[0]['jsKey']; // Seed this initially, otherwise the "0" value will stay shortest.
        }
      }

      _.each(app.tree.get('blocks'), function (block) {
        var thisYPosition = block['uiData']['yPosition'];

        if (topOrBottom == 'bottom') {
          if (thisYPosition > tallestYPosition) {
            tallestYPosition = thisYPosition;
            tallestBlockKey = block['jsKey'];
          }
        } else {
          if (thisYPosition < tallestYPosition) {
            tallestYPosition = thisYPosition;
            tallestBlockKey = block['jsKey'];
          }
        }
      }, this);

      if (typeof offset !== 'undefined') {
        if (topOrBottom == 'bottom') {
          tallestYPosition += offset;
        } else {
          tallestYPosition -= offset;
        }
      }

      if (returnBlockKey == 1) {
        return tallestBlockKey;
      } else {
        return tallestYPosition;
      }
    },
    getTallestBlockPosition: function getTallestBlockPosition(offset) {
      return this.getEndBlockPosition('bottom', 0, offset);
    },
    getShortestBlockPosition: function getShortestBlockPosition(offset) {
      return this.getEndBlockPosition('top', 0, offset);
    },
    getTallestBlockKey: function getTallestBlockKey() {
      return this.getEndBlockPosition('bottom', 1);
    },
    getShortestBlockKey: function getShortestBlockKey() {
      return this.getEndBlockPosition('top', 1);
    }
  };
  app.Tree._blockIdPrefixMatcher = /^(block_\d+_\d+).*/; // eg. "block_1492643090294_28_node_3"

  app.Tree._validateNonExistentBlockReferences = function (blocks, connections) {
    // todo: also validate .blocks.items.properties.customData.outputs.conditions.jsKey === "block_1450273012962_38"
    // todo: also validate .details.startingBlockKey === "block_1450273012962_38"
    var keysToVerifiedMap = {},
        keysToExistsMap = {},
        keys = _.pluck(blocks, 'jsKey'),
        validateKey = function validateKey(key) {
      keysToVerifiedMap[key] = true;
      keysToExistsMap[key] = _.contains(keys, key);
    };

    _.forEach(connections, function (conn, i) {
      validateKey(conn.endBlockKey);
      validateKey(conn.startBlockKey);

      var extractedKey = _.get(this._blockIdPrefixMatcher.exec(conn.outputKey), 1);

      extractedKey && validateKey(extractedKey);
    }, this);

    return _.contains(_.values(keysToExistsMap), 0);
  };

  app.Tree._mergeAndSanitizeImportedInto = function (treeJson, importJson) {
    if (!importJson) {
      return; // validator handles `null`ed json in a particular way
    } //1- Remove contents - based on selected channels


    _.forEach(_.get(importJson, 'blocks'), function (block, i) {
      if (!_.get(treeJson, 'details.hasVoice', false)) {
        block.audioFiles = {};
      }

      if (!_.get(treeJson, 'details.hasSms', false)) {
        block.smsContent = {};
        block.smsAutogenLangs = [];
      }

      if (!_.get(treeJson, 'details.hasUssd', false)) {
        block.ussdContent = {};
        block.ussdAutogenLangs = [];
      }

      if (!_.get(treeJson, 'details.hasSocial', false)) {
        block.socialContent = {};
        block.socialAutogenLangs = [];
      }

      if (!_.get(treeJson, 'details.hasClipboard', false)) {
        block.clipboardContent = {};
        block.clipboardAutogenLangs = [];
      }
    }); //2- Remove contents - based on selected languages


    var importedEnabledLanguages = _.get(importJson, 'details.enabledLanguages', []);

    var validLanguages = _.get(treeJson, 'details.enabledLanguages', []);

    var invalidLanguages = _.difference(importedEnabledLanguages, validLanguages);

    if (invalidLanguages.length > 0) {
      var blockContentsToReview = ['customData.reviewed', 'audioFiles', 'smsContent', 'ussdContent', 'socialContent', 'clipboardContent', 'smsAutogenLangs', 'ussdAutogenLangs', 'socialAutogenLangs', 'clipboardAutogenLangs'];

      _.forEach(_.get(importJson, 'blocks'), function (block, i) {
        _.forEach(blockContentsToReview, function (contentPath, i) {
          var content = _.get(block, contentPath, {});

          var sanitizedContent = [];

          if (_.isArray(content)) {
            //AutogenLangs
            sanitizedContent = _.difference(content, invalidLanguages); //remove by value
          } else {
            //Contents & others
            sanitizedContent = _.omit(content, invalidLanguages); //remove by prop
          }

          _.set(block, contentPath, sanitizedContent);
        });
      });
    } // 3- Fix non object contents & Strip out customData from some block types
    // Block Type KeyValues to strip out


    var orgContentBlockTypeKeys = {
      "SubscriberBranchBlock": ['customDataCategory', 'customDataValue', 'propertyFieldId'],
      "GroupBranchBlock": ['groupId'],
      "GroupSizeBranchBlock": ['groupId'],
      "SubscriberPropertyBlock": ['customDataCategory', 'customDataValue', 'newLanguage', 'propertyFieldId'],
      "GroupPropertyBlock": ['groupId'],
      "BillSubscriberBlock": ['apiUrlDestination', 'apiUsername', 'apiPassword', 'apiProductCode', 'apiStockCode', 'apiDeductionAmount', 'apiOperationId', 'apiOperationType'],
      "TriggerOutgoingCallBlock": ['recipientType', 'scheduleType', 'messageVersionSetId', 'messageId', 'surveyVersionSetId', 'surveyId', 'treeVersionSetId', 'treeId', 'languageSelectorId', 'subscribers'],
      "LanguageSelectorBlock": ['languageSelectorId'],
      "CallHistoryBranchBlock": ['mode', 'rangeDays', 'rangeStartDate', 'rangeEndDate'],
      "DirectorySelectionBlock": ['setSubscriberPropertyConfiguration'],
      "OpenQuestionBlock": ['setSubscriberPropertyConfiguration'],
      "RandomOrderMultipleChoiceQuestionBlock": ['setSubscriberPropertyConfiguration'],
      "MultipleChoiceQuestionBlock": ['setSubscriberPropertyConfiguration'],
      "NumericQuestionBlock": ['setSubscriberPropertyConfiguration'],
      "CollaborativeFilteringRatingBlock": ['candidateBlocks'],
      "CollaborativeFilteringRatioBranchBlock": ['candidateBlock']
    };

    _.forEach(_.get(importJson, 'blocks'), function (block, i) {
      block.audioFiles = Array.isArray(block.audioFiles) ? {} : block.audioFiles;
      block.smsContent = Array.isArray(block.smsContent) ? {} : block.smsContent;
      block.ussdContent = Array.isArray(block.ussdContent) ? {} : block.ussdContent;
      block.socialContent = Array.isArray(block.socialContent) ? {} : block.socialContent;
      block.clipboardContent = Array.isArray(block.clipboardContent) ? {} : block.clipboardContent;
      block.customData = Array.isArray(block.customData) ? {} : block.customData;

      if (_.has(orgContentBlockTypeKeys, block.type)) {
        // For each key within the Block Type
        _.forEach(orgContentBlockTypeKeys[block.type], function (key, i) {
          delete block.customData[key];
        });
      }
    });

    return _.extend({}, treeJson, {
      details: _.assign({}, _.get(importJson, 'details'), treeJson.details),
      blocks: _.get(importJson, 'blocks', []),
      connections: _.get(importJson, 'connections', [])
    });
  };

  app.Tree.validateTreeData = function (json, schema) {
    // Usage:
    // schema = app.Tree.createJsonSchemaFor(
    //    _.pluck(app.ui.languages, 'id'),
    //    _.keys(app.ui.blockClasses))
    // app.tree = app.Tree.validateAndCreateFrom(json, schema)
    if (!json) {
      // json was invalid at some point along the way
      throw _.extend(new Ajv.ValidationError([]), {
        message: 'Tree validation failed!'
      });
    }

    var validate = new Ajv({
      coerceTypes: true
    }).compile(schema);

    if (!validate(json)) {
      // validate.errors are a list like:
      // [{"keyword":"type","dataPath":".details.title","schemaPath":"#/properties/details/properties/title/type","params":{"type":"string"},"message":"should be string"}]
      throw _.extend(new Ajv.ValidationError(validate.errors), {
        message: 'Tree validation failed!'
      });
    }

    if (this._validateNonExistentBlockReferences(json.blocks, json.connections)) {
      throw _.extend(new Ajv.ValidationError([{
        keyword: 'reference',
        dataPath: '.connections.items.properties',
        message: "should reference existing jsKey properties"
      }]), {
        message: 'Tree validation failed!'
      });
    }
  };

  app.Tree.createJsonSchemaFor = function (languages, blockTypes) {
    // todo: fix enum for language
    // todo: fix enum for block classes
    // todo: add enum for `connection.startBlockKey` and `connection.endBlockKey`
    // todo: add enum for `connection.endBlockKey`
    // todo: add enum for `details.startingBlockKey`
    // Reference: http://epoberezkin.github.io/ajv/keywords.html
    return {
      "properties": {
        "id": {
          "type": "integer"
        },
        "details": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "hasVoice": {
              "type": "boolean"
            },
            "enabledLanguages": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": languages
              }
            },
            "hasSms": {
              "type": "boolean"
            },
            "hasUssd": {
              "type": "boolean"
            },
            "hasSocial": {
              "type": "boolean"
            },
            "startingBlockKey": {
              "type": "string"
            }
          }
        },
        "blocks": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": blockTypes
              },
              "customData": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "repeatKey": {
                    "type": "integer"
                  },
                  "repeatMax": {
                    "type": "integer"
                  },
                  "repeatDelay": {
                    "type": "integer"
                  },
                  "repeat": {
                    "type": "boolean"
                  }
                }
              },
              "uiData": {
                "type": "object",
                "properties": {
                  "xPosition": {
                    "type": "integer"
                  },
                  "yPosition": {
                    "type": "integer"
                  },
                  "numConnections": {
                    "type": "integer"
                  }
                }
              },
              "audioFiles": {
                "type": "object"
              },
              "smsContent": {
                "type": "object"
              },
              "ussdContent": {
                "type": "object"
              },
              "socialContent": {
                "type": "object"
              },
              "clipboardContent": {
                "type": "object"
              },
              "smsAutogenLangs": {
                "type": "array"
              },
              "ussdAutogenLangs": {
                "type": "array"
              },
              "socialAutogenLangs": {
                "type": "array"
              },
              "clipboardAutogenLangs": {
                "type": "array"
              },
              "jsKey": {
                "type": "string"
              }
            }
          }
        },
        "connections": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "startBlockKey": {
                "type": "string"
              },
              "outputKey": {
                "type": "string"
              },
              "endBlockKey": {
                "type": "string"
              }
            }
          }
        }
      }
    };
  };
})();

/***/ }),

/***/ "2d9e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FlowEditor.vue?vue&type=template&id=427f7bb2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-flow'))+" ")]),_c('flow-name-editor',{attrs:{"flow":_vm.flow}}),_c('flow-label-editor',{attrs:{"flow":_vm.flow}}),_c('flow-interaction-timeout-editor',{attrs:{"flow":_vm.flow}}),_c('flow-languages-editor',{attrs:{"flow":_vm.flow},on:{"commitFlowLanguagesChange":_vm.updateFlowLanguages}}),_c('flow-modes-editor',{attrs:{"flow":_vm.flow},on:{"commitFlowModesChange":_vm.updateFlowModes}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FlowEditor.vue?vue&type=template&id=427f7bb2&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/NameEditor.vue?vue&type=template&id=a9aa38fa&
var NameEditorvue_type_template_id_a9aa38fa_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group flow-label"},[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.flow-name'),"placeholder":_vm._f("trans")('flow-builder.enter-flow-name')},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}})],1)}
var NameEditorvue_type_template_id_a9aa38fa_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/NameEditor.vue?vue&type=template&id=a9aa38fa&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/NameEditor.vue?vue&type=script&lang=ts&











var flowVuexNamespace = Object(lib["b" /* namespace */])('flow');

var NameEditorvue_type_script_lang_ts_FlowNameEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(FlowNameEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(FlowNameEditor);

  function FlowNameEditor() {
    Object(classCallCheck["a" /* default */])(this, FlowNameEditor);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(FlowNameEditor, [{
    key: "name",
    get: function get() {
      return this.flow.name || "";
    },
    set: function set(value) {
      this.flow_setName({
        flowId: this.flow.uuid,
        value: value
      });
    }
  }]);

  return FlowNameEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], NameEditorvue_type_script_lang_ts_FlowNameEditor.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], NameEditorvue_type_script_lang_ts_FlowNameEditor.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([flowVuexNamespace.Mutation], NameEditorvue_type_script_lang_ts_FlowNameEditor.prototype, "flow_setName", void 0);

NameEditorvue_type_script_lang_ts_FlowNameEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], NameEditorvue_type_script_lang_ts_FlowNameEditor);
/* harmony default export */ var NameEditorvue_type_script_lang_ts_ = (NameEditorvue_type_script_lang_ts_FlowNameEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/NameEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_NameEditorvue_type_script_lang_ts_ = (NameEditorvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/NameEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  flow_editors_NameEditorvue_type_script_lang_ts_,
  NameEditorvue_type_template_id_a9aa38fa_render,
  NameEditorvue_type_template_id_a9aa38fa_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NameEditor = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/LabelEditor.vue?vue&type=template&id=63d28d50&
var LabelEditorvue_type_template_id_63d28d50_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group flow-name"},[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.flow-label'),"placeholder":_vm._f("trans")('flow-builder.enter-flow-label')},model:{value:(_vm.label),callback:function ($$v) {_vm.label=$$v},expression:"label"}})],1)}
var LabelEditorvue_type_template_id_63d28d50_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/LabelEditor.vue?vue&type=template&id=63d28d50&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/LabelEditor.vue?vue&type=script&lang=ts&










var LabelEditorvue_type_script_lang_ts_flowVuexNamespace = Object(lib["b" /* namespace */])('flow');

var LabelEditorvue_type_script_lang_ts_FlowLabelEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(FlowLabelEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(FlowLabelEditor);

  function FlowLabelEditor() {
    Object(classCallCheck["a" /* default */])(this, FlowLabelEditor);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(FlowLabelEditor, [{
    key: "label",
    get: function get() {
      return this.flow.label || "";
    },
    set: function set(value) {
      this.flow_setLabel({
        flowId: this.flow.uuid,
        value: value
      });
    }
  }]);

  return FlowLabelEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], LabelEditorvue_type_script_lang_ts_FlowLabelEditor.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], LabelEditorvue_type_script_lang_ts_FlowLabelEditor.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([LabelEditorvue_type_script_lang_ts_flowVuexNamespace.Mutation], LabelEditorvue_type_script_lang_ts_FlowLabelEditor.prototype, "flow_setLabel", void 0);

LabelEditorvue_type_script_lang_ts_FlowLabelEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], LabelEditorvue_type_script_lang_ts_FlowLabelEditor);
/* harmony default export */ var LabelEditorvue_type_script_lang_ts_ = (LabelEditorvue_type_script_lang_ts_FlowLabelEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/LabelEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_LabelEditorvue_type_script_lang_ts_ = (LabelEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/LabelEditor.vue





/* normalize component */

var LabelEditor_component = Object(componentNormalizer["a" /* default */])(
  flow_editors_LabelEditorvue_type_script_lang_ts_,
  LabelEditorvue_type_template_id_63d28d50_render,
  LabelEditorvue_type_template_id_63d28d50_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LabelEditor = (LabelEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue?vue&type=template&id=780f3a90&
var InteractionTimeoutEditorvue_type_template_id_780f3a90_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group flow-interaction-timeout"},[_c('numeric-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.Interaction-timeout'),"placeholder":_vm._f("trans")('flow-builder.enter-value')},model:{value:(_vm.interactionTimeout),callback:function ($$v) {_vm.interactionTimeout=_vm._n($$v)},expression:"interactionTimeout"}})],1)}
var InteractionTimeoutEditorvue_type_template_id_780f3a90_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue?vue&type=template&id=780f3a90&

// EXTERNAL MODULE: ./src/components/common/NumericEditor.vue + 4 modules
var NumericEditor = __webpack_require__("2f00");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue?vue&type=script&lang=ts&










var InteractionTimeoutEditorvue_type_script_lang_ts_flowVuexNamespace = Object(lib["b" /* namespace */])('flow');

var InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(InteractionTimeoutEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(InteractionTimeoutEditor);

  function InteractionTimeoutEditor() {
    Object(classCallCheck["a" /* default */])(this, InteractionTimeoutEditor);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(InteractionTimeoutEditor, [{
    key: "interactionTimeout",
    get: function get() {
      //30 comes from src/store/flow/flow.ts
      return this.flow.interactionTimeout || 30;
    },
    set: function set(value) {
      this.flow_setInteractionTimeout({
        flowId: this.flow.uuid,
        value: value
      });
    }
  }]);

  return InteractionTimeoutEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([InteractionTimeoutEditorvue_type_script_lang_ts_flowVuexNamespace.Mutation], InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor.prototype, "flow_setInteractionTimeout", void 0);

InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor);
/* harmony default export */ var InteractionTimeoutEditorvue_type_script_lang_ts_ = (InteractionTimeoutEditorvue_type_script_lang_ts_InteractionTimeoutEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_InteractionTimeoutEditorvue_type_script_lang_ts_ = (InteractionTimeoutEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/InteractionTimeoutEditor.vue





/* normalize component */

var InteractionTimeoutEditor_component = Object(componentNormalizer["a" /* default */])(
  flow_editors_InteractionTimeoutEditorvue_type_script_lang_ts_,
  InteractionTimeoutEditorvue_type_template_id_780f3a90_render,
  InteractionTimeoutEditorvue_type_template_id_780f3a90_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var flow_editors_InteractionTimeoutEditor = (InteractionTimeoutEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/LanguagesEditor.vue?vue&type=template&id=5041fc1c&
var LanguagesEditorvue_type_template_id_5041fc1c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group flow-languages"},[_c('label',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.languages')))]),_vm._l((_vm.languages),function(language){return _c('div',{key:language.id,staticClass:"checkbox"},[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.flowSelectedLanguages),expression:"flowSelectedLanguages"}],staticClass:"flow-language-toggle-checkbox",attrs:{"type":"checkbox"},domProps:{"value":language,"checked":Array.isArray(_vm.flowSelectedLanguages)?_vm._i(_vm.flowSelectedLanguages,language)>-1:(_vm.flowSelectedLanguages)},on:{"change":function($event){var $$a=_vm.flowSelectedLanguages,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=language,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.flowSelectedLanguages=$$a.concat([$$v]))}else{$$i>-1&&(_vm.flowSelectedLanguages=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.flowSelectedLanguages=$$c}}}}),_vm._v(" "+_vm._s(language.name)+" ")])])})],2)}
var LanguagesEditorvue_type_template_id_5041fc1c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/LanguagesEditor.vue?vue&type=template&id=5041fc1c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/LanguagesEditor.vue?vue&type=script&lang=ts&










var LanguagesEditorvue_type_script_lang_ts_LanguagesEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(LanguagesEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(LanguagesEditor);

  function LanguagesEditor() {
    Object(classCallCheck["a" /* default */])(this, LanguagesEditor);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(LanguagesEditor, [{
    key: "languages",
    get: function get() {
      return this.$store.state.trees.ui.languages;
    }
  }, {
    key: "flowSelectedLanguages",
    get: function get() {
      return this.flow.languages || [];
    },
    set: function set(value) {
      this.$emit('commitFlowLanguagesChange', value);
    }
  }]);

  return LanguagesEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], LanguagesEditorvue_type_script_lang_ts_LanguagesEditor.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], LanguagesEditorvue_type_script_lang_ts_LanguagesEditor.prototype, "flow", void 0);

LanguagesEditorvue_type_script_lang_ts_LanguagesEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], LanguagesEditorvue_type_script_lang_ts_LanguagesEditor);
/* harmony default export */ var LanguagesEditorvue_type_script_lang_ts_ = (LanguagesEditorvue_type_script_lang_ts_LanguagesEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/LanguagesEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_LanguagesEditorvue_type_script_lang_ts_ = (LanguagesEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/LanguagesEditor.vue





/* normalize component */

var LanguagesEditor_component = Object(componentNormalizer["a" /* default */])(
  flow_editors_LanguagesEditorvue_type_script_lang_ts_,
  LanguagesEditorvue_type_template_id_5041fc1c_render,
  LanguagesEditorvue_type_template_id_5041fc1c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var flow_editors_LanguagesEditor = (LanguagesEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/ModesEditor.vue?vue&type=template&id=eec9a104&
var ModesEditorvue_type_template_id_eec9a104_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group flow-modes"},[_c('label',[_vm._v(_vm._s(_vm._f("trans")('flow-builder.modes')))]),_vm._l((_vm.availableModes),function(mode){return _c('div',{key:mode,staticClass:"checkbox"},[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.flowSelectedModes),expression:"flowSelectedModes"}],staticClass:"flow-mode-toggle-checkbox",attrs:{"type":"checkbox"},domProps:{"value":mode,"checked":Array.isArray(_vm.flowSelectedModes)?_vm._i(_vm.flowSelectedModes,mode)>-1:(_vm.flowSelectedModes)},on:{"change":function($event){var $$a=_vm.flowSelectedModes,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=mode,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.flowSelectedModes=$$a.concat([$$v]))}else{$$i>-1&&(_vm.flowSelectedModes=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.flowSelectedModes=$$c}}}}),_vm._v(" "+_vm._s(mode)+" ")])])})],2)}
var ModesEditorvue_type_template_id_eec9a104_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/ModesEditor.vue?vue&type=template&id=eec9a104&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/ModesEditor.vue?vue&type=script&lang=ts&












var ModesEditorvue_type_script_lang_ts_ModeEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(ModeEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(ModeEditor);

  function ModeEditor() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ModeEditor);

    _this = _super.apply(this, arguments);
    _this.availableModes = Object.values(dist["SupportedMode"]);
    return _this;
  }

  Object(createClass["a" /* default */])(ModeEditor, [{
    key: "flowSelectedModes",
    get: function get() {
      return this.flow.supportedModes;
    },
    set: function set(value) {
      this.$emit('commitFlowModesChange', value);
    }
  }]);

  return ModeEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])({
  default: true
})], ModesEditorvue_type_script_lang_ts_ModeEditor.prototype, "isEditable", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], ModesEditorvue_type_script_lang_ts_ModeEditor.prototype, "flow", void 0);

ModesEditorvue_type_script_lang_ts_ModeEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    NumericEditor: NumericEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], ModesEditorvue_type_script_lang_ts_ModeEditor);
/* harmony default export */ var ModesEditorvue_type_script_lang_ts_ = (ModesEditorvue_type_script_lang_ts_ModeEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/ModesEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_ModesEditorvue_type_script_lang_ts_ = (ModesEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/ModesEditor.vue





/* normalize component */

var ModesEditor_component = Object(componentNormalizer["a" /* default */])(
  flow_editors_ModesEditorvue_type_script_lang_ts_,
  ModesEditorvue_type_template_id_eec9a104_render,
  ModesEditorvue_type_template_id_eec9a104_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ModesEditor = (ModesEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/flow-editors/FlowEditor.vue?vue&type=script&lang=ts&














var FlowEditorvue_type_script_lang_ts_flowVuexNamespace = Object(lib["b" /* namespace */])('flow');

var FlowEditorvue_type_script_lang_ts_FlowEditor = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(FlowEditor, _Vue);

  var _super = Object(createSuper["a" /* default */])(FlowEditor);

  function FlowEditor() {
    Object(classCallCheck["a" /* default */])(this, FlowEditor);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(FlowEditor, [{
    key: "updateFlowLanguages",
    value: function updateFlowLanguages(value) {
      this.flow_setLanguages({
        flowId: this.flow.uuid,
        value: value
      });
    }
  }, {
    key: "updateFlowModes",
    value: function updateFlowModes(value) {
      this.flow_setSupportedMode({
        flowId: this.flow.uuid,
        value: value
      });
    }
  }]);

  return FlowEditor;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], FlowEditorvue_type_script_lang_ts_FlowEditor.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([FlowEditorvue_type_script_lang_ts_flowVuexNamespace.Mutation], FlowEditorvue_type_script_lang_ts_FlowEditor.prototype, "flow_setLanguages", void 0);

Object(tslib_es6["__decorate"])([FlowEditorvue_type_script_lang_ts_flowVuexNamespace.Mutation], FlowEditorvue_type_script_lang_ts_FlowEditor.prototype, "flow_setSupportedMode", void 0);

FlowEditorvue_type_script_lang_ts_FlowEditor = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    FlowNameEditor: NameEditor,
    FlowLabelEditor: LabelEditor,
    FlowInteractionTimeoutEditor: flow_editors_InteractionTimeoutEditor,
    FlowLanguagesEditor: flow_editors_LanguagesEditor,
    FlowModesEditor: ModesEditor
  },
  mixins: [lang["a" /* default */]]
})], FlowEditorvue_type_script_lang_ts_FlowEditor);
/* harmony default export */ var FlowEditorvue_type_script_lang_ts_ = (FlowEditorvue_type_script_lang_ts_FlowEditor);
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FlowEditor.vue?vue&type=script&lang=ts&
 /* harmony default export */ var flow_editors_FlowEditorvue_type_script_lang_ts_ = (FlowEditorvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/flow-editors/FlowEditor.vue





/* normalize component */

var FlowEditor_component = Object(componentNormalizer["a" /* default */])(
  flow_editors_FlowEditorvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var flow_editors_FlowEditor = __webpack_exports__["a"] = (FlowEditor_component.exports);

/***/ }),

/***/ "2f00":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/NumericEditor.vue?vue&type=template&id=c30e135a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"number-editor"},[_c('label',[_vm._v(_vm._s(_vm.label))]),(_vm.isEditable)?_c('div',[_c('input',{staticClass:"form-control",attrs:{"type":"number","min":"0","placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"keypress":_vm.filterNumeric,"keydown":function($event){return _vm.$emit('keydown', $event)},"input":function($event){return _vm.$emit('input', $event.target.value)}}})]):_c('p',[_vm._v(" "+_vm._s(_vm.value)+" ")]),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/NumericEditor.vue?vue&type=template&id=c30e135a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/NumericEditor.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var NumericEditorvue_type_script_lang_js_ = ({
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    label: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    filterNumeric: function filterNumeric(e) {
      if (!e.key.match(/[0-9\-]/g)) {
        e.preventDefault();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/common/NumericEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_NumericEditorvue_type_script_lang_js_ = (NumericEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/common/NumericEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  common_NumericEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NumericEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "3018":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InteractionDesigner_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4b79");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InteractionDesigner_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InteractionDesigner_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InteractionDesigner_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "393e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actions; });
/* unused harmony export findResourceWith */
/* unused harmony export findResourceVariantOverModesWith */
/* unused harmony export findResourceVariantOverModesOn */
/* unused harmony export findOrGenerateStubbedVariantFor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return findOrGenerateStubbedVariantOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return discoverContentTypesFor; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99af");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4de4");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("13d5");
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a434");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ade3");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("5530");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("1da1");
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("9300");
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _floip_flow_runner_src_domain_exceptions_ValidationException__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("44e8");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_13__);














var getters = {
  resourcesByUuid: function resourcesByUuid(_ref) {
    var resources = _ref.resources;
    return Object(lodash__WEBPACK_IMPORTED_MODULE_13__["keyBy"])(resources, 'uuid');
  }
};
var mutations = {
  resource_add: function resource_add(_ref2, _ref3) {
    var resources = _ref2.resources;
    var resource = _ref3.resource;
    resources.push(resource);
  },
  //currently unused - see todo
  resource_delete: function resource_delete(_ref4, _ref5) {
    var resources = _ref4.resources;
    var resourceId = _ref5.resourceId;
    //TODO - we need an action that can clean resources and then call this to actuall remove. We need logic to truly check resources are unused
    var resourceIndex = Object(lodash__WEBPACK_IMPORTED_MODULE_13__["findIndex"])(resources, function (resource) {
      return resource.uuid === resourceId;
    });
    resources.splice(resourceIndex, 1);
  },
  resource_createVariant: function resource_createVariant(state, _ref6) {
    var resourceId = _ref6.resourceId,
        variant = _ref6.variant;
    // append to resource
    findResourceWith(resourceId, state).values.push(Object(lodash__WEBPACK_IMPORTED_MODULE_13__["cloneDeep"])(variant));
  },
  resource_setValue: function resource_setValue(state, _ref7) {
    var resourceId = _ref7.resourceId,
        filter = _ref7.filter,
        value = _ref7.value;
    findResourceVariantOverModesWith(resourceId, filter, state).value = value || '';
  },
  // @note -- modes in this case does not tighten filter, but rather exists solely for update operation
  resource_setModes: function resource_setModes(state, _ref8) {
    var resourceId = _ref8.resourceId,
        filter = _ref8.filter,
        modes = _ref8.modes;

    if (Object(lodash__WEBPACK_IMPORTED_MODULE_13__["isEmpty"])(modes)) {
      // todo: create type that requires both resourceId & modes with (N>1) entries
      throw new _floip_flow_runner_src_domain_exceptions_ValidationException__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"]('`mode` is required to assign mode on `IResourceDefinitionVariantOverModes`.');
    } // todo: this should likely validate whether or not we're intersecting with other variants with this operation
    //       eg. variants: [{modes: [a, b]}, {modes: [c]}] => variants[0].modes = [c]


    findResourceVariantOverModesWith(resourceId, filter, state).modes = modes;
  }
};
var actions = {
  resource_createWith: function resource_createWith(_ref9, _ref10) {
    return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, props;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref9.dispatch;
              props = _ref10.props;
              return _context.abrupt("return", Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])({}, Object(lodash__WEBPACK_IMPORTED_MODULE_13__["defaults"])(props, {
                values: []
              })));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  resource_setOrCreateValueModeSpecific: function resource_setOrCreateValueModeSpecific(_ref11, _ref12) {
    var commit = _ref11.commit,
        dispatch = _ref11.dispatch,
        state = _ref11.state;
    var resourceId = _ref12.resourceId,
        filter = _ref12.filter,
        value = _ref12.value;

    try {
      // @note - `find()` raises when absent; this verifies its presence
      findResourceVariantOverModesWith(resourceId, filter, state);
      dispatch('resource_setValueModeSpecific', {
        resourceId: resourceId,
        filter: filter,
        value: value
      });
    } catch (e) {
      if (!(e instanceof _floip_flow_runner_src_domain_exceptions_ValidationException__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])) {
        throw e;
      }

      commit('resource_createVariant', {
        resourceId: resourceId,
        variant: Object.assign(Object(lodash__WEBPACK_IMPORTED_MODULE_13__["cloneDeep"])(filter), {
          value: value
        })
      });
    }
  },
  resource_setValueModeSpecific: function resource_setValueModeSpecific(_ref13, _ref14) {
    var commit = _ref13.commit,
        dispatch = _ref13.dispatch,
        state = _ref13.state;
    var resourceId = _ref14.resourceId,
        filter = _ref14.filter,
        value = _ref14.value;
    // find resource variant over modes
    var mode = Object(lodash__WEBPACK_IMPORTED_MODULE_13__["first"])(filter.modes),
        variant = findResourceVariantOverModesWith(resourceId, filter, state);

    if (variant.modes.length > 1) {
      // need to disambiguate b/c value is spread over multiple modes
      // remove mode from existing variant
      commit('resource_setModes', {
        resourceId: resourceId,
        filter: variant,
        modes: Object(lodash__WEBPACK_IMPORTED_MODULE_13__["without"])(variant.modes, mode)
      }); // // generate new variant-over-modes with single targeted mode

      commit('resource_createVariant', {
        resourceId: resourceId,
        variant: Object.assign(Object(lodash__WEBPACK_IMPORTED_MODULE_13__["cloneDeep"])(variant), {
          modes: [mode],
          value: value
        })
      });
      return; // specialized case, we're done here
    }

    commit('resource_setValue', {
      resourceId: resourceId,
      filter: variant,
      value: value
    });
  }
};
function findResourceWith(uuid, _ref15) {
  var resources = _ref15.resources;
  var resource = Object(lodash__WEBPACK_IMPORTED_MODULE_13__["find"])(resources, {
    uuid: uuid
  });

  if (resource == null) {
    throw new _floip_flow_runner_src_domain_exceptions_ValidationException__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"]("Unable to find resource on context: ".concat(uuid, " in ").concat(Object(lodash__WEBPACK_IMPORTED_MODULE_13__["map"])(resources, 'uuid')));
  }

  return resource;
}
function findResourceVariantOverModesWith(uuid, filter, _ref16) {
  var resources = _ref16.resources;
  return findResourceVariantOverModesOn(findResourceWith(uuid, {
    resources: resources
  }), filter);
}
function findResourceVariantOverModesOn(resource, filter) {
  var keysForComparison = Object(lodash__WEBPACK_IMPORTED_MODULE_13__["without"])(Object.keys(filter), 'modes'),
      // b/c we do explicit partial matching on modes
  filterWithComparatorKeys = Object(lodash__WEBPACK_IMPORTED_MODULE_13__["pick"])(filter, keysForComparison),
      variant = Object(lodash__WEBPACK_IMPORTED_MODULE_13__["find"])(resource.values, function (v) {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_13__["isEqual"])(filterWithComparatorKeys, Object(lodash__WEBPACK_IMPORTED_MODULE_13__["pick"])(v, keysForComparison)) && Object(lodash__WEBPACK_IMPORTED_MODULE_13__["difference"])(filter.modes, v.modes).length === 0;
  });

  if (variant == null) {
    throw new _floip_flow_runner_src_domain_exceptions_ValidationException__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"]("Unable to find resource variant (over modes) on context: (\n      ".concat(resource.uuid, ",\n      ").concat(JSON.stringify(filter), ") in\n        ").concat(JSON.stringify(Object(lodash__WEBPACK_IMPORTED_MODULE_13__["map"])(resource.values, function (v) {
      return Object(lodash__WEBPACK_IMPORTED_MODULE_13__["pick"])(v, keysForComparison);
    }))));
  }

  return variant;
}
function findOrGenerateStubbedVariantFor(resourceId, filter, _ref17) {
  var resources = _ref17.resources;
  return findOrGenerateStubbedVariantOn(findResourceWith(resourceId, {
    resources: resources
  }), filter);
}
function findOrGenerateStubbedVariantOn(resource, filter) {
  try {
    return findResourceVariantOverModesOn(resource, filter);
  } catch (e) {
    if (!(e instanceof _floip_flow_runner_src_domain_exceptions_ValidationException__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])) {
      throw e;
    }

    return Object.assign(Object(lodash__WEBPACK_IMPORTED_MODULE_13__["cloneDeep"])(filter), {
      value: ''
    });
  }
}
function discoverContentTypesFor(mode, resource) {
  var _defaultModeMappings;

  var TEXT = _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedContentType"].TEXT,
      AUDIO = _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedContentType"].AUDIO,
      IMAGE = _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedContentType"].IMAGE,
      VIDEO = _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedContentType"].VIDEO;
  var defaultModeMappings = (_defaultModeMappings = {}, Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_defaultModeMappings, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedMode"].IVR, [AUDIO]), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_defaultModeMappings, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedMode"].SMS, [TEXT]), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_defaultModeMappings, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedMode"].USSD, [TEXT]), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_defaultModeMappings, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedMode"].OFFLINE, [TEXT, IMAGE, VIDEO]), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_defaultModeMappings, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_11__["SupportedMode"].RICH_MESSAGING, [TEXT, IMAGE, VIDEO]), _defaultModeMappings);

  if (!resource || !resource.values.length) {
    return defaultModeMappings[mode];
  }

  var contentTypeOverrides = {}; //TODO - think harder about this - what happens when a mode has a non standard content type - e.g. ivr on a log block
  //What happens in a future localised resource world on things like LogBlock? Do we need a log resource value for every language?

  contentTypeOverrides = resource.values.reduce(function (contentTypeOverrides, value) {
    value.modes.reduce(function (contentTypeOverrides, resourceMode) {
      if (!contentTypeOverrides[resourceMode]) {
        contentTypeOverrides[resourceMode] = [];
      }

      contentTypeOverrides[resourceMode].push(value.contentType);
      return contentTypeOverrides;
    }, contentTypeOverrides);
    return contentTypeOverrides;
  }, contentTypeOverrides);
  return Object.assign(defaultModeMappings, contentTypeOverrides)[mode];
}

/***/ }),

/***/ "3a37":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var proxy = function proxy(name, args) {
  return global.Lang ? global.Lang[name].apply(global.Lang, args) : args[0];
};

var createProxy = function createProxy(name) {
  return function () {
    return proxy(name, arguments);
  };
};

/* harmony default export */ __webpack_exports__["a"] = ({
  filters: {
    trans: createProxy('trans'),
    choice: createProxy('choice')
  },
  methods: {
    trans: function trans(translation) {
      return global.Lang.trans(translation);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "3bae":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TreeBuilderToolbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("581b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TreeBuilderToolbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TreeBuilderToolbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TreeBuilderToolbar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "4678":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "2bfb",
	"./af.js": "2bfb",
	"./ar": "8e73",
	"./ar-dz": "a356",
	"./ar-dz.js": "a356",
	"./ar-kw": "423e",
	"./ar-kw.js": "423e",
	"./ar-ly": "1cfd",
	"./ar-ly.js": "1cfd",
	"./ar-ma": "0a84",
	"./ar-ma.js": "0a84",
	"./ar-sa": "8230",
	"./ar-sa.js": "8230",
	"./ar-tn": "6d83",
	"./ar-tn.js": "6d83",
	"./ar.js": "8e73",
	"./az": "485c",
	"./az.js": "485c",
	"./be": "1fc1",
	"./be.js": "1fc1",
	"./bg": "84aa",
	"./bg.js": "84aa",
	"./bm": "a7fa",
	"./bm.js": "a7fa",
	"./bn": "9043",
	"./bn.js": "9043",
	"./bo": "d26a",
	"./bo.js": "d26a",
	"./br": "6887",
	"./br.js": "6887",
	"./bs": "2554",
	"./bs.js": "2554",
	"./ca": "d716",
	"./ca.js": "d716",
	"./cs": "3c0d",
	"./cs.js": "3c0d",
	"./cv": "03ec",
	"./cv.js": "03ec",
	"./cy": "9797",
	"./cy.js": "9797",
	"./da": "0f14",
	"./da.js": "0f14",
	"./de": "b469",
	"./de-at": "b3eb",
	"./de-at.js": "b3eb",
	"./de-ch": "bb71",
	"./de-ch.js": "bb71",
	"./de.js": "b469",
	"./dv": "598a",
	"./dv.js": "598a",
	"./el": "8d47",
	"./el.js": "8d47",
	"./en-au": "0e6b",
	"./en-au.js": "0e6b",
	"./en-ca": "3886",
	"./en-ca.js": "3886",
	"./en-gb": "39a6",
	"./en-gb.js": "39a6",
	"./en-ie": "e1d3",
	"./en-ie.js": "e1d3",
	"./en-il": "7333",
	"./en-il.js": "7333",
	"./en-in": "ec2e",
	"./en-in.js": "ec2e",
	"./en-nz": "6f50",
	"./en-nz.js": "6f50",
	"./en-sg": "b7e9",
	"./en-sg.js": "b7e9",
	"./eo": "65db",
	"./eo.js": "65db",
	"./es": "898b",
	"./es-do": "0a3c",
	"./es-do.js": "0a3c",
	"./es-us": "55c9",
	"./es-us.js": "55c9",
	"./es.js": "898b",
	"./et": "ec18",
	"./et.js": "ec18",
	"./eu": "0ff2",
	"./eu.js": "0ff2",
	"./fa": "8df4",
	"./fa.js": "8df4",
	"./fi": "81e9",
	"./fi.js": "81e9",
	"./fil": "d69a",
	"./fil.js": "d69a",
	"./fo": "0721",
	"./fo.js": "0721",
	"./fr": "9f26",
	"./fr-ca": "d9f8",
	"./fr-ca.js": "d9f8",
	"./fr-ch": "0e49",
	"./fr-ch.js": "0e49",
	"./fr.js": "9f26",
	"./fy": "7118",
	"./fy.js": "7118",
	"./ga": "5120",
	"./ga.js": "5120",
	"./gd": "f6b4",
	"./gd.js": "f6b4",
	"./gl": "8840",
	"./gl.js": "8840",
	"./gom-deva": "aaf2",
	"./gom-deva.js": "aaf2",
	"./gom-latn": "0caa",
	"./gom-latn.js": "0caa",
	"./gu": "e0c5",
	"./gu.js": "e0c5",
	"./he": "c7aa",
	"./he.js": "c7aa",
	"./hi": "dc4d",
	"./hi.js": "dc4d",
	"./hr": "4ba9",
	"./hr.js": "4ba9",
	"./hu": "5b14",
	"./hu.js": "5b14",
	"./hy-am": "d6b6",
	"./hy-am.js": "d6b6",
	"./id": "5038",
	"./id.js": "5038",
	"./is": "0558",
	"./is.js": "0558",
	"./it": "6e98",
	"./it-ch": "6f12",
	"./it-ch.js": "6f12",
	"./it.js": "6e98",
	"./ja": "079e",
	"./ja.js": "079e",
	"./jv": "b540",
	"./jv.js": "b540",
	"./ka": "201b",
	"./ka.js": "201b",
	"./kk": "6d79",
	"./kk.js": "6d79",
	"./km": "e81d",
	"./km.js": "e81d",
	"./kn": "3e92",
	"./kn.js": "3e92",
	"./ko": "22f8",
	"./ko.js": "22f8",
	"./ku": "2421",
	"./ku.js": "2421",
	"./ky": "9609",
	"./ky.js": "9609",
	"./lb": "440c",
	"./lb.js": "440c",
	"./lo": "b29d",
	"./lo.js": "b29d",
	"./lt": "26f9",
	"./lt.js": "26f9",
	"./lv": "b97c",
	"./lv.js": "b97c",
	"./me": "293c",
	"./me.js": "293c",
	"./mi": "688b",
	"./mi.js": "688b",
	"./mk": "6909",
	"./mk.js": "6909",
	"./ml": "02fb",
	"./ml.js": "02fb",
	"./mn": "958b",
	"./mn.js": "958b",
	"./mr": "39bd",
	"./mr.js": "39bd",
	"./ms": "ebe4",
	"./ms-my": "6403",
	"./ms-my.js": "6403",
	"./ms.js": "ebe4",
	"./mt": "1b45",
	"./mt.js": "1b45",
	"./my": "8689",
	"./my.js": "8689",
	"./nb": "6ce3",
	"./nb.js": "6ce3",
	"./ne": "3a39",
	"./ne.js": "3a39",
	"./nl": "facd",
	"./nl-be": "db29",
	"./nl-be.js": "db29",
	"./nl.js": "facd",
	"./nn": "b84c",
	"./nn.js": "b84c",
	"./oc-lnc": "167b",
	"./oc-lnc.js": "167b",
	"./pa-in": "f3ff",
	"./pa-in.js": "f3ff",
	"./pl": "8d57",
	"./pl.js": "8d57",
	"./pt": "f260",
	"./pt-br": "d2d4",
	"./pt-br.js": "d2d4",
	"./pt.js": "f260",
	"./ro": "972c",
	"./ro.js": "972c",
	"./ru": "957c",
	"./ru.js": "957c",
	"./sd": "6784",
	"./sd.js": "6784",
	"./se": "ffff",
	"./se.js": "ffff",
	"./si": "eda5",
	"./si.js": "eda5",
	"./sk": "7be6",
	"./sk.js": "7be6",
	"./sl": "8155",
	"./sl.js": "8155",
	"./sq": "c8f3",
	"./sq.js": "c8f3",
	"./sr": "cf1e",
	"./sr-cyrl": "13e9",
	"./sr-cyrl.js": "13e9",
	"./sr.js": "cf1e",
	"./ss": "52bd",
	"./ss.js": "52bd",
	"./sv": "5fbd",
	"./sv.js": "5fbd",
	"./sw": "74dc",
	"./sw.js": "74dc",
	"./ta": "3de5",
	"./ta.js": "3de5",
	"./te": "5cbb",
	"./te.js": "5cbb",
	"./tet": "576c",
	"./tet.js": "576c",
	"./tg": "3b1b",
	"./tg.js": "3b1b",
	"./th": "10e8",
	"./th.js": "10e8",
	"./tk": "5aff",
	"./tk.js": "5aff",
	"./tl-ph": "0f38",
	"./tl-ph.js": "0f38",
	"./tlh": "cf75",
	"./tlh.js": "cf75",
	"./tr": "0e81",
	"./tr.js": "0e81",
	"./tzl": "cf51",
	"./tzl.js": "cf51",
	"./tzm": "c109",
	"./tzm-latn": "b53d",
	"./tzm-latn.js": "b53d",
	"./tzm.js": "c109",
	"./ug-cn": "6117",
	"./ug-cn.js": "6117",
	"./uk": "ada2",
	"./uk.js": "ada2",
	"./ur": "5294",
	"./ur.js": "5294",
	"./uz": "2e8c",
	"./uz-latn": "010e",
	"./uz-latn.js": "010e",
	"./uz.js": "2e8c",
	"./vi": "2921",
	"./vi.js": "2921",
	"./x-pseudo": "fd7e",
	"./x-pseudo.js": "fd7e",
	"./yo": "7f33",
	"./yo.js": "7f33",
	"./zh-cn": "5c3a",
	"./zh-cn.js": "5c3a",
	"./zh-hk": "49ab",
	"./zh-hk.js": "49ab",
	"./zh-mo": "3a6c",
	"./zh-mo.js": "3a6c",
	"./zh-tw": "90ea",
	"./zh-tw.js": "90ea"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "4678";

/***/ }),

/***/ "4b79":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "581b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5b26":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _trees__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8b8d");
// import audio from './audio'
// import multimediaUpload from './multimediaUpload'

/* harmony default export */ __webpack_exports__["a"] = ({
  modules: {
    // audio,
    // multimediaUpload,
    trees: _trees__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"] // actions isolated to vuej app

  }
});

/***/ }),

/***/ "5d74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0c39");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Block_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "69ba":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "756e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BuilderCanvas_vue_vue_type_style_index_0_id_4cc35a95_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("69ba");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BuilderCanvas_vue_vue_type_style_index_0_id_4cc35a95_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BuilderCanvas_vue_vue_type_style_index_0_id_4cc35a95_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BuilderCanvas_vue_vue_type_style_index_0_id_4cc35a95_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7865":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("8a79");
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("5319");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("1da1");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("5530");
/* harmony import */ var _lib_filters_lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("3a37");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("2f62");
/* harmony import */ var _store_trees__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("5b26");
/* harmony import */ var _store_flow__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("9f11");
/* harmony import */ var _store_builder__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("af98");
/* harmony import */ var _components_interaction_designer_toolbar_TreeBuilderToolbar_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("f857");
/* harmony import */ var _components_interaction_designer_flow_editors_FlowEditor_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("2d9e");
/* harmony import */ var _components_interaction_designer_BuilderCanvas__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("c42d");









//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 // import {affix as Affix} from 'vue-strap'
// import {SelectOneResponseBlock} from '../components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue'
// import * as BlockTypes from './block-types'
// import JsPlumbBlock from './JsPlumbBlock'

 // needs to be registered separately because it doesn't currently support namespacing


 // import TreeEditor from './TreeEditor'
// import TreeViewer from './TreeViewer'
// import LegacyInteractionDesigner from './InteractionDesigner.legacy'
// import TreeUpdateConflictModal from './TreeUpdateConflictModal';



 // import '../TreeDiffLogger'

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['id', 'mode'],
  mixins: [_lib_filters_lang__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]],
  components: {
    // ...BlockTypes,
    // Affix,
    // JsPlumbBlock,
    // TreeEditor,
    // TreeViewer,
    TreeBuilderToolbar: _components_interaction_designer_toolbar_TreeBuilderToolbar_vue__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"],
    BuilderCanvas: _components_interaction_designer_BuilderCanvas__WEBPACK_IMPORTED_MODULE_18__[/* BuilderCanvas */ "a"],
    FlowEditor: _components_interaction_designer_flow_editors_FlowEditor_vue__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"] // TreeUpdateConflictModal,

  },
  data: function data() {
    return {
      pureVuejsBlocks: [// todo: move this to BlockClassDetails spec // an inversion can be "legacy types"
      'CallBackWithCallCenterBlock', 'CollaborativeFilteringQuestionBlock', 'CollaborativeFilteringRatingBlock', 'CollaborativeFilteringRatioBranchBlock', 'CreateSubscriberBlock', 'CurrentTimeBranchBlock', 'DirectorySelectionBlock', 'EntitySelectionBlock', 'GenerateCodeBlock', 'GroupPropertyBlock', 'SubscriberPropertiesSnapshotBlock', 'SubscriberPropertyBlock', 'SummaryBlock', 'ValidateCodeBlock', 'WebhookBlock', 'WebhookContentBlock', 'RecordGroupMessageBlock', 'PlayGroupMessageBlock']
    };
  },
  computed: Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapGetters */ "c"])(['selectedBlock', 'isEditable', 'hasChanges', 'hasIssues', 'isTreeSaving', 'isTreeValid', 'jsonValidationResults', 'validationResults'])), Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapState */ "e"])({
    // todo: we'll need to do width as well and use margin-right:365 to allow for sidebar
    designerWorkspaceHeight: function designerWorkspaceHeight(_ref) {
      var _ref$trees = _ref.trees,
          tree = _ref$trees.tree,
          ui = _ref$trees.ui;
      return ui.designerWorkspaceHeight;
    },
    tree: function tree(_ref2) {
      var _ref2$trees = _ref2.trees,
          _tree = _ref2$trees.tree,
          ui = _ref2$trees.ui;
      return _tree;
    },
    validationResultsEmptyTree: function validationResultsEmptyTree(_ref3) {
      var _ref3$trees = _ref3.trees,
          tree = _ref3$trees.tree,
          ui = _ref3$trees.ui;
      return !tree.blocks.length;
    },
    hasVoice: function hasVoice(_ref4) {
      var tree = _ref4.trees.tree;
      return tree.details.hasVoice;
    },
    hasSms: function hasSms(_ref5) {
      var tree = _ref5.trees.tree;
      return tree.details.hasSms;
    },
    hasUssd: function hasUssd(_ref6) {
      var tree = _ref6.trees.tree;
      return tree.details.hasUssd;
    },
    hasSocial: function hasSocial(_ref7) {
      var tree = _ref7.trees.tree;
      return tree.details.hasSocial;
    },
    hasClipboard: function hasClipboard(_ref8) {
      var tree = _ref8.trees.tree;
      return tree.details.hasClipboard;
    },
    blockClasses: function blockClasses(_ref9) {
      var ui = _ref9.trees.ui;
      return ui.blockClasses;
    }
  })), Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapGetters */ "c"])('flow', ['activeFlow'])), Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapGetters */ "c"])('builder', ['activeBlock'])), {}, {
    jsKey: function jsKey() {
      return lodash__WEBPACK_IMPORTED_MODULE_10___default.a.get(this.selectedBlock, 'jsKey');
    },
    isPureVueBlock: function isPureVueBlock() {
      // pure vuejs block types handle readonly mode on their own
      return _.includes(this.pureVuejsBlocks, lodash__WEBPACK_IMPORTED_MODULE_10___default.a.get(this.selectedBlock, 'type'));
    },
    sidebarType: function sidebarType() {
      var blockType = lodash__WEBPACK_IMPORTED_MODULE_10___default.a.get(this.selectedBlock, 'type'),
          blockViewerType = blockType && (this.isPureVueBlock ? blockType : 'BlockViewer');
      return this.isEditable ? blockType || 'TreeEditor' : blockViewerType || 'TreeViewer';
    }
  }),
  created: function created() {
    var $store = this.$store;

    var modules = Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])({}, _store_trees__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"].modules), {}, {
      flow: _store_flow__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"],
      builder: _store_builder__WEBPACK_IMPORTED_MODULE_15__[/* default */ "c"]
    });

    Object(lodash__WEBPACK_IMPORTED_MODULE_10__["forEach"])(modules, function (v, k) {
      return !$store.hasModule(k) && $store.registerModule(k, v);
    });
    global.builder = this; // initialize global reference for legacy + debugging

    this.registerBlockTypes();
    this.initializeTreeModel();
    this.updateIsEditableFromParams(this.mode); // `this.mode` comes from captured param in js-routes
  },
  activated: function activated() {
    this.deselectBlocks(); // todo: remove once we have jsKey in our js-route
  },

  /** @note - mixin's mount() is called _before_ local mount() (eg. InteractionDesigner.legacy::mount() is 1st) */
  mounted: function mounted() {
    this.hoistResourceViewerToPushState.bind(this, this.$route.hash);
    this.deselectBlocks();
    this.discoverTallestBlockForDesignerWorkspaceHeight({
      aboveTallest: true
    });
    console.debug('Vuej tree interaction designer mounted!');
  },
  methods: Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapMutations */ "d"])(['deselectBlocks'])), Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapMutations */ "d"])('builder', ['activateBlock'])), Object(vuex__WEBPACK_IMPORTED_MODULE_12__[/* mapActions */ "b"])(['attemptSaveTree', 'discoverTallestBlockForDesignerWorkspaceHeight', 'initializeTreeModel'])), {}, {
    registerBlockTypes: function registerBlockTypes() {
      var _this = this;

      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var blockClasses;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                blockClasses = _this.blockClasses;
                Object(lodash__WEBPACK_IMPORTED_MODULE_10__["forEach"])(blockClasses, /*#__PURE__*/function () {
                  var _ref11 = Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref10) {
                    var type, normalizedType, typeWithoutSeparators, exported;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            type = _ref10.type;
                            normalizedType = type.replace('\\', '_');
                            typeWithoutSeparators = type.replace(/\\/g, '');
                            _context.next = 5;
                            return __webpack_require__("0e11")("./".concat(normalizedType, "Block.vue"));

                          case 5:
                            exported = _context.sent;
                            Object(lodash__WEBPACK_IMPORTED_MODULE_10__["invoke"])(exported, 'install', _this);
                            vue__WEBPACK_IMPORTED_MODULE_11___default.a.component("Flow".concat(typeWithoutSeparators), exported.default);

                          case 8:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref11.apply(this, arguments);
                  };
                }());

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    handleCanvasSelected: function handleCanvasSelected(_ref12) {
      var target = _ref12.target;

      if (!target.classList.contains('builder-canvas')) {
        console.debug('InteractionDesigner', 'Non-canvas selection mitigated');
        return;
      }

      this.activateBlock({
        blockId: null
      });
    },
    updateIsEditableFromParams: function updateIsEditableFromParams(mode) {
      var isEditable = +this.discoverIsEditableFrom(mode, this.$route.hash, !!app.ui.isEditableLocked);
      this.$store.commit('updateIsEditable', {
        value: isEditable
      });
    },

    /** --------------------------------| has-editable-locked | not-editable-locked |
     | mode-is-absent+view-url-suffix   |        0            |     0               |
     | mode-is-absent+edit-url-suffix   |        0 (r=>view)  |     1               |
     | mode-is-absent+absent-url-suffix |        0 (r=>view)  |     0 (r=>view)     | <- Equivalent to /view
     | mode-is-view                     |        0            |     0               |
     | mode-is-view+edit-url-suffix     |        0            |     0               |
     | mode-is-edit                     |        0 (r=>view)  |     1               |
     | mode-is-edit+view-url-suffix     |        0 (r=>view)  |     1               |
     ------------------------------------------------------------------------------ */
    discoverIsEditableFrom: function discoverIsEditableFrom(mode, hash, isEditableLocked) {
      if (isEditableLocked) {
        return false;
      }

      return !isEditableLocked && mode === 'edit' || !mode && lodash__WEBPACK_IMPORTED_MODULE_10___default.a.endsWith(hash, '/edit');
    },
    hoistResourceViewerToPushState: function hoistResourceViewerToPushState(hash) {
      if (!_.endsWith(hash, '/resource-viewer')) {
        return;
      }

      this.$router.history.replace("/trees/".concat(this.id, "/resource-viewer"));
    }
  })
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "86a8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Statuses */
/* unused harmony export FlightStatusToNameMap */
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7db0");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("07ac");
/* harmony import */ var core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("5530");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("1da1");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ade3");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("bc3a");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("4328");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_10__);








var _FlightStatusToNameMa;





var Statuses = {
  // todo: are these values odd?
  PENDING: -1,
  UNINITIALIZED: 0,
  SUCCESS: 1,
  FAILURE: 2
};
var FlightStatusToNameMap = (_FlightStatusToNameMa = {}, Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(_FlightStatusToNameMa, Statuses.PENDING, 'pending'), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(_FlightStatusToNameMa, Statuses.UNINITIALIZED, 'uninitialized'), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(_FlightStatusToNameMa, Statuses.SUCCESS, 'success'), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(_FlightStatusToNameMa, Statuses.FAILURE, 'failure'), _FlightStatusToNameMa);
/* harmony default export */ __webpack_exports__["a"] = ({
  namespaced: true,
  state: function state() {
    return {
      flights: {}
    };
  },
  mutations: {
    create: function create(_ref, _ref2) {
      var flights = _ref.flights;
      var key = _ref2.key,
          promise = _ref2.promise,
          cancellation = _ref2.cancellation;
      vue__WEBPACK_IMPORTED_MODULE_10___default.a.set(flights, key, {
        status: Statuses.PENDING,
        progress: 0,
        error: null,
        promise: promise,
        cancel: cancellation
      });
    },
    cancel: function cancel(_ref3, _ref4) {
      var flights = _ref3.flights;
      var key = _ref4.key;
      lodash__WEBPACK_IMPORTED_MODULE_8___default.a.invoke(flights, "".concat(key, ".cancel"));
    }
  },
  actions: {
    create: function create(_ref5, _ref6) {
      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var commit, dispatch, flights, key, promise, cancellation, previousFlight, flight, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commit = _ref5.commit, dispatch = _ref5.dispatch, flights = _ref5.state.flights;
                key = _ref6.key, promise = _ref6.promise, cancellation = _ref6.cancellation;
                // todo: figure out queuing + streaming
                // todo: convert to .push() + flights.invoke('cancel')
                previousFlight = flights[key];

                if (previousFlight && cancellation) {
                  previousFlight.cancel();
                }

                commit('create', {
                  key: key,
                  promise: promise,
                  cancellation: cancellation
                });
                flight = flights[key];
                flight.id = "flight-".concat(lodash__WEBPACK_IMPORTED_MODULE_8___default.a.uniqueId());
                _context.prev = 7;
                _context.next = 10;
                return promise;

              case 10:
                response = _context.sent;
                Object.assign(flight, {
                  status: Statuses.SUCCESS,
                  progress: 100
                });
                return _context.abrupt("return", response);

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](7);
                // failed request
                flight.error = _context.t0;
                flight.status = Statuses.FAILURE;
                return _context.abrupt("return", null);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 15]]);
      }))();
    },
    createCancellableXhr: function createCancellableXhr(_ref7, config) {
      var commit = _ref7.commit,
          dispatch = _ref7.dispatch,
          state = _ref7.state;

      var key = config.key,
          _CancelToken$source = axios__WEBPACK_IMPORTED_MODULE_7__["CancelToken"].source(),
          token = _CancelToken$source.token,
          cancellation = _CancelToken$source.cancel,
          promise = axios__WEBPACK_IMPORTED_MODULE_7___default.a.request(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
        paramsSerializer: function paramsSerializer(p) {
          return qs__WEBPACK_IMPORTED_MODULE_9___default.a.stringify(p, {
            arrayFormat: 'bracket'
          });
        },
        cancelToken: token,
        onUploadProgress: null,
        // todo: migrate file upload to use this flights api
        onDownloadProgress: null,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }, config));

      return dispatch('create', {
        key: key,
        promise: promise,
        cancellation: cancellation
      });
    },
    resetStatus: function resetStatus(_ref8, _ref9) {
      var commit = _ref8.commit,
          dispatch = _ref8.dispatch,
          flights = _ref8.state.flights;
      var key = _ref9.key;

      if (!flights[key]) {
        return;
      }

      flights[key].status = Statuses.UNINITIALIZED;
      commit('cancel', {
        key: key
      }); // should rather be a m reset mutation to reset other values as well as cancel()
      // eg. (value, error, progress, status, cancel-token), the whole shebang!
    },
    cancelAll: function cancelAll(_ref10) {
      var commit = _ref10.commit,
          dispatch = _ref10.dispatch,
          flights = _ref10.state.flights;

      for (var _i = 0, _Object$keys = Object.keys(flights); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        commit('cancel', {
          key: key
        });
      }
    }
  },
  getters: {
    hasPendingFlight: function hasPendingFlight(state) {
      return Object.values(state.flights).find(function (f) {
        return f.status === Statuses.PENDING;
      });
    }
  }
});

/***/ }),

/***/ "8b8d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99af");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4de4");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7db0");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4160");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("c975");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("d81d");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("a434");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("b64b");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("159b");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("1da1");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("ade3");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("5530");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("d4ec");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("262e");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("2caf");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("9072");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("bc3a");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _lib_mixins_Routes__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("e5fd");
/* harmony import */ var store_common_flight_monitor__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("86a8");
/* harmony import */ var lodash_fp_flow__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("b429");
/* harmony import */ var lodash_fp_flow__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(lodash_fp_flow__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var lodash_fp_pickBy__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("512d");
/* harmony import */ var lodash_fp_pickBy__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(lodash_fp_pickBy__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var lodash_fp_every__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("5d69");
/* harmony import */ var lodash_fp_every__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(lodash_fp_every__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _bootstrap_legacy_global_dependencies__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("aec9");

































var every = lodash_fp_every__WEBPACK_IMPORTED_MODULE_29___default.a.convert({
  cap: false
});

var ValidationError = /*#__PURE__*/function (_Error) {
  Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"])(ValidationError, _Error);

  var _super = Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"])(ValidationError);

  function ValidationError(validationResults) {
    var _this;

    Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"])(this, ValidationError);

    _this = _super.call(this);
    _this.validationResults = validationResults;
    return _this;
  }

  return ValidationError;
}( /*#__PURE__*/Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"])(Error));

/* harmony default export */ __webpack_exports__["a"] = ({
  modules: {
    flights: store_common_flight_monitor__WEBPACK_IMPORTED_MODULE_26__[/* default */ "a"]
  },
  state: function state() {
    var _bootstrapLegacyGloba = Object(_bootstrap_legacy_global_dependencies__WEBPACK_IMPORTED_MODULE_30__[/* bootstrapLegacyGlobalDependencies */ "a"])(),
        app = _bootstrapLegacyGloba.app,
        audio = _bootstrapLegacyGloba.__AUDIO__,
        ui = _bootstrapLegacyGloba.__TREES_UI__; // todo: audio recording feature is likely to be unavailable for standalone app - How do we want to isolate these?


    Object(lodash__WEBPACK_IMPORTED_MODULE_23__["set"])(app, 'audioChoice.audioLibrary', audio.library);
    Object(lodash__WEBPACK_IMPORTED_MODULE_23__["set"])(app, 'audioChoice.recorderList', audio.recording.recorders);
    lodash__WEBPACK_IMPORTED_MODULE_23___default.a.defaultsDeep(ui, {
      audioFiles: audio.library,
      callCenterQueues: null,
      previousTreeJson: JSON.stringify(ui.originalTreeJson),

      /** @note - `validationResults` has two states:
       *            (1) `null` - indicating we have yet to save the tree since loading the page
       *            (2) non-null or `[]` - indicating the tree has been saved and has gone through server-side validation */
      validationResults: ui.originalValidationResults,
      // todo: this is an empty list on page load, and shouldn't be?
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
        isComplete: false
      },
      treeUpdateConflict: null,
      enabledFeatures: [
        /** @see \Voto5\Http\Controllers\V3TreesController::get_editTree */
      ]
    });
    return {
      tree: null,
      ui: ui
    };
  },
  getters: {
    isFeatureCallCenterQueuesEnabled: function isFeatureCallCenterQueuesEnabled(_ref) {
      var ui = _ref.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'callCenterQueues';
      });
    },
    isFeatureCallToRecordEnabled: function isFeatureCallToRecordEnabled(_ref2) {
      var ui = _ref2.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'callToRecord';
      });
    },
    isFeatureMultimediaUploadEnabled: function isFeatureMultimediaUploadEnabled(_ref3) {
      var ui = _ref3.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'multimediaUpload';
      });
    },
    isFeatureTreesBatchLinkAudioEnabled: function isFeatureTreesBatchLinkAudioEnabled(_ref4) {
      var ui = _ref4.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'treesBatchLinkAudio';
      });
    },
    isFeatureAddSubscriberPropertyFieldEnabled: function isFeatureAddSubscriberPropertyFieldEnabled(_ref5) {
      var ui = _ref5.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'addSubscriberPropertyField';
      });
    },
    isFeatureFloipPushEnabled: function isFeatureFloipPushEnabled(_ref6) {
      var ui = _ref6.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'floipPush';
      });
    },
    isFeatureTreeSaveEnabled: function isFeatureTreeSaveEnabled(_ref7) {
      var ui = _ref7.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'treeSave';
      });
    },
    isFeatureTreeSendEnabled: function isFeatureTreeSendEnabled(_ref8) {
      var ui = _ref8.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'treeSend';
      });
    },
    isFeatureTreeDuplicateEnabled: function isFeatureTreeDuplicateEnabled(_ref9) {
      var ui = _ref9.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'treeDuplicate';
      });
    },
    isFeatureTreeViewVersionsEnabled: function isFeatureTreeViewVersionsEnabled(_ref10) {
      var ui = _ref10.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'treeViewVersions';
      });
    },
    isFeatureTreeDuplicateOfEnabled: function isFeatureTreeDuplicateOfEnabled(_ref11) {
      var ui = _ref11.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'treeDuplicateOf';
      });
    },
    isFeatureUpdateInteractionTotalsEnabled: function isFeatureUpdateInteractionTotalsEnabled(_ref12) {
      var ui = _ref12.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'updateInteractionTotals';
      });
    },
    isFeatureAudioUploadEnabled: function isFeatureAudioUploadEnabled(_ref13) {
      var ui = _ref13.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'audioUpload';
      });
    },
    isFeatureViewResultsEnabled: function isFeatureViewResultsEnabled(_ref14) {
      var ui = _ref14.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(ui.enabledFeatures, function (feature) {
        return feature === 'viewResults';
      });
    },
    selectedBlock: function selectedBlock(_ref15, getters, rootState) {
      var tree = _ref15.tree,
          ui = _ref15.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(Object(lodash__WEBPACK_IMPORTED_MODULE_23__["get"])(tree, 'blocks', []), {
        jsKey: ui.selectedBlock
      });
    },
    subscriberPropertyFields: function subscriberPropertyFields(_ref16) {
      var ui = _ref16.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(ui, "subscriberPropertyFields");
    },
    interactiveBlockClasses: function interactiveBlockClasses(_ref17, getters, rootState) {
      var ui = _ref17.ui;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.pickBy(ui.blockClasses, function (value, key) {
        return value.is_interactive;
      });
    },
    interactiveBlocksInTree: function interactiveBlocksInTree(_ref18, _ref19, rootState) {
      var tree = _ref18.tree;
      var interactiveBlockClasses = _ref19.interactiveBlockClasses;
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.filter(tree.blocks, function (b) {
        return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.includes(Object.keys(interactiveBlockClasses), b.type);
      });
    },
    isEditable: function isEditable(_ref20) {
      var ui = _ref20.ui;
      return !!ui.isEditable;
    },
    // todo: trip a debounced version of this (for larger trees)
    // todo: which is faster lodash deep isEqual or JSON.stringify() ?
    hasChanges: function hasChanges(_ref21) {
      var tree = _ref21.tree,
          ui = _ref21.ui;
      return ui.previousTreeJson !== JSON.stringify(tree);
    },
    hasIssues: function hasIssues(_ref22) {
      var tree = _ref22.tree,
          ui = _ref22.ui;
      var validationResults = ui.validationResults,
          validationResultsFromPageLoad = ui.originalValidationResults,
          hasSavedSinceLoad = ui.validationResults;
      return hasSavedSinceLoad && !_.isEmpty(validationResults) || !hasSavedSinceLoad && !_.isEmpty(validationResultsFromPageLoad) || !tree.blocks.length;
    },
    isTreeSaving: function isTreeSaving(state) {
      return state.ui.saveCurrentlyInProgress;
    },
    hasClipboard: function hasClipboard(_ref23) {
      var tree = _ref23.tree;
      return tree.details.hasClipboard;
    },
    isSelectedBlockSupportedForSummary: function isSelectedBlockSupportedForSummary(_ref24, getters) {
      var ui = _ref24.ui;

      if (!getters.selectedBlock) {
        return false;
      }

      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(ui.blockClasses[getters.selectedBlock.type], 'isSummarizable', false);
    },
    canSelectedBlockSetSubscriberProperty: function canSelectedBlockSetSubscriberProperty(_ref25, getters) {
      var ui = _ref25.ui;

      if (!getters.selectedBlock) {
        return false;
      }

      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(ui.blockClasses[getters.selectedBlock.type], 'canSetSubscriberProperty', false);
    },
    languageSelectors: function languageSelectors(_ref26) {
      var ui = _ref26.ui;
      return ui.languageSelectors;
    },
    isBlockAvailableByBlockClass: function isBlockAvailableByBlockClass(state) {
      return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.mapValues(state.ui.blockClasses, function (blockClass) {
        var contentTypesToEnabledStatus = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(blockClass, 'isEnabledForContentType', []);
        return lodash_fp_flow__WEBPACK_IMPORTED_MODULE_27___default()(lodash_fp_pickBy__WEBPACK_IMPORTED_MODULE_28___default()(function (isEnabled, contentType) {
          return state.tree.details["has".concat(lodash__WEBPACK_IMPORTED_MODULE_23___default.a.startCase(contentType))];
        }), every(function (isEnabled, contentType) {
          return contentTypesToEnabledStatus[contentType];
        }))(contentTypesToEnabledStatus);
      });
    },
    // todo: is this an accurate inverse of trees::hasIssues from ResourceViewer ?
    isTreeValid: function isTreeValid(state) {
      return state.tree.blocks.length && !state.ui.originalTreeJsonValidationResults && lodash__WEBPACK_IMPORTED_MODULE_23___default.a.isEmpty(state.ui.validationResults);
    },
    jsonValidationResults: function jsonValidationResults(state) {
      return state.ui.originalTreeJsonValidationResults;
    },
    // Duplicating \Voto\Core\Trees\Tree::getTitle
    treeTitle: function treeTitle(_ref27) {
      var tree = _ref27.tree;
      return tree.title || 'Untitled Tree';
    },
    languages: function languages(_ref28) {
      var ui = _ref28.ui;
      return ui.languages || [];
    },
    availableAudio: function availableAudio(_ref29) {
      var ui = _ref29.ui;
      return ui.audioFiles || [];
    },
    validationResults: function validationResults(_ref30) {
      var ui = _ref30.ui;
      return ui.validationResults;
    },
    treeCreatedAt: function treeCreatedAt(_ref31) {
      var tree = _ref31.tree;
      return tree.createdAt.date;
    },
    treeEditedAt: function treeEditedAt(_ref32) {
      var tree = _ref32.tree;
      return tree.editedAt.date;
    },
    treeUpdatedAt: function treeUpdatedAt(_ref33) {
      var tree = _ref33.tree;
      return tree.updatedAt.date;
    }
  },
  mutations: {
    setWorkingTree: function setWorkingTree(state, _ref34) {
      var treeData = _ref34.tree;
      var tree = new app.Tree(treeData);
      /** @property app.tree
       *  @deprecated We'll only need this until we've eradicated references in legacy. */

      app.tree = tree;
      state.tree = tree.attributes;
    },
    setDesignerWorkspaceHeight: function setDesignerWorkspaceHeight(_ref35, _ref36) {
      var tree = _ref35.tree,
          ui = _ref35.ui;
      var height = _ref36.height;
      ui.designerWorkspaceHeight = height;
    },
    setSelectedBlock: function setSelectedBlock(_ref37, _ref38) {
      var tree = _ref37.tree,
          ui = _ref37.ui;
      var jsKey = _ref38.jsKey;
      ui.selectedBlock = jsKey || '';
    },
    deselectBlocks: function deselectBlocks(_ref39) {
      var tree = _ref39.tree,
          ui = _ref39.ui;
      ui.selectedBlock = '';
    },
    updateTreeDetailsWith: function updateTreeDetailsWith(_ref40, _ref41) {
      var tree = _ref40.tree,
          ui = _ref40.ui;
      var key = _ref41.key,
          value = _ref41.value;
      tree.details[key] = value;
    },
    updateBlockCustomDataFor: function updateBlockCustomDataFor(_ref42, _ref43) {
      var tree = _ref42.tree,
          ui = _ref42.ui;
      var jsKey = _ref43.jsKey,
          key = _ref43.key,
          value = _ref43.value;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(block.customData, key, value);
    },
    updateBlockCustomDataWithNestedKeyFor: function updateBlockCustomDataWithNestedKeyFor(_ref44, _ref45) {
      var tree = _ref44.tree,
          ui = _ref44.ui;
      var jsKey = _ref45.jsKey,
          nestedKey = _ref45.nestedKey,
          value = _ref45.value;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      var customData = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.cloneDeep(block.customData);
      lodash__WEBPACK_IMPORTED_MODULE_23___default.a.set(customData, nestedKey, value);
      block.customData = customData;
    },
    updateBlockUiDataFor: function updateBlockUiDataFor(_ref46, _ref47) {
      var tree = _ref46.tree,
          ui = _ref46.ui;
      var jsKey = _ref47.jsKey,
          key = _ref47.key,
          value = _ref47.value;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(block.uiData, key, value);
    },
    updateMaxNumericDigits: function updateMaxNumericDigits(_ref48, _ref49) {
      var tree = _ref48.tree,
          ui = _ref48.ui;
      var value = _ref49.value;
      var selectedBlock = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: ui.selectedBlock
      });
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(selectedBlock, 'customData.maxNumericDigits', value);
    },
    updateBlockContentFor: function updateBlockContentFor(_ref50, _ref51) {
      var tree = _ref50.tree,
          ui = _ref50.ui;
      var type = _ref51.type,
          langId = _ref51.langId,
          jsKey = _ref51.jsKey,
          value = _ref51.value;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });

      if (type === 'social') {
        //social has nested text content
        if (!block.socialContent[langId]) {
          vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(block.socialContent, langId, {});
        }

        vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(block.socialContent[langId], 'text', value);
      } else {
        block["".concat(type, "Content")] = Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])({}, block["".concat(type, "Content")]), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"])({}, langId, value));
      }
    },
    updateBlockFileContentFor: function updateBlockFileContentFor(_ref52, _ref53) {
      var tree = _ref52.tree,
          ui = _ref52.ui;
      var langId = _ref53.langId,
          jsKey = _ref53.jsKey,
          fileUrl = _ref53.fileUrl,
          fileId = _ref53.fileId,
          fileType = _ref53.fileType,
          mimeType = _ref53.mimeType,
          contentType = _ref53.contentType;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      var content = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(block, contentType + 'Content');

      if (content[langId] === undefined) {
        vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content, langId, {});
      }

      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content[langId], 'fileUrl', fileUrl);
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content[langId], 'fileId', fileId);
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content[langId], 'fileType', fileType);
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content[langId], 'mimeType', mimeType);
    },
    updateBlockFileContentForAllLanguages: function updateBlockFileContentForAllLanguages(_ref54, _ref55) {
      var tree = _ref54.tree,
          ui = _ref54.ui;
      var jsKey = _ref55.jsKey,
          fileUrl = _ref55.fileUrl,
          fileId = _ref55.fileId,
          fileType = _ref55.fileType,
          mimeType = _ref55.mimeType,
          contentType = _ref55.contentType;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      var content = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(block, contentType + 'Content');
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content, 'allLanguagesFileUrl', fileUrl);
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content, 'allLanguagesFileId', fileId);
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content, 'allLanguagesFileType', fileType);
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(content, 'allLanguagesMimeType', mimeType);
    },
    initBlockAutoGenStateFor: function initBlockAutoGenStateFor(_ref56, _ref57) {
      var tree = _ref56.tree,
          ui = _ref56.ui;
      var type = _ref57.type,
          jsKey = _ref57.jsKey;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(block, "".concat(type, "AutogenLangs"), []);
    },
    updateBlockAutoGenStateFor: function updateBlockAutoGenStateFor(_ref58, _ref59) {
      var tree = _ref58.tree,
          ui = _ref58.ui;
      var type = _ref59.type,
          langId = _ref59.langId,
          jsKey = _ref59.jsKey,
          enable = _ref59.value;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      }),
          i = block["".concat(type, "AutogenLangs")].indexOf(+langId),
          absent = i === -1;

      if (enable) {
        absent && block["".concat(type, "AutogenLangs")].push(+langId);
      } else {
        !absent && block["".concat(type, "AutogenLangs")].splice(i, 1);
      }
    },
    updateAudioFileFor: function updateAudioFileFor(_ref60, _ref61) {
      var tree = _ref60.tree,
          ui = _ref60.ui;
      var langId = _ref61.langId,
          jsKey = _ref61.jsKey,
          value = _ref61.value;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      block.audioFiles = Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"])({}, block.audioFiles), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"])({}, langId, value)); // using delete because we depend on audioFile key presence in legacy

      !value && delete block.audioFiles[langId];
    },
    updateReviewedStateFor: function updateReviewedStateFor(_ref62, _ref63) {
      var tree = _ref62.tree,
          ui = _ref62.ui;
      var langId = _ref63.langId,
          jsKey = _ref63.jsKey,
          value = _ref63.value;

      var _lodash$find = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      }),
          data = _lodash$find.customData;

      data.reviewed[langId] = value;
    },
    setBatchMatchAudioResultsTo: function setBatchMatchAudioResultsTo(_ref64, _ref65) {
      var tree = _ref64.tree,
          ui = _ref64.ui;
      var value = _ref65.value,
          status = _ref65.status,
          message = _ref65.message;
      // ui.batchMatchAudioStatus = value
      lodash__WEBPACK_IMPORTED_MODULE_23___default.a.extend(ui.batchMatchAudio, {
        results: value,
        status: status,
        message: message,
        isEmpty: lodash__WEBPACK_IMPORTED_MODULE_23___default.a.chain(value) // isEmpty === {"block_1504124559063_84":{"7":null,"8":null,"9":null}
        .values().map(function (matchesByLang) {
          return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.values(matchesByLang);
        }).flatten().filter().isEmpty().value(),
        isFailure: status === 0,
        isPending: status === -1,
        isComplete: status === 1
      });
    },
    updateIsEditable: function updateIsEditable(_ref66, _ref67) {
      var ui = _ref66.ui;
      var value = _ref67.value;
      ui.isEditable = value;
    },
    setContentTypeEnabled: function setContentTypeEnabled(_ref68, _ref69) {
      var tree = _ref68.tree;
      var contentType = _ref69.contentType,
          isEnabled = _ref69.isEnabled;
      tree["has".concat(lodash__WEBPACK_IMPORTED_MODULE_23___default.a.upperFirst(contentType))] = +isEnabled;
    },
    addSubscriberPropertyField: function addSubscriberPropertyField(_ref70, _ref71) {
      var ui = _ref70.ui;
      var property = _ref71.property;
      ui.subscriberPropertyFields.push(property);
    },
    setTreeUpdateConflictStatus: function setTreeUpdateConflictStatus(state, _ref72) {
      var treeUpdateConflict = _ref72.treeUpdateConflict;
      state.ui.treeUpdateConflict = treeUpdateConflict;
    },
    setInteractionTotals: function setInteractionTotals(state, _ref73) {
      var interactionTotals = _ref73.interactionTotals;
      vue__WEBPACK_IMPORTED_MODULE_24___default.a.set(state.ui, 'interactionTotals', interactionTotals);
    }
  },
  actions: {
    initializeTreeModel: function initializeTreeModel(_ref74) {
      var dispatch = _ref74.dispatch,
          isTreeImport = _ref74.state.ui.isTreeImport;

      __webpack_require__("2d35"); // todo: this is also included via `../public/dist/js/legacy/trees` on tree-builder
      //       but we don't include that beast in storybook b/c of global dependency hierarchy
      //       global lodash is the only dependency, and they magically attach themselves onto
      //       root self regardless of whether or not it's being managed by module loader.
      //       Odd behaviour, but works out in this case.


      __webpack_require__("c9e2");

      isTreeImport ? dispatch('initializeTreeModelFromImport') : dispatch('initializeTreeModelFromOriginalTreeJson');
    },
    // @note - these are the only actions that are outside the realm of an existing tree.
    initializeTreeModelFromOriginalTreeJson: function initializeTreeModelFromOriginalTreeJson(_ref75) {
      var commit = _ref75.commit,
          dispatch = _ref75.dispatch,
          ui = _ref75.state.ui;
      commit('setWorkingTree', {
        tree: ui.originalTreeJson
      });
      dispatch('upgradeTreeModel'); // => this kinda sucks, because now we're dispatching vuex notifications for all these upgrades
    },
    initializeTreeModelFromImport: function initializeTreeModelFromImport(_ref76) {
      var commit = _ref76.commit,
          dispatch = _ref76.dispatch,
          ui = _ref76.state.ui;

      var schema = app.Tree.createJsonSchemaFor(_.pluck(ui.languages, 'id'), _.keys(ui.blockClasses)),
          tree = app.Tree._mergeAndSanitizeImportedInto(ui.originalTreeJson, ui.importTreeJson);

      try {
        app.Tree.validateTreeData(tree, schema);
        console.debug('Tree validation succeeded!');
        commit('setWorkingTree', {
          tree: tree
        });
        dispatch('upgradeTreeModel'); // todo: this kinda sucks, because now we're dispatching vuex notifications for all these upgrades

        dispatch('attemptImportPersistence');
      } catch (validation) {
        console.error('Tree validation failed!', validation);
        ui.originalTreeJsonValidationResults = validation; // default initialization solely because a tree is prerequisite to continuation

        dispatch('initializeTreeModelFromOriginalTreeJson');
      }
    },
    attemptImportPersistence: function attemptImportPersistence(_ref77) {
      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var commit, dispatch, _ref77$state, tree, ui, _ref77$state$ui, isTreeImport, originalTreeJsonValidationResults, hasImportValidationErrors, validationResults;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commit = _ref77.commit, dispatch = _ref77.dispatch, _ref77$state = _ref77.state, tree = _ref77$state.tree, ui = _ref77$state.ui, _ref77$state$ui = _ref77$state.ui, isTreeImport = _ref77$state$ui.isTreeImport, originalTreeJsonValidationResults = _ref77$state$ui.originalTreeJsonValidationResults;
                hasImportValidationErrors = !!originalTreeJsonValidationResults;

                if (!(!isTreeImport || hasImportValidationErrors)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return dispatch('attemptSaveTree');

              case 6:
                validationResults = _context.sent;
                console.debug('Tree import save validation results', validationResults); // hook into validation rendering that happens once view is initialized

                ui.originalValidationResults = validationResults;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    // Hoist data to adhere to latest expectations
    upgradeTreeModel: function upgradeTreeModel() {
      app.tree.upgrade();
    },
    discoverTallestBlockForDesignerWorkspaceHeight: function discoverTallestBlockForDesignerWorkspaceHeight(_ref78, _ref79) {
      var commit = _ref78.commit,
          dispatch = _ref78.dispatch,
          state = _ref78.state;
      var _ref79$buffer = _ref79.buffer,
          buffer = _ref79$buffer === void 0 ? 350 : _ref79$buffer,
          aboveTallest = _ref79.aboveTallest;
      var initialHeight = aboveTallest ? app.tree.getTallestBlockPosition() : 0,
          minHeight = 1000,
          height = Math.max(buffer + initialHeight, minHeight);
      commit('setDesignerWorkspaceHeight', {
        height: height
      });
    },
    uiChanged: function uiChanged(context, _ref80) {
      var msg = _ref80.msg;
      console.log('app.ui.change [via vuex.trees.uiChanged]', msg);
    },
    attemptSaveTree: function attemptSaveTree(_ref81) {
      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var dispatch, _ref81$getters, hasChanges, isFeatureTreeSaveEnabled, ui, _global, app;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dispatch = _ref81.dispatch, _ref81$getters = _ref81.getters, hasChanges = _ref81$getters.hasChanges, isFeatureTreeSaveEnabled = _ref81$getters.isFeatureTreeSaveEnabled, ui = _ref81.state.ui;

                if (!(!ui.isEditable || !hasChanges)) {
                  _context2.next = 4;
                  break;
                }

                console.info('trees', 'Decided against unnecessary tree save!');
                return _context2.abrupt("return");

              case 4:
                if (isFeatureTreeSaveEnabled) {
                  _context2.next = 7;
                  break;
                }

                console.info('Feature `treeSave` is disabled');
                return _context2.abrupt("return");

              case 7:
                /*
                 * todo: we can't double-chain our jQuery adapter, unless we put more time into it -- then-ing off jQuery adapted
                 *    results in another raw jQuery promise :P
                 * todo: debounce this?
                 */
                _global = global, app = _global.app;
                _context2.prev = 8;
                _context2.next = 11;
                return dispatch('validateTree');

              case 11:
                dispatch('saveTree');
                _context2.next = 21;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](8);

                if (!(_context2.t0 instanceof ValidationError)) {
                  _context2.next = 20;
                  break;
                }

                app.dataControl._setValidationResultsForUI(_context2.t0.validationResults);

                _context2.next = 21;
                break;

              case 20:
                throw _context2.t0;

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[8, 14]]);
      }))();
    },
    saveTree: function saveTree() {
      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _global2, app;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // todo: we still need a timer for this on data change -- can this be done on a watcher rather than polling?
                _global2 = global, app = _global2.app;
                _context3.next = 3;
                return app.dataControl.send();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
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
    validateTree: function validateTree(_ref82) {
      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var dispatch, tree, validate;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dispatch = _ref82.dispatch, tree = _ref82.state.tree;
                validate = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(global.__TREE_FEATURES__, 'validation.validate');

                if (!validate) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 5;
                return validate(tree);

              case 5:
                _context4.next = 9;
                break;

              case 7:
                _context4.next = 9;
                return dispatch('validateFloipFlow');

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
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
    validateFloipFlow: function validateFloipFlow() {
      /* TODO: (https://viamoinc.atlassian.net/browse/VMO-685) Create default FLOIP CORE Flow validation here and
       *   uncomment the below line after adding an implementation */
      // throw new ValidationError([])

      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    setDefaultBlockRepeatValues: function setDefaultBlockRepeatValues(_ref83, _ref84) {
      var commit = _ref83.commit,
          dispatch = _ref83.dispatch,
          tree = _ref83.state.tree;
      var jsKey = _ref84.jsKey,
          defaults = _ref84.values;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });

      for (var key in defaults) {
        !(key in block.customData) && commit('updateBlockCustomDataFor', {
          jsKey: jsKey,
          key: key,
          value: defaults[key]
        });
      }
    },
    updateTextContent: function updateTextContent(_ref85, _ref86) {
      var commit = _ref85.commit;
      var type = _ref86.type,
          jsKey = _ref86.jsKey,
          langId = _ref86.langId,
          value = _ref86.value,
          disableAutoGen = _ref86.disableAutoGen;
      commit('updateBlockContentFor', {
        type: type,
        jsKey: jsKey,
        langId: langId,
        value: value
      });
      commit('updateBlockAutoGenStateFor', {
        type: type,
        jsKey: jsKey,
        langId: langId,
        value: !disableAutoGen
      });
      commit('updateReviewedStateFor', {
        jsKey: jsKey,
        langId: langId,
        value: false
      });
    },
    setContentFromQuestionText: function setContentFromQuestionText(_ref87, _ref88) {
      var commit = _ref87.commit,
          dispatch = _ref87.dispatch,
          tree = _ref87.state.tree;
      var jsKey = _ref88.jsKey;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });
      var generatedText = block.customData.title;
      var isFirst;
      var maxDigits; // todo: Let's not hand-roll pluralization — https://laravel.com/docs/5.4/localization#pluralization

      var grammar = {
        EN: {
          starter: 'Reply ',
          connector: ' for ',
          separator: ', ',
          conclusion: '.',
          numericStart: 'Reply with up to ',
          numericEndPlural: ' digits.',
          numericEndSingular: ' digit.',
          validationCode: 'Please reply with your unique code'
        }
      };

      if (tree.details.hasSms || tree.details.hasUssd || tree.details.hasSocial || tree.details.hasClipboard) {
        // todo: push these customizations into custom handlers on particular block types
        if (block.type == 'MultipleChoiceQuestionBlock' || block.type == 'CollaborativeFilteringRatingBlock') {
          generatedText += ' ' + grammar.EN.starter;
          isFirst = 1;
          block.customData.choices.forEach(function (choice, index) {
            // choices values
            if (isFirst != 1) {
              generatedText += grammar.EN.separator;
            }

            generatedText += _.parseInt(index + 1) + grammar.EN.connector + choice;
            isFirst = 0;
          });
          generatedText += grammar.EN.conclusion;
        } else if (block.type == 'LocationBlock') {
          generatedText += ' ' + grammar.EN.starter;
          isFirst = 1;
          block.customData.choices.forEach(function (choice, index) {
            // this is likely choice's name prop
            // choiceResponse = $('#' + $(e).attr('id') + '_primaryoption').val()
            if (isFirst != 1) {
              generatedText += grammar.EN.separator;
            }

            generatedText += _.parseInt(index + 1) + grammar.EN.connector + choice.name;
            isFirst = 0;
          });
          generatedText += grammar.EN.conclusion;
        } else if (block.type == 'NumericQuestionBlock') {
          maxDigits = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(block, 'customData.maxNumericDigits');

          if (!maxDigits) {
            maxDigits = 3;
          }

          if (maxDigits == '1') {
            generatedText += ' ' + grammar.EN.numericStart + maxDigits + grammar.EN.numericEndSingular;
          } else {
            generatedText += ' ' + grammar.EN.numericStart + maxDigits + grammar.EN.numericEndPlural;
          }
        } else if (block.type == "IdValidationBlock") {
          generatedText = grammar.EN.validationCode;
        }

        lodash__WEBPACK_IMPORTED_MODULE_23___default.a.forEach(['sms', 'ussd', 'social', 'clipboard'], function (contentType) {
          if (tree.details["has".concat(lodash__WEBPACK_IMPORTED_MODULE_23___default.a.upperFirst(contentType))] && block["".concat(contentType, "AutogenLangs")].length) {
            _.each(block["".concat(contentType, "AutogenLangs")], function (languageId) {
              dispatch('updateTextContent', {
                type: contentType,
                jsKey: block.jsKey,
                langId: languageId,
                value: generatedText
              });
              dispatch('uiChanged', "Updated ".concat(contentType, " Content with auto-gen text: ").concat(generatedText));
            });
          }
        });
      }
    },
    setBlockNumConnections: function setBlockNumConnections(_ref89, _ref90) {
      var commit = _ref89.commit,
          dispatch = _ref89.dispatch,
          state = _ref89.state;
      var newNumConnections = _ref90.value,
          jsKey = _ref90.jsKey;
      console.debug('vuex.trees', 'setBlockNumConnections', newNumConnections, jsKey); // Remove any connection elements connected to the block
      // Remove the block from the UI
      // Change the data number of connections
      // Re-add the block to the UI
      // Re-display the connections going to it

      newNumConnections = _.parseInt(newNumConnections); // Make sure the new number of connections is a number

      if (!_.isFinite(newNumConnections)) {
        newNumConnections = 1;
      } // Enforce appropriate limits on the number of connections:


      if (newNumConnections < 1) {
        newNumConnections = 1;
      }

      var selectedBlockKey = jsKey || app.ui.selectedBlock;
      var selectedBlock = app.tree.getBlock(selectedBlockKey);
      var numConnections = selectedBlock['uiData']['numConnections'];

      if (newNumConnections == numConnections) {
        // If there's no change, skip the intensive process of rebuilding all those connections
        console.log('No change in the number of connections.');
        return true;
      } // Otherwise: change the connections!


      app.ui.lockConnections = 1; // Remove the connections from each of the nodes at the bottom of the block

      _.each(_.range(1, numConnections + 1), function (index) {
        console.debug('Removing connections at', index, 'for', selectedBlockKey); // app.jsPlumb.detachAllConnections(selectedBlockKey + '_node_' + index);
      }); // Remove any connections connected to the "target" / top of the block
      // Fortunately these call the jsPlumb binding for removing a connection
      // which in turn is set to remove the entry from the app.tree.get('connections') array. Yay!
      // app.jsPlumb.detachAllConnections(selectedBlockKey + '_target');
      // Update the actual block data to use the new number:


      selectedBlock['uiData']['numConnections'] = newNumConnections; // Remove any connections that are higher in outputKey (node) number than the new maximum numConnections:

      app.tree.filterBlockConnectionsAboveMax(selectedBlockKey); // Re-add disappeared connections?

      app.ui.lockConnections = 0; // once in vuejs, can we'll be able to just do a [dis]connect via connections diff

      var handleDragStop = dispatch.bind(null, 'discoverTallestBlockForDesignerWorkspaceHeight', {
        aboveTallest: true
      }); // app.jsPlumb.resetBindings(app.tree.get('connections'), true, selectedBlockKey, handleDragStop)

      app.ui.change('Changed number of block connections.');
    },
    setMcqOutputNames: function setMcqOutputNames(_ref91, _ref92) {
      var commit = _ref91.commit,
          dispatch = _ref91.dispatch,
          tree = _ref91.state.tree;
      var jsKey = _ref92.jsKey;
      console.debug('vuex.trees', 'setMcqOutputNames', jsKey);
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });

      if (!block) {
        console.log('AppView::generateMcqOutputNamesFor()', 'Unable to find specified block.');
        return;
      }

      var isOutputBranchingEnabled = !!block.customData.branching,
          outputNames;

      if (isOutputBranchingEnabled) {
        if (block.type === "SummaryBlock") {
          outputNames = [langJs.trans("trees.confirm"), langJs.trans("trees.reject")];
        } else {
          outputNames = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.clone(lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(block, 'customData.choices', lodash__WEBPACK_IMPORTED_MODULE_23___default.a.range(1, block.customData.numChoices + 1)));
        }
      } else {
        outputNames = [1];
      }

      commit('updateBlockCustomDataFor', {
        jsKey: jsKey,
        key: 'numChoices',
        value: outputNames.length
      });
      var isNoResponseExitEnabled = block.customData.addExitForNoResponse;
      isNoResponseExitEnabled && outputNames.push('trees.output-exit');
      commit('updateBlockUiDataFor', {
        jsKey: jsKey,
        key: 'outputNames',
        value: outputNames
      });
      dispatch('setBlockNumConnections', {
        jsKey: jsKey,
        value: outputNames.length
      });
    },
    setMcqSidebarFieldLabels: function setMcqSidebarFieldLabels(_ref93, _ref94) {
      var commit = _ref93.commit,
          dispatch = _ref93.dispatch,
          tree = _ref93.state.tree;
      var jsKey = _ref94.jsKey;
      var block = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(tree.blocks, {
        jsKey: jsKey
      });

      if (!block || !isMCQBlock(block)) {
        console.log('AppView::generateMcqOutputNamesFor()', 'Wrong block type');
        return;
      }

      var isVoiceEnabled = tree.details.hasVoice,
          isTextChannelEnabled = tree.details.hasSms || tree.details.hasUssd || tree.details.hasSocial || tree.details.hasClipboard,
          hasChoiceKeypresses = !lodash__WEBPACK_IMPORTED_MODULE_23___default.a.isEmpty(block.customData.choiceKeypresses),
          fieldLabels;

      if (isVoiceEnabled && !isTextChannelEnabled && hasChoiceKeypresses) {
        fieldLabels = getChoiceKeyPressesFor(block);
      } else if (isVoiceEnabled && isTextChannelEnabled && hasChoiceKeypresses) {
        fieldLabels = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.times(block.customData.numChoices, lodash__WEBPACK_IMPORTED_MODULE_23___default.a.constant('•'));
      } else {
        fieldLabels = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.range(1, block.customData.numChoices + 1);
      }

      commit('updateBlockUiDataFor', {
        jsKey: jsKey,
        key: 'fieldLabels',
        value: fieldLabels
      });
    },
    batchMatchAudioTriggered: function batchMatchAudioTriggered(_ref95, _ref96) {
      var commit = _ref95.commit,
          dispatch = _ref95.dispatch,
          state = _ref95.state;
      var treeId = _ref96.treeId,
          pattern = _ref96.pattern,
          replaceExisting = _ref96.replaceExisting;
      commit('setBatchMatchAudioResultsTo', {
        status: -1
      });
      return axios__WEBPACK_IMPORTED_MODULE_22___default.a.post(Object(_lib_mixins_Routes__WEBPACK_IMPORTED_MODULE_25__[/* routeFrom */ "b"])('trees.treesBatchLinkAudio', {
        treeId: treeId
      }, state.ui.routes), {
        pattern: pattern
      }).then(function (_ref97) {
        var value = _ref97.data.matches;
        commit('setBatchMatchAudioResultsTo', {
          status: 1,
          value: value
        });
        dispatch('commitAllBatchMatchAudioFiles', {
          replaceExisting: replaceExisting
        });
      }).catch(function (_ref98) {
        var message = _ref98.response.data.status_description;
        return commit('setBatchMatchAudioResultsTo', {
          status: 0,
          message: message
        });
      });
    },
    commitAllBatchMatchAudioFiles: function commitAllBatchMatchAudioFiles(_ref99, _ref100) {
      var commit = _ref99.commit,
          dispatch = _ref99.dispatch,
          _ref99$state$ui$batch = _ref99.state.ui.batchMatchAudio,
          isEmpty = _ref99$state$ui$batch.isEmpty,
          results = _ref99$state$ui$batch.results;
      var replaceExisting = _ref100.replaceExisting;

      if (isEmpty) {
        return;
      }

      lodash__WEBPACK_IMPORTED_MODULE_23___default.a.forEach(results, function (byLang, jsKey) {
        lodash__WEBPACK_IMPORTED_MODULE_23___default.a.forEach(byLang, function (matches, langId) {
          dispatch('commitBatchMatchAudioFile', {
            jsKey: jsKey,
            langId: langId,
            matches: matches,
            replaceExisting: replaceExisting
          });
        });
      });
      dispatch('attemptSaveTree');
    },

    /** ------------------ | has-selection | no-selection | unchanged |
     | null   + no-replace | 0             | 1            | 0         |
     | single + no-replace | 0             | 1            | 0         |
     | multi  + no-replace | 0             | 0            | 0         |
     | null   + replace    | 1             | 1            | 0         |
     | single + replace    | 1             | 1            | 0         |
     | multi  + replace    | 0             | 0            | 0         |
     ---------------------------------------------------------------- */
    commitBatchMatchAudioFile: function commitBatchMatchAudioFile(_ref101, _ref102) {
      var commit = _ref101.commit,
          dispatch = _ref101.dispatch,
          blocks = _ref101.state.tree.blocks;
      var jsKey = _ref102.jsKey,
          langId = _ref102.langId,
          matches = _ref102.matches,
          replaceExisting = _ref102.replaceExisting;

      var _lodash$find2 = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.find(blocks, {
        jsKey: jsKey
      }),
          audioFile = _lodash$find2.audioFiles[langId],
          hasSelection = !!audioFile,
          isMulti = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(matches, 'length', 0) > 1,
          match = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(matches, 0, null),
          unchanged = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(audioFile, 'id') === lodash__WEBPACK_IMPORTED_MODULE_23___default.a.get(match, 'id');

      if (unchanged || isMulti || hasSelection && !replaceExisting) {
        return;
      }

      commit('updateAudioFileFor', {
        jsKey: jsKey,
        langId: langId,
        value: match
      });
      commit('updateReviewedStateFor', {
        jsKey: jsKey,
        langId: langId,
        value: false
      });
    },
    addSubscriberPropertyField: function addSubscriberPropertyField(_ref103, _ref104) {
      var commit = _ref103.commit,
          dispatch = _ref103.dispatch,
          state = _ref103.state;
      var displayLabel = _ref104.displayLabel,
          dataType = _ref104.dataType,
          choices = _ref104.choices;
      return axios__WEBPACK_IMPORTED_MODULE_22___default.a.post(Object(_lib_mixins_Routes__WEBPACK_IMPORTED_MODULE_25__[/* routeFrom */ "b"])('trees.addSubscriberPropertyField', null, state.ui.routes), {
        displayLabel: displayLabel,
        dataType: dataType,
        choices: choices
      }).then(function (response) {
        var filteredChoices = lodash__WEBPACK_IMPORTED_MODULE_23___default.a.filter(choices, function (c) {
          return !!c.value;
        });
        commit('addSubscriberPropertyField', {
          property: response.data.data
        });
        return response;
      });
    },
    setTreeUpdateConflictStatus: function setTreeUpdateConflictStatus(_ref105, payload) {
      var commit = _ref105.commit;
      commit('setTreeUpdateConflictStatus', payload);
    },
    fetchInteractionTotals: function fetchInteractionTotals(_ref106, _ref107) {
      return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var state, commit, dispatch, getters, startDate, endDate, key, url, params, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                state = _ref106.state, commit = _ref106.commit, dispatch = _ref106.dispatch, getters = _ref106.getters;
                startDate = _ref107.startDate, endDate = _ref107.endDate;

                if (getters.isFeatureUpdateInteractionTotalsEnabled) {
                  _context6.next = 5;
                  break;
                }

                console.info('Feature `updateInteractionTotals` is disabled');
                return _context6.abrupt("return");

              case 5:
                key = 'interaction-totals';
                url = Object(_lib_mixins_Routes__WEBPACK_IMPORTED_MODULE_25__[/* routeFrom */ "b"])('trees.ajaxTotalInteractions', {
                  treeId: state.tree.id
                }, state.ui.routes);
                params = {
                  startDate: startDate,
                  endDate: endDate
                };
                _context6.next = 10;
                return dispatch('flights/createCancellableXhr', {
                  key: key,
                  url: url,
                  params: params
                });

              case 10:
                response = _context6.sent;

                if (response) {
                  commit('setInteractionTotals', {
                    interactionTotals: response.data
                  });
                }

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    }
  }
});

var getChoiceKeyPressesFor = function getChoiceKeyPressesFor(block) {
  var keypresses = block.customData.choiceKeypresses;
  return lodash__WEBPACK_IMPORTED_MODULE_23___default.a.range(1, block.customData.numChoices + 1).map(function (i) {
    return keypresses[i] || i;
  });
};

var isMCQBlock = function isMCQBlock(block) {
  return block.type === 'MultipleChoiceQuestionBlock' || block.type === 'CollaborativeFilteringRatingBlock' || block.type === 'RandomOrderMultipleChoiceQuestionBlock';
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "8c90":
/***/ (function(module) {

module.exports = JSON.parse("{\"locale\":\"en\",\"defaultLocales\":{\"en\":\"English\",\"fr\":\"Français\"},\"orgTimezone\":\"America/Toronto\",\"permissions\":{\"edit-collabofiltering-statements\":true,\"edit-content\":true,\"export-collabofiltering-submissions\":true,\"export-result-details\":true,\"moderate-collabofiltering-candidates\":true,\"send-call-to-records\":true,\"view-personal-info\":true},\"constants\":null}");

/***/ }),

/***/ "9f11":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: stateFactory, getters, mutations, actions, store

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");
var IdGeneratorUuidV4_default = /*#__PURE__*/__webpack_require__.n(IdGeneratorUuidV4);

// EXTERNAL MODULE: ./src/store/flow/utils/listBuilder.ts
var listBuilder = __webpack_require__("b199");

// CONCATENATED MODULE: ./src/store/flow/block.ts










var block_getters = {// todo: do we do all bocks in all blocks, or all blocks in [!! active flow !!]  ?
  //       the interesting bit is that resources are _all_ resources... so we could follow suit here? :shrug:
  // blocksByUuid: ({flows}) => map(resources, 'uuid')
};
var mutations = {
  block_popFirstExitWithoutTest: function block_popFirstExitWithoutTest(state, _ref) {
    var blockId = _ref.blockId;
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    var block = Object(dist["findBlockOnActiveFlowWith"])(blockId, this.state.flow);
    block.exits = Object(listBuilder["b" /* popFirstEmptyItem */])(block.exits, "test");
  },
  block_popExitsByLabel: function block_popExitsByLabel(state, _ref2) {
    var blockId = _ref2.blockId,
        exitLabel = _ref2.exitLabel;
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    var block = Object(dist["findBlockOnActiveFlowWith"])(blockId, this.state.flow);
    block.exits = block.exits.filter(function (item) {
      return item.label !== exitLabel;
    });
  },
  block_setName: function block_setName(state, _ref3) {
    var blockId = _ref3.blockId,
        value = _ref3.value;
    Object(dist["findBlockOnActiveFlowWith"])(blockId, state).name = value;
  },
  block_setLabel: function block_setLabel(state, _ref4) {
    var blockId = _ref4.blockId,
        value = _ref4.value;
    Object(dist["findBlockOnActiveFlowWith"])(blockId, state).label = value;
  },
  block_setSemanticLabel: function block_setSemanticLabel(state, _ref5) {
    var blockId = _ref5.blockId,
        value = _ref5.value;
    Object(dist["findBlockOnActiveFlowWith"])(blockId, state).semanticLabel = value;
  },
  block_setExitTest: function block_setExitTest(state, _ref6) {
    var exitId = _ref6.exitId,
        blockId = _ref6.blockId,
        value = _ref6.value;
    var exits = Object(dist["findBlockOnActiveFlowWith"])(blockId, state).exits;
    var exit = exits.find(function (exit) {
      return exit.uuid === exitId;
    }) || null;

    if (exit) {
      exit.test = value;
    }
  },
  block_pushNewExit: function block_pushNewExit(state, _ref7) {
    var blockId = _ref7.blockId,
        newExit = _ref7.newExit;
    var block = Object(dist["findBlockOnActiveFlowWith"])(blockId, state);
    block.exits.push(newExit);
  },
  block_updateConfig: function block_updateConfig(state, _ref8) {
    var blockId = _ref8.blockId,
        newConfig = _ref8.newConfig;
    Object(dist["findBlockOnActiveFlowWith"])(blockId, state).config = newConfig;
  },
  block_updateConfigByKey: function block_updateConfigByKey(state, _ref9) {
    var blockId = _ref9.blockId,
        key = _ref9.key,
        value = _ref9.value;
    var currentConfig = Object(dist["findBlockOnActiveFlowWith"])(blockId, state).config;
    currentConfig[key] = value;
    Object(dist["findBlockOnActiveFlowWith"])(blockId, state).config = Object(objectSpread2["a" /* default */])({}, currentConfig);
  },
  block_setBlockExitDestinationBlockId: function block_setBlockExitDestinationBlockId(state, _ref10) {
    var blockId = _ref10.blockId,
        exitId = _ref10.exitId,
        destinationBlockId = _ref10.destinationBlockId;
    var block = Object(dist["findBlockOnActiveFlowWith"])(blockId, state);
    Object(dist["findBlockExitWith"])(exitId, block).destinationBlock = destinationBlockId;
  }
};
var actions = {
  block_createBlockDefaultExitWith: function block_createBlockDefaultExitWith(_ref11, _ref12) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, commit, state, props;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref11.dispatch, commit = _ref11.commit, state = _ref11.state;
              props = _ref12.props;
              _context.next = 4;
              return dispatch('block_createBlockExitWith', {
                props: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, props), {}, {
                  default: true
                })
              });

            case 4:
              return _context.abrupt("return", _context.sent);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  block_createBlockExitWith: function block_createBlockExitWith(_ref13, _ref14) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dispatch, commit, state, props, resource;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref13.dispatch, commit = _ref13.commit, state = _ref13.state;
              props = _ref14.props;
              _context2.next = 4;
              return dispatch('resource_createWith', {
                props: {
                  uuid: new IdGeneratorUuidV4_default.a().generate()
                }
              });

            case 4:
              resource = _context2.sent;
              commit('resource_add', {
                resource: resource
              });
              return _context2.abrupt("return", Object(objectSpread2["a" /* default */])({}, Object(lodash["defaults"])(props, {
                label: resource.uuid,
                tag: '',
                config: {}
              })));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  block_updateBlockExitWith: function block_updateBlockExitWith(_ref15, _ref16) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var dispatch, commit, state, blockId, exitId, value;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref15.dispatch, commit = _ref15.commit, state = _ref15.state;
              blockId = _ref16.blockId, exitId = _ref16.exitId, value = _ref16.value;
              //TODO - handle other props apart from test
              commit('block_setExitTest', {
                blockId: blockId,
                exitId: exitId,
                value: value
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  block_swapBlockExitDestinationBlockIds: function block_swapBlockExitDestinationBlockIds(_ref17, _ref18) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var commit, state, first, second, firstBlock, secondBlock, _findBlockExitWith, firstDestinationBlockId, _findBlockExitWith2, secondDestinationBlockId;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref17.commit, state = _ref17.state;
              first = _ref18.first, second = _ref18.second;

              if (!(!first || !second)) {
                _context4.next = 4;
                break;
              }

              throw new dist["ValidationException"]("Unable to swap destinationBlockId on null: ".concat(JSON.stringify({
                first: first,
                second: second
              })));

            case 4:
              firstBlock = Object(dist["findBlockOnActiveFlowWith"])(first.blockId, state);
              secondBlock = Object(dist["findBlockOnActiveFlowWith"])(second.blockId, state);
              _findBlockExitWith = Object(dist["findBlockExitWith"])(first.exitId, firstBlock), firstDestinationBlockId = _findBlockExitWith.destinationBlock;
              _findBlockExitWith2 = Object(dist["findBlockExitWith"])(second.exitId, secondBlock), secondDestinationBlockId = _findBlockExitWith2.destinationBlock; // todo: this works only when the exit we're targetting is empty
              // todo: blah --- a repaint from HMR redraws it correctly -- why?!
              // todo: blah --- a repaint from HMR also draws an additional exit :( Is there a cache break on connection key we need to leverage here?

              commit('block_setBlockExitDestinationBlockId', {
                blockId: second.blockId,
                exitId: second.exitId,
                destinationBlockId: firstDestinationBlockId
              });
              commit('block_setBlockExitDestinationBlockId', {
                blockId: first.blockId,
                exitId: first.exitId,
                destinationBlockId: secondDestinationBlockId
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
};
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__("15fd");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./src/store/flow/resource.ts
var flow_resource = __webpack_require__("393e");

// CONCATENATED MODULE: ./src/store/flow/flow.ts



















var flow_getters = {
  activeFlow: function activeFlow(state) {
    return state.flows.length && Object(dist["getActiveFlowFrom"])(state);
  },
  hasTextMode: function hasTextMode(state, getters) {
    return [dist["SupportedMode"].USSD, dist["SupportedMode"].SMS].some(function (mode) {
      return Object(lodash["includes"])(getters.activeFlow.supportedModes || [], mode);
    });
  },
  hasVoiceMode: function hasVoiceMode(state, getters) {
    return Object(lodash["includes"])(getters.activeFlow.supportedModes || [], dist["SupportedMode"].IVR);
  }
};
var flow_mutations = {
  flow_addBlock: function flow_addBlock(state, _ref) {
    var flowId = _ref.flowId,
        block = _ref.block;

    if (block == null) {
      throw new dist["ValidationException"]('Unable to add null block to flow');
    }

    var flow = Object(dist["findFlowWith"])(flowId || state.firstFlowId || '', state);
    var length = flow.blocks.push(block);

    if (length === 1) {
      flow.firstBlockId = block.uuid;
    }
  },
  flow_removeBlock: function flow_removeBlock(state, _ref2) {
    var flowId = _ref2.flowId,
        blockId = _ref2.blockId;
    var flow = Object(dist["findFlowWith"])(flowId || state.firstFlowId || '', state);
    var block = Object(dist["findBlockWith"])(blockId, flow); // @throws ValidationException when block absent

    if (block == null) {
      throw new dist["ValidationException"]('Unable to delete block absent from flow');
    }

    var blocks = flow.blocks;
    blocks.splice(blocks.indexOf(block), 1); // clean up stale references
    // 1. flow.firstBlockId
    // 2. flow.exitBlockId
    // 3. flow.blocks.*.exits.*.destinationBlock
    // 4. activeBlockId (we should likely trail a ghost of previous selection and select that one next)
    // todo: convert this whole operation to an ActionTree member
    // todo: use mutations for these:

    if (flow.firstBlockId === blockId) {
      flow.firstBlockId = ''; // todo: make this optional for builder
    }

    if (flow.exitBlockId === blockId) {
      flow.exitBlockId = undefined;
    }

    Object(lodash["forEach"])(blocks, function (_ref3) {
      var exits = _ref3.exits;
      var exitsTowardUs = exits.filter(function (e) {
        return e.destinationBlock === blockId;
      });
      Object(lodash["forEach"])(exitsTowardUs, function (e) {
        return e.destinationBlock = undefined;
      });
    });
    this.state.builder.activeBlockId = null;
  },
  flow_setExitBlockId: function flow_setExitBlockId(state, _ref4) {
    var flowId = _ref4.flowId,
        blockId = _ref4.blockId;
    var flow = Object(dist["findFlowWith"])(flowId, state);
    var block = Object(dist["findBlockWith"])(blockId, flow); // @throws ValidationException when block absent

    flow.exitBlockId = block.uuid;
  },
  flow_setFirstBlockId: function flow_setFirstBlockId(state, _ref5) {
    var flowId = _ref5.flowId,
        blockId = _ref5.blockId;
    var flow = Object(dist["findFlowWith"])(flowId, state);
    var block = Object(dist["findBlockWith"])(blockId, flow); // @throws ValidationException when block absent

    external_commonjs_vue_commonjs2_vue_root_Vue_default.a.set(flow, 'firstBlockId', block.uuid);
  },
  flow_setName: function flow_setName(state, _ref6) {
    var flowId = _ref6.flowId,
        value = _ref6.value;
    Object(dist["findFlowWith"])(flowId, state).name = value;
  },
  flow_setLabel: function flow_setLabel(state, _ref7) {
    var flowId = _ref7.flowId,
        value = _ref7.value;
    Object(dist["findFlowWith"])(flowId, state).label = value;
  },
  flow_setInteractionTimeout: function flow_setInteractionTimeout(state, _ref8) {
    var flowId = _ref8.flowId,
        value = _ref8.value;
    Object(dist["findFlowWith"])(flowId, state).interactionTimeout = value;
  },
  flow_setSupportedMode: function flow_setSupportedMode(state, _ref9) {
    var flowId = _ref9.flowId,
        value = _ref9.value;
    var flow = Object(dist["findFlowWith"])(flowId, state);
    flow.supportedModes = Array.isArray(value) ? value : [value];
  },
  flow_setLanguages: function flow_setLanguages(state, _ref10) {
    var flowId = _ref10.flowId,
        value = _ref10.value;
    var flow = Object(dist["findFlowWith"])(flowId, state);
    flow.languages = Array.isArray(value) ? value : [value];
  }
};
var flow_actions = {
  // todo: this `flow_` prefix doesn't follow suit
  //       because it's actually a method on the root state // IContext-ish type
  //       (same as mutation: `flow_activateBlock` and `flow_add`
  flow_addBlankFlow: function flow_addBlankFlow(_ref11) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatch, commit, state, flow;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref11.dispatch, commit = _ref11.commit, state = _ref11.state;
              _context.next = 3;
              return dispatch('flow_createWith', {
                props: {
                  uuid: new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate()
                }
              });

            case 3:
              flow = _context.sent;
              _context.next = 6;
              return dispatch('flow_add', {
                flow: flow
              });

            case 6:
              return _context.abrupt("return", _context.sent);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  flow_add: function flow_add(_ref12, _ref13) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var state, flow, length;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              state = _ref12.state;
              flow = _ref13.flow;
              length = state.flows.push(flow); // mutating here, because we need to define a root-level scope for this type of action

              if (length === 1) {
                state.firstFlowId = flow.uuid;
              }

              return _context2.abrupt("return", flow);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  flow_addBlankBlockByType: function flow_addBlankBlockByType(_ref14, _ref15) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var commit, dispatch, state, type, props, block;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref14.commit, dispatch = _ref14.dispatch, state = _ref14.state;
              type = _ref15.type, props = Object(objectWithoutProperties["a" /* default */])(_ref15, ["type"]);
              _context3.next = 4;
              return dispatch("flow/".concat(type, "/createWith"), {
                props: Object(objectSpread2["a" /* default */])({
                  uuid: new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate()
                }, props)
              }, {
                root: true
              });

            case 4:
              block = _context3.sent;
              Object(lodash["defaults"])(block, {
                label: undefined,
                semanticLabel: undefined
              });
              commit('flow_addBlock', {
                block: block
              });
              return _context3.abrupt("return", block);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  flow_addBlankResource: function flow_addBlankResource(_ref16) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var dispatch, commit, resource;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch = _ref16.dispatch, commit = _ref16.commit;
              _context4.next = 3;
              return dispatch('resource_createWith', {
                props: {
                  uuid: new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate()
                }
              });

            case 3:
              resource = _context4.sent;
              commit('resource_add', {
                resource: resource
              });
              return _context4.abrupt("return", resource);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  flow_addBlankResourceForEnabledModesAndLangs: function flow_addBlankResourceForEnabledModesAndLangs(_ref17, modeOverrides) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var getters, dispatch, commit, values, blankResource;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              getters = _ref17.getters, dispatch = _ref17.dispatch, commit = _ref17.commit;
              //TODO - figure out of there should only be one value here at first? How would the resource editor change this?
              //TODO - is this right for setup of languages?
              //TODO - How will we add more blank values as supported languages are changed in the flow? We should probably also do this for modes rather than doing all possible modes here.
              values = getters['activeFlow'].languages.reduce(function (memo, language) {
                //Let's just create all the modes. We might need them but if they are switched off they just don't get used
                Object.values(dist["SupportedMode"]).forEach(function (mode) {
                  memo.push({
                    languageId: language.id,
                    value: '',
                    //We can't always get it from the Mode - LogBlock for example has text content for the IVR mode.
                    contentType: modeOverrides ? modeOverrides[mode] : Object(flow_resource["b" /* discoverContentTypesFor */])(mode),
                    modes: [mode]
                  });
                });
                return memo;
              }, []);
              _context5.next = 4;
              return dispatch('resource_createWith', {
                props: {
                  uuid: new IdGeneratorUuidV4["IdGeneratorUuidV4"]().generate(),
                  values: values
                }
              });

            case 4:
              blankResource = _context5.sent;
              commit('resource_add', {
                resource: blankResource
              });
              return _context5.abrupt("return", blankResource);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  flow_createWith: function flow_createWith(_ref18, _ref19) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var dispatch, commit, state, props;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              dispatch = _ref18.dispatch, commit = _ref18.commit, state = _ref18.state;
              props = _ref19.props;
              return _context6.abrupt("return", Object(objectSpread2["a" /* default */])({}, Object(lodash["defaults"])(props, {
                orgId: '',
                name: '',
                label: '',
                lastModified: moment_default()().format('c'),
                interactionTimeout: 30,
                platformMetadata: {},
                supportedModes: DEFAULT_MODES,
                languages: [],
                blocks: [],
                firstBlockId: ''
              })));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
var DEFAULT_MODES = [dist["SupportedMode"].SMS, dist["SupportedMode"].USSD, dist["SupportedMode"].IVR];
// CONCATENATED MODULE: ./src/store/flow/index.ts




var stateFactory = function stateFactory() {
  return {
    flows: [],
    resources: [],
    firstFlowId: null,
    nestedFlowBlockInteractionIdStack: []
  };
};
var store_flow_getters = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, flow_getters), block_getters), flow_resource["d" /* getters */]);
var store_flow_mutations = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, flow_mutations), mutations), flow_resource["e" /* mutations */]);
var store_flow_actions = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, flow_actions), actions), flow_resource["a" /* actions */]);
var store = {
  namespaced: true,
  state: stateFactory,
  getters: store_flow_getters,
  mutations: store_flow_mutations,
  actions: store_flow_actions
};
/* harmony default export */ var store_flow = __webpack_exports__["a"] = (store);

/***/ }),

/***/ "aec9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bootstrapLegacyGlobalDependencies; });
/* harmony import */ var lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("512e");
/* harmony import */ var lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("c1df");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("1157");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_messages_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e1e0");
var _assets_messages_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t("e1e0", 1);





function bootstrapLegacyGlobalDependencies() {
  // initialize configuration sources
  var __APP__ = __webpack_require__("8c90");

  var __CONTEXT__ = __webpack_require__("c5aa"); // todo: the remaining legacy code still expects the ability to mutate data directly on `app.ui.*` rather than using trees store
  //      for now, we'll need to ensure app.ui === __TREES_UI__ */


  var app = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["merge"])(global.app || {}, __CONTEXT__);
  var __TREES_UI__ = app.ui;
  var __AUDIO__ = app.audio; // configure libraries

  var Lang = new lang_js__WEBPACK_IMPORTED_MODULE_0___default.a();
  Lang.setMessages(_assets_messages_json__WEBPACK_IMPORTED_MODULE_4__);
  Lang.setLocale(__APP__.locale);
  Lang.defaultLocale = 'en';
  var moment = moment__WEBPACK_IMPORTED_MODULE_1___default.a;
  moment.locale(Lang.getLocale());
  var jQuery = jquery__WEBPACK_IMPORTED_MODULE_2___default.a;
  var $ = jquery__WEBPACK_IMPORTED_MODULE_2___default.a; // export as globals (overwrites pre-existing)

  var exported = {
    Lang: Lang,
    moment: moment,
    $: $,
    jQuery: jQuery,
    __APP__: __APP__,
    __CONTEXT__: __CONTEXT__,
    __TREES_UI__: __TREES_UI__,
    __AUDIO__: __AUDIO__,
    app: app
  };
  Object.assign(global, exported); // required inline due to front-loading of imports and having jQuery dependency

  __webpack_require__("1b58");

  __webpack_require__("dd54");

  $.fn.datetimepicker.defaults.locale = Lang.getLocale();
  return exported;
}
/* unused harmony default export */ var _unused_webpack_default_export = (bootstrapLegacyGlobalDependencies);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "af98":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperationKind; });
/* unused harmony export stateFactory */
/* unused harmony export getters */
/* unused harmony export mutations */
/* unused harmony export actions */
/* unused harmony export store */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createDefaultBlockTypeInstallerFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return generateConnectionLayoutKeyFor; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99af");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d81d");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a434");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a9e3");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_max_safe_integer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("aff5");
/* harmony import */ var core_js_modules_es_number_max_safe_integer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_max_safe_integer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2909");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("96cf");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("1da1");
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("ade3");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("9300");
/* harmony import */ var _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__);











var OperationKind;

(function (OperationKind) {
  OperationKind["CONNECTION_SOURCE_RELOCATE"] = "CONNECTION_SOURCE_RELOCATE";
  OperationKind["CONNECTION_CREATE"] = "CONNECTION_CREATE";
  OperationKind["BLOCK_RELOCATE"] = "BLOCK_RELOCATE";
})(OperationKind || (OperationKind = {}));

var stateFactory = function stateFactory() {
  var _operations;

  return {
    activeBlockId: null,
    operations: (_operations = {}, Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(_operations, OperationKind.CONNECTION_SOURCE_RELOCATE, {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null
    }), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(_operations, OperationKind.CONNECTION_CREATE, {
      kind: OperationKind.CONNECTION_CREATE,
      data: null
    }), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(_operations, OperationKind.BLOCK_RELOCATE, null), _operations)
  };
};
var getters = {
  activeBlock: function activeBlock(_ref, _ref2) {
    var activeBlockId = _ref.activeBlockId;
    var blocksById = _ref2.blocksById;
    return activeBlockId ? blocksById[activeBlockId] : null;
  },
  blocksById: function blocksById(state, getters, rootState, rootGetters) {
    var blocks = rootGetters['flow/activeFlow'].blocks;
    return Object(lodash__WEBPACK_IMPORTED_MODULE_9__["keyBy"])(blocks, 'uuid');
  },
  nodeLabelsById: function nodeLabelsById(state, getters, _ref3, rootGetters) {
    var flows = _ref3.flow.flows;
    return Object(lodash__WEBPACK_IMPORTED_MODULE_9__["mapValues"])(Object(lodash__WEBPACK_IMPORTED_MODULE_9__["keyBy"])(flows[0].blocks, 'uuid'), 'label');
  },
  exitLabelsById: function exitLabelsById(state, getters, _ref4, rootGetters) {
    var flows = _ref4.flow.flows;
    return Object(lodash__WEBPACK_IMPORTED_MODULE_9__["mapValues"])(Object(lodash__WEBPACK_IMPORTED_MODULE_9__["keyBy"])(Object(lodash__WEBPACK_IMPORTED_MODULE_9__["flatMap"])(flows[0].blocks, 'exits'), 'uuid'), 'label');
  }
};
var mutations = {
  activateBlock: function activateBlock(state, _ref5) {
    var blockId = _ref5.blockId;
    state.activeBlockId = blockId; // simulate engaging with specified block
    // FlowRunner.prototype.navigateTo(block, state as unknown as IContext)
  },
  setOperation: function setOperation(_ref6, _ref7) {
    var operations = _ref6.operations;
    var operation = _ref7.operation;
    //TODO - type checking - remove this ignore and fix these errors - they seem to be quite serious but I'm not sure how to resolve them
    //@ts-ignore
    operations[operation.kind] = operation;
  },
  setBlockPositionTo: function setBlockPositionTo(state, _ref8) {
    var _ref8$position = _ref8.position,
        x = _ref8$position.x,
        y = _ref8$position.y,
        block = _ref8.block;
    // todo: ensure our platform_metadata.io_viamo is always instantiated with builder // uiData props
    // if (!block.platform_metadata.io_viamo.uiData) {
    //   defaultsDeep(block, {platform_metadata: {io_viamo: {uiData: {xPosition: 0, yPosition: 0}}}})
    //   Vue.observable(block.platform_metadata.io_viamo.uiData)
    // }
    block.platform_metadata.io_viamo.uiData.xPosition = x;
    block.platform_metadata.io_viamo.uiData.yPosition = y;
  }
};
var actions = {
  removeConnectionFrom: function removeConnectionFrom(_ref9, _ref10) {
    var commit = _ref9.commit;
    var blockId = _ref10.block.uuid,
        exitId = _ref10.exit.uuid;
    commit('flow/block_setBlockExitDestinationBlockId', {
      blockId: blockId,
      exitId: exitId,
      destinationBlockId: undefined
    }, {
      root: true
    });
  },
  // @note: multiple connections can lead to same node, so it doesn't make sense to do a swap here; we'll be "appending"
  // when moving connection target: setExitDestination(exitId, destinationId)
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_SOURCE_RELOCATE] //////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // todo: do operations warrant their own store? Maybe a generic store that handles a common behaviour
  initializeConnectionSourceRelocateWith: function initializeConnectionSourceRelocateWith(_ref11, _ref12) {
    var commit = _ref11.commit;
    var blockId = _ref12.block.uuid,
        exitId = _ref12.exit.uuid,
        position = _ref12.position;
    // this would be a flight-monitor create(key)
    var operation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {
        from: {
          blockId: blockId,
          exitId: exitId
        },
        position: position,
        to: {
          blockId: blockId,
          exitId: exitId
        }
      }
    };
    commit('setOperation', {
      operation: operation
    });
  },
  setConnectionSourceRelocateValue: function setConnectionSourceRelocateValue(_ref13, _ref14) {
    var commit = _ref13.commit,
        state = _ref13.state;
    var blockId = _ref14.block.uuid,
        exitId = _ref14.exit.uuid;
    var data = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data;

    if (!data) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to modify uninitialized operation: ".concat(JSON.stringify(data)));
    }

    var from = data.from,
        position = data.position;
    var operation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {
        from: from,
        position: position,
        to: {
          blockId: blockId,
          exitId: exitId
        }
      }
    };
    commit('setOperation', {
      operation: operation
    });
  },
  setConnectionSourceRelocateValueToNullFrom: function setConnectionSourceRelocateValueToNullFrom(_ref15, _ref16) {
    var commit = _ref15.commit,
        state = _ref15.state;
    var blockId = _ref16.block.uuid,
        exitId = _ref16.exit.uuid;
    var data = state.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data;

    if (!data) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to modify uninitialized operation: ".concat(JSON.stringify(data)));
    }

    var from = data.from,
        to = data.to,
        position = data.position;

    if (!Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isEqual"])(to, {
      blockId: blockId,
      exitId: exitId
    })) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]('Unable to nullify exit relocation from different exit.');
    }

    var operation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: {
        from: from,
        position: position,
        to: null
      }
    };
    commit('setOperation', {
      operation: operation
    });
  },
  applyConnectionSourceRelocate: function applyConnectionSourceRelocate(_ref17) {
    var dispatch = _ref17.dispatch,
        commit = _ref17.commit,
        operations = _ref17.state.operations;
    var data = operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data;

    if (!data) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to complete uninitialized operation: ".concat(JSON.stringify(data)));
    }

    var first = data.from,
        second = data.to;
    dispatch('flow/block_swapBlockExitDestinationBlockIds', {
      first: first,
      second: second
    }, {
      root: true
    });
    var operation = {
      kind: OperationKind.CONNECTION_SOURCE_RELOCATE,
      data: null
    };
    commit('setOperation', {
      operation: operation
    });
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // [OperationKind.CONNECTION_CREATE] //////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  initializeConnectionCreateWith: function initializeConnectionCreateWith(_ref18, _ref19) {
    var commit = _ref18.commit;
    var blockId = _ref19.block.uuid,
        exitId = _ref19.exit.uuid,
        position = _ref19.position;

    if (!blockId || !exitId) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to create connection without source: ".concat(JSON.stringify({
        blockId: blockId,
        exitId: exitId
      })));
    }

    var operation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {
        source: {
          blockId: blockId,
          exitId: exitId
        },
        position: position,
        target: null
      }
    };
    commit('setOperation', {
      operation: operation
    }); // this would be a flight-monitor create(key)
  },
  setConnectionCreateTargetBlock: function setConnectionCreateTargetBlock(_ref20, _ref21) {
    var commit = _ref20.commit,
        state = _ref20.state;
    var block = _ref21.block;
    var data = state.operations[OperationKind.CONNECTION_CREATE].data;

    if (!data) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to modify uninitialized operation: ".concat(JSON.stringify(data)));
    }

    var source = data.source,
        position = data.position;
    var operation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {
        source: source,
        position: position,
        target: block.uuid
      }
    };
    commit('setOperation', {
      operation: operation
    });
  },
  setConnectionCreateTargetBlockToNullFrom: function setConnectionCreateTargetBlockToNullFrom(_ref22, _ref23) {
    var commit = _ref22.commit,
        state = _ref22.state;
    var block = _ref23.block;
    var data = state.operations[OperationKind.CONNECTION_CREATE].data;

    if (!data) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to modify uninitialized operation: ".concat(JSON.stringify(data)));
    }

    var source = data.source,
        target = data.target,
        position = data.position;

    if (!Object(lodash__WEBPACK_IMPORTED_MODULE_9__["isEqual"])(target, block.uuid)) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]('Unable to nullify exit relocation from different exit.');
    }

    var operation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: {
        source: source,
        position: position,
        target: null
      }
    };
    commit('setOperation', {
      operation: operation
    });
  },
  applyConnectionCreate: function applyConnectionCreate(_ref24) {
    var dispatch = _ref24.dispatch,
        commit = _ref24.commit,
        operations = _ref24.state.operations;
    var data = operations[OperationKind.CONNECTION_CREATE].data;

    if (!data) {
      throw new _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["ValidationException"]("Unable to complete uninitialized operation: ".concat(JSON.stringify(data)));
    }

    var _data$source = data.source,
        blockId = _data$source.blockId,
        exitId = _data$source.exitId,
        destinationBlockId = data.target;
    commit('flow/block_setBlockExitDestinationBlockId', {
      blockId: blockId,
      exitId: exitId,
      destinationBlockId: destinationBlockId
    }, {
      root: true
    });
    var operation = {
      kind: OperationKind.CONNECTION_CREATE,
      data: null
    };
    commit('setOperation', {
      operation: operation
    });
  },

  /**
   * Import Flows And Resources from importer tool
   *
   * The imported JSON should be compatible with IFlowsState
   * {
   *  flows: [
   *    { uuid: 'xxxx', name: 'flow1', ...},
   *    { uuid: 'yyyy', name: 'flow2', ...}]
   *  ],
   *  resources: [
   *    { uuid: 'xxxx-flow1-resource1', values: [...]},
   *    { uuid: 'xxxx-flow1-resource2', values: [...]},
   *    { uuid: 'xxxx-flow2-resource1', values: [...]},
   *    ...
   *  ]
   * }
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param flows
   */
  importFlowsAndResources: function importFlowsAndResources(_ref25, _ref26) {
    return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _flowState$flows, _flowState$resources;

      var dispatch, commit, state, rootState, flows, resources, flowState, defaultSupportedMode, key;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref25.dispatch, commit = _ref25.commit, state = _ref25.state, rootState = _ref25.rootState;
              flows = _ref26.flows, resources = _ref26.resources;
              console.debug('importing flows & resources ...');
              console.log({
                flows: flows,
                resources: resources
              });
              flowState = rootState.flow;
              defaultSupportedMode = [_floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["SupportedMode"].IVR, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["SupportedMode"].SMS, _floip_flow_runner__WEBPACK_IMPORTED_MODULE_10__["SupportedMode"].USSD]; // add default activated modes if not set yet

              for (key in flows) {
                if (!flows[key].hasOwnProperty('supportedModes') || !flows[key].supportedModes.length) {
                  flows[key].supportedModes = defaultSupportedMode;
                }
              } // Update flow state


              (_flowState$flows = flowState.flows).splice.apply(_flowState$flows, [0, Number.MAX_SAFE_INTEGER].concat(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(flows)));

              flowState.firstFlowId = flows[0].uuid;

              (_flowState$resources = flowState.resources).splice.apply(_flowState$resources, [0, Number.MAX_SAFE_INTEGER].concat(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(resources))); // make sure we use the same languages ids on both UI & Flows
              // TODO - type checking - remove this and resolve the error
              //@ts-ignore


              rootState.trees.ui.languages = flows[0].languages;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  loadFlow: function loadFlow(_ref27) {
    return Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dispatch, commit, state, flowContext, flow;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch = _ref27.dispatch, commit = _ref27.commit, state = _ref27.state;
              console.debug('loading flow...'); // todo: we need something like: set context

              flowContext = __webpack_require__("f3a0");
              flow = flowContext.flows[0];
              flowContext.resources.map(function (resource) {
                return commit('flow/resource_add', {
                  resource: resource
                }, {
                  root: true
                });
              });
              _context2.next = 7;
              return dispatch('flow/flow_add', {
                flow: flow
              }, {
                root: true
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
var store = {
  namespaced: true,
  state: stateFactory,
  getters: getters,
  mutations: mutations,
  actions: actions
};
/* harmony default export */ __webpack_exports__["c"] = (store);
function createDefaultBlockTypeInstallerFor(blockType, storeForBlockType) {
  return function (builder) {
    return builder.$store.hasModule(['flow', blockType]) || builder.$store.registerModule(['flow', blockType], storeForBlockType);
  };
}
function generateConnectionLayoutKeyFor(source, target) {
  console.debug('store/builder', 'generateConnectionLayoutKeyFor', source.uuid, target.uuid);
  return [// coords
  // TODO - type checking - remove this and resolve the error
  //@ts-ignore
  [source.platform_metadata.io_viamo.uiData.xPosition, source.platform_metadata.io_viamo.uiData.yPosition], // TODO - type checking - remove this and resolve the error
  //@ts-ignore
  [target.platform_metadata.io_viamo.uiData.xPosition, target.platform_metadata.io_viamo.uiData.yPosition], // block titles
  source.label, target.label].concat(Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(lodash__WEBPACK_IMPORTED_MODULE_9__["map"])(source.exits, 'tag')), Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(lodash__WEBPACK_IMPORTED_MODULE_9__["map"])(target.exits, 'tag')));
}

/***/ }),

/***/ "b199":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return allItemsHaveValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return someItemsHaveValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return twoItemsBlank; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return popFirstEmptyItem; });
/* harmony import */ var core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a623");
/* harmony import */ var core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_every__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("45fc");
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var allItemsHaveValue = function allItemsHaveValue(list, key) {
  return list.every(function (item) {
    return !!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(item, key);
  });
};
var someItemsHaveValue = function someItemsHaveValue(list, key) {
  return list.some(function (item) {
    return !!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(item, key);
  });
};
var twoItemsBlank = function twoItemsBlank(list, key) {
  var blankNumber = 0;
  return list.some(function (item) {
    if (!Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(item, key)) {
      blankNumber += 1;
    }

    if (blankNumber > 1) {
      return true;
    }

    return false;
  });
};
var popFirstEmptyItem = function popFirstEmptyItem(list, key) {
  var exitToRemove = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["find"])(list, function (item) {
    return !Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(item, key);
  });

  if (exitToRemove) {
    list = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["without"])(list, exitToRemove);
  }

  return list;
};

/***/ }),

/***/ "c42d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ BuilderCanvasvue_type_script_lang_ts_BuilderCanvas; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/BuilderCanvas.vue?vue&type=template&id=4cc35a95&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.flows.length)?_c('div',{staticClass:"builder-canvas no-select"},_vm._l((_vm.flows[0].blocks),function(block){return _c('block',{key:block.uuid,attrs:{"id":("block/" + (block.uuid)),"block":block,"x":block.platform_metadata.io_viamo.uiData.xPosition,"y":block.platform_metadata.io_viamo.uiData.yPosition}})}),1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/BuilderCanvas.vue?vue&type=template&id=4cc35a95&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/Block.vue?vue&type=template&id=2d7b1c6e&
var Blockvue_type_template_id_2d7b1c6e_render = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasLayout)?_c('plain-draggable',{staticClass:"block",class:( _obj = {
      active: _vm.isBlockActivated
    }, _obj[("category-" + (_vm.blockClasses[_vm.block.type].category))] = true, _obj ),attrs:{"startX":_vm.x,"startY":_vm.y},on:{"dragged":_vm.onMoved,"dragStarted":_vm.selectBlock}},[_c('header',{staticClass:"block-target draggable-handle",class:{
           'initial': false,
           'pending': _vm.isConnectionCreateActive,
           'fulfilled': false,
           'rejected': false,
           'activated': _vm.isBlockActivated,
         },attrs:{"id":("block/" + (_vm.block.uuid) + "/handle")},on:{"mouseenter":function($event){_vm.isConnectionCreateActive && _vm.activateBlockAsDropZone($event)},"mouseleave":function($event){_vm.isConnectionCreateActive && _vm.deactivateBlockAsDropZone($event)}}},[_c('p',{staticClass:"block-type text-muted"},[_vm._v(" "+_vm._s(_vm.trans(("flow-builder." + (_vm.block.type))))+" ")]),_c('h3',{staticClass:"block-label",class:{'empty': !_vm.block.label}},[_vm._v(" "+_vm._s(_vm.block.label || 'Untitled block')+" ")])]),_c('div',{staticClass:"block-exits"},_vm._l((_vm.block.exits),function(exit){return _c('div',{key:exit.uuid,staticClass:"block-exit",class:{
           'initial': false,
           'pending': _vm.isConnectionSourceRelocateActive,
           'fulfilled': false,
           'rejected': false,
           'activated': _vm.isExitActivatedForRelocate(exit),
         },on:{"mouseenter":function($event){_vm.isConnectionSourceRelocateActive && _vm.activateExitAsDropZone($event, exit)},"mouseleave":function($event){_vm.isConnectionSourceRelocateActive && _vm.deactivateExitAsDropZone($event, exit)}}},[_c('div',{staticClass:"total-label-container"},[_c('span',{staticClass:"label label-primary tree-block-item-label tree-block-item-output-subscribers-1"})]),_c('h3',{staticClass:"block-exit-tag label label-warning"},[_vm._v(_vm._s(exit.tag))]),(exit.destinationBlock == null)?[_c('plain-draggable',{key:("exit/" + (exit.uuid) + "/pseudo-block-handle"),staticClass:"handle-create-link btn btn-default btn-xs btn-flat",class:{
                             'btn-info': exit.destinationBlock != null,
                         },attrs:{"id":("exit/" + (exit.uuid) + "/pseudo-block-handle")},on:{"initialized":function($event){return _vm.handleDraggableInitializedFor(exit, $event)},"dragStarted":function($event){return _vm.onCreateExitDragStarted($event, exit)},"dragged":function($event){return _vm.onCreateExitDragged($event)},"dragEnded":function($event){return _vm.onCreateExitDragEnded($event, exit)}}},[_c('i',{staticClass:"glyphicon glyphicon-move"})]),(_vm.isConnectionCreateActive && _vm.isExitActivatedForCreate(exit) && _vm.livePosition)?[_c('div',{staticClass:"handle-move-link btn btn-default btn-xs",class:{
                             'btn-info': exit.destinationBlock != null,
                         },attrs:{"id":("exit/" + (exit.uuid) + "/handle")}},[_c('i',{staticClass:"glyphicon glyphicon-move"})]),_c('connection',{key:("exit/" + (exit.uuid) + "/line-for-draft"),attrs:{"repaint-cache-key-generator":_vm.generateConnectionLayoutKeyFor,"source":_vm.block,"target":_vm.blocksById[exit.destinationBlock],"exit":exit,"position":_vm.livePosition,"color-category":_vm.blockClasses[_vm.block.type].category}})]:_vm._e()]:_vm._e(),(exit.destinationBlock != null)?[_c('plain-draggable',{key:("exit/" + (exit.uuid) + "/handle"),staticClass:"block-exit-move-handle handle-move-link btn btn-default btn-xs btn-flat",class:{
                             // 'btn-default': exit.destinationBlock != null,
                         },attrs:{"id":("exit/" + (exit.uuid) + "/handle")},on:{"initialized":function($event){return _vm.handleDraggableInitializedFor(exit, $event)},"dragStarted":function($event){return _vm.onMoveExitDragStarted($event, exit)},"dragged":function($event){return _vm.onMoveExitDragged($event)},"dragEnded":function($event){return _vm.onMoveExitDragEnded($event, exit)}}},[_c('i',{staticClass:"glyphicon glyphicon-move"})]),_c('div',{staticClass:"block-exit-remove btn btn-danger btn-xs",attrs:{"title":"Click to remove this connection"},on:{"click":function($event){return _vm.removeConnectionFrom(exit)}}},[_c('span',{staticClass:"glyphicon glyphicon-remove"})]),_c('connection',{key:("exit/" + (exit.uuid) + "/line"),attrs:{"repaint-cache-key-generator":_vm.generateConnectionLayoutKeyFor,"source":_vm.livePosition ? null : _vm.block,"target":_vm.blocksById[exit.destinationBlock],"exit":exit,"position":_vm.livePosition,"color-category":_vm.blockClasses[_vm.block.type].category}})]:_vm._e()],2)}),0)]):_vm._e()}
var Blockvue_type_template_id_2d7b1c6e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/Block.vue?vue&type=template&id=2d7b1c6e&

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/PlainDraggable.vue?vue&type=template&id=3b61d02a&
var PlainDraggablevue_type_template_id_3b61d02a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)}
var PlainDraggablevue_type_template_id_3b61d02a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/PlainDraggable.vue?vue&type=template&id=3b61d02a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/plain-draggable/plain-draggable.esm.js + 4 modules
var plain_draggable_esm = __webpack_require__("3d6b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/PlainDraggable.vue?vue&type=script&lang=js&

//
//
//

/* harmony default export */ var PlainDraggablevue_type_script_lang_js_ = ({
  data: function data() {
    return {// draggable: null // no need to set up observers over these
    };
  },
  props: {
    startX: Number,
    startY: Number,
    handleDomId: String
  },
  // todo: also set `handle` from props onPropsChanged()
  methods: {
    handleInitialized: function handleInitialized() {
      var draggable = this.draggable; // `draggable` reference to reposition if changed externally like:
      // https://www.npmjs.com/package/plain-draggable#position

      this.$emit('initialized', {
        draggable: draggable
      });
    },
    handleDragged: function handleDragged(position) {
      // eslint-disable-next-line no-debugger
      // debugger
      var draggable = this.draggable;
      this.$emit('dragged', {
        draggable: draggable,
        position: position
      });
    },
    handleDragStarted: function handleDragStarted(position) {
      var draggable = this.draggable;
      this.$emit('dragStarted', {
        draggable: draggable,
        position: position
      });
    },
    handleDragEnded: function handleDragEnded(position) {
      var draggable = this.draggable;
      this.$emit('dragEnded', {
        draggable: draggable,
        position: position
      });
    },
    handleMoved: function handleMoved(position) {
      // eslint-disable-next-line no-debugger
      // debugger
      var draggable = this.draggable;
      this.$emit('moved', {
        draggable: draggable,
        position: position
      });
    }
  },
  mounted: function mounted() {
    // todo: modify this to instantiate blank draggable onCreate, then set options when props change
    console.debug('PlainDraggable.vue', 'mounted'); // this.$nextTick(() => {

    var handle = this.$el.querySelectorAll('.draggable-handle')[0];
    this.draggable = new plain_draggable_esm["a" /* default */](this.$el, {
      containment: document.querySelector('.builder-canvas'),
      autoScroll: true,
      // prevent css translate() animations for move
      // they don't seem to be throttled enough for leaderline to follow tightly
      leftTop: false,
      onDrag: this.handleDragged,
      onDragStart: this.handleDragStarted,
      onDragEnd: this.handleDragEnded,
      // onMove: this.handleMoved,
      left: this.startX,
      top: this.startY,
      handle: handle
    }); // draggable.rect.{left,top,x,y,...}
    // this.draggable.snap = {x: 50, y: 50, width: 50, height: 50} // todo: why this doesn't work?
    // this.draggable.snap = {step: 21}

    this.handleInitialized(); // })
  },
  destroyed: function destroyed() {
    this.draggable.remove();
  }
});
// CONCATENATED MODULE: ./src/components/common/PlainDraggable.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_PlainDraggablevue_type_script_lang_js_ = (PlainDraggablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/common/PlainDraggable.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  common_PlainDraggablevue_type_script_lang_js_,
  PlainDraggablevue_type_template_id_3b61d02a_render,
  PlainDraggablevue_type_template_id_3b61d02a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PlainDraggable = (component.exports);
// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/index.js
var dist = __webpack_require__("9300");

// EXTERNAL MODULE: ./src/store/builder/index.ts
var builder = __webpack_require__("af98");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/Connection.vue?vue&type=template&id=a2fa48ca&
var Connectionvue_type_template_id_a2fa48ca_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"connection",attrs:{"reposition-hook":_vm.repositionHook}})}
var Connectionvue_type_template_id_a2fa48ca_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/Connection.vue?vue&type=template&id=a2fa48ca&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/Connection.vue?vue&type=script&lang=js&



//
//
//
//
//
// import LeaderLine from 'leader-line'
var _window = window,
    LeaderLine = _window.LeaderLine;


/* harmony default export */ var Connectionvue_type_script_lang_js_ = ({
  props: {
    exit: Object,
    repaintCacheKeyGenerator: Function,
    source: Object,
    target: Object,
    position: Object,
    colorCategory: Number
  },
  data: function data() {
    return {// line: null, // no need to set up observers over this
    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapGetters */])('builder', ['blocksById'])), {}, {
    sourceId: function sourceId(_ref) {
      var exit = _ref.exit;
      return "exit/".concat(exit.uuid, "/handle");
    },
    targetId: function targetId(_ref2) {
      var exit = _ref2.exit;
      return exit.destinationBlock ? "block/".concat(exit.destinationBlock, "/handle") : "exit/".concat(exit.uuid, "/pseudo-block-handle");
    },
    // todo: externalize as `positionCacheKey` + deprecate `position` prop
    //       but rather include that in `positionCacheKey`'s domain definition
    repositionHook: function repositionHook() {
      if (!this.repaintCacheKeyGenerator) {
        return null;
      } // @note - intentional side-effect; todo: move this into vuex responding to data changes


      this.$nextTick(this.reposition); // todo: we only want this called if something changes.
      // generate drafts while 'between exits' or 'source/destination unknown'
      // todo: push these out into ?block?

      var source = this.source || Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(lodash["set"])({}, 'platform_metadata.io_viamo.uiData.xPosition', this.position.x)), Object(lodash["set"])({}, 'platform_metadata.io_viamo.uiData.yPosition', this.position.y));

      var target = this.target || Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(lodash["set"])({}, 'platform_metadata.io_viamo.uiData.xPosition', this.position.x)), Object(lodash["set"])({}, 'platform_metadata.io_viamo.uiData.yPosition', this.position.y));

      return this.repaintCacheKeyGenerator(source, target).join('\n');
    }
  }),
  methods: {
    reposition: function reposition() {
      var _this$source, _this$target;

      if (!this.line) {
        return;
      }

      var position = this.line.position();
      console.debug('connection', 'repositioning', {
        source: (_this$source = this.source) === null || _this$source === void 0 ? void 0 : _this$source.uuid,
        target: (_this$target = this.target) === null || _this$target === void 0 ? void 0 : _this$target.uuid,
        position: position,
        x: this.line.top,
        y: this.line.left
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.line.remove();
  },
  mounted: function mounted() {
    // todo: add an invisible centered dot on a node header
    // if (!this.datum.source || !this.datum.target) {
    //   return
    // }
    // todo: I think we can do something like this instead; will this prevent all the hairy business if we use pointAnchors?
    //       See: https://github.com/anseki/leader-line#element
    //       What I'm thinking is that we can just leverage these x/y's? How do we then update them?
    // new LeaderLine(element1, LeaderLine.pointAnchor(element3, {x: 10, y: 30}));
    var categoryColorMappings = {
      'category-0-faint': '#fbfdfb',
      'category-0-light': '#97BD8A',
      'category-0-dark': '#38542f',
      'category-1-faint': '#fdfdfe',
      'category-1-light': '#6897BB',
      'category-1-dark': '#30516a',
      'category-2-faint': '#fdfbf8',
      'category-2-light': '#C69557',
      'category-2-dark': '#6e4e25'
    };
    var options = {
      startPlug: 'square',
      startPlugColor: categoryColorMappings["category-".concat(this.colorCategory, "-light")],
      endPlugColor: categoryColorMappings["category-".concat(this.colorCategory, "-dark")],
      gradient: true,
      startSocket: 'bottom',
      endSocket: 'top',
      size: 3,
      outline: true,
      outlineColor: '#ffffff',
      // outlineSize: 0.08,
      path: 'grid',
      // path: 'fluid',
      // path: 'arc',
      // path: 'magnet',
      middleLabel: LeaderLine.captionLabel(this.exit.tag, {
        color: categoryColorMappings["category-".concat(this.colorCategory, "-dark")],
        fontSize: 12 // lineOffset: 65,

      })
    }; // const {sourcePosition, targetPosition} = this
    // this.line = new LeaderLine(
    //     LeaderLine.pointAnchor(document.body, sourcePosition),
    //     LeaderLine.pointAnchor(document.body, targetPosition), options)

    var blockPaddingOffset = {
      x: 34,
      y: -7
    };
    var start = document.getElementById(this.sourceId);
    var end = this.position ? document.getElementById(this.targetId) : LeaderLine.pointAnchor(document.getElementById(this.targetId), blockPaddingOffset);
    this.line = new LeaderLine(start, end, options); // stop listening to scroll and window resize hooks
    // LeaderLine.positionByWindowResize = false
    // this.line.positionByWindowResize = false
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/Connection.vue?vue&type=script&lang=js&
 /* harmony default export */ var interaction_designer_Connectionvue_type_script_lang_js_ = (Connectionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/Connection.vue





/* normalize component */

var Connection_component = Object(componentNormalizer["a" /* default */])(
  interaction_designer_Connectionvue_type_script_lang_js_,
  Connectionvue_type_template_id_a2fa48ca_render,
  Connectionvue_type_template_id_a2fa48ca_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Connection = (Connection_component.exports);
// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/Block.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var Blockvue_type_script_lang_js_ = ({
  props: ['block', 'x', 'y'],
  mixins: [lang["a" /* default */]],
  components: {
    Connection: Connection,
    PlainDraggable: PlainDraggable
  },
  created: function created() {
    this.draggablesByExitId = {}; // todo: these need to be (better) lifecycle-managed (eg. mcq add/remove exit).
  },
  data: function data() {
    return {
      livePosition: null // draggablesByExitId: {}, // no need to vuejs-observe these

    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["e" /* mapState */])('flow', ['resources'])), Object(vuex_esm["e" /* mapState */])('builder', ['activeBlockId', 'operations'])), Object(vuex_esm["e" /* mapState */])({
    blockClasses: function blockClasses(_ref) {
      var ui = _ref.trees.ui;
      return ui.blockClasses;
    }
  })), Object(vuex_esm["c" /* mapGetters */])('builder', ['blocksById'])), {}, {
    hasLayout: function hasLayout() {
      return Object(lodash["isNumber"])(this.x) && Object(lodash["isNumber"])(this.y);
    },
    // todo: does this component know too much, what out of the above mapped state can be mapped?
    // todo: We should likely also proxy our resource resolving so that as to mitigate the need to see all resources and generate a context
    isConnectionSourceRelocateActive: function isConnectionSourceRelocateActive(_ref2) {
      var operations = _ref2.operations;
      return !!operations[builder["a" /* OperationKind */].CONNECTION_SOURCE_RELOCATE].data;
    },
    isConnectionCreateActive: function isConnectionCreateActive(_ref3) {
      var operations = _ref3.operations;
      return !!operations[builder["a" /* OperationKind */].CONNECTION_CREATE].data;
    },
    isBlockActivated: function isBlockActivated(_ref4) {
      var activeBlockId = _ref4.activeBlockId,
          block = _ref4.block,
          operations = _ref4.operations;

      if (activeBlockId && activeBlockId === block.uuid) {
        return true;
      }

      var data = operations[builder["a" /* OperationKind */].CONNECTION_CREATE].data;
      return data && data.target === block.uuid;
    }
  }),
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, {
    generateConnectionLayoutKeyFor: builder["d" /* generateConnectionLayoutKeyFor */]
  }), Object(vuex_esm["d" /* mapMutations */])('builder', ['setBlockPositionTo'])), Object(vuex_esm["b" /* mapActions */])('builder', {
    _removeConnectionFrom: 'removeConnectionFrom'
  })), Object(vuex_esm["b" /* mapActions */])('builder', [// ConnectionSourceRelocate
  'initializeConnectionSourceRelocateWith', 'setConnectionSourceRelocateValue', 'setConnectionSourceRelocateValueToNullFrom', 'applyConnectionSourceRelocate', // ConnectionCreate
  'initializeConnectionCreateWith', 'setConnectionCreateTargetBlock', 'setConnectionCreateTargetBlockToNullFrom', 'applyConnectionCreate'])), Object(vuex_esm["d" /* mapMutations */])('builder', ['activateBlock'])), {}, {
    resolveTextResource: function resolveTextResource(uuid) {
      var resources = this.resources;
      var context = {
        resources: resources,
        languageId: '22',
        mode: dist["SupportedMode"].SMS
      };
      var resource = new dist["ResourceResolver"](context) // as IContext) // this isn't ts
      .resolve(uuid);
      return resource.hasText() ? resource.getText() : uuid;
    },
    // todo: push NodeExit into it's own vue component
    isExitActivatedForRelocate: function isExitActivatedForRelocate(exit) {
      var data = this.operations[builder["a" /* OperationKind */].CONNECTION_SOURCE_RELOCATE].data;
      return data && data.to && data.to.exitId === exit.uuid;
    },
    isExitActivatedForCreate: function isExitActivatedForCreate(exit) {
      var data = this.operations[builder["a" /* OperationKind */].CONNECTION_CREATE].data;
      return data && data.source && data.source.exitId === exit.uuid;
    },
    activateExitAsDropZone: function activateExitAsDropZone(e, exit) {
      var block = this.block;
      this.setConnectionSourceRelocateValue({
        block: block,
        exit: exit
      });
    },
    deactivateExitAsDropZone: function deactivateExitAsDropZone(e, exit) {
      var block = this.block;
      this.setConnectionSourceRelocateValueToNullFrom({
        block: block,
        exit: exit
      });
    },
    // eslint-disable-next-line no-unused-vars
    activateBlockAsDropZone: function activateBlockAsDropZone(e) {
      var block = this.block;
      this.setConnectionCreateTargetBlock({
        block: block
      });
    },
    // eslint-disable-next-line no-unused-vars
    deactivateBlockAsDropZone: function deactivateBlockAsDropZone(e) {
      var block = this.block;
      this.setConnectionCreateTargetBlockToNullFrom({
        block: block
      });
    },
    onMoved: function onMoved(_ref5) {
      var _this = this;

      var _ref5$position = _ref5.position,
          x = _ref5$position.left,
          y = _ref5$position.top;
      // todo: try this the vuejs way where we push the change into state, then return false + modify draggable w/in store ?
      var block = this.block;
      this.$nextTick(function () {
        _this.setBlockPositionTo({
          position: {
            x: x,
            y: y
          },
          block: block
        });

        Object(lodash["forEach"])(_this.draggablesByExitId, function (draggable) {
          return draggable.position();
        });
        console.debug('Block', 'onMoved', 'positioned all of', _this.draggablesByExitId);
      });
    },
    removeConnectionFrom: function removeConnectionFrom(exit) {
      var block = this.block;

      this._removeConnectionFrom({
        block: block,
        exit: exit
      });
    },
    handleDraggableInitializedFor: function handleDraggableInitializedFor(_ref6, _ref7) {
      var uuid = _ref6.uuid;
      var draggable = _ref7.draggable;
      this.draggablesByExitId[uuid] = draggable;
      var left = draggable.left,
          top = draggable.top;
      var blockId = this.block.uuid;
      console.debug('Block', 'handleDraggableInitializedFor', {
        blockId: blockId,
        exitId: uuid,
        coords: {
          left: left,
          top: top
        }
      });
    },
    onCreateExitDragStarted: function onCreateExitDragStarted(_ref8, exit) {
      var draggable = _ref8.draggable;
      var block = this.block;
      var x = draggable.left,
          y = draggable.top;
      this.initializeConnectionCreateWith({
        block: block,
        exit: exit,
        position: {
          x: x,
          y: y
        }
      }); // since mouseenter + mouseleave will not occur when draggable is below cursor
      // we simply snap the draggable out from under the cursor during this operation

      draggable.left += 30;
      draggable.top += 25;
    },
    onCreateExitDragged: function onCreateExitDragged(_ref9) {
      var _ref9$position = _ref9.position,
          x = _ref9$position.left,
          y = _ref9$position.top;
      this.livePosition = {
        x: x,
        y: y
      };
    },
    onCreateExitDragEnded: function onCreateExitDragEnded(_ref10) {
      var draggable = _ref10.draggable;
      var _this$operations$Oper = this.operations[builder["a" /* OperationKind */].CONNECTION_CREATE].data.position,
          left = _this$operations$Oper.x,
          top = _this$operations$Oper.y;
      console.debug('Block', 'onCreateExitDragEnded', 'operation.data.position', {
        left: left,
        top: top
      });
      console.debug('Block', 'onCreateExitDragEnded', 'reset', {
        left: draggable.left,
        top: draggable.top
      });
      Object.assign(draggable, {
        left: left,
        top: top
      });
      this.applyConnectionCreate();
      this.livePosition = null;
    },
    onMoveExitDragStarted: function onMoveExitDragStarted(_ref11, exit) {
      var draggable = _ref11.draggable;
      var block = this.block;
      var x = draggable.left,
          y = draggable.top;
      this.initializeConnectionSourceRelocateWith({
        block: block,
        exit: exit,
        position: {
          x: x,
          y: y
        }
      }); // since mouseenter + mouseleave will not occur when draggable is below cursor
      // we simply snap the draggable out from under the cursor during this operation

      draggable.left += 30;
      draggable.top += 25;
    },
    onMoveExitDragged: function onMoveExitDragged(_ref12) {
      var _ref12$position = _ref12.position,
          x = _ref12$position.left,
          y = _ref12$position.top;
      this.livePosition = {
        x: x,
        y: y
      };
    },
    // todo: store the leaderlines in vuex and manip there --- aka the leaderline itself would simply _produce_ the
    //       domain object which we thenceforth manip in vuex ?
    onMoveExitDragEnded: function onMoveExitDragEnded(_ref13) {
      var draggable = _ref13.draggable;
      var _this$operations$Oper2 = this.operations[builder["a" /* OperationKind */].CONNECTION_SOURCE_RELOCATE].data.position,
          left = _this$operations$Oper2.x,
          top = _this$operations$Oper2.y;
      console.debug('Block', 'onMoveExitDragEnded', 'operation.data.position', {
        left: left,
        top: top
      });
      console.debug('Block', 'onMoveExitDragEnded', 'reset', {
        left: draggable.left,
        top: draggable.top
      });
      Object.assign(draggable, {
        left: left,
        top: top
      });
      this.applyConnectionSourceRelocate();
      this.livePosition = null;
    },
    selectBlock: function selectBlock() {
      var blockId = this.block.uuid;
      this.activateBlock({
        blockId: blockId
      });
    }
  })
});
// CONCATENATED MODULE: ./src/components/interaction-designer/Block.vue?vue&type=script&lang=js&
 /* harmony default export */ var interaction_designer_Blockvue_type_script_lang_js_ = (Blockvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/Block.vue?vue&type=style&index=0&lang=scss&
var Blockvue_type_style_index_0_lang_scss_ = __webpack_require__("5d74");

// CONCATENATED MODULE: ./src/components/interaction-designer/Block.vue






/* normalize component */

var Block_component = Object(componentNormalizer["a" /* default */])(
  interaction_designer_Blockvue_type_script_lang_js_,
  Blockvue_type_template_id_2d7b1c6e_render,
  Blockvue_type_template_id_2d7b1c6e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Block = (Block_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/BuilderCanvas.vue?vue&type=script&lang=ts&









var BuilderCanvasvue_type_script_lang_ts_BuilderCanvas = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(BuilderCanvas, _Vue);

  var _super = Object(createSuper["a" /* default */])(BuilderCanvas);

  function BuilderCanvas() {
    Object(classCallCheck["a" /* default */])(this, BuilderCanvas);

    return _super.apply(this, arguments);
  }

  return BuilderCanvas;
}(vue_property_decorator["c" /* Vue */]);

BuilderCanvasvue_type_script_lang_ts_BuilderCanvas = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    Block: Block
  },
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["e" /* mapState */])('flow', ['flows'])),
  mounted: function mounted() {
    this.$store.dispatch('builder/loadFlow');
  }
})], BuilderCanvasvue_type_script_lang_ts_BuilderCanvas);
/* harmony default export */ var BuilderCanvasvue_type_script_lang_ts_ = (BuilderCanvasvue_type_script_lang_ts_BuilderCanvas);

// CONCATENATED MODULE: ./src/components/interaction-designer/BuilderCanvas.vue?vue&type=script&lang=ts&
 /* harmony default export */ var interaction_designer_BuilderCanvasvue_type_script_lang_ts_ = (BuilderCanvasvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/BuilderCanvas.vue?vue&type=style&index=0&id=4cc35a95&scoped=true&lang=css&
var BuilderCanvasvue_type_style_index_0_id_4cc35a95_scoped_true_lang_css_ = __webpack_require__("756e");

// CONCATENATED MODULE: ./src/components/interaction-designer/BuilderCanvas.vue






/* normalize component */

var BuilderCanvas_component = Object(componentNormalizer["a" /* default */])(
  interaction_designer_BuilderCanvasvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "4cc35a95",
  null
  
)

/* harmony default export */ var interaction_designer_BuilderCanvas = (BuilderCanvas_component.exports);

/***/ }),

/***/ "c5aa":
/***/ (function(module) {

module.exports = JSON.parse("{\"ui\":{\"routes\":{\"trees\":{\"editTree\":{\"name\":\"editTree\",\"path\":\"/trees/{treeId}/{component?}/{mode?}\",\"params\":[\"treeId\",\"component\",\"mode\"],\"methods\":[\"GET\",\"HEAD\"]}}},\"languages\":[{\"id\":\"22\",\"name\":\"English\",\"abbreviation\":\"EN\",\"orgId\":\"1008107874829627392\",\"rightToLeft\":false,\"code\":null,\"deletedAt\":null},{\"id\":\"23\",\"name\":\"Spanish\",\"abbreviation\":\"ES\",\"orgId\":\"1008107874829627392\",\"rightToLeft\":false,\"code\":null,\"deletedAt\":null}],\"blockClasses\":{\"ConsoleIO\\\\Print\":{\"name\":\"ConsoleIO\\\\Print\",\"type\":\"ConsoleIO\\\\Print\",\"is_interactive\":false,\"is_branching\":false,\"category\":0},\"ConsoleIO\\\\Read\":{\"name\":\"ConsoleIO\\\\Read\",\"type\":\"ConsoleIO\\\\Read\",\"is_interactive\":true,\"is_branching\":false,\"category\":1},\"Core\\\\Case\":{\"name\":\"Core\\\\Case\",\"type\":\"Core\\\\Case\",\"is_interactive\":false,\"is_branching\":true,\"category\":2},\"Core\\\\Log\":{\"name\":\"Core\\\\Log\",\"type\":\"Core\\\\Log\",\"is_interactive\":false,\"is_branching\":false,\"category\":0},\"Core\\\\Output\":{\"name\":\"Core\\\\Output\",\"type\":\"Core\\\\Output\",\"is_interactive\":false,\"is_branching\":false,\"category\":0},\"Core\\\\RunFlow\":{\"name\":\"Core\\\\RunFlow\",\"type\":\"Core\\\\RunFlow\",\"is_interactive\":false,\"is_branching\":false,\"category\":0},\"MobilePrimitives\\\\Message\":{\"name\":\"MobilePrimitives\\\\Message\",\"type\":\"MobilePrimitives\\\\Message\",\"is_interactive\":true,\"is_branching\":false,\"category\":1},\"MobilePrimitives\\\\NumericResponse\":{\"name\":\"MobilePrimitives\\\\NumericResponse\",\"type\":\"MobilePrimitives\\\\NumericResponse\",\"is_interactive\":true,\"is_branching\":false,\"category\":1},\"MobilePrimitives\\\\OpenResponse\":{\"name\":\"MobilePrimitives\\\\OpenResponse\",\"type\":\"MobilePrimitives\\\\OpenResponse\",\"is_interactive\":true,\"is_branching\":false,\"category\":1},\"MobilePrimitives\\\\SelectOneResponse\":{\"name\":\"MobilePrimitives\\\\SelectOneResponse\",\"type\":\"MobilePrimitives\\\\SelectOneResponse\",\"is_interactive\":true,\"is_branching\":true,\"category\":2},\"MobilePrimitives\\\\SelectManyResponse\":{\"name\":\"MobilePrimitives\\\\SelectManyResponse\",\"type\":\"MobilePrimitives\\\\SelectManyResponse\",\"is_interactive\":true,\"category\":2},\"SmartDevices\\\\LocationResponse\":{\"name\":\"SmartDevices\\\\LocationResponse\",\"type\":\"SmartDevices\\\\LocationResponse\",\"is_interactive\":true,\"is_branching\":false,\"category\":1},\"SmartDevices\\\\PhotoResponse\":{\"name\":\"SmartDevices\\\\PhotoResponse\",\"type\":\"SmartDevices\\\\PhotoResponse\",\"is_interactive\":true,\"is_branching\":false,\"category\":1}},\"blockTags\":[],\"contentBlockTypes\":[\"MessageBlock\",\"MultipleChoiceQuestionBlock\",\"NumericQuestionBlock\",\"OpenQuestionBlock\",\"WebhookContentBlock\",\"RandomOrderMultipleChoiceQuestionBlock\",\"DirectorySelectionBlock\",\"MultipleSelectMultipleChoiceQuestionBlock\",\"WeatherAlertsBlock\",\"LocationBlock\",\"CollaborativeFilteringQuestionBlock\",\"CollaborativeFilteringRatingBlock\"],\"callCenterQueues\":[],\"originalTreeJson\":{\"id\":\"1\",\"details\":{\"title\":\"My first Flow\",\"description\":\"\",\"enabledLanguages\":[\"1\"],\"hasVoice\":1,\"hasUssd\":1,\"hasSms\":1,\"hasSocial\":0,\"hasClipboard\":0,\"syncedLanguage\":\"\",\"startingBlockKey\":\"\",\"savedByUserOrganisationId\":null},\"treeSetId\":\"1\",\"createdAt\":{\"date\":\"2020-07-10T12:54:10-06:00\"},\"editedAt\":\"2020-07-10T12:54:10-06:00\",\"updatedAt\":{\"date\":\"2020-07-10T12:54:10-06:00\"},\"otherVersionsCount\":0,\"isDuplicateOf\":null,\"duplicateTree\":null,\"floipSyncedAt\":null,\"orgId\":null,\"blocks\":[],\"connections\":[],\"hasVoice\":1,\"hasSms\":1,\"hasUssd\":1,\"hasSocial\":0,\"hasClipboard\":0},\"originalValidationResults\":[],\"isTreeImport\":0,\"importTreeJson\":null,\"isEditable\":0,\"isEditableLocked\":0,\"orgTimezone\":\"America/Toronto\",\"subscriberCount\":0,\"subscriberPropertyFields\":[],\"subscriberPropertyFieldDataTypes\":[\"text\",\"location\",\"number\",\"map_coordinates\",\"boolean\",\"phone\",\"multiple_choice\",\"date\"],\"treeTitles\":{},\"treeSetTitles\":{},\"groupNames\":{},\"groups\":[],\"languageNames\":{\"1\":\"English\",\"2\":\"Spanish\"},\"languageSelectors\":[],\"apiKey\":null,\"publicId\":null,\"operatorContacts\":[],\"interactionTotals\":[],\"org\":{\"id\":null,\"org_name\":\"Sample Org\"},\"outgoingCallGroups\":[],\"scheduleTypes\":[{\"id\":\"1\",\"type\":\"now\",\"description\":\"Now\"},{\"id\":\"2\",\"type\":\"fixed\",\"description\":\"Fixed Date\"},{\"id\":\"3\",\"type\":\"routine\",\"description\":\"Routine\"},{\"id\":\"4\",\"type\":\"repeating\",\"description\":\"Repeating\"},{\"id\":\"5\",\"type\":\"continuous\",\"description\":\"Continuous\"}],\"currentDate\":\"2020-07-10T12:54:10-06:00\",\"currentTime\":\"00:00\",\"surveysEnabled\":true,\"surveySets\":[],\"messageSets\":[],\"treeSets\":[],\"enabledFeatures\":[]},\"audio\":{\"library\":[{\"id\":\"586533\",\"filename\":\"https://www.viamo.io/audiofiles/play/5cae2f49b605a6.45924131/mp3\",\"description\":\"02_flowers_for_albert.mp3\",\"language_id\":null,\"duration_seconds\":\"357.712\",\"original_extension\":\"mp3\",\"created_at\":\"2019-04-10 18:00:52\"},{\"id\":\"309466\",\"filename\":\"https://www.viamo.io/audiofiles/play/598283afde6f31.04148017/ogg\",\"description\":\"59727a6e9aa807.99829966.ogg\",\"language_id\":\"206062\",\"duration_seconds\":\"4.69462\",\"original_extension\":\"ogg\",\"created_at\":\"2017-08-03 02:00:16\"}],\"recording\":{\"recorders\":[],\"isCalling\":{},\"isRecorderSelectorVisible\":false}}}");

/***/ }),

/***/ "c9e2":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("7db0");

__webpack_require__("d81d");

__webpack_require__("13d5");

__webpack_require__("a434");

__webpack_require__("ac1f");

__webpack_require__("841c");

var _typeof = __webpack_require__("7037");

/*global Backbone */
window.app = window.app || {};

(function ($) {
  app.ui = app.ui || {};
  app.ui.changes = 0;
  app.ui.saveTimer = app.ui.saveTimer || 60;
  app.ui.saveCurrentlyInProgress = 0;

  app.ui.removeClassPrefix = function (blockClassName) {
    return blockClassName.substr(11);
  };

  app.ui.change = function (textNotification) {
    console.log('app.ui.change', textNotification);
    var selectedBlock = builder.$store.getters.selectedBlock;

    if (!selectedBlock) {
      return;
    } // Temporary legacy fix for when some customData properties are not reactive by default
    // because they don't yet exist in `15-trees-block-defaults.js`


    selectedBlock.customData = _.extend({}, selectedBlock.customData);
  };

  app.ui.noChange = function () {
    console.log('app.ui.nochange');
  };

  app.ui.changeLock = function () {
    app.ui.changes = -1;
  };

  app.ui.findSubscriberPropertyField = function (search) {
    return _.find(app.ui.subscriberPropertyFields, search) || null;
  };

  app.dataControl = {};

  app.dataControl.send = function () {
    if (!builder.$store.getters.isFeatureTreeSaveEnabled) {
      console.info('Feature `treeSave` is disabled');
      return;
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
      data: outputData
    };

    if (treeUpdatedConflict !== null) {
      console.log('Update not currently possible');
      return false;
    }

    var promise = $.post('/ajax/trees/save/' + treeId, requestData).done(function (response) {
      app.audioChoice.setTopUpdatesBar(Lang.trans('trees.tree-saved'), 1); //the person has been logged out

      if (_typeof(response) != "object") {
        //spawn the modal
        $("#myModal").modal({
          show: true,
          backdrop: 'static'
        });
      }

      app.ui.saveCurrentlyInProgress = 0;

      app.dataControl._setValidationResultsForUI(response.validation_results);

      app.ui.previousTreeJson = outputData; // used to detect changes in vuejs

      app.ui.noChange();
      app.tree.updateFloipAlert();
    }).fail(function (response) {
      if (response.status === 409) {
        // Dispatch an action to prevent further tree update until page is refreshed
        var payload = {
          treeUpdateConflict: {
            tree_id: treeId,
            message: response.responseJSON.message
          }
        };
        builder.$store.dispatch('setTreeUpdateConflictStatus', payload);
      } else {
        console.error(response);
        app.audioChoice.setTopUpdatesBar(Lang.trans('trees.error-while-saving-tree'), 1);
      }
    }).always(function () {
      app.ui.saveCurrentlyInProgress = 0;
    }); // Create Adapter from jQuery-promise-api to ES6-promise-api
    // so that it can be chained into vuex actions

    return _.defaults(promise, {
      then: promise.done,
      catch: promise.fail,
      finally: promise.always
    });
  };

  app.dataControl._setValidationResultsForUI = function (validationResults) {
    app.ui.validationResults = validationResults || [];
  };

  app.exportOptionsModal = {};

  app.exportOptionsModal.initialize = function () {
    var exportOptionsTemplate = _.template(JST["legacy/templates/export-options-template.html"]);

    $('body').append(exportOptionsTemplate());
    $('.tree-export-options-input').change(function (e) {
      app.exportOptionsModal.handleInput(e);
    }); // Select the URL box text if clicked

    $('.tree-export-options-download-api-url').focus(function () {
      this.select();
    }); // Add datepickers for the time boxes

    $('.tree-export-options-input-datepicker').datetimepicker({
      pickTime: false
    });
    $('.tree-export-options-input-datepicker').on('dp.change', function (e) {
      $(e.currentTarget).trigger('change');
    }); // Kickoff the process to build the link URL!

    $('.tree-export-options-input').first().trigger('change');
  };

  app.exportOptionsModal.open = function () {
    if ($('#export-options-modal').length == 0) {
      app.exportOptionsModal.initialize();
    } // Show the modal.


    $('#export-options-modal').modal();
  };

  app.exportOptionsModal.handleInput = function (e) {
    var value = $(e.currentTarget).val();
    var key = $(e.currentTarget).attr('data-export-options-key');

    if (key == 'dateFilter') {
      if (value == '1') {
        $('.export-options-date-filter-container').show();
      } else {
        $('.export-options-date-filter-container').hide(); // Reset the values so they don't get serialized if hidden

        $('.tree-export-options-input[data-export-options-key=callsAfter]').val('');
        $('.tree-export-options-input[data-export-options-key=callsBefore]').val('');
      }
    }

    $('.tree-export-options-download-link').attr('href', app.exportOptionsModal.buildUrl());
    $('.tree-export-options-download-api-url').val(app.exportOptionsModal.buildUrl(1));
  };

  app.exportOptionsModal.buildUrl = function (isApiUrl) {
    var url = "/trees/" + app.ui.treeId + "/exportcsv?";

    if (isApiUrl) {
      url = window.location.protocol + "//" + window.location.host + "/api/v1/trees/" + app.ui.treeId + "/csvexport/direct?";
    }

    url += $('.tree-export-options-input').serialize();

    if (isApiUrl) {
      url += "&api_key=" + app.ui.apiKey;
    }

    return url;
  }; // Initial version of the shareable link modal,
  // for a specific single tree:


  app.shareableLinkModal = {};

  app.shareableLinkModal.initialize = function () {
    var shareableLinkTemplate = _.template(JST["legacy/templates/shareable-link-template.html"]);

    $('body').append(shareableLinkTemplate()); // Select the URL box text if clicked

    $('.tree-shareable-link-url').focus(function () {
      this.select();
    }); // Assign button clicks

    $('.tree-shareable-link-generate-button').on('click', function (e) {
      app.shareableLinkModal.sendRequest('create');
    });
    $('.tree-shareable-link-delete-button').on('click', function (e) {
      app.shareableLinkModal.switchView('delete');
    });
    $('.tree-shareable-link-delete-confirm-button').on('click', function (e) {
      app.shareableLinkModal.sendRequest('delete');
    });
    $('.tree-shareable-link-delete-cancel-button').on('click', function (e) {
      app.shareableLinkModal.switchView('edit');
    });

    if (app.ui.publicId) {
      // If there's already a public ID, then show the "edit" view
      app.shareableLinkModal.setUrl();
      app.shareableLinkModal.switchView('edit');
    } else {
      app.shareableLinkModal.switchView('new');
    }
  };

  app.shareableLinkModal.switchView = function (view) {
    $('.shareable-link-delete').hide();
    $('.shareable-link-edit').hide();
    $('.shareable-link-new').hide();
    $(".shareable-link-" + view).show();
  };

  app.shareableLinkModal.open = function (e) {
    if ($('#shareable-link-modal').length == 0) {
      app.shareableLinkModal.initialize();
    } // Show the modal.


    $('#shareable-link-modal').modal();
  };

  app.shareableLinkModal.buildUrl = function () {
    var url = '';

    if (app.ui.publicId) {
      url = window.location.protocol + "//" + window.location.host + "/share/a/trees/" + app.ui.publicId;
    }

    return url;
  };

  app.shareableLinkModal.setUrl = function () {
    var url = app.shareableLinkModal.buildUrl();
    $('.tree-shareable-link-url').val(url);
    $('.tree-shareable-link-url-link').attr('href', url);
  };

  app.shareableLinkModal.sendRequest = function (requestType) {
    $.post("/ajax/trees/updateshareablelink/" + app.ui.treeId, {
      type: requestType
    }).done(function (response) {
      if (response) {
        // New one!
        app.ui.publicId = response;
        app.shareableLinkModal.setUrl();
        app.shareableLinkModal.switchView('edit');
      } else {
        app.ui.publicId = '';
        app.shareableLinkModal.switchView('new');
      }

      return true;
    }).fail(function (response) {
      var errorMessage = response.responseJSON || 'Error while updating shareable link...';
      app.audioChoice.setTopUpdatesBar(errorMessage, 1);
    });
  }; // Updated version of the shareable link modal,
  // for tree sets rather than specific trees!


  app.shareableLinkSetsModal = {};

  app.shareableLinkSetsModal.initialize = function () {
    var shareableLinkTemplate = _.template(JST["legacy/templates/shareable-link-sets-template.html"]);

    $('body').append(shareableLinkTemplate({
      defaultLocales: builder.$store.state.defaultLocales,
      orgEnabledLanguages: builder.$store.state.orgEnabledLanguages
    })); // Assign button clicks

    $('.tree-shareable-link-sets-generate-button').on('click', function (e) {
      app.shareableLinkSetsModal.sendRequest('create');
    });
    $('input[name=shouldUseCustomBlockOrdering]').on('click', function () {
      if ($(this).is(':checked')) {
        $('.block-ordinal').prop('disabled', false);
      } else {
        $('.block-ordinal').prop('disabled', true);
      }
    });
    $("select[name='lockDateRange']").on('change', function () {
      if (this.value === '1') {
        $(".hide-on-lockDateRange").hide();
      } else {
        $(".hide-on-lockDateRange").show();
      }
    }); // Initialize the second half with the list of existing links:

    app.shareableLinkSetsModal.initializeLinksList();
  };

  app.shareableLinkSetsModal.initializeLinksList = function () {
    var shareableLinkListTemplate = _.template(JST["legacy/templates/shareable-link-sets-list-template.html"]);

    $('.shareable-link-sets-list-container').html(shareableLinkListTemplate);
    $('.tree-shareable-link-sets-delete-button').on('click', function (e) {
      app.shareableLinkSetsModal.switchToDeleteView(e);
    });
    $('.tree-shareable-link-sets-delete-confirm-button').on('click', function (e) {
      var shareableLinkHash = $(e.currentTarget).attr('data-link-hash');
      app.shareableLinkSetsModal.sendRequest('delete', shareableLinkHash);
    });
    $('.tree-shareable-link-sets-delete-cancel-button').on('click', function (e) {
      app.shareableLinkSetsModal.switchAwayFromDeleteView(e);
    });
  };

  app.shareableLinkSetsModal.switchToDeleteView = function (e) {
    var shareableLinkId = $(e.currentTarget).attr('data-link-id');
    var listElement = $(".shareable-link-item-div[data-link-id=" + shareableLinkId + "]");

    if ($(listElement).hasClass('list-group-item-danger')) {
      app.shareableLinkSetsModal.switchAwayFromDeleteView(e);
    } else {
      $(listElement).addClass('list-group-item-danger');
      $(listElement).children('.shareable-link-item-div-delete').show();
    }
  };

  app.shareableLinkSetsModal.switchAwayFromDeleteView = function (e) {
    var shareableLinkId = $(e.currentTarget).attr('data-link-id');
    var listElement = $(".shareable-link-item-div[data-link-id=" + shareableLinkId + "]");
    $(listElement).removeClass('list-group-item-danger');
    $(listElement).children('.shareable-link-item-div-delete').hide();
  };

  app.shareableLinkSetsModal.open = function (e) {
    if ($('#shareable-link-sets-modal').length == 0) {
      app.shareableLinkSetsModal.initialize();
    } // Re-set the labels


    app.shareableLinkSetsModal.setLabelValues(); // Show the modal.

    $('#shareable-link-sets-modal').modal();
  };

  app.shareableLinkSetsModal.setLabelValues = function () {
    // TODO - use another mini-template for these guys rather than updating text values with jQuery.
    var startDateLabel = app.startDate.format('MMMM D, YYYY');
    var endDateLabel = app.endDate.format('MMMM D, YYYY');
    var channelLabel = app.labels.channel;
    var blocksLabel = app.labels.blocks;

    if (app.params.versionFiltersEnabled) {
      $('.shareable-link-sets-versions-label').show();
    } else {
      $('.shareable-link-sets-versions-label').hide();
    }

    if (app.params.noValidDateRange) {
      $('.shareable-link-sets-date-range-labels').hide();
      $('.shareable-link-sets-date-range-all-time-label').show();
    } else {
      $('span.sl-label-start-date').text(startDateLabel);
      $('span.sl-label-end-date').text(endDateLabel);
    }

    $('span.sl-label-channel').text(channelLabel);
    $('span.sl-label-blocks').text(blocksLabel);
    $('span.sl-label-versions').text(app.labels.versionsSelected + " of " + app.labels.versionsTotal);
  };

  app.shareableLinkSetsModal.buildUrl = function (public_hash) {
    var url = '';

    if (public_hash) {
      url = window.location.protocol + "//" + window.location.host + "/share/a/trees/" + public_hash;
    }

    return url;
  };

  app.shareableLinkSetsModal.sendRequest = function (requestType, shareableLinkHash) {
    if (requestType == 'delete') {
      var sendRequest = {
        requestType: requestType,
        shareableLinkHash: shareableLinkHash
      };
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
        enabledTabs: $('input[name=enabledTabs]:checked').map(function (i, el) {
          return $(el).val();
        }).get(),
        tagFilter: $('input[name=tagFilter]:checked').map(function (i, el) {
          return $(el).val();
        }).get(),
        directorySelectionFieldFilter: $('input[name=directorySelectionFieldFilter]:checked').map(function (i, el) {
          return $(el).val();
        }).get(),
        blockChoiceFilter: $('input[name=blockChoiceFilter]:checked').map(function (i, el) {
          return $(el).val();
        }).get(),
        filterDisplayThreshold: $('input[name=filterDisplayThreshold]').val()
      };

      if ($('.shareable-link-sets-input[name=shouldUseCustomBlockOrdering]').is(':checked')) {
        sendRequest['customBlockOrder'] = _.reduce($('.block-ordinal').toArray(), function (memo, el) {
          memo[$(el).data('js-key')] = $(el).val();
          return memo;
        }, {});
      }

      if (app.params.noValidDateRange == false) {
        sendRequest.startDate = app.startDate.format('YYYY-MM-DD');
        sendRequest.endDate = app.endDate.format('YYYY-MM-DD');
      }

      if (app.params.versionFiltersEnabled) {
        sendRequest.versions = app.params.versions;
      }
    }

    $.post("/ajax/treeversionsets/updateshareablelink/" + app.tree_version_set_id, {
      data: sendRequest
    }).done(function (response) {
      if (requestType == 'delete') {
        if (response == 1) {
          // Remove the entry with that hash from the local JS list
          app.shareableLinks = _.without(app.shareableLinks, _.findWhere(app.shareableLinks, {
            public_hash: shareableLinkHash
          })); // Initialize the second half with the list of existing links:

          app.shareableLinkSetsModal.initializeLinksList();
        }
      } else {
        // Add the new response to the start of the shareable links array:
        app.shareableLinks.unshift(response); // Initialize the second half with the list of existing links:

        app.shareableLinkSetsModal.initializeLinksList();
      }

      return true;
    }).fail(function (response) {
      var errorMessage = response.responseJSON || 'Error while updating shareable link...';
      app.audioChoice.setTopUpdatesBar(errorMessage, 1);
    });
  }; // csvExports modal helper functions


  app.csvExportsModal = {};

  app.csvExportsModal.initialize = function () {
    var csvExportTemplate = _.template(JST["legacy/templates/combined-csv-export-template.html"]);

    $('body').append(csvExportTemplate()); // Assign button clicks

    $('.tree-csv-exports-generate-button').on('click', function (e) {
      app.csvExportsModal.sendCreateRequest();
    }); // var to check when default

    var setToDefault = true; // set recipes – a string of values of customisable fields
    // headings-cells-mcq-messages

    var recipeHumanReadable = '0000';
    var recipeMachineReadable = '1112';
    var recipeUserCustomised = null; // get selected options for export from users

    function getUserOptionsRecipe() {
      var fhd = $(".csv-exports-option-format-headings").val() ? $(".csv-exports-option-format-headings").val() : '0';
      var fcc = $(".csv-exports-option-format-cells").val() ? $(".csv-exports-option-format-cells").val() : '0';
      var vcq = $(".csv-exports-option-values-mcq").val() ? $(".csv-exports-option-values-mcq").val() : '0';
      var vms = $(".csv-exports-option-values-messages").val() ? $(".csv-exports-option-values-messages").val() : '0';
      return fhd + fcc + vcq + vms;
    } // remove active class from all


    $("[class*=csv-exports-btn-format-]").click(function () {
      $("[class*=csv-exports-btn-format-]").removeClass('btn-primary active').addClass('btn-default');
    }); // when human-readable is selected

    $(".csv-exports-btn-format-human").click(function () {
      setToDefault = false;
      $(this).addClass('btn-primary active').removeClass('btn-default');
      $(".csv-exports-option-format-headings option").eq('0').prop('selected', 'selected');
      $(".csv-exports-option-format-cells option").eq('0').prop('selected', 'selected');
      $(".csv-exports-option-values-mcq option").eq('0').prop('selected', 'selected');
      $(".csv-exports-option-values-messages option").eq('0').prop('selected', 'selected');
    }); // when machine-readable is selected

    $(".csv-exports-btn-format-machine").click(function () {
      setToDefault = false;
      $(this).addClass('btn-primary active').removeClass('btn-default');
      $(".csv-exports-option-format-headings option").eq('1').prop('selected', 'selected');
      $(".csv-exports-option-format-cells option").eq('1').prop('selected', 'selected');
      $(".csv-exports-option-values-mcq option").eq('1').prop('selected', 'selected');
      $(".csv-exports-option-values-messages option").eq('2').prop('selected', 'selected');
    }); // when custom is selected

    $(".csv-exports-btn-format-custom").click(function () {
      setToDefault = false;
      $(this).addClass('btn-primary active').removeClass('btn-default');
    }); // when we are to use default – use human-readable

    if (setToDefault) {
      $(".csv-exports-btn-format-human").trigger('click');
    } // on change check what options have been selected


    $("[class*=csv-exports-option-]").change(function () {
      setToDefault = false;
      recipeUserCustomised = getUserOptionsRecipe(); // if customRecipe is neither machine-readable NOR human-readable then it is custom

      if (recipeUserCustomised) {
        if (recipeUserCustomised == recipeHumanReadable) {
          $(".csv-exports-btn-format-human").trigger('click');
        } else if (recipeUserCustomised == recipeMachineReadable) {
          $(".csv-exports-btn-format-machine").trigger('click');
        } else {
          setToDefault = false;
          $("[class*=csv-exports-btn-format-]").removeClass('btn-primary active').addClass('btn-default');
          $(".csv-exports-btn-format-custom").addClass('btn-primary active').removeClass('btn-default');
        }
      }
    }); // Initialize the second half with the list of existing links:

    app.csvExportsModal.initializeLinksList();
  };

  app.csvExportsModal.initializeLinksList = function () {
    if (typeof app.csvExportsModal.shareableLinkListTemplate == 'undefined') {
      app.csvExportsModal.shareableLinkListTemplate = _.template(JST["legacy/templates/combined-csv-export-list-template.html"]);
    }

    $('.csv-exports-list-container').html(app.csvExportsModal.shareableLinkListTemplate());
    app.csvExportsModal.queueInProgress();
  };

  app.csvExportsModal.open = function (e) {
    if ($('#combined-csv-export-modal').length == 0) {
      app.csvExportsModal.initialize();
    }

    app.csvExportsModal.setLabelValues();
    $('#combined-csv-export-modal').modal();
  };

  app.csvExportsModal.setLabelValues = function () {
    // TODO - use another mini-template for these guys, rather than updating text values with jQuery.
    var startDateLabel = app.startDate.format('MMMM D, YYYY');
    var endDateLabel = app.endDate.format('MMMM D, YYYY');
    var channelLabel = app.labels.channel;
    var blocksLabel = app.labels.blocks;

    if (app.params.versionFiltersEnabled) {
      $('.export-version-sets-versions-label').show();
    } else {
      $('.export-version-sets-versions-label').hide();
    }

    if (app.params.noValidDateRange) {
      $('.csv-exports-date-range-labels').hide();
      $('.csv-exports-date-range-all-time-label').show();
    } else {
      $('span.sl-label-start-date').text(startDateLabel);
      $('span.sl-label-end-date').text(endDateLabel);
    }

    $('span.sl-label-channel').text(channelLabel);
    $('span.sl-label-blocks').text(blocksLabel);
    $('span.sl-label-versions').text(app.labels.versionsSelected + " of " + app.labels.versionsTotal);
  };

  app.csvExportsModal.sendStatusRequest = function () {
    $.ajax({
      url: "/ajax/treeversionsets/csvexportstatus/" + app.tree_version_set_id,
      type: 'GET',
      dataType: 'json',
      success: function success(response) {
        app.csvExports = response;
        app.csvExportsModal.initializeLinksList();
      }
    });
  };

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
    };

    if (app.params.noValidDateRange == false) {
      sendRequest.startDate = app.startDate.format('YYYY-MM-DD');
      sendRequest.endDate = app.endDate.format('YYYY-MM-DD');
    }

    var treeVersionSetId = app.tree_version_set_id;
    var then = moment(); // time of export click

    var thenAfter5s = then.clone().add(5, 'seconds'); // Re-enable time will be after 5s

    $('.tree-csv-exports-generate-button').prop("disabled", true);
    $.post("/ajax/treeversionsets/csvexportstart/" + treeVersionSetId, {
      data: sendRequest
    }).done(function (response) {
      app.csvExports = response;
      app.csvExportsModal.initializeLinksList();
      return true;
    }).fail(function (response) {
      console.error(response);
      app.audioChoice.setTopUpdatesBar('Error while sending CSV request...', 1);
    }).always(function (response) {
      // Re-enable the export button
      // Estimate the right delay in case the request has been processed in less than 5s
      var delay = moment.duration(thenAfter5s.diff(moment()));
      var delayInMilliseconds = delay > 0 ? delay.asMilliseconds() : 0;

      _.delay(function () {
        $('.tree-csv-exports-generate-button').prop("disabled", false);
      }, delayInMilliseconds);
    });
  };

  app.csvExportsModal.queueInProgress = function () {
    var firstExportInProgress = _.find(app.csvExports, {
      upload_status: 0
    }); // If necessary, create a de-bounced version of the Ajax status check function


    if (_.isFunction(app.csvExportsModal.sendStatusRequestDebounced) == false) {
      app.csvExportsModal.sendStatusRequestDebounced = _.debounce(app.csvExportsModal.sendStatusRequest, 1000);
    }

    if (firstExportInProgress) {
      _.delay(app.csvExportsModal.sendStatusRequestDebounced, 0.5 * 1000);
    }
  };

  app.blockResultsLoader = {};

  app.blockResultsLoader.load = function () {
    var nextBlockKeyToLoad = $('.tree-results-block-container[data-is-loaded=0]').first().attr('id');
    $('.tree-results-loading-indicators').show();

    if (nextBlockKeyToLoad) {
      app.blockResultsLoader.loadBlock(nextBlockKeyToLoad, 1);
    } else {
      $('.tree-results-loading-indicators').hide();
    }
  };

  app.blockResultsLoader.assignButtons = function (parentElement) {
    $(parentElement).find('.result-view-control-tab').on('click', function (e) {
      var targetType = $(e.currentTarget).attr('data-tab-option');
      $(parentElement).find('.tree-results-item-tabs').hide();
      $(parentElement).find(".tree-results-item-" + targetType).show();
    });
    $(parentElement).find('.result-view-control-tab').first().trigger('click');
  };

  app.blockResultsLoader.loadBlock = function (blockKey, continueLoading) {
    var url;

    if (app.shareableLink) {
      url = window.location.pathname; // Check if there's already a query string

      if (window.location.search) {
        url += window.location.search + '&blockKey=' + blockKey;
      } else {
        url += '?blockKey=' + blockKey;
      }
    } else {
      url = '/ajax/trees/set/' + app.tree_version_set_id + '/results/' + blockKey + window.location.search;
    }

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function success(data) {
        if (data.htmlOutput) {
          // Place the HTML output into the container DIV
          // TODO - this should actually use client-side templates, once the item results template is converted back.
          _.each(data.htmlOutput, function (value, key) {
            $('#' + key).attr('data-is-loaded', 1).html(value); // Assign buttons for tab switching:

            app.blockResultsLoader.assignButtons($('#' + key));
          }); // Generate Chart.js-based charts:


          app.chartJsHelper.createCharts();

          if (continueLoading) {
            // Check if there are more blocks to load!
            app.blockResultsLoader.load();
          }
        }
      }
    });
  };

  app.blockResultsLoaderV2 = {};

  app.blockResultsLoaderV2.loadKeyMetrics = function () {
    var url;

    if (app.shareableLink) {
      // Check if there's already a query string
      url = window.location.search ? window.location.pathname + window.location.search + "&keymetrics=1" : window.location.pathname + '?keymetrics=1';
    } else {
      url = '/ajax/trees/set/' + app.tree_version_set_id + '/results/keymetrics' + window.location.search;
    }

    $.post(url, {
      filterSet: _.get(viamo, '$store.state.publicApp.filterSet', [])
    }).done(function (keymetrics) {
      if (keymetrics) {
        app.blockResultsLoaderV2.loadDonutChart('connected', keymetrics.finishedDeliveryLogCount, keymetrics.deliveryLogCount);
        $("#print-connected-values").html(keymetrics.finishedDeliveryLogCount + " Connected of " + keymetrics.deliveryLogCount + " Calls");
        app.blockResultsLoaderV2.loadDonutChart('completed', keymetrics.completedDeliveryLogCount, keymetrics.deliveryLogCount);
        $("#print-completed-values").html(keymetrics.completedDeliveryLogCount + " Completed of " + keymetrics.deliveryLogCount + " Calls");
        app.blockResultsLoaderV2.loadDonutChart('unique', keymetrics.uniqueSubscriberCount, keymetrics.deliveryLogCount);
        $("#print-unique-value").html(keymetrics.uniqueSubscriberCount + " Unique Subscribers");
        app.blockResultsLoaderV2.loadDonutChart('firsttime', keymetrics.firstTimeSubscriberCount, keymetrics.uniqueSubscriberCount);
        $("#print-firsttime-value").html(keymetrics.firstTimeSubscriberCount + " First Time Subscribers");
        app.blockResultsLoaderV2.loadDonutChart('answered', keymetrics.completedQuestionCount, 0);
        $("#print-answered-value").html(keymetrics.completedQuestionCount + " Question Responses");

        if ($('#tree-results-keymetrics-durations').length > 0) {
          app.blockResultsLoaderV2.loadAvgCallDurations(keymetrics);
        }
      }
    }).fail(function (response) {
      console.error(response);
      $(".doughnut-charts-row").html('<h4 class="text-danger text-center">' + JSON.parse(response.responseText) + '</h4>');
    });
  };

  app.blockResultsLoaderV2.loadDonutChart = function (keymetricName, chartNumerator, chartTotal) {
    var chartDenominator = chartTotal === 0 ? 0 : chartTotal - chartNumerator;
    var chartDataSets = {
      labels: ["", ""],
      datasets: [{
        data: [chartNumerator, chartDenominator],
        backgroundColor: ["#333", "#999"],
        hoverBackgroundColor: ["#333", "#999"],
        borderColor: ["#333", "#999"]
      }]
    };
    $('#tree-results-loading-indicator-doughnut-' + keymetricName).hide();
    app.chartJsHelper.updateTreeDoughnutChart('v-chart-tree-doughnut-' + keymetricName, chartDataSets); // Set Chart's dynamic label as visible and set its span html with the value

    if (chartTotal >= 0) {
      $('#tree-doughnut-total-' + keymetricName).html(formatLargeNumber(chartTotal)).parent().removeClass('hidden');
    }
  };

  app.blockResultsLoaderV2.loadAvgCallDurations = function (durations) {
    if (durations) {
      // TODO what iv durationAvg or completedDurationAvg = 0 or don't exist?
      $('#tree-results-duration-all').html((durations.durationAvg / 60).toPrecision(2) + " minutes");
      $('#tree-results-duration-completed').html((durations.completedDurationAvg / 60).toPrecision(2) + ' minutes');
      $('#tree-results-keymetrics-duration').show();
    }

    $('#tree-results-loading-indicator-durations').hide();
    $('.tree-results-duration-item').css('visibility', 'visible');
  };

  app.blockResultsLoaderV2.loadBlocksInteractionsChart = function () {
    var barchartLabelsTruncated = [],
        barchartLabels = [],
        totalInteractionsBarchartData = [],
        completedInteractionsBarchartData = [],
        orderedCompletedInteractionsBarchartData = [],
        totalInteractionsOrderedBarchartData = [],
        colorIndexes = [],
        orderedColorIndexes = [];
    var orderedBarchartLabelsTruncated = [],
        orderedBarchartLabels = [],
        totalInteractionsOrderedBarchartData = [];

    _.each(app.resultsData, function (blockResult, key) {
      var truncatedBlockTitle, resultIndex, colorIndex, totalInteractions, completedInteractions, colorValue;
      var blockTitle = _.get(blockResult, 'details.title') || _.get(blockResult, 'classDetails.name') || '';
      truncatedBlockTitle = blockTitle.length < 9 ? blockTitle : blockTitle.substring(0, 9) + "...";
      colorIndex = blockResult["colorIndex"];
      colorValue = app.chartJsHelper.getChartChoiceColorsArray(colorIndex)[0];
      totalInteractions = blockResult["totalInteractions"]; // outputKeys is either an empty array, or has one or more objects.

      completedInteractions = blockResult["outputKeys"].reduce(function (acc, val) {
        return acc + val.outputKeyTotals;
      }, 0); // Listing-ordered arrays

      barchartLabels.push(blockTitle);
      barchartLabelsTruncated.push(truncatedBlockTitle);
      colorIndexes.push(colorValue);
      totalInteractionsBarchartData.push(totalInteractions);
      completedInteractionsBarchartData.push(completedInteractions); // Popularity-ordered arrays. Callback fn applies descending order.

      resultIndex = _.sortedIndex(orderedCompletedInteractionsBarchartData, completedInteractions, function (i) {
        return -i;
      });
      orderedBarchartLabels.splice(resultIndex, 0, blockTitle);
      orderedBarchartLabelsTruncated.splice(resultIndex, 0, truncatedBlockTitle);
      orderedColorIndexes.splice(resultIndex, 0, colorValue);
      orderedCompletedInteractionsBarchartData.splice(resultIndex, 0, completedInteractions);
      totalInteractionsOrderedBarchartData.splice(resultIndex, 0, totalInteractions);
    });

    app.chartJsHelper.updateTreeBlocksInteractionsChart('v-chart-tree-blocks-popularity', {
      labels: orderedBarchartLabelsTruncated,
      fullLabels: orderedBarchartLabels,
      datasets: [{
        data: orderedCompletedInteractionsBarchartData,
        backgroundColor: orderedColorIndexes,
        borderColor: orderedColorIndexes,
        borderWidth: 1
      }, {
        hidden: true,
        data: totalInteractionsOrderedBarchartData,
        backgroundColor: orderedColorIndexes,
        borderColor: orderedColorIndexes,
        borderWidth: 1
      }]
    });
    app.chartJsHelper.updateTreeBlocksInteractionsChart('v-chart-tree-blocks-listing', {
      labels: barchartLabelsTruncated,
      fullLabels: barchartLabels,
      datasets: [{
        data: completedInteractionsBarchartData,
        backgroundColor: colorIndexes,
        borderColor: colorIndexes,
        borderWidth: 1
      }, {
        hidden: true,
        data: totalInteractionsBarchartData,
        backgroundColor: colorIndexes,
        borderColor: colorIndexes,
        borderWidth: 1
      }]
    });
    app.blockResultsLoaderV2.assignButtons($('#tree-summary-container'));
  };

  app.blockResultsLoaderV2.assignButtons = function (parentElement) {
    $(parentElement).find('.tree-interactions-barcharts-toggle-button').on('click', function (e) {
      var $buttonClicked = $(e.currentTarget);
      var barchartTarget = $buttonClicked.attr('data-section-option');

      if ($buttonClicked.hasClass('active')) {
        return;
      }

      $buttonClicked.siblings().removeClass('active');
      $buttonClicked.addClass('active'); // Hide and show the relevant Bar Chart

      $("canvas[id^='v-chart-tree-blocks-']").hide();
      $("#v-chart-tree-blocks-" + barchartTarget).show();
      $('#order-by-active-label-print').html('Order By: ' + $buttonClicked.attr('aria-label')); // Render any charts that haven't been rendered yet. Checks if data-generated==0 attribute.

      app.chartJsHelper.createCharts();
      $('#v-chart-tree-blocks-listing').removeClass('hidden');
    });
    $(parentElement).find('input[name="barchart-dataset-toggle"]').on('click', function (e) {
      var barchartDatasetTarget = $(e.currentTarget).attr('value'); // Note that the barchart-dataset-toggle Buttons are not specific to one Chart

      var listingChart = app.chartJsHelper.chartObjects['v-chart-tree-blocks-listing'];
      var popularityChart = app.chartJsHelper.chartObjects['v-chart-tree-blocks-popularity'];
      var listingDatasets = listingChart.config.data.datasets;
      var popularityDatasets = popularityChart.config.data.datasets;
      var isEnteredSelected = barchartDatasetTarget == 'entered',
          isCompletedSelected = barchartDatasetTarget == 'completed';

      if (isCompletedSelected) {
        $('#tree-summary-barchart-title').html('Completed Interactions per Block');
      } else {
        $('#tree-summary-barchart-title').html('Entered Interactions per Block');
      }

      listingDatasets[0].hidden = isEnteredSelected;
      listingDatasets[1].hidden = isCompletedSelected;
      popularityDatasets[0].hidden = isEnteredSelected;
      popularityDatasets[1].hidden = isCompletedSelected;
      listingChart.update();
      popularityChart.update();
    });
    $(parentElement).find('.result-view-section-button').on('click', function (e) {
      var tabTarget = $(e.currentTarget).attr('data-section-option');
      var tabLabel = $(e.currentTarget).text();
      $(e.currentTarget).closest(".result-view-section-control-container").find(".sub-report-type-title").html(tabLabel == "╳" ? "Timeline: Total Interactions" : "Timeline: " + tabLabel);

      if ($(e.currentTarget).hasClass('active')) {
        console.log("Already on the " + tabLabel + " section");
        return;
      }

      $(e.currentTarget).siblings().removeClass('active');
      $(e.currentTarget).addClass('active'); // Hide and show the relevant section

      $(parentElement).find('.tree-results-item-tab-section').hide();
      $(parentElement).find('.tree-results-item-tab-section[data-section-id=' + tabTarget + ']').show(); // Render any charts that haven't been rendered yet

      app.chartJsHelper.createCharts();
    });
    $(parentElement).find('.result-normalize-cb').on('click', function (e) {
      var chartTarget = $(e.currentTarget).attr('data-chart-type');
      var doNormalize = 0;
      var targetElement;

      if ($(e.currentTarget).is(':checked')) {
        doNormalize = 1;
      } // Hide and show the relevant section


      targetElement = $(parentElement).find('canvas[data-chart-type=' + chartTarget + ']'); // Set normalize to the new value, and set is-generated to 0, to queue up a re-rendering of the chart:

      $(targetElement).attr('data-normalize', doNormalize).attr('data-generated', 0); // Render any charts that haven't been rendered yet

      app.chartJsHelper.createCharts();
    });
  };

  app.combinedVersions = {};

  app.combinedVersions.assignButtons = function () {
    $('.tree-results-versions-select-button').on('click', function (e) {
      // Make sure the element lines up underneath the "Versions" button
      // This is a bit awkward, since we're right aligned and not in
      // a position:absolute setting, so we'll actually add in the
      // width of the (variable) daterangepicker to a fixed value:
      var rightPosition = _.parseInt($('#reportrange').width() + $('.tree-results-gear-menu').width() - $('.tree-results-versions-select-button').width() / 2) - 4;
      $('.tree-results-versions-selector').css({
        right: rightPosition
      });
      $('.tree-results-versions-selector').toggle(); // Prevent clicks on the body element that would re-hide it.

      e.stopPropagation();
    });
    $('.tree-results-versions-selector').on('click', function (e) {
      // Prevent clicks on the body element that would re-hide it.
      // This also protects clicks on the other elements within the dropdown.
      e.stopPropagation();
    });
    $('.tree-results-versions-select-all-link').on('click', function (e) {
      // $('.tree-results-versions-selector').toggle();
      $('.tree-results-versions-selector input[type=checkbox]').prop('checked', true).trigger('change');
    });
    $('.tree-results-versions-select-none-link').on('click', function (e) {
      // $('.tree-results-versions-selector').toggle();
      $('.tree-results-versions-selector input[type=checkbox]').prop('checked', false).trigger('change');
    });
    $('.tree-results-versions-selector input[type=checkbox]').on('change', function (e) {
      $('.tree-results-versions-apply-button').prop('disabled', false);
    });
    $('.tree-results-versions-apply-button').on('click', function (e) {
      // Delete any existing version entries in the filter form, before adding the selected ones:
      $('#filter-form input[name^=versions]').remove(); // With thanks to
      // http://stackoverflow.com/questions/2530635/jquery-add-additional-parameters-on-submit-not-ajax#comment22923873_2531379

      $('.tree-results-versions-selector input[type=checkbox]:checked').each(function () {
        // return $(this).val()
        var input = $('<input>', {
          type: 'hidden',
          name: 'versions[]',
          value: $(this).val()
        });
        $('#filter-form').append($(input));
      });
      $('#filter-form').submit();
    }); // If the selector is open, hide it by clicking on the open space,
    // just like for dropdown menus.

    $('body').on('click', function (e) {
      $('.tree-results-versions-selector').hide();
    });
    $('.tree-results-versions-selector').hide();
  };

  app.combinedVersions = _.assign({}, app.combinedVersions, window.combinedVersions);
})(window.jQuery);

/***/ }),

/***/ "d883":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/TextEditor.vue?vue&type=template&id=4ab294e6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('label',[_vm._v(_vm._s(_vm.label))]),(_vm.isEditable)?_c('textarea',{staticClass:"form-control",attrs:{"placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"keydown":function($event){return _vm.$emit('keydown', $event)},"input":function($event){return _vm.$emit('input', $event.target.value)}}}):_c('p',[_vm._v(" "+_vm._s(_vm.value)+" ")]),_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/common/TextEditor.vue?vue&type=template&id=4ab294e6&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/common/TextEditor.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var TextEditorvue_type_script_lang_js_ = ({
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    label: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/common/TextEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var common_TextEditorvue_type_script_lang_js_ = (TextEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/common/TextEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  common_TextEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextEditor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "e1e0":
/***/ (function(module) {

module.exports = JSON.parse("{\"en.flow-builder\":{\"flow-name\":\"Flow name\",\"flow-label\":\"Flow label\",\"flow-importer\":\"Flow importer\",\"Interaction-timeout\":\"Interaction timeout\",\"modes\":\"Modes\",\"enter-flow-name\":\"Enter flow name\",\"enter-flow-label\":\"Enter flow label\",\"maximum-digits\":\"Maximum digits\",\"AirtimeTransferBlock\":\"Transfer Airtime\",\"BillSubscriberBlock\":\"Bill Contact\",\"CallBackWithCallCenterBlock\":\"Call Back With Call Center Block\",\"CallHistoryBranchBlock\":\"Branch via Call History\",\"CollaborativeFilteringQuestionBlock\":\"Collaborative Filtering Question\",\"CollaborativeFilteringRatingBlock\":\"Collaborative Filtering Rating\",\"CollaborativeFilteringRatioBranchBlock\":\"Branch via Collaborative Filtering Ratio\",\"ConnectToOperatorBlock\":\"Connect to Operator\",\"ConsoleIO\\\\Print\":\"Print\",\"ConsoleIO\\\\Read\":\"Read\",\"ContentTypeBranchBlock\":\"Branch via Content Type\",\"Core\\\\Case\":\"Case\",\"Core\\\\Log\":\"Log\",\"Core\\\\Output\":\"Output\",\"Core\\\\RunFlow\":\"Run Flow\",\"CreateSubscriberBlock\":\"Create Contact\",\"CurrentTimeBranchBlock\":\"Branch via Current Time\",\"DecisionBranchBlock\":\"Decision Branch\",\"DirectorySelectionBlock\":\"Directory Selection\",\"EntitySelectionBlock\":\"Referral Entity Selection\",\"ExpressionBranchBlock\":\"Expression Branch \",\"GenerateCodeBlock\":\"Generate Unique Code\",\"GroupBranchBlock\":\"Branch via Group Membership\",\"GroupPropertyBlock\":\"Edit Group Membership\",\"GroupSizeBranchBlock\":\"Branch via Group Size\",\"IdValidationBlock\":\"Branch via Valid Code\",\"LanguageSelectorBlock\":\"Language Selection Prompt\",\"LocationBlock\":\"Location Selector\",\"MarkCallCompleteBlock\":\"Mark Call as Complete\",\"MessageBlock\":\"Message\",\"MobilePrimitives\\\\Message\":\"Message\",\"MobilePrimitives\\\\NumericResponse\":\"Numeric Response\",\"MobilePrimitives\\\\OpenResponse\":\"Open Response\",\"MobilePrimitives\\\\SelectOneResponse\":\"Select One Response\",\"MobilePrimitives\\\\SelectManyResponse\":\"Select Many Responses\",\"MultipleChoiceQuestionBlock\":\"Multiple Choice Question\",\"MultipleSelectMultipleChoiceQuestionBlock\":\"Multiple Select Multiple Choice Question\",\"NumericBranchBlock\":\"Numeric Branch\",\"NumericQuestionBlock\":\"Numeric Question\",\"OpenQuestionBlock\":\"Open-ended Question\",\"PlayGroupMessageBlock\":\"Play Group Message Block\",\"RandomBranchBlock\":\"Random Branch\",\"RandomOrderMultipleChoiceQuestionBlock\":\"Random Order Multiple-Choice Question\",\"RecordGroupMessageBlock\":\"Record Group Message Block\",\"RunTreeBlock\":\"Run Another Tree\",\"SmartDevices\\\\LocationResponse\":\"Location Response\",\"SmartDevices\\\\PhotoResponse\":\"Photo Response\",\"SubscriberBranchBlock\":\"Branch via Contact Data\",\"SubscriberPropertiesSnapshotBlock\":\"Snapshot of Contact Properties\",\"SubscriberPropertyBlock\":\"Edit Contact Property\",\"SummaryBlock\":\"Summary\",\"TriggerOutgoingCallBlock\":\"Trigger Outgoing Call\",\"ValidateCodeBlock\":\"Validate Unique Code\",\"WeatherAlertsBlock\":\"Create Weather Alerts\",\"WeatherForecastBlock\":\"Weather Forecast\",\"WebhookBlock\":\"Webhook\",\"WebhookContentBlock\":\"Webhook Content\",\"X-abbreviations-set-when-creating-tree\":\":lang abbreviations set when creating tree\",\"X-are-required-placeholder-components-for-rule-but-additional-designation-optional\":\":placeholders are required placeholder components for the rule but an additional designation is optional.\",\"X-assigned-to-a-block\":\":label assigned to a block\",\"X-of-resources-populated\":\":count of resources populated\",\"X-seconds-long\":\":duration_seconds long\",\"X-subscribers-selected\":\"contacts selected\",\"X-will-match-with-Y\":\":pattern will match with :name\",\"X-wont-match-with-Y\":\":pattern won't match with :name\",\"absolute-date\":\"Absolute Date\",\"accessed\":\"Accessed\",\"action\":\"Action\",\"action-allows-custom-subscriber-data-when-block-reached\":\"This action allows you to set custom contact data, when this block in the tree is reached.\",\"action-changes-preferred-content-types-to-receive-in-future\":\"This action changes preferred content types (Voice or SMS) that the contact will receive in future calls.\",\"action-immediately-changes-preferred-language-of-subscriber\":\"This action immediately changes the preferred language of the contact. Later blocks in the tree will use the new language.\",\"actions\":\"Actions\",\"active\":\"active\",\"adapted-from\":\"Adapted from:\",\"add-a-description-to-this-recording\":\"Add A Description To This Recording\",\"add-a-new-recorder\":\"Add A New Recorder\",\"add-block\":\"Add Block\",\"add-condition\":\"Add Condition\",\"add-data\":\"Add data\",\"add-label-tags\":\"Add label / tags\",\"add-map-coordinates-field\":\"Add a Map Coordinates field\",\"add-question\":\"Add question\",\"add-to\":\"Add to\",\"add-to-group\":\"Add to Group\",\"added\":\"added\",\"additional-designation-created-in-the-rule\":\"An additional designation created in the rule\",\"adds-subscribers-to-the\":\"Adds contacts to the\",\"admin-csv-file\":\"Master CSV File\",\"advanced\":\"Advanced\",\"after\":\"After\",\"after-completing-all-output-branches\":\"After completing all output branches:\",\"airtime-credit-transfer\":\"Airtime Credit Transfer\",\"alert-message-title\":\"Alert Message Title\",\"all-block-types\":\"All block types\",\"all-blocks\":\"All blocks\",\"all-channels\":\"All Channels\",\"all-content-across-this-organisation\":\"All content across this organisation\",\"all-languages\":\"All Languages\",\"all-message-blocks\":\"All message blocks\",\"all-other-possible-values\":\"All other possible values\",\"all-question-blocks\":\"All question blocks\",\"all-subscribers\":\"All Contacts\",\"all-transcriptions-saved\":\"All Transcriptions Saved\",\"allow-visitors-to-modify-the-date-range\":\"Allow visitors to modify the date range\",\"allow-visitors-to-translate-the-page-in-their-language\":\"Allow visitors to translate the page into their language\",\"already-published\":\"Already Published!\",\"already-used\":\"Already used\",\"and\":\"and\",\"any-key\":\"Any key\",\"anytime\":\"Anytime\",\"api-key\":\"API Key\",\"api-success\":\"Successfully connected to API.\",\"append-or-replace-on-upload\":\"Append or replace on upload?\",\"applies-to-calls-sent-to-all-subscribers-or-groups-containing-subscriber\":\"This applies to calls sent to All Contacts, or sent to Groups containing this contact. They can still receive outgoing calls addressed specifically to them.\",\"apply\":\"Apply\",\"apply-all-filters\":\"Apply All Filters\",\"april-month\":\"April\",\"are-you-sure-you-want-to-delete-this-shareable-link\":\"Are you sure you want to delete this shareable link? Users with the existing link will no longer be able to access this results.\",\"as-at\":\"as at\",\"at\":\"at\",\"at-character\":\"at character\",\"at-least\":\"At least\",\"at-least-one-language-must-be-checked\":\"At least one language must be checked.\",\"at-minimum-we-need-two-placeholders\":\"At a minimum, we need two placeholders:\",\"at-this-time\":\"At this time\",\"attach-multimedia\":\"Attach multimedia\",\"audio-export-started-for\":\"Audio export started for\",\"audio-file-naming-pattern\":\"Audio file naming pattern\",\"audio-files\":\"Audio Files\",\"audio-files-per-task\":\"Audio files per task\",\"audio-lib-empty-for-this-org\":\"Audio library is empty for this organization.\",\"audio-library\":\"Audio Library\",\"audio-listened\":\"Audio Listened\",\"august-month\":\"August\",\"auto\":\"Auto\",\"auto-gen-content-from-block-details\":\"Click to Auto-generated Content from Block Details\",\"auto-link-audio-files\":\"Auto-Link Audio Files\",\"automatic-routing-description\":\"With automatic routing, contacts are routed to a call center queue based on their 'target_operator' property. When set to automatic routing, you can control the queue by setting this property before a contact enters this block.\",\"automatic-routing-label\":\"Automatic Routing\",\"automatically-enable-statements\":\"Automatically enable statements\",\"automatically-enable-statements-help\":\"With this option on, new Statements will be 'Enabled'. If this option is off new Statements will be 'Unreviewed' \",\"average-audio-length\":\"Average Audio Length\",\"avg-duration-for-all-calls\":\"Average Duration for All Calls:\",\"avg-duration-for-completed-calls\":\"Avg. Duration for Completed Calls:\",\"back\":\"Back\",\"back-to-choices-list\":\"Back to Choices List\",\"back-to-trees-list\":\"Back to Trees List\",\"base-url\":\"Base URL\",\"base-url-placeholder\":\"example: https://example.org/api\",\"bill-subscriber\":\"Bill Contact\",\"block\":\"Block(s)\",\"block-allows-connect-to-operator-chosen-at-random-from-pre-specified-operator-contact-list\":\"This block allows you to connect a caller to an operator, chosen at random from a pre-specified operator contact list. This lets you quickly set up help lines or other in-person connections.\",\"block-choice-filter-description\":\"Blocks can be used as filters on the shared link. Select which blocks should be used as filters.\",\"block-code\":\"Block code\",\"block-details\":\"Block Details\",\"block-id\":\"Block Id\",\"block-label\":\"Block label\",\"block-name\":\"Block name\",\"block-ordering\":\"Block ordering\",\"block-ordering-help-text\":\"Override the default block sorting by entering a weight for each block. Blocks with a smaller value will be at the top of the list.\",\"block-responses-to-send-payload\":\"Block Responses To Send As Payload\",\"block-semantic-label\":\"Block semantic label\",\"block-title\":\"Block Title\",\"block-type-unsupported-in-resource-view\":\"Block Type Not Supported in Resource View\",\"blocks\":\"Blocks\",\"blocks-responses\":\"Block Responses\",\"blocks-to-display\":\"Blocks to display\",\"branch-if-subscriber-property\":\"Branch if Contact Property\",\"branch-to-true-if-the-subscriber-is-a-member-of-the\":\"Branch to True if the contact is a member of the\",\"branch-via-call-history\":\"Branch via Call History\",\"branch-via-call-history-desc1\":\"This block directs callers towards one of two options, based on the total number of calls in the specified date range for either just this tree or all trees in the entire organisation',\",\"branch-via-call-history-desc2\":\"If the number of calls in the specified date range is larger than the 'Calls Quota Threshold' value, then callers will go to the Quota Met output. If not, callers will go to the Not Met output.',\",\"branch-via-content-type\":\"Branch via Content Type\",\"branch-via-expression\":\"Expression Branch \",\"branch-via-group-membership\":\"Branch via Group Membership\",\"branch-via-group-size\":\"Branch via Group Size\",\"branch-via-subscriber-data\":\"Branch via Contact Data\",\"branch-via-valid-code\":\"Branch via Valid Code\",\"branching\":\"Branching\",\"breakdown-by\":\"Breakdown By\",\"btn-add-exit\":\"Add Exit\",\"call-back-block-desc\":\"Notifies the Call Center to call the contact by adding the contact to the organization's dialing list.\",\"call-back-block-dialing-list-desc\":\"Enter the name of the dialing list that the call request should be added to. If the dialing list does not already exist, it will be created with this name.\",\"call-back-block-dialing-list-heading\":\"Dialing List Name\",\"call-back-block-enable-routing-by-queue\":\"Enable routing by queue\",\"call-back-block-enable-routing-by-queue-desc\":\"If this option is selected, call requests will only go to operators signed in to a specific queue.\",\"call-back-block-enter-api-key\":\"Enter API key\",\"call-back-block-enter-dialing-list-name\":\"Enter dialing list name\",\"call-back-block-notify-different-org\":\"Notify a different organization's Call Center\",\"call-back-block-notify-this-org\":\"Notify this organization's Call Center\",\"call-back-block-org-api-key\":\"Organization's API Key\",\"call-back-block-queue-name\":\"Queue Name\",\"call-back-block-select-queue\":\"Select queue\",\"call-finished\":\"Call Finished\",\"call-started\":\"Call Started\",\"call-this-phone-number\":\"Call This Phone Number\",\"call-to-record\":\"Call to record\",\"caller\":\"Caller\",\"calls-after\":\"Calls after\",\"calls-before\":\"Calls before\",\"calls-quota-threshold\":\"Calls Quota Threshold\",\"campaigns\":\"Campaigns\",\"cancel\":\"Cancel\",\"candidate-question\":\"Candidate Question\",\"cannot-delete-that-tree\":\"Cannot delete that tree\",\"cannot-restore-that-tree\":\"Cannot restore that tree.\",\"cannot-restore-that-tree.\":\"Cannot restore that tree.\",\"case-of-duplicates-instruction\":\"In the case of duplicates and existing contacts with the same phone number\",\"categorization\":\"Categorization\",\"category\":\"Category\",\"category-name\":\"Category name\",\"cell-contents\":\"Cell Contents\",\"cell-contents-format\":\"Cell Contents Format\",\"cf-ratio-description\":\"Configure the ideal number of ratings that each statement should receive before another statement should be gathered.\",\"chance-of-rain\":\"Chance of Rain\",\"change-subscriber-language\":\"Change contact language\",\"change-subscriber-start-date\":\"Change contact start date\",\"channel\":\"Channel\",\"channels\":\"Channels\",\"characters\":\"character|characters\",\"check-url-api\":\"Check your URL and API key and try again.\",\"choice\":\"Choice\",\"choice-filter-tags\":\"Choice filter tags\",\"choice-id-choice-text\":\"Choice ID & Choice Text\",\"choice-id-only\":\"Choice ID Only\",\"choice-keypress-options\":\"Choice Key Press Options\",\"choice-options\":\"Choice Option\",\"choice-options-fixed\":\"Choice Options\",\"choices\":\"Choices\",\"choices-choice-attributes\":\"Choices\",\"choices-prompt\":\"Choices Prompt\",\"choose-a-language-selector\":\"(Choose a Language Selector)\",\"choose-a-language-selector-label\":\"Choose a language selector:\",\"choose-audio\":\"Choose Audio\",\"choose-csv-file\":\"Choose CSV file\",\"choose-date\":\"Choose Date\",\"choose-file\":\"Choose file\",\"choose-how-many-seconds-to-wait\":\"Please choose how many seconds to wait until the contact presses a key to repeat this message.\",\"choose-how-many-times-can-repeat\":\"Please choose how many times the contact can repeat this message.\",\"choose-subscribers\":\"Choose contacts\",\"choose-which-numbered-key\":\"Please choose which numbered key the contact will press to repeat this message.\",\"clear-floip-config\":\"Clear Configuration\",\"click-and-drag-to-create-a-new-connection\":\"Click-and-drag to create a new connection\",\"click-and-drag-to-move-this-block\":\"Click-and-drag to move this block\",\"click-here-to-download-the-file\":\"Click here to download the file\",\"click-to-lock-this-choice-in-place\":\"Click to lock this choice in place\",\"click-to-remove-this-connection\":\"Click to remove this connection\",\"click-to-select-this-block\":\"Click to select this block\",\"click-to-toggle-editing\":\"Click to toggle editing\",\"click-to-unlock\":\"Click to unlock\",\"clipboard\":\"Clipboard\",\"clipboard-content\":\"Clipboard Content\",\"clipboard-simulator\":\"Clipboard Simulator\",\"clipboard-subscribers-that-reached-this-block\":\"Clipboard contacts that reached this block\",\"clipboard-subtitle\":\"Provide additional text that will be displayed to operators\",\"close\":\"Close\",\"cloudy\":\"Cloudy\",\"code-length\":\"Character Length\",\"code-validation\":\"Code validation\",\"codes\":\"Codes:\",\"collaborative-filtering-question\":\"Collaborative Filtering Question\",\"collaborative-filtering-rating\":\"Collaborative Filtering Rating\",\"combined-block-results\":\"Combined Block Results\",\"combined-tree-results\":\"Combined Tree Results\",\"compact-filter-display\":\"Compact filter display\",\"compact-filter-display-help-text\":\"Enter the maximum number of filter choices that should be displayed using the expanded filter. (e.g. '0' if all filters should be compact)\",\"completed\":\"Completed\",\"completed-interactions-per-block\":\"Completed Interactions per Block\",\"completed-of\":\"Completed of\",\"completed-transcriptions\":\"Completed Transcriptions\",\"completed-via\":\"Completed via\",\"components-can-be-separated-by-symbols-but-not-required\":\"Components can be separated by symbols but is not required.\",\"configure-floip-header\":\"Configure Flow Interoperability results streaming\",\"configure-referral-entity-prompt-eg\":\"Configure the prompt to select a Referral Entity. e.g.:\",\"confirm\":\"Confirm\",\"confirm-delete\":\"Confirm Delete\",\"confirm-upload\":\"Confirm Upload\",\"conflict-external-changes\":\"To see external changes please click the Reload button.\",\"conflict-new-version\":\"To save your work as a new version, please click the New version button.\",\"connect-to\":\"Connect To\",\"connect-to-an-operator\":\"Connect to an Operator\",\"connect-to-the-following-operator-list\":\"Connect to the following operator list\",\"connected-of\":\"Connected of\",\"contact\":\"Contact\",\"contact-properties\":\"Contact Properties\",\"contact-updated\":\"Existing contact updated\",\"content\":\"Content\",\"content-type\":\"Content type\",\"content-type-1\":\"Voice\",\"content-type-2\":\"SMS\",\"content-type-3\":\"Data\",\"content-type-4\":\"USSD\",\"content-type-5\":\"One-way SMS\",\"content-type-is-not-selected\":\"Content type is not Selected\",\"continue-through-exit\":\"Continue through Exit\",\"continuous\":\"Continuous\",\"corresponding-audio-file-components-examples\":\"Corresponding audio file components examples\",\"could-not-add-property\":\"Could not add property\",\"could-not-download-audio-for-that-tree\":\"Could not download audio for that tree.\",\"could-not-export-open-ended-audio\":\"Could not export open-ended audio.\",\"create-a-new-group\":\"create a new group\",\"create-a-new-list\":\"Create a new list\",\"create-a-new-one\":\"Create a new one\",\"create-a-new-survey\":\"create a new survey\",\"create-a-new-tree\":\"create a new tree\",\"create-a-tag-prompt\":\"Create tag\",\"create-and-upload-a-new-message\":\"create and upload a new message\",\"create-at-least-one-language-selector\":\"Before using this block, create at least one Language Selector.\",\"create-contact-absolute-date\":\"The Contact's property will be set to the date provided\",\"create-contact-description\":\"This block allows you to create Contacts with input gathered from previous blocks of this tree.\",\"create-contact-instructions\":\"Configure which data the Contact should be created with.\",\"create-contact-relative-block\":\"The Contact's property will be set relative to the time of the call using the offset provided. The answer the the configured block will determine how much to offset the value by.\",\"create-contact-relative-date\":\"The Contact's property will be set relative to the time of the call using the offset provided. \",\"create-new-link\":\"Create New Link\",\"create-new-version\":\"Create New Version\",\"create-task\":\"Create Task\",\"create-tasks\":\"Create Tasks\",\"create-transcription-tasks\":\"Create Transcription Tasks\",\"create-tree\":\"Create Tree\",\"create-weather-alerts\":\"Create Weather Alerts\",\"create-weather-forecast\":\"Create Weather Forecast\",\"created\":\"Created\",\"created-a-new-version-of\":\"You've created a new version of\",\"created-new-version-of\":\"Created new version of\",\"created-with\":\"Created with\",\"csv-format\":\"Format\",\"currency-to-use\":\"Currency to Use\",\"current-time-after\":\"After\",\"current-time-and\":\"and\",\"current-time-before\":\"Before\",\"current-time-between\":\"Between\",\"current-time-day\":\"day\",\"current-time-day-of-month\":\"Day of month\",\"current-time-day-of-week\":\"Day of week\",\"current-time-exclusive\":\"Exclusive\",\"current-time-go-to-true-when\":\"Go to 'True' when:\",\"current-time-inclusive\":\"Inclusive\",\"current-time-is\":\"is\",\"current-time-month\":\"Month\",\"current-time-select-comparison\":\"Select comparison\",\"current-time-select-day-of-week\":\"Select day of week\",\"current-time-select-month\":\"Select month\",\"current-time-time-of-day\":\"Time of day\",\"current-time-time-to-compare\":\"Select type of time to compare\",\"current-time-timezone\":\"Timezone\",\"currently-set-as-exit-block\":\"Currently set as exit block\",\"currently-set-as-starting-block\":\"Currently set as starting block\",\"custom-data-category-name\":\"Custom data category name\",\"custom-data-value\":\"Custom data value\",\"custom-ordering\":\"Use custom block ordering\",\"custom-settings\":\"Custom Settings\",\"daily\":\"Daily\",\"data\":\"Data\",\"data-residency-mode-is-enabled-for-this-account-responses-to-this-block-will-be-retained-on-the-in-country-server-only-and-de-identified-before-being-transmitted-outside-the-country\":\"Data Residency Mode is enabled for this account. Responses to this block will be retained on the in-country server only, and de-identified before being transmitted outside the country.\",\"data-type-boolean\":\"Boolean\",\"data-type-date\":\"Date\",\"data-type-location\":\"Location\",\"data-type-map_coordinates\":\"Map Coordinates\",\"data-type-multiple_choice\":\"Multiple Choice\",\"data-type-number\":\"Number\",\"data-type-phone\":\"Phone\",\"data-type-text\":\"Text\",\"data-validation-invalid-choice\":\"Value ':dataChoice' from ':dataValue' is not valid\",\"data-validation-invalid-value\":\"Value ':dataValue' is not valid\",\"data-validation-max_length\":\"Value ':dataValue' exceeds the max length :maxOpenLength\",\"data-validation-max_numeric_digits\":\"Value ':dataValue' exceeds the max numeric digit :maxNumericDigits\",\"date-created\":\"Date Created\",\"date-range\":\"Date Range\",\"date-range-locked\":\"Date Range Locked\",\"date-updated\":\"Date Updated\",\"day\":\"day\",\"day-of-week\":\"Day of Week\",\"days\":\"day|days\",\"days-after\":\"Days After\",\"days-after-adding\":\"Days after adding\",\"days-before\":\"Days Before\",\"december-month\":\"December\",\"decision-branch\":\"Decision Branch\",\"default-repeat-key\":\"Default Repeat Key\",\"default-sender-for-x-otherwise-systems\":\"The default Sender ID for :orgName will be used when defined, otherwise the system's default Sender ID will be used.\",\"delay-to-enter-repeat-key\":\"Delay To Enter Repeat Key\",\"delete\":\"Delete\",\"delete-issue-tracker\":\"Delete Issue Tracker?\",\"delete-task\":\"Delete Task\",\"delete-this-shareable-link\":\"Delete this shareable link\",\"delete-tracker\":\"Delete Tracker\",\"delete-transcription-task-question\":\"Delete Transcription Task?\",\"delete-tree\":\"Delete Tree\",\"delete-tree-question\":\"Delete Tree?\",\"delete-tree-version\":\"Delete Tree Version?\",\"delete-version\":\"Delete Version\",\"deleted-subscriber\":\"Deleted contact\",\"deleted-title-version\":\"Deleted\",\"description\":\"Description\",\"destination-flow\":\"Destination flow\",\"destination-tree\":\"Destination Tree\",\"destination-tree-not-found\":\"Destination Tree Not Found\",\"destination-url\":\"Destination URL\",\"directory-selection-block-invalid-details\":\"One or more of Directory Selection bocks have invalid details. To allow you import results: \\n1- make sure every Directory Selection blocks have uploaded choices (csv),\\n2- make sure the tree has no more issues. \\n3- resave the tree\",\"directory-selection-description\":\"The Directory Selection block allows contacts to select items in a directory of choices. The block can optionally send the contact back information related to their selection. The contact's selection can be used later in a Decision Branch block. \",\"directory-selection-filter-description\":\"Directory Selection Block fields can be used as filters on the shared link. Select which fields should be used as filters.\",\"directory-selection-filters\":\"Directory Selection Filters\",\"disable\":\"Disable\",\"disable-voice-sms\":\"Disable Voice & SMS\",\"disabled\":\"Disabled\",\"disaggregate-data-by-the-audio-listened-percentage\":\"Disaggregate Data By The Audio Listened Percentage\",\"disaggregate-data-by-the-communication-channels\":\"Disaggregate Data By The Communication Channels\",\"disaggregate-data-by-the-question-choices\":\"Disaggregate Data By The Question Choices\",\"display-headings-without-spaces\":\"Display headings without spaces\",\"display-latest-interaction-only\":\"Display the latest interaction only\",\"display-regular-table-headings\":\"Display regular table headings\",\"do-not-merge-any-calls\":\"Do not merge any calls\",\"do-not-prompt\":\"Do not prompt\",\"do-you-want-to-proceed\":\"Do you want to proceed?\",\"dont-receive\":\"Don't Receive\",\"download\":\"Download\",\"download-X-format\":\":kind format\",\"download-admin-file\":\"Download master CSV file\",\"download-audio-file\":\"Download audio file\",\"download-csv\":\"Download CSV\",\"download-csv-file-to-your-computer\":\"Download CSV file to your computer\",\"download-response-audio\":\"Download Response Audio\",\"download-template\":\"Download template\",\"download-template-admin-file\":\"Download template\",\"download-the-audio-files-from-open-ended-responses\":\"Download the audio files from open-ended responses\",\"download-x-template-file\":\"Download :Language template\",\"draft\":\"Draft\",\"drag-and-drop-instruction\":\"Drag and drop CSV file or\",\"dry\":\"Dry\",\"duplicate\":\"Duplicate\",\"duplicate-as-new-tree\":\"Duplicate as New Tree\",\"duplicate-entire-flow\":\"Duplicate entire flow\",\"duplicate-tree\":\"Duplicate Tree\",\"duplicate-tree-has-been-created\":\"Duplicate tree has been created.\",\"duplicates-warning\":\"Based on limit and characters, recommended minimum length is\",\"duration\":\"Duration\",\"earth-networks\":\"Earth Networks\",\"edit\":\"Edit\",\"edit-alert-message\":\"Edit Alert Message\",\"edit-block-type\":\"Edit :block_type block\",\"edit-case-block\":\"Edit Case Block\",\"edit-collaborative-filtering-question\":\"Edit Collaborative Filtering Question\",\"edit-collaborative-filtering-rating\":\"Edit Collaborative Filtering Rating\",\"edit-content\":\"Edit Content\",\"edit-expression\":\"Edit expression\",\"edit-flow\":\"Edit Flow\",\"edit-generate-code-block\":\"Edit generate code\",\"edit-group-membership\":\"Edit Group Membership\",\"edit-location\":\"Edit Location\",\"edit-log-block\":\"Edit Log Block\",\"edit-message\":\"Edit message\",\"edit-multiple-choice-question\":\"Edit Multiple-Choice Question\",\"edit-multiple-select-multiple-choice-question\":\"Edit Multiple Select Multiple-Choice Question\",\"edit-new-version\":\"Edit new version\",\"edit-numeric-question\":\"Edit numeric question\",\"edit-open-ended-question\":\"Edit Open-Ended Question\",\"edit-operator-contact-lists\":\"Edit Operator Contact Lists\",\"edit-outgoing-call\":\"Edit Outgoing Call\",\"edit-output-block\":\"Edit Output Block\",\"edit-random-order-multiple-choice-question\":\"Edit Random Order Multiple-Choice Question\",\"edit-run-flow-block\":\"Edit Run Flow Block\",\"edit-settings\":\"Edit Settings\",\"edit-subscriber-property\":\"Edit Contact Property\",\"edit-this-block\":\"Edit this block\",\"edit-tree-before-sending\":\"Edit tree before sending\",\"edit-validate-block\":\"Edit Validate Code Block\",\"edit-voice-content\":\"Edit Voice Content\",\"empty\":\"Empty\",\"empty-audio-library\":\"Empty audio library!\",\"empty-responses\":\"empty responses\",\"enable\":\"Enable\",\"enable-disable-subscriber\":\"Enable/disable contact\",\"enable-display-of-block-type\":\"Enable display of block type (e.g. Multiple Choice Question)\",\"enable-display-of-key-metrics\":\"Enable display of key metrics\",\"enable-sms\":\"Enable SMS\",\"enable-voice\":\"Enable Voice\",\"enable-voice-sms\":\"Enable Voice & SMS\",\"enabled\":\"Enabled\",\"enabled-languages\":\"Enabled Languages\",\"enabled-result-tabs\":\"Enabled result tabs\",\"end-at\":\"End At\",\"end-date\":\"End Date\",\"end-recording-by-pressing\":\"End Recording by Pressing\",\"end-the-call-session\":\"End the call/session\",\"ends\":\"Ends\",\"enter-a-value\":\"Enter a value\",\"enter-accepted-responses\":\"Replace this with a list of responses that we will use to match the respondant's answer to this choice. Enter each option on a new line. (You may leave this field blank if the tree will be used for voice content only)\",\"enter-at-least-three-chars\":\"Enter at least three characers...\",\"enter-at-least-three-chars-to-search\":\"Enter at least three characters to begin searching...\",\"enter-audio-content\":\"Enter Audio content\",\"enter-block-label\":\"Enter a block label\",\"enter-block-name\":\"Enter a block name\",\"enter-block-semantic-label\":\"Enter a block semantic label\",\"enter-clipboard-content\":\"Enter clipboard content...\",\"enter-confirmation-audio\":\"If using voice content, replace this with the filename of an audio file that you have uploaded to your audio library. This audio will be played back to the respondant after they have selected the choice. (You may leave this blank if the tree does not have voice content or if you wish to not play anything back to the contact)\",\"enter-date\":\"Enter date\",\"enter-duration\":\"Enter duration\",\"enter-each-on-new-line\":\"Enter each on a new line\",\"enter-exit-label\":\"Enter Exit Label\",\"enter-exit-test-expression\":\"Enter Exit Test Expression\",\"enter-image-content\":\"Enter Image content\",\"enter-ivr-number\":\"If using voice content, replace this with the numeric code that the respondant should enter to select this choice. (You may leave this blank if the tree does not have voice content)\",\"enter-num-ratings\":\"Enter the number of ratings\",\"enter-number\":\"Enter Number\",\"enter-number-of-days\":\"Enter number of days\",\"enter-operator-queue-name\":\"Enter Operator Queue Name here\",\"enter-primary-and-synonyms\":\"Enter the primary option and synonyms for each choice. Enter each synonym on a new line.\",\"enter-primary-attribute\":\"Your first choice goes on this row. Replace this with the primary information for this choice here. (See example of a completed choice below) \",\"enter-primary-attribute-title\":\"Replace this with the description of the primary information for the choices (e.g. 'Clinic Name')\",\"enter-program-id\":\"Enter the program identifier\",\"enter-property-name\":\"Enter property name\",\"enter-secondary-attribute\":\"Replace this with the secondary information for this choice\",\"enter-secondary-attribute-title\":\"Replace this with the description of the secondary information for the choices (e.g. 'Country')\",\"enter-secondary-attribute-title-2\":\"Replace this with the description of the secondary information for the choices (e.g. 'Operating hours'). You may add up to 10 peices of secondary information by adding columns to the right.\",\"enter-sms-content\":\"Enter SMS content…\",\"enter-sms-text-here\":\"Enter SMS text here\",\"enter-social-content\":\"Enter social content\",\"enter-social-messaging-text-here\":\"Enter social messaging content here\",\"enter-text-content\":\"Enter Text content\",\"enter-ussd-content\":\"Enter USSD content…\",\"enter-ussd-text-here\":\"Enter USSD text here\",\"enter-value\":\"Enter value\",\"enter-video-content\":\"Enter Video content\",\"entered\":\"Entered\",\"entity\":\"Entity\",\"entity-selection-block-instructions\":\"Contacts will exit through the 'Success' output when they select an Entity. If they are not allowed to refer to any Entities, or if they fail to select an Entity they are taken through the 'Failure' exit.\",\"equal-to\":\"Equal to\",\"error\":\"Error\",\"error-creating-transcription-task\":\"Error creating transcription task.\",\"error-found\":\"error found\",\"error-importing-json\":\"Error Importing JSON!\",\"error-report\":\"Error Report\",\"error-updating-transcription-task\":\"Error updating transcription task.\",\"error-uploading-file-try-again\":\"There was an error uploading the file, please try uploading again.\",\"error-while-attempting-to-publish-specified-tree\":\"Error while attempting to publish specified tree.\",\"error-while-downloading-template\":\"An error has occured while downloading the template file.\",\"error-while-saving-transcriptions\":\"Error while saving transcriptions.\",\"error-while-saving-tree\":\"Error while saving tree...\",\"establish-connection\":\"Establish Connection\",\"example-tree\":\"Example Tree\",\"examples\":\"Examples\",\"exceeds\":\"exceeds\",\"excel-supported-format\":\"Excel-supported CSV\",\"exit\":\"Exit\",\"exit-block-tree-begins-here\":\"Tree execution will continue here when the session is unexpectely terminated.\",\"exit-default\":\"Default\",\"exit-otherwise-through-default\":\"Otherwise, exit through Default\",\"exit-through\":\"Exit Through\",\"exit-to-another-output\":\"Exit to another output\",\"exit-when\":\"When\",\"expires-after\":\"Expires after\",\"expires-on\":\"Expires on\",\"export-date-time-format\":\"Export Date/Time Format\",\"export-results-to-csv\":\"Export Results to CSV\",\"export-transcriptions\":\"Export Transcriptions\",\"export-tree-json\":\"Export Tree JSON\",\"export-using-current-time-zone\":\"Export using current time zone\",\"export-using-utc\":\"Export using UTC\",\"export-using-utc-with-subscriber-phone-number\":\"Export using UTC with Contact Phone Number\",\"expression-branch-description\":\"This block will check the expression (“When”) for each exit in order to determine which exit to use.\",\"failed\":\"Failed\",\"failed-finding-matches\":\"Failed finding matches!\",\"failure\":\"Failure\",\"false\":\"False\",\"february-month\":\"February\",\"feedback-message\":\"Feedback Message\",\"field\":\"Field\",\"field-deleted-since-configuring-this-block\":\"The Contact Property has been deleted since configuring this Block. Please remove this configuration.\",\"file-details\":\"File Details\",\"filesize\":\"Filesize\",\"fill-out-template-instruction\":\"Fill out the template with your tree results\",\"fill-out-template-instruction-1\":\"Populate rows with data to correspond with the column headers of the template. Each row is a single tree result\",\"fill-out-template-instruction-2\":\"You cannot add new columns to your file to create new blocks. Edit the tree to make these changes\",\"fill-out-template-instruction-3\":\"The format for Call Date should be YYYY-MM-DD\",\"fill-out-template-instruction-4\":\"The format for Call Start Time should be HH:MM:SS\",\"fill-out-template-instruction-5\":\"For the 'Multiple Select Multiple Choice Question Block' you should separate options chosen with ';'\",\"filter-block-content\":\"Filter block content…\",\"filter-by-block\":\"Filter by Blocks\",\"filter-by-date\":\"Filter by date\",\"filter-by-directory-selection\":\"Filter by Directory Selection Blocks\",\"filter-by-tag\":\"Filter by Tags\",\"filter-enabled\":\"Filter Enabled\",\"filter-instructions\":\"Select which peices of information should be used as filters when viewing results.\",\"filter-validation\":\"Filter Validation\",\"filters\":\"Filters\",\"filters-saved\":\"Filters configurations saved\",\"find-matches\":\"Find Matches\",\"first-time-subscribers\":\"First-time Contacts\",\"fix-validation-errors-before-publishing\":\"Fix validation errors before publishing\",\"fixed-date\":\"Fixed date\",\"flag-this-recording-as-either\":\"Flag this recording as either inaudible or empty\",\"flagged-as-flagtype\":\"Flagged as :flag_type - click the button above to undo.\",\"flagged-as-inaudible-or-empty\":\"Flagged as inaudible or empty - use the buttons above to undo\",\"floip-cleared\":\"Configuration cleared.\",\"floip-expressions-escape-with-double-at-symbol\":\"If you intend to insert a literal <code>@</code> symbol, using <code>@@</code> will result in a single character in output.\",\"floip-instructions-1\":\"Viamo is a member of the Flow Interoperability Initiative, enabling seamless data exchange across participating ICT4D software systems.\",\"floip-instructions-2\":\"To enable secure streaming of results for this tree to a Flow Results data aggregator, enter the base URL and authentication token of the aggregator.\",\"floip-sync-success\":\"Your Viamo tree is enabled to stream responses to the Flow Results aggregator.\",\"floip-sync-warning\":\"Your Viamo tree is not enabled to stream responses to the Flow Results aggregator. Establish a connection to the aggregator to enable streaming.\",\"flow-view\":\"Flow view\",\"for-a-given-subscriber-custom-data-category\":\"For a given contact, if the following property or custom data category has the value below, go to 'True'. Otherwise, go to 'False'.\",\"for-a-given-subscriber-go-to-true-false\":\"For a given contact, if the following property or custom data category has the value below, go to True. Otherwise, go to False.\",\"for-assistance\":\"for assistance\",\"for-example-to-assign-the-first-hundred-audio-responses-to-a-transcriber\":\"For example, to assign the first hundred audio responses to a transcriber, set the 'Start At' value to 1 and the 'End At' value to 100. For the next transcriber, you could then start at 101 and end at 200, and so on.\",\"for-the-best-user-experience\":\"For the best user experience, please provide an audio prompt that says,\",\"for-this-block\":\"for this block.\",\"fri\":\"Fri\",\"friday-day\":\"Friday\",\"from-block-input\":\"From block input\",\"from-import\":\"from Import\",\"generate-code-title\":\"Generate code title\",\"generate-csv-file\":\"Generate CSV file\",\"generate-shareable-link\":\"Generate shareable link\",\"generating-data-from-past-calls\":\"Generating data from past calls\",\"get-shareable-link\":\"Get Shareable Link\",\"go-to-lang-selector-interface\":\"Go to Language Selectors interface\",\"go-to-true-or-false\":\"... go to True. Otherwise, go to False.\",\"go-to-true-otherwise-go-to-false\":\"...go to 'True'. Otherwise, go to 'False'.\",\"go-to-true-output-if-contact-language-is\":\"Go to the 'True' output if the Contact's langauge is\",\"greater-than\":\"Greater than\",\"group\":\"group\",\"group-is-larger-than\":\"group is larger than\",\"group-label\":\"Group:\",\"group-not-set\":\"Group not set\",\"groups\":\"Groups\",\"has-already-been-published\":\"has already been published\",\"has-been-successfully-published\":\"has been successfully published\",\"has-value\":\"has value\",\"header-validation\":\"Value ':dataValue' is not a valid :dataHeader\",\"header-validation-missing\":\"The ':columnName' column is missing\",\"heading-exit\":\"Exit\",\"headings\":\"Headings\",\"headings-format\":\"Headings Format\",\"heres-what-we-know\":\"Here's what we know:\",\"hide-instruction\":\"Hide Instructions\",\"hide-phone-numbers\":\"Hide phone numbers\",\"hide-question-titles\":\"Hide Question Titles\",\"hide-subscriber-id\":\"Hide Contact ID\",\"high-winds\":\"High Winds\",\"histogram-of-percentage-listened\":\"Histogram of % listened\",\"home\":\"Home\",\"how-to-import-tree-results\":\"How to Import Tree Results\",\"human-readable\":\"Human-readable\",\"hung-up\":\"Hung up\",\"i-have-translated-my-choices\":\"I have translated my choices\",\"if\":\"If\",\"if-a-respondent-has-already-started-this-tree-but-not-finished\":\"If a respondent has already started this tree but not finished, resume where they left off.\",\"if-all-following-true\":\"If all of the following are true\",\"if-all-of-the-following-are-true\":\"If all of the following are true\",\"if-any-following-true\":\"If any of the following are true\",\"if-any-of-the-following-are-true\":\"If any of the following are true\",\"if-at-least\":\"If at least\",\"if-at-least-this-many-following-true\":\"If at least this many of the following are true\",\"if-at-least-this-many-of-the-following-are-true\":\"If at least this many of the following are true...\",\"if-b-all-b-of-the-following-are-true-go-to-true\":\"If <b>all</b> of the following are true, go to True.\",\"if-cfq-block-has-x-ratings\":\"If statements from ':blockTitle' have :targetRatio ratings...\",\"if-in\":\"If in\",\"if-not-in\":\"If not in\",\"if-subscriber-custom-data\":\"If Contact Custom Data,\",\"if-subscriber-language-is\":\"If Contact Language is\",\"if-subscriber-language-is-unknown\":\"If Contact Language is '[Unknown]'\",\"if-subscriber-start-date-is\":\"If Contact Start Date is\",\"if-symbols-are-used-then-reflect-in-filename\":\"If symbols are used then this must be reflected in the file name.\",\"if-the-number-of-subscribers-in-the\":\"If the number of contacts in the\",\"if-the-subscriber-is\":\"If the contact is\",\"if-the-value-is\":\"If the value is\",\"if-youd-like-to-repeat-msg-press-2\":\"If you'd like to repeat this message, please press 2 now.\",\"import-done\":\"Import done\",\"import-export\":\"Import / Export\",\"import-failed\":\"Import failed for\",\"import-file\":\"Import the file\",\"import-file-instruction\":\"Drag the file or click on the Upload CSV file button and select the saved template\",\"import-in-progress\":\"Import in progress\",\"import-new-results\":\"Import New Results\",\"import-results\":\"Import Tree Results\",\"import-status\":\"Import Status\",\"import-tree\":\"Import Tree\",\"import-tree-json\":\"Import Tree JSON (*.json File)\",\"importing\":\"Importing\",\"importing-file\":\"Importing file\",\"in-progress\":\"In Progress\",\"in-the-following-group\":\"In the following group\",\"inactive-do-not-receive-outgoing-calls\":\"Inactive(Do not receive Outgoing Calls)\",\"inaudible\":\"Inaudible\",\"include-calls-from\":\"Include calls from\",\"include-in-summary\":\"Include in summary\",\"infinite-loops-detected-please-edit-before-sending\":\"Infinite loops detected. Please edit before sending\",\"infinite-loops-exist\":\"Infinite loops exist\",\"input\":\"Input\",\"input-help\":\"This block checks that a Code is valid by using the response from a previous question. Select which question should be used.  \",\"input-required\":\"Input Required\",\"instructional-text-optional\":\"Instructional text (optional)\",\"interactions\":\"Interactions\",\"internal-notes\":\"Internal Notes\",\"internal-notes-optional\":\"Internal notes (optional)\",\"invalid\":\"Invalid\",\"invalid-content-type\":\"Invalid Content Type : File is not recognized as .csv\",\"invalid-csv\":\"Invalid CSV: The file could not be processed as a valid .csv file\",\"invalid-entry\":\"Invalid entry.\",\"invalid-pattern\":\"Invalid pattern!\",\"invalid_startingblock_key\":\"Please set a starting block for your tree\",\"is\":\"is\",\"is-complete\":\"is complete\",\"is-private-not-reversible\":\"This setting cannot be changed after a Tree is published with this option enabled\",\"issue-trackers\":\"Issue Trackers\",\"ivr-content\":\"IVR Content\",\"january-month\":\"January\",\"july-month\":\"July\",\"june-month\":\"June\",\"key-metrics\":\"Key Metrics\",\"key-press\":\"Key Press\",\"label\":\"Label\",\"label-is-already-in-use\":\"Label is already in use\",\"language\":\"Language\",\"language-options\":\"Language Options\",\"language-selection-prompt\":\"Language Selection Prompt\",\"language-selector\":\"Language Selector\",\"language-selector-for-this-call\":\"Language Selector for this call\",\"language-selector-not-found\":\"Language Selector Not Found\",\"language-x-csv-file\":\":Language CSV File\",\"languages\":\"Languages\",\"languages-have-not-been-enabled\":\"Languages have not been enabled\",\"last-edited\":\"Last edited\",\"last-edited-on-this-date\":\"Last edited on this date\",\"last-saved-at\":\"Last saved at\",\"lat\":\"Lat:\",\"latest-message-for-user-groups\":\"Latest Message for all Contact Groups\",\"latin-languages\":\"Latin Languages\",\"learn-more-about-viamo-by-visiting\":\"Learn more about Viamo by visiting :viamo_link, or :sign_in_link\",\"less-than\":\"Less than\",\"let-users-repeat\":\"Let users repeat this message\",\"letters-only\":\"Letters Only\",\"library\":\"Library\",\"load-more-subscribers\":\"Load More Contacts\",\"loading\":\"Loading...\",\"loading-average-call-durations\":\"Loading Average Call Durations...\",\"local-currency\":\"Local Currency\",\"local-time-is-utc\":\"Local time is UTC\",\"location\":\"Location\",\"location-selector\":\"Location Selector\",\"lock\":\"Lock\",\"lock-the-date-range-to-the-dates-above\":\"Lock the date range to the dates above\",\"locked\":\"Locked\",\"logic\":\"Logic\",\"lon\":\"Lon:\",\"machine-readable\":\"Machine-readable\",\"machine-readable-format\":\"Machine-Readable Format\",\"make-new-subscriber\":\"Make a new contact with same phone number\",\"manage-queues\":\"Manage Queues...\",\"manage-responses\":\"Manage Responses\",\"manage-statements\":\"Manage Statements\",\"manage-transcriptions\":\"Manage Transcriptions\",\"march-month\":\"March\",\"mark-call-as-complete\":\"Mark Call As Complete\",\"max-amount\":\"Maximum Amount\",\"max-code-issue\":\"Limit number of codes\",\"max-days\":\"Max Days\",\"max-duration-in-seconds\":\"Maximum Duration (seconds)\",\"max-response-characters\":\"Maximum Response Characters\",\"max-length\":\"Maximum Length\",\"max-number-of-repeats\":\"Max Number of Repeats\",\"maximum-number-of-response-digits\":\"Maximum Number of Response Digits\",\"maximum-record-duration\":\"Maximum Record Duration\",\"maximum-value\":\"Maximum Value\",\"maximum-value-(inclusive)\":\"Maximum value (inclusive)\",\"may-month\":\"May\",\"mcq-response-format\":\"MCQ Response Format\",\"merge-all-calls-from-same-subscriber\":\"Merge all calls from same contact\",\"merge-incomplete-calls-from-the-same-subscriber\":\"Merge incomplete calls from the same contact\",\"merge-only-resumed-calls\":\"Merge only resumed calls\",\"merge-options\":\"Merge Options\",\"message\":\"Message\",\"message-block-values\":\"Message Block Values\",\"message-blocks-only\":\"Message Blocks only\",\"message-details\":\"Message details\",\"message-title\":\"Message title\",\"method\":\"Method\",\"min-amount\":\"Minimum Amount\",\"min-length\":\"Minimum Length\",\"minimum-value\":\"Minimum Value\",\"minimum-value-(inclusive)\":\"Minimum value (inclusive)\",\"minutes\":\"minutes\",\"modified\":\"(Modified)\",\"modify-subscriber\":\"Modify contact\",\"modify-subscriber-active-status-to\":\"Modify Contact active status to\",\"modify-subscriber-preferred-content-type-for\":\"Modify Contact preferred content type for\",\"modify-subscriber-start-date-to\":\"Modify Contact start date to\",\"modify-subscribers-start-date-to-absolute-date-here\":\"Modify Contacts start date to Absolute date here\",\"mon\":\"Mon\",\"monday-day\":\"Monday\",\"month\":\"month\",\"monthly\":\"Monthly\",\"months-after\":\"Months After\",\"months-before\":\"Months Before\",\"more\":\"More\",\"more-options\":\"More Options\",\"more-than\":\"More than\",\"most-active-blocks\":\"Most Active Blocks\",\"most-recent-published-version\":\"Most recent published version\",\"most-recent-version\":\"Most recent version\",\"most-recent-version-of\":\"Most recent version of\",\"mostly\":\"Mostly\",\"msmcq-description-p1\":\"For Text-based channels like SMS, USSD and Social Messaging: set a single letter (A-Z) as synonym for each choice using the choice options menu.\",\"msmcq-description-p2\":\"Contacts can for example reply: 'abc' to select 3 choices configured with synonym 'a', 'b' and 'c'. Synonym must be set and must be unique per choice. The same synonym can be used for same choice across the different languages enabled.\",\"msmcq-description-p3\":\"For Voice, set the voice key press for each choice in the choice options menu. Contacts can for example press '123' to select 3 choices.\",\"multiple-choice-question\":\"Multiple Choice Question\",\"multiple-select-multiple-choice-question\":\"Multiple Select Multiple Choice Question\",\"name\":\"Name\",\"never\":\"Never\",\"new-contact-created\":\"New contact created\",\"new-edits-click-save\":\"New edits – click 'Save' again before continuing.\",\"new-exclamation\":\"New!\",\"new-issue-tracker\":\"New Issue Tracker\",\"new-property\":\"New property\",\"new-subscriber-value\":\"New contact value\",\"new-transcription-task\":\"New Transcription Task\",\"new-transcription-task-created\":\"New transcription task created!\",\"new-transcription-tasks-generated\":\"New transcription tasks generated!\",\"new-tree\":\"New Tree\",\"new-tree-created\":\"New tree created!\",\"new-version\":\"New version\",\"new-version-created\":\"New version created!\",\"newest\":\"Newest\",\"newest-to-oldest\":\"Newest to Oldest\",\"next\":\"Next\",\"no\":\"No\",\"no-action-selected\":\"(No action selected)\",\"no-admin-file-yet-filters\":\"Upload the master CSV file to set filters\",\"no-admin-file-yet-selection-confirmation\":\"Upload the master CSV file to set selection confirmation\",\"no-audio-files-found-for-X\":\"No audio files found for\",\"no-audio-files-found-in-organisation\":\"No Audio files found in Organisation\",\"no-audio-yet\":\"No audio yet\",\"no-blocks-for-content\":\"There are no blocks to populate content onto.\",\"no-blocks-found-for-tree-with-identifier\":\"No blocks found for Tree with identifier\",\"no-change\":\"No change\",\"no-choice-selected\":\"No choice selected\",\"no-choices-added\":\"No choices added.\",\"no-choices-yet-please-specify\":\"No choices yet -- please specify your choices first in the sidebar\",\"no-choices-yet-please-specify-your-choices-first-in-the-sidebar\":\"No choices yet. Please specify your\",\"no-clipboard-content-yet\":\"No Clipboard content yet\",\"no-content-blocks\":\"No content blocks!\",\"no-content-blocks-to-populate-content-onto\":\"There are no content blocks to populate content onto.\",\"no-content-types-enabled\":\"No content types enabled.\",\"no-credit\":\"No Credit\",\"no-csv-exports-for-these-results-have-been-created-yet\":\"No CSV exports for these results have been created\",\"no-data\":\"No data\",\"no-directory-selection-blocks\":\"This tree has no Directory Selection blocks\",\"no-groups-created-yet\":\"No groups created yet or your groups have no contacts.\",\"no-labels-or-tags\":\"No labels or tags\",\"no-languages-enabled\":\"No languages are enabled yet for this tree.\",\"no-languages-enabled-on-the-tree\":\"No Languages enabled on the Tree\",\"no-matches-found\":\"No matches found!\",\"no-messages-created-yet\":\"No messages created yet.\",\"no-number-of-audio-files-per-task-supplied\":\"No number of audio files per task supplied.\",\"no-operator-contact-lists-made-yet\":\"No operator contact lists have been made yet.\",\"no-preferred-channel-selected\":\"You didn't select a preferred channel. Please select one\",\"no-preferred-language\":\"No preferred language\",\"no-question-selected\":\"No question selected\",\"no-question-text-provided\":\"No Question Text Provided\",\"no-result-for-the-selected-filters\":\"No results for the selected filters.\",\"no-results-for-this-block-yet\":\"No results for this block yet.\",\"no-results-not-sent-yet\":\"(No results - not sent yet)\",\"no-results-yet\":\"Sorry, there are no results yet.\",\"no-shareable-links-have-been-created-yet\":\"No shareable links have been created yet.\",\"no-sms-content-yet\":\"No SMS content yet\",\"no-social-content-yet\":\"No social content yet\",\"no-subscriber-field-type-map-coordinates\":\"You do not have a contact field of type 'Map Coordinates'. This contact field is required to store the location of the contact.\",\"no-surveys-created\":\"No surveys created yet.\",\"no-tag-found\":\"No tag found\",\"no-tagged-blocks\":\"This tree has no tagged blocks\",\"no-tree-found-with-identifier\":\"No Tree found with identifier\",\"no-trees-created-yet\":\"No trees created yet.\",\"no-trees-have-been-created-yet\":\"No trees have been created yet\",\"no-ussd-content-yet\":\"No USSD content yet\",\"no-validation\":\"No Validation\",\"no-value\":\"No value\",\"none-selected\":\"(None selected)\",\"normalize\":\"Normalize\",\"normalize-chart-results\":\"Normalize chart results\",\"not\":\"not\",\"not-available\":\"Not Available\",\"not-created-any-language-selectors-yet\":\"You have not created any language selectors yet.\",\"not-equal-to\":\"Not equal to\",\"not-found\":\"Not Found\",\"not-in-the-following-group\":\"Not in the following group\",\"not-launched-yet\":\"Not launched yet\",\"not-set\":\"not-set\",\"november-month\":\"November\",\"now\":\"Now\",\"num-ratings-per-statement\":\"Number Of Ratings Per Statement\",\"num-ratings-that-each-statement-should-receive\":\"The number of ratings that each statement should receive.\",\"number\":\"Number\",\"number-of-calls-in-date-range\":\"Number of calls in date range\",\"number-of-calls-in-the-last\":\"Number of calls in the last\",\"number-of-choices\":\"Number of choices\",\"number-of-exits\":\"Number of Exits\",\"number-of-outputs\":\"Number of outputs:\",\"number-of-people-who-ended-at-this-block\":\"Number of people who ended at this block\",\"numbers-alphabet\":\"Alphanumeric\",\"numbers-only\":\"Numbers Only\",\"numeric-average\":\"Numeric Average\",\"numeric-block-title\":\"Numeric Block Title\",\"numeric-branch\":\"Numeric Branch\",\"numeric-quesion-block\":\"Numeric Quesion Block\",\"numeric-question\":\"Numeric Question\",\"occurrences\":\"occurrences\",\"october-month\":\"October\",\"of\":\"of\",\"of-following-true\":\"...of the following are true\",\"of-the-following-are-true\":\"of the following are true\",\"of-the-following-are-true-go-to-true\":\"of the following are true, go to True.\",\"offline\":\"Offline\",\"offline-content\":\"Offline Content\",\"oldest-to-newest\":\"Oldest to Newest\",\"on\":\"On\",\"on-line\":\"on line\",\"one-output-for-all-choices\":\"One output for all choices\",\"only-accepts-word-characters\":\"Only accepts word characters\",\"only-display-latest-interaction-if-multiple-interactions-exist-for-the-same-session-and-block\":\"Only display the latest interaction if multiple interactions exist in the same session for the same block. Leave unchecked if all results should be displayed.\",\"only-question-blocks\":\"Only question blocks\",\"open-block-with-voice-set-sub-prop-warning\":\"Open-ended Voice responses are unable to set contact properties at this time.\",\"open-ended-audio-export-ready\":\"Open-ended audio export ready\",\"open-ended-question\":\"Open-ended Question\",\"open-ended-responses\":\"Open-ended responses\",\"open-external-link\":\"Open External Link\",\"open-in-new-window\":\"Open in new window\",\"open-link\":\"Open Link\",\"open-link-in-new-window\":\"Open link in new window\",\"operator-contact-list\":\"Operator contact list\",\"operator-queue-name\":\"Operator Queue Name\",\"operators\":\"operators\",\"optional-description\":\"Optional description\",\"optionally-you-can-create-loop-back\":\"Optionally, you can create connections to 'loop back' to this random branch block, if you want contacts to reach all of the blocks connected below in random order. After every option has been reached, the block can either continue at random, or, it can 'exit' to a distinct output.\",\"options\":\"Options\",\"or\":\"or\",\"order\":\"Order\",\"order-by\":\"Order By:\",\"order-of-components-dont-matter-but-must-be-adjacent-one-another\":\"The order of these components do not matter but they must be adjacent to one another.\",\"order-of-results\":\"Order of Results\",\"organization-not-found-with-api-key\":\"Could not find organization with that API key.\",\"original-file\":\"Original file\",\"original-quality\":\"Original quality\",\"originally\":\"Originally\",\"outgoing-calls\":\"Outgoing Calls\",\"output\":\"Output\",\"output-branching\":\"Output Branching\",\"output-clipboard\":\"Clipboard\",\"output-connected\":\"Connected\",\"output-error\":\"Error\",\"output-exit\":\"Exit\",\"output-expression\":\"Output expression\",\"output-failed\":\"Failed\",\"output-false\":\"False\",\"output-not-met\":\"Not Met\",\"output-quota-met\":\"Quota met\",\"output-sms\":\"SMS\",\"output-true\":\"True\",\"output-ussd\":\"USSD\",\"output-voice\":\"Voice\",\"outputs\":\"Outputs\",\"partly\":\"Partly\",\"password\":\"Password\",\"pattern-not-provided-for-tree\":\"Pattern not provided for tree\",\"pause\":\"Pause\",\"percent-of-audio-listened\":\"Percent of Audio Listened\",\"percent-of-the-content-provided\":\":count % of the content provided.\",\"phone\":\"Phone\",\"phone-number\":\"Phone Number\",\"phone-quality\":\"Phone quality\",\"phone-recording\":\"Phone recording\",\"pick-a-date-range-to-display-block-interaction-totals\":\"Pick a date range to display block interaction totals\",\"plain-input\":\"Plain input\",\"play\":\"Play\",\"play-audio\":\"Play audio\",\"please-fix-the-validation-errors-in-this-tree-before-publishing\":\"Please fix the validation errors in this tree before\",\"please-provide-numeric-codes\":\"Please provide numeric codes.\",\"please-provide-valid-start-and-end-numbers\":\"Please provide valid start and end numbers.\",\"please-resolve-the-set-of-infinite-loops-before-sending-this-tree\":\"Please resolve the set of infinite loops\",\"please-select-a-numeric-question-block\":\"Please select a numeric question block.\",\"please-select-channel\":\"Please make sure you select a preferred channel\",\"please-translate-choices\":\"Please translate your choices.\",\"please-try-again-or-contact\":\"Please try again or contact\",\"precipitation-level\":\"Precipitation Level\",\"press\":\"Press\",\"preview-file\":\"Preview file\",\"previous\":\"Previous\",\"previous-exports\":\"Previous Exports\",\"previous-imports\":\"Previous Imports\",\"primary-information-heading\":\"Primary information heading\",\"pro-tip\":\"Pro Tip\",\"problem-connecting-api\":\"Problem connecting to the API.\",\"processing\":\"Processing...\",\"product-code\":\"Product Code\",\"program\":\"Program\",\"program-help-generate-code-block\":\"Make sure to set the same program in the Validate Code block\",\"program-help-validate-code-block\":\"Use the same program as the Generate Code block\",\"prompt\":\"Prompt\",\"prompt-for-statement\":\"Prompt for statement\",\"prompts\":\"Prompts\",\"property\":\"Property\",\"property-configuration\":\"Property Configuration\",\"property-not-supported\":\"Type not supported\",\"protocol\":\"Protocol\",\"provide-a-language-selector-menu\":\"Provide a language selector menu for contacts to choose their language\",\"provide-key\":\"Provide an API key\",\"provide-url\":\"Provide a URL\",\"publish\":\"Publish\",\"publish-new-version\":\"Publish New Version\",\"publish-the-newest-version-of-this-tree\":\"Publish the newest version of this tree\",\"publish-this-version-of-the-flow\":\"Publish this version of the flow\",\"published\":\"Published!\",\"published-header\":\"Published\",\"question\":\"Question\",\"question-and-message-blocks\":\"Question and Message Blocks\",\"question-blocks-only\":\"Question Blocks only\",\"question-prompt\":\"Question Prompt\",\"question-responses\":\"Question Responses\",\"question-title\":\"Question Title\",\"quota-threshold\":\"Quota Threshold\",\"rain\":\"Rain\",\"random-branch\":\"Random Branch\",\"random-code\":\"Generate Random Codes\",\"ready-to-send\":\"Ready to Send\",\"receive\":\"Receive\",\"receive-outgoing-calls\":\"Receive Outgoing Calls\",\"received\":\"Received\",\"recipient-group\":\"Recipient Group\",\"recommended\":\"Recommended\",\"recommended-export-format-settings\":\"Recommended Export Format Settings\",\"record-group-message\":\"Record Group Message\",\"record-group-message-title\":\"Record group message title\",\"reject\":\"Reject\",\"relative-to-numeric-input\":\"Relative to numeric input\",\"relative-to-the-call-date\":\"Relative to the call date\",\"reload\":\"Reload\",\"remove\":\"Remove\",\"remove-condition\":\"Remove condition\",\"remove-file\":\"Remove file\",\"remove-filter-tags\":\"Remove all tags\",\"remove-from\":\"Remove from\",\"remove-from-group\":\"Remove from Group\",\"remove-question\":\"Remove question\",\"removes-subscribers-from-the\":\"Removes contacts from the\",\"repeat\":\"Repeat\",\"repeat-every\":\"Repeat every\",\"repeat-questions\":\"Repeat Questions\",\"repeating\":\"Repeating\",\"repeats\":\"Repeats\",\"replace\":\"Replace\",\"replace-existing-audio-files-on-blocks\":\"Replace existing audio files on blocks\",\"reset\":\"reset\",\"reset-all-filter\":\"Reset all filters\",\"reset-all-filters\":\"Reset all filters\",\"reset-breakdown-and-show-interactions\":\"Reset Breakdown and Show Interactions\",\"reset-breakdown-and-show-total-interactions\":\"Reset Breakdown and Show Total Interactions\",\"reset-filters\":\"Reset Filters\",\"resolve-warnings-and-save-simulate-clipboard\":\"Resolve warnings and save the tree to use the Clipboard simulator\",\"resource-view\":\"Resources view\",\"response\":\"Response\",\"response-timeout\":\"Response Timeout\",\"responses\":\"Responses\",\"responses-in-this-task\":\"Responses in this task\",\"responses-to-this-block-might-contain-personal-identifying-information\":\"Responses to this block might contain personal identifying information\",\"responses-to-this-block-will-be-hidden-from-users-without-permission-to-view-personal-information\":\"Responses to this block will be hidden from users without permission to view personal information.\",\"restored-title-version\":\"Restored\",\"restored-tree\":\"Restored tree\",\"result-import\":\"Results import\",\"results\":\"Results\",\"results-listed-on-page\":\"Results Listed on Page\",\"resume-tree-for-partial-respondents\":\"Resume tree for partial respondents?\",\"retain-only-most-recent-call-from-same-subscriber\":\"Retain only most recent call from same contact\",\"rich_messaging-content\":\"Rich Messaging Content\",\"rows\":\"Rows\",\"rows-processed\":\"rows processed\",\"rule-components\":\"Rule components\",\"run-another-tree\":\"Run Another Tree\",\"runs-the-latest-version-of\":\"Runs the latest version of\",\"runs-the-latest-version-of \":\"Runs the latest version of\",\"sat\":\"Sat\",\"saturday-day\":\"Saturday\",\"save\":\"Save\",\"save-and-continue\":\"Save and continue\",\"save-and-go-to-next-page\":\"Save and go to next page\",\"save-changes-to-the-flow\":\"Save changes to the flow\",\"save-selection\":\"Save Selection\",\"save-template-instruction\":\"Save the template on your computer as a CSV file\",\"save-transcriptions\":\"Save Transcriptions\",\"saved\":\"Saved\",\"saving\":\"Saving...\",\"saving-and-checking-for-errors\":\"Saving and checking for Errors\",\"saving-transcriptions\":\"Saving transcriptions...\",\"saving-tree\":\"Saving Tree...\",\"schedule-and-send-an-outgoing-call\":\"Schedule and send an outgoing call\",\"schedule-type\":\"Schedule type\",\"search-audio-library\":\"Search audio library…\",\"search-subscribers\":\"Search contacts\",\"secondary-information-headings\":\"Secondary information headings\",\"seconds\":\"seconds\",\"seconds-ago\":\"seconds ago\",\"seconds-for-a-response\":\"seconds for a response\",\"seconds-for-response\":\"seconds for response\",\"see-error-report-instruction\":\"See details from Error Report below, correct the error in your CSV file and upload again.\",\"see-more-versions\":\"See more versions\",\"see-your-notifications-inbox-for-the-download-link\":\"See your Notifications Inbox for the download link.\",\"select-a\":\"Select a\",\"select-a-caller-from-the-list-below\":\"Select A Caller From The List Below\",\"select-a-candidate-block\":\"Select a candidate block\",\"select-a-channel\":\"Select a channel\",\"select-a-field\":\"Select a field\",\"select-a-property\":\"Select a property\",\"select-a-question\":\"Select a question\",\"select-a-tag\":\"Select a tag (or enter in a new one)\",\"select-a-tag-placeholder\":\"Select or add a tag\",\"select-a-value\":\"Select a value\",\"select-all\":\"Select all\",\"select-audio\":\"Select audio\",\"select-block\":\"Select a block\",\"select-data\":\"Select data\",\"select-from-audio-library\":\"Select from audio library\",\"select-group-message-to-play\":\"Select Group Message to Play\",\"select-groups\":\"Select Groups\",\"select-input-block\":\"Select input block\",\"select-input-source\":\"Select input source\",\"select-languages-to-be-enabled-for-content-for-this-tree\":\"Select languages to be enabled for content for\",\"select-none\":\"Select none\",\"select-property-type\":\"Select property type\",\"select-provider\":\"Select Provider\",\"select-queue\":\"Select Queue\",\"select-source\":\"Select a source\",\"select-source-content\":\"Select Source Content\",\"select-subscribers\":\"Select Contacts\",\"select-the-content-type-to-be-enabled-for-this-tree\":\"Select the content type to be enabled for this tree\",\"select_at_least_1_property\":\"Select at least 1 property to set in the 'Contact Properties' section\",\"select_property_to_set\":\"Select the property to set in the 'Contact Properties' section\",\"selected\":\"selected\",\"selected-groups\":\"Selected Groups\",\"selected-subscribers\":\"Selected contacts\",\"selection-confirmation\":\"Selection Confirmation\",\"selection-confirmation-instructions\":\"For Voice content, the audio file specified in the CSV file will be played back to the contact after they make a selection. For all other content types, select the peices of information that should be sent back to the contact or deselect all fields to send nothing back.\",\"selection-response-instructions\":\"For Voice content, the audio file specified in the CSV file will be played back to the contact after they make a selection. For all other content types, select the peices of information that should be sent back to the contact or deselect all fields to send nothing back.\",\"send\":\"Send\",\"send-on-date\":\"Send on date\",\"send-request-to-call-center\":\"Send request to Call Center\",\"send-request-to-different-call-center\":\"Send request to a different org's Call Center\",\"send-this-call-to\":\"Send this call to...\",\"send-tree\":\"Send Tree\",\"send-tree-ellipsis\":\"Send Tree...\",\"sends-call-as-random-dial-campaign\":\"Launch a random-dial campaign that runs continuously until you stop it, or a certain criteria is reached.\",\"sends-call-at-specified-time\":\"Sends this call to contacts starting at the specified date and time.\",\"sends-call-immediately\":\"Sends the call to contacts immediately.\",\"sends-call-repeating-based-on-options\":\"Sends this call on a repeating basis, according to the options on the right.\",\"sensitive-data\":\"Sensitive Data\",\"separate-output-for-each-choice\":\"Separate output for each choice\",\"september-month\":\"September\",\"sessions\":\"Sessions\",\"set-as-a-starting-block\":\"Set as a starting block\",\"set-as-exit-block\":\"Set as exit block\",\"set-as-starting-block\":\"Set as starting block\",\"set-channel-type\":\"Set Channel Type\",\"set-choice-options\":\"Set choice options\",\"set-custom-subscriber-data\":\"Set custom contact data\",\"set-preferred-channel-type\":\"Set Preferred Channel Type\",\"set-preferred-content-type\":\"Set preferred content type\",\"set-sub-prop-w-response\":\"Set a contact property with the contact's response\",\"share-results\":\"Share Results\",\"shareable-link-to-results-for-this-tree\":\"Shareable link to results for this Tree\",\"shareable-links\":\"Shareable Links\",\"shortened-title-for-summary\":\"Shortened Title For Summary\",\"shortened-title-for-summary-description\":\"Enter a title that should be used when reviewing the summary of interactions with this block. If left empty, the full block title will be used.\",\"should-ignore-offline-submissions\":\"Ignore Offline Submissions\",\"should-redeem-code\":\"Mark code as used\",\"show\":\"Show\",\"show-all\":\"Show all\",\"show-all-results\":\"Show all results\",\"show-between-the-following-dates\":\"Show between the following dates\",\"show-clipboard-simulator\":\"Simulate Clipboard\",\"show-empty-only\":\"Show empty\",\"show-interactions\":\"Show interactions\",\"show-key-metrics\":\"Show Key Metrics\",\"show-key-metrics-lower\":\"Show key metrics\",\"show-keymetrics-ajax-error\":\"Key Metrics Error: Please ensure this Tree still exists or try reloading this page.\",\"show-less-options\":\"Show less options\",\"show-message-text\":\"Show message text\",\"show-more-options\":\"Show more options\",\"show-percentage-listened\":\"Show percentage listened\",\"show-results-from-incomplete-engagements\":\"Show results from incomplete engagements\",\"show-stars\":\"Show stars\",\"show-subscriber-id\":\"Show Contact ID\",\"show-summary-metrics\":\"Hide Metrics\",\"showing-block-content-filtered-by-X\":\"Showing block content filtered by :filter\",\"showing-entire-audio-library\":\"Showing entire audio library\",\"shuffle-randomly-again\":\"Shuffle randomly again\",\"sign-into-your-account\":\"sign into your account\",\"sms\":\"SMS\",\"sms-content\":\"SMS Content\",\"sms-content-not-set\":\"SMS content not set\",\"sms-disabled\":\"SMS Disabled\",\"sms-enabled\":\"SMS Enabled\",\"sms-prompt\":\"SMS Prompt\",\"sms-responses\":\"SMS Responses\",\"sms-status\":\"SMS status\",\"sms-subscribers-that-reached-this-block\":\"SMS contacts that reached this block\",\"sms-to\":\"SMS to\",\"social\":\"Social\",\"social-messaging\":\"Social messaging\",\"social-messaging-content\":\"Social Messaging Content\",\"social-subscribers-that-reached-this-block\":\"Social contacts that reached this block\",\"sorry\":\"Sorry!\",\"sorry-cannot-locate-the-selected-tree\":\"Sorry, cannot locate the selected tree.\",\"sorry-there-are-no-results-for-this-date-range\":\"Sorry, there are no results for this date range.\",\"sorry-there-was-an-issue-trying-to-export-audio-for-tree\":\"Sorry, there was an issue trying to export audio for Tree\",\"sorry-we-cant-find-any-results-with-that-address\":\"Sorry, we can't find any results with that address.\",\"sorry-you-don-t-have-permission-to-delete-this-tree\":\"Sorry, you don't have permission to delete this tree.\",\"sorry-you-dont-have-permission-to-delete-this-tree\":\"Sorry, you don't have permission to delete this tree.\",\"sort-by-date\":\"Sort by Date\",\"sort-by-name\":\"Sort by Name\",\"source\":\"Source\",\"specific-language-used-this-call\":\"Specific language used this call\",\"specific-time\":\"Specific time\",\"specify-what-should-happen-if-a-subscribers-language-is-unknown\":\"Specify what should happen if a contact's language is unknown at the time of a call or SMS conversation:\",\"start-at\":\"Start At\",\"start-date\":\"Start Date\",\"start-date-equal-to\":\"Start Date equal to\",\"start-date-greater-than\":\"Start Date greater than\",\"start-date-less-than\":\"Start Date less than\",\"started-at\":\"Started at\",\"starting-block-tree-begins-here\":\"Starting Block – Tree Begins Here\",\"starts\":\"starts\",\"status\":\"Status\",\"stock-code\":\"Stock Code\",\"subscriber\":\"contact\",\"subscriber-custom-data\":\"Contact Custom Data\",\"subscriber-language\":\"Contact Language\",\"subscriber-prop-to-send-payload\":\"Subscriber properties To Send As Payload\",\"subscriber-properties\":\"Contact Properties\",\"subscriber-properties-to-snapshot\":\"Contact Properties to Snapshot\",\"subscriber-property\":\"Contact Property:\",\"subscriber-property-to-branch-via\":\"Contact Property to Branch via\",\"subscriber-start-date\":\"Contact Start Date\",\"subscriber-starting-date-reference\":\"Contact Starting Date Reference\",\"subscribers\":\"contacts\",\"subscribers-that-reached-this-block\":\"Contacts that reached this block\",\"success\":\"Success\",\"successfully-imported-result\":\"Successfully imported results\",\"summary-block-description\":\"This block is used to review answers to questions that are included in the summary. Clipboard users are able to Confirm or Reject responses.\",\"sun\":\"Sun\",\"sun-level\":\"Sun Level\",\"sunday-day\":\"Sunday\",\"sunny\":\"Sunny\",\"survey\":\"Survey\",\"survey-details\":\"Survey details\",\"switch-to-tree-view-to-add-blocks\":\"Switch to Tree View to Add Blocks\",\"system-generated\":\"System generated\",\"tag-filter-description\":\"Multiple Choice Question blocks that have been tagged can be used as filters on the shared link. The choices for the blocks with a tag are used as the options for the filter. Select which tags should be used as filters.\",\"tag-filters\":\"Tag Filters\",\"tags\":\"Tags\",\"task-was-successfully-deleted\":\"Task was successfully deleted!\",\"tell-me-more\":\"Tell me more\",\"test-call\":\"Test Call\",\"test-call-queued-at\":\"Test call queued at\",\"test-call-request-sent\":\"Test call request sent...\",\"text-responses\":\"Text responses\",\"text-responses-sms-ussd\":\"Text Responses (SMS / USSD)\",\"that-block-was-not-found-please-save-and-try-again\":\"The block was not found please save the tree and try again\",\"that-collaborative-filtering-page-was-not-found-please-try-again\":\"That Collaborative Filtering page was not found. Please try again.\",\"that-tree-json-was-not-found-please-try-again\":\"That Tree JSON was not found. Please try again.\",\"that-tree-set-was-not-found-please-try-again\":\"That tree set was not found. Please try again.\",\"that-tree-was-not-found-please-try-again\":\"That tree was not found. Please try again.\",\"the-contacts-x-property-will-be-set-using-block-input\":\"The Contact's :propertyName property will be set using the input to the selected block.\",\"the-json-code-that-has-been-imported-is-invalid-or-can-not-be-parsed\":\"The JSON code that has been imported is invalid or can not be parsed. <br> Please review the code used in the import for completeness and validity.\",\"the-property-will-be-set-to-x\":\"The Contact's property will be set to ':value'\",\"the-property-will-be-set-using-block-input\":\"The Contact's property will be set using the input to the block.\",\"the-remaining-tasks-are-visible-below\":\"The remaining tasks are visible below.\",\"the-response-from-the\":\"the response from the\",\"the-specified-tree-version\":\"The specified tree version\",\"the-transcription-set-was-not-found\":\"The transcription set was not found. Please try again.\",\"the-tree-version\":\"The tree version\",\"the-tree-version-x-was-deleted\":\"The Tree :treeName from version :treeVersion was deleted.\",\"the-tree-x-was-deleted\":\"The Tree :treeName was deleted.\",\"the-tree-x-was-restored\":\"The tree :treeName was restored.\",\"then-callers-will-go-to-the-quota-met-output-if-not-callers-will-go-to-the-not-met-output\":\"then callers\",\"there-are-no-results-yet-please-check-back-later\":\"There are no results yet. Please check back later.\",\"this-block-branches-based-on-type-of-the-recipient\":\"This block branches based on the content type of the recipient. The outputs are determined based on the content type of the tree when the block is added.\",\"this-block-directs-callers-based-on-the-total-number-of-calls-1\":\"This block directs callers towards one of two options, based on the total number of calls in the specified date range for either just this tree or all trees in the entire organisation\",\"this-block-directs-callers-based-on-the-total-number-of-calls-2\":\"If the number of calls in the specified date range is larger than the 'Calls Quota Threshold' value, then callers will go to the Quota Met output. If not, callers will go to the Not Met output.\",\"this-block-directs-callers-based-on-the-total-number-of-subs-1\":\"This block directs callers towards one of two options, based on the total number of contacts in the specified group.\",\"this-block-directs-callers-based-on-the-total-number-of-subs-2\":\"If the number of contacts in the group is larger than the 'Quota Threshold' value, then callers will go to the Quota Met output. If not, callers will go to the Not Met output.\",\"this-block-directs-callers-based-on-their-answers\":\"This block directs callers towards one of a series of options, based on their answers to previous numeric questions. The outputs below are considered first-to-last, and the first one to be true is used.\",\"this-block-directs-callers-on-previous-answers\":\"This block directs callers towards one of two options, depending on previous answers to multiple choice questions.\",\"this-block-directs-callers-random\":\"This block directs callers towards an output chosen at random.\",\"this-block-generates-the-weather-forecast-1\":\"This block generates the weather forecast message.\",\"this-block-generates-the-weather-forecast-2\":\"If a prompt is not enabled, it will not appear in the weather forecast message.\",\"this-block-is-configured-by-the-referrals-app\":\"This block is configured by the Referrals app.\",\"this-block-runs-the-destination-tree-1\":\"This block runs the destination tree specified above, allowing you to build nested trees that can then be reached when sending this tree to callers.\",\"this-block-runs-the-destination-tree-2\":\"After the destination tree has been completed, the caller will return to this tree and continue to any blocks connected below this one.\",\"this-block-runs-the-destination-tree-3\":\"By choosing the 'Most Recent Version' option, you can then publish new versions of the destination tree without needing to edit this tree.\",\"this-tree\":\"This tree\",\"this-tree-set\":\"This tree\",\"three-components-used-to-create-assignment-rules-and-name-audio-files\":\"There are three components which can be used to create assignment rules and name audio files.\",\"thunderstorms\":\"Thunderstorms\",\"thurs\":\"Thurs\",\"thursday-day\":\"Thursday\",\"timeline\":\"Timeline\",\"timeline-total-interactions\":\"Timeline: Total Interactions\",\"times\":\"times\",\"times-for-incorrect-responses\":\"times for incorrect responses\",\"times-in-utc\":\"Times in UTC\",\"times-in-your-account-time-zone\":\"Times in your account time zone\",\"timespan\":\"Timespan\",\"timezone\":\"Timezone\",\"title\":\"Title\",\"to\":\"to\",\"to-attach-a-message-to-a-call\":\"To attach a message to a call,\",\"to-attach-a-survey-to-a-call\":\"To attach a survey to a call,\",\"to-attach-a-tree-to-a-call\":\"To attach a tree to a call,\",\"to-be-matched-to-tree\":\"to be matched to Tree\",\"to-send-call-to-only-some-subscribers\":\"To send a call to only some contacts\",\"toggle-to-auto-gen-content-from-block\":\"Toggle to Auto-generate Content from Block Details\",\"toggle-to-overwrite-auto-genned-content\":\"Toggle to Overwrite the Auto-generated Content\",\"toggles-subscriber-receiving-outgoing-calls\":\"This action enables or disables the contact from receiving Outgoing Calls.\",\"too_many_languages_for_collaborative_filtering\":\"Too Many Languages\",\"too_many_languages_for_collaborative_filtering_description\":\"Collaborative Filtering is only valid on trees that have one language enabled. Please enable a single language for the tree.\",\"total\":\"Total\",\"total-audio-length\":\"Total Audio Length\",\"total-interactions\":\"Total Interactions\",\"total-open-ended-responses\":\"Total open-ended responses\",\"total-responses\":\"Total Responses\",\"total-results\":\"Total results\",\"total-sms-responses\":\"Total SMS Responses\",\"total-versions\":\"Total versions\",\"total-voice-responses\":\"Total Voice Responses\",\"totals\":\"Totals\",\"transcription-task-successfully-updated\":\"Transcription task successfully updated!\",\"transcription-tasks-can-be-sent-out-to-external-transcribers-to-easily-transcribe-open-ended-audio-responses\":\"Transcription tasks can be sent out to external transcribers, to easily transcribe open-ended audio responses from this tree. You can automatically generate several transcription tasks using the form below, or, use the 'New Transcription Task' button above to create individual tasks\",\"transcriptions\":\"Transcriptions\",\"transcriptions-saved\":\"Transcriptions saved \",\"transcriptions-saved-continuing-to-next-page\":\"Transcriptions saved! Continuing to next page...\",\"transfer-amount\":\"Amount to Transfer\",\"transfer-amount-currency\":\"Currency to Use\",\"transferto-cross-border-mobile-payments\":\"TransferTo Cross-Border Mobile Payments\",\"tree\":\"Tree\",\"tree-could-not-be-published\":\"Tree could not be published\",\"tree-deleted\":\"Tree Deleted!\",\"tree-details\":\"Tree Details\",\"tree-does-not-have-any-blocks-yet\":\"Tree does not have any blocks yet.\",\"tree-duplicated\":\"Tree Duplicated!\",\"tree-identifier-not-provided\":\"Tree identifier not provided\",\"tree-is-empty\":\"Tree is empty!\",\"tree-is-empty-please-use-the-add-block-button-on-the-top-left-to-add-some-blocks-to-get-started\":\"Tree is empty. Please use the Add Block button on the top left to add some blocks to get started.\",\"tree-restored\":\"Tree Restored!\",\"tree-result-import-heading-validation-error\":\"The column headings in your import are invalid. Please refer to the import template for the correct headings\",\"tree-result-import-in-progress\":\"Tree result import in progress\",\"tree-saved\":\"Tree Saved!\",\"tree-update-conflict\":\"Tree update conflict detected\",\"tree-used-elsewhere-by-x-at-x\":\"This tree has been saved elsewhere by :name at :time\",\"tree-versions\":\"Tree Versions\",\"trees\":\"Trees\",\"trigger-outgoing-call\":\"Trigger Outgoing Call\",\"trimmed-to\":\"trimmed to\",\"true\":\"True\",\"tues\":\"Tues\",\"tuesday-day\":\"Tuesday\",\"two-or-more-choices-required\":\"Two or More Choices Required:\",\"unable-to-delete-the-requested-transcription-task\":\"Unable to delete the requested transcription task.\",\"unable-to-find-block-locally-from-server-results-with-key\":\"Unable to find block locally from serverResults\",\"undo\":\"Undo\",\"unexpected-error\":\"An unexpected error occurred\",\"unique-subscribers\":\"Unique Contacts\",\"unknown\":\"Unknown\",\"unknown-error-occurred\":\"An unknown error occurred\",\"unknown-language\":\"Unknown language\",\"unknown-subscriber-branch-criteria\":\"Unknown Contact Branch Criteria\",\"unlimited-if-not-defined-or-set-as-zero\":\"Unlimited if not defined or set as zero\",\"unlock\":\"Unlock\",\"unset-as-exit-block\":\"Unset as exit block\",\"untitled-block\":\"Untitled Block\",\"untitled-collab-filtering-rating\":\"Untitled Collaborative Filtering Rating\",\"untitled-collaborative-filtering-question\":\"Untitled Collaborative Filtering Question\",\"untitled-generate-code\":\"Untitled Generate Code\",\"untitled-message\":\"Untitled message\",\"untitled-multiple-choice-question\":\"Untitled multiple-choice question\",\"untitled-numeric-question\":\"Untitled Numeric Question\",\"untitled-open-ended-question\":\"Untitled Open-Ended Question\",\"untitled-question\":\"Untitled Question\",\"untitled-record-group-message\":\"Untitled Record Group Message\",\"untitled-tree\":\"Untitled Tree\",\"untitled-validate-code\":\"Untitled Validate Code\",\"update-existing-subscriber\":\"Update existing contact\",\"update-task\":\"Update Task\",\"update-transcription-task\":\"Update Transcription Task\",\"updated\":\"Updated\",\"upload\":\"Upload\",\"upload-a-csv-with-column-codes\":\"Upload a CSV with column 'codes'\",\"upload-audio-files-to-X\":\"Upload audio files to :dest\",\"upload-codes\":\"Upload codes\",\"upload-csv-file\":\"Upload CSV File\",\"upload-csv-file-instruction\":\"Upload a CSV file (.csv) with your tree results. \",\"upload-error\":\"Upload error\",\"upload-file\":\"Upload File\",\"uploading\":\"Uploading\",\"url-destination\":\"URL Destination\",\"url-for-this-csv-export-via-api-key\":\"URL for this CSV export via API key\",\"usd-at-current-exchange\":\"USD at Current Exchange Rate\",\"usd-exchange-warning-message\":\"The amounts specified above will be applied in USD.\",\"use-a-specific-language-for-this-call\":\"Use a specific language for this call\",\"use-custom-block-ordering\":\"Use custom block ordering\",\"use-different-multimedia-files-each-language\":\"Use different files for each language\",\"use-full-text-descriptions\":\"Use full-text descriptions\",\"use-hybrid-format\":\"Use hybrid format\",\"use-machine-readable-format\":\"Use machine-readable format\",\"use-machine-readable-numbers\":\"Use machine-readable numbers\",\"use-master-for-language\":\"Use the master CSV file for this language\",\"use-simple-date-range-picker\":\"Use simple date range picker\",\"use-tags-in-your-location-message-for-references-in-alert\":\"Use the tag [expiry_time] in your message to reference the expiration time and the tag [location] to reference the location of the alert.\",\"use-text-descriptions\":\"Use text descriptions\",\"use-the-button-above-to-generate-a-new-csv-export-for-this-tree\":\"Use the button above to generate a new CSV export for this tree. It will appear in the list on the right when completed.\",\"use-the-button-above-to-generate-a-shareable-results-page-for-this-tree\":\"Use the button above to generate a shareable results page for this tree. This page will be updated automatically as new results are received for this tree.\",\"use-the-button-below-to-generate-a-shareable-results-page-for-this-tree\":\"Use the button below to generate a shareable results page for this tree. This page will be updated automatically as new results are received for this tree.\",\"use-the-form-below-to-create-a-new-transcription-task\":\"Use the form below to create a new transcription task that can be sent out to external transcribers. The transcriber will be assigned open-ended responses to transcribe based on the language and start/end numbers specified below.\",\"use-the-shareable-link-below-to-share-the-results-of-this-tree\":\"Use the shareable link below to share the results of this tree. <b> Anyone you share this with will have access to these results. </b> This page will be updated automatically as new results are received for this tree.\",\"use-the-tag-expiry-time\":\"Use the tag [expiry_time] in your message to reference the expiration time and the tag [location] to reference the location of the alert.\",\"use-tree-view-to-add-blocks\":\"Please use the Tree View to add some blocks before attempting to populate and review content.\",\"user-guide\":\"For IVR, codes cannot be read using voice, so the system will text the block to the contact. It is recommended that the audio for this block will notify the contact that they will receive a text message with their code.\",\"username\":\"Username\",\"using-automatic-routing\":\"Using Automatic Routing\",\"ussd\":\"USSD\",\"ussd-content\":\"USSD Content\",\"ussd-prompt\":\"USSD Prompt\",\"ussd-subscribers-that-reached-this-block\":\"USSD contacts that reached this block\",\"valid\":\"Valid\",\"validate-code-block\":\"Validate Code Block\",\"validate-code-block-ignore-offline-submissions-help\":\"Disables validating codes when Android Clipboard is offline.\",\"validate-code-title\":\"Validate code title\",\"value\":\"Value\",\"version\":\"version\",\"version-capitalized\":\"Version\",\"versions\":\"Versions\",\"versions-capitalized\":\"Versions\",\"view\":\"View\",\"view-all-responses\":\"View All Responses\",\"view-and-manage-collaborative-submissions\":\"View and manage collaborative submissions\",\"view-and-manage-collaborative-submissions-a-for-this-block\":\"View and manage collaborative submissions</a>\",\"view-and-manage-statements\":\"View and manage statements\",\"view-generate-code-block\":\"View generate code block\",\"view-instruction\":\"View Instructions\",\"view-issues\":\"View Issues\",\"view-results\":\"View Results\",\"view-tracker-configuration\":\"View Tracker Configuration\",\"view-trackers\":\"& Issue Trackers\",\"view-tree\":\"View Tree\",\"view-tree-details\":\"View tree details\",\"view-tree-structure\":\"View Tree Structure\",\"view-tree-versions\":\"View tree versions\",\"view-validate-code-block\":\"View validate code block\",\"view-versions-issue-trackers\":\"View Versions & Issue Trackers\",\"view-x-other-versions\":\"View :count other versions of this tree\",\"voice\":\"Voice\",\"voice-content\":\"Voice Content\",\"voice-disabled\":\"Voice Disabled\",\"voice-enabled\":\"Voice Enabled\",\"voice-key-press\":\"Voice Key Press\",\"voice-prompt\":\"Voice Prompt\",\"voice-status\":\"Voice status\",\"voice-subscribers-that-reached-this-block\":\"Voice contacts that reached this block\",\"voice-to\":\"Voice to\",\"wait\":\"Wait\",\"waiting-for-results\":\"Waiting for Results\",\"we-are-upgrading-how-we-handle\":\"We are upgrading how we handle choice translations in the Multiple Choice Question Block. Please ensure that the following is correct. If you do not make changes right now, your tree will continue to accept the same text responses as before. \",\"we-didnt-find-any-matches-revisit-pattern\":\"We didn't find any matches, try revising your pattern.\",\"we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks\":\"We need audio files to have previously been uploaded to your organization's audio library in order to auto-link them to blocks.\",\"weather-forecast\":\"Weather Forecast\",\"webhook-block-empty-payload-info\":\"No blocks are selected. The block payload of this webhook event will be empty.\",\"webhook-block-payload-help-text\":\"Select the interactive blocks that should be sent when this webhook is triggered. The responses for the selected blocks will be sent.\",\"webhook-http-warning\":\"When sending sensitive data, we recommend using an HTTPS endpoint as the webhook destination for privacy and security.\",\"webhook-method\":\"Method\",\"webhook-secret\":\"Secret\",\"webhook-secret-desc\":\"We'll send this text with the webhook submission so that your server can authenticate it came from Viamo.\",\"webhook-subscriber-empty-payload-info\":\"No subscriber properties are selected. The subscriber payload of this webhook event will be empty.\",\"webhook-subscriber-payload-help-text\":\"Select the subscriber properties that should be sent when this webhook is triggered. The value of the selected property will be sent.\",\"webhook-untitled-block\":\"Untitled block\",\"wed\":\"Wed\",\"wednesday-day\":\"Wednesday\",\"week\":\"week\",\"weekly\":\"Weekly\",\"weeks-after\":\"Weeks After\",\"weeks-before\":\"Weeks Before\",\"welcome\":\"Welcome!\",\"when-block-reached-caller-exits-and-connects-to-operator\":\"When this block is reached, the caller exits the tree and is connected to the operator. As a result, no further blocks can be connected below this one.\",\"when-block-reached-subscriber-start-date-set-to-date-based-upon-previous-numeric-input\":\"When this block is reached, contacts will have their date set using the input they provide to a previous numeric question. Their date will be set to the number of days, weeks, or months (set above) that the contact provides, relative to the date of the call.\",\"when-block-reached-subscriber-start-date-set-to-date-relative-to-call-and-timespan-specified\":\"When this block is reached, contacts will have their date set to the number of days, weeks, or months specified above, relative to the date on which they receive the call.\",\"when-block-reached-subscriber-start-date-set-to-specified\":\"When this block is reached, contacts will have their date set to the date specified above.\",\"when-finished-returns-to-this-tree-and-continues-to-any-blocks-connected-below\":\"When finished, returns to\",\"when-no-preferred-language-subscriber-receives-lang-selector\":\"If this option is set to 'No preferred language', then at the start of the contact's next call, they will receive a language selector menu (if a language selector prompt is provided).\",\"when-no-valid-response-is-received\":\"When no valid response is received\",\"when-randomizing\":\"when randomizing\",\"wind-level\":\"Wind Level\",\"windy\":\"Windy\",\"with-subscriber-phone-number\":\"with Contact Phone Number\",\"words\":\"Words\",\"working-loading\":\"Working...\",\"x-of-y\":\"of\",\"x-text-responses\":\":language Text Responses\",\"year\":\"year\",\"yearly\":\"Yearly\",\"yes\":\"Yes\",\"you-are-about-to-delete-a-transcription-task\":\"You are about to delete a transcription task.\",\"you-are-about-to-delete-a-tree\":\"You are about to delete a tree.\",\"you-are-about-to-delete-a-tree-version\":\"You are about to delete a tree version.\",\"you-are-about-to-delete-this-issue-tracker\":\"You are about to delete this issue tracker.\",\"you-can-edit-your-tree-with-the-interface-below\":\"You can edit your tree with the interface below.\",\"you-can-send-out-the-external-link-from-the-table-below\":\"You can send out the external link from the table below.\",\"you-can-send-out-the-external-links-from-the-table-below\":\"You can send out the external links from the table below.\",\"you-have-x-unsaved-transcriptions\":\"You have :transcription_count unsaved transcriptions. Are you sure you want to leave this page?\",\"you-need-permission-to-export-content\":\"You need permission to export content.\",\"your-browser-does-not-support-the-audio-element\":\"Your browser does not support the audio element.\",\"your-combined-tree-results-are-being-exported\":\"Your combined tree results are being exported.\",\"your-file-file-name-is-currently-being-processed\":\"Your file, :fileName is currently being processed.\",\"your-open-ended-audio-download-for\":\"Your open-ended audio download for\",\"your-orgs-audio-library\":\"your organization's audio library\",\"your-prompt\":\"<your prompt>\",\"youre-using-floip-expressions\":\"It looks like you're using FLOIP expressions, nice!\"},\"fr.flow-builder\":{\"flow-name\":\"Nom du flux\",\"flow-label\":\"Libélé du flux\",\"flow-importer\":\"importateur de flux\",\"Interaction-timeout\":\"délai d'interaction\",\"modes\":\"Modes\",\"enter-flow-name\":\"Entrez le nom de flux\",\"enter-flow-label\":\"Entrez l'étiquette de flux\",\"maximum-digits\":\"Nombre maximum\",\"AirtimeTransferBlock\":\"temps d'antenne de transfert\",\"BillSubscriberBlock\":\"Bill Contactez\",\"CallBackWithCallCenterBlock\":\"Téléphonique avec le centre d'appels Bloc\",\"CallHistoryBranchBlock\":\"Branchement suivant l'historique des appels\",\"CollaborativeFilteringQuestionBlock\":\"Question de filtrage collaboratif\",\"CollaborativeFilteringRatingBlock\":\"Note de filtrage collaboratif\",\"CollaborativeFilteringRatioBranchBlock\":\"Direction par rapport de filtrage collaboratif\",\"ConnectToOperatorBlock\":\"Connecter à un opérateur\",\"ConsoleIO\\\\Print\":\"Impression\",\"ConsoleIO\\\\Read\":\"Lis\",\"ContentTypeBranchBlock\":\"Branchement selon le type de contenu\",\"Core\\\\Case\":\"Cas\",\"Core\\\\Log\":\"Journal\",\"Core\\\\Output\":\"Production\",\"Core\\\\RunFlow\":\"Exécuter flux\",\"CreateSubscriberBlock\":\"Créer un contact\",\"CurrentTimeBranchBlock\":\"Direction via Heure actuelle\",\"DecisionBranchBlock\":\"Branchement de décision\",\"DirectorySelectionBlock\":\"sélection du répertoire\",\"EntitySelectionBlock\":\"Renvoi Entité de sélection\",\"ExpressionBranchBlock\":\"Direction d'expression\",\"GenerateCodeBlock\":\"Générer le code unique\",\"GroupBranchBlock\":\"Branchement selon l'appartenance au groupe\",\"GroupPropertyBlock\":\"Modifier l'appartenance au groupe\",\"GroupSizeBranchBlock\":\"Branchement selon la taille du groupe\",\"IdValidationBlock\":\"Branchement selon un code valide\",\"LanguageSelectorBlock\":\"Sélection de langue\",\"LocationBlock\":\"Selection d'une localité\",\"MarkCallCompleteBlock\":\"Marquer l'appel comme étant effectué\",\"MessageBlock\":\"Message\",\"MobilePrimitives\\\\Message\":\"Message\",\"MobilePrimitives\\\\NumericResponse\":\"Réponse numérique\",\"MobilePrimitives\\\\OpenResponse\":\"Réponse ouverte\",\"MobilePrimitives\\\\SelectOneResponse\":\"Sélectionnez une réponse\",\"MobilePrimitives\\\\SelectManyResponse\":\"Sélectionnez De nombreuses réponses\",\"MultipleChoiceQuestionBlock\":\"Question à Choix Multiples\",\"MultipleSelectMultipleChoiceQuestionBlock\":\"Sélection multiple Question à choix multiples\",\"NumericBranchBlock\":\"Branchement Numérique\",\"NumericQuestionBlock\":\"Question Numérique\",\"OpenQuestionBlock\":\"Question Ouverte\",\"PlayGroupMessageBlock\":\"Play Group Message Block\",\"RandomBranchBlock\":\"Branchement aléatoire\",\"RandomOrderMultipleChoiceQuestionBlock\":\"Question à choix multiple avec ordre au hasard\",\"RecordGroupMessageBlock\":\"Record Group Message Block\",\"RunTreeBlock\":\"Exécutez un autre arbre\",\"SmartDevices\\\\LocationResponse\":\"Réponse Localisation\",\"SmartDevices\\\\PhotoResponse\":\"photo Réponse\",\"SubscriberBranchBlock\":\"Branchement selon les caractéristiques du Contact\",\"SubscriberPropertiesSnapshotBlock\":\"Instantané des propriétés Contactez\",\"SubscriberPropertyBlock\":\"Modifier le contact de la propriété\",\"SummaryBlock\":\"Résumé\",\"TriggerOutgoingCallBlock\":\"Déclencher un appel sortant\",\"ValidateCodeBlock\":\"Valider le code unique\",\"WeatherAlertsBlock\":\"Créer des alertes météo\",\"WeatherForecastBlock\":\"Prévisions météorologiques\",\"WebhookBlock\":\"Webhook\",\"WebhookContentBlock\":\"Contenu Webhook\",\"X-abbreviations-set-when-creating-tree\":\":lang abréviations lang définies lors de la création de l'arbre\",\"X-are-required-placeholder-components-for-rule-but-additional-designation-optional\":\":placeholders sont des composants d'espace réservé requis pour la règle, mais une désignation supplémentaire est facultative.\",\"X-assigned-to-a-block\":\":label attribué à un bloc\",\"X-of-resources-populated\":\":count de ressources peuplé\",\"X-seconds-long\":\":duration_seconds longue\",\"X-subscribers-selected\":\"contacts sélectionnés\",\"X-will-match-with-Y\":\":pattern correspondra avec :name\",\"X-wont-match-with-Y\":\":pattern ne correspond pas avec :name\",\"absolute-date\":\"date absolue\",\"accessed\":\"Accédé\",\"action\":\"action\",\"action-allows-custom-subscriber-data-when-block-reached\":\"Cette action vous permet de définir des données de contact personnalisé, lorsque ce bloc dans l'arbre est atteint.\",\"action-changes-preferred-content-types-to-receive-in-future\":\"Cette action modifie les types de contenu préféré (voix ou SMS) que le contact recevra dans les appels futurs.\",\"action-immediately-changes-preferred-language-of-subscriber\":\"Cette action change immédiatement la langue préférée du contact. blocs plus tard dans l'arbre utiliseront la nouvelle langue.\",\"actions\":\"Actes\",\"active\":\"actif\",\"adapted-from\":\"Adapté à partir de:\",\"add-a-description-to-this-recording\":\"Ajouter une description à cet enregistrement\",\"add-a-new-recorder\":\"Ajouter un nouvel enregistreur\",\"add-block\":\"Ajouter un bloc\",\"add-condition\":\"Ajouter une condition\",\"add-data\":\"Ajouter des données\",\"add-label-tags\":\"Ajouter étiquette/identification\",\"add-map-coordinates-field\":\"Ajouter un champ Coordonnées Carte\",\"add-question\":\"Supprimer la question\",\"add-to\":\"Ajouter à\",\"add-to-group\":\"Ajouter au groupe\",\"added\":\"ajoutée\",\"additional-designation-created-in-the-rule\":\"Une désignation supplémentaire créée dans la règle\",\"adds-subscribers-to-the\":\"Ajoute des contacts à la\",\"admin-csv-file\":\"Master File CSV\",\"advanced\":\"Avancé\",\"after\":\"Après\",\"after-completing-all-output-branches\":\"Après avoir fini les sorties des branchements :\",\"airtime-credit-transfer\":\"Transfert de crédit de temps d'antenne\",\"alert-message-title\":\"Titre d'alerte de message\",\"all-block-types\":\"Tous les types de blocs\",\"all-blocks\":\"tous les blocs\",\"all-channels\":\"Tous les canaux\",\"all-content-across-this-organisation\":\"Tout le contenu à travers cette organisation\",\"all-languages\":\"Toutes les langues\",\"all-message-blocks\":\"Tous les blocs de message\",\"all-other-possible-values\":\"Toutes les autres valeurs possibles\",\"all-question-blocks\":\"Tous les blocs question\",\"all-subscribers\":\"Tous les contacts\",\"all-transcriptions-saved\":\"Tous transcriptions enregistrés\",\"allow-visitors-to-modify-the-date-range\":\"Permettre aux visiteurs de modifier la plage de dates\",\"allow-visitors-to-translate-the-page-in-their-language\":\"Permettre aux visiteurs de traduire la page dans leur langue\",\"already-published\":\"Déjà publié!\",\"already-used\":\"Déjà utilisé\",\"and\":\"et\",\"any-key\":\"N'importe quelle touche\",\"anytime\":\"À tout moment\",\"api-key\":\"clé API\",\"api-success\":\"Connecté avec succès à l'API.\",\"append-or-replace-on-upload\":\"Joindre ou remplacer le téléchargement ?\",\"applies-to-calls-sent-to-all-subscribers-or-groups-containing-subscriber\":\"Cela s'applique aux appels envoyés à tous les contacts, ou envoyés à des groupes contenant ce contact. Ils peuvent toujours recevoir des appels sortants adressés spécifiquement à eux.\",\"apply\":\"Appliquer\",\"apply-all-filters\":\"Appliquer tous les filtres\",\"april-month\":\"avril\",\"are-you-sure-you-want-to-delete-this-shareable-link\":\"Etes-vous sûr de vouloir supprimer ce lien partageable? Les utilisateurs avec le lien existant ne seront plus en mesure d'accéder à ces résultats.\",\"as-at\":\"comme à\",\"at\":\"à\",\"at-character\":\"à caractère\",\"at-least\":\"Au moins\",\"at-least-one-language-must-be-checked\":\"Au moins une langue doit être vérifiée.\",\"at-minimum-we-need-two-placeholders\":\"Au minimum, nous avons besoin de deux espaces:\",\"at-this-time\":\"En ce moment\",\"attach-multimedia\":\"joindre multimédia\",\"audio-export-started-for\":\"l'exportation audio a commencé pour\",\"audio-file-naming-pattern\":\"modèle de nomination de fichier audio\",\"audio-files\":\"Fichiers Audio\",\"audio-files-per-task\":\"Les fichiers audio par tâche\",\"audio-lib-empty-for-this-org\":\"La bibliothèque audio est vide pour cette organisation.\",\"audio-library\":\"Bibliothèque audio\",\"audio-listened\":\"Audio écouté\",\"august-month\":\"août\",\"auto\":\"Auto\",\"auto-gen-content-from-block-details\":\"Cliquez sur Contenu généré automatiquement des détails du bloc\",\"auto-link-audio-files\":\"Auto-Link fichiers audio\",\"automatic-routing-description\":\"Avec le routage automatique, les contacts sont acheminés vers une file d'attente du centre d'appels en fonction de leur propriété « target_operator ». Lorsqu'il est réglé sur le routage automatique, vous pouvez contrôler la file d'attente en définissant cette propriété avant un contact entre ce bloc.\",\"automatic-routing-label\":\"routage automatique\",\"automatically-enable-statements\":\"Activer automatiquement les déclarations\",\"automatically-enable-statements-help\":\"Avec cette option, les nouveaux états seront « Validé ». Si cette option est désactivée de nouvelles déclarations seront « non vérifiées »\",\"average-audio-length\":\"Longueur moyenne Audio\",\"avg-duration-for-all-calls\":\"Durée moyenne pour tous les appels\",\"avg-duration-for-completed-calls\":\"Durée moyenne pour les appels terminés\",\"back\":\"Retour\",\"back-to-choices-list\":\"Retour à la liste des choix\",\"back-to-trees-list\":\"Retourner à la liste des arbres\",\"base-url\":\"URL de base\",\"base-url-placeholder\":\"exemple: https://example.org/api\",\"bill-subscriber\":\"Bill Contactez\",\"block\":\"Bloc (s)\",\"block-allows-connect-to-operator-chosen-at-random-from-pre-specified-operator-contact-list\":\"Ce bloc vous permet de connecter un appelant à un opérateur, choisi au hasard à partir d'un opérateur spécifié pré-liste de contacts. Cela vous permet de configurer rapidement des lignes d'aide ou d'autres connexions en personne.\",\"block-choice-filter-description\":\"blocs peuvent être utilisés comme filtres sur le lien partagé. sélectionner les blocs doivent être utilisés comme filtres.\",\"block-code\":\"bloc de code\",\"block-details\":\"Détails du bloc\",\"block-id\":\"L'identifiant du bloc\",\"block-label\":\"étiquette bloc\",\"block-name\":\"nom du bloc\",\"block-ordering\":\"commande bloc\",\"block-ordering-help-text\":\"Remplacer la séquence par défaut de tri en entrant un poids pour chaque bloc. Les blocs avec une valeur plus petite sera en haut de la liste.\",\"block-responses-to-send-payload\":\"Réponses bloc pour Envoyer Comme Payload\",\"block-semantic-label\":\"Bloc étiquette sémantique\",\"block-title\":\"Titre du bloc\",\"block-type-unsupported-in-resource-view\":\"Type de bloc non pris en charge dans l'Affichage des ressources\",\"blocks\":\"blocs\",\"blocks-responses\":\"Réponses bloc\",\"blocks-to-display\":\"Blocs à afficher\",\"branch-if-subscriber-property\":\"Direction si le contact de la propriété\",\"branch-to-true-if-the-subscriber-is-a-member-of-the\":\"Branche True si le contact est un membre du\",\"branch-via-call-history\":\"Branchement selon l'historique des appels\",\"branch-via-call-history-desc1\":\"Ce bloc dirige les appels vers l'une des deux options, en fonction du nombre total d'appels dans la plage de dates spécifiée pour soit juste cet arbre ou tous les arbres dans l'ensemble de l'organisation »,\",\"branch-via-call-history-desc2\":\"Si le nombre d'appels dans la plage de dates spécifiée est supérieure à la valeur « Appels de seuil de quota », puis les appelants vont Quota Met Sortie. Sinon, les appelants vont Non Met sortie. ',\",\"branch-via-content-type\":\"Branchement selon le type de contenu\",\"branch-via-expression\":\"Direction d'expression\",\"branch-via-group-membership\":\"Branchement selon l'appartenance au groupe\",\"branch-via-group-size\":\"Branchement selon la taille du groupe\",\"branch-via-subscriber-data\":\"Branchement selon les caractéristiques du Contact.\",\"branch-via-valid-code\":\"Branchement selon un code valide\",\"branching\":\"Branchement\",\"breakdown-by\":\"répartition par\",\"btn-add-exit\":\"Ajouter la sortie\",\"call-back-block-desc\":\"Avertit le centre d'appel pour appeler le contact en ajoutant le contact à la liste des numéros de l'organisation.\",\"call-back-block-dialing-list-desc\":\"Entrez le nom de la liste des numéros qui devrait être ajouté à la demande d'appel. Si la liste des numéros n'existe pas, il sera créé avec ce nom.\",\"call-back-block-dialing-list-heading\":\"Composition Nom de la liste\",\"call-back-block-enable-routing-by-queue\":\"Activer le routage par la file d'attente\",\"call-back-block-enable-routing-by-queue-desc\":\"Si cette option est sélectionnée, les demandes d'appel ne seront envoyées qu'aux opérateurs connectés à une file d'attente spécifique.\",\"call-back-block-enter-api-key\":\"Entrez la clé API\",\"call-back-block-enter-dialing-list-name\":\"Entrez le nom de liste de numérotation\",\"call-back-block-notify-different-org\":\"Notifier Call Center d'une autre organisation\",\"call-back-block-notify-this-org\":\"Notifier Call Center de cette organisation\",\"call-back-block-org-api-key\":\"API Organisation clé\",\"call-back-block-queue-name\":\"Nom de la file d'attente\",\"call-back-block-select-queue\":\"Sélectionnez la file d'attente\",\"call-finished\":\"Fin appel\",\"call-started\":\"Début appel\",\"call-this-phone-number\":\"Appelez ce numéro de téléphone\",\"call-to-record\":\"Appel à l'enregistrement\",\"caller\":\"Appelant\",\"calls-after\":\"appels après\",\"calls-before\":\"appels avant\",\"calls-quota-threshold\":\"Appels du Seuil\",\"campaigns\":\"Campagnes\",\"cancel\":\"Annuler\",\"candidate-question\":\"Question intérogatoire\",\"cannot-delete-that-tree\":\"Impossible de supprimer cet arbre\",\"cannot-restore-that-tree\":\"Impossible de restaurer cet arbre.\",\"cannot-restore-that-tree.\":\"Impossible de restaurer cet arbre.\",\"case-of-duplicates-instruction\":\"Dans le cas des doublons et des contacts existants avec le même numéro de téléphone\",\"categorization\":\"Catégorisation\",\"category\":\"Catégorie\",\"category-name\":\"Nom de catégorie\",\"cell-contents\":\"Contenu des cellules\",\"cell-contents-format\":\"Format Contenu Cellule\",\"cf-ratio-description\":\"Configurez le numéro idéal des évaluations que chaque déclaration doit recevoir avant une autre déclaration doit être recueillie.\",\"chance-of-rain\":\"Possibilité de pluie\",\"change-subscriber-language\":\"Changer de langue de contact\",\"change-subscriber-start-date\":\"Changer la date de début de contact\",\"channel\":\"Canal\",\"channels\":\"Canaux\",\"characters\":\"caractère|caractères\",\"check-url-api\":\"Vérifiez votre URL et la clé API et essayez à nouveau.\",\"choice\":\"Choix\",\"choice-filter-tags\":\"étiquettes de filtrage Choix\",\"choice-id-choice-text\":\"Choix ID et Choix texte\",\"choice-id-only\":\"Choix ID seulement\",\"choice-keypress-options\":\"Option de choix de bouton\",\"choice-options\":\"Option Choix\",\"choice-options-fixed\":\"Options de choix\",\"choices\":\"Les choix\",\"choices-choice-attributes\":\"Les choix\",\"choices-prompt\":\"choix Prompt\",\"choose-a-language-selector\":\"(Choisissez un sélecteur de langue)\",\"choose-a-language-selector-label\":\"Choisissez un sélecteur de langue:\",\"choose-audio\":\"Choisissez Audio\",\"choose-csv-file\":\"Choisissez un fichier CSV\",\"choose-date\":\"Choisissez une date\",\"choose-file\":\"Choisir le fichier\",\"choose-how-many-seconds-to-wait\":\"S'il vous plaît choisir le nombre de secondes à attendre jusqu'à ce que le contact appuie sur une touche pour répéter ce message.\",\"choose-how-many-times-can-repeat\":\"S'il vous plaît choisir combien de fois le contact peut répéter ce message.\",\"choose-subscribers\":\"choisir les contacts\",\"choose-which-numbered-key\":\"S'il vous plaît choisir quelle touche dénombra le contact sur pour répéter ce message.\",\"clear-floip-config\":\"Configuration Effacer\",\"click-and-drag-to-create-a-new-connection\":\"Cliquez et faites glisser pour créer une nouvelle connexion\",\"click-and-drag-to-move-this-block\":\"Cliquez et faites glisser pour déplacer ce bloc\",\"click-here-to-download-the-file\":\"Cliquez ici pour télécharger le fichier\",\"click-to-lock-this-choice-in-place\":\"Cliquez sur pour vérrouiller ce choix en place\",\"click-to-remove-this-connection\":\"Cliquez pour supprimer ce lien\",\"click-to-select-this-block\":\"Cliquez pour sélectionner ce bloc\",\"click-to-toggle-editing\":\"Cliquez pour l'édition bascule\",\"click-to-unlock\":\"Cliquez pour déverrouiller\",\"clipboard\":\"Clipboard\",\"clipboard-content\":\"Contenu Clipboard\",\"clipboard-simulator\":\"Simulateur de Clipboard\",\"clipboard-subscribers-that-reached-this-block\":\"contacts presse-papiers qui ont atteint ce bloc\",\"clipboard-subtitle\":\"Fournir un texte supplémentaire qui sera affiché aux opérateurs\",\"close\":\"Fermer\",\"cloudy\":\"Nuageux\",\"code-length\":\"Longueur de caractères\",\"code-validation\":\"validation du code\",\"codes\":\"Codes:\",\"collaborative-filtering-question\":\"Question de filtrage collaboratif\",\"collaborative-filtering-rating\":\"Note de filtrage collaboratif\",\"combined-block-results\":\"Résultats combinés du bloc\",\"combined-tree-results\":\"Résultats combinés de l'arbre\",\"compact-filter-display\":\"Affichage du filtre compact\",\"compact-filter-display-help-text\":\"Entrez le nombre maximum de choix de filtres qui doivent être affichées à l'aide du filtre élargi. (Par exemple « 0 » si tous les filtres doivent être compacts)\",\"completed\":\"Terminé\",\"completed-interactions-per-block\":\"Interactions complètes par block\",\"completed-of\":\"Achevé pour\",\"completed-transcriptions\":\"Transcriptions terminées\",\"completed-via\":\"Achevé par\",\"components-can-be-separated-by-symbols-but-not-required\":\"Les composants peuvent être séparés par des symboles, mais ne sont pas nécessaires.\",\"configure-floip-header\":\"Configurer le flux d'interopérabilité résulte en streaming\",\"configure-referral-entity-prompt-eg\":\"Configurez l'invite pour sélectionner une entité d'orientation. par exemple.:\",\"confirm\":\"Confirmer\",\"confirm-delete\":\"Confirmation de la suppression\",\"confirm-upload\":\"Confirmer le transfert\",\"conflict-external-changes\":\"Pour voir les changements externes s'il vous plaît cliquer sur le bouton Recharger.\",\"conflict-new-version\":\"Pour enregistrer votre travail en tant que nouvelle version, s'il vous plaît cliquez sur le bouton Nouvelle version.\",\"connect-to\":\"Se connecter à\",\"connect-to-an-operator\":\"Connectez-vous à un opérateur\",\"connect-to-the-following-operator-list\":\"Connectez-vous à la liste des opérateurs suivants\",\"connected-of\":\"Connecté à\",\"contact\":\"Contact\",\"contact-properties\":\"Propriétés de contact\",\"contact-updated\":\"contact existant mis à jour\",\"content\":\"Contenu\",\"content-type\":\"Type de contenu\",\"content-type-1\":\"Voix\",\"content-type-2\":\"SMS\",\"content-type-3\":\"Les données\",\"content-type-4\":\"USSD\",\"content-type-5\":\"Sens unique SMS\",\"content-type-is-not-selected\":\"Le type de contenu n'est pas sélectionné\",\"continue-through-exit\":\"Continuer jusqu'à la sortie\",\"continuous\":\"Continu\",\"corresponding-audio-file-components-examples\":\"exemples correspondants composants de fichiers audio\",\"could-not-add-property\":\"Impossible d'ajouter la propriété\",\"could-not-download-audio-for-that-tree\":\"Impossible de télécharger le fichier audio pour cet arbre.\",\"could-not-export-open-ended-audio\":\"Ne peut pas exporter l'audio pour la question ouverte\",\"create-a-new-group\":\"créer un nouveau groupe\",\"create-a-new-list\":\"Créer une nouvelle liste\",\"create-a-new-one\":\"Créer un nouveau\",\"create-a-new-survey\":\"créer une nouvelle enquête\",\"create-a-new-tree\":\"créer un nouvel arbre\",\"create-a-tag-prompt\":\"Créer une balise\",\"create-and-upload-a-new-message\":\"créez et téléchargez un nouveau message\",\"create-at-least-one-language-selector\":\"Avant d'utiliser ce bloc, créez au moins un Sélecteur de langue.\",\"create-contact-absolute-date\":\"La propriété du contact sera mis à la date prévue\",\"create-contact-description\":\"Ce bloc vous permet de créer des contacts avec des blocs d'entrée recueillies précédentes de cet arbre.\",\"create-contact-instructions\":\"Configurez les données du contact doit être créé.\",\"create-contact-relative-block\":\"sera mis en propriété du contact par rapport au moment de l'appel à l'aide du décalage fourni. La réponse du bloc configuré déterminera la quantité pour compenser la valeur par.\",\"create-contact-relative-date\":\"sera mis en propriété du contact par rapport au moment de l'appel à l'aide du décalage fourni.\",\"create-new-link\":\"Créer un nouveau lien\",\"create-new-version\":\"Créer une nouvelle version\",\"create-task\":\"Créer une tâche\",\"create-tasks\":\"Créer des tâches\",\"create-transcription-tasks\":\"Créer transcription Tâches\",\"create-tree\":\"Créer un arbre\",\"create-weather-alerts\":\"Créer des alertes météo\",\"create-weather-forecast\":\"Créer les prévisions météorologiques\",\"created\":\"Établi\",\"created-a-new-version-of\":\"Vous avez créé une nouvelle version de\",\"created-new-version-of\":\"nouvelle version créée de\",\"created-with\":\"Créé avec\",\"csv-format\":\"Format\",\"currency-to-use\":\"Devise à utiliser\",\"current-time-after\":\"Après\",\"current-time-and\":\"et\",\"current-time-before\":\"Avant\",\"current-time-between\":\"Entre\",\"current-time-day\":\"le jour\",\"current-time-day-of-month\":\"Jour du mois\",\"current-time-day-of-week\":\"Jour de la semaine\",\"current-time-exclusive\":\"Exclusive\",\"current-time-go-to-true-when\":\"Allez à « Vrai » lorsque:\",\"current-time-inclusive\":\"Compris\",\"current-time-is\":\"est\",\"current-time-month\":\"Mois\",\"current-time-select-comparison\":\"Sélectionnez comparaison\",\"current-time-select-day-of-week\":\"Choisir un jour de la semaine\",\"current-time-select-month\":\"Sélectionnez un mois\",\"current-time-time-of-day\":\"Moment de la journée\",\"current-time-time-to-compare\":\"Sélectionnez le type de temps pour comparer\",\"current-time-timezone\":\"Fuseau horaire\",\"currently-set-as-exit-block\":\"Actuellement défini comme bloc de sortie\",\"currently-set-as-starting-block\":\"Actuellement défini comme bloc de départ\",\"custom-data-category-name\":\"nom de la catégorie des données personnalisées\",\"custom-data-value\":\"Valeur des données personnalisées\",\"custom-ordering\":\"Utilisez la commande de bloc personnalisé\",\"custom-settings\":\"Paramètres personnalisés\",\"daily\":\"Journalier\",\"data\":\"Les données\",\"data-residency-mode-is-enabled-for-this-account-responses-to-this-block-will-be-retained-on-the-in-country-server-only-and-de-identified-before-being-transmitted-outside-the-country\":\"Mode de résidence de données est activé pour ce compte. Les réponses à ce bloc seront conservés sur le seul serveur dans le pays, et anonymisées avant d'être transmis à l'extérieur du pays.\",\"data-type-boolean\":\"Boolean\",\"data-type-date\":\"Date\",\"data-type-location\":\"Localité\",\"data-type-map_coordinates\":\"Carte avec des coordonnées\",\"data-type-multiple_choice\":\"Choix multiple\",\"data-type-number\":\"Chiffre\",\"data-type-phone\":\"Téléphone\",\"data-type-text\":\"Texte\",\"data-validation-invalid-choice\":\"La valeur ':dataChoice' dans ':dataValue' est invalide\",\"data-validation-invalid-value\":\"La valeur ':dataValue' est invalide\",\"data-validation-max_length\":\"La valeur ‘:dataValue’ dépasse la longueur max :maxOpenLength\",\"data-validation-max_numeric_digits\":\"La valeur ‘:dataValue’ dépasse le chiffre numérique max :maxNumericDigits\",\"date-created\":\"date créée\",\"date-range\":\"Intervalle de dates\",\"date-range-locked\":\"Champ date vérouillé\",\"date-updated\":\"Date de mise à jour\",\"day\":\"jour\",\"day-of-week\":\"Jour de la semaine\",\"days\":\"jour|jours\",\"days-after\":\"Des jours après\",\"days-after-adding\":\"Quelques jours après l'ajout\",\"days-before\":\"Jours avant\",\"december-month\":\"décembre\",\"decision-branch\":\"Branchement de décision\",\"default-repeat-key\":\"Touche de répétition par défaut\",\"default-sender-for-x-otherwise-systems\":\"La valeur par défaut Sender ID pour <em>:orgName</em> sera utilisé lorsque défini, sinon par défaut ID de l'expéditeur du système sera utilisé.\",\"delay-to-enter-repeat-key\":\"Dlai pour taper la touche de répétition par défaut\",\"delete\":\"Supprimer\",\"delete-issue-tracker\":\"Supprimer Tracker problème?\",\"delete-task\":\"Supprimer la tâche\",\"delete-this-shareable-link\":\"Supprimer le lien partageable\",\"delete-tracker\":\"Tracker Supprimer\",\"delete-transcription-task-question\":\"Supprimer Transcription des tâches?\",\"delete-tree\":\"Supprimer l'arbre\",\"delete-tree-question\":\"Supprimer l'arbre?\",\"delete-tree-version\":\"Supprimer la version Tree?\",\"delete-version\":\"Supprimer version\",\"deleted-subscriber\":\"supprimé le contact\",\"deleted-title-version\":\"Supprimé\",\"description\":\"La description\",\"destination-flow\":\"flux de destination\",\"destination-tree\":\"Arbre de destination\",\"destination-tree-not-found\":\"Arbre de destination introuvable\",\"destination-url\":\"URL de destination\",\"directory-selection-block-invalid-details\":\"Un ou plusieurs Sélection de répertoire ont des détails invalides. Pour pouvoir importer des résultats:\\n1- assurer que tous les Sélection de répertoire ont des choix provenant du modèle .csv\\n2- assurer que l'arbre n'a pas d'erreurs\\n3- re-sauvegarder l'arbre\\n\",\"directory-selection-description\":\"Le bloc de sélection Directory permet des contacts à sélectionner des éléments dans un répertoire de choix. Le bloc peut éventuellement envoyer les informations de retour de contact en rapport avec leur sélection. La sélection du contact peut être utilisé plus tard dans un bloc de branche décision.\",\"directory-selection-filter-description\":\"répertoire champs de blocs de sélection peuvent être utilisés comme filtres sur le lien partagé. sélectionner les champs doivent être utilisés comme filtres.\",\"directory-selection-filters\":\"filtres de sélection de répertoire\",\"disable\":\"Désactiver\",\"disable-voice-sms\":\"Désactiver la voix et SMS\",\"disabled\":\"désactivé\",\"disaggregate-data-by-the-audio-listened-percentage\":\"Données désagrégées par pourcentage des audios écoutés\",\"disaggregate-data-by-the-communication-channels\":\"Données désagrégées par Canaux de communication\",\"disaggregate-data-by-the-question-choices\":\"Données désagrégées par Questions à choix multiples\",\"display-headings-without-spaces\":\"rubriques d'affichage sans espaces\",\"display-latest-interaction-only\":\"Afficher la dernière interaction seulement\",\"display-regular-table-headings\":\"Afficher les titres des tableaux réguliers\",\"do-not-merge-any-calls\":\"Ne pas fusionner tous les appels\",\"do-not-prompt\":\"Ne pas demander\",\"do-you-want-to-proceed\":\"Voulez-vous poursuivre?\",\"dont-receive\":\"Ne pas recevoir\",\"download\":\"Télécharger\",\"download-X-format\":\"format :kind\",\"download-admin-file\":\"Télécharger le fichier CSV maître\",\"download-audio-file\":\"Télécharger le fichier audio\",\"download-csv\":\"Télécharger CSV\",\"download-csv-file-to-your-computer\":\"Télécharger le fichier CSV sur votre ordinateur\",\"download-response-audio\":\"Télécharger Réponse audio\",\"download-template\":\"Télécharger le modèle\",\"download-template-admin-file\":\"Télécharger le kit graphique\",\"download-the-audio-files-from-open-ended-responses\":\"Télécharger les fichiers audio à partir des réponses ouvertes\",\"download-x-template-file\":\"Télécharger le modèle :language\",\"draft\":\"Brouillon\",\"drag-and-drop-instruction\":\"Glisser-déposer le fichier CSV ou\",\"dry\":\"Sec\",\"duplicate\":\"Dupliquer\",\"duplicate-as-new-tree\":\"Reproduire comme nouvel arbre\",\"duplicate-entire-flow\":\"débit total en double\",\"duplicate-tree\":\"Arbre dupliqué\",\"duplicate-tree-has-been-created\":\"La copie de l'arbre a été créée.\",\"duplicates-warning\":\"Selon les limites et les caractères, la longueur minimale recommandée est\",\"duration\":\"Durée\",\"earth-networks\":\"Earth Networks\",\"edit\":\"Modifier\",\"edit-alert-message\":\"Modifier le message d'alerte\",\"edit-block-type\":\"Modifier le block :block_type\",\"edit-case-block\":\"Modifier Bloquer Case\",\"edit-collaborative-filtering-question\":\"Modifier la question de filtrage collaboratif\",\"edit-collaborative-filtering-rating\":\"Modifier la note de filtrage collaboratif\",\"edit-content\":\"Modifier le contenu\",\"edit-expression\":\"expression Edition\",\"edit-flow\":\"Modifier l'arbre\",\"edit-generate-code-block\":\"Modifier générer le code\",\"edit-group-membership\":\"Modifier l'appartenance au groupe\",\"edit-location\":\"Modifier l'emplacement\",\"edit-log-block\":\"Modifier Connexion Bloquer\",\"edit-message\":\"Modifier message\",\"edit-multiple-choice-question\":\"Modifier une question à choix multiples\",\"edit-multiple-select-multiple-choice-question\":\"Modifier Sélection multiple Question à choix multiples\",\"edit-new-version\":\"Modifier une nouvelle version\",\"edit-numeric-question\":\"Modifier la question numérique\",\"edit-open-ended-question\":\"Modifier une question ouverte\",\"edit-operator-contact-lists\":\"Modifier l'opérateur des listes de contacts\",\"edit-outgoing-call\":\"Modifier des appels sortants\",\"edit-output-block\":\"Modifier la sortie Bloquer\",\"edit-random-order-multiple-choice-question\":\"Modifier l'ordre aléatoire de la question à choix multiple \",\"edit-run-flow-block\":\"Modifier Exécuter flux bloc\",\"edit-settings\":\"Modifier les paramètres\",\"edit-subscriber-property\":\"Modifier le contact de la propriété\",\"edit-this-block\":\"Modifier ce bloc\",\"edit-tree-before-sending\":\"Modifier l'arbre avant d'envoyer\",\"edit-validate-block\":\"Modifier Valider le bloc de code\",\"edit-voice-content\":\"Modifier le contenu vocal\",\"empty\":\"Vide\",\"empty-audio-library\":\"Bibliothèque audio vide!\",\"empty-responses\":\"réponses vides\",\"enable\":\"Activer\",\"enable-disable-subscriber\":\"Activer / désactiver le contact\",\"enable-display-of-block-type\":\"Activer l'affichage du type de bloc (par exemple Question à choix multiples)\",\"enable-display-of-key-metrics\":\"Activer l'affichage des paramètres clés\",\"enable-sms\":\"activer SMS\",\"enable-voice\":\"activer la voix\",\"enable-voice-sms\":\"Activer la voix et SMS\",\"enabled\":\"Activée\",\"enabled-languages\":\"Langues activées\",\"enabled-result-tabs\":\"Activé onglets résultat\",\"end-at\":\"Fin à\",\"end-date\":\"Date de fin\",\"end-recording-by-pressing\":\"Arrêter l'enregistrement en appuyant sur\",\"end-the-call-session\":\"Fin de l'appel/session\",\"ends\":\"fins\",\"enter-a-value\":\"Entrez une valeur\",\"enter-accepted-responses\":\"Remplacer par une liste de réponses que nous allons utiliser pour correspondre à la réponse du respondant à ce choix. Entrez chaque option sur une nouvelle ligne. (Vous pouvez laisser ce champ vide si l'arbre sera utilisé pour le contenu vocal uniquement)\",\"enter-at-least-three-chars\":\"Entrez au moins trois caractères ...\",\"enter-at-least-three-chars-to-search\":\"Entrez au moins trois caractères pour commencer la recherche ...\",\"enter-audio-content\":\"Entrer le contenu audio\",\"enter-block-label\":\"Entrez une étiquette de bloc\",\"enter-block-name\":\"Entrez un nom de bloc\",\"enter-block-semantic-label\":\"Entrez une étiquette sémantique bloc\",\"enter-clipboard-content\":\"Entrez le contenu Clipboard...\",\"enter-confirmation-audio\":\"Si vous utilisez le contenu vocal, le remplacer par le nom d'un fichier audio que vous avez téléchargé à votre bibliothèque audio. Ce audio sera lu au respondant après avoir sélectionné le choix. (Vous pouvez laisser ce champ vide si l'arbre n'a pas le contenu de la voix ou si vous souhaitez ne pas jouer quoi que ce soit de retour au contact)\",\"enter-date\":\"entrer la date\",\"enter-duration\":\"Entrez la durée\",\"enter-each-on-new-line\":\"Entrez chaque sur une nouvelle ligne\",\"enter-exit-label\":\"Entrez sortie Étiquette\",\"enter-exit-test-expression\":\"Entrer Quitter Expression test\",\"enter-image-content\":\"Entrez le contenu de l'image\",\"enter-ivr-number\":\"Si vous utilisez le contenu vocal, le remplacer par le code numérique que le respondant doit entrer pour sélectionner ce choix. (Vous pouvez laisser ce champ vide si l'arbre n'a pas de contenu vocal)\",\"enter-num-ratings\":\"Entrez le nombre de notes\",\"enter-number\":\"Entrez un nombre\",\"enter-number-of-days\":\"Entrez le nombre de jours\",\"enter-operator-queue-name\":\"Entrez le nom de l'opérateur de la file d'attente ici\",\"enter-primary-and-synonyms\":\"Entrez l'option principale et synonymes de chaque choix. Entrez chaque synonyme sur une nouvelle ligne.\",\"enter-primary-attribute\":\"Votre premier choix va sur cette ligne. Remplacer par les principales informations de ce choix ici. (Voir l'exemple d'un choix complété ci-dessous)\",\"enter-primary-attribute-title\":\"Remplacer par la description de l'information primaire pour les choix (par exemple « Nom de la clinique »)\",\"enter-program-id\":\"Entrez l'identifiant de programme\",\"enter-property-name\":\"Entrez le nom de la propriété\",\"enter-secondary-attribute\":\"Remplacer par les informations secondaires pour ce choix\",\"enter-secondary-attribute-title\":\"Remplacer par la description de l'information secondaire pour les choix (par exemple « Pays »)\",\"enter-secondary-attribute-title-2\":\"Remplacer par la description de l'information secondaire pour les choix (par exemple « heures de service »). Vous pouvez ajouter jusqu'à 10 peices d'informations secondaires en ajoutant des colonnes à droite.\",\"enter-sms-content\":\"Entrez le contenu de SMS ...\",\"enter-sms-text-here\":\"Entrez le texte SMS ici\",\"enter-social-content\":\"Entrez le contenu social\",\"enter-social-messaging-text-here\":\"Entrez le contenu de messagerie sociale ici\",\"enter-text-content\":\"Entrez le contenu du texte\",\"enter-ussd-content\":\"Entrez le contenu USSD ...\",\"enter-ussd-text-here\":\"Entrez le texte USSD ici\",\"enter-value\":\"entrer la valeur\",\"enter-video-content\":\"Entrer le contenu vidéo\",\"entered\":\"Entré\",\"entity\":\"Entité\",\"entity-selection-block-instructions\":\"Les contacts se sortir par la sortie « Succès » quand ils choisissent une entité. Si elles ne sont pas autorisés à se référer à des entités, ou si elles ne parviennent pas à sélectionner une entité ils sont pris par la sortie « d'échec ».\",\"equal-to\":\"Égal à\",\"error\":\"Erreur\",\"error-creating-transcription-task\":\"Erreur de création tâche de transcription.\",\"error-found\":\"erreur n'a été détectée\",\"error-importing-json\":\"Erreur Importation JSON!\",\"error-report\":\"Rapport d'erreur\",\"error-updating-transcription-task\":\"Erreur tâche de transcription mise à jour.\",\"error-uploading-file-try-again\":\"Il y avait une erreur de télécharger le fichier, s'il vous plaît essayer à nouveau ajout.\",\"error-while-attempting-to-publish-specified-tree\":\"Erreur lors de la tentative de publier l'arbre spécifié.\",\"error-while-downloading-template\":\"Une erreur s'est produite lors du téléchargement du fichier de modèle.\",\"error-while-saving-transcriptions\":\"Erreur lors de la sauvegarde des transcriptions.\",\"error-while-saving-tree\":\"Erreur lors de la sauvegarde arbre ...\",\"establish-connection\":\"établir une connexion\",\"example-tree\":\"exemple d'arbre\",\"examples\":\"Exemples\",\"exceeds\":\"dépasse\",\"excel-supported-format\":\"CSV supporté par Excel\",\"exit\":\"Sortie\",\"exit-block-tree-begins-here\":\"exécution arbre continuera ici lorsque la session est terminée unexpectely.\",\"exit-default\":\"Défaut\",\"exit-otherwise-through-default\":\"Dans le cas contraire, la sortie par défaut\",\"exit-through\":\"Sortez par\",\"exit-to-another-output\":\"Sortir vers une autre sortie\",\"exit-when\":\"Quand\",\"expires-after\":\"Expire après\",\"expires-on\":\"Expire le\",\"export-date-time-format\":\"Exporter au format Date / Heure\",\"export-results-to-csv\":\"Exporter les résultats au format CSV\",\"export-transcriptions\":\"Export transcriptions\",\"export-tree-json\":\"Arbre Export JSON\",\"export-using-current-time-zone\":\"Exporter en utilisant fuseau horaire\",\"export-using-utc\":\"Exporter à l'aide UTC\",\"export-using-utc-with-subscriber-phone-number\":\"Exporter à l'aide UTC avec contact Numéro de téléphone\",\"expression-branch-description\":\"Ce bloc vérifie l'expression ( « Quand ») pour chaque sortie afin de déterminer quelle sortie utiliser.\",\"failed\":\"Echec\",\"failed-finding-matches\":\"Échec pour trouver des correspondances!\",\"failure\":\"Échec\",\"false\":\"Faux\",\"february-month\":\"février\",\"feedback-message\":\"Message Commentaire\",\"field\":\"Champ\",\"field-deleted-since-configuring-this-block\":\"Le contact de la propriété a été supprimé depuis la configuration de ce bloc. S'il vous plaît supprimer cette configuration.\",\"file-details\":\"Détails du fichier\",\"filesize\":\"Taille du fichier\",\"fill-out-template-instruction\":\"Remplissez le modèle avec vos résultats d'arbres\",\"fill-out-template-instruction-1\":\"remplir avec des rangées de données en correspondance avec les têtes de colonnes de la matrice. Chaque ligne est un résultat unique arbre\",\"fill-out-template-instruction-2\":\"Vous ne pouvez pas ajouter de nouvelles colonnes dans votre fichier pour créer de nouveaux blocs. Modifier l'arbre pour faire ces changements\",\"fill-out-template-instruction-3\":\"Le format de la date d'appel doit être AAAA-MM-JJ\",\"fill-out-template-instruction-4\":\"Le format de l'appel Heure de départ devrait être HH: MM: SS\",\"fill-out-template-instruction-5\":\"Pour la « Sélection multiple Question à choix multiples Bloc » vous devez séparer les options choisies par « ; »\",\"filter-block-content\":\"contenu du bloc de filtre ...\",\"filter-by-block\":\"Filtrer par blocs\",\"filter-by-date\":\"Filtrer par date\",\"filter-by-directory-selection\":\"Filtrer par blocs Répertoire de sélection\",\"filter-by-tag\":\"Filtrer par tags:\",\"filter-enabled\":\"filtre activé\",\"filter-instructions\":\"Sélectionnez les peices d'information doivent être utilisés comme filtres lors de l'affichage des résultats.\",\"filter-validation\":\"Validation Filtre\",\"filters\":\"filtres\",\"filters-saved\":\"configurations de filtres enregistrés\",\"find-matches\":\"Trouver les correspondances\",\"first-time-subscribers\":\"Contacts pour la première fois\",\"fix-validation-errors-before-publishing\":\"Correction des erreurs de validation avant publication\",\"fixed-date\":\"Date fixe\",\"flag-this-recording-as-either\":\"Signaler ce enregistrement inaudibles ou vide\",\"flagged-as-flagtype\":\"Signalé comme :flag_type - cliquez sur le bouton ci-dessus pour annuler.\",\"flagged-as-inaudible-or-empty\":\"Signalé comme inaudible ou vide - utilisez les boutons ci-dessus pour undo\",\"floip-cleared\":\"Configuration effacée.\",\"floip-expressions-escape-with-double-at-symbol\":\"Si vous avez l'intention d'insérer un littéral <code> @ </ code> symbole, en utilisant <code> @@ </ code> se traduira par un seul caractère en sortie.\",\"floip-instructions-1\":\"Viamo est membre de l'Initiative d'interopérabilité de flux, ce qui permet l'échange de données homogène à travers la participation des systèmes logiciels de ICT4D.\",\"floip-instructions-2\":\"Pour activer la diffusion sécurisée des résultats de cet arbre à un flux de données de résultats Aggregator, entrez l'URL de base et l'authentification par jeton de l'agrégateur.\",\"floip-sync-success\":\"Votre arbre Viamo est permis de diffuser des réponses au flux Résultats aggrégateur.\",\"floip-sync-warning\":\"Votre arbre Viamo n'est pas permis de diffuser des réponses au flux Résultats aggrégateur. Établir une connexion à l'agrégateur pour permettre le streaming.\",\"flow-view\":\"Arborescence\",\"for-a-given-subscriber-custom-data-category\":\"Pour un contact donné, si la propriété ou d'une catégorie de données personnalisée suivante a la valeur ci-dessous, allez dans « True ». Sinon, passez à « Faux ».\",\"for-a-given-subscriber-go-to-true-false\":\"Pour un contact donné, si la propriété suivante ou catégorie de données personnalisée a la valeur ci-dessous, allez sur True. Sinon, passez à False.\",\"for-assistance\":\"pour obtenir de l'aide\",\"for-example-to-assign-the-first-hundred-audio-responses-to-a-transcriber\":\"Par exemple, pour attribuer les cent premières réponses audio à un transcripteur, réglez le « Start A » valeur 1 et la valeur « End A » à 100. Pour la prochaine transcripteur, vous pouvez alors commencer à 101 et se termine à 200, et bientôt.\",\"for-the-best-user-experience\":\"Pour une meilleure expérience utilisateur, fournissez une invite audio qui dit,\",\"for-this-block\":\"pour ce bloc.\",\"fri\":\"Ven.\",\"friday-day\":\"Vendredi\",\"from-block-input\":\"A partir de l'entrée du bloc\",\"from-import\":\"de l'importation\",\"generate-code-title\":\"Générer titre de code\",\"generate-csv-file\":\"Générer un fichier CSV\",\"generate-shareable-link\":\"Générer un lien partageable\",\"generating-data-from-past-calls\":\"Génération de données à partir des appels passés\",\"get-shareable-link\":\"Obtenir un lien partageable\",\"go-to-lang-selector-interface\":\"Aller à l'interface Sélecteur de Langue\",\"go-to-true-or-false\":\"... aller à Vrai. Sinon, aller à Faux\",\"go-to-true-otherwise-go-to-false\":\"... allez à 'True'. Sinon, passez à « Faux ».\",\"go-to-true-output-if-contact-language-is\":\"Aller à la sortie « Vrai » si le langauge du contact est\",\"greater-than\":\"Plus grand que\",\"group\":\"groupe\",\"group-is-larger-than\":\"groupe est plus grand que\",\"group-label\":\"Groupe:\",\"group-not-set\":\"Groupe non établi\",\"groups\":\"Groupes\",\"has-already-been-published\":\"a déjà été publié\",\"has-been-successfully-published\":\"a été publié avec succès\",\"has-value\":\"a une valeur\",\"header-validation\":\"La valeur ':dataValue' n'est pas un :dataHeader valide\",\"header-validation-missing\":\"La colonne ':columnName' est manquante\",\"heading-exit\":\"Sortie\",\"headings\":\"rubriques\",\"headings-format\":\"Format rubriques\",\"heres-what-we-know\":\"Voici ce que nous savons:\",\"hide-instruction\":\"Cacher les instructions\",\"hide-phone-numbers\":\"Cacher les numéros de téléphone\",\"hide-question-titles\":\"Cacher titres Question\",\"hide-subscriber-id\":\"Masquer Contact ID\",\"high-winds\":\"Vents forts\",\"histogram-of-percentage-listened\":\"Histogramme de % écouté\",\"home\":\"Accueil\",\"how-to-import-tree-results\":\"Comment les résultats d'importation arbres\",\"human-readable\":\"Lisible par l'homme\",\"hung-up\":\"Raccroché\",\"i-have-translated-my-choices\":\"J'ai traduit mes choix\",\"if\":\"Si\",\"if-a-respondent-has-already-started-this-tree-but-not-finished\":\"Si un répondant a déjà commencé cet arbre mais ne l'a pas fini, reprenez là où il s'était arrêté.\",\"if-all-following-true\":\"Si toutes les conditions suivantes sont remplies\",\"if-all-of-the-following-are-true\":\"Si toutes les conditions suivantes sont remplies\",\"if-any-following-true\":\"Si l'une des conditions suivantes est vraie\",\"if-any-of-the-following-are-true\":\"Si l'une des conditions suivantes sont remplies\",\"if-at-least\":\"Si au moins\",\"if-at-least-this-many-following-true\":\"Si au moins les éléments suivants sont vraies\",\"if-at-least-this-many-of-the-following-are-true\":\"Si au moins les éléments suivants sont vraies ...\",\"if-b-all-b-of-the-following-are-true-go-to-true\":\"Si <b> tous </b> des éléments suivants sont vrais, allez sur True.\",\"if-cfq-block-has-x-ratings\":\"Si les déclarations de « :blockTitle » ont :targetRatio évaluations ...\",\"if-in\":\"Si dans\",\"if-not-in\":\"En cas de non\",\"if-subscriber-custom-data\":\"En cas de contact de données personnalisées,\",\"if-subscriber-language-is\":\"Si le contact est Langue\",\"if-subscriber-language-is-unknown\":\"Si l'abonné est la langue « [Inconnu] »\",\"if-subscriber-start-date-is\":\"En cas de contact Date de début est\",\"if-symbols-are-used-then-reflect-in-filename\":\"Si les symboles sont utilisés, cela doit se refléter dans le nom du fichier.\",\"if-the-number-of-subscribers-in-the\":\"Si le nombre de contacts dans le\",\"if-the-subscriber-is\":\"Si le contact est\",\"if-the-value-is\":\"Si la valeur est\",\"if-youd-like-to-repeat-msg-press-2\":\"Si vous souhaitez répéter ce message, appuyez maintenant sur 2.\",\"import-done\":\"Importation effectuée\",\"import-export\":\"Importer / Exporter\",\"import-failed\":\"Échec de l'importation pour\",\"import-file\":\"Importer le fichier\",\"import-file-instruction\":\"Faites glisser le fichier ou cliquez sur le bouton Fichier Importer un fichier CSV et sélectionnez le modèle enregistré\",\"import-in-progress\":\"Importation en cours\",\"import-new-results\":\"Résultats d'importation Nouveaux\",\"import-results\":\"Résultats d'importation arbres\",\"import-status\":\"Etat de l'importation\",\"import-tree\":\"Importer l'arbre\",\"import-tree-json\":\"Importer un fichier JSON pour l'arbre (*.json)\",\"importing\":\"importation\",\"importing-file\":\"importation du fichier\",\"in-progress\":\"En cours\",\"in-the-following-group\":\"Dans le groupe suivant\",\"inactive-do-not-receive-outgoing-calls\":\"Inactif (Ne pas recevoir les appels sortants)\",\"inaudible\":\"Inaudible\",\"include-calls-from\":\"Inclure les appels provenant de \",\"include-in-summary\":\"En récapitulant\",\"infinite-loops-detected-please-edit-before-sending\":\"Détectées boucles infinies. S'il vous plaît modifier avant d'envoyer\",\"infinite-loops-exist\":\"Boucles infinies existent\",\"input\":\"Contribution\",\"input-help\":\"Ce bloc vérifie que le code est valide en utilisant la réponse d'une question précédente. Sélectionnez quelle question à utiliser.\",\"input-required\":\"Entrée Requise\",\"instructional-text-optional\":\"Texte pédagogique (facultatif)\",\"interactions\":\"interactions\",\"internal-notes\":\"Notes internes\",\"internal-notes-optional\":\"Notes internes (facultatif)\",\"invalid\":\"Invalide\",\"invalid-content-type\":\"Type de contenu non valide: Le fichier est pas reconnu comme .csv\",\"invalid-csv\":\"CSV non valide: Le fichier n'a pas pu étre traité comme un fichier .csv valide\",\"invalid-entry\":\"Entrée invalide.\",\"invalid-pattern\":\"motif non valide!\",\"invalid_startingblock_key\":\"S'il vous plaît définir un bloc de départ pour votre arbre\",\"is\":\"est\",\"is-complete\":\"est complet\",\"is-private-not-reversible\":\"Ce paramètre ne peut être modifiée après un arbre est publié avec cette option activée\",\"issue-trackers\":\"Suivi de problèmes\",\"ivr-content\":\"Contenu de messagerie Rich\",\"january-month\":\"janvier\",\"july-month\":\"juillet\",\"june-month\":\"juin\",\"key-metrics\":\"Indicateurs clés\",\"key-press\":\"Appuyez sur la touche\",\"label\":\"Étiquette\",\"label-is-already-in-use\":\"L'étiquette est déjà utilisé\",\"language\":\"Langue\",\"language-options\":\"options de langue\",\"language-selection-prompt\":\"Invite à une sélection de langue\",\"language-selector\":\"Sélecteur de langue\",\"language-selector-for-this-call\":\"Sélecteur de langue pour cet appel\",\"language-selector-not-found\":\"Sélecteur de langue non trouvé\",\"language-x-csv-file\":\"Fichier CSV :language\",\"languages\":\"Langues\",\"languages-have-not-been-enabled\":\"Les langues ne sont pas permises\",\"last-edited\":\"Dernière modification\",\"last-edited-on-this-date\":\"Dernière modification à cette date\",\"last-saved-at\":\"Dernier enregistrement à\",\"lat\":\"Lat:\",\"latest-message-for-user-groups\":\"Dernier message pour tous les groupes de contact\",\"latin-languages\":\"Langues latines\",\"learn-more-about-viamo-by-visiting\":\"En savoir plus sur Viamo en visitant :viamo_link, ou :sign_in_link\",\"less-than\":\"Moins de\",\"let-users-repeat\":\"Laisser les utilisateurs répéter le message\",\"letters-only\":\"Lettres seulement\",\"library\":\"Bibliothèque\",\"load-more-subscribers\":\"Afficher plus de contacts\",\"loading\":\"Chargement...\",\"loading-average-call-durations\":\"Chargement durée moyenne des appels\",\"local-currency\":\"Monnaie locale\",\"local-time-is-utc\":\"L'heure locale est UTC\",\"location\":\"Localité\",\"location-selector\":\"Sélecteur de Localisation\",\"lock\":\"Vérouiller\",\"lock-the-date-range-to-the-dates-above\":\"Verrouillez la plage de dates aux dates ci-dessus\",\"locked\":\"Vérouillé\",\"logic\":\"Logique\",\"lon\":\"Lon:\",\"machine-readable\":\"Lisible par machine\",\"machine-readable-format\":\"Format lisible par machine\",\"make-new-subscriber\":\"Faire un nouveau contact avec le même numéro de téléphone\",\"manage-queues\":\"Gérer Queues ...\",\"manage-responses\":\"Gérer les réponses\",\"manage-statements\":\"gérer déclarations\",\"manage-transcriptions\":\"Gérer Transcriptions\",\"march-month\":\"Mars\",\"mark-call-as-complete\":\"Marquer l'appel comme étant Effectué\",\"max-amount\":\"Quantité maximale\",\"max-code-issue\":\"Limiter le nombre de codes\",\"max-days\":\"maximum de jours\",\"max-duration-in-seconds\":\"Durée maximale (secondes)\",\"max-response-characters\":\"Caractères de réponse maximum\",\"max-length\":\"Longueur maximale\",\"max-number-of-repeats\":\"Nombre maximum de Répétitions\",\"maximum-number-of-response-digits\":\"Nombre maximal de chiffres pour la réponse\",\"maximum-record-duration\":\"Durée enregistrement maximum\",\"maximum-value\":\"Valeur maximale\",\"maximum-value-(inclusive)\":\"Valeur maximale (inclus)\",\"may-month\":\"Mai\",\"mcq-response-format\":\"Format Réponse MCQ \",\"merge-all-calls-from-same-subscriber\":\"Fusionner tous les appels de même contact\",\"merge-incomplete-calls-from-the-same-subscriber\":\"Fusionner les appels incomplets du même contact\",\"merge-only-resumed-calls\":\"Fusionner seulement les appels repris\",\"merge-options\":\"Options de fusion\",\"message\":\"Message\",\"message-block-values\":\"Valeur du message bloc\",\"message-blocks-only\":\"Blocs de message uniquement\",\"message-details\":\"Détails du message\",\"message-title\":\"Titre du message\",\"method\":\"Méthode\",\"min-amount\":\"Montant minimal\",\"min-length\":\"Longueur minimale\",\"minimum-value\":\"Valeur minimale\",\"minimum-value-(inclusive)\":\"Valeur minimale (y compris)\",\"minutes\":\"minutes\",\"modified\":\"(Modifié)\",\"modify-subscriber\":\"Modifier le contact\",\"modify-subscriber-active-status-to\":\"Modifier contact Statut actif\",\"modify-subscriber-preferred-content-type-for\":\"Modifier le type de contenu préféré contacter pour\",\"modify-subscriber-start-date-to\":\"Modifier la date de début de contact\",\"modify-subscribers-start-date-to-absolute-date-here\":\"Modifier les contacts date de début à ce jour absolu ici\",\"mon\":\"Lun.\",\"monday-day\":\"Lundi\",\"month\":\"mois\",\"monthly\":\"Mensuel\",\"months-after\":\"mois après\",\"months-before\":\"mois avant\",\"more\":\"Plus\",\"more-options\":\"Plus d'options\",\"more-than\":\"Plus que\",\"most-active-blocks\":\"La plupart des blocs actifs\",\"most-recent-published-version\":\"La version la plus récente publiée\",\"most-recent-version\":\"La version la plus récente\",\"most-recent-version-of\":\"La version la plus récente de\",\"mostly\":\"La plupart\",\"msmcq-description-p1\":\"Pour les canaux en mode texte comme SMS, USSD et messagerie sociale: définir une seule lettre (A-Z) comme synonyme de chaque choix en utilisant le choix menu d'options.\",\"msmcq-description-p2\":\"Les contacts peuvent par exemple répondre: « abc » pour sélectionner 3 choix configurés avec synonyme « a », « b » et « c ». Synonyme doit être réglé et doit être unique par choix. La même synonyme peut être utilisé pour même choix dans les différentes langues activées.\",\"msmcq-description-p3\":\"Pour la voix, réglez la presse touche vocale pour chaque choix dans le choix menu d'options. Les contacts peuvent par exemple appuyer sur « 123 » pour sélectionner 3 choix.\",\"multiple-choice-question\":\"Question à Choix Multiples\",\"multiple-select-multiple-choice-question\":\"Sélection multiple Question à choix multiples\",\"name\":\"Nom\",\"never\":\"Jamais\",\"new-contact-created\":\"Nouveau contact créé\",\"new-edits-click-save\":\"De nouvelles modifications - cliquez sur « Enregistrer » à nouveau avant de continuer.\",\"new-exclamation\":\"Nouveau!\",\"new-issue-tracker\":\"Nouveau Suivi de problèmes\",\"new-property\":\"nouvelle propriété\",\"new-subscriber-value\":\"Nouvelle valeur de contact\",\"new-transcription-task\":\"Nouvelle transcription Tâche\",\"new-transcription-task-created\":\"Nouvelle tâche de transcription créé!\",\"new-transcription-tasks-generated\":\"Les nouvelles tâches de transcription générés!\",\"new-tree\":\"Nouvel arbre\",\"new-tree-created\":\"Nouvel arbre créé!\",\"new-version\":\"Nouvelle version\",\"new-version-created\":\"Nouvelle version créée!\",\"newest\":\"Plus Récent\",\"newest-to-oldest\":\"Récent au plus ancien\",\"next\":\"Prochain\",\"no\":\"Non\",\"no-action-selected\":\"(Aucune action sélectionnée)\",\"no-admin-file-yet-filters\":\"Téléchargez le fichier CSV maître à définir des filtres\",\"no-admin-file-yet-selection-confirmation\":\"Téléchargez le fichier CSV master pour régler la confirmation de sélection\",\"no-audio-files-found-for-X\":\"Aucun audio trouvé pour\",\"no-audio-files-found-in-organisation\":\"Aucun fichier audio trouvé dans l'organisation\",\"no-audio-yet\":\"Pas encore d'audio\",\"no-blocks-for-content\":\"Il n'y a pas de blocs pour remplir le contenu sur.\",\"no-blocks-found-for-tree-with-identifier\":\"Aucun bloc n'a été trouvée pour l'arbre avec identifiant\",\"no-change\":\"Pas de changement\",\"no-choice-selected\":\"Pas de choix sélectionné\",\"no-choices-added\":\"Aucun choix ajouté.\",\"no-choices-yet-please-specify\":\"Pas encore de choix - Veuillez d'abord indiquer vos choix  dans la barre latérale\",\"no-choices-yet-please-specify-your-choices-first-in-the-sidebar\":\"Pas de choix pour le moment. Précisez votre\",\"no-clipboard-content-yet\":\"Aucun Clipboard encore\",\"no-content-blocks\":\"Aucun contenu de bloc!\",\"no-content-blocks-to-populate-content-onto\":\"Il n'y a pas de blocs pour remplir le contenu sur.\",\"no-content-types-enabled\":\"Aucun type de contenu activé.\",\"no-credit\":\"Pas de crédit\",\"no-csv-exports-for-these-results-have-been-created-yet\":\"Aucune exportation CSV pour ces résultats n'ont été créée\",\"no-data\":\"Pas de données\",\"no-directory-selection-blocks\":\"cet arbre n'a pas de blocs de sélection de répertoire\",\"no-groups-created-yet\":\"Aucun groupe créé pour l'instant ou vos groupes ont aucun contact.\",\"no-labels-or-tags\":\"Aucune étiquette ou des étiquettes\",\"no-languages-enabled\":\"Aucune langue n'est encore activée pour cet arbre.\",\"no-languages-enabled-on-the-tree\":\"Pas de langues activées pour l'arbre\",\"no-matches-found\":\"Aucun résultat!\",\"no-messages-created-yet\":\"Aucun message créé.\",\"no-number-of-audio-files-per-task-supplied\":\"Pas nombre de fichiers audio par tâche fourni.\",\"no-operator-contact-lists-made-yet\":\"Aucune liste de contacts de l'opérateur n'a encore été faite.\",\"no-preferred-channel-selected\":\"Vous ne l'avez pas sélectionné un canal préféré. S'il vous plait sélectionner en un\",\"no-preferred-language\":\"Aucune langue préférée\",\"no-question-selected\":\"Aucune question sélectionnée\",\"no-question-text-provided\":\"Non Question Texte fourni\",\"no-result-for-the-selected-filters\":\"Aucun résultat pour les filtres sélectionnés.\",\"no-results-for-this-block-yet\":\"Pas encore de résultat pour ce bloc.\",\"no-results-not-sent-yet\":\"(Aucun résultat - non encore envoyé)\",\"no-results-yet\":\"Désolé, il n'y a pas encore des résultats.\",\"no-shareable-links-have-been-created-yet\":\"Aucun lien partageable n'a pas encore été créé.\",\"no-sms-content-yet\":\"Pas de contenu SMS encore\",\"no-social-content-yet\":\"Aucun sociale encore\",\"no-subscriber-field-type-map-coordinates\":\"Vous ne disposez pas d'un champ de contact de type « Carte Coordonnées ». Ce champ de contact est nécessaire pour stocker l'emplacement du contact.\",\"no-surveys-created\":\"Aucune enquête créée pour l'instant.\",\"no-tag-found\":\"Aucune identification trouvée\",\"no-tagged-blocks\":\"cet arbre n'a pas de blocs marqués\",\"no-tree-found-with-identifier\":\"Aucun arbre trouvé avec identifiant\",\"no-trees-created-yet\":\"Aucun arbre créé.\",\"no-trees-have-been-created-yet\":\"Aucun arbre n'a encore été créé\",\"no-ussd-content-yet\":\"Pas de contenu USSD encore\",\"no-validation\":\"aucune validation\",\"no-value\":\"Aucune valeur\",\"none-selected\":\"(Aucune sélection)\",\"normalize\":\"Normaliser\",\"normalize-chart-results\":\"Normaliser les graphiques des résultats\",\"not\":\"ne pas\",\"not-available\":\"Indisponible\",\"not-created-any-language-selectors-yet\":\"Vous n'avez pas encore créé de sélecteurs de langue.\",\"not-equal-to\":\"Pas égal à\",\"not-found\":\"Pas trouvé\",\"not-in-the-following-group\":\"N'est pas dans le groupe suivant\",\"not-launched-yet\":\"Pas encore lancé\",\"not-set\":\"pas encore défini\",\"november-month\":\"novembre\",\"now\":\"Maintenant\",\"num-ratings-per-statement\":\"Nombre d'évaluations par relevé\",\"num-ratings-that-each-statement-should-receive\":\"Le nombre de notes que chaque déclaration doit recevoir.\",\"number\":\"Nombre\",\"number-of-calls-in-date-range\":\"Nombre d'appels dans l'intervalle de dates\",\"number-of-calls-in-the-last\":\"Nombre d'appels lors des derniers\",\"number-of-choices\":\"Nombre de choix\",\"number-of-exits\":\"Nombre de sorties\",\"number-of-outputs\":\"Nombre de sorties:\",\"number-of-people-who-ended-at-this-block\":\"Nombre de personnes qui ont fini à ce bloc\",\"numbers-alphabet\":\"Alphanumeric\",\"numbers-only\":\"Chiffres uniquement\",\"numeric-average\":\"Moyenne numérique\",\"numeric-block-title\":\"Titre du bloc numérique\",\"numeric-branch\":\"Branchement Numérique\",\"numeric-quesion-block\":\"question bloc numérique\",\"numeric-question\":\"question numérique\",\"occurrences\":\"occurrences\",\"october-month\":\"octobre\",\"of\":\"de\",\"of-following-true\":\"... des conditions suivantes sont remplies\",\"of-the-following-are-true\":\"des affirmations suivantes sont vraies\",\"of-the-following-are-true-go-to-true\":\"des conditions suivantes sont remplies, allez sur True.\",\"offline\":\"Hors ligne\",\"offline-content\":\"Lecture audio\",\"oldest-to-newest\":\"Le plus ancien au plus récent\",\"on\":\"Sur\",\"on-line\":\"en ligne\",\"one-output-for-all-choices\":\"Une sortie pour tous les choix\",\"only-accepts-word-characters\":\"accepte uniquement des caractères de mot\",\"only-display-latest-interaction-if-multiple-interactions-exist-for-the-same-session-and-block\":\"afficher uniquement la dernière interaction si plusieurs interactions existent dans la même session pour le même bloc. Ne cochez pas si tous les résultats doivent être affichés.\",\"only-question-blocks\":\"Seuls les blocs question\",\"open-block-with-voice-set-sub-prop-warning\":\"À composition non limitée des réponses vocales ne sont pas en mesure de propriétés de contact ensemble en ce moment.\",\"open-ended-audio-export-ready\":\"L'exportation audio ouverte prêt\",\"open-ended-question\":\"Question Ouverte\",\"open-ended-responses\":\"Les réponses ouvertes\",\"open-external-link\":\"Ouvrir un lien externe\",\"open-in-new-window\":\"Ouvrir dans une nouvelle fenêtre\",\"open-link\":\"Ouvrir le lien\",\"open-link-in-new-window\":\"Ouvre le lien dans une nouvelle fenêtre\",\"operator-contact-list\":\"liste de contacts opérateur\",\"operator-queue-name\":\"Opérateur File d'attente\",\"operators\":\"les opérateurs\",\"optional-description\":\"Description facultative\",\"optionally-you-can-create-loop-back\":\"En option, vous pouvez créer des connexions à « boucle de retour » à ce bloc de branche aléatoire, si vous voulez des contacts pour atteindre tous les blocs connectés ci-dessous dans un ordre aléatoire. Après chaque option a été atteint, le bloc peut soit poursuivre au hasard, ou, il peut « sortie » à une sortie distincte.\",\"options\":\"Options\",\"or\":\"ou\",\"order\":\"Ordre\",\"order-by\":\"Commandé par:\",\"order-of-components-dont-matter-but-must-be-adjacent-one-another\":\"L'ordre de ces composants n'importe, mais ils doivent être adjacents les uns aux autres.\",\"order-of-results\":\"Ordre des résultats\",\"organization-not-found-with-api-key\":\"Impossible de trouver l'organisation avec cette clé API.\",\"original-file\":\"fichier original\",\"original-quality\":\"Qualité originale\",\"originally\":\"Initialement\",\"outgoing-calls\":\"Les appels sortants\",\"output\":\"Production\",\"output-branching\":\"Branchement de sortie\",\"output-clipboard\":\"Clipboard\",\"output-connected\":\"Lié\",\"output-error\":\"Erreur\",\"output-exit\":\"Sortie\",\"output-expression\":\"expression de sortie\",\"output-failed\":\"Échoué\",\"output-false\":\"Faux\",\"output-not-met\":\"Pas rencontré\",\"output-quota-met\":\"Quota rencontré\",\"output-sms\":\"SMS\",\"output-true\":\"Vrai\",\"output-ussd\":\"USSD\",\"output-voice\":\"Voix\",\"outputs\":\"Les sorties\",\"partly\":\"Partiellement\",\"password\":\"Mot de passe\",\"pattern-not-provided-for-tree\":\"Motif non prévu pour l'arbre\",\"pause\":\"Pause\",\"percent-of-audio-listened\":\"Pourcentage de l'audio écouté\",\"percent-of-the-content-provided\":\":count % du contenu fourni\",\"phone\":\"Téléphone\",\"phone-number\":\"Numéro de téléphone\",\"phone-quality\":\"Qualité téléphone\",\"phone-recording\":\"enregistrement téléphonique\",\"pick-a-date-range-to-display-block-interaction-totals\":\"Choisissez une plage de dates pour afficher les totaux d'interaction bloc\",\"plain-input\":\"entrée simple\",\"play\":\"Jouer\",\"play-audio\":\"Lecture audio\",\"please-fix-the-validation-errors-in-this-tree-before-publishing\":\"Corrigez les erreurs de validation dans cet arbre avant\",\"please-provide-numeric-codes\":\"Veuillez fournir des codes numériques\",\"please-provide-valid-start-and-end-numbers\":\"S'il vous plaît fournir début valides et les numéros de fin.\",\"please-resolve-the-set-of-infinite-loops-before-sending-this-tree\":\"Reglez l'ensemble des boucles infinies\",\"please-select-a-numeric-question-block\":\"Veuillez sélectionner un bloc de questions numériques\",\"please-select-channel\":\"assurez s'il vous plaît que vous sélectionnez un canal préféré\",\"please-translate-choices\":\"S'il vous plaît traduire vos choix.\",\"please-try-again-or-contact\":\"Essayez encore une fois ou contactez\",\"precipitation-level\":\"précipitations Niveau\",\"press\":\"Pressez\",\"preview-file\":\"prévisualisation du fichier\",\"previous\":\"Précédent\",\"previous-exports\":\"exportations précédentes\",\"previous-imports\":\"Importations Précédentes\",\"primary-information-heading\":\"titre d'information primaire\",\"pro-tip\":\"Astuce Pro\",\"problem-connecting-api\":\"Problème de connexion à l'API.\",\"processing\":\"En cours de traitement...\",\"product-code\":\"Code produit\",\"program\":\"Programme\",\"program-help-generate-code-block\":\"Assurez-vous de définir le même programme dans le bloc de code Valider\",\"program-help-validate-code-block\":\"Utilisez le même programme que le bloc de code Générez\",\"prompt\":\"Rapide\",\"prompt-for-statement\":\"Demander déclaration\",\"prompts\":\"Instructions\",\"property\":\"Propriété\",\"property-configuration\":\"Configuration des propriétés\",\"property-not-supported\":\"Type non pris en charge\",\"protocol\":\"Protocole\",\"provide-a-language-selector-menu\":\"Fournir un menu de sélection de la langue pour les contacts de choisir leur langue\",\"provide-key\":\"Fournir une clé API\",\"provide-url\":\"Fournir une URL\",\"publish\":\"Publier\",\"publish-new-version\":\"Publier une nouvelle version\",\"publish-the-newest-version-of-this-tree\":\"Publier la nouvelle version de cet arbre\",\"publish-this-version-of-the-flow\":\"Publier cette version du flux\",\"published\":\"Publié!\",\"published-header\":\"Publié\",\"question\":\"Question\",\"question-and-message-blocks\":\"Questions et blocs message\",\"question-blocks-only\":\"Question blocs seulement\",\"question-prompt\":\"Invite de question\",\"question-responses\":\"Question Réponses\",\"question-title\":\"Titre de question\",\"quota-threshold\":\"Seuil\",\"rain\":\"Pluie\",\"random-branch\":\"Branchement aléatoire\",\"random-code\":\"Générer des codes aléatoires\",\"ready-to-send\":\"Prêt à envoyer\",\"receive\":\"Recevoir\",\"receive-outgoing-calls\":\"Recevoir des appels sortants\",\"received\":\"Reçu\",\"recipient-group\":\"Groupe bénéficiaire\",\"recommended\":\"conseillé\",\"recommended-export-format-settings\":\"Paramètres du format d'exportation recommandé\",\"record-group-message\":\"Record Group message\",\"record-group-message-title\":\"titre du message de groupe d'archives\",\"reject\":\"Rejeter\",\"relative-to-numeric-input\":\"Par rapport à l'entrée numérique\",\"relative-to-the-call-date\":\"Par rapport à la date d'appel\",\"reload\":\"Recharger\",\"remove\":\"Retirer\",\"remove-condition\":\"Supprimer la condition\",\"remove-file\":\"Effacer le fichier\",\"remove-filter-tags\":\"Retirer tous les tags\",\"remove-from\":\"Retirer\",\"remove-from-group\":\"Supprimer du groupe\",\"remove-question\":\"Supprimer la question\",\"removes-subscribers-from-the\":\"Supprime les contacts de la\",\"repeat\":\"Répéter\",\"repeat-every\":\"Répétez chaque\",\"repeat-questions\":\"questions répétées\",\"repeating\":\"Répétitif\",\"repeats\":\"répétitions\",\"replace\":\"Remplacer\",\"replace-existing-audio-files-on-blocks\":\"Remplacer les fichiers audio existants sur des blocs\",\"reset\":\"réinitialiser\",\"reset-all-filter\":\"Réinitialiser tous les filtres\",\"reset-all-filters\":\"Réinitialiser tous les filtres\",\"reset-breakdown-and-show-interactions\":\"Réinitialiser la répartition et montrer les interactions\",\"reset-breakdown-and-show-total-interactions\":\"Réinitialiser la répartition et montrer les totaux des interactions\",\"reset-filters\":\"Réinitialiser les filtres\",\"resolve-warnings-and-save-simulate-clipboard\":\"Résoudre les avertissements et sauver l'arbre à utiliser le simulateur Clipboard\",\"resource-view\":\"Visualisation des Ressources\",\"response\":\"Réponse\",\"response-timeout\":\"Délai de réponse\",\"responses\":\"Réponses\",\"responses-in-this-task\":\"Les réponses dans cette tâche\",\"responses-to-this-block-might-contain-personal-identifying-information\":\"Les réponses à ce bloc peuvent contenir des informations d'identification personnelle\",\"responses-to-this-block-will-be-hidden-from-users-without-permission-to-view-personal-information\":\"Les réponses à ce bloc seront cachés des utilisateurs sans l'autorisation d'afficher des informations personnelles.\",\"restored-title-version\":\"Restauré\",\"restored-tree\":\"Arbre restauré\",\"result-import\":\"Importation de résultats\",\"results\":\"Résultats\",\"results-listed-on-page\":\"Résultats listés sur la page\",\"resume-tree-for-partial-respondents\":\"Reprendre l'arbre pour une partie des répondants ?\",\"retain-only-most-recent-call-from-same-subscriber\":\"Ne conserver que les plus récent appel de même contact\",\"rich_messaging-content\":\"contenu hors-ligne\",\"rows\":\"Lignes\",\"rows-processed\":\"lignes traitées\",\"rule-components\":\"Règle de composants\",\"run-another-tree\":\"Exécutez un autre arbre\",\"runs-the-latest-version-of\":\"Exécuter la dernière version de\",\"runs-the-latest-version-of \":\"S'exécute la dernière version de\",\"sat\":\"Sam.\",\"saturday-day\":\"samedi\",\"save\":\"Sauvegarder\",\"save-and-continue\":\"Sauvegarder et continuer\",\"save-and-go-to-next-page\":\"Enregistrer et aller à la page suivante\",\"save-changes-to-the-flow\":\"Enregistrer les modifications au flux\",\"save-selection\":\"Enregistrer la sélection\",\"save-template-instruction\":\"Enregistrez le modèle sur votre ordinateur en tant que fichier CSV\",\"save-transcriptions\":\"Enregistrer transcriptions\",\"saved\":\"Enregistré\",\"saving\":\"Sauvegarde en cours ...\",\"saving-and-checking-for-errors\":\"Enregistrement et vérification des erreurs\",\"saving-transcriptions\":\"Transcriptions Sauvegarde en cours ...\",\"saving-tree\":\"Saving arbre ...\",\"schedule-and-send-an-outgoing-call\":\"Planifier et envoyer un appel sortant\",\"schedule-type\":\"Type de planification\",\"search-audio-library\":\"Recherche bibliothèque audio ...\",\"search-subscribers\":\"Rechercher des contacts\",\"secondary-information-headings\":\"rubriques d'information secondaires\",\"seconds\":\"secondes\",\"seconds-ago\":\"il y a quelques instants\",\"seconds-for-a-response\":\"Sécondes pour répondre\",\"seconds-for-response\":\"secondes pour la réponse\",\"see-error-report-instruction\":\"Voir les détails Report de Error ci-dessous, corriger l'erreur dans votre fichier CSV et télécharger à nouveau.\",\"see-more-versions\":\"Voir plus de versions\",\"see-your-notifications-inbox-for-the-download-link\":\"Consultez votre boite de notifications pour le lien de téléchargement.\",\"select-a\":\"Sélectionner un\",\"select-a-caller-from-the-list-below\":\"Sélectionnez un appelant de la liste ci-dessous\",\"select-a-candidate-block\":\"Sélectionnez un bloc candidat\",\"select-a-channel\":\"Sélectionnez un canal\",\"select-a-field\":\"Sélectionnez un champ\",\"select-a-property\":\"Sélectionnez une propriété\",\"select-a-question\":\"Sélectionnez une question\",\"select-a-tag\":\"Sélectionnez une identification (ou insérez dans une nouvelle identification) \",\"select-a-tag-placeholder\":\"Sélectionnez ou ajoutez une balise\",\"select-a-value\":\"Sélectionner une valeur\",\"select-all\":\"Sélectionner tout\",\"select-audio\":\"Sélectionnez audio\",\"select-block\":\"Sélectionnez un bloc\",\"select-data\":\"Sélectionnez les données\",\"select-from-audio-library\":\"Sélectionner à partir d'une bibliothèque audio\",\"select-group-message-to-play\":\"Sélectionnez Groupe message à la lecture\",\"select-groups\":\"Sélectionnez Groupes\",\"select-input-block\":\"bloc d'entrée Sélectionnez\",\"select-input-source\":\"Sélectionnez la source d'entrée\",\"select-languages-to-be-enabled-for-content-for-this-tree\":\"Sélectionnez les langues à activer pour le contenu des\",\"select-none\":\"Sélectionner aucun\",\"select-property-type\":\"Sélectionner le type de propriété\",\"select-provider\":\"Sélectionner un fournisseur\",\"select-queue\":\"Sélectionnez la file d'attente\",\"select-source\":\"Sélectionnez une source\",\"select-source-content\":\"Sélectionnez une source de contenu\",\"select-subscribers\":\"Sélectionnez les abonnés\",\"select-the-content-type-to-be-enabled-for-this-tree\":\"Sélectionnez le type de contenu à activer pour cet arbre\",\"select_at_least_1_property\":\"\",\"select_property_to_set\":\"\",\"selected\":\"choisi\",\"selected-groups\":\"Groupes sélectionnés\",\"selected-subscribers\":\"Les contacts sélectionnés\",\"selection-confirmation\":\"Confirmation de sélection\",\"selection-confirmation-instructions\":\"Pour le contenu vocal, le fichier audio spécifié dans le fichier CSV sera lu au contact après une sélection. Pour tous les autres types de contenu, sélectionnez les peices des informations qui doivent être renvoyés au contact ou désélectionner tous les champs pour renvoyer rien.\",\"selection-response-instructions\":\"\",\"send\":\"Envoyer\",\"send-on-date\":\"Envoyer à la date\",\"send-request-to-call-center\":\"Envoyer une demande à Call Center\",\"send-request-to-different-call-center\":\"Envoyer une demande à un centre d'appels d'org différents\",\"send-this-call-to\":\"Envoyer cet appel à ...\",\"send-tree\":\"Envoyer Arbre\",\"send-tree-ellipsis\":\"Envoyer arbre...\",\"sends-call-as-random-dial-campaign\":\"Lancer une campagne de numérotation aléatoire qui fonctionne sans arrêt jusqu'à ce que vous arrêtiez, ou un certain nombre de critères est atteint.\",\"sends-call-at-specified-time\":\"Envoie cet appel à des contacts à partir de la date et l'heure.\",\"sends-call-immediately\":\"Envoie l'appel à des contacts immédiatement.\",\"sends-call-repeating-based-on-options\":\"Envoie cet appel sur une base répéter, selon les options à droite.\",\"sensitive-data\":\"Données sensibles\",\"separate-output-for-each-choice\":\"Sortie séparée pour chaque choix\",\"september-month\":\"septembre\",\"sessions\":\"Sessions\",\"set-as-a-starting-block\":\"Définir comme un bloc de départ\",\"set-as-exit-block\":\"Définir comme bloc de sortie\",\"set-as-starting-block\":\"Définir comme bloc de départ\",\"set-channel-type\":\"Définir le type de canal\",\"set-choice-options\":\"Définir les options de choix\",\"set-custom-subscriber-data\":\"Ensemble de données de contact personnalisé\",\"set-preferred-channel-type\":\"Set canal préféré type\",\"set-preferred-content-type\":\"Définir le type de contenu préféré\",\"set-sub-prop-w-response\":\"Définir une propriété de contact avec la réponse du contact\",\"share-results\":\"Partager les résultats\",\"shareable-link-to-results-for-this-tree\":\"lien partageable aux résultats pour cet arbre\",\"shareable-links\":\"Liens partageables\",\"shortened-title-for-summary\":\"Titre Résumé Pour raccourcies\",\"shortened-title-for-summary-description\":\"Entrez un titre qui devrait être utilisé lors de l'examen du résumé des interactions avec ce bloc. Si laissé vide, le titre complet du bloc sera utilisé.\",\"should-ignore-offline-submissions\":\"Ignorer Soumissions Hors ligne\",\"should-redeem-code\":\"Code Mark utilisé\",\"show\":\"Spectacle\",\"show-all\":\"Afficher tout\",\"show-all-results\":\"Afficher tous les résultats\",\"show-between-the-following-dates\":\"Afficher entre les dates suivantes\",\"show-clipboard-simulator\":\"Clipboard simuler\",\"show-empty-only\":\"Afficher vide\",\"show-interactions\":\"#VALUE!\",\"show-key-metrics\":\"Montrer les indicateurs clés\",\"show-key-metrics-lower\":\"Afficher les indicateurs clés\",\"show-keymetrics-ajax-error\":\"Erreur indicateurs clés: S'il vous plaît assurer cet arbre existe encore ou essayez de recharger cette page.\",\"show-less-options\":\"Afficher moins d'options\",\"show-message-text\":\"Afficher un message texte\",\"show-more-options\":\"Afficher plus d'options\",\"show-percentage-listened\":\"pourcentage de l'écoute affiché\",\"show-results-from-incomplete-engagements\":\"Afficher les résultats de missions incomplètes\",\"show-stars\":\"Voir les étoiles\",\"show-subscriber-id\":\"Afficher le ID\",\"show-summary-metrics\":\"Metrics Masquer\",\"showing-block-content-filtered-by-X\":\"Affichage du contenu du bloc filtré par: filtre\",\"showing-entire-audio-library\":\"Afficher toute la bibliothèque audio\",\"shuffle-randomly-again\":\"Mélanger encore une fois aléatoirement\",\"sign-into-your-account\":\"connectez-vous à votre compte\",\"sms\":\"SMS\",\"sms-content\":\"Contenu SMS\",\"sms-content-not-set\":\"Contenu SMS non défini\",\"sms-disabled\":\"SMS désactivé\",\"sms-enabled\":\"SMS acftivé\",\"sms-prompt\":\"SMS rapide\",\"sms-responses\":\"Réponses SMS\",\"sms-status\":\"Statut SMS\",\"sms-subscribers-that-reached-this-block\":\"contacts SMS qui ont atteint ce bloc\",\"sms-to\":\"SMS à\",\"social\":\"Social\",\"social-messaging\":\"messagerie sociale\",\"social-messaging-content\":\"Contenu Messagerie sociale\",\"social-subscribers-that-reached-this-block\":\"Les contacts sociaux qui ont atteint ce bloc\",\"sorry\":\"Désolé!\",\"sorry-cannot-locate-the-selected-tree\":\"Désolé, ne peut pas localiser l'arbre sélectionné.\",\"sorry-there-are-no-results-for-this-date-range\":\"Désolé, il n'y a pas de résultats pour cette plage de dates.\",\"sorry-there-was-an-issue-trying-to-export-audio-for-tree\":\"Désolé, il y avait eu un problème en essayant d'exporter l'audio pour l'arbre\",\"sorry-we-cant-find-any-results-with-that-address\":\"Désolé, nous ne pouvons trouver aucun résultat avec cette adresse.\",\"sorry-you-don-t-have-permission-to-delete-this-tree\":\"Désolé, vous n'avez pas la permission de supprimer cet arbre.\",\"sorry-you-dont-have-permission-to-delete-this-tree\":\"Désolé, vous n'êtes pas autorisé à supprimer cet arbre.\",\"sort-by-date\":\"Trier par date\",\"sort-by-name\":\"Trier par nom\",\"source\":\"La source\",\"specific-language-used-this-call\":\"Une langue spécifique a utilisé cet appel\",\"specific-time\":\"Temps spécifique\",\"specify-what-should-happen-if-a-subscribers-language-is-unknown\":\"Indiquez ce qui doit se produire si est inconnu au moment d'une conversation téléphonique ou SMS langue d'un contact:\",\"start-at\":\"Commencer à\",\"start-date\":\"Date de début\",\"start-date-equal-to\":\"Date de début égale à\",\"start-date-greater-than\":\"Date de début supérieure\",\"start-date-less-than\":\"Date de début moins\",\"started-at\":\"Commencé à\",\"starting-block-tree-begins-here\":\"Bloc de départ - L'arbre commence ici\",\"starts\":\"débuts\",\"status\":\"Statut\",\"stock-code\":\"Code de stock\",\"subscriber\":\"contact\",\"subscriber-custom-data\":\"Données personnalisées de l'abonné\",\"subscriber-language\":\"Langue de l'abonné\",\"subscriber-prop-to-send-payload\":\"propriétés Abonné à envoyer en tant Payload\",\"subscriber-properties\":\"Propriétés de contact\",\"subscriber-properties-to-snapshot\":\"Propriétés de contact à Snapshot\",\"subscriber-property\":\"Caractéristique de l'abonné\",\"subscriber-property-to-branch-via\":\"Caractéristique de l'abonné\",\"subscriber-start-date\":\"Date de début de l'abonné\",\"subscriber-starting-date-reference\":\"Contacter Date de début Référence\",\"subscribers\":\"Contacts\",\"subscribers-that-reached-this-block\":\"Les contacts qui ont atteint ce bloc\",\"success\":\"Succès\",\"successfully-imported-result\":\"Importation de résultats avec succès\",\"summary-block-description\":\"Ce bloc est utilisé pour répondre aux questions d'examen qui sont inclus dans le résumé. Les utilisateurs du Presse-papiers sont en mesure de confirmer ou d'infirmer les réponses.\",\"sun\":\"Dim.\",\"sun-level\":\"Niveau du soleil\",\"sunday-day\":\"dimanche\",\"sunny\":\"Ensoleillé\",\"survey\":\"Sondage\",\"survey-details\":\"Détails de l'enquête\",\"switch-to-tree-view-to-add-blocks\":\"Passer à Arborescence pour ajouter des blocs\",\"system-generated\":\"système généré\",\"tag-filter-description\":\"plusieurs blocs question de choix qui ont été marqués peuvent être utilisés comme filtres sur le lien partagé. les choix pour les blocs avec une étiquette sont utilisés comme les options du filtre. sélectionner les balises doivent être utilisés comme filtres.\",\"tag-filters\":\"filtres tag\",\"tags\":\"Identification\",\"task-was-successfully-deleted\":\"La tâche a été supprimé avec succès!\",\"tell-me-more\":\"Nous dire un peu plus\",\"test-call\":\"test Call\",\"test-call-queued-at\":\"Appel d'essai mis en attente au\",\"test-call-request-sent\":\"demande d'appel de test envoyé ...\",\"text-responses\":\"Réponses textes\",\"text-responses-sms-ussd\":\"Réponses en texte (SMS / USSD)\",\"that-block-was-not-found-please-save-and-try-again\":\"Le bloc n'a pas été trouvé s'il vous plaît sauver l'arbre et essayez à nouveau\",\"that-collaborative-filtering-page-was-not-found-please-try-again\":\"Cette page filtrage collaboratif n'a pas été trouvé. Veuillez réessayer.\",\"that-tree-json-was-not-found-please-try-again\":\"Le fichier JSON de cet arbre n'a pas été trouvé. Veuillez réessayer\",\"that-tree-set-was-not-found-please-try-again\":\"Cet ensemble d'arbre n'a pas été trouvé. Veuillez réessayer.\",\"that-tree-was-not-found-please-try-again\":\"Cet arbre n'a pas été trouvé. Veuillez réessayer.\",\"the-contacts-x-property-will-be-set-using-block-input\":\"La propriété de :propertyName de contact sera réglée à l'aide de l'entrée au bloc sélectionné\",\"the-json-code-that-has-been-imported-is-invalid-or-can-not-be-parsed\":\"Le code JSON qui a été importé est invalide ou ne peut pas être analysé. <br> Examinez le code utilisé dans l'importation pour l'exhaustivité et la validité.\",\"the-property-will-be-set-to-x\":\"La propriété du contact sera réglé sur « :value »\",\"the-property-will-be-set-using-block-input\":\"La propriété du contact sera réglée à l'aide de l'entrée au bloc.\",\"the-remaining-tasks-are-visible-below\":\"Les tâches restantes sont visibles ci-dessous.\",\"the-response-from-the\":\"la réponse de la\",\"the-specified-tree-version\":\"La version d'arbre spécifiée\",\"the-transcription-set-was-not-found\":\"L'ensemble de la transcription n'a pas été trouvé. Veuillez réessayer.\",\"the-tree-version\":\"La version de l'arbre\",\"the-tree-version-x-was-deleted\":\"L'arbre :treeName de la version :treeVersion a été supprimé\",\"the-tree-x-was-deleted\":\"L'arbre :treeName a été supprimé.\",\"the-tree-x-was-restored\":\"L'arbre :nom de l'arbre a été restauré.\",\"then-callers-will-go-to-the-quota-met-output-if-not-callers-will-go-to-the-not-met-output\":\"puis les appelants\",\"there-are-no-results-yet-please-check-back-later\":\"Il n'y a pas encore aucun résultat. S'il vous plaît revenir plus tard.\",\"this-block-branches-based-on-type-of-the-recipient\":\"Ce bloc branche en fonction du type de contenu du destinataire. Les sorties sont déterminées en fonction du type de contenu de l'arbre lorsque le bloc est ajouté.\",\"this-block-directs-callers-based-on-the-total-number-of-calls-1\":\"Ce bloc dirige les appelants vers l'une des deux options, en fonction du nombre total d'appels dans la plage de dates spécifiée, soit uniquement pour cet arbre, soit pour tous les arbres de l'organisation entière.\",\"this-block-directs-callers-based-on-the-total-number-of-calls-2\":\"Si le nombre d'appels dans la plage de dates spécifiée est supérieur à la valeur 'Seuil de quota d'appels', les appelants accèdent à la sortie Quota Atteint. Sinon, les appelants iront à la sortie Non Atteint.\",\"this-block-directs-callers-based-on-the-total-number-of-subs-1\":\"Ce bloc dirige les appels vers l'une des deux options, en fonction du nombre total de contacts dans le groupe spécifié.\",\"this-block-directs-callers-based-on-the-total-number-of-subs-2\":\"Si le nombre de contacts du groupe est supérieure à la valeur « seuil de quota », puis les appelants vont au quota sortie Met. Sinon, les appelants vont à la sortie non atteint.\",\"this-block-directs-callers-based-on-their-answers\":\"Ce bloc dirige les appelants vers l'une des séries d'options, en fonction de leurs réponses aux questions numériques précédentes. Les résultats ci-dessous sont pris en considération du premier au dernier, et le premier à être vrai est utilisé.\",\"this-block-directs-callers-on-previous-answers\":\"Ce bloc dirige les appels vers l'une des deux options, selon les réponses précédentes aux questions à choix multiples.\",\"this-block-directs-callers-random\":\"Ce bloc dirige les appelants vers une sortie choisie au hasard.\",\"this-block-generates-the-weather-forecast-1\":\"Ce bloc génère le message de prévision météo.\",\"this-block-generates-the-weather-forecast-2\":\"Si une invite n'est pas activée, elle n'apparaîtra pas dans le message des prévisions météorologiques\",\"this-block-is-configured-by-the-referrals-app\":\"Ce bloc est configuré par l'application d'aiguillage.\",\"this-block-runs-the-destination-tree-1\":\"Ce bloc exécute l'arborescence de destination spécifiée ci-dessus, ce qui vous permet de créer des arbres imbriqués qui peuvent ensuite être joints lors de l'envoi de cette arborescence aux appelants.\",\"this-block-runs-the-destination-tree-2\":\"Une fois l'arborescence de destination terminée, l'appelant revient dans cet arbre et continue vers les blocs connectés en dessous de celui-ci.\",\"this-block-runs-the-destination-tree-3\":\"En choisissant l'option 'Version la plus récente', vous pouvez ensuite publier de nouvelles versions de l'arborescence de destination sans avoir à modifié cette arborescence.\",\"this-tree\":\"cet arbre\",\"this-tree-set\":\"Cet arbre\",\"three-components-used-to-create-assignment-rules-and-name-audio-files\":\"Il y a trois éléments qui peuvent être utilisés pour créer des règles d'affectation et nommer des fichiers audio.\",\"thunderstorms\":\"Des orages\",\"thurs\":\"Jeu.\",\"thursday-day\":\"Jeudi\",\"timeline\":\"Chronologie\",\"timeline-total-interactions\":\"Chronologie : Total des interactions\",\"times\":\"fois\",\"times-for-incorrect-responses\":\"temps pour les réponses incorrectes\",\"times-in-utc\":\"Les temps en UTC\",\"times-in-your-account-time-zone\":\"Les temps dans votre compte fuseau horaire\",\"timespan\":\"Période\",\"timezone\":\"Fuseau horaire\",\"title\":\"Titre\",\"to\":\"à\",\"to-attach-a-message-to-a-call\":\"Pour joindre un message à un appel,\",\"to-attach-a-survey-to-a-call\":\"Pour attacher une enquête à un appel,\",\"to-attach-a-tree-to-a-call\":\"Pour attacher un arbre à un appel,\",\"to-be-matched-to-tree\":\"être adapté à l'arbre\",\"to-send-call-to-only-some-subscribers\":\"Pour envoyer un appel à seulement quelques contacts\",\"toggle-to-auto-gen-content-from-block\":\"Bascule pour générer automatiquement le contenu du bloc Détails\",\"toggle-to-overwrite-auto-genned-content\":\"Bascule pour écraser le contenu généré automatiquement\",\"toggles-subscriber-receiving-outgoing-calls\":\"Cette action permet d'activer ou de désactiver le contact de recevoir des appels sortants.\",\"too_many_languages_for_collaborative_filtering\":\"Langues Too Many\",\"too_many_languages_for_collaborative_filtering_description\":\"Le filtrage collaboratif est valable uniquement sur les arbres qui ont une langue activée. S'il vous plaît activer une langue unique pour l'arbre.\",\"total\":\"Total\",\"total-audio-length\":\"Longueur totale Audio\",\"total-interactions\":\"total des interactions\",\"total-open-ended-responses\":\"Total des réponses ouvertes\",\"total-responses\":\"Réponses totales\",\"total-results\":\"Total des résultats\",\"total-sms-responses\":\"Réponses totales des SMS\",\"total-versions\":\"Total des versions\",\"total-voice-responses\":\"Réponses totales voix\",\"totals\":\"Totaux\",\"transcription-task-successfully-updated\":\"Tâche de transcription à jour avec succès!\",\"transcription-tasks-can-be-sent-out-to-external-transcribers-to-easily-transcribe-open-ended-audio-responses\":\"Tâches de transcription peuvent être envoyés à transcripteurs externes, de retranscrire facilement les réponses audio ouvertes de cet arbre. Vous pouvez générer automatiquement plusieurs tâches de transcription en utilisant le formulaire ci-dessous, ou, utilisez le bouton « Nouvelle transcription des tâches » ci-dessus pour créer des tâches individuelles\",\"transcriptions\":\"Transcriptions\",\"transcriptions-saved\":\"Transcriptions sauvé\",\"transcriptions-saved-continuing-to-next-page\":\"Transcriptions sauvé! Continuer à la page suivante ...\",\"transfer-amount\":\"Montant au transfert\",\"transfer-amount-currency\":\"Devise à utiliser\",\"transferto-cross-border-mobile-payments\":\"TransferTo Transfrontaliers des paiements mobiles\",\"tree\":\"Arbre\",\"tree-could-not-be-published\":\"Arbre ne peut pas être publié\",\"tree-deleted\":\"Arbre Effacé!\",\"tree-details\":\"Détails sur l'arbre\",\"tree-does-not-have-any-blocks-yet\":\"Arbre n'a pas encore de blocs.\",\"tree-duplicated\":\"Arbre dupliqué !\",\"tree-identifier-not-provided\":\"Identifiant arbre non fourni\",\"tree-is-empty\":\"L'arbre est vide!\",\"tree-is-empty-please-use-the-add-block-button-on-the-top-left-to-add-some-blocks-to-get-started\":\"L'arbre est vide. S'il vous plaît utilisez le bouton Ajouter un bloc en haut à gauche pour ajouter quelques blocs pour commencer.\",\"tree-restored\":\"Arbre Restauré!\",\"tree-result-import-heading-validation-error\":\"Les têtes de colonne dans votre importation ne sont pas valides. S'il vous plaît se référer au modèle d'importation pour les rubriques correctes\",\"tree-result-import-in-progress\":\"Arbre résultat importation en cours\",\"tree-saved\":\"Arbre sauvé!\",\"tree-update-conflict\":\"conflit de mise à jour arbre détecté\",\"tree-used-elsewhere-by-x-at-x\":\"Cet arbre a été enregistré ailleurs par :name à :time\",\"tree-versions\":\"Versions de l'arbre\",\"trees\":\"Arbres\",\"trigger-outgoing-call\":\"Déclenchement des appels sortants\",\"trimmed-to\":\"coupé à\",\"true\":\"Vrai\",\"tues\":\"Mar.\",\"tuesday-day\":\"Mardi\",\"two-or-more-choices-required\":\"Deux ou plusieurs choix requis:\",\"unable-to-delete-the-requested-transcription-task\":\"Impossible de supprimer la tâche de transcription demandée.\",\"unable-to-find-block-locally-from-server-results-with-key\":\"Impossible de trouver le bloc localement à partir serverResults\",\"undo\":\"Annuler\",\"unexpected-error\":\"une erreur inattendue est apparue\",\"unique-subscribers\":\"Contacts uniques\",\"unknown\":\"Inconnue\",\"unknown-error-occurred\":\"Une erreur inconnue est survenue\",\"unknown-language\":\"langue inconnue\",\"unknown-subscriber-branch-criteria\":\"#VALUE!\",\"unlimited-if-not-defined-or-set-as-zero\":\"Illimité si non défini ou mis à zéro\",\"unlock\":\"Dévérouillé\",\"unset-as-exit-block\":\"Non défini comme bloc de sortie\",\"untitled-block\":\"Bloc sans titre\",\"untitled-collab-filtering-rating\":\"Note de filtrage collaboratif sans titre\",\"untitled-collaborative-filtering-question\":\"Question de filtrage collaboratif sans titre\",\"untitled-generate-code\":\"Sans titre Générer le code\",\"untitled-message\":\"Message sans titre\",\"untitled-multiple-choice-question\":\"Question à choix multiples sans titre\",\"untitled-numeric-question\":\"Question numérique sans titre\",\"untitled-open-ended-question\":\"Question ouverte sans titre\",\"untitled-question\":\"question sans titre\",\"untitled-record-group-message\":\"Untitled Group Enregistrer un message\",\"untitled-tree\":\"Arbre sans titre\",\"untitled-validate-code\":\"Sans titre Valider le code\",\"update-existing-subscriber\":\"Mise à jour contact existant\",\"update-task\":\"Mise à jour des tâches\",\"update-transcription-task\":\"Mise à jour de transcription Tâche\",\"updated\":\"Actualisé\",\"upload\":\"Télécharger\",\"upload-a-csv-with-column-codes\":\"Télécharger un fichier CSV avec les 'codes' des colonnes\",\"upload-audio-files-to-X\":\"Télécharger des fichiers audio à: dest\",\"upload-codes\":\"Télécharger des codes\",\"upload-csv-file\":\"Fichier Importer un fichier CSV\",\"upload-csv-file-instruction\":\"Télécharger un fichier CSV (.csv) avec vos résultats d'arbres.\",\"upload-error\":\"Erreur de téléversement\",\"upload-file\":\"Télécharger un fichier\",\"uploading\":\"Téléchargement\",\"url-destination\":\"URL de destination\",\"url-for-this-csv-export-via-api-key\":\"URL pour cette exportation en CSV via le API\",\"usd-at-current-exchange\":\"USD à taux de change courants\",\"usd-exchange-warning-message\":\"Les montants indiqués ci-dessus seront appliqués en USD.\",\"use-a-specific-language-for-this-call\":\"Utilisez un langage spécifique pour cet appel\",\"use-custom-block-ordering\":\"Utilisez la commande de bloc personnalisé\",\"use-different-multimedia-files-each-language\":\"Utilisez des fichiers différents pour chaque langue\",\"use-full-text-descriptions\":\"Utilisez des descriptions de texte intégral\",\"use-hybrid-format\":\"Utilisez le format hybride\",\"use-machine-readable-format\":\"Utilisez le format lisible par une machine\",\"use-machine-readable-numbers\":\"Utilisez des chiffres lisibles à la machine\",\"use-master-for-language\":\"Utilisez le fichier CSV maître pour cette langue\",\"use-simple-date-range-picker\":\"Utilisez sélecteur de plage de dates simples\",\"use-tags-in-your-location-message-for-references-in-alert\":\"Utilisez la balise [EXPIRY_TIME] dans votre message pour faire référence à la date d'expiration et la balise [lieu] pour faire référence à l'emplacement de l'alerte.\",\"use-text-descriptions\":\"Utilisez les textes de description\",\"use-the-button-above-to-generate-a-new-csv-export-for-this-tree\":\"Utilisez le bouton ci-dessus pour générer une nouvelle exportation CSV pour cet arbre. Il apparaîtra dans la liste à droite une fois remplie.\",\"use-the-button-above-to-generate-a-shareable-results-page-for-this-tree\":\"Utilisez le bouton ci-dessus pour générer une page de résultats partageable pour cet arbre. Cette page sera mise à jour automatiquement comme les nouveaux résultats qui sont reçus pour cet arbre.\",\"use-the-button-below-to-generate-a-shareable-results-page-for-this-tree\":\"Utilisez le bouton ci-dessus pour générer une page de résultats partageable pour cet arbre. Cette page sera mise à jour automatiquement comme les nouveaux résultats qui sont reçus pour cet arbre.\",\"use-the-form-below-to-create-a-new-transcription-task\":\"Utilisez le formulaire ci-dessous pour créer une nouvelle tâche de transcription qui peut être envoyé à transcripteurs externes. Le transcripteur sera attribué des réponses ouvertes à retranscrire en fonction de la langue et de démarrage / numéros de fin indiqués ci-dessous.\",\"use-the-shareable-link-below-to-share-the-results-of-this-tree\":\"Utilisez le lien ci-dessous pour partager les résultats de cet arbre. <b> A toute personne que vous partagez cela avec aura accès à ces résultats. </b> Cette page sera mise à jour automatiquement comme les nouveaux résultats qui sont reçus pour cet arbre.\",\"use-the-tag-expiry-time\":\"Utilisez l'étiquette [durée d'expiration] dans votre message pour référencer la date d'expiration et l'étiquette [emplacement] pour référencer l'emplacement de l'alerte.\",\"use-tree-view-to-add-blocks\":\"Utilisez la vue arborescente pour ajouter quelques blocs avant de tenter de remplir et revoir le contenu.\",\"user-guide\":\"Pour IVR, les codes ne peuvent être lus en utilisant la voix, de sorte que le système texte du bloc au contact. Il est recommandé que l'audio pour ce bloc informera le contact qu'ils recevront un message texte avec leur code.\",\"username\":\"Nom d'utilisateur\",\"using-automatic-routing\":\"L'utilisation de routage automatique\",\"ussd\":\"USSD\",\"ussd-content\":\"contenu USSD\",\"ussd-prompt\":\"USSD rapide\",\"ussd-subscribers-that-reached-this-block\":\"contacts USSD qui ont atteint ce bloc\",\"valid\":\"Valide\",\"validate-code-block\":\"Valider le bloc de code\",\"validate-code-block-ignore-offline-submissions-help\":\"Valident les codes lorsque Désactive Clipboard Android est déconnecté.\",\"validate-code-title\":\"Valider le titre de code\",\"value\":\"Valeur\",\"version\":\"version\",\"version-capitalized\":\"Version\",\"versions\":\"versions\",\"versions-capitalized\":\"Versions\",\"view\":\"Vue\",\"view-all-responses\":\"Voir toutes les réponses\",\"view-and-manage-collaborative-submissions\":\"Voir et gérer les soumissions collaboratives\",\"view-and-manage-collaborative-submissions-a-for-this-block\":\"Afficher et gérer les soumissions de collaboration </a>\",\"view-and-manage-statements\":\"Afficher et gérer les états\",\"view-generate-code-block\":\"Voir générer bloc de code\",\"view-instruction\":\"Instructions Voir\",\"view-issues\":\"Voir les problèmes\",\"view-results\":\"Voir les résultats\",\"view-tracker-configuration\":\"Voir Configuration Tracker\",\"view-trackers\":\"et traqueurs de problèmes\",\"view-tree\":\"Voir arbre\",\"view-tree-details\":\"Voir les détails de l'arbre\",\"view-tree-structure\":\"Voir la structure arborescente\",\"view-tree-versions\":\"Voir versions d'arbres\",\"view-validate-code-block\":\"Voir le bloc de code validate\",\"view-versions-issue-trackers\":\"Voir les versions et les suivis de problèmes\",\"view-x-other-versions\":\"Voir :count autres versions de cet arbre\",\"voice\":\"Voix\",\"voice-content\":\"Contenu Voix\",\"voice-disabled\":\"Voix désactivée\",\"voice-enabled\":\"Voix activée\",\"voice-key-press\":\"Touche pour la voix\",\"voice-prompt\":\"Invite Voix\",\"voice-status\":\"état de la voix\",\"voice-subscribers-that-reached-this-block\":\"contacts vocaux qui ont atteint ce bloc\",\"voice-to\":\"voix à\",\"wait\":\"Attendre\",\"waiting-for-results\":\"L'attente des résultats\",\"we-are-upgrading-how-we-handle\":\"Nous améliorons comment nous traitons les traductions choix dans le bloc Question à choix multiples. S'il vous plaît assurer que les éléments suivants est correct. Si vous ne faites pas de changements en ce moment, votre arbre continuera d'accepter les réponses mêmes textes que précédemment.\",\"we-didnt-find-any-matches-revisit-pattern\":\"Nous n'avons trouvé aucune correspondance, essayez de réviser votre modèle.\",\"we-need-audio-files-previously-uploaded-to-audio-lib-to-match-to-blocks\":\"Nous avons besoin de fichiers audio qui ont déjà été téléchargés à la bibliothèque audio de votre organisation afin de les lier aux blocs.\",\"weather-forecast\":\"Prévisions météorologiques\",\"webhook-block-empty-payload-info\":\"Aucun bloc sont sélectionnés. La charge utile du bloc de cet événement webhook sera vide.\",\"webhook-block-payload-help-text\":\"Sélectionnez les blocs interactifs qui doivent être envoyés lorsque cette webhook est déclenchée. Les réponses des blocs sélectionnés seront envoyés.\",\"webhook-http-warning\":\"Lors de l'envoi des données sensibles, nous vous recommandons d'utiliser un point de terminaison HTTPS comme destination de webhook de la vie privée et la sécurité.\",\"webhook-method\":\"Méthode\",\"webhook-secret\":\"Secret\",\"webhook-secret-desc\":\"Nous vous ferons parvenir ce texte avec la soumission de webhook afin que votre serveur peut authentifier est venu de Viamo.\",\"webhook-subscriber-empty-payload-info\":\"Aucun propriétés d'abonnés sont sélectionnés. La charge utile d'abonné de cet événement webhook sera vide.\",\"webhook-subscriber-payload-help-text\":\"Sélectionnez les propriétés d'abonnés qui doivent être envoyés lorsque cette webhook est déclenchée. La valeur de la propriété sélectionnée sera envoyée.\",\"webhook-untitled-block\":\"bloc sans titre\",\"wed\":\"Mer.\",\"wednesday-day\":\"Mercredi\",\"week\":\"semaine\",\"weekly\":\"Hebdomadaire\",\"weeks-after\":\"Des semaines après\",\"weeks-before\":\"Des semaines avant\",\"welcome\":\"Bienvenue!\",\"when-block-reached-caller-exits-and-connects-to-operator\":\"Lorsque ce bloc est atteint, l'appelant quitte l'arbre et est connecté à l'opérateur. En conséquence, aucun autre des blocs peuvent être connectés en dessous de celui-ci.\",\"when-block-reached-subscriber-start-date-set-to-date-based-upon-previous-numeric-input\":\"Lorsque ce bloc est atteinte, les contacts auront leur date définie à l'aide de la contribution qu'ils apportent à une précédente question numérique. Leur date est définie sur le nombre de jours, semaines ou mois (fixé ci-dessus) que le contact fournit, par rapport à la date de l'appel.\",\"when-block-reached-subscriber-start-date-set-to-date-relative-to-call-and-timespan-specified\":\"Lorsque ce bloc est atteinte, les contacts auront leur date fixée au nombre de jours, semaines ou mois indiqués ci-dessus, par rapport à la date à laquelle ils reçoivent l'appel.\",\"when-block-reached-subscriber-start-date-set-to-specified\":\"Lorsque ce bloc est atteinte, les contacts auront leur date fixée à la date indiquée ci-dessus.\",\"when-finished-returns-to-this-tree-and-continues-to-any-blocks-connected-below\":\"Lorsque vous avez terminé, retourne\",\"when-no-preferred-language-subscriber-receives-lang-selector\":\"Si cette option est réglée sur « Aucune langue préférée », puis au début de l'appel suivant du contact, ils recevront un menu de sélection de langue (s'il est prévu une invite de sélection de la langue).\",\"when-no-valid-response-is-received\":\"Quand aucune réponse valide n'est reçue\",\"when-randomizing\":\"quand aléatoirement\",\"wind-level\":\"Niveau vent\",\"windy\":\"Venteux\",\"with-subscriber-phone-number\":\"avec contact Numéro de téléphone\",\"words\":\"Mots\",\"working-loading\":\"Travail...\",\"x-of-y\":\"sur\",\"x-text-responses\":\"Réponses en texte :language\",\"year\":\"an\",\"yearly\":\"Annuel\",\"yes\":\"Oui\",\"you-are-about-to-delete-a-transcription-task\":\"Vous êtes sur le point de supprimer une tâche de transcription.\",\"you-are-about-to-delete-a-tree\":\"Vous êtes sur le point de supprimer un arbre.\",\"you-are-about-to-delete-a-tree-version\":\"Vous êtes sur le point de supprimer une version d'arbre.\",\"you-are-about-to-delete-this-issue-tracker\":\"Vous êtes sur le point de supprimer ce tracker problème.\",\"you-can-edit-your-tree-with-the-interface-below\":\"Vous pouvez modifier votre arbre avec l'interface ci-dessous.\",\"you-can-send-out-the-external-link-from-the-table-below\":\"Vous pouvez envoyer le lien externe de la table ci-dessous.\",\"you-can-send-out-the-external-links-from-the-table-below\":\"Vous pouvez envoyer les liens externes dans le tableau ci-dessous.\",\"you-have-x-unsaved-transcriptions\":\"Vous avez :transcription_count transcriptions non enregistrées. Etes-vous sûr de vouloir quitter cette page?\",\"you-need-permission-to-export-content\":\"Vous avez besoin de la permission pour exporter le contenu\",\"your-browser-does-not-support-the-audio-element\":\"Votre navigateur ne supporte pas l'élément audio.\",\"your-combined-tree-results-are-being-exported\":\"Vos résultats d'arbres combinés sont exportés.\",\"your-file-file-name-is-currently-being-processed\":\"Votre fichier :fileName est actuellement en cours de traitement.\",\"your-open-ended-audio-download-for\":\"Votre téléchargement audio pour la question ouverte\",\"your-orgs-audio-library\":\"bibliothèque audio de votre organisation\",\"your-prompt\":\"<votre message>\",\"youre-using-floip-expressions\":\"On dirait que vous utilisez des expressions FLOIP, nice!\"}}");

/***/ }),

/***/ "e5fd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routeFrom; });
/* unused harmony export interpolateRouteWith */
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("99af");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("5319");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("498a");
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("5530");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("2f62");







var PATH_PARAM_DISCOVERER = /(\/){(.*?)(\?)?}/g; // todo: we'll want route() to also be importable/accessible anywhere!

/* harmony default export */ __webpack_exports__["a"] = ({
  computed: Object(_home_jacob_voto_flow_builder_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__[/* mapState */ "e"])({
    routes: function routes(s) {
      return s.trees.ui.routes;
    }
  })),
  methods: {
    route: function route(routeKey, context) {
      return routeFrom(routeKey, context, this.routes);
    }
  }
});
function routeFrom(routeKey, context, routes) {
  return interpolateRouteWith(context, Object(lodash__WEBPACK_IMPORTED_MODULE_5__["get"])(routes, routeKey));
}

var raiseFor = function raiseFor(p) {
  throw new Error("InvalidContextError - Missing param: ".concat(p));
};

function interpolateRouteWith(context, route) {
  if (!route) {
    return null;
  }

  context = context || {};
  var id = route.id,
      path = route.path,
      params = route.params,
      methods = route.methods;
  var isPathComplete = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["isEmpty"])(params);

  if (isPathComplete) {
    return path;
  }

  return path.replace(PATH_PARAM_DISCOVERER, function (m) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var captured = arguments.length > 2 ? arguments[2] : undefined;
    var isOptional = arguments.length > 3 ? arguments[3] : undefined;
    var param = captured.trim();
    var absent = !(param in context);

    if (absent && !isOptional) {
      raiseFor(param);
    }

    if (absent && isOptional) {
      return '';
    }

    return "".concat(prefix).concat(context[param]);
  });
}

/***/ }),

/***/ "e7f0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/InteractionDesigner.vue?vue&type=template&id=8e85b462&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"interaction-designer-contents"},[_c('tree-builder-toolbar'),_c('div',{staticClass:"tree-sidebar-container"},[(_vm.activeBlock)?_c('div',{staticClass:"tree-sidebar",class:[("category-" + (_vm.blockClasses[_vm.activeBlock.type].category))]},[_c('div',{staticClass:"tree-sidebar-edit-block",attrs:{"data-block-type":_vm.activeBlock && _vm.activeBlock.type,"data-for-block-id":_vm.activeBlock && _vm.activeBlock.uuid}},[(_vm.activeBlock)?_c(("Flow" + (_vm.activeBlock.type.replace(/\\/g, ''))),{tag:"div",attrs:{"block":_vm.activeBlock,"flow":_vm.activeFlow}}):_vm._e()],1)]):_c('div',{staticClass:"tree-sidebar"},[_c('div',{staticClass:"tree-sidebar-edit-block"},[_c('flow-editor',{attrs:{"flow":_vm.activeFlow}})],1)])]),_c('div',{staticClass:"tree-contents",attrs:{"x-style":{'min-height': (_vm.designerWorkspaceHeight + "px")}}},[_c('builder-canvas',{nativeOn:{"click":function($event){return _vm.handleCanvasSelected($event)}}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/InteractionDesigner.vue?vue&type=template&id=8e85b462&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/InteractionDesigner.vue?vue&type=script&lang=js&
var InteractionDesignervue_type_script_lang_js_ = __webpack_require__("7865");

// CONCATENATED MODULE: ./src/views/InteractionDesigner.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_InteractionDesignervue_type_script_lang_js_ = (InteractionDesignervue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css?vue&type=style&index=0&lang=css&
var bootstrapvue_type_style_index_0_lang_css_ = __webpack_require__("a151");

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap-theme.css?vue&type=style&index=1&lang=css&
var bootstrap_themevue_type_style_index_1_lang_css_ = __webpack_require__("e154");

// EXTERNAL MODULE: ./src/views/InteractionDesigner.vue?vue&type=style&index=2&lang=scss&
var InteractionDesignervue_type_style_index_2_lang_scss_ = __webpack_require__("3018");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/InteractionDesigner.vue








/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_InteractionDesignervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var InteractionDesigner = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "f3a0":
/***/ (function(module) {

module.exports = JSON.parse("{\"flows\":[{\"uuid\":\"5b8c87d6-de90-4bc4-8668-4f040000006e\",\"name\":\"Clipboard Shortcut Tree For Backtracking\",\"label\":\"\",\"lastModified\":\"2019-10-10 23:46:30.000000+00:00\",\"interactionTimeout\":172800,\"supportedModes\":[\"sms\",\"ivr\",\"ussd\"],\"languages\":[{\"id\":\"22\",\"name\":\"English\",\"abbreviation\":\"EN\",\"orgId\":\"1008107874829627392\",\"rightToLeft\":false,\"code\":null,\"deletedAt\":null}],\"platform_metadata\":{\"io_viamo\":{\"orgId\":\"1008107874829627392\",\"treeId\":\"116\"}},\"blocks\":[{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\",\"name\":\"1570737014110_68\",\"label\":\"Do you have more children to add?\",\"semanticLabel\":\"\",\"config\":{\"choices\":{\"yes\":\"29841127-3247-461e-829a-89c000000000\",\"no\":\"29841127-3247-461e-829a-94d800000000\"},\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\",\"questionPrompt\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\",\"choicesPrompt\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"MultipleChoiceQuestionBlock\",\"customData\":{\"title\":\"Do you have more children to add?\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"branching\":1,\"addExitForNoResponse\":0,\"choices\":[\"Yes\",\"No\"],\"numChoices\":2,\"propertyFieldId\":null},\"uiData\":{\"xPosition\":147,\"yPosition\":107,\"numConnections\":2,\"outputNames\":[\"Yes\",\"No\"],\"fieldLabels\":[1,2]},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"Do you have more children to add?\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737014110_68\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc5199dc271\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb92536d34\",\"tag\":\"Yes\",\"label\":\"29841127-3247-4610-8037-cdc5199dc271\",\"semanticLabel\":\"\",\"test\":\"@(OR(AND(channel.mode = 'ivr', block.value = '1'), AND(channel.mode != 'ivr', OR(block.value = '1', LOWER(block.value) = 'yes'))))\"},{\"uuid\":\"29841127-3247-4610-8037-cdc5199dc272\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb93718673\",\"tag\":\"No\",\"label\":\"29841127-3247-4610-8037-cdc5199dc272\",\"semanticLabel\":\"\",\"test\":\"@(OR(AND(channel.mode = 'ivr', block.value = '2'), AND(channel.mode != 'ivr', OR(block.value = '2', LOWER(block.value) = 'no'))))\"}],\"type\":\"MobilePrimitives\\\\SelectOneResponse\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb92536d34\",\"name\":\"1570737039229_96\",\"label\":\"What is their age?\",\"semanticLabel\":\"\",\"config\":{\"validationMinimum\":0,\"validationMaximum\":999,\"ivr\":{\"maxDigits\":3},\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb92536d34\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"NumericQuestionBlock\",\"customData\":{\"title\":\"What is their age?\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"propertyFieldId\":null},\"uiData\":{\"xPosition\":139,\"yPosition\":295,\"numConnections\":1},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"What is their age?\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737039229_96\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc52896a851\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb92667e05\",\"tag\":\"Default\",\"label\":\"Default\",\"semanticLabel\":\"\"},{\"uuid\":\"29841127-3247-4610-8037-cdc52896a852\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"tag\":\"Error\",\"label\":\"Error\",\"semanticLabel\":\"\"}],\"type\":\"MobilePrimitives\\\\NumericResponse\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb92667e05\",\"name\":\"1570737051724_85\",\"label\":\"\",\"semanticLabel\":\"\",\"config\":[],\"platform_metadata\":{\"io_viamo\":{\"type\":\"NumericBranchBlock\",\"customData\":{\"title\":\"\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"outputs\":[{\"conditions\":[{\"jsKey\":\"block_1570737039229_96\",\"value\":18}]}],\"propertyFieldId\":null},\"uiData\":{\"xPosition\":139,\"yPosition\":445,\"numConnections\":2},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":[],\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737051724_85\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc5300939f5\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb92b0431d\",\"tag\":\"1\",\"label\":\"29841127-3247-4610-8037-cdc5300939f5\",\"semanticLabel\":\"\",\"test\":\"@(flow.1570737039229_96.value > 18)\"},{\"uuid\":\"29841127-3247-4610-8037-cdc5300939f6\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb93117c75\",\"default\":true,\"test\":\"\",\"tag\":\"DEFAULT\",\"label\":\"29841127-3247-4610-8037-cdc5300939f6\",\"semanticLabel\":\"\"}],\"type\":\"Core\\\\Case\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb92b0431d\",\"name\":\"1570737100070_69\",\"label\":\"They aren't a child if they're over 18\",\"semanticLabel\":\"\",\"config\":{\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb92b0431d\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"MessageBlock\",\"customData\":{\"title\":\"They aren't a child if they're over 18\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"propertyFieldId\":null},\"uiData\":{\"xPosition\":-80,\"yPosition\":627,\"numConnections\":1},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"They aren't a child if they're over 18\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737100070_69\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc54cda3755\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\",\"tag\":\"Default\",\"label\":\"Default\",\"semanticLabel\":\"\"}],\"type\":\"MobilePrimitives\\\\Message\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb93117c75\",\"name\":\"1570737163787_41\",\"label\":\"Do they enjoy reading?\",\"semanticLabel\":\"\",\"config\":{\"choices\":{\"yes\":\"29841127-3247-461e-829c-9fe800000000\",\"no\":\"29841127-3247-461e-829c-ab6800000000\"},\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb93117c75\",\"questionPrompt\":\"95bd9e4a-93cd-46f2-9b43-8edb93117c75\",\"choicesPrompt\":\"95bd9e4a-93cd-46f2-9b43-8edb93117c75\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"MultipleChoiceQuestionBlock\",\"customData\":{\"title\":\"Do they enjoy reading?\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"branching\":1,\"addExitForNoResponse\":0,\"choices\":[\"Yes\",\"No\"],\"numChoices\":2,\"propertyFieldId\":null},\"uiData\":{\"xPosition\":171,\"yPosition\":615,\"numConnections\":2,\"outputNames\":[\"Yes\",\"No\"],\"fieldLabels\":[1,2]},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"Do they enjoy reading?\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737163787_41\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc572d49db5\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb933994fe\",\"tag\":\"Yes\",\"label\":\"29841127-3247-4610-8037-cdc572d49db5\",\"semanticLabel\":\"\",\"test\":\"@(OR(AND(channel.mode = 'ivr', block.value = '1'), AND(channel.mode != 'ivr', OR(block.value = '1', LOWER(block.value) = 'yes'))))\"},{\"uuid\":\"29841127-3247-4610-8037-cdc572d49db6\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"tag\":\"No\",\"label\":\"29841127-3247-4610-8037-cdc572d49db6\",\"semanticLabel\":\"\",\"test\":\"@(OR(AND(channel.mode = 'ivr', block.value = '2'), AND(channel.mode != 'ivr', OR(block.value = '2', LOWER(block.value) = 'no'))))\"}],\"type\":\"MobilePrimitives\\\\SelectManyResponse\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb933994fe\",\"name\":\"1570737190064_62\",\"label\":\"How many books per year do they read?\",\"semanticLabel\":\"\",\"config\":{\"validationMinimum\":0,\"validationMaximum\":999,\"ivr\":{\"maxDigits\":3},\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb933994fe\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"NumericQuestionBlock\",\"customData\":{\"title\":\"How many books per year do they read?\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"propertyFieldId\":null},\"uiData\":{\"xPosition\":103,\"yPosition\":782,\"numConnections\":1},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"How many books per year do they read?\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737190064_62\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc5827e3339\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"tag\":\"Default\",\"label\":\"Default\",\"semanticLabel\":\"\"},{\"uuid\":\"29841127-3247-4610-8037-cdc5827e3340\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"tag\":\"Error\",\"label\":\"Error\",\"semanticLabel\":\"\"}],\"type\":\"MobilePrimitives\\\\NumericResponse\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"name\":\"1570737212703_19\",\"label\":\"What is thier name?\",\"semanticLabel\":\"\",\"config\":{\"ivr\":{\"maxDurationSeconds\":60},\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"OpenQuestionBlock\",\"customData\":{\"title\":\"What is thier name?\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"propertyFieldId\":null},\"uiData\":{\"xPosition\":443,\"yPosition\":970,\"numConnections\":1},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"What is thier name?\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737212703_19\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc58ffc925d\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\",\"tag\":\"Default\",\"label\":\"Default\",\"semanticLabel\":\"\"},{\"uuid\":\"29841127-3247-4610-8037-cdc58ffc925e\",\"destinationBlock\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"tag\":\"Error\",\"label\":\"Error\",\"semanticLabel\":\"\"}],\"type\":\"MobilePrimitives\\\\OpenResponse\"},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb93718673\",\"name\":\"1570737226727_55\",\"label\":\"Thanks for entering info about your dependents\",\"semanticLabel\":\"\",\"config\":{\"prompt\":\"95bd9e4a-93cd-46f2-9b43-8edb93718673\"},\"platform_metadata\":{\"io_viamo\":{\"type\":\"MessageBlock\",\"customData\":{\"title\":\"Thanks for entering info about your dependents\",\"label\":\"\",\"tags\":[],\"reviewed\":{\"22\":false},\"propertyFieldId\":null},\"uiData\":{\"xPosition\":443,\"yPosition\":272,\"numConnections\":1},\"audioFiles\":[],\"smsContent\":[],\"ussdContent\":[],\"socialContent\":[],\"clipboardContent\":{\"22\":\"Thanks for entering info about your dependents\"},\"smsAutogenLangs\":[],\"ussdAutogenLangs\":[],\"socialAutogenLangs\":[],\"clipboardAutogenLangs\":[],\"jsKey\":\"block_1570737226727_55\"}},\"exits\":[{\"uuid\":\"29841127-3247-4610-8037-cdc5985884ed\",\"destinationBlock\":null,\"tag\":\"Default\",\"label\":\"Default\",\"semanticLabel\":\"\"}],\"type\":\"MobilePrimitives\\\\Message\"}]}],\"resources\":[{\"uuid\":\"29841127-3247-461e-829a-89c000000000\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Yes\"}]},{\"uuid\":\"29841127-3247-461e-829a-94d800000000\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"No\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc5199dc271\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Yes\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc5199dc272\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"No\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb922d18fc\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Do you have more children to add?\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc52896a851\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"1\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb92536d34\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"What is their age?\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc5300939f5\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"1\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc5300939f6\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"DEFAULT\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc54cda3755\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"1\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb92b0431d\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"They aren't a child if they're over 18\"}]},{\"uuid\":\"29841127-3247-461e-829c-9fe800000000\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Yes\"}]},{\"uuid\":\"29841127-3247-461e-829c-ab6800000000\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"No\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc572d49db5\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Yes\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc572d49db6\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"No\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb93117c75\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Do they enjoy reading?\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc5827e3339\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"1\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb933994fe\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"How many books per year do they read?\"},{\"languageId\":\"22\",\"contentType\":\"audio\",\"modes\":[\"ivr\"],\"value\":\"How many books per year do they read?\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc58ffc925d\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"1\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb935c202f\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"What is thier name?\"}]},{\"uuid\":\"29841127-3247-4610-8037-cdc5985884ed\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"ivr\",\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"1\"}]},{\"uuid\":\"95bd9e4a-93cd-46f2-9b43-8edb93718673\",\"values\":[{\"languageId\":\"22\",\"contentType\":\"text\",\"modes\":[\"sms\",\"ussd\",\"rich_messaging\",\"offline\"],\"value\":\"Thanks for entering info about your dependents\"},{\"languageId\":\"22\",\"contentType\":\"audio\",\"modes\":[\"ivr\"],\"value\":\"123\"}]}]}");

/***/ }),

/***/ "f857":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3e0297a3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue?vue&type=template&id=28699d40&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-builder-toolbar"},[(_vm.isImporterVisible)?_c('div',{staticClass:"flows-importer alert alert-info"},[_c('h3',[_vm._v(_vm._s(_vm.trans('flow-builder.flow-importer')))]),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.flow),expression:"flow"}],staticClass:"flow-importer",attrs:{"rows":"15"},domProps:{"value":(_vm.flow)},on:{"input":function($event){if($event.target.composing){ return; }_vm.flow=$event.target.value}}})]):_vm._e(),_c('div',{staticClass:"tree-workspace-panel-heading panel-heading"},[_c('div',{staticClass:"tree-workspace-panel-heading-contents"},[_c('div',{staticClass:"btn-toolbar"},[_c('button',{staticClass:"btn btn-default",class:{active: _vm.isImporterVisible},on:{"click":_vm.toggleImportExport}},[_c('i',{staticClass:"glyphicon glyphicon-chevron-up"}),_vm._v(" "+_vm._s(_vm.trans('flow-builder.import-export'))+" ")]),(_vm.isResourceEditorEnabled)?_c('div',{staticClass:"btn-group"},[_c('router-link',{staticClass:"btn btn-default active",attrs:{"to":_vm.treeViewUrl}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.flow-view'))+" ")]),_c('router-link',{staticClass:"btn btn-default",attrs:{"to":_vm.resourceViewUrl},nativeOn:{"click":function($event){return _vm.handleResourceViewerSelected($event)}}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.resource-view'))+" ")])],1):_vm._e(),(_vm.ui.isEditableLocked)?[(_vm.isFeatureViewResultsEnabled)?_c('a',{staticClass:"btn btn-default",attrs:{"href":_vm.viewResultsUrl,"title":_vm.trans('flow-builder.view-results')}},[_c('span',{staticClass:"glyphicon glyphicon-signal"})]):_vm._e()]:_c('a',{staticClass:"btn btn-default",class:{active: _vm.ui.isEditable},attrs:{"href":_vm.editOrViewTreeJsUrl,"title":_vm.trans('flow-builder.click-to-toggle-editing')},on:{"click":_vm.attemptSaveTree}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.edit-flow'))+" ")]),(!_vm.ui.isEditable && _vm.isFeatureTreeDuplicateEnabled)?_c('a',{staticClass:"btn btn-default",attrs:{"href":_vm.duplicateTreeLink,"title":_vm.trans('flow-builder.duplicate-entire-flow')}},[_c('span',{staticClass:"glyphicon glyphicon-tags"})]):_vm._e(),(_vm.ui.isEditable)?_c('div',{staticClass:"btn-group"},[_c('button',{staticClass:"btn btn-default dropdown-toggle",attrs:{"type":"button","data-toggle":"dropdown"}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.add-block'))+" "),_c('span',{staticClass:"caret"})]),_c('ul',{staticClass:"dropdown-menu",attrs:{"role":"menu"}},[_vm._l((_vm.rootBlockClassesToDisplay),function(classDetails,className){return [(_vm.shouldDisplayDividerBefore(_vm.rootBlockClassesToDisplay, className))?_c('li',{key:className + 'divider',staticClass:"divider"}):_vm._e(),_c('li',{key:className + 'item'},[(_vm.isBlockAvailableByBlockClass[className])?_c('a',{staticClass:"tree-add-block",attrs:{"href":"#","data-block-type":className,"data-default-num-connections":classDetails['defaultConnections']},on:{"click":function($event){$event.preventDefault();return _vm.handleAddBlockByTypeSelected(classDetails)}}},[_vm._v(" "+_vm._s(_vm.translateTreeClassName(className))+" ")]):_vm._e()])]}),(!_vm.isEmpty(_vm.rootDropdownClassesToDisplay))?[_c('li',{staticClass:"divider"}),_c('li',{staticClass:"menu-item dropdown dropdown-submenu"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"href":"#","data-toggle":"dropdown"}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.branching'))+" ")]),_c('ul',{staticClass:"dropdown-menu"},[_vm._l((_vm.rootDropdownClassesToDisplay),function(classDetails,className){return [(_vm.shouldDisplayDividerBefore(_vm.rootDropdownClassesToDisplay, className))?_c('li',{key:className + 'divider',staticClass:"divider"}):_vm._e(),_c('li',{key:className + 'item'},[(_vm.isBlockAvailableByBlockClass[className])?_c('a',{staticClass:"tree-add-block",attrs:{"href":"#","data-block-type":className,"data-default-num-connections":classDetails['defaultConnections']}},[_vm._v(" "+_vm._s(_vm.translateTreeClassName(className))+" ")]):_vm._e()])]})],2)])]:_vm._e(),(!_vm.isEmpty(_vm.advancedDropdownClassesToDisplay))?[_c('li',{staticClass:"divider"}),_c('li',{staticClass:"menu-item dropdown dropdown-submenu"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"href":"#","data-toggle":"dropdown"}},[_vm._v(_vm._s(_vm._f("trans")('flow-builder.advanced'))+" ")]),_c('ul',{staticClass:"dropdown-menu"},[_vm._l((_vm.advancedDropdownClassesToDisplay),function(classDetails,className){return [(_vm.shouldDisplayDividerBefore(_vm.advancedDropdownClassesToDisplay, className))?_c('li',{key:className + 'divider',staticClass:"divider"}):_vm._e(),_c('li',{key:className + 'item'},[(_vm.isBlockAvailableByBlockClass[className])?_c('a',{staticClass:"tree-add-block",attrs:{"href":"#","data-block-type":className,"data-default-num-connections":classDetails['defaultConnections']}},[_vm._v(" "+_vm._s(_vm.translateTreeClassName(className))+" ")]):_vm._e()])]})],2)])]:_vm._e()],2)]):_vm._e(),(_vm.ui.isEditable)?_c('button',{staticClass:"btn btn-default tree-delete-block",attrs:{"type":"button","disabled":!_vm.activeBlockId},on:{"click":function($event){$event.preventDefault();return _vm.handleRemoveActivatedBlockTriggered($event)}}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.delete'))+" ")]):_vm._e(),_c('div',{staticClass:"btn-group pull-right"},[(_vm.ui.isEditable && _vm.isFeatureTreeSaveEnabled)?_c('button',{staticClass:"btn btn-primary tree-save-tree",attrs:{"type":"button","title":_vm.trans('flow-builder.save-changes-to-the-flow'),"disabled":_vm.isTreeSaving || !_vm.hasChanges},on:{"click":_vm.attemptSaveTree}},[_vm._v(" "+_vm._s(_vm.saveButtonText)+" ")]):_vm._e(),(_vm.isFeatureTreeSendEnabled)?[(_vm.can('edit-content'))?_c('a',{staticClass:"btn btn-success",attrs:{"href":_vm.publishVersionUrl,"disabled":_vm.isTreeSaving || !_vm.isTreeValid,"title":_vm._f("trans")(_vm.isTreeValid ? 'flow-builder.publish-this-version-of-the-flow' : 'flow-builder.fix-validation-errors-before-publishing')}},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.publish'))+" ")]):_vm._e(),(_vm.can('send-outgoing-call'))?_c('a',{staticClass:"btn btn-success tree-send-tree-call",attrs:{"href":_vm.sendOutgoingCallUrl,"disabled":_vm.isTreeSaving || !_vm.isTreeValid,"title":_vm.trans('flow-builder.schedule-and-send-an-outgoing-call')}},[_vm._v(" "+_vm._s(_vm.trans('flow-builder.send'))+" ")]):_vm._e()]:_vm._e()],2)],2)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue?vue&type=template&id=28699d40&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
var es_array_every = __webpack_require__("a623");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// CONCATENATED MODULE: ./src/lib/mixins/Permissions.js






function _can(userPermissions, permissionOrPermissions) {
  var requireAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (lodash_default.a.isArray(permissionOrPermissions)) {
    if (requireAll) {
      return lodash_default.a.every(permissionOrPermissions, function (requestedPermission) {
        return userPermissions[requestedPermission];
      });
    } else {
      return lodash_default.a.find(permissionOrPermissions, function (requestedPermission) {
        return userPermissions[requestedPermission];
      });
    }
  } else {
    return userPermissions[permissionOrPermissions];
  }
}


/* harmony default export */ var Permissions = ({
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["e" /* mapState */])(['permissions'])),
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
    can: function can(permission) {
      var requireAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return _can(this.permissions, permission, requireAll);
    }
  }
});
// EXTERNAL MODULE: ./src/lib/mixins/Routes.js
var Routes = __webpack_require__("e5fd");

// EXTERNAL MODULE: ./node_modules/lodash/fp/flow.js
var flow = __webpack_require__("b429");
var flow_default = /*#__PURE__*/__webpack_require__.n(flow);

// EXTERNAL MODULE: ./node_modules/lodash/fp/pickBy.js
var pickBy = __webpack_require__("512d");
var pickBy_default = /*#__PURE__*/__webpack_require__.n(pickBy);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// CONCATENATED MODULE: ./src/store/flow/utils/DataObjectPropertyNameCaseConverter.ts

// TODO:
//  move this file into @floip to replace the convertKeysToCamelCase under '@floip/flow-runner/src/flow-spec/DataObjectPopertyNameCamelCaseConverter'
//  and update convertKeysToCamelCase usage in @floip (tests, etc) to convertKeysCase

var EXCLUDED_DATA_HIERARCHIES_BY_KEY = ['choices', 'platformMetadata', 'platform_metadata'];
function convertKeysCase(x) {
  var caseType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'CAMEL';
  var exclusions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EXCLUDED_DATA_HIERARCHIES_BY_KEY;

  if (Object(lodash["isArray"])(x)) {
    return x.map(function (_) {
      return convertKeysCase(_, caseType, exclusions);
    });
  }

  if (!Object(lodash["isObject"])(x)) {
    return x;
  }

  return Object(lodash["reduce"])(x, function (memo, value, key) {
    var currentKey = caseType === 'CAMEL' ? Object(lodash["camelCase"])(key) : Object(lodash["snakeCase"])(key);
    memo[Object(lodash["includes"])(exclusions, key) ? key : currentKey] = convertKeysCase(value, caseType, exclusions);
    return memo;
  }, {});
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue?vue&type=script&lang=ts&







 // import {affix as Affix} from 'vue-strap'
// import TreeUpdateConflictModal from '../TreeUpdateConflictModal'
// import InteractionTotalsDateRangeConfiguration from './InteractionTotalsDateRangeConfiguration'


/* harmony default export */ var TreeBuilderToolbarvue_type_script_lang_ts_ = ({
  components: {// Affix,
    // TreeUpdateConflictModal,
    // InteractionTotalsDateRangeConfiguration
  },
  mixins: [lang["a" /* default */], Permissions, Routes["a" /* default */]],
  data: function data() {
    return {
      isImporterVisible: false
    };
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["e" /* mapState */])({
    tree: function tree(_ref) {
      var _tree = _ref.trees.tree;
      return _tree;
    },
    ui: function ui(_ref2) {
      var _ui = _ref2.trees.ui;
      return _ui;
    }
  })), Object(vuex_esm["c" /* mapGetters */])('flow', ['activeFlow'])), Object(vuex_esm["e" /* mapState */])('flow', ['flows', 'resources'])), Object(vuex_esm["e" /* mapState */])('builder', ['activeBlockId'])), Object(vuex_esm["c" /* mapGetters */])(['isEditable', 'isTreeSaving', 'isBlockAvailableByBlockClass', 'hasChanges', 'isTreeValid', 'selectedBlock', 'isFeatureTreeSaveEnabled', 'isFeatureTreeSendEnabled', 'isFeatureTreeDuplicateEnabled', 'isFeatureViewResultsEnabled', 'isFeatureUpdateInteractionTotalsEnabled'])), {}, {
    flow: {
      get: function get() {
        var flows = this.flows,
            resources = this.resources;
        return JSON.stringify(convertKeysCase({
          flows: flows,
          resources: resources
        }, 'SNAKE', ['platformMetadata', 'ioViamo']), null, 2);
      },
      set: function set(value) {
        this.importFlowsAndResources(convertKeysCase(JSON.parse(value), 'CAMEL', ['platform_metadata', 'io_viamo']));
      }
    },
    isResourceEditorEnabled: function isResourceEditorEnabled() {
      return false;
    },
    jsKey: function jsKey() {
      return lodash_default.a.get(this.selectedBlock, 'jsKey');
    },
    editTreeUrl: function editTreeUrl() {
      return this.editTreeRoute();
    },
    treeViewUrl: function treeViewUrl() {
      return this.editTreeRoute({
        component: 'interaction-designer'
      });
    },
    resourceViewUrl: function resourceViewUrl() {
      return this.editTreeRoute({
        component: 'resource-viewer'
      });
    },
    viewResultsUrl: function viewResultsUrl() {
      return this.isFeatureViewResultsEnabled ? this.editTreeRoute({
        component: 'results'
      }) : '';
    },
    viewResultsSetUrl: function viewResultsSetUrl() {
      return this.isFeatureViewResultsEnabled ? this.route('trees.viewTreeSetResults', {
        treeSetId: this.tree.treeSetId
      }) : '';
    },
    downloadAudioUrl: function downloadAudioUrl() {
      return this.editTreeRoute({
        component: 'downloadaudio'
      });
    },
    sendOutgoingCallUrl: function sendOutgoingCallUrl() {
      return this.isTreeValid ? "/outgoing/new?tree=".concat(this.tree.id) : '';
    },
    publishVersionUrl: function publishVersionUrl() {
      return this.isTreeValid ? "/trees/".concat(this.tree.id, "/publishversion") : '';
    },
    editOrViewTreeJsUrl: function editOrViewTreeJsUrl() {
      if (this.ui.isEditable) {
        return this.editTreeRoute({
          component: 'interaction-designer',
          mode: 'view'
        });
      } else {
        return this.editTreeRoute({
          component: 'interaction-designer',
          mode: 'edit'
        });
      }
    },
    duplicateTreeLink: function duplicateTreeLink() {
      return this.isFeatureTreeDuplicateEnabled ? this.route('trees.duplicateTreeAndContinue', {
        treeId: this.tree.id
      }) : '';
    },
    saveButtonText: function saveButtonText() {
      if (this.hasChanges) {
        return this.trans('flow-builder.save');
      } else {
        return this.trans('flow-builder.saved');
      }
    },
    rootBlockClassesToDisplay: function rootBlockClassesToDisplay() {
      var _this = this;

      return flow_default()(pickBy_default()(function (classDetails) {
        return !_this.hasClassDetail(classDetails, 'hiddenInMenu');
      }), pickBy_default()(function (classDetails) {
        return !_this.hasClassDetail(classDetails, 'advancedMenu');
      }), pickBy_default()(function (classDetails) {
        return !_this.hasClassDetail(classDetails, 'branchingMenu');
      }))(this.ui.blockClasses);
    },
    rootDropdownClassesToDisplay: function rootDropdownClassesToDisplay() {
      var _this2 = this;

      return flow_default()(pickBy_default()(function (classDetails) {
        return !_this2.hasClassDetail(classDetails, 'hiddenInMenu');
      }), pickBy_default()(function (classDetails) {
        return _this2.hasClassDetail(classDetails, 'branchingMenu');
      }))(this.ui.blockClasses);
    },
    advancedDropdownClassesToDisplay: function advancedDropdownClassesToDisplay() {
      var _this3 = this;

      return flow_default()(pickBy_default()(function (classDetails) {
        return !_this3.hasClassDetail(classDetails, 'hiddenInMenu');
      }), pickBy_default()(function (classDetails) {
        return _this3.hasClassDetail(classDetails, 'advancedMenu');
      }))(this.ui.blockClasses);
    },
    canViewResultsTotals: function canViewResultsTotals() {
      return this.can('view-result-totals') && this.isFeatureViewResultsEnabled;
    }
  }),
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
    isEmpty: lodash["isEmpty"]
  }, Object(vuex_esm["b" /* mapActions */])(['attemptSaveTree'])), Object(vuex_esm["d" /* mapMutations */])('flow', ['flow_removeBlock'])), Object(vuex_esm["b" /* mapActions */])('flow', ['flow_addBlankBlockByType'])), Object(vuex_esm["b" /* mapActions */])('builder', ['importFlowsAndResources'])), {}, {
    handleAddBlockByTypeSelected: function handleAddBlockByTypeSelected(_ref3) {
      var type = _ref3.type;

      var _this$flow_addBlankBl = this.flow_addBlankBlockByType({
        type: type,
        platform_metadata: {
          io_viamo: {
            uiData: {
              xPosition: 150,
              yPosition: 255
            }
          }
        }
      }),
          blockId = _this$flow_addBlankBl.uuid; // todo push out to intx-designer
      // activateBlock({blockId})

    },
    handleRemoveActivatedBlockTriggered: function handleRemoveActivatedBlockTriggered() {
      var blockId = this.activeBlockId;
      this.flow_removeBlock({
        blockId: blockId
      });
    },
    toggleImportExport: function toggleImportExport() {
      this.isImporterVisible = !this.isImporterVisible;
    },
    editTreeRoute: function editTreeRoute() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$component = _ref4.component,
          component = _ref4$component === void 0 ? null : _ref4$component,
          _ref4$mode = _ref4.mode,
          mode = _ref4$mode === void 0 ? null : _ref4$mode;

      var context = this.removeNilValues({
        treeId: this.tree.id,
        component: component,
        mode: mode
      });
      return this.route('trees.editTree', context);
    },
    hasClassDetail: function hasClassDetail(classDetails, attribute) {
      return !lodash_default.a.isNil(classDetails[attribute]) && classDetails[attribute];
    },
    translateTreeClassName: function translateTreeClassName(className) {
      return this.trans("flow-builder.".concat(className));
    },
    shouldDisplayDividerBefore: function shouldDisplayDividerBefore(blockClasses, className) {
      var _this4 = this;

      var shouldShowDividerBeforeBlock = lodash_default.a.pickBy(blockClasses, function (classDetails) {
        return _this4.hasClassDetail(classDetails, 'dividerBefore');
      })[className];
      return shouldShowDividerBeforeBlock && this.isBlockAvailableByBlockClass[className];
    },
    handleResourceViewerSelected: function handleResourceViewerSelected() {
      this.$el.scrollIntoView(true);
    },
    // This could be extracted to a helper mixin of some sort so it can be used in other places
    removeNilValues: function removeNilValues(obj) {
      return lodash_default.a.pickBy(obj, lodash_default.a.identity);
    }
  })
});
// CONCATENATED MODULE: ./src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue?vue&type=script&lang=ts&
 /* harmony default export */ var toolbar_TreeBuilderToolbarvue_type_script_lang_ts_ = (TreeBuilderToolbarvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue?vue&type=style&index=0&lang=scss&
var TreeBuilderToolbarvue_type_style_index_0_lang_scss_ = __webpack_require__("3bae");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/toolbar/TreeBuilderToolbar.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  toolbar_TreeBuilderToolbarvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TreeBuilderToolbar = __webpack_exports__["a"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.common.chunk-builder.js.map