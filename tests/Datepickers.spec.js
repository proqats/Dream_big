const { test, expect } = require('@playwright/test')

test('Common Datepicker', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    //forms
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    //Date picker field
    await page.getByPlaceholder('Form Picker').click()
//Exact:true avaiad partial matching numbers ex:(21, 22,23,24)
    await page.locator('.day-cell:not(.bounding-month)').getByText('2', { exact: true }).click()//because it correctly excludes the bounding-month cells (the grayed‑out days from previous/next months) and then finds the visible day “2”.
    //await page.locator('.day-cell:not').getByText('18').click()
    await expect(page.getByPlaceholder('Form Picker')).toHaveValue('Sep 2, 2026')//input field
})
    //select the date dynamically within the **current month**

    //Session 5: UI components -> 41 Date picker part 2

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate //Java script reference
test.only('date set dynamically witin calender',async ({page})=>{
    await page.goto('https://playground.bondaracademy.com/')
    //forms
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendeInputField= await page.getByPlaceholder('Form Picker')
    await calendeInputField.click()

    const date=new Date()
    date.setDate(date.getDate()+7)

    const expectedDay= date.getDate().toString()
    const expectedMonth= date.toLocaleString('En-Us', {month: 'short'})
    const expectedYear= date.getFullYear()

    const expectedDate= `${expectedMonth} ${expectedDay}, ${expectedYear}`
    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, {exact:true}).click()
    await expect(calendeInputField).toHaveValue(expectedDate)



})

