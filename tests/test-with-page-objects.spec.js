const { test, expect } = require('@playwright/test')

import { NavigationPage } from '../Page-objects/navigation-page'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test('navigate to form layouts page ', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
})

test('navigate to date picker page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    const navigateDatepicker = new NavigationPage(page)
    await navigateDatepicker.datePickerPage()
})

test('Datepicker With Range', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()

    await navigateTo.dateRangePicker()

})

test('layout inline form filling', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.FullForm()

})

test('Using the Grid', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.UsingtheGrid()
})
test.only('Basic form', async ({page})=>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.BasicForm()
})