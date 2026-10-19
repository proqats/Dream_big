const { expect } = require("@playwright/test")

class Datepickers {

    constructor(page) {
        this.page = page
    }
    async formpageNavigation() {
        await this.page.getByText('Forms').click({force:true})
    }

    async datepickernav() {
        await this.page.getByText('Datepicker').click()
    }

    async commonDatePicker() {
        const datepicker1 = await this.page.locator('nb-card').filter({ hasText: 'Common Datepicker' })
        const FormPicker=await datepicker1.getByPlaceholder('Form Picker')
        await FormPicker.click()
       // await this.page.locator('.day-cell:not(.bounding-month)').getByText('23', { exact: true }).click()*/

       const date=new Date()
       date.setDate(date.getDate()+30)

       const expectedDay=date.getDate().toString()
       const expectedMonth=date.toLocaleString('En-US',{month:"short"})
       const expectedYear=date.getFullYear()

       const expectedDate= `${expectedDay}, ${expectedMonth}, ${expectedYear}`

       await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, { exact: true }).click()
       //await datepicker1.getByPlaceholder('Form Picker').textContent()
       const ActualDate= await FormPicker.inputvalue()
       console.log('actual date:' + ActualDate)

       await expect(FormPicker).toHaveValue(expectedDate)



    }



}
module.exports = { Datepickers }