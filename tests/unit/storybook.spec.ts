// tests/unit/storybook.spec.js
import initStoryshots from '@storybook/addon-storyshots'

initStoryshots({
  configPath: './config/storybook/',
})

// Mock Uuid used by @flow-runner IdGeneratorUuidV4.ts to avoid error during test
let mockCount = 0
jest.mock('uuid', () => ({v4: () => `fake-uuid-${mockCount++}`}))
