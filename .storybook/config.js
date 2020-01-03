import { configure } from '@storybook/react';
import requireContext from 'require-context.macro'

import '../src/index.css'

const req = requireContext('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

// automatically import all files ending in *.stories.js
configure(requireContext('../src/components', true, /\.stories\.js$/), module);
