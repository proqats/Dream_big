const { expect } = require("@playwright/test")


class pagination{

    constructor(page){
        this.page=page
    }
    async futureDate(FutureDate=45){
        const commonDatePicker=await this.page.locator('nb-card').filter({hasText:'Common Datepicker'})
        const FormPicker=await commonDatePicker.getByPlaceholder('Form Picker')
        await FormPicker.click()
        const date=new Date()
        date.setDate(date.getDate()+FutureDate)
        const expectedDay=date.getDate().toString()
        const expectedMonth=date.toLocaleString('En-Us',{month:'short'})
        const expectedYear=date.getFullYear()
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`

        console.log(expectedDate)
        while(true){
            const calender_view_mode= await this.page.locator('nb-calendar-view-mode').textContent()
            if(calender_view_mode.includes(expectedMonth)&& calender_view_mode.includes(expectedYear)){
                break;
            }
            const CalenderCard=await this.page.locator('nb-card')
            await CalenderCard.locator('.next-month').click()
        }
        await this.page.locator('.day-cell:not(.bounding-month)')
        .getByText(expectedDay,{exact:true})
        .click()
        await expect(FormPicker).toHaveValue(expectedDate)     
    }

}
module.exports={pagination}