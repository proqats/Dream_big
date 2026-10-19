const { test, expect } = require('@playwright/test')

test('date picker handling', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')
    await expect(page).toHaveTitle('DatePicker - GlobalSQA')
    // click on date picker field
    const frame = await page.frameLocator('.demo-frame').nth(0)
    await frame.locator('#datepicker').click()
    await frame.locator('td .ui-state-default').getByText('2', { exact: true }).click()
    await expect(frame.locator('#datepicker')).toHaveValue('09/02/2026')
    /**
     * For <input> or <textarea>, always assert with *toHaveValue*, not toHaveText.
       toHaveText is for elements whose visible text comes from inner text nodes (like <div>, <span>, <p>).
     */
})

//Now we should select date by the 3 weeks after date next week date
test.only('same date picker different approch', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')

    //Iframe handling
    const frame = await page.frameLocator('.demo-frame').nth(0)
    await frame.locator('#datepicker').click()
    //Get current date
    const date = new Date()
    date.setDate(date.getDate() + 7)
    const expectDay = date.getDate().toString()
    const expectedMonth = date.toLocaleString('En-Us', { month: 'short' })
    const expectYear = date.getFullYear()
    const expectDate = `${expectedMonth}/${expectDay}/${expectYear}`
    await frame.locator('td .ui-state-default').getByText(expectDay, { exact: true }).click()
    await expect(frame.locator('#datepicker')).toHaveValue(expectDate)
})