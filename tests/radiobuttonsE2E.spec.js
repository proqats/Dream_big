const { test, expect } = require('@playwright/test')

test('Radio button e2e', async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button')

    //Count how many buttons
    const radioBTN = await page.locator('.col-auto [type="radio"]')
    for (let i = 0; i < await radioBTN.count(); i++) {
        const id = await radioBTN.nth(i).getAttribute('id')
        const labels = await page.locator(`[for=${id}]`).innerText()
        if (labels === 'Yes') {

            await radioBTN.nth(i).check()
            await expect(radioBTN.nth(i)).toBeChecked()


        }
    }

})
test('radio buttons', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    //normal way to click the radio button
    await page.locator('#male').click()
    await page.waitForTimeout(3000)
    await expect(page.locator('#male')).toBeChecked()
})


test('radio buttons with loop', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    //normal way to click the radio button
    const radioOpt = await page.locator('.form-check [type="radio"]')
    const radioCount = await radioOpt.count()
    for (let i = 0; i < radioCount; i++) {
        const id = await radioOpt.nth(i).getAttribute('id')
        const label = await page.locator(`[for=${id}]`).textContent()
        if (label === 'Male') {
            await radioOpt.nth(i).click()
            await page.waitForTimeout(2000)
            await expect(radioOpt.nth(i)).toBeChecked()
            break
        }


    }
})
///Select State and City
test('select state and city', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form')

    const StateDropdown = await page.locator('#state')
    const CityDropdown = await page.locator('#city')
    await expect(CityDropdown).toContainText('Select City')
    await StateDropdown.click()
    await page.getByText('Uttar Pradesh').click()
    await expect(StateDropdown).toContainText('Uttar Pradesh')
    await page.locator('#city').click();
    await page.getByText('Agra').click()
    await expect(page.locator('#city'))
        .toContainText('Agra');
})
//react-select ///Select State and City with loop and conditions
test.only('select state and city selection with loop and condirions', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form')

    const state = await page.locator('#state')
    await state.click()
    const StateOptions = await page.locator('#react-select-3-input')
    const count = await StateOptions.count()

    for (let i = 0; i < count; i++) {
        const text = await StateOptions.nth(i).textContent()
        if (text === 'Uttar Pradesh') {
            await StateOptions.nth(i).click()
            break
        }
    }

    await expect(state).toContainText('Uttar Pradesh')

    // Until a State is selected, the City dropdown cannot be used. Once a State is selected, the City dropdown becomes available and the user can select a City. This is called a dependent dropdown because the City options depend on the selected State.
    const selectedstate = await state.textContent()

    if (selectedstate.includes('Uttar Pradesh')) {
        const CityDropdown = await page.locator('#city')
        await CityDropdown.click()
        const cityoptions= await page.locator('#react-select-4-input')
        const countofcitynames= await cityoptions.count()
        for(let j=0; j<countofcitynames; j++){
            const text1=await cityoptions.nth(j).textContent()
            if(text1==='Agra'){
                await cityoptions.nth(j).click()
                break
            }
        }
            await expect(CityDropdown).toContainText('Agra')


    }

})
