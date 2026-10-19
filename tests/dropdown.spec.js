const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.qa-practice.com/elements/select/single_select');
});

test('single select dropdown', async ({ page }) => {
  const dropdown = page.locator('.form-select');
  const options = await dropdown.locator('option').all();

  for (const option of options) {
    const text = (await option.textContent()).trim();//option.textContent() extracts the string inside that element (like "Banana").
    /**
     * option.textContent() → “I’ll get the text later” (Promise).
       await option.textContent() → “Here’s the actual text now” (string).
       .trim() → “Remove extra spaces from that text.”
    Would you like me to show you a tiny demo snippet where you can see the difference between using await and not using it?
      */
    console.log(text);

    if (text === 'Java') {
      // ✅ call selectOption on dropdown
      await dropdown.selectOption({ label: text });
      break;
    }
  }

  // ✅ assert on dropdown, using the correct value attribute
  await expect(dropdown).toHaveValue('4');

  // without loop and conditions


});

test('Without loops and conditions', async ({ page }) => {
  const dropdown = page.locator('.form-select');
  await dropdown.selectOption({ label: 'Java' })

})
//Multi select drop down

test('multi select drop down', async ({ page }) => {
  await page.getByRole('link', { name: 'Multiple selects' }).click()

  const city = page.getByLabel('Choose the place you want to go')
  const places = await city.locator('option').all()
  for (let place of places) {
    const text = (await place.textContent()).trim()
    if (text === 'Sea') {
      await city.selectOption({ label: text })
    }
  }
  await expect(city).toHaveValue('1')

  const by = page.getByLabel('Choose how you want to get there')
  const vehicles = await by.locator('option').all()
  for (let vehicel of vehicles) {
    const text = (await vehicel.textContent())
    if (text === 'Car') {
      await by.selectOption({ label: text })
    }
  }
  await expect(by).toHaveValue('1')

})

//New tab handling

test.only('New link handling', async ({ page, context }) => {
    // Wait for new tab when clicking the link
    await page.getByRole('link', {name: 'New tab'}).click()
  const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    page.click('#new-page-link'),
  ])
  //make sure the new tab loaded
  await newPage.waitForLoadState()

  //assert somthing on the new tab

  await expect(newPage).toHaveURL(/new_page/)
  await expect (newPage.locator('#result')).toHaveText('I am a new page in a new tab')
})

