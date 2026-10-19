const { test, expect } = require('@playwright/test');

test.beforeEach('input elements handling', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com');
});

// Fixed: Added string title and corrected the arrow function syntax
test.describe('form layout page', () => {

    test.beforeEach(async ({ page }) => {
        // Fixed: Removed the accidental space after page
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('input fields', async ({ page }) => {
        const usingTheGridEmail = page.getByTestId('inputEmail1')
        await usingTheGridEmail.fill('pangaumasankar@gmail.com')//fill method will click type value and enter and if there any thing previously it will clear
        //await usingTheGridEmail.pressSequentially('test@test.com', { delay: 200 }) //one by on will enter on fill

        //Extract the value in side the field
        const inputvalue = await usingTheGridEmail.inputValue()
        console.log(inputvalue)

        //asserotion
        await expect(usingTheGridEmail).toHaveValue(inputvalue)
        await expect(usingTheGridEmail).toHaveValue(/panga/)//partioal assertion
    })

    test('Radio button handling', async ({ page }) => {

        const usingTheGidForm = page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGidForm.getByLabel('Option 1').check({ force: true })
        await usingTheGidForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })//here we are useing fore because the one of the attribute value is visibilly hidden
        //Assortion
        await expect(usingTheGidForm.getByRole('radio', { name: 'Option 2' })).toBeChecked()
    })

    test('Checkbox', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        // await page.getByRole('checkbox', { name: 'Hide on click' }).click({ force: true })//this will check the box even if already check.
        // await page.getByRole('checkbox', { name: 'Hide on click' }).check({ force: true })//this if it's already check it will keep it has check.

        // const allcheckboxes = await page.getByRole('checkbox')

        // for (const boxes of await allcheckboxes.all()) {
        //     await boxes.check({ force: true })
        //     await expect(boxes).toBeChecked()
        // }
        const checkboxes = await page.locator('nb-checkbox').all()//locator.all() gives you an array of locators you can iterate over.
        //const boxes=checkboxes.all()

        for (let box of checkboxes) {
            const text = await box.textContent()
            if (text && text.includes('Hide on click')) {
                await box.click()
                await expect(box).toBeChecked()
            }
        }


    })
    test('standared dropdown', async ({ page }) => { /////DROP DOWN
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        page.locator('.form-group', { hasText: 'Toast type:' }).getByRole('combobox').selectOption('info')
        await expect(await page.getByRole('combobox')).toHaveValue('info')//There is no role="combobox" attribute, but Playwright still understands this <select> as a combobox role because of its implicit ARIA role.
        //custome dropdown
        const positionDropdownfield = page.locator('.form-group', { hasText: 'Position:' }).locator('nb-select')
        await positionDropdownfield.click()
        //option 1
        //await page.getByRole('list').getByText('bottom-end').click() //UI is parent we have child (nb-option)bytext directly intract with option without touch the options element
        //option 2
        await page.locator('nb-option', { hasText: 'top-right' }).click() //here go throug the child by using has text
        //option-3

        const postionofdropdownField = await page.locator('form-group', { hasText: 'Position' }).locator('nb-select')
        await positionDropdownfield.click()

        const AllListofvalues = await page.locator('nb-option').allTextContents()//extract all data in locator of options
        for (let listValue of AllListofvalues) {
            await page.locator('nb-option', { hasText: listValue }).click()//once the value selected the dropdown field will close so continue the again the field should open
            await expect(positionDropdownfield).toHaveText(listValue)
            await positionDropdownfield.click()// for select another option. by click on the drop down we did wrote this. 
        }

    })

    //Tool-Tips

    test('tooltip handling', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        await page.locator('nb-card-body').getByRole('button', { name: 'Top' }).hover()
        await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')

    })

    //Dialogs/Alerts

    test('dailalog/alert handling from table', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
        //even triggering
        page.once('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })
        /**
         * 1. toHaveText()
         * const message = page.locator('#message');
           await expect(message).toHaveText('Login successful');
           Used with a locator to verify the text displayed by an element.

           2. toEqual()
           Used to compare JavaScript values.
           const actual = 'Login successful';
           expect(actual).toEqual('Login successful');
           expect(10).toEqual(10);
           expect(['India', 'USA']).toEqual(['India', 'USA']);
           expect({ name: 'Sanjay' }).toEqual({ name: 'Sanjay' });
         */
        await page.locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click({ force: true })
        await expect(page.locator('tr', { hasText: "mdo@gmail.com'" }).locator('.nb-trash')).not.toBeVisible()
    })
    //////table handling How to select row by the visable text
    test.only('Table handling', async ({ page }) => {

        //await page.getByText('Modal & Overlays').click()
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        const tablerowEmail = await page.getByRole('row', { name: 'mdo@gmail.com' })
        await tablerowEmail.locator('.nb-edit').click()
        await tablerowEmail.getByPlaceholder('Age').fill('30')
        await tablerowEmail.locator('.nb-checkmark').click()
        console .log (await tablerowEmail.locator('td').last().textContent())
        await expect(tablerowEmail.locator('td').last()).toHaveText('30')

        //Get the row by the coloumn value
        
        const TableRowbyID=  page.getByRole('row').filter({has: page.locator('td:nth-child(7)',{hasText:'10'})})  //Specific column's value
        await TableRowbyID.locator('.nb-edit').click()
        const email=TableRowbyID.getByPlaceholder('E-mail')
        await email.fill('test@test.com')
        await TableRowbyID.locator('.nb-checkmark').click()
        await expect(TableRowbyID.locator('td').nth(4)).toHaveText('test@test.com')

        // loop through table rows

        const ages=["20","30","40","200"]

        for(let age of ages){
            await page.getByPlaceholder('Age').fill(age)

            if(age=='200'){
                await expect(page.locator('tbody')).toContainText('No data found')
            }
            else{
                await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age)
                const allrows= await page.locator('tbody tr').all()


                for(let rows of allrows){
                    // console.log(await rows.allInnerTexts())
                    console.log(await page.locator('td').nth(4).innerText())
                }
            }
        }
    })
});