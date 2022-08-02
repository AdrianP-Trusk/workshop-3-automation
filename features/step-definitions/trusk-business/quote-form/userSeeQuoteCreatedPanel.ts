import { Then } from '@cucumber/cucumber'
import { expect } from 'chai'

import truskBusiness from '../../../../src/web-pages/trusk-business'
import { CustomWorld } from '../../../support/world'

Then(/^(.*) can see quote created confirmation panel$/, async function(this: CustomWorld, customerName: string) {
  if (this.browser === undefined) throw new Error('You should add @webdriver tag to the gherkin scenario')
  await truskBusiness.quoteForm.waitForOrderCreatedPanelToBeVisible(this.browser)
  expect(this.putOrderSpy?.calls.length).to.equal(1)
})
