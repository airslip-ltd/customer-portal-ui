import axios from '../../../utils/axios';

export const nullValidation = {
  rightOperator: null,
  leftOperator: null,
  validateUrl: false,
  storeLabel: 'Shop name',
  expectedResponse: 200,
  knowledgeArticle: null,
  helpImage: null,
  helpText: null
};

export const storeValidation = {
  shopify: {
    ...nullValidation,
    rightOperator: '.myshopify.com',
    leftOperator: 'https://',
    validateUrl: true,
    storeLabel: 'Store name',
    expectedResponse: 200,
    knowledgeArticle: 'https://support.airslip.com/hc/en-us/articles/5626104335633',
    helpImage: '/static/integration_help/shopify.png',
    helpText:
      'Your Store name can be found by logging in to your Shopify admin portal. The value we need is the first part of the url.'
  }
};

export async function validateStore(shopName, validation) {
  // Build a url
  const url = `${validation.leftOperator || 'https://'}${shopName}${validation.rightOperator}`;

  // Call the URL
  const response = await axios({
    url: `providers/validate?urlToValidate=${url}`,
    method: 'get'
  });

  // Repond with the response code match
  return response.data.statusCode === validation.expectedResponse;
}

export function buildUrl(shopName, validation) {
  // Build a url
  return `${shopName}${validation.rightOperator || ''}`;
}
