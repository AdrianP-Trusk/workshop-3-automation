import { When } from '@cucumber/cucumber'

import environment from '../../../../src/environment'
import truskBusiness from '../../../../src/web-pages/trusk-business'
import { CustomWorld } from '../../../support/world'

When(/^(.*) fills the quote form$/, { timeout: 30 * 1000 }, async function(this: CustomWorld, customerName: string) {
  if (this.browser === undefined) throw new Error('You should add @webdriver tag to the gherkin scenario')
  await truskBusiness.quoteForm.fillStartAddressInput(this.browser, '66 rue du couedic')
  await truskBusiness.quoteForm.selectStartAddressFromSuggestions(this.browser, '66 Rue du Couëdic, Paris, France')
  await truskBusiness.quoteForm.fillEndAddressInput(this.browser, '14 rue palouzie')
  await truskBusiness.quoteForm.selectEndAddressFromSuggestions(this.browser, '14 Rue Palouzié, Saint-Ouen, France')
  await truskBusiness.quoteForm.selectEndFloorsFromSuggestions(this.browser, 'RDC')
  await truskBusiness.quoteForm.selectTotalWeight(this.browser, 'Moins de 350kg')
  await truskBusiness.quoteForm.selectNumberOfTruskers(this.browser, '1 Trusker')
  await truskBusiness.quoteForm.fillPackagesNumber(this.browser, '1')
  await truskBusiness.quoteForm.waitForEstimationPanelToBeVisible(this.browser)
  await truskBusiness.quoteForm.fillOrderDetails(this.browser, `test ${this.testUniqueIdentifier}`)
  await truskBusiness.quoteForm.fillOrderNumber(this.browser, `TEST-ORDER-${this.testUniqueIdentifier}`)
  await truskBusiness.quoteForm.fillStartContactCompleteName(this.browser, `Start Contact ${this.testUniqueIdentifier}`)
  await truskBusiness.quoteForm.fillStartContactPhoneNumber(this.browser, `06${this.testUniqueIdentifier}13`)
  await truskBusiness.quoteForm.fillEndContactCompleteName(this.browser, `End Contact ${this.testUniqueIdentifier}`)
  await truskBusiness.quoteForm.fillEndContactPhoneNumber(this.browser, `06${this.testUniqueIdentifier}14`)
  this.putOrderSpy = await this.browser.mock(`${environment.truskApiBaseUrl}/order`, { method: 'put' })
  await truskBusiness.quoteForm.submitForm(this.browser)
})
