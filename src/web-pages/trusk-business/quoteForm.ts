import webUtils from '../../web-utils';

// Selectors
const autocompleteListWrapperXPath = '//div[@data-baseweb=\'popover\']//ul[@role=\'listbox\']';
const autocompleteListElementXPath = (textContent: string): string => (
  `${autocompleteListWrapperXPath}//div[text()='${textContent}']`
);
const endAddressInputXPath = '(//div[@data-scroll-error=\'endLocationAddress\']//input)[1]';
const endContactCompleteNameInputXPath = '//input[@id=\'endContactInput\']';
const endContactPhoneNumberInputXPath = '//input[@id=\'endContactPhoneInput\']';
const estimationPanelTitleXPath = '//p[@data-baseweb=\'typo-paragraphlarge\' and text()=\'Estimation\']';
const orderDetailsTextareaXPath = '//textarea[@id=\'packagesDetailsTextArea\']';
const orderNumberInputXPath = '//input[@id=\'packagesOrderNumInput\']';
const packagesNumberInputXPath = '//div[@data-scroll-error=\'packagesCount\']//input';
const startAddressInputXPath = '(//div[@data-scroll-error=\'startLocationAddress\']//input)[1]';
const startContactCompleteNameInputXPath = '//input[@id=\'startContactInput\']';
const startContactPhoneNumberInputXPath = '//input[@id=\'startContactPhoneInput\']';
const submitButtonXPath = '//button[@data-baseweb=\'button\' and text()=\'Valider la commande\']';

// Methods
const fillStartAddressInput = async (webdriver: WebdriverIO.Browser, addressText: string): Promise<void> => {
  const inputTargetElement = await webdriver.$(startAddressInputXPath);
  await inputTargetElement.setValue(addressText);
};

const selectAnyFromSuggestionsBox = async (webdriver: WebdriverIO.Browser, autocompleteText: string): Promise<void> => {
  await webUtils.waitForElementToBePresentBySelector(webdriver, autocompleteListWrapperXPath);
  const startLocationAddressAutocompleteListElementTarget = await webUtils.waitForElementToBePresentBySelector(
    webdriver,
    autocompleteListElementXPath(autocompleteText),
  );
  await startLocationAddressAutocompleteListElementTarget.click();
};

const selectStartAddressFromSuggestions = selectAnyFromSuggestionsBox;

const fillEndAddressInput = async (webdriver: WebdriverIO.Browser, addressText: string): Promise<void> => {
  const inputTargetElement = await webdriver.$(endAddressInputXPath);
  await inputTargetElement.setValue(addressText);
};

const selectEndAddressFromSuggestions = selectAnyFromSuggestionsBox;

const selectEndFloorsFromSuggestions = selectAnyFromSuggestionsBox;

const selectTotalWeight = async (webdriver: WebdriverIO.Browser, loadOptionText: string): Promise<void> => {
  const loadOptionXPath = `//div[@data-scroll-error='packagesWeight']//div[contains(text(), '${loadOptionText}')]`;
  const loadOption = await webUtils.waitForElementToBePresentBySelector(webdriver, loadOptionXPath);
  await loadOption.click();
};

const selectNumberOfTruskers = async (webdriver: WebdriverIO.Browser, optionText: string): Promise<void> => {
  const loadOptionXPath = `//div[@data-scroll-error='truskersCount']//div[contains(text(), '${optionText}')]`;
  const loadOption = await webUtils.waitForElementToBePresentBySelector(webdriver, loadOptionXPath);
  await loadOption.click();
};

const fillPackagesNumber = async (webdriver: WebdriverIO.Browser, inputText: string): Promise<void> => {
  const inputElement = await webdriver.$(packagesNumberInputXPath);
  await inputElement.setValue(inputText);
};

const waitForEstimationPanelToBeVisible = async (browser: WebdriverIO.Browser): Promise<void> => {
  await webUtils.waitForElementToBePresentBySelector(browser, estimationPanelTitleXPath);
};

const fillOrderDetails = async (browser: WebdriverIO.Browser, details: string): Promise<void> => {
  const orderDetailsTextareaTarget = await webUtils.waitForElementToBePresentBySelector(browser, orderDetailsTextareaXPath);
  await orderDetailsTextareaTarget.setValue(details);
};

const fillOrderNumber = async (browser: WebdriverIO.Browser, orderNumber: string): Promise<void> => {
  const orderNumberInputTarget = await webUtils.waitForElementToBePresentBySelector(browser, orderNumberInputXPath);
  await orderNumberInputTarget.setValue(orderNumber);
};

const fillStartContactCompleteName = async (browser: WebdriverIO.Browser, completeName: string): Promise<void> => {
  const startContactCompleteNameInput = await webUtils.waitForElementToBePresentBySelector(browser, startContactCompleteNameInputXPath);
  await startContactCompleteNameInput.setValue(completeName);
};

const fillStartContactPhoneNumber = async (browser: WebdriverIO.Browser, phoneNumber: string): Promise<void> => {
  const startContactPhoneNumberInput = await webUtils.waitForElementToBePresentBySelector(browser, startContactPhoneNumberInputXPath);
  await startContactPhoneNumberInput.setValue(phoneNumber);
};

const fillEndContactCompleteName = async (browser: WebdriverIO.Browser, completeName: string): Promise<void> => {
  const endContactCompleteNameInputTarget = await webUtils.waitForElementToBePresentBySelector(browser, endContactCompleteNameInputXPath);
  await endContactCompleteNameInputTarget.setValue(completeName);
};

const fillEndContactPhoneNumber = async (browser: WebdriverIO.Browser, phoneNumber: string): Promise<void> => {
  const endContactPhoneNumberInputTarget = await webUtils.waitForElementToBePresentBySelector(browser, endContactPhoneNumberInputXPath);
  await endContactPhoneNumberInputTarget.setValue(phoneNumber);
};

const submitForm = async (browser: WebdriverIO.Browser): Promise<void> => {
  const submitButtonTarget = await webUtils.waitForElementToBePresentBySelector(browser, submitButtonXPath);
  await submitButtonTarget.click();
};

const waitForOrderCreatedPanelToBeVisible = async (webdriver: WebdriverIO.Browser): Promise<void> => {
  await webUtils.waitForElementToBePresentBySelector(webdriver, 'p=Commande créée');
  await webUtils.waitForElementToBePresentBySelector(webdriver, 'div=Mes commandes');
  await webUtils.waitForElementToBePresentBySelector(webdriver, 'div=Dupliquer la course');
};

const quoteForm = {
  startAddressInputXPath,

  fillStartAddressInput,
  selectStartAddressFromSuggestions,
  fillEndAddressInput,
  selectEndAddressFromSuggestions,
  selectEndFloorsFromSuggestions,
  selectTotalWeight,
  selectNumberOfTruskers,
  fillPackagesNumber,
  waitForEstimationPanelToBeVisible,
  fillOrderDetails,
  fillOrderNumber,
  fillStartContactCompleteName,
  fillStartContactPhoneNumber,
  fillEndContactCompleteName,
  fillEndContactPhoneNumber,
  submitForm,
  waitForOrderCreatedPanelToBeVisible,
};

export default quoteForm;
