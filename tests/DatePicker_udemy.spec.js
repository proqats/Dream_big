const { test, expect } = require('@playwright/test')

import { Datepickers } from '../Page-objects/Date_picker'
import { pagination } from '../Page-objects/DatePicker_pagination'

test('separate PoM for date picker handlings', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    const commondatepicker = new Datepickers(page)
    await commondatepicker.formpageNavigation()
    await commondatepicker.datepickernav()
    //await commondatepicker.commonDatePicker()
    //await expect (commondatepicker.datepickernav).toContain('Sep 23, 2026')

    const Pagination_Datepicker=new pagination(page)
    await Pagination_Datepicker.futureDate()



})