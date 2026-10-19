const {test, expect} = require('@playwright/test');
test ('title verification',async({page})=>{

    await page.goto('https://demoblaze.com/index.html')

    const pagetitle=page.title();
    console.log(pagetitle);
    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL('https://demoblaze.com/index.html');

    await page.close()


})

