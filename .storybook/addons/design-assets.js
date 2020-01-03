import React from "react"
import { AddonPanel } from "@storybook/components"
import { addons, types, } from "@storybook/addons"
import { useParameter, useStorybookApi } from '@storybook/api'



const Content = () => {
 
  const results = useParameter('assets', ['lol', 'test']) // allows us to read info supplied by `addParameters` option for each story
  console.log(results)
  return (
    <>
      {
        results.length
          ? (
            <ol>
              {
                results.map((i) => <li>{i}</li>)
              }
            </ol>
          )
          : null
      }
    </>
  )
}

addons.register('my/design-assets', () => {
  addons.add('design-assets/panel', {
    title: 'assets',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content />
      </AddonPanel>
    )
  })
})

/** 
We're going to use the .storybook folder as a placeholder for our addon.
The reason behind this, is to maintain a straightforward approach and avoid complicating it too much. 
Should this addon be transformed into a actual addon it would be best to move it to a separate package with it's own file and folder structure.
**/
