const { test, expect } = require('@playwright/test')
import { faker } from '@faker-js/faker';
import { registrationForm } from '../../Page-objects/E2E-1 pages/Student_registrationForm'
import {gender} from '../../Page-objects/E2E-1 pages/Student_registrationForm'

test.describe('student registration first level', () => {
    test.beforeEach('level 1', async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form')
    })
    test('input fields filling', async ({page})=>{
        const inputForm =new registrationForm(page)
        //npm install @faker-js/faker
        const firstname=faker.person.firstName()
        const lanstname=faker.person.lastName()
        const email=faker.internet.email()
        await inputForm.inputfields(firstname,lanstname,email)
    })
    test('radio button selection', async ({page})=>{
        const genderselection= new gender(page)
        await genderselection.Genderselection()
    })
})