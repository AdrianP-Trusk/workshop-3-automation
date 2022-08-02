import { AxiosResponse } from 'axios'
import { Mock, remote } from 'webdriverio'

import truskApi from '../src/api-requests/trusk-api'
import environment from '../src/environment'
import randomUtils from '../src/random-utils'
import truskBusiness from '../src/web-pages/trusk-business'
import webUtils from '../src/web-utils'

/**
    - Create b2b_default user account using Trusk API
    - Login the test b2b account using Trusk APi and catch the auth token
    - Open Trusk Business
    - Set Cookie token = previous auth token
    - Quote form is displayed on Trusk Business
    - Fill and submit the quote form
    - Order created panel appears
 */

describe('Workshop Test Scenario', () => {
  let webdriver: WebdriverIO.Browser
  const testUniqueIdentifier = randomUtils.generateRandomDigits(6)
  const testUserEmail = `adrian+test.pro.user.${testUniqueIdentifier}@trusk.com`
  const testUserPassword = 'password'
  let testUserAuthToken: string
  let putOrderSpy: Mock

  beforeAll(async () => {
    webdriver = await remote({
      capabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--disable-infobars', '--window-size=1920,1440'],
        },
      },
    })
  }, 10000)

  afterAll(async () => {
    await webdriver.deleteSession()
  })

  it('Create b2b_default user account using Trusk API', async () => {
    const createUserResponse: AxiosResponse = await truskApi.createUser({
      completeName: `Test Pro User ${testUniqueIdentifier}`,
      email: testUserEmail,
      phoneNumber: `06${testUniqueIdentifier}12`,
      password: testUserPassword,
      pricing: 'b2b_default',
      store: {
        name: `Test Store ${testUniqueIdentifier}`,
      },
    })
    expect(createUserResponse.status).toBe(201)
  }, 10000)

  it('Login the test b2b account using Trusk APi and catch the auth token', async () => {
    const loginResponse = await truskApi.login({
      email: testUserEmail,
      password: testUserPassword,
    })
    expect(loginResponse.status).toBe(200)
    expect(loginResponse.data.token).toStrictEqual(expect.any(String))
    testUserAuthToken = loginResponse.data.token
  }, 10000)

  it('Open Trusk Business', async () => {
    await webdriver.navigateTo(environment.truskBusinessBaseUrl)
  }, 10000)

  it('Set Cookie token = previous auth token', async () => {
    await webdriver.setCookies({
      name: 'token',
      value: testUserAuthToken,
    })
    await webdriver.navigateTo(environment.truskBusinessBaseUrl)
  }, 10000)

  it('Quote form is displayed on Trusk Business', async () => {
    const currentUrl = await webdriver.getUrl()
    expect(currentUrl).toStrictEqual(`${environment.truskBusinessBaseUrl}/fr/`)
    await webUtils.waitForElementToBePresentBySelector(
      webdriver,
      truskBusiness.quoteForm.startAddressInputXPath,
    )
  }, 10000)

  it('Fill the quote form', async () => {
    await truskBusiness.quoteForm.fillStartAddressInput(webdriver, '66 rue du couedic')
    await truskBusiness.quoteForm.selectStartAddressFromSuggestions(webdriver, '66 Rue du Couëdic, Paris, France')
    await truskBusiness.quoteForm.fillEndAddressInput(webdriver, '14 rue palouzie')
    await truskBusiness.quoteForm.selectEndAddressFromSuggestions(webdriver, '14 Rue Palouzié, Saint-Ouen, France')
    await truskBusiness.quoteForm.selectEndFloorsFromSuggestions(webdriver, 'RDC')
    await truskBusiness.quoteForm.selectTotalWeight(webdriver, 'Moins de 350kg')
    await truskBusiness.quoteForm.selectNumberOfTruskers(webdriver, '1 Trusker')
    await truskBusiness.quoteForm.fillPackagesNumber(webdriver, '1')
    await truskBusiness.quoteForm.waitForEstimationPanelToBeVisible(webdriver)
    await truskBusiness.quoteForm.fillOrderDetails(webdriver, `test ${testUniqueIdentifier}`)
    await truskBusiness.quoteForm.fillOrderNumber(webdriver, `TEST-ORDER-${testUniqueIdentifier}`)
    await truskBusiness.quoteForm.fillStartContactCompleteName(webdriver, `Start Contact ${testUniqueIdentifier}`)
    await truskBusiness.quoteForm.fillStartContactPhoneNumber(webdriver, `06${testUniqueIdentifier}13`)
    await truskBusiness.quoteForm.fillEndContactCompleteName(webdriver, `End Contact ${testUniqueIdentifier}`)
    await truskBusiness.quoteForm.fillEndContactPhoneNumber(webdriver, `06${testUniqueIdentifier}14`)
  }, 30000)

  it('Spy PUT Order Trusk API', async () => {
    putOrderSpy = await webdriver.mock(`${environment.truskApiBaseUrl}/order`, { method: 'put' })
  }, 10000)

  it('Submit quote form on Trusk Business', async () => {
    await truskBusiness.quoteForm.submitForm(webdriver)
  }, 10000)

  it('Order created panel appears', async () => {
    await truskBusiness.quoteForm.waitForOrderCreatedPanelToBeVisible(webdriver)
  }, 10000)

  it('PUT Order Trusk API called once', () => {
    expect(putOrderSpy.calls.length).toBe(1)
  }, 10000)
})
