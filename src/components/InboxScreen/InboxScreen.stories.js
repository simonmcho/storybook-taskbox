import React from 'react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'

import { PureInboxScreen } from '.'
import { defaultTasksData } from '../TaskList/TaskList.stories'

// simple store
const store = {
  getState: () => {
    return {
      tasks: defaultTasksData
    }
  },
  subscribe: () => 0,
  dispatch: action('dispatch')
}

const storeDecorator = (story) => <Provider store={store}>{story()}</Provider>

export default {
  component: PureInboxScreen,
  title: 'InboxScreen',
  decorators: [storeDecorator]
}

export const Default = () => <PureInboxScreen />

export const Error = () => <PureInboxScreen error="Something" />
