const { test, expect } = require('@playwright/test')

test('select row by the visbale text', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com')
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const row2 = await page.getByRole('row', { name: 'fat@yandex.ru' })
    await row2.locator('.nb-edit').click()
    await row2.getByPlaceholder('Age').fill('38')//before 45
    await row2.locator('.nb-checkmark').click()

    console.log(await row2.locator('td').last().textContent())
    await expect(row2.locator('td').last()).toHaveText('38')
})