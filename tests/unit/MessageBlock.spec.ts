import {render} from '@testing-library/vue'
import MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import {ExistingDataBlock, NonStartingBlock, Default as MessageBlockStories} from '../../stories/MessageBlock.stories'

describe('Checks if the form is valid', () => {
  const {container, getByTestId, getByText} = render(MessageBlock, {
    // props: {
    //   ...ExistingDataBlock.args,
    // },
  })

  test('It is mounted correctly and the root div is available', () => {
    const rootDiv = container.querySelector('[class="mobile-primitive-message-block"]')
    expect(rootDiv).toBeTruthy()
  })

  test('It has the default branching config', () => {
    const el = container.querySelector('[class="block-output-branching-config"]')
    expect(el).toBeTruthy()
  })

  test('It doesn\'t have a contact property editor', () => {
    const el = container.querySelector('[class="generic-contact-property-editor"]')
    expect(el).toBeNull()
  })
})
