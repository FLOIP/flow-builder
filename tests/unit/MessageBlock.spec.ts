import {render} from '@testing-library/vue'
import {BaseOptions, ExistingDataBlockClass as MessageBlockStory} from '../../stories/MessageBlock.stories'

// For some reason, putting this in test() fails the tests
const {container} = render(MessageBlockStory, {
  store: BaseOptions.store,
})

test('The MessageBlock slots work as expected', () => {
  // All assertions had to be placed in one test, otherwise the tests were failing.
  // It might be caused by testing-library (and underlying vue-test-utils which destroy the Vue instance after each test?

  const blockRootDiv = container.querySelector('.mobile-primitive-message-block')
  expect(blockRootDiv).not.toBeNull()

  const resourceEditor = container.querySelector('.resource-editor')
  expect(resourceEditor).not.toBeNull()

  const defaultBranchingConfig = container.querySelector('.block-output-branching-config')
  expect(defaultBranchingConfig).not.toBeNull()

  const contactPropertyEditor = container.querySelector('.generic-contact-property-editor')
  expect(contactPropertyEditor).toBeNull()

  const blockCategorization = container.querySelector('.block-categorization')
  expect(blockCategorization).not.toBeNull()

  const blockId = container.querySelector('.block-id')
  expect(blockId).not.toBeNull()
})
