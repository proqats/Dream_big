const {test, expect}=require('@playwright/test')

test('automation practise', async ({page})=>{
    await page.goto('https://automationexercise.com/')
    await expect(page).toHaveTitle('Automation Exercise')
    await page.getByRole('list').getByText(' Products').click()
    await expect (page.locator('h2').getByText('All Products')).toBeVisible()

    //list of products
    //const productslist=await page.locator('.features_items .col-sm-4').all()

    const productslist=await page.locator('.features_items .overlay-content p').all()

    for(let list of productslist){
        const products=await list.locator('p').textContent()
        console.log(products)
        //const productNames=await products.locator('p').textContent()
        //console.log(productNames)

        if (products&products.includes('Blue Top')){
            await page.locator('.col-sm-4').getByText('Add to cart').click()
        }
    }


})