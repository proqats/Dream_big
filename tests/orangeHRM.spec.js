const { test, expect } = require('@playwright/test')
test.only('orengeHRM E2E', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //await expect(page). toHaveURL('/auth\/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
})
test('login button click without fill the fields', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    const username = page.getByPlaceholder('Username')
    const password = page.getByPlaceholder('Password')
    // await page.getByRole('button', {name:'Login'}).click()
    // await expect (page.getByText('Required')).toHaveCount(2)
    await page.waitForTimeout(3000)
    /*if (await username.inputValue() === "" && await password.inputValue() === '') {
        await page.getByRole('button', { name: 'Login' }).click()
        awant(2)
    }
    else {
        await username.fill('Admin')
        await password.fill('admin123')
        await page.getByRole('button', { name: 'Login' }).click()
    }*/
    await username.fill('Admin')
    await password.fill('admin123')
    if (await username.inputValue() !== '' && await await password.inputValue() !== '') {
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    }
    else {
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.getByText('Required')).toHaveCount(2)
    }
})
test('PIM page Automation', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList')
    const EMPIfo = page.locator('.oxd-table-filter-header-title h5')
    console.log(await EMPIfo.inputValue())
    const employeeinformation = page.locator('.oxd-table-filter-header .oxd-icon-button')
    await expect(employeeinformation).toBeVisible()
    await employeeinformation.click()
})