const { test, expect } = require('@playwright/test')

test('flipkart e2e', async ({ page }) => {

    await page.goto('https://www.flipkart.com/')

    await expect(page).toHaveTitle('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!')

    await page.locator('[role="button"]').click()
    await page.waitForTimeout(2000)

    await page.locator('input[name="q"]:not([readonly])').fill('I phone');
    await page.locator('input[name="q"]:not([readonly])').press('Enter')
    await page.waitForTimeout(2000)

    // products

    const products = await page.locator('.col-12-12  a[class="k7wcnx"]')
    await page.waitForTimeout(2000)

    for (let i = 0; i < await products.count(); i++) {
        console.log(await products.nth(i).innerText())// totl product + details

        //product name + Price
        //.col-12-12 .col-7-12 div -> product name

    }

    // select product and print the price
    await page.getByAltText('Apple iPhone 15 (Black, 128 GB)').first().click();
    await page.waitForTimeout(2000)

})