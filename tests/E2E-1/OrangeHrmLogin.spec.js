const { test, expect } = require('../../fixtures/OrangeHrm');
const {AdminMenu} =require ('../../Page-objects/OrangeHrmAdmin')
test.beforeEach('login', async ({ loginpage }) => {

    await loginpage.open();
    await loginpage.loginoperation();
});

test('admin managemt page', async({page})=>{
    const adminpage=new AdminMenu(page)
    await adminpage.AdminManagement()
    await adminpage.FormRow()
    await adminpage.Pom()

})

