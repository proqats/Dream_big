const { test, expect } = require('@playwright/test')

test('Iframe handling', async ({ page }) => {
    await page.goto('https://ui.vision/demo/iframes')
    const frame = await page.frameLocator('iframe[src*="https://docs.google.com/forms"]')
    await frame.locator("[role='presentation'] label[for='i6']").click()

    await page.waitForTimeout(3000)

    //////////////
    await frame.locator('[role="listitem"] div[id="i21"]').click()
    await page.waitForTimeout(3000)
    ///
    await frame.locator('[role="listbox"]').click()
    await frame.locator('.vRMGwf ').getByRole('option',{name:'Yes',exact:true}).click()

    
    await page.waitForTimeout(3000)


})



//[class="bzfPab wFGF8"]
