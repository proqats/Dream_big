const { test, expect } = require('@playwright/test')
test.beforeEach('access the web site', async ({ page }) => {
    await page.goto('https://www.qa-practice.com/elements/checkbox/single_checkbox')

})


test('checkbox handling', async ({ page }) => {
    await page.goto('https://www.qa-practice.com/elements/checkbox/single_checkbox')
    // Direct checkbox intraction

    await page.getByLabel('Select me or not').click()
    await page.locator('#submit-id-submit').click()

    await expect(page.locator('#result')).toContainText('Selected checkboxes:')//.toHaveText('Selected checkboxes:\nselect me or not')

})
//Check boxes
test.only('checkboxes', async ({ page }) => {
    await page.getByRole('link', { name: 'Checkboxes' }).click()
    const checkboxes = await page.locator('#div_id_checkboxes .form-check-input')
    //await checkboxes.nth(0).check()

    const count_Of_Checkboxes=await checkboxes.count()//count() tells you how many elements match your locator.
    for (let i =0; i<count_Of_Checkboxes; i++){
        await checkboxes.nth(i).check()
    }

})