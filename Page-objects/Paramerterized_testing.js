
class parametrizedFormlayout {

    constructor(page) {
        this.page = page;

    }

    async Inlineform(FullName, Email, RememberMe) {
        const InLineSubmitForm = this.page.locator('nb-card', { hasText: 'Inline form' })

        await InLineSubmitForm.getByPlaceholder('Jane Doe').fill(FullName)
        await InLineSubmitForm.getByPlaceholder('Email').fill(Email)
        if (RememberMe) {
            await InLineSubmitForm.getByRole('checkbox').check({ force: true })
        }
        await InLineSubmitForm.getByRole('button', { name: 'Submit' }).click()

    }
}
module.exports = { parametrizedFormlayout }