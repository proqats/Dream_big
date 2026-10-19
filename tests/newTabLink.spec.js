const { test, expect } = require('@playwright/test')
const { isContext } = require('node:vm')

test('new tab link handling', async ({ page, context }) => {
    await page.goto('https://www.qa-practice.com/')
    await page.getByText('Single UI Elements').click()
    await page.getByRole('link', { name: 'New tab' }).click()
    //await page.getByRole('link', {name: 'New tab link'}).click()
    // Before click on the link we need to handle the new page

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),// BrowserContext method
        page.click('#new-page-link'),
    ])
    //make sure new page loading
    await newPage.waitForLoadState()

    //Make sure new page open
    await expect(newPage).toHaveURL(/new_page/)
    await expect(newPage.locator('#result')).toHaveText('I am a new page in a new tab')


    // New tab Button
    await page.getByText('New tab button').click()

    const [newPage2]=await Promise.all([
        context.waitForEvent('page'),
        page.click('#new-page-button'),
    ])
    await newPage2.waitForLoadState()
    await expect(newPage2).toHaveURL(/new_page/)
    await expect (newPage2.locator('#result-text')).toHaveText('I am a new page in a new tab')


})