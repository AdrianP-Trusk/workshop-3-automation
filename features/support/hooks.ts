import { After, Before } from '@cucumber/cucumber'
import { remote } from 'webdriverio'

import { CustomWorld } from './world'

Before({ tags: '@webdriver' }, async function(this: CustomWorld) {
  this.browser = await remote({
    capabilities: { browserName: 'chrome' },
  })
})

After({ tags: '@webdriver' }, async function(this: CustomWorld, args) {
  await this.browser?.deleteSession()
})
