const { test, expect } = require('@playwright/test')
//npx playwright test tests/login.spec.js

test('login', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await expect(page).toHaveTitle("Let's Shop")
    await expect(page.getByText('Register to sign in with your personal account')).toBeVisible()

    //login
    await page.locator('#userEmail').fill('umasankarpanga221@gmail.com')
    await page.locator('#userPassword').fill('Proq@t$123')
    await page.locator('#login').click()
    await page.waitForTimeout(5000)

    //npx playwright test tests/raacademy.spec.js --project=chromium --headed

    await expect(page.getByRole('button', { name: ' Sign Out ' })).toBeVisible()

    // Products
    await page.waitForTimeout(5000)

    const products = await page.locator('#products .row >div .card')

    //get the actual product elements:count() -> playwright method and we can use in loops it written Promise
    for (let i = 0; i < await products.count(); i++) {
        //console.log(await products.nth(i).innerText()) // all 3 products details
        console.log(await products.nth(i).locator('h5').innerText()) // only products name
        // Now I want to click perticular product view button
        if ((await products.nth(i).locator('h5').innerText()).includes("ADIDAS ORIGINAL")) {
            await products.nth(i).getByRole('button', { name: ' View' }).click()
            await page.waitForTimeout(2000)

            await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/product-details/6960eae1c941646b7a8b3ed3')

            await page.getByRole('button', { name: 'Add to Cart' }).click()
            await page.locator('button[routerlink="/dashboard/cart"]').click() // Cart button
            await page.waitForTimeout(2000)

            //print cart page details
            console.log(await page.locator('.cart >ul>li>div').innerText())
            await page.locator(".cart >ul>li>div>div>button[class='btn btn-danger']").click()
            await page.waitForTimeout(2000)
            await expect(getByText('No Products in Your Cart !')).toBeVisible()






        }

    }


})