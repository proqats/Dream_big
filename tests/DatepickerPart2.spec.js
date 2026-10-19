const { test, expect } = require('@playwright/test')

test('date picker part 2', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/forms/datepicker')
    await page.getByPlaceholder('Form Picker').click()

    const date = new Date()
    date.setDate(date.getDate() + 100)

    const expectDay = date.getDate().toString()
    const expectMonth = date.toLocaleString('En-US', { month: 'short' })
    const expectLongMonth = date.toLocaleString('En-US', { month: 'long' })
    const expectYear = date.getFullYear()
    const expectedDate=`${expectMonth} ${expectDay}, ${expectYear}`

    let CurrentMonthonYear = await page.locator('nb-calendar-view-mode').textContent()
    let expectedMonthonYear = `${expectLongMonth} ${expectYear}`

    while (!CurrentMonthonYear?.includes(expectedMonthonYear)) {
        await page.locator('.next-month').click()
        CurrentMonthonYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('.ng-star-inserted').getByText(expectDay, { exact: true }).click()
    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(expectedDate)
})