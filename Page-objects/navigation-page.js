const { expect } = require("@playwright/test");

class NavigationPage {

    constructor(page) {
        this.page = page;
    }

    async formLayoutsPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()


    }
    async datePickerPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Datepicker').click()

        //common date picker handling
        const formPickerField = await this.page.getByPlaceholder('Form Picker')
        await formPickerField.click()
        await this.page.locator('nb-calendar-day-picker').getByText('10', { expect: true }).click()
        await expect(formPickerField).toHaveValue('Sep 10, 2026')

    }

    async dateRangePicker() {

        await this.page.getByText('Forms').click()
        await this.page.getByText('Datepicker').click()

        //Datepicker With Range
        await this.page.getByPlaceholder('Range Picker').click()
        const startDate = await this.page.locator('nb-calendar-range-day-cell').getByText('10', { expect: true })
        await startDate.click()
        const endDate = await this.page.locator('nb-calendar-range-day-cell:not(.bounding-month)').getByText('30', { expect: true })
        await endDate.click()
        //Assertion

        await expect(this.page.getByPlaceholder('Range Picker')).toHaveValue('Sep 10, 2026 - Sep 30, 2026')

    }
    async FullForm() {
        //Inline form
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()

        await this.page.getByPlaceholder('Jane Doe').type('Jane Doe')
        //Assertion
        await expect(this.page.getByPlaceholder('Jane Doe')).toHaveValue('Jane Doe')

        await this.page.locator('nb-card-body .form-inline ').getByPlaceholder('Email').type('Jane@Doe.com')

        //Assertion
        await expect(this.page.locator('nb-card-body .form-inline ').getByPlaceholder('Email')).toHaveValue('Jane@Doe.com')

        await this.page.locator('nb-card-body nb-checkbox').getByText('Remember me').first().check()
        //await this.page.getByRole('button',{name:'Submit'}).click()
        await this.page.locator('nb-card')
            .filter({ hasText: 'Inline form' })
            .getByRole('button', { name: 'Submit' })
            .click()
    }

    async UsingtheGrid(){

        // Email
        const card= this.page.locator('nb-card').filter({hasText:'Using the Grid'})
        const emailField=card.getByPlaceholder('Email')//Email
        await emailField.fill('umasankar.panga@TL.com')
        const passwordField=card.getByPlaceholder('Password')//Password
        await passwordField.fill('Password@123')
        //Radio button selection await this.page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('radio', {name:'Option 1'}).check({force:true})
        const radios= await card.getByRole('radio')
        const count = await radios.count()
        await expect(radios).toHaveCount(3)

        for(let i=0; i<count; i++){
            const radio=radios.nth(i)
            const labels=await radio.textContent()
            if(labels.includes('Option 1')){
                await radio.check()
                await expect(radios).toBeChecked()
            }else if(labels.includes('Disabled Option')){
                await expect(radio).toBeDisabled
                await expect(radio).not.toBeChecked()
            }
        }
        await card.getByRole('button', {name: 'Sign in'}).click()//Sign in button
    }
    //Basic form

    async BasicForm(){
        const Basic_Form=await this.page.locator('nb-card').filter({hasText:'Basic form'})

        const EmailAddress= Basic_Form.getByPlaceholder('Email')
        await EmailAddress.fill('test@test.com')

        const Password=Basic_Form.getByPlaceholder('Password')
        await Password.fill('123456')

        const CheckBox= Basic_Form.getByText('Check me out')
        await CheckBox.check()
        await expect(CheckBox).toBeChecked()
        await Basic_Form.getByRole('button', {name:'Submit'}).click()
    }

    
}
module.exports = { NavigationPage }