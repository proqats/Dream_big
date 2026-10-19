const { test, expect } = require('@playwright/test')
const LoginData = require('./Test_data/login_data.json')
const Login_page_= require('./POM clases/Login_page')


for (let data of LoginData) {

    test(`login validation -${data.type}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        const loginpage = new Login_page(page)

        await loginpage.login(data.username, data.password)
        if(data.type ==='valid'){
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        }else{
            await expect(page.locator('error-message-container error',{hasText:'Epic sadface: Username and password do not match any user in this service'})).toBeVisible()
        }
    })

}