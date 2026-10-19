class AdminMenu {
    constructor(page) {
        this.page = page
    }

    async AdminManagement() {
        //await page.getByRole('link', { name: 'Admin' }).click();
        await this.page.
            locator('.oxd-main-menu .oxd-main-menu-item-wrapper')
            .filter({ hasText: 'Admin' })
            .click()
    }
    async FormRow(){
        const InputForm=this.page.locator('.oxd-form-row .oxd-input')
        await InputForm.fill(process.env.formusername)
        await this.page.locator('.oxd-form-row .oxd-select-wrapper').first().click()
        //Approch-1*********
        //await this.page.getByRole('option', {name:'Admin'}).click()
        //Approch-2 loop******
        const options=await this.page.locator('[role="option"]')
        const count= await options.count()
        for(let i=0; i<count; i++){
            const text=await options.nth(i).textContent()
            if(text==='Admin'){
                await options.nth(i).click()
                break
            }
        }
        await this.page.getByPlaceholder('Type for hints...').fill(process.env.Employee_Name)
    }

    async Pom(){
        await this.page.locator('.oxd-main-menu-item-wrapper')
        .filter({hasText:'PIM'})
        .click()

        //Table
        const employeeID='0312'
        const EmployRecordCard=await this.page.locator('.oxd-table-card').all()
        for(let cards of EmployRecordCard){
            //console.log(await cards.innerText())
            const cardText=await cards.innerText()
            if(cardText.includes(employeeID)){
                await cards.locator('.bi-pencil-fill').click()
                break
            }

        }

    }
}
module.exports = { AdminMenu };