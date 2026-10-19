export class registrationForm {
    constructor(page) {
        this.page = page
    }
    async inputfields(Fname, Lname, Email) {
        await this.page.locator('#firstName').fill(Fname)
        await this.page.locator('#lastName').fill(Lname)
        await this.page.locator('#userEmail').fill(Email)
    }


}
export class gender {
    constructor(page) {
        this.page = page

    }
    async Genderselection() {
        const radios = await this.page.locator('.form-check [type="radio"]')
        for (let i = 0; i < radios.count(); i++) {
            const id = await radios.nth(i).getAttribute('id')
            const label = await this.page.locator(`[for=${id}]`).textContent()
            if (label === 'Male') {
                await radios.nth(i).click()
            }

        }
    }
}