export class demologin {
    constructor(page) {
        this.page = page
    }

    async login(username, password) {
        const userLocator =  this.page.locator('#user-name')
        const passLocator =  this.page.locator('#password')
        const loginButton =  this.page.getByRole('button', { name: "Login" })

        await userLocator.fill(username)
        await passLocator.fill(password)
        await loginButton.click()
    }
}
