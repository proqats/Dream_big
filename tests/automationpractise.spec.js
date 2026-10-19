const { test, expect } = require('@playwright/test')
const path = require('path')   // File upload

test('E2E testing', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    //Gender radio buttons.
    // const radiobuttons = page.locator('.form-check [type="radio"]')
    // for (let j = 0; j < await radiobuttons.count(); j++) {
    //     const id = await radiobuttons.nth(j).getAttribute('id')
    //     const gender = await page.locator(`[for='${id}']`).innerText()
    //     console.log(gender)
    //     if (gender === 'Male') {
    //         await radiobuttons.nth(j).check()
    //         await expect(radiobuttons.nth(j)).toBeChecked()
    //     }
    // }
    //Days
    // const days = page.locator('.form-check [type="checkbox"]')
    // for (let i = 0; i < await days.count(); i++) {
    //     const id = await days.nth(i).getAttribute('id')
    //     const daysPrint = await page.locator(`[for='${id}']`).innerText() //JavaScript will treat ${id} as literal text because if you using ' '. so Use backticks:
    //     console.log(daysPrint)
    //     if (daysPrint === 'Tuesday') {
    //         await days.nth(i).check()
    //         await expect(days.nth(i)).toBeChecked()
    //     }
    // }
    //////country dropdown
    /*const countries = await page.locator('[id="country"] option').allInnerTexts()
    console.log(countries)
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].trim() === 'India') {
            await page.locator('#country').selectOption('india')
            await page.waitForTimeout(2000)
            const selectedcountry = await page.locator('#country').inputValue()
            console.log(selectedcountry)
            await expect(page.locator('#country')).toHaveValue('india')
        }
    }*/

    // const states = await page.locator('[id="country"] option').allInnerTexts()//return array
    // for (let i = 0; i < states.length; i++) {
    //     if (states[i].trim() == 'india') {
    //         await states.selectOption('india')
    //         const selectedstate = await page.locator('#country').inputValue()
    //         await expect(selectedstate).toHaveValue('india')
    //     }
    // }

    //colors
    //     const paintingColors = await page.locator('#colors option').allInnerTexts()
    //     console.log(paintingColors)
    //     for(let l=0; l<paintingColors.length; l++){
    //         if(paintingColors[l].trim()==='White'){
    //             await page.locator('#colors').selectOption('White') //selector: expected string, got object

    //             const selectedcolor= await page.locator('#colors').inputValue()
    //             await expect(page.locator('#colors')).toHaveValue('white')
    //         }
    //     }
    //     const sortedlist = await page.locator ('#animals option')

    //     for(let a=0; a<await sortedlist.count(); a++){
    //         console.log(await sortedlist.nth(a).innerText())
    //         if(sortedlist.nth(a)=='lion'){
    //             await sortedlist.selectOption('lion')
    //             await expect(page.locator('#animals')).toHaveValue('Lion')
    //         }
    //     }
    //     //Date Picker 1— mm/dd/yyyy
    //     await page.locator('[id="datepicker"]').fill('08/17/2026')
    //     await expect(page.locator('[id="datepicker"]')).toHaveValue('08/17/2026')
    //     //Data picker 2 - (dd/mm/yyyy)  ->>>> #txtDate is readonly.
    //     await page.locator('#txtDate').evaluate((element) => {
    //         element.value = '08/17/2025'
    //     })
    //     await expect(page.locator('#txtDate')).toHaveValue('08/17/2025')
    //     //Date picker 3
    //    await page.locator('#start-date').fill('2026-08-28')
    //     await page .locator('#end-date').fill('2026-09-02')
    //     await page.locator('[class="submit-btn"]').click()
    //     //await expect (page.locator('[class="date-picker-box"]')).toHaveValue()
    //     await expect(page.getByText('You selected a range of 5 days.')).toBeVisible()
    //     //Upload file 1
    //     const filepath=('A:/Dhanush_Yadav_Jangiti_Resume (6).pdf')
    //     await page.locator('[id="singleFileInput"]').setInputFiles(filepath)// so the file already inside id=singlefileinput
    //     const filename = await page.locator('[id="singleFileInput"]').evaluate(input => input.files[0].name)
    //     expect(filename).toBe('Dhanush_Yadav_Jangiti_Resume (6).pdf')
    //     //Upload file 2 multiple files
    //     const filepath2 = ('D:/Imp_doc/Book1.xlsx')
    //     await page.locator('#multipleFilesInput').setInputFiles(filepath2)
    //     const filename2= await page.locator('#multipleFilesInput').evaluate(input=> input.files[0].name)
    //     await expect(filename2).toBe('Book1.xlsx')
    //     //Upload multiple files upload
    //     const field=await page.locator('#multipleFilesInput')
    //     const filepaths = ['D:/Imp_doc/Advanced topics to learn.docx', 'D:/Imp_doc/Playwright notes.docx']
    //     await field.setInputFiles(filepaths)
    //     const files=await field.evaluate(input=>Array.from(input.files).map(file => file.name))
    //     await expect(files).toEqual(['Advanced topics to learn.docx','Playwright notes.docx'])

    /////Dynamic button Handling
    const startBTN = await page.getByRole('button', { name: /START/ })
    const stopBTN = await page.getByRole('button', { name: /STOP/ })

    startBTN.click()
    await expect(stopBTN).toBeVisible()
    stopBTN.click()
    await expect(startBTN).toBeVisible()


    // Alert popup handling
    //Simple alert
    page.once('dialog', async dialog => {
        console.log(await dialog.type())
        console.log(await dialog.message())
        await dialog.accept()
        await page.getByRole('button', { name: 'Simple Alert' }).click()
    })

})