import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Test',
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
    size: {
      control: { type: 'select' },
    },
    active: {
      type: {
        required: false,
        default: undefined,
      },
    },
    disabled: {
      type: {
        required: false,
        default: false,
      },
    },
    type: {
      type: {
        control: { type: 'select' },
      },
    },
  },
}

const Template = (args) => ({
  components: { },
  setup() {
    return { args }
  },
  methods: {
    onClick: action('clicked'),
  },
  template: `
    <h1>test</h1>
  `,
})

export const Default: any = Template.bind({})
Default.args = {
  variant: 'viamo-primary',
}
