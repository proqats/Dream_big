const { test, expect } = require('@playwright/test')

import { parametrizedFormlayout } from '../Page-objects/Paramerterized_testing'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')
})
test('parametrized testing', async ({ page }) => {
    const Parametrized_formLayout = new parametrizedFormlayout(page)
    await Parametrized_formLayout.Inlineform('Uma shankar panga', 'umasankarpanga221@gmail.com', true)

    await expect(page.getByPlaceholder('Jane Doe')).toHaveValue('Uma shankar panga')

})