import { Stream } from 'stream'

import { setWorldConstructor } from '@cucumber/cucumber'
import { AxiosResponse } from 'axios'
import { Mock } from 'webdriverio'

import randomUtils from '../../src/random-utils'

export type MediaType = 'text/plain' | 'image/png' | 'application/json';
export type AttachBuffer = (data: Buffer, mediaType: MediaType) => void | Promise<void>;
export type AttachStream = (data: Stream, mediaType: MediaType) => void | Promise<void>;
export type AttachText = (data: string) => void | Promise<void>;
export type AttachStringifiedJson = (
  data: string,
  mediaType: 'application/json',
) => void | Promise<void>;
export type AttachBase64EncodedPng = (data: string, mediaType: 'image/png') => void | Promise<void>;
export type AttachFn = AttachBuffer &
  AttachStream &
  AttachBase64EncodedPng &
  AttachStringifiedJson &
  AttachText;

export interface CucumberWorldConstructorParams {
  attach: AttachFn;
  parameters: { [key: string]: string };
}

export class CustomWorld {
  public attach: AttachFn

  public apiResponse: AxiosResponse | undefined
  public browser: WebdriverIO.Browser | undefined
  public testUniqueIdentifier = randomUtils.generateRandomDigits(6)
  public testUserEmail = `adrian+test.pro.user.${this.testUniqueIdentifier}@trusk.com`
  public testUserPassword = 'password'
  public testUserAuthToken: string | undefined
  public putOrderSpy: Mock | undefined

  /**
   *
   */
  constructor({ attach }: CucumberWorldConstructorParams) {
    this.attach = attach
  }
}

setWorldConstructor(CustomWorld)
