const { test, expect } = require('@playwright/test')
test.beforeEach('login', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
})

test.describe('table handling', () => {
    test('table functionality', async ({ page }) => {
        //Get Any perticular cell data
        // const rows= await page.locator('tbody tr').getByRole('cell').nth(1)
        // console.log(await rows.allInnerTexts())

        //get each cell data from all rows
        const rows = await page.locator('tbody tr').all()
        for (let perticualrRow of rows) {
            console.log(await perticualrRow.allInnerTexts())//aa row text motham oka string laga teesukoni array lo return chestundi.

        }

    })
    //"Print Learn Selenium book price".
    test('Print Learn Selenium book price', async ({ page }) => {
        //locate the row where Book name ="Learn Selenium"

        const row = await page.locator('tbody tr', { hasText: 'Learn Selenium' })

        //locate perticular cell
        const BookName = await row.locator('td').nth(0).innerText()
        //locate perticular cell =price
        const price = await row.locator('td').nth(3).innerText()
        console.log(`Book Name:${BookName} = Price: ${price}`)
    })
    //Scenario idea: Verify all books priced at 300

    test.only('Scenario idea: Verify all books priced at 300', async ({ page }) => {
        const row1 = page.locator('tbody tr')
        const rowcount= await row1.count()

        for (let i = 0; i < rowcount; i++) {
            const bookname1 = await row1.nth(i).locator('td').nth(0).innerText();

            const price1 = await row1.nth(i).locator('td').nth(3).innerText()

            console(`book name:${bookname1}= price: ${price1}`)

            if (price1 === '300') {
                console(`book name "${bookname1}" has price 300`)
                await expect(price1).toBe('300')

            }
        }
    })



})