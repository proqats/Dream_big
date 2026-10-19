const { expect } = require('@playwright/test')

class datePagination{
    constructor(page){
        this.page=page
    }
    async specificDateSelection(TargetedMonth,TargetedDate,TargetedYear){
        const Formpicker = await this.page.locator('nb-card').filter({hasText: 'Common Datepicker'})
        const FormPickerField=await Formpicker.getByPlaceholder('Form Picker')
        await FormPickerField.click()
        while(true){
            const nbcalendarviewmode= await this.page.locator('nb-calendar-view-mode').textContent()
            if(nbcalendarviewmode.includes(TargetedMonth) && nbcalendarviewmode.includes(TargetedYear.toString())){
                break;
            }
            //Pagination pi clicking
            await this.page.locator('nb-card .next-month').click()
        }
       //Select perticular day
       await this.page.locator('nb-card .day-cell:not(.bounding-month)')
       .getByText(TargetedDate.toString(),{exact:true})
       .click()
       const expectedDay=`${TargetedMonth} ${TargetedDate},${TargetedYear}`
       await expect(FormPickerField).toHaveValue(expectedDay)
    }
    /**   // Decide direction
      const [currentMonth, currentYear] = calendarView.split(' ');
      const currentYearNum = parseInt(currentYear, 10);

      if (currentYearNum > TargetedYear || 
         (currentYearNum === TargetedYear && currentMonth !== TargetedMonth)) {
        await this.page.locator('nb-card .prev-month').click();
      } else {
        await this.page.locator('nb-card .next-month').click();
      }
    } */
}
module.exports={datePagination}