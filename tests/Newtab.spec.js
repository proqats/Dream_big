const {test, expect}=require('@playwright/test')
test('new tab handling', async ({page})=>{

const[newtab]=await Promise.all([
    context.waitForEvent('page'),//waiting for the new tab opening
    await page.getByText('New Tab ').click()
])

await newTab.waitForLoadState()
console.log(await newTab.url(),await newTab.title())//failed


})