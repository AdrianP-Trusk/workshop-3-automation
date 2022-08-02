import { Given } from '@cucumber/cucumber'
import { AxiosResponse } from 'axios'
import { expect } from 'chai'

import truskApi from '../../../../src/api-requests/trusk-api'
import { CustomWorld } from '../../../support/world'

Given(/^(.*) is a Trusk B2B \(default\) customer$/, async function(this: CustomWorld, customerName: string) {
  const createUserResponse: AxiosResponse = await truskApi.createUser({
    completeName: `Test Pro User ${this.testUniqueIdentifier}`,
    email: this.testUserEmail,
    phoneNumber: `06${this.testUniqueIdentifier}12`,
    password: this.testUserPassword,
    pricing: 'b2b_default',
    store: {
      name: `Test Store ${this.testUniqueIdentifier}`,
    },
  })
  expect(createUserResponse.status).to.equal(201)
})
