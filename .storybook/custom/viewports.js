import { MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';

export const customViewports = {
    kindleFire2: {
      name: 'Kindle Fire 2',
      styles: {
        width: '600px',
        height: '963px',
      },
    },
    kindleFireHD: {
      name: 'Kindle Fire HD',
      styles: {
        width: '533px',
        height: '801px',
      },
    },
};

export const viewports = {
  viewport: {
    viewports: {
        ...MINIMAL_VIEWPORTS,
       ...customViewports,
    },
  }
}

export default viewports