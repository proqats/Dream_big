const {test, expect} = require('@playwright/test')

test('multi checkboxes', async ({page})=>{
    await page.goto('https://www.qa-practice.com/elements/checkbox/mult_checkbox')

    const checkboxes=await page.locator(".form-check [type='checkbox']")

    for(let i=0; i<await checkboxes.count(); i++){
        const id = await checkboxes.nth(i).getAttribute('id')
        const checkboxlabels= await page.locator(`[for=${id}]`).innerText()
        if (checkboxlabels==='Thress'){
            await checkboxes.nth(i).click()
            await expect (checkboxes.nth(i)).toBeChecked()
        }
    }
})
//https://www.qa-practice.com/elements/checkbox/mult_checkbox