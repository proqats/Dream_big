 class orangehrmloginslot {
    constructor(page) {
        this.page = page
    }

    async open(){
        await this.page.goto(process.env.OrangeHRM_SITE)
    }

    async loginoperation() {
        await this.page.getByPlaceholder('Username').fill(process.env.OrangeHRM_UserName)
        await this.page.getByPlaceholder('Password').fill(process.env.OrangeHRM_Password)
        await this.page.getByRole('button',{name:' Login '}).click()
    }
}
module.exports = { orangehrmloginslot };