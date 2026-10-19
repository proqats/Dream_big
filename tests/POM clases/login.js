//https://www.saucedemo.com/

class Login_page{


    constructor (page){
        this.page=page
        const username=page.locator('#user-name')
        const password=page.locator('#password')
        const loginBtn=page.locator('#login-button')
    }
    async login(userN, userp){
        await this.username.fill(userN)
        await this.password.fill(userp)
        await this.loginBtn.click()
    }
}tests/Page-objects