import { When } from '@cucumber/cucumber'
import { expect } from 'chai'

import truskApi from '../../../../src/api-requests/trusk-api'
import environment from '../../../../src/environment'
import truskBusiness from '../../../../src/web-pages/trusk-business'
import webUtils from '../../../../src/web-utils'
import { CustomWorld } from '../../../support/world'

When(/^(.*) is logged on Trusk Business$/, async function(this: CustomWorld, customerName: string) {
  if (this.browser === undefined) throw new Error('You should add @webdriver tag to the gherkin scenario')
  const loginResponse = await truskApi.login({
    email: this.testUserEmail,
    password: this.testUserPassword,
  })
  expect(loginResponse.status).to.equal(200)
  expect(loginResponse.data.token).to.be.a('string')
  this.testUserAuthToken = loginResponse.data.token
  await this.browser.navigateTo(environment.truskBusinessBaseUrl)
  await this.browser.setCookies({
    name: 'token',
    value: this.testUserAuthToken as string,
  })
  await this.browser.navigateTo(environment.truskBusinessBaseUrl)
  const currentUrl = await this.browser.getUrl()
  expect(currentUrl).to.equal(`${environment.truskBusinessBaseUrl}/fr/`)
  await webUtils.waitForElementToBePresentBySelector(
    this.browser,
    truskBusiness.quoteForm.startAddressInputXPath,
  )
})
