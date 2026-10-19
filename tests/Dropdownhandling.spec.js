const { test, expect } = require('@playwright/test')

test('select apple from drop down', async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/dropdowns')

    //Select Fruit by Visible Text
    const selectfruit = await page.locator('#fruitSelect')
    await selectfruit.click()

    //Print all options in the drop down them select apple fruit from options
    const fruits= await selectfruit.locator('option').allTextContents()

    for(let fruit of fruits){
        console.log(fruit)
        if(fruit==='Apple'){
            await selectfruit.selectOption(fruit)
            break;
        }

    }
    await expect(selectfruit).toHaveValue('apple')
    //toHaveText('Apple')     ❌  // checks text of entire <select>
    //toHaveValue('apple')    ✅  // checks selected option's value

})
//Select Country by Value Attribute
test('Select Country by Value Attribute', async ({page})=>{
    await page.goto('https://qaplayground.com/practice/dropdowns')

    //click on select country field
    const selectcountry=await page.locator('#countrySelect')
    await selectcountry.click()

    //find options in dropdown once succesfully dropdown open

    const selectcountryoptions=await selectcountry.locator('option').allTextContents()

    for(let options of selectcountryoptions){
        console.log(options)
        if (options==='India'){
            await selectcountry.selectOption(options)
        }
    }
    await expect(selectcountry).toHaveValue('india')
})
//Select Last Language and Read All Options
/*test('Select Last Language and Read All Options',async ({page})=>{
    await page.goto('https://qaplayground.com/practice/dropdowns')

    const selectlanguage=await page.locator('#languageSelect')
    //console.log(await selectlanguage.innerText())//comes because innerText() returns the visible text inside the <select>, including the text of its <option> elements.
    const selectlanguageoptions=await selectlanguage.locator('option').allTextContents()

    console.log(selectlanguageoptions)

    const lastlangugae= selectlanguageoptions[selectlanguageoptions.length-1]
    console.log(lastlangugae)

    await selectlanguage.selectOption(lastlangugae)

    await expect(selectlanguage).toHaveValue('typescript')
})*///Different way select option
test.only('Select Last Language and Read All Options',async ({page})=>{
    await page.goto('https://qaplayground.com/practice/dropdowns')

    const selectlanguage=await page.locator('#languageSelect')
    //console.log(await selectlanguage.innerText())//comes because innerText() returns the visible text inside the <select>, including the text of its <option> elements.
    const selectlanguageoptions=await selectlanguage.locator('option').all()

    console.log(selectlanguageoptions)
for(let selectoption of selectlanguageoptions){
    const text= (await selectoption.textContent()).trim()

    if(text==='TypeScript'){
        await selectlanguage.selectOption(text)
    }
}

    await expect(selectlanguage).toHaveValue('typescript')
})