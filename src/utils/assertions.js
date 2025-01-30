const { expect } = require('@playwright/test');

exports.customAssertions = {
  async toBeSortedAscending(elements) {
    const prices = await elements.allInnerTexts();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    
    for (let i = 0; i < numericPrices.length - 1; i++) {
      await expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
    }
  }
};