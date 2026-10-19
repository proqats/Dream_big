const { test, expect } = require('@playwright/test')

test('popup handling', async ({ page, context }) => {
    await page.goto('https://www.qa-practice.com/elements/popup/modal')
    page.getByRole('button', { name: 'Launch Pop-Up' }).click(),
    await page.locator('#id_checkbox_0').check(),
    await page.getByRole('button', { name: 'Send' }).click()
    await expect(page.locator('#result')).toContainText('Selected checkboxes:')


})