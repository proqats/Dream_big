require('dotenv').config();
const { test, expect } = require('@playwright/test')
import { demologin } from '../../Page-objects/E2E-1 pages/Demo-login'
import { InventoryPage } from '../../Page-objects/E2E-1 pages/InventoryPage'
test.beforeEach('Demo login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    //Assortions
    await expect(page).toHaveTitle('Swag Labs')
    const login = new demologin(page)
    await login.login(
        process.env.SAUCE_USER,
        process.env.SAUCE_PASSWORD
    )
})
test('verify Inventry product list/names', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const productNames = await inventoryPage.getInventoryItems()
    /* const Inventrycount=await InventryItems.count()
    await expect(Inventrycount).toBe(6)
    //Product names
    for(let i=0; i<Inventrycount; i++){ //Idhi pom class lo allTextContents() use cheyyaka pothe
    const productNames= await InventryItems.nth(i).textContent()
    console.log(productNames)//Product names
    }*/
    for (let i = 0; i < productNames.length; i++) {
        console.log(productNames[i])
    }
})
//Print Product Names and Prices (Retrieve all product names and product prices from the Inventory page and print them side by side.)
test('Print Product Names and Prices', async ({ page }) => {
    const inventoryname_price = new InventoryPage(page)
    //"Class లో already await పెట్టాను కదా, మళ్లీ Test లో ఎందుకు await పెట్టాలి?"
    const productNames = await inventoryname_price.getInventoryItems()
    const productPrices = await inventoryname_price.getInventoryItemPrice()

    for (let i = 0; i < productNames.length; i++) {
        console.log(
            `${productNames[i]} ---> ${productPrices[i]}`
        )
    }
})

test('sorting filter', async ({ page }) => {
    const inventoryProductFilter = new InventoryPage(page)
    await inventoryProductFilter.Sorting()
    await page.waitForTimeout(2000)//waitForEvent() ఒక event name ను expect చేస్తుంది.Ex: await page.waitForEvent('popup')But if want to wait for the action complition use thisawait page.waitForTimeout(2000)
    //sort the any of the option from the filter
})
//sort the any of the option from the filter
test('select sorting filter', async ({ page }) => {
    const inventoryProductFilter = new InventoryPage(page)
    const filter = await inventoryProductFilter.sortingperticularoption()
    const filetroptions = await filter.locator('option')
    const count = await filetroptions.count()
    for (let i = 0; i < count; i++) {
        const text = await filetroptions.nth(i).textContent()
        console.log(text)
        if (text === 'Price (high to low)') {
            await page.locator('.product_sort_container').selectOption({ label: text })
            break
        }
    }

    await expect(page.locator('.active_option')).toHaveText('Price (high to low)')


})
//"Using Conditions to Click Dynamic Elements in Playwright"

test.only('Using Conditions to Click Dynamic Elements in Playwright', async ({ page }) => {
    const inventoryname = new InventoryPage(page)
    const productNames = await inventoryname.getInventoryItems()

    const products = page.locator('.inventory_item .inventory_item_name ')
    const count = await products.count()

    for (let j = 0; j < count; j++) {
        const text = await products.nth(j).textContent()
        console.log(text)
        if (text === 'Sauce Labs Backpack') {
            await products.nth(j).click()
            await page.getByRole('button', { name: 'Add to cart' }).click()
            //await page.locator('#remove').toBeVisible()
            break
        }

    }

    await page.locator('.shopping_cart_badge').click()// Add to cart icon
    await expect(page.locator('.header_secondary_container')).toHaveText('Your Cart')
    const Cart_Item=await page.locator ('.cart_item').filter({hasText:'Sauce Labs Backpack'})
    await expect(Cart_Item).toBeVisible()
    await Cart_Item.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.cart_quantity')).toHaveCount(0)

    //Another way

    // for (let l = 0; l < productNames.length; l++) {
    //     if (productNames[l] === 'Sauce Labs Backpack') {
    //         await products.nth(l).click()

    //     }
    // }
})