const waitForElementToBePresentBySelector = async (webdriver: WebdriverIO.Browser, elementXPath: string): Promise<WebdriverIO.Element> => {
  await webdriver.$(elementXPath).waitForExist({ timeout: 10000, interval: 2000 });
  const element = await webdriver.$(elementXPath);
  return element;
};

export default waitForElementToBePresentBySelector;
