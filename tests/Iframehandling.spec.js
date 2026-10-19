const {test, expect}=require('@playwright/test')

test('iframe verification', async ({page})=>{

    await page.goto('https://www.qa-practice.com/elements/iframe/iframe_page')
    const frame=  page.frameLocator('.embed-responsive-item')
    await frame.locator('.navbar-toggler').click()
    await frame.getByText('Main call to action').click()
    await expect( frame.getByRole('heading', {name: 'Album example'})).toBeVisible()
})