const { test, expect } = require('@playwright/test')

test('js alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

    await expect(page).toHaveTitle('The Internet')

    //js alert handling
    page.once('dialog', async dialog => {
        console.log('Dialog message:', dialog.message())
        await dialog.accept()
    })

    await page.getByRole('button', { name: 'Click for JS Alert' }).click()
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert')


    page.once('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.accept()
    })
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click()
    await expect(page.locator('#result')).toHaveText('You clicked: Ok')


    page.once('dialog', async dialog => {
        console.log(dialog.type())
        console.log(dialog.message())
        await dialog.accept('umashankar panga')
    })
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click()
    await expect(page.locator('#result')).toHaveText('You entered: umashankar panga')

})

test.only('alert handling 2', async ({page})=>{
    await page.goto('https://www.qa-practice.com/elements/alert/alert')

    //alert handling 
    page.once('dialog', async dialog=>{
        console.log(`dialog message: ${dialog.message()}`)
        dialog.accept();
    })
    await page.locator('[id="content"] [class="a-button"]').click()

    //confirmation 

    await page.getByText('Confirmation box').click()

    page.once('dialog', async dialog=>{
        console.log(`dialog type: ${dialog.type()}`)
        console.log(`dialog message: ${dialog.message()}`)
        dialog.accept()
    })
    await page.locator('[id="content"] [class="a-button"]').click()
    await expect(page.locator('[id="result"]')).toContainText('You selected')

    //prompt box
    await page.getByText('Prompt box').click()

    page.once('dialog', async dialog=>{
        console.log(`dialog type: ${dialog.type()}`)
        //dialog.type('hi')
        await dialog.accept('hello bro!')
    })
    await page.locator('[id="content"] [class="a-button"]').click()
    console.log(await page.locator('#result').textContent())
    await expect(page.locator('#result')).toContainText('hello bro!')


})


