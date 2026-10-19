const { test, expect } = require('@playwright/test')


test('popup window handling', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    //this is the best approach for single window popups

    const popups = []
    page.on('popup', popup => {
        popups.push(popup)
    })
    await page.locator('[id="PopUp"]').click()
    await expect.poll(() => popups.length).toBe(2)//poll->"Keep checking popups.length until it becomes 2."

    await Promise.all([
        popups[0].waitForLoadState(),
        popups[1].waitForLoadState()
   ])
   console.log(await popups[0].url())
   console.log(await popups[1].url())
})