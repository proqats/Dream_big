require('dotenv').config()
const { test: base, expect } = require('@playwright/test');
const { orangehrmloginslot } = require('../Page-objects/OrangeHrm_login'); 
const test = base.extend({
    loginpage: async ({ page }, use) => {
        const loginpage = new orangehrmloginslot(page)
        await use(loginpage)
    }
})
module.exports = { test, expect };