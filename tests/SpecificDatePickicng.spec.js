
const { test, expect } = require('@playwright/test')

import { datePagination } from '../Page-objects/date-pagination'


test('test1', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    const specificMonthDate = new datePagination(page)
    //await specificMonthDate.specificDateSelection("Oct 2, 2026");

})